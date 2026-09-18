"use client";

import { useRouter } from "next/navigation";

export default function CodingHeader({
  roomName = "Coding Bootcamp",
  roomCode = "CODE-ROOM",
  language = "JavaScript",
  participants = 1,
}) {
  const router = useRouter();

  const copyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
    } catch {
      // Clipboard may be unavailable in some browsers.
    }
  };

  return (
    <header className="coding-header">
      <div className="coding-header-left">
        <button
          type="button"
          className="coding-back-button"
          onClick={() => router.push("/dashboard/coding")}
          aria-label="Back to coding dashboard"
        >
          ←
        </button>

        <div className="coding-brand-mark">
          <span>&lt;/&gt;</span>
        </div>

        <div className="coding-header-title">
          <div className="coding-header-title-row">
            <h1>{roomName}</h1>

            <span className="coding-live-badge">
              <span className="coding-live-dot" />
              LIVE
            </span>
          </div>

          <div className="coding-header-meta">
            <span>Room {roomCode}</span>
            <span className="coding-meta-divider">•</span>
            <span>{language}</span>
            <span className="coding-meta-divider">•</span>
            <span>{participants} participant{participants === 1 ? "" : "s"}</span>
          </div>
        </div>
      </div>

      <div className="coding-header-right">
        <button
          type="button"
          className="coding-room-code-button"
          onClick={copyRoomCode}
          title="Copy room code"
        >
          <span>{roomCode}</span>
          <span className="coding-copy-icon">⧉</span>
        </button>

        <button
          type="button"
          className="coding-header-icon-button"
          onClick={() => router.push("/dashboard/coding")}
          title="Exit coding room"
          aria-label="Exit coding room"
        >
          ×
        </button>
      </div>
    </header>
  );
}