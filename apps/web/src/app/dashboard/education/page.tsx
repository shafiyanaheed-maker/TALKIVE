"use client";

import DashboardShell from "../../../components/dashboard/dashboard-shell";

const classes = [
  {
    title: "Mathematics - Algebra",
    date: "Oct 14, 2025",
    time: "10:00 AM",
    participants: "32 students",
    status: "Scheduled",
  },
  {
    title: "Physics - Mechanics",
    date: "Oct 13, 2025",
    time: "2:00 PM",
    participants: "28 students",
    status: "Scheduled",
  },
  {
    title: "English Communication",
    date: "Oct 12, 2025",
    time: "11:00 AM",
    participants: "24 students",
    status: "Ended",
  },
  {
    title: "Science Discussion",
    date: "Oct 11, 2025",
    time: "3:30 PM",
    participants: "20 students",
    status: "Ended",
  },
];

export default function EducationDashboardPage() {
  return (
    <DashboardShell
      section="education"
      title="Welcome to Education"
      subtitle="Teach, learn and collaborate with your students from one place."
    >
      <div className="dashboard-action-grid">
        <button type="button" className="dashboard-action primary">
          <span className="action-icon">▣</span>
          <span className="action-text">Start Class</span>
        </button>

        <button type="button" className="dashboard-action">
          <span className="action-icon">＋</span>
          <span className="action-text">Join Class</span>
        </button>

        <button type="button" className="dashboard-action">
          <span className="action-icon">□</span>
          <span className="action-text">Schedule Class</span>
        </button>

        <button type="button" className="dashboard-action">
          <span className="action-icon">✎</span>
          <span className="action-text">Whiteboard</span>
        </button>

        <button type="button" className="dashboard-action">
          <span className="action-icon">▤</span>
          <span className="action-text">AI Notes</span>
        </button>
      </div>

      <div className="dashboard-search-row">
        <div className="dashboard-search">
          <span>⌕</span>
          <input type="text" placeholder="Search classes..." />
        </div>

        <div className="dashboard-filter">
          <select defaultValue="All Classes">
            <option>All Classes</option>
            <option>Scheduled</option>
            <option>Ended</option>
          </select>
        </div>
      </div>

      <section>
        <h2 className="recent-title">Upcoming & Recent Classes</h2>

        <div className="dashboard-meeting-list">
          {classes.map((item) => (
            <div className="dashboard-meeting-card" key={item.title}>
              <div>
                <h3 className="meeting-title">{item.title}</h3>

                <div className="meeting-meta">
                  <span>▣ {item.date}</span>
                  <span>◷ {item.time}</span>
                  <span>♙ {item.participants}</span>
                </div>
              </div>

              <span
                className={`meeting-status ${
                  item.status === "Scheduled"
                    ? "scheduled"
                    : "ended"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}