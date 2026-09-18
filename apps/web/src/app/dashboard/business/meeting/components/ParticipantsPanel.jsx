"use client";

export default function ParticipantsPanel({
  participants,
  onClose,
}) {
  return (
    <aside className="side-panel">
      <div className="side-panel-header">
        <div>
          <h2>Participants</h2>
          <span>{participants.length} participants</span>
        </div>

        <button
          type="button"
          className="close-panel-button"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="participants-list">
        {participants.map((participant) => (
          <div
            className="participant-list-item"
            key={participant.id}
          >
            <div className="participant-list-avatar">
              {participant.name
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="participant-list-info">
              <strong>
                {participant.name}
              </strong>

              {participant.isHost && (
                <span className="host-label">
                  Host
                </span>
              )}
            </div>

            <div className="participant-list-status">
              <span>
                {participant.microphoneEnabled
                  ? "🎙"
                  : "🔇"}
              </span>

              <span>
                {participant.cameraEnabled
                  ? "📹"
                  : "📹"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}   