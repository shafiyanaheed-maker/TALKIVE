"use client";

export default function ParticipantStrip({
  participants,
  localVideoRef,
}) {
  return (
    <div className="participant-strip">
      {participants.length === 0 && (
        <div className="empty-participant-state">
          Waiting for participants to join...
        </div>
      )}

      {participants.map((participant) => (
        <div
          className="participant-card"
          key={participant.id}
        >
          {participant.isLocal ? (
            <video
              ref={localVideoRef}
              className="participant-video"
              autoPlay
              playsInline
              muted
            />
          ) : participant.stream ? (
            <video
              className="participant-video"
              autoPlay
              playsInline
              ref={(element) => {
                if (element && participant.stream) {
                  element.srcObject = participant.stream;
                }
              }}
            />
          ) : (
            <div className="participant-placeholder">
              <div className="small-avatar">
                {participant.name
                  .charAt(0)
                  .toUpperCase()}
              </div>
            </div>
          )}

          <div className="participant-name">
            {participant.name}
            {participant.isLocal ? " (You)" : ""}
          </div>

          <div
            className={`participant-mic ${
              participant.microphoneEnabled
                ? ""
                : "muted"
            }`}
          >
            {participant.microphoneEnabled
              ? "🎙"
              : "🔇"}
          </div>
        </div>
      ))}
    </div>
  );
}