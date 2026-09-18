"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export default function useLocalMedia() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraEnabled, setCameraEnabled] =
    useState(true);

  const [microphoneEnabled, setMicrophoneEnabled] =
    useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const startMedia = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error(
            "Your browser does not support camera and microphone access."
          );
        }

        const mediaStream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              width: {
                ideal: 1280,
              },
              height: {
                ideal: 720,
              },
              facingMode: "user",
            },
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          });

        if (!mounted) {
          mediaStream
            .getTracks()
            .forEach((track) => track.stop());

          return;
        }

        streamRef.current = mediaStream;

        if (videoRef.current) {
          videoRef.current.srcObject =
            mediaStream;
        }

        setCameraEnabled(true);
        setMicrophoneEnabled(true);
        setError("");
      } catch (mediaError) {
        console.error(
          "Unable to access camera/microphone:",
          mediaError
        );

        if (!mounted) {
          return;
        }

        setError(
          "Camera or microphone permission was not granted. Please allow access in your browser."
        );

        setCameraEnabled(false);
        setMicrophoneEnabled(false);
      }
    };

    startMedia();

    return () => {
      mounted = false;

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());

        streamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (
      videoRef.current &&
      streamRef.current
    ) {
      videoRef.current.srcObject =
        streamRef.current;
    }
  }, [cameraEnabled]);

  const toggleCamera = useCallback(() => {
    const stream = streamRef.current;

    if (!stream) {
      return;
    }

    const videoTracks =
      stream.getVideoTracks();

    const nextValue = !cameraEnabled;

    videoTracks.forEach((track) => {
      track.enabled = nextValue;
    });

    setCameraEnabled(nextValue);
  }, [cameraEnabled]);

  const toggleMicrophone =
    useCallback(() => {
      const stream = streamRef.current;

      if (!stream) {
        return;
      }

      const audioTracks =
        stream.getAudioTracks();

      const nextValue = !microphoneEnabled;

      audioTracks.forEach((track) => {
        track.enabled = nextValue;
      });

      setMicrophoneEnabled(nextValue);
    }, [microphoneEnabled]);

  return {
    videoRef,
    stream: streamRef.current,
    cameraEnabled,
    microphoneEnabled,
    toggleCamera,
    toggleMicrophone,
    error,
  };
}