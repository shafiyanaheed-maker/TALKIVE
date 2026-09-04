"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  Hand,
  MessageSquare,
  Users,
  Code2,
  Sparkles,
  ShieldAlert,
  PhoneOff,
  Copy,
  Check,
  EyeOff,
  Send,
  Lock,
  Play,
} from "lucide-react";
import { useMeetingStore, type SidePanelType } from "@/stores/meetingStore";
import { TalkiveApiClient } from "@/lib/api";
import type { MeetingDetails, ChatMessagePayload, SupportedCodeLanguage } from "@talkive/types";

export default function RoomPage({ params }: { params: Promise<{ code: string }> }) {
  const resolvedParams = use(params);
  const roomCode = resolvedParams.code.toLowerCase();
  const router = useRouter();

  // Store state
  const {
    isConnected,
    isConnecting,
    error,
    meeting,
    currentUser,
    isAudioMuted,
    isVideoMuted,
    isScreenSharing,
    isHandRaised,
    activeSidePanel,
    chatMessages,
    activeCaptions,
    setConnectionState,
    setMeeting,
    toggleAudio,
    toggleVideo,
    toggleScreenShare,
    toggleHandRaise,
    setSidePanel,
    addChatMessage,
    addCaption,
    reset,
  } = useMeetingStore();

  // Local pre-join states
  const [hasJoined, setHasJoined] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isGhostRequested, setIsGhostRequested] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chatInput, setChatInput] = useState("");

  // Media references
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localMediaStreamRef = useRef<MediaStream | null>(null);

  // Dual-editor local states
  const [leftCode, setLeftCode] = useState(`// Teacher Reference / Problem Description\nfunction binarySearch(arr: number[], target: number): number {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`);
  const [rightCode, setRightCode] = useState(`// Student Working Solution\nfunction binarySearch(arr, target) {\n  // Implement your solution here\n}`);
  const [selectedLang, setSelectedLang] = useState<SupportedCodeLanguage>("typescript");
  const [codeOutput, setCodeOutput] = useState<string | null>(null);

  // Acquire pre-join camera/mic
  useEffect(() => {
    let stream: MediaStream | null = null;
    async function initPreview() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localMediaStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn("Media device access note:", err);
      }
    }
    if (!hasJoined) {
      initPreview();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [hasJoined]);

  // Handle Joining
  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;

    setConnectionState(true, false, null);

    try {
      const session = await TalkiveApiClient.joinMeeting(roomCode, {
        roomCode,
        displayName: displayName.trim(),
        passcode: passcode || undefined,
        isGhostRequested,
      });

      setMeeting(session.meeting, session.participant);
      setConnectionState(false, true, null);
      setHasJoined(true);

      // Add a welcome system chat message
      addChatMessage({
        id: `sys_${Date.now()}`,
        senderId: "system",
        senderName: "Talkive Concierge",
        text: `Welcome to "${session.meeting.title}". You joined in ${session.meeting.mode.toUpperCase()} mode.`,
        timestamp: Date.now(),
      });
    } catch (err: any) {
      setConnectionState(false, false, err.message || "Failed to join room");
    }
  };

  // Copy meeting link
  const copyMeetingLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Send Chat message
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !currentUser) return;

    const newMsg: ChatMessagePayload = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: chatInput.trim(),
      timestamp: Date.now(),
    };

    addChatMessage(newMsg);
    setChatInput("");
  };

  // Run Code simulation in Dual Editor
  const handleRunCode = () => {
    setCodeOutput("Compiling & executing TypeScript in secure sandbox...\n> Running tests against target...\n[PASS] Test 1: Element in middle (found index 2)\n[PASS] Test 2: Element not in array (returned -1)\nExecution finished in 48ms (Exit Code 0)");
  };

  // Exit Meeting
  const handleLeaveMeeting = () => {
    if (localMediaStreamRef.current) {
      localMediaStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    reset();
    router.push("/");
  };

  // 1. PRE-JOIN LOBBY SCREEN
  if (!hasJoined) {
    return (
      <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
          {/* Video Preview Box */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover mirror -scale-x-100"
            />
            <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={toggleAudio}
                className={`p-3 rounded-full backdrop-blur-md transition ${
                  isAudioMuted
                    ? "bg-rose-600 text-white"
                    : "bg-slate-800/80 text-slate-200 hover:bg-slate-700"
                }`}
              >
                {isAudioMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={toggleVideo}
                className={`p-3 rounded-full backdrop-blur-md transition ${
                  isVideoMuted
                    ? "bg-rose-600 text-white"
                    : "bg-slate-800/80 text-slate-200 hover:bg-slate-700"
                }`}
              >
                {isVideoMuted ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>
            </div>
            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur text-xs font-mono text-slate-300">
              Room: {roomCode}
            </div>
          </div>

          {/* Join Form */}
          <div className="space-y-6 bg-[#0f1626] border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Ready to Join?
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure your media and identity before stepping into the room.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Passcode (if required)
                </label>
                <input
                  type="password"
                  placeholder="Optional room passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Ghost Mode Option */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold block text-slate-200">
                      Ghost Mode (Supervisor)
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      Join invisibly without broadcasting to participants
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isGhostRequested}
                  onChange={(e) => setIsGhostRequested(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 cursor-pointer rounded"
                />
              </div>

              <button
                type="submit"
                disabled={isConnecting || !displayName.trim()}
                className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition disabled:opacity-50"
              >
                {isConnecting ? "Connecting to Media SFU..." : "Join Meeting Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 2. ACTIVE REAL-TIME IN-MEETING SCREEN
  return (
    <div className="h-screen w-screen bg-[#070b12] text-slate-100 flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="h-14 border-b border-slate-800/80 bg-[#0c121e]/90 backdrop-blur px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm tracking-tight text-white">
            {meeting?.title || "Talkive Meeting"}
          </span>

          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/60 px-2.5 py-1 rounded-md text-xs font-mono text-slate-300">
            <span>{roomCode}</span>
            <button
              onClick={copyMeetingLink}
              title="Copy meeting link"
              className="text-slate-400 hover:text-white transition ml-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            {meeting?.mode || "General"} Mode
          </span>

          {(currentUser?.role === "ghost" || currentUser?.permissions.isGhost) && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-1">
              <EyeOff className="w-3 h-3" /> Ghost Mode Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SFU LiveKit Connected</span>
          </div>
        </div>
      </header>

      {/* Main Stage / Video Canvas & Side Drawer */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Stage Content */}
        <div className="flex-1 flex flex-col p-4 relative overflow-hidden">
          {/* Main Grid View */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center max-w-6xl mx-auto w-full">
            {/* Local Video Tile */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-center group">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover -scale-x-100"
              />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur text-xs font-medium text-slate-200 flex items-center gap-2">
                <span>{currentUser?.name} (You)</span>
                {isAudioMuted && <MicOff className="w-3.5 h-3.5 text-rose-400" />}
              </div>
              {isHandRaised && (
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-amber-500 text-black shadow-lg">
                  <Hand className="w-4 h-4 fill-current" />
                </div>
              )}
            </div>

            {/* Remote Simulation Tile (Peer / Student / Instructor) */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#0d1424] border border-slate-800 shadow-xl flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 font-extrabold text-2xl flex items-center justify-center shadow-lg">
                TM
              </div>
              <span className="text-sm font-semibold text-slate-300 mt-3">
                Prof. Tara Miller (Instructor)
              </span>
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur text-xs font-medium text-slate-300 flex items-center gap-2">
                <span>Tara Miller</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>

          {/* Real-Time Live Captions Overlay */}
          <div className="h-12 mt-2 px-4 rounded-xl bg-black/70 backdrop-blur border border-slate-800/80 flex items-center justify-center text-center text-xs text-slate-200">
            <span className="text-emerald-400 font-semibold mr-2">[AI Captions]</span>
            <span>
              &ldquo;Welcome to the advanced paired architecture session. Let&apos;s open the dual code editor to verify the search algorithm.&rdquo;
            </span>
          </div>
        </div>

        {/* Dynamic Side Drawer (Chat, Dual-Code Editor, Participants, AI Copilot) */}
        {activeSidePanel !== "none" && (
          <aside className="w-96 border-l border-slate-800 bg-[#0c121e] flex flex-col z-30 transition-all">
            {/* Drawer Header */}
            <div className="h-12 border-b border-slate-800 px-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300">
              <span className="flex items-center gap-2">
                {activeSidePanel === "chat" && <><MessageSquare className="w-4 h-4 text-emerald-400" /> Real-Time Chat</>}
                {activeSidePanel === "dual_editor" && <><Code2 className="w-4 h-4 text-teal-400" /> Dual-Code Editor</>}
                {activeSidePanel === "participants" && <><Users className="w-4 h-4 text-indigo-400" /> Participants (2)</>}
                {activeSidePanel === "ai_copilot" && <><Sparkles className="w-4 h-4 text-rose-400" /> AI Meeting Copilot</>}
                {activeSidePanel === "proctoring" && <><ShieldAlert className="w-4 h-4 text-amber-400" /> Proctoring Monitor</>}
              </span>
              <button
                onClick={() => setSidePanel("none")}
                className="text-slate-400 hover:text-white p-1"
              >
                &times;
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {/* 1. CHAT PANEL */}
              {activeSidePanel === "chat" && (
                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-3 overflow-y-auto">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-semibold text-emerald-400">{msg.senderName}</span>
                          <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendChat} className="mt-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black transition"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* 2. DUAL-CODE EDITOR PANEL */}
              {activeSidePanel === "dual_editor" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Language</span>
                    <select
                      value={selectedLang}
                      onChange={(e) => setSelectedLang(e.target.value as SupportedCodeLanguage)}
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 text-xs"
                    >
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="javascript">JavaScript</option>
                      <option value="cpp">C++</option>
                      <option value="rust">Rust</option>
                    </select>
                  </div>

                  {/* Left Pane (Reference) */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-400" /> Left Pane (Instructor Reference)
                    </span>
                    <textarea
                      readOnly
                      rows={7}
                      value={leftCode}
                      className="w-full p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-emerald-300 border border-slate-800 resize-none"
                    />
                  </div>

                  {/* Right Pane (Working Code) */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 font-semibold">
                      Right Pane (Student Scratchpad)
                    </span>
                    <textarea
                      rows={7}
                      value={rightCode}
                      onChange={(e) => setRightCode(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-200 border border-slate-800 focus:border-teal-500 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleRunCode}
                    className="w-full py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Execute Code
                  </button>

                  {codeOutput && (
                    <div className="p-2.5 rounded-lg bg-black border border-slate-800 font-mono text-[10px] text-slate-300 whitespace-pre-wrap">
                      {codeOutput}
                    </div>
                  )}
                </div>
              )}

              {/* 3. PARTICIPANTS PANEL */}
              {activeSidePanel === "participants" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center text-[10px]">
                        {currentUser?.name[0]}
                      </div>
                      <span className="font-semibold text-slate-200">{currentUser?.name} (You)</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                      {currentUser?.role}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-teal-500 text-black font-bold flex items-center justify-center text-[10px]">
                        T
                      </div>
                      <span className="font-semibold text-slate-200">Prof. Tara Miller</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
                      host
                    </span>
                  </div>
                </div>
              )}

              {/* 4. AI COPILOT */}
              {activeSidePanel === "ai_copilot" && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
                    <span className="font-bold block mb-1">Live Meeting Copilot</span>
                    Real-time synthesis powered by Deepgram STT and Claude 3.5 Sonnet.
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-slate-200">Key Discussion Highlights</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      <li>Binary search algorithm constraints and edge cases</li>
                      <li>Simulcast layer allocation for low-bandwidth students</li>
                      <li>Reviewing ghost supervisor audit requirements</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-slate-200">Action Items</span>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      &bull; Alex to complete binary search test implementation by end of class.
                    </div>
                  </div>
                </div>
              )}

              {/* 5. PROCTORING MONITOR */}
              {activeSidePanel === "proctoring" && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                    <span className="font-bold block">Assessment Integrity Stream</span>
                    Active monitoring for tab switches, secondary displays, and focus loss.
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-emerald-400 font-semibold">Integrity Score</span>
                      <span className="font-bold text-white">98 / 100</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Zero unauthorized clipboard attempts detected.</p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Meeting Control Bar */}
      <footer className="h-20 border-t border-slate-800/80 bg-[#0a0e18] px-6 flex items-center justify-between z-20">
        {/* Left Info */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
          <span>{currentUser?.name}</span>
          <span className="text-slate-600">|</span>
          <span>{roomCode}</span>
        </div>

        {/* Core Media Controls */}
        <div className="flex items-center gap-3 mx-auto">
          {/* Audio toggle */}
          <button
            onClick={toggleAudio}
            className={`p-3.5 rounded-full transition shadow-lg ${
              isAudioMuted
                ? "bg-rose-600 text-white hover:bg-rose-500"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            title={isAudioMuted ? "Unmute Microphone" : "Mute Microphone"}
          >
            {isAudioMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Video toggle */}
          <button
            onClick={toggleVideo}
            className={`p-3.5 rounded-full transition shadow-lg ${
              isVideoMuted
                ? "bg-rose-600 text-white hover:bg-rose-500"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            title={isVideoMuted ? "Turn Video On" : "Turn Video Off"}
          >
            {isVideoMuted ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          {/* Screen Share */}
          <button
            onClick={toggleScreenShare}
            className={`p-3.5 rounded-full transition shadow-lg ${
              isScreenSharing
                ? "bg-emerald-600 text-black font-bold"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            title="Share Screen"
          >
            <MonitorUp className="w-5 h-5" />
          </button>

          {/* Hand Raise */}
          <button
            onClick={toggleHandRaise}
            className={`p-3.5 rounded-full transition shadow-lg ${
              isHandRaised
                ? "bg-amber-500 text-black font-bold"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            title="Raise Hand"
          >
            <Hand className="w-5 h-5" />
          </button>

          {/* Feature Trigger: Dual Code Editor */}
          <button
            onClick={() => setSidePanel(activeSidePanel === "dual_editor" ? "none" : "dual_editor")}
            className={`p-3.5 rounded-full transition shadow-lg ${
              activeSidePanel === "dual_editor"
                ? "bg-teal-500 text-black font-bold"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            title="Dual-Code Editor"
          >
            <Code2 className="w-5 h-5" />
          </button>

          {/* End Call / Leave */}
          <button
            onClick={handleLeaveMeeting}
            className="px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-rose-600/30 transition ml-2"
            title="Leave Meeting"
          >
            <PhoneOff className="w-5 h-5" />
            <span className="text-xs hidden md:inline">Leave</span>
          </button>
        </div>

        {/* Right Drawer Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidePanel(activeSidePanel === "chat" ? "none" : "chat")}
            className={`p-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition ${
              activeSidePanel === "chat" ? "bg-slate-800 text-emerald-400" : ""
            }`}
            title="Chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          <button
            onClick={() => setSidePanel(activeSidePanel === "participants" ? "none" : "participants")}
            className={`p-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition ${
              activeSidePanel === "participants" ? "bg-slate-800 text-indigo-400" : ""
            }`}
            title="Participants"
          >
            <Users className="w-5 h-5" />
          </button>

          <button
            onClick={() => setSidePanel(activeSidePanel === "ai_copilot" ? "none" : "ai_copilot")}
            className={`p-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition ${
              activeSidePanel === "ai_copilot" ? "bg-slate-800 text-rose-400" : ""
            }`}
            title="AI Copilot"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          <button
            onClick={() => setSidePanel(activeSidePanel === "proctoring" ? "none" : "proctoring")}
            className={`p-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition ${
              activeSidePanel === "proctoring" ? "bg-slate-800 text-amber-400" : ""
            }`}
            title="Proctoring"
          >
            <ShieldAlert className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
