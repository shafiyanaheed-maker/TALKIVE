"use client";

export default function MeetingHeader({
  meetingCode,
  elapsedTime,
  connected,
  activePanel,
  onPanelChange,
}) {
  return (
    <header className="meeting-header">
      <div className="meeting-brand">
        <span className="meeting-brand-name">TALKIVE</span>

        <span className="meeting-duration">{elapsedTime}</span>

        <span
          className={`connection-status ${
            connected ? "online" : "offline"
          }`}
        >
          <span className="connection-dot" />
          {connected ? "Connected" : "Connecting"}
        </span>
      </div>

      <div className="meeting-header-actions">
        <button
          type="button"
          className={`header-icon-button ${
            activePanel === "participants" ? "active" : ""
          }`}
          onClick={() => onPanelChange("participants")}
          title="Participants"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </button>

        <button
          type="button"
          className={`header-icon-button ${
            activePanel === "chat" ? "active" : ""
          }`}
          onClick={() => onPanelChange("chat")}
          title="Chat"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>

        <button
          type="button"
          className={`header-icon-button ${
            activePanel === "notes" ? "active" : ""
          }`}
          onClick={() => onPanelChange("notes")}
          title="Notes"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
          </svg>
        </button>

        <div className="meeting-code-display">
          <span>Meeting</span>
          <strong>{meetingCode}</strong>
        </div>
      </div>
    </header>
  );
}