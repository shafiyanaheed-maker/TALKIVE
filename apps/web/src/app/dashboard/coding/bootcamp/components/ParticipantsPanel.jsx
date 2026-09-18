"use client";

const participants = [
  {
    id: 1,
    name: "You",
    role: "Host",
    initials: "Y",
    active: true,
  },
  {
    id: 2,
    name: "Alex Johnson",
    role: "Participant",
    initials: "AJ",
    active: true,
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Participant",
    initials: "PS",
    active: true,
  },
  {
    id: 4,
    name: "Daniel Lee",
    role: "Participant",
    initials: "DL",
    active: false,
  },
];

export default function ParticipantsPanel() {
  return (
    <section className="side-panel-section">
      <div className="side-panel-section-header">
        <div>
          <span className="side-panel-eyebrow">TEAM</span>
          <h2>Participants</h2>
        </div>

        <span className="participant-count">
          {participants.length}
        </span>
      </div>

      <div className="participants-list">
        {participants.map((participant) => (
          <div className="participant-row" key={participant.id}>
            <div className="participant-avatar">
              {participant.initials}
            </div>

            <div className="participant-info">
              <strong>{participant.name}</strong>
              <span>{participant.role}</span>
            </div>

            <span
              className={`participant-presence ${
                participant.active ? "active" : ""
              }`}
              title={participant.active ? "Online" : "Offline"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}