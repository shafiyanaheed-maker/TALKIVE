"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

/* =========================================================
   ICONS
========================================================= */

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="4" />
      <path d="M17 3.2a4 4 0 0 1 0 7.6" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11.5a8 8 0 0 1-8 8H7l-4 3v-5.5a8 8 0 1 1 17-5.5Z" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 20 4.2-1 10.6-10.6a2.8 2.8 0 0 0-4-4L4.2 15Z" />
      <path d="m13.5 5.5 5 5" />
      <path d="M4 20h5" />
    </svg>
  );
}

function NotesIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 9-4 3 4 3" />
      <path d="m16 9 4 3-4 3" />
      <path d="m14 5-4 14" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4h8v5a4 4 0 0 1-8 0Z" />
      <path d="M8 6H4v2a4 4 0 0 0 4 4" />
      <path d="M16 6h4v2a4 4 0 0 1-4 4" />
      <path d="M12 13v4" />
      <path d="M8 21h8" />
      <path d="M9 17h6" />
    </svg>
  );
}

function MicIcon({ off = false }: { off?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="8" y="3" width="8" height="12" rx="4" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
      <path d="M8 21h8" />
      {off && <path d="m4 4 16 16" />}
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="12" height="12" rx="2" />
      <path d="m15 10 6-3v10l-6-3Z" />
    </svg>
  );
}

function ScreenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="m9 10 2 2 4-4" />
    </svg>
  );
}

function RecordIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function KeyboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h.01M10 10h.01M13 10h.01M16 10h.01" />
      <path d="M7 14h10" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.5A8 8 0 0 1 8.5 4 8 8 0 1 0 20 15.5Z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.05.05-1.42 1.42-.05-.05a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56V20h-2v-.07a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.88.34l-.05.05-1.42-1.42.05-.05A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.56-1.04H7v-2h.84A1.7 1.7 0 0 0 9.4 10a1.7 1.7 0 0 0-.34-1.88l-.05-.05 1.42-1.42.05.05a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 13.4 5.5V5h2v.5a1.7 1.7 0 0 0 1.04 1.54 1.7 1.7 0 0 0 1.88-.34l.05-.05 1.42 1.42-.05.05A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1.04H21v2h-.04A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}

/* =========================================================
   PARTICIPANT
========================================================= */

function ParticipantCard({
  name,
  gradient = false,
  muted = false,
}: {
  name: string;
  gradient?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`participant-card ${
        gradient ? "participant-gradient" : "participant-empty"
      }`}
    >
      {muted && (
        <div className="participant-muted">
          <MicIcon off />
        </div>
      )}

      {!gradient && (
        <div className="participant-avatar">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
          </svg>
        </div>
      )}

      <span className="participant-label">{name}</span>
    </div>
  );
}

/* =========================================================
   CODE EDITOR
========================================================= */

function CodeEditor() {
  const [language, setLanguage] = useState("JavaScript");

  const [code, setCode] = useState(`// JavaScript
console.log("Hello, World!");`);

  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const runCode = () => {
    if (language !== "JavaScript") {
      setOutput(
        `${language} execution requires a backend compiler service.`
      );
      setShowOutput(true);
      return;
    }

    const logs: string[] = [];

    try {
      const sandboxConsole = {
        log: (...values: unknown[]) => {
          logs.push(
            values
              .map((value) =>
                typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value)
              )
              .join(" ")
          );
        },
      };

      const execute = new Function("console", code);

      execute(sandboxConsole);

      setOutput(
        logs.length
          ? logs.join("\n")
          : "Program finished successfully."
      );
    } catch (error) {
      setOutput(
        `Error: ${
          error instanceof Error
            ? error.message
            : String(error)
        }`
      );
    }

    setShowOutput(true);
  };

  const shareCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard.");
    } catch {
      alert("Could not copy code.");
    }
  };

  const saveCode = () => {
    const blob = new Blob([code], {
      type: "text/javascript",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "talkive-code.js";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <aside className="coding-editor">

      {/* Editor heading */}

      <div className="editor-heading">
        <h2>Code Editor</h2>

        <button
          type="button"
          className="editor-close"
          aria-label="Close code editor"
        >
          ×
        </button>
      </div>

      {/* Language */}

      <div className="editor-language">
        <select
          value={language}
          onChange={(event) =>
            setLanguage(event.target.value)
          }
        >
          <option>JavaScript</option>
          <option>Python</option>
          <option>C++</option>
          <option>Java</option>
        </select>

        <span className="select-arrow">⌄</span>
      </div>

      {/* Buttons */}

      <div className="editor-buttons">

        <button
          type="button"
          className="editor-run"
          onClick={runCode}
        >
          <span>▷</span>
          Run
        </button>

        <button
          type="button"
          className="editor-secondary"
          onClick={shareCode}
        >
          <span>♧</span>
          Share
        </button>

        <button
          type="button"
          className="editor-secondary"
          onClick={saveCode}
        >
          <span>⇩</span>
          Save
        </button>

      </div>

      {/* Code */}

      <div className="editor-code-wrapper">
        <textarea
          className="editor-code"
          value={code}
          onChange={(event) =>
            setCode(event.target.value)
          }
          spellCheck={false}
          aria-label="Code editor"
        />
      </div>

      {/* Output */}

      {showOutput && (
        <div className="compiler-output">

          <div className="compiler-output-title">
            Output
          </div>

          <pre>{output}</pre>

        </div>
      )}

      {/* AI button */}

      <button
        type="button"
        className="editor-ai-button"
        aria-label="AI coding assistant"
      >
        <span>♙</span>
        <i />
      </button>

    </aside>
  );
}

/* =========================================================
   MEETING ROOM
========================================================= */

export default function MeetingRoom() {
  const params = useParams<{ code: string }>();
  const router = useRouter();

  const code = params?.code;

  const isCodingBootcamp = useMemo(
    () => code === "coding-bootcamp",
    [code]
  );

  const [seconds, setSeconds] = useState(181);

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(
      (seconds % 3600) / 60
    );
    const secs = seconds % 60;

    return [
      hours,
      minutes,
      secs,
    ]
      .map((value) =>
        String(value).padStart(2, "0")
      )
      .join(":");
  }, [seconds]);

  const leaveMeeting = () => {
    router.push("/dashboard/coding");
  };

  return (
    <main className="meeting-screen">

      {/* =================================================
          TOP HEADER
      ================================================= */}

      <header className="meeting-topbar">

        <div className="meeting-brand">
          TALKIV<span>E</span>
        </div>

        <div className="meeting-time">
          {formattedTime}
        </div>

        <div className="meeting-top-actions">

          <button
            type="button"
            className="top-action"
            aria-label="Participants"
          >
            <UsersIcon />
          </button>

          <button
            type="button"
            className="top-action"
            aria-label="Chat"
          >
            <ChatIcon />
          </button>

          <button
            type="button"
            className="top-action"
            aria-label="Whiteboard"
          >
            <PenIcon />
          </button>

          <button
            type="button"
            className="top-action"
            aria-label="Notes"
          >
            <NotesIcon />
          </button>

          {isCodingBootcamp && (
            <button
              type="button"
              className="top-action top-action-active"
              aria-label="Code editor"
            >
              <CodeIcon />
            </button>
          )}

          <button
            type="button"
            className="top-action"
            aria-label="Achievements"
          >
            <TrophyIcon />
          </button>

        </div>

      </header>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <section className="meeting-body">

        {/* =================================================
            VIDEO SIDE
        ================================================= */}

        <section className="video-side">

          <div className="main-video">

            <span className="main-participant-name">
              ravalibandari431
            </span>

          </div>

          {/* Participants */}

          <div className="participants">

            <ParticipantCard
              name="Sarah"
              gradient
            />

            <ParticipantCard
              name="Michael"
              gradient
              muted
            />

            <ParticipantCard
              name="Emily"
            />

          </div>

        </section>

        {/* =================================================
            COMPILER
        ================================================= */}

        {isCodingBootcamp && <CodeEditor />}

      </section>

      {/* =================================================
          BOTTOM CONTROLS
      ================================================= */}

      <footer className="meeting-footer">

        {/* Left */}

        <div className="footer-left">

          <button
            type="button"
            className={`footer-green ${
              !micOn ? "control-off" : ""
            }`}
            onClick={() =>
              setMicOn((value) => !value)
            }
            aria-label="Microphone"
          >
            <MicIcon off={!micOn} />
          </button>

          <button
            type="button"
            className={`footer-green ${
              !cameraOn ? "control-off" : ""
            }`}
            onClick={() =>
              setCameraOn((value) => !value)
            }
            aria-label="Camera"
          >
            <CameraIcon />
          </button>

        </div>

        {/* Center */}

        <div className="footer-center">

          <button
            type="button"
            className="footer-large"
          >
            <ScreenIcon />
            <span>Share Screen</span>
          </button>

          <button
            type="button"
            className="footer-large"
          >
            <RecordIcon />
            <span>Record</span>
          </button>

          <button
            type="button"
            className="footer-small"
          >
            <KeyboardIcon />
          </button>

          <button
            type="button"
            className="leave-button"
            onClick={leaveMeeting}
          >
            <span>⌁</span>
            Leave
          </button>

        </div>

        {/* Right */}

        <div className="footer-right">

          <button
            type="button"
            className="footer-small"
          >
            <MoonIcon />
          </button>

          <button
            type="button"
            className="footer-small"
          >
            <SettingsIcon />
          </button>

        </div>

      </footer>

    </main>
  );
}