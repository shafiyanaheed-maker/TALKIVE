"use client";

import DashboardShell from "../../../components/dashboard/dashboard-shell";

const meetings = [
  {
    title: "Team Standup",
    date: "Oct 11, 2025",
    time: "10:00 AM",
    participants: "8 participants",
    status: "Scheduled",
  },
  {
    title: "Product Design Review",
    date: "Oct 10, 2025",
    time: "2:30 PM",
    participants: "12 participants",
    status: "Ended",
  },
  {
    title: "Client Presentation",
    date: "Oct 9, 2025",
    time: "11:00 AM",
    participants: "6 participants",
    status: "Ended",
  },
  {
    title: "Development Sprint Planning",
    date: "Oct 8, 2025",
    time: "9:00 AM",
    participants: "10 participants",
    status: "Scheduled",
  },
];

export default function GeneralDashboardPage() {
  return (
    <DashboardShell
      section="general"
      title="Welcome back, Guest"
      subtitle="Ready to connect and collaborate? Start or join a meeting below."
    >
      <div className="dashboard-action-grid">
        <button type="button" className="dashboard-action primary">
          <span className="action-icon">▣</span>
          <span className="action-text">Start Meeting</span>
        </button>

        <button type="button" className="dashboard-action">
          <span className="action-icon">＋</span>
          <span className="action-text">Join Meeting</span>
        </button>

        <button type="button" className="dashboard-action">
          <span className="action-icon">□</span>
          <span className="action-text">Schedule</span>
        </button>

        <button type="button" className="dashboard-action">
          <span className="action-icon">▷</span>
          <span className="action-text">Recordings</span>
        </button>

        <button type="button" className="dashboard-action">
          <span className="action-icon">▤</span>
          <span className="action-text">Notes</span>
        </button>
      </div>

      <div className="dashboard-search-row">
        <div className="dashboard-search">
          <span>⌕</span>
          <input type="text" placeholder="Search meetings..." />
        </div>

        <div className="dashboard-filter">
          <select defaultValue="All Meetings">
            <option>All Meetings</option>
            <option>Scheduled</option>
            <option>Ended</option>
          </select>
        </div>
      </div>

      <section>
        <h2 className="recent-title">Recent Meetings</h2>

        <div className="dashboard-meeting-list">
          {meetings.map((meeting) => (
            <div className="dashboard-meeting-card" key={meeting.title}>
              <div>
                <h3 className="meeting-title">{meeting.title}</h3>

                <div className="meeting-meta">
                  <span>▣ {meeting.date}</span>
                  <span>◷ {meeting.time}</span>
                  <span>♙ {meeting.participants}</span>
                </div>
              </div>

              <span
                className={`meeting-status ${
                  meeting.status === "Scheduled"
                    ? "scheduled"
                    : "ended"
                }`}
              >
                {meeting.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}