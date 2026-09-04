"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Video, 
  Plus, 
  Keyboard, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  ShieldCheck, 
  EyeOff, 
  Languages, 
  ArrowRight 
} from "lucide-react";
import { TalkiveApiClient } from "@/lib/api";
import type { MeetingMode } from "@talkive/types";

export default function HomePage() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [selectedMode, setSelectedMode] = useState<MeetingMode>("general");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError(null);

    try {
      const meeting = await TalkiveApiClient.createMeeting({
        title: meetingTitle || "Quick Talkive Meeting",
        mode: selectedMode,
        accessType: "open",
      });
      router.push(`/room/${meeting.roomCode}`);
    } catch (err: any) {
      setError(err.message || "Failed to create meeting");
      setIsCreating(false);
    }
  };

  const handleJoinByCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    const cleanCode = roomCode.trim().toLowerCase();
    router.push(`/room/${cleanCode}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-[#0c111d]/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Video className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              TALKIVE<span className="text-emerald-400">.IN</span>
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Enterprise v1.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/login")}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <a
            href="#modes"
            className="hidden sm:inline-block px-4 py-2 text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            Explore Modes
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-6xl mx-auto w-full">
        <div className="text-center space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart, Adaptive Real-Time Collaboration & Learning</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Real-time meetings,{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              engineered for intelligence.
            </span>
          </h1>

          <p className="text-lg text-slate-400">
            Ultra-low latency WebRTC meetings built for education, high-stakes assessments, paired software engineering, and AI-powered real-time transcription.
          </p>
        </div>

        {/* Meeting Action Box */}
        <div className="mt-10 w-full max-w-2xl bg-[#0f1626]/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur">
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
              {error}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Create Meeting */}
            <form onSubmit={handleCreateMeeting} className="space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-400" /> Start New Meeting
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Create an instant or configured room
                </p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Meeting Title (optional)"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />

                <div className="space-y-1">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Room Mode
                  </label>
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value as MeetingMode)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700/80 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="general">Standard Meeting</option>
                    <option value="education">Education & Classroom</option>
                    <option value="developer">Developer (Dual-Code Editor)</option>
                    <option value="business">Business & Executive</option>
                    <option value="assessment">Secure Assessment / Exam</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isCreating}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition disabled:opacity-50"
              >
                {isCreating ? "Creating Room..." : "Start Instant Room"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Join with Code */}
            <form onSubmit={handleJoinByCode} className="space-y-4 border-t sm:border-t-0 sm:border-l border-slate-800 pt-6 sm:pt-0 sm:pl-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-teal-400" /> Join Existing Meeting
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Enter an invite code or link
                </p>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="e.g. abc-defg-hij"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition font-mono"
                />
                <p className="text-[11px] text-slate-500">
                  Format: 3 letters, hyphen, 4 letters, hyphen, 3 letters
                </p>
              </div>

              <button
                type="submit"
                disabled={!roomCode.trim()}
                className="w-full py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm flex items-center justify-center gap-2 border border-slate-700 transition disabled:opacity-40"
              >
                Join Room
              </button>
            </form>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <section id="modes" className="mt-20 w-full">
          <h2 className="text-2xl font-bold text-center tracking-tight mb-10">
            Specialized Modes Built For Real Production Workflows
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0e1422] border border-slate-800/80 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Education Mode</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Teacher spotlighting, ordered hand-raise queues, attention scores, synchronized whiteboard, and instant pop-quiz dispatches with grading analytics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1422] border border-slate-800/80 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Dual-Code Editor</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Side-by-side collaborative Monaco editors with Yjs CRDT real-time sync, syntax highlighting for 12+ languages, and isolated execution runners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1422] border border-slate-800/80 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Ghost Mode</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Authorized supervisor observation with zero presence broadcast in participant rosters, read-only feeds, and cryptographically signed audit compliance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1422] border border-slate-800/80 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Secure Proctoring</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Kiosk full-screen enforcement, tab-switch telemetry, secondary monitor detection, and clipboard tamper prevention for verified exams.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1422] border border-slate-800/80 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Captions & Translation</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Sub-300ms live speech-to-text with speaker diarization, real-time multilingual subtitles, and automated post-meeting visual mind maps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1422] border border-slate-800/80 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Business Mode</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Interactive agenda trackers, dynamic confidentiality watermarking on screen shares, and automated AI minutes of meeting distribution.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0a0f1a] py-6 px-6 text-center text-xs text-slate-500">
        Talkive.in &copy; {new Date().getFullYear()} - Production Real-Time Media Platform. Engineered with Next.js 15, Fastify, LiveKit SFU, and PostgreSQL.
      </footer>
    </div>
  );
}
