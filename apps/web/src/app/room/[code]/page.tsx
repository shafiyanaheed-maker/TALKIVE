"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  Hand,
  MessageSquare,
  Users,
  Sparkles,
  ShieldAlert,
  PhoneOff,
  Copy,
  Check,
  Send,
  Sun,
  Moon,
  MoreHorizontal,
  Settings,
  Pin,
  Maximize2,
  Volume2,
  X,
  Search,
  FileText,
  Clock3,
  Wifi,
  ChevronDown,
} from "lucide-react";

import { useMeetingStore } from "@/stores/meetingStore";
import type { ChatMessagePayload } from "@talkive/types";

export default function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const resolvedParams = use(params);
  const roomCode = resolvedParams.code.toUpperCase();

  const router = useRouter();
  const searchParams = useSearchParams();

  const rawMode = searchParams.get("mode");

  const mode =
    rawMode === "business" ||
    rawMode === "coding" ||
    rawMode === "general"
      ? rawMode
      : "general";

  const meetingTitle =
    mode === "business"
      ? "Business Meeting"
      : mode === "coding"
        ? "Coding Bootcamp"
        : "General Meeting";

  const {
    meeting,
    currentUser,
    isAudioMuted,
    isVideoMuted,
    isScreenSharing,
    isHandRaised,
    activeSidePanel,
    chatMessages,
    toggleAudio,
    toggleVideo,
    toggleScreenShare,
    toggleHandRaise,
    setSidePanel,
    addChatMessage,
    reset,
  } = useMeetingStore();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localMediaStreamRef = useRef<MediaStream | null>(null);

  const [copied, setCopied] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [meetingSeconds, setMeetingSeconds] = useState(0);

  const [liveCaption, setLiveCaption] = useState(
    "Listening for your voice..."
  );

  const [isCaptionListening, setIsCaptionListening] =
    useState(false);

  /*
   * =========================================================
   * THEME
   * =========================================================
   */

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(
      "talkive-meeting-theme"
    );

    if (savedTheme === "light") {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      isDark
    );

    window.localStorage.setItem(
      "talkive-meeting-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  /*
   * =========================================================
   * MEETING TIMER
   * =========================================================
   */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMeetingSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  function formatMeetingTime(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    }

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  /*
   * =========================================================
   * CAMERA + MICROPHONE
   * =========================================================
   */

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    async function startMedia() {
      try {
        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices.getUserMedia
        ) {
          return;
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        localMediaStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.warn(
          "Camera/microphone permission was not granted:",
          error
        );
      }
    }

    startMedia();

    return () => {
      cancelled = true;

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      localMediaStreamRef.current = null;
    };
  }, []);

  /*
   * =========================================================
   * SYNC CAMERA STATE
   * =========================================================
   */

  useEffect(() => {
    const stream = localMediaStreamRef.current;

    if (!stream) {
      return;
    }

    stream
      .getVideoTracks()
      .forEach((track) => {
        track.enabled = !isVideoMuted;
      });
  }, [isVideoMuted]);

  /*
   * =========================================================
   * SYNC MICROPHONE STATE
   * =========================================================
   */

  useEffect(() => {
    const stream = localMediaStreamRef.current;

    if (!stream) {
      return;
    }

    stream
      .getAudioTracks()
      .forEach((track) => {
        track.enabled = !isAudioMuted;
      });
  }, [isAudioMuted]);

  /*
   * =========================================================
   * LIVE AI CAPTIONS
   * =========================================================
   */

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setLiveCaption(
        "Live captions are not supported in this browser."
      );

      setIsCaptionListening(false);

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let stopped = false;

    recognition.onstart = () => {
      if (!stopped) {
        setIsCaptionListening(true);
      }
    };

    recognition.onresult = (event: any) => {
      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        transcript += event.results[i][0].transcript;
      }

      const cleanedTranscript = transcript.trim();

      if (cleanedTranscript) {
        setLiveCaption(cleanedTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn(
        "Speech recognition error:",
        event?.error
      );

      if (event?.error === "not-allowed") {
        setLiveCaption(
          "Microphone permission is required for live captions."
        );
      } else if (event?.error === "audio-capture") {
        setLiveCaption(
          "Microphone is unavailable for live captions."
        );
      } else if (event?.error === "network") {
        setLiveCaption(
          "Caption connection interrupted. Trying again..."
        );
      }

      setIsCaptionListening(false);
    };

    recognition.onend = () => {
      if (stopped) {
        return;
      }

      setIsCaptionListening(false);

      window.setTimeout(() => {
        if (stopped) {
          return;
        }

        try {
          recognition.start();
        } catch {
          // Recognition may already be starting.
        }
      }, 300);
    };

    try {
      recognition.start();
    } catch (error) {
      console.warn(
        "Could not start speech recognition:",
        error
      );
    }

    return () => {
      stopped = true;

      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;

      try {
        recognition.stop();
      } catch {
        // Recognition may already be stopped.
      }

      setIsCaptionListening(false);
    };
  }, []);

  /*
   * =========================================================
   * COPY LINK
   * =========================================================
   */

  async function copyMeetingLink() {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.warn(
        "Could not copy meeting link:",
        error
      );
    }
  }

  /*
   * =========================================================
   * CHAT
   * =========================================================
   */

  function handleSendChat(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!chatInput.trim()) {
      return;
    }

    const message: ChatMessagePayload = {
      id: `message_${Date.now()}`,
      senderId: currentUser?.id || "local-user",
      senderName: currentUser?.name || "You",
      text: chatInput.trim(),
      timestamp: Date.now(),
    };

    addChatMessage(message);
    setChatInput("");
  }

  /*
   * =========================================================
   * LEAVE
   * =========================================================
   */

  function handleLeaveMeeting() {
    if (localMediaStreamRef.current) {
      localMediaStreamRef.current
        .getTracks()
        .forEach((track) => track.stop());
    }

    localMediaStreamRef.current = null;

    reset();

    router.push(
      mode === "business"
        ? "/dashboard/business"
        : mode === "coding"
          ? "/dashboard/coding"
          : "/dashboard"
    );
  }

  /*
   * =========================================================
   * HELPERS
   * =========================================================
   */

  function initials(name?: string) {
    if (!name) {
      return "Y";
    }

    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  const background = isDark
    ? "bg-[#070b12]"
    : "bg-[#f4f7fb]";

  const headerBackground = isDark
    ? "bg-[#0b111c]/95"
    : "bg-white/95";

  const cardBackground = isDark
    ? "bg-[#101827]"
    : "bg-white";

  const secondaryBackground = isDark
    ? "bg-[#0d1523]"
    : "bg-[#eef3f8]";

  const borderColor = isDark
    ? "border-white/[0.07]"
    : "border-slate-200";

  const primaryText = isDark
    ? "text-white"
    : "text-slate-900";

  const secondaryText = isDark
    ? "text-slate-400"
    : "text-slate-500";

  /*
   * =========================================================
   * UI
   * =========================================================
   */

  return (
    <div
      className={`h-screen w-screen overflow-hidden ${background} ${primaryText} transition-colors duration-300`}
    >
      {/* =====================================================
          HEADER
          ===================================================== */}

      <header
        className={`h-[68px] flex-shrink-0 ${headerBackground} backdrop-blur-xl border-b ${borderColor} px-4 md:px-6 flex items-center justify-between`}
      >
        {/* LEFT */}

        <div className="flex items-center gap-3 min-w-0">
          {/* LOGO */}

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-black text-xs">
                T
              </span>
            </div>

            <span className="hidden sm:block font-extrabold tracking-tight text-sm">
              TALKIVE
            </span>
          </div>

          <div
            className={`hidden sm:block h-6 w-px ${
              isDark
                ? "bg-white/10"
                : "bg-slate-200"
            }`}
          />

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2">
          {/* CONNECTION */}

          <div
            className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl ${
              isDark
                ? "bg-white/[0.04]"
                : "bg-slate-100"
            }`}
          >
            <Wifi className="w-3.5 h-3.5 text-emerald-500" />

            <span
              className={`text-[11px] font-medium ${secondaryText}`}
            >
              Good connection
            </span>

            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>

          {/* THEME */}

          <button
            type="button"
            onClick={() => setIsDark((value) => !value)}
            title={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
              isDark
                ? "bg-white/[0.05] hover:bg-white/[0.09] text-slate-300"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* MORE */}

          <button
            type="button"
            onClick={() =>
              setShowMore((value) => !value)
            }
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
              isDark
                ? "hover:bg-white/[0.05]"
                : "hover:bg-slate-100"
            } ${secondaryText}`}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showMore && (
            <div
              className={`absolute top-[60px] right-4 z-50 w-52 rounded-2xl border ${borderColor} ${cardBackground} shadow-2xl p-2`}
            >
              <button
                type="button"
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs ${secondaryText} hover:bg-emerald-500/10 hover:text-emerald-500`}
              >
                <Settings className="w-4 h-4" />
                Meeting settings
              </button>

              <button
                type="button"
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs ${secondaryText} hover:bg-emerald-500/10 hover:text-emerald-500`}
              >
                <FileText className="w-4 h-4" />
                Meeting details
              </button>
            </div>
          )}
        </div>
      </header>

      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="h-[calc(100vh-68px)] flex overflow-hidden">
        {/* ===================================================
            VIDEO WORKSPACE
            =================================================== */}

        <section className="relative flex-1 min-w-0 flex flex-col p-3 md:p-5 overflow-hidden">
          {/* SOFT EMERALD AMBIENT BACKGROUND */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className={`absolute left-[8%] top-[8%] w-[42%] h-[55%] rounded-full blur-[110px] ${
                isDark
                  ? "bg-emerald-500/[0.10]"
                  : "bg-emerald-400/[0.16]"
              }`}
            />

            <div
              className={`absolute right-[8%] top-[10%] w-[42%] h-[55%] rounded-full blur-[110px] ${
                isDark
                  ? "bg-emerald-500/[0.08]"
                  : "bg-emerald-300/[0.13]"
              }`}
            />

            <div
              className={`absolute left-[25%] bottom-[2%] w-[50%] h-[25%] rounded-full blur-[100px] ${
                isDark
                  ? "bg-emerald-600/[0.06]"
                  : "bg-emerald-400/[0.08]"
              }`}
            />
          </div>

          {/* VIDEO GRID */}

          <div className="relative z-10 flex-1 min-h-0 max-w-[1500px] w-full mx-auto">
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
              {/* =================================================
                  LOCAL VIDEO
                  ================================================= */}

              <div
                className={`relative min-h-[280px] rounded-2xl md:rounded-3xl overflow-hidden ${
                  isDark
                    ? "bg-[#111722]"
                    : "bg-slate-200"
                } border ${borderColor} shadow-2xl group`}
              >
                {/* VIDEO */}

                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover transition ${
                    isVideoMuted
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                  style={{
                    transform: "scaleX(-1)",
                  }}
                />

                {/* CAMERA OFF */}

                {isVideoMuted && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-xl shadow-emerald-500/20">
                      {initials(currentUser?.name)}
                    </div>

                    <p
                      className={`mt-4 text-sm font-semibold ${
                        isDark
                          ? "text-white"
                          : "text-slate-800"
                      }`}
                    >
                      Camera is off
                    </p>

                    <p
                      className={`text-xs mt-1 ${secondaryText}`}
                    >
                      Turn your camera on to share video
                    </p>
                  </div>
                )}

                {/* GRADIENT */}

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

                {/* NAME */}

                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-xs font-medium text-white">
                    {currentUser?.name || "You"}

                    <span className="text-white/50 ml-1">
                      (You)
                    </span>
                  </div>

                  {isAudioMuted && (
                    <div className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center">
                      <MicOff className="w-3.5 h-3.5 text-rose-400" />
                    </div>
                  )}
                </div>

                {/* TOP ACTIONS */}

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    type="button"
                    className="w-9 h-9 rounded-xl bg-black/50 backdrop-blur-md text-white flex items-center justify-center"
                  >
                    <Pin className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    className="w-9 h-9 rounded-xl bg-black/50 backdrop-blur-md text-white flex items-center justify-center"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* HAND */}

                {isHandRaised && (
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center shadow-lg">
                    <Hand className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* =================================================
                  HOST
                  ================================================= */}

              <div
                className={`relative min-h-[280px] rounded-2xl md:rounded-3xl overflow-hidden ${
                  isDark
                    ? "bg-[#101827]"
                    : "bg-white"
                } border ${borderColor} shadow-2xl group flex items-center justify-center`}
              >
                {/* SUBTLE BACKGROUND */}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.10),transparent_55%)]" />

                <div className="relative flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-xl shadow-emerald-500/20">
                    TM
                  </div>

                  <span className="mt-4 text-sm font-bold">
                    Prof. Tara Miller
                  </span>

                  <span
                    className={`mt-1 text-xs ${secondaryText}`}
                  >
                    Instructor
                  </span>

                  <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Host
                  </div>
                </div>

                {/* BOTTOM */}

                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-xs font-medium text-white">
                    Prof. Tara Miller
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                {/* TOP RIGHT */}

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    type="button"
                    className="w-9 h-9 rounded-xl bg-black/50 backdrop-blur-md text-white flex items-center justify-center"
                  >
                    <Pin className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    className="w-9 h-9 rounded-xl bg-black/50 backdrop-blur-md text-white flex items-center justify-center"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              CAPTIONS
              =================================================== */}

          <div
            className={`relative z-10 mt-3 md:mt-4 min-h-[54px] rounded-2xl border ${borderColor} ${
              isDark
                ? "bg-[#0b1019]/90"
                : "bg-white"
            } backdrop-blur-xl flex items-center justify-center px-5`}
          >
            <div className="flex items-center gap-3 text-xs text-center max-w-full">
              <span className="flex-shrink-0 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/15 font-bold text-[10px] tracking-wide">
                AI CAPTIONS
              </span>

              <span
                className={`w-1.5 h-1.5 flex-shrink-0 rounded-full ${
                  isCaptionListening
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-slate-400"
                }`}
              />

              <span
                className={`${secondaryText} truncate`}
              >
                {liveCaption}
              </span>
            </div>
          </div>
        </section>

        {/* ===================================================
            SIDE PANEL
            =================================================== */}

        {activeSidePanel !== "none" && (
          <aside
            className={`hidden md:flex w-[360px] xl:w-[400px] flex-shrink-0 border-l ${borderColor} ${cardBackground} flex-col`}
          >
            {/* PANEL HEADER */}

            <div
              className={`h-[68px] flex-shrink-0 border-b ${borderColor} px-5 flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl ${
                    activeSidePanel === "chat"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : activeSidePanel ===
                        "participants"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : activeSidePanel ===
                        "ai_copilot"
                      ? "bg-violet-500/10 text-violet-600"
                      : "bg-amber-500/10 text-amber-600"
                  } flex items-center justify-center`}
                >
                  {activeSidePanel === "chat" && (
                    <MessageSquare className="w-4 h-4" />
                  )}

                  {activeSidePanel ===
                    "participants" && (
                    <Users className="w-4 h-4" />
                  )}

                  {activeSidePanel === "ai_copilot" && (
                    <Sparkles className="w-4 h-4" />
                  )}

                  {activeSidePanel === "proctoring" && (
                    <ShieldAlert className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <h2 className="text-sm font-bold">
                    {activeSidePanel === "chat" &&
                      "Meeting Chat"}

                    {activeSidePanel ===
                      "participants" &&
                      "Participants"}

                    {activeSidePanel ===
                      "ai_copilot" &&
                      "AI Copilot"}

                    {activeSidePanel ===
                      "proctoring" &&
                      "Proctoring"}
                  </h2>

                  <p
                    className={`text-[10px] mt-0.5 ${secondaryText}`}
                  >
                    {activeSidePanel === "chat" &&
                      "Communicate with your team"}

                    {activeSidePanel ===
                      "participants" &&
                      "People in this meeting"}

                    {activeSidePanel ===
                      "ai_copilot" &&
                      "Intelligent meeting assistance"}

                    {activeSidePanel ===
                      "proctoring" &&
                      "Meeting security monitoring"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSidePanel("none")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${secondaryText} ${
                  isDark
                    ? "hover:bg-white/[0.05]"
                    : "hover:bg-slate-100"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* =================================================
                CHAT
                ================================================= */}

            {activeSidePanel === "chat" && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="p-4">
                  <div
                    className={`h-10 rounded-xl border ${borderColor} ${
                      isDark
                        ? "bg-white/[0.03]"
                        : "bg-slate-50"
                    } flex items-center px-3 gap-2`}
                  >
                    <Search
                      className={`w-4 h-4 ${secondaryText}`}
                    />

                    <input
                      placeholder="Search messages..."
                      className={`bg-transparent outline-none border-none text-xs flex-1 ${primaryText}`}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 space-y-4">
                  {chatMessages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div
                        className={`w-14 h-14 rounded-2xl ${
                          isDark
                            ? "bg-white/[0.04]"
                            : "bg-slate-100"
                        } flex items-center justify-center mb-4`}
                      >
                        <MessageSquare
                          className={`w-6 h-6 ${secondaryText}`}
                        />
                      </div>

                      <p className="text-sm font-semibold">
                        No messages yet
                      </p>

                      <p
                        className={`text-xs ${secondaryText} mt-1 max-w-[220px]`}
                      >
                        Start the conversation with your
                        team.
                      </p>
                    </div>
                  )}

                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className="space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">
                          {initials(message.senderName)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-semibold truncate">
                              {message.senderName}
                            </span>

                            <span
                              className={`text-[9px] ${secondaryText}`}
                            >
                              {new Date(
                                message.timestamp
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`ml-9 p-3 rounded-xl text-xs ${
                          isDark
                            ? "bg-white/[0.04]"
                            : "bg-slate-50"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleSendChat}
                  className={`p-4 border-t ${borderColor}`}
                >
                  <div
                    className={`flex items-center gap-2 p-1.5 rounded-xl border ${borderColor} ${
                      isDark
                        ? "bg-white/[0.03]"
                        : "bg-slate-50"
                    }`}
                  >
                    <input
                      value={chatInput}
                      onChange={(event) =>
                        setChatInput(event.target.value)
                      }
                      placeholder="Write a message..."
                      className={`flex-1 bg-transparent outline-none px-2 text-xs ${primaryText}`}
                    />

                    <button
                      type="submit"
                      className="w-9 h-9 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* =================================================
                PARTICIPANTS
                ================================================= */}

            {activeSidePanel === "participants" && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs ${secondaryText}`}
                  >
                    2 people in this meeting
                  </span>

                  <button
                    type="button"
                    className="text-xs font-medium text-emerald-600"
                  >
                    Invite
                  </button>
                </div>

                {/* YOU */}

                <div
                  className={`p-3 rounded-2xl border ${borderColor} ${
                    isDark
                      ? "bg-white/[0.025]"
                      : "bg-slate-50"
                  } mb-2`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                        {initials(currentUser?.name)}
                      </div>

                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#101827]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold truncate">
                          {currentUser?.name || "You"}
                        </p>

                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">
                          YOU
                        </span>
                      </div>

                      <p
                        className={`text-[10px] mt-1 ${secondaryText}`}
                      >
                        {isAudioMuted
                          ? "Microphone off"
                          : "Microphone on"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {isAudioMuted ? (
                        <MicOff className="w-4 h-4 text-rose-400" />
                      ) : (
                        <Mic className="w-4 h-4 text-emerald-500" />
                      )}

                      {isVideoMuted ? (
                        <VideoOff className="w-4 h-4 text-rose-400" />
                      ) : (
                        <Video className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* HOST */}

                <div
                  className={`p-3 rounded-2xl border ${borderColor} ${
                    isDark
                      ? "bg-white/[0.025]"
                      : "bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                      TM
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">
                        Prof. Tara Miller
                      </p>

                      <p
                        className={`text-[10px] mt-1 ${secondaryText}`}
                      >
                        Host · Instructor
                      </p>
                    </div>

                    <span className="text-[9px] px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 font-bold">
                      HOST
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                AI COPILOT
                ================================================= */}

            {activeSidePanel === "ai_copilot" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 to-emerald-500/10 border border-violet-500/20 p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        AI Copilot
                      </p>

                      <p
                        className={`text-[10px] ${secondaryText}`}
                      >
                        Listening to your meeting
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />

                    <span className="text-[10px] text-violet-500 font-semibold">
                      AI is active
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold">
                      Key discussion points
                    </h3>

                    <span
                      className={`text-[9px] ${secondaryText}`}
                    >
                      Live
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      "Product strategy discussion",
                      "Team collaboration",
                      "Project planning",
                    ].map((item) => (
                      <div
                        key={item}
                        className={`p-3 rounded-xl border ${borderColor} ${
                          isDark
                            ? "bg-white/[0.025]"
                            : "bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-md bg-violet-500/10 text-violet-500 flex items-center justify-center text-[9px] font-bold">
                            ✓
                          </span>

                          <span className="text-xs">
                            {item}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold mb-2">
                    Suggested action items
                  </h3>

                  <div
                    className={`p-4 rounded-xl border ${borderColor} ${
                      isDark
                        ? "bg-white/[0.025]"
                        : "bg-slate-50"
                    }`}
                  >
                    <p
                      className={`text-xs ${secondaryText}`}
                    >
                      Review meeting notes and assign
                      responsibilities after the session.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                PROCTORING
                ================================================= */}

            {activeSidePanel === "proctoring" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <ShieldAlert className="w-5 h-5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold">
                        Proctoring Monitor
                      </p>

                      <p
                        className={`text-[10px] ${secondaryText}`}
                      >
                        Authorized monitoring tools
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-2xl border ${borderColor}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs ${secondaryText}`}
                    >
                      Integrity status
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />

                      <span className="text-xs font-bold text-emerald-600">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-2xl border ${borderColor}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold">
                      Session monitoring
                    </span>

                    <ChevronDown
                      className={`w-4 h-4 ${secondaryText}`}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] ${secondaryText}`}
                      >
                        Camera status
                      </span>

                      <span className="text-[11px] text-emerald-600 font-medium">
                        Connected
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] ${secondaryText}`}
                      >
                        Audio status
                      </span>

                      <span className="text-[11px] text-emerald-600 font-medium">
                        Connected
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] ${secondaryText}`}
                      >
                        Session security
                      </span>

                      <span className="text-[11px] text-emerald-600 font-medium">
                        Protected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}
      </main>

      {/* =====================================================
          BOTTOM CONTROL BAR
          ===================================================== */}

      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-24px)] md:w-auto`}
      >
        <div
          className={`mx-auto rounded-2xl md:rounded-3xl border ${borderColor} ${
            isDark
              ? "bg-[#101722]/95"
              : "bg-white/95"
          } backdrop-blur-xl shadow-2xl px-3 md:px-4 py-2.5 flex items-center justify-center gap-1.5 md:gap-2`}
        >
          {/* MIC */}

          <button
            type="button"
            onClick={toggleAudio}
            title={
              isAudioMuted
                ? "Turn microphone on"
                : "Turn microphone off"
            }
            className={`w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition ${
              isAudioMuted
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                : isDark
                ? "bg-white/[0.06] text-white hover:bg-white/[0.1]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {isAudioMuted ? (
              <MicOff className="w-4.5 h-4.5" />
            ) : (
              <Mic className="w-4.5 h-4.5" />
            )}
          </button>

          {/* CAMERA */}

          <button
            type="button"
            onClick={toggleVideo}
            title={
              isVideoMuted
                ? "Turn camera on"
                : "Turn camera off"
            }
            className={`w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition ${
              isVideoMuted
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                : isDark
                ? "bg-white/[0.06] text-white hover:bg-white/[0.1]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {isVideoMuted ? (
              <VideoOff className="w-4.5 h-4.5" />
            ) : (
              <Video className="w-4.5 h-4.5" />
            )}
          </button>

          {/* SCREEN SHARE */}

          <button
            type="button"
            onClick={toggleScreenShare}
            title="Share screen"
            className={`hidden sm:flex w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl items-center justify-center transition ${
              isScreenSharing
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                : isDark
                ? "bg-white/[0.06] text-white hover:bg-white/[0.1]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <MonitorUp className="w-4.5 h-4.5" />
          </button>

          {/* RAISE HAND */}

          <button
            type="button"
            onClick={toggleHandRaise}
            title="Raise hand"
            className={`hidden sm:flex w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl items-center justify-center transition ${
              isHandRaised
                ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20"
                : isDark
                ? "bg-white/[0.06] text-white hover:bg-white/[0.1]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Hand className="w-4.5 h-4.5" />
          </button>

          <div
            className={`hidden md:block w-px h-8 mx-1 ${
              isDark
                ? "bg-white/10"
                : "bg-slate-200"
            }`}
          />

          {/* LEAVE */}

          <button
            type="button"
            onClick={handleLeaveMeeting}
            title="Leave meeting"
            className="h-11 md:h-12 px-4 md:px-5 rounded-xl md:rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-rose-500/20"
          >
            <PhoneOff className="w-4 h-4" />

            <span className="hidden sm:inline">
              Leave
            </span>
          </button>

          <div
            className={`hidden md:block w-px h-8 mx-1 ${
              isDark
                ? "bg-white/10"
                : "bg-slate-200"
            }`}
          />

          {/* CHAT */}

          <button
            type="button"
            onClick={() =>
              setSidePanel(
                activeSidePanel === "chat"
                  ? "none"
                  : "chat"
              )
            }
            title="Chat"
            className={`w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition ${
              activeSidePanel === "chat"
                ? "bg-emerald-500/10 text-emerald-600"
                : isDark
                ? "text-slate-300 hover:bg-white/[0.06]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <MessageSquare className="w-4.5 h-4.5" />
          </button>

          {/* PARTICIPANTS */}

          <button
            type="button"
            onClick={() =>
              setSidePanel(
                activeSidePanel === "participants"
                  ? "none"
                  : "participants"
              )
            }
            title="Participants"
            className={`w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition ${
              activeSidePanel === "participants"
                ? "bg-emerald-500/10 text-emerald-600"
                : isDark
                ? "text-slate-300 hover:bg-white/[0.06]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Users className="w-4.5 h-4.5" />
          </button>

          {/* AI */}

          <button
            type="button"
            onClick={() =>
              setSidePanel(
                activeSidePanel === "ai_copilot"
                  ? "none"
                  : "ai_copilot"
              )
            }
            title="AI Copilot"
            className={`hidden sm:flex w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl items-center justify-center transition ${
              activeSidePanel === "ai_copilot"
                ? "bg-violet-500/10 text-violet-600"
                : isDark
                ? "text-slate-300 hover:bg-white/[0.06]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="w-4.5 h-4.5" />
          </button>

          {/* PROCTORING */}

          <button
            type="button"
            onClick={() =>
              setSidePanel(
                activeSidePanel === "proctoring"
                  ? "none"
                  : "proctoring"
              )
            }
            title="Proctoring"
            className={`hidden lg:flex w-11 h-11 md:w-12 md:h-12 rounded-xl md:rounded-2xl items-center justify-center transition ${
              activeSidePanel === "proctoring"
                ? "bg-amber-500/10 text-amber-600"
                : isDark
                ? "text-slate-300 hover:bg-white/[0.06]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <ShieldAlert className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}