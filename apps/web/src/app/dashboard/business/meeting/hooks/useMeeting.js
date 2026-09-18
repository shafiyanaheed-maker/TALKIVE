"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getStoredMeeting,
  saveMeeting,
  clearMeeting,
} from "../utils/meeting-storage";

export default function useMeeting({
  localStream,
}) {
  const [meetingCode, setMeetingCode] =
    useState("BUSINESS");

  const [participants, setParticipants] =
    useState([]);

  const [messages, setMessages] = useState([]);

  const [notes, setNotes] = useState("");

  const [connected, setConnected] =
    useState(false);

  const [connectionError, setConnectionError] =
    useState("");

  const socketRef = useRef(null);
  const peerConnectionsRef = useRef({});
  const remoteStreamsRef = useRef({});

  const localParticipantId =
    useRef(
      `user-${Math.random()
        .toString(36)
        .slice(2, 10)}`
    );

  const getMeetingInformation =
    useCallback(() => {
      if (typeof window === "undefined") {
        return {
          code: "BUSINESS",
          name: "Business Meeting",
        };
      }

      const params =
        new URLSearchParams(
          window.location.search
        );

      const queryCode =
        params.get("code") ||
        params.get("meeting") ||
        "";

      const storedMeeting =
        getStoredMeeting();

      return {
        code:
          queryCode ||
          storedMeeting?.code ||
          "BUSINESS",
        name:
          storedMeeting?.name ||
          "Business Meeting",
      };
    }, []);

  useEffect(() => {
    const meeting =
      getMeetingInformation();

    setMeetingCode(
      String(meeting.code).toUpperCase()
    );

    saveMeeting({
      code: meeting.code,
      name: meeting.name,
    });
  }, [getMeetingInformation]);

  useEffect(() => {
    setParticipants([
      {
        id: localParticipantId.current,
        name: "You",
        isLocal: true,
        isHost: true,
        microphoneEnabled: true,
        cameraEnabled: true,
        stream: localStream || null,
      },
    ]);
  }, [localStream]);

  const sendSignal = useCallback(
    (payload) => {
      const socket = socketRef.current;

      if (
        socket &&
        socket.readyState === WebSocket.OPEN
      ) {
        socket.send(
          JSON.stringify(payload)
        );
      }
    },
    []
  );

  const createPeerConnection =
    useCallback(
      (remoteId, remoteName) => {
        if (
          peerConnectionsRef.current[
            remoteId
          ]
        ) {
          return peerConnectionsRef.current[
            remoteId
          ];
        }

        const connection =
          new RTCPeerConnection({
            iceServers: [
              {
                urls: [
                  "stun:stun.l.google.com:19302",
                  "stun:stun1.l.google.com:19302",
                ],
              },
            ],
          });

        if (localStream) {
          localStream
            .getTracks()
            .forEach((track) => {
              connection.addTrack(
                track,
                localStream
              );
            });
        }

        connection.onicecandidate = (
          event
        ) => {
          if (!event.candidate) {
            return;
          }

          sendSignal({
            type: "ice-candidate",
            target: remoteId,
            candidate: event.candidate,
          });
        };

        connection.ontrack = (event) => {
          const [remoteStream] =
            event.streams;

          if (!remoteStream) {
            return;
          }

          remoteStreamsRef.current[
            remoteId
          ] = remoteStream;

          setParticipants((current) => {
            const exists = current.some(
              (participant) =>
                participant.id ===
                remoteId
            );

            if (!exists) {
              return [
                ...current,
                {
                  id: remoteId,
                  name:
                    remoteName ||
                    "Participant",
                  isLocal: false,
                  isHost: false,
                  microphoneEnabled: true,
                  cameraEnabled: true,
                  stream: remoteStream,
                },
              ];
            }

            return current.map(
              (participant) =>
                participant.id ===
                remoteId
                  ? {
                      ...participant,
                      stream:
                        remoteStream,
                    }
                  : participant
            );
          });
        };

        connection.onconnectionstatechange =
          () => {
            const state =
              connection.connectionState;

            if (
              state === "failed" ||
              state === "closed" ||
              state === "disconnected"
            ) {
              delete peerConnectionsRef
                .current[remoteId];

              delete remoteStreamsRef
                .current[remoteId];

              setParticipants(
                (current) =>
                  current.filter(
                    (participant) =>
                      participant.id !==
                      remoteId
                  )
              );
            }
          };

        peerConnectionsRef.current[
          remoteId
        ] = connection;

        return connection;
      },
      [localStream, sendSignal]
    );

  useEffect(() => {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    const protocol =
      window.location.protocol ===
      "https:"
        ? "wss:"
        : "ws:";

    const configuredUrl =
      process.env
        .NEXT_PUBLIC_SIGNALING_URL;

    const socketUrl =
      configuredUrl ||
      `${protocol}//${window.location.hostname}:4000`;

    let socket;

    try {
      socket = new WebSocket(socketUrl);
      socketRef.current = socket;
    } catch (socketError) {
      console.error(socketError);

      setConnectionError(
        "Unable to connect to the meeting server."
      );

      return;
    }

    socket.onopen = () => {
      setConnected(true);
      setConnectionError("");

      sendSignal({
        type: "join",
        room: meetingCode,
        participant: {
          id: localParticipantId.current,
          name: "You",
        },
      });
    };

    socket.onmessage = async (event) => {
      try {
        const data = JSON.parse(
          event.data
        );

        if (
          data.type === "participants"
        ) {
          const remoteParticipants =
            Array.isArray(data.participants)
              ? data.participants
              : [];

          setParticipants((current) => {
            const local =
              current.find(
                (participant) =>
                  participant.isLocal
              ) || {
                id: localParticipantId.current,
                name: "You",
                isLocal: true,
                isHost: true,
                microphoneEnabled: true,
                cameraEnabled: true,
                stream: localStream || null,
              };

            return [
              local,
              ...remoteParticipants
                .filter(
                  (participant) =>
                    participant.id !==
                    local.id
                )
                .map((participant) => ({
                  ...participant,
                  isLocal: false,
                  stream:
                    remoteStreamsRef.current[
                      participant.id
                    ] || null,
                })),
            ];
          });

          return;
        }

        if (
          data.type === "user-joined"
        ) {
          const connection =
            createPeerConnection(
              data.participant.id,
              data.participant.name
            );

          const offer =
            await connection.createOffer();

          await connection.setLocalDescription(
            offer
          );

          sendSignal({
            type: "offer",
            target:
              data.participant.id,
            offer,
            participant: {
              id: localParticipantId.current,
              name: "You",
            },
          });

          return;
        }

        if (
          data.type === "offer"
        ) {
          const connection =
            createPeerConnection(
              data.sender.id,
              data.sender.name
            );

          await connection.setRemoteDescription(
            new RTCSessionDescription(
              data.offer
            )
          );

          const answer =
            await connection.createAnswer();

          await connection.setLocalDescription(
            answer
          );

          sendSignal({
            type: "answer",
            target: data.sender.id,
            answer,
            participant: {
              id: localParticipantId.current,
              name: "You",
            },
          });

          return;
        }

        if (
          data.type === "answer"
        ) {
          const connection =
            peerConnectionsRef.current[
              data.sender.id
            ];

          if (!connection) {
            return;
          }

          await connection.setRemoteDescription(
            new RTCSessionDescription(
              data.answer
            )
          );

          return;
        }

        if (
          data.type ===
          "ice-candidate"
        ) {
          const connection =
            peerConnectionsRef.current[
              data.sender.id
            ];

          if (!connection) {
            return;
          }

          try {
            await connection.addIceCandidate(
              new RTCIceCandidate(
                data.candidate
              )
            );
          } catch (iceError) {
            console.error(
              "ICE candidate error:",
              iceError
            );
          }

          return;
        }

        if (
          data.type === "user-left"
        ) {
          delete peerConnectionsRef
            .current[data.participantId];

          delete remoteStreamsRef
            .current[data.participantId];

          setParticipants(
            (current) =>
              current.filter(
                (participant) =>
                  participant.id !==
                  data.participantId
              )
          );

          return;
        }

        if (
          data.type === "chat"
        ) {
          setMessages((current) => [
            ...current,
            data.message,
          ]);

          return;
        }

        if (
          data.type === "notes"
        ) {
          setNotes(
            data.notes || ""
          );
        }
      } catch (messageError) {
        console.error(
          "Meeting message error:",
          messageError
        );
      }
    };

    socket.onerror = () => {
      setConnected(false);
      setConnectionError(
        "Meeting server connection failed."
      );
    };

    socket.onclose = () => {
      setConnected(false);
    };

    return () => {
      Object.values(
        peerConnectionsRef.current
      ).forEach((connection) => {
        connection.close();
      });

      peerConnectionsRef.current = {};

      if (
        socket.readyState ===
          WebSocket.OPEN
      ) {
        socket.send(
          JSON.stringify({
            type: "leave",
            room: meetingCode,
            participantId:
              localParticipantId.current,
          })
        );
      }

      socket.close();
      socketRef.current = null;
    };
  }, [
    meetingCode,
    localStream,
    createPeerConnection,
    sendSignal,
  ]);

  const sendMessage = useCallback(
    (text) => {
      const message = {
        id: `message-${Date.now()}`,
        name: "You",
        text,
        time: new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        isLocal: true,
      };

      setMessages((current) => [
        ...current,
        message,
      ]);

      sendSignal({
        type: "chat",
        room: meetingCode,
        message,
      });
    },
    [meetingCode, sendSignal]
  );

  const updateNotes = useCallback(
    (value) => {
      setNotes(value);

      sendSignal({
        type: "notes",
        room: meetingCode,
        notes: value,
      });
    },
    [meetingCode, sendSignal]
  );

  const leaveMeeting = useCallback(() => {
    sendSignal({
      type: "leave",
      room: meetingCode,
      participantId:
        localParticipantId.current,
    });

    Object.values(
      peerConnectionsRef.current
    ).forEach((connection) => {
      connection.close();
    });

    peerConnectionsRef.current = {};

    clearMeeting();
  }, [meetingCode, sendSignal]);

  return {
    meetingCode,
    participants,
    messages,
    notes,
    connected,
    connectionError,
    sendMessage,
    updateNotes,
    leaveMeeting,
  };
}