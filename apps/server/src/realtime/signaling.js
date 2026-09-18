const rooms = new Map();

function send(socket, payload) {
  if (
    socket &&
    socket.readyState === 1
  ) {
    socket.send(
      JSON.stringify(payload)
    );
  }
}

function getRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Map());
  }

  return rooms.get(roomId);
}

function getParticipants(room) {
  return Array.from(
    room.values()
  ).map((client) => ({
    id: client.id,
    name: client.name,
    isLocal: false,
    isHost: client.isHost,
    microphoneEnabled: true,
    cameraEnabled: true,
  }));
}

function broadcast(room, payload, exceptSocket) {
  for (const client of room.values()) {
    if (
      client.socket !== exceptSocket
    ) {
      send(client.socket, payload);
    }
  }
}

export function handleSignalingConnection(
  socket
) {
  let currentRoom = null;
  let currentParticipantId = null;

  socket.on(
    "message",
    (rawMessage) => {
      try {
        const message = JSON.parse(
          rawMessage.toString()
        );

        if (message.type === "join") {
          const roomId = String(
            message.room || ""
          )
            .trim()
            .toUpperCase();

          const participant =
            message.participant || {};

          if (
            !roomId ||
            !participant.id
          ) {
            return;
          }

          const room = getRoom(roomId);

          const participantId =
            String(participant.id);

          currentRoom = roomId;
          currentParticipantId =
            participantId;

          const isHost =
            room.size === 0;

          room.set(participantId, {
            id: participantId,
            name:
              participant.name ||
              "Participant",
            socket,
            isHost,
          });

          send(socket, {
            type: "participants",
            participants:
              getParticipants(room),
          });

          broadcast(
            room,
            {
              type: "user-joined",
              participant: {
                id: participantId,
                name:
                  participant.name ||
                  "Participant",
                isHost,
              },
            },
            socket
          );

          broadcast(
            room,
            {
              type: "participants",
              participants:
                getParticipants(room),
            }
          );

          return;
        }

        if (
          message.type === "offer" ||
          message.type === "answer" ||
          message.type ===
            "ice-candidate"
        ) {
          if (!currentRoom) {
            return;
          }

          const room =
            rooms.get(currentRoom);

          if (!room) {
            return;
          }

          const target =
            room.get(
              String(message.target || "")
            );

          if (!target) {
            return;
          }

          send(target.socket, {
            ...message,
            sender: {
              id: currentParticipantId,
              name:
                room.get(
                  currentParticipantId
                )?.name ||
                "Participant",
            },
          });

          return;
        }

        if (message.type === "chat") {
          if (!currentRoom) {
            return;
          }

          const room =
            rooms.get(currentRoom);

          if (!room) {
            return;
          }

          broadcast(
            room,
            {
              type: "chat",
              message: message.message,
            },
            null
          );

          return;
        }

        if (message.type === "notes") {
          if (!currentRoom) {
            return;
          }

          const room =
            rooms.get(currentRoom);

          if (!room) {
            return;
          }

          broadcast(
            room,
            {
              type: "notes",
              notes: message.notes || "",
            },
            socket
          );

          return;
        }

        if (message.type === "leave") {
          removeParticipant();
        }
      } catch (error) {
        console.error(
          "Signaling message error:",
          error
        );
      }
    }
  );

  socket.on("close", () => {
    removeParticipant();
  });

  function removeParticipant() {
    if (
      !currentRoom ||
      !currentParticipantId
    ) {
      return;
    }

    const room =
      rooms.get(currentRoom);

    if (!room) {
      return;
    }

    const participant =
      room.get(
        currentParticipantId
      );

    room.delete(
      currentParticipantId
    );

    broadcast(room, {
      type: "user-left",
      participantId:
        currentParticipantId,
    });

    broadcast(room, {
      type: "participants",
      participants:
        getParticipants(room),
    });

    if (room.size === 0) {
      rooms.delete(currentRoom);
    }

    currentRoom = null;
    currentParticipantId = null;

    if (participant) {
      console.log(
        `Participant ${participant.name} left ${currentRoom}`
      );
    }
  }
}