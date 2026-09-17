"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../../components/dashboard/dashboard-shell";

type MeetingStatus = "Scheduled" | "Ended";

type Meeting = {
  id: number;
  title: string;
  date: string;
  time: string;
  participants: string;
  status: MeetingStatus;
};

const meetings: Meeting[] = [
  {
    id: 1,
    title: "Team Standup",
    date: "Oct 11, 2025",
    time: "10:00 AM",
    participants: "8 participants",
    status: "Scheduled",
  },
  {
    id: 2,
    title: "Product Design Review",
    date: "Oct 10, 2025",
    time: "2:30 PM",
    participants: "12 participants",
    status: "Ended",
  },
  {
    id: 3,
    title: "Client Presentation",
    date: "Oct 9, 2025",
    time: "11:00 AM",
    participants: "6 participants",
    status: "Ended",
  },
  {
    id: 4,
    title: "Development Sprint Planning",
    date: "Oct 8, 2025",
    time: "9:00 AM",
    participants: "10 participants",
    status: "Scheduled",
  },
];

const quickActions = [
  {
    title: "Start Meeting",
    description: "Start a new meeting instantly",
    icon: "＋",
    className: "primary",
  },
  {
    title: "Join Meeting",
    description: "Join using a meeting code",
    icon: "→",
    className: "",
  },
  {
    title: "Schedule",
    description: "Plan a meeting for later",
    icon: "□",
    className: "",
  },
  {
    title: "Recordings",
    description: "View your meeting recordings",
    icon: "▷",
    className: "",
  },
  {
    title: "Notes",
    description: "Access your meeting notes",
    icon: "▤",
    className: "",
  },
];

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All Meetings" | MeetingStatus>(
    "All Meetings"
  );

  const filteredMeetings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return meetings.filter((meeting) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        meeting.title.toLowerCase().includes(normalizedSearch);

      const matchesFilter =
        filter === "All Meetings" || meeting.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const scheduledCount = meetings.filter(
    (meeting) => meeting.status === "Scheduled"
  ).length;

  const endedCount = meetings.filter(
    (meeting) => meeting.status === "Ended"
  ).length;

  return (
    <DashboardShell
      section="general"
      title="Welcome back, Guest"
      subtitle="Ready to connect and collaborate? Start or join a meeting below."
    >
      <section className="dashboard-welcome-card">
        <div className="dashboard-welcome-content">
          <span className="dashboard-welcome-label">
            GENERAL MEETING SPACE
          </span>

          <h2>Your workspace for better conversations.</h2>

          <p>
            Start a new conversation, join an existing meeting, or manage your
            upcoming sessions from one place.
          </p>
        </div>

        <div className="dashboard-welcome-decoration">
          <div className="welcome-orb welcome-orb-one" />
          <div className="welcome-orb welcome-orb-two" />
          <div className="welcome-orb welcome-orb-three" />
        </div>
      </section>

      <section className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">▣</div>

          <div>
            <span className="dashboard-stat-label">TOTAL MEETINGS</span>
            <strong>{meetings.length}</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">◷</div>

          <div>
            <span className="dashboard-stat-label">SCHEDULED</span>
            <strong>{scheduledCount}</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">✓</div>

          <div>
            <span className="dashboard-stat-label">COMPLETED</span>
            <strong>{endedCount}</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">♙</div>

          <div>
            <span className="dashboard-stat-label">PARTICIPANTS</span>
            <strong>36+</strong>
          </div>
        </div>
      </section>

      <section>
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-label">QUICK ACCESS</span>
            <h2>What would you like to do?</h2>
          </div>
        </div>

        <div className="dashboard-action-grid">
          {quickActions.map((action) => (
            <button
              type="button"
              className={`dashboard-action ${action.className}`}
              key={action.title}
            >
              <span className="action-icon">{action.icon}</span>

              <span className="action-text-group">
                <span className="action-text">{action.title}</span>
                <span className="action-description">
                  {action.description}
                </span>
              </span>

              <span className="action-arrow">→</span>
            </button>
          ))}
        </div>
      </section>

      <section className="dashboard-meetings-section">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-label">MEETINGS</span>
            <h2>Recent Meetings</h2>
          </div>

          <span className="dashboard-meeting-count">
            {filteredMeetings.length} meetings
          </span>
        </div>

        <div className="dashboard-search-row">
          <label className="dashboard-search">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search meetings..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label className="dashboard-filter">
            <select
              value={filter}
              onChange={(event) =>
                setFilter(
                  event.target.value as "All Meetings" | MeetingStatus
                )
              }
            >
              <option>All Meetings</option>
              <option>Scheduled</option>
              <option>Ended</option>
            </select>
          </label>
        </div>

        <div className="dashboard-meeting-list">
          {filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting) => (
              <article
                className="dashboard-meeting-card"
                key={meeting.id}
              >
                <div className="meeting-main">
                  <div className="meeting-icon">▣</div>

                  <div>
                    <h3 className="meeting-title">{meeting.title}</h3>

                    <div className="meeting-meta">
                      <span>▣ {meeting.date}</span>
                      <span>◷ {meeting.time}</span>
                      <span>♙ {meeting.participants}</span>
                    </div>
                  </div>
                </div>

                <div className="meeting-card-right">
                  <span
                    className={`meeting-status ${
                      meeting.status === "Scheduled"
                        ? "scheduled"
                        : "ended"
                    }`}
                  >
                    {meeting.status}
                  </span>

                  <button
                    type="button"
                    className="meeting-more"
                    aria-label={`More options for ${meeting.title}`}
                  >
                    •••
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="dashboard-empty-state">
              <div className="empty-icon">⌕</div>

              <h3>No meetings found</h3>

              <p>
                Try changing your search or selecting a different filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </DashboardShell>
  );
}