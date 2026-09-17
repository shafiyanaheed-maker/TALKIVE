"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../../../components/dashboard/dashboard-shell";

type RoomStatus = "Live" | "Scheduled" | "Completed";

type CodingRoom = {
  id: number;
  title: string;
  language: string;
  participants: string;
  time: string;
  status: RoomStatus;
};

const codingRooms: CodingRoom[] = [
  {
    id: 1,
    title: "React Fundamentals",
    language: "TypeScript",
    participants: "8 participants",
    time: "10:00 AM",
    status: "Live",
  },
  {
    id: 2,
    title: "Data Structures Workshop",
    language: "Python",
    participants: "14 participants",
    time: "2:00 PM",
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Full Stack Project",
    language: "JavaScript",
    participants: "6 participants",
    time: "4:30 PM",
    status: "Scheduled",
  },
  {
    id: 4,
    title: "Algorithm Challenge",
    language: "C++",
    participants: "10 participants",
    time: "Yesterday",
    status: "Completed",
  },
];

const quickActions = [
  {
    title: "Start Coding",
    description: "Create a collaborative coding room",
    icon: "</>",
    className: "primary",
  },
  {
    title: "Join Code Room",
    description: "Join with a room code",
    icon: "→",
    className: "",
  },
  {
    title: "Projects",
    description: "Open your coding projects",
    icon: "▣",
    className: "",
  },
  {
    title: "Challenges",
    description: "Practice coding challenges",
    icon: "◇",
    className: "",
  },
  {
    title: "Code Notes",
    description: "View your coding notes",
    icon: "▤",
    className: "",
  },
];

export default function CodingDashboardPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "All Rooms" | RoomStatus
  >("All Rooms");

  const filteredRooms = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return codingRooms.filter((room) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        room.title.toLowerCase().includes(normalizedSearch) ||
        room.language.toLowerCase().includes(normalizedSearch);

      const matchesFilter =
        filter === "All Rooms" || room.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const liveCount = codingRooms.filter(
    (room) => room.status === "Live"
  ).length;

  const scheduledCount = codingRooms.filter(
    (room) => room.status === "Scheduled"
  ).length;

  const completedCount = codingRooms.filter(
    (room) => room.status === "Completed"
  ).length;

  return (
    <DashboardShell
      section="coding bootcamp"
      title="Welcome back, Developer"
      subtitle="Build, code and collaborate with your team in real time."
    >
      {/* CODING HERO */}

      <section className="coding-welcome-card">
        <div className="coding-welcome-content">
          <span className="coding-welcome-label">
            CODING BOOTCAMP
          </span>

          <h2>Build together. Code together.</h2>

          <p>
            Create collaborative coding rooms, work on projects,
            solve challenges and learn with your team in real time.
          </p>

          <div className="coding-hero-tags">
            <span>Live Code</span>
            <span>Collaboration</span>
            <span>Multiple Languages</span>
          </div>
        </div>

        <div className="coding-visual">
          <div className="coding-window">
            <div className="coding-window-header">
              <span />
              <span />
              <span />
            </div>

            <div className="coding-lines">
              <span className="code-line short" />
              <span className="code-line long" />
              <span className="code-line medium" />
              <span className="code-line long" />
              <span className="code-line short" />
              <span className="code-line medium" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="dashboard-stats coding-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon coding-icon">
            &lt;/&gt;
          </div>

          <div>
            <span className="dashboard-stat-label">
              CODE ROOMS
            </span>
            <strong>{codingRooms.length}</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon coding-icon">
            ●
          </div>

          <div>
            <span className="dashboard-stat-label">
              LIVE ROOMS
            </span>
            <strong>{liveCount}</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon coding-icon">
            ◷
          </div>

          <div>
            <span className="dashboard-stat-label">
              SCHEDULED
            </span>
            <strong>{scheduledCount}</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon coding-icon">
            ✓
          </div>

          <div>
            <span className="dashboard-stat-label">
              COMPLETED
            </span>
            <strong>{completedCount}</strong>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}

      <section>
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-label">
              CODING TOOLS
            </span>

            <h2>What would you like to do?</h2>
          </div>
        </div>

        <div className="dashboard-action-grid">
          {quickActions.map((action) => (
            <button
              type="button"
              className={`dashboard-action coding-action ${action.className}`}
              key={action.title}
            >
              <span className="action-icon coding-action-icon">
                {action.icon}
              </span>

              <span className="action-text-group">
                <span className="action-text">
                  {action.title}
                </span>

                <span className="action-description">
                  {action.description}
                </span>
              </span>

              <span className="action-arrow">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* CODE ROOMS */}

      <section className="dashboard-meetings-section">
        <div className="dashboard-section-heading">
          <div>
            <span className="dashboard-section-label">
              COLLABORATION
            </span>

            <h2>Code Rooms</h2>
          </div>

          <span className="dashboard-meeting-count">
            {filteredRooms.length} rooms
          </span>
        </div>

        <div className="dashboard-search-row">
          <label className="dashboard-search coding-search">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search rooms or languages..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </label>

          <label className="dashboard-filter">
            <select
              value={filter}
              onChange={(event) =>
                setFilter(
                  event.target.value as
                    | "All Rooms"
                    | RoomStatus
                )
              }
            >
              <option>All Rooms</option>
              <option>Live</option>
              <option>Scheduled</option>
              <option>Completed</option>
            </select>
          </label>
        </div>

        <div className="dashboard-meeting-list">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <article
                className="dashboard-meeting-card coding-room-card"
                key={room.id}
              >
                <div className="meeting-main">
                  <div className="meeting-icon coding-room-icon">
                    &lt;/&gt;
                  </div>

                  <div>
                    <h3 className="meeting-title">
                      {room.title}
                    </h3>

                    <div className="meeting-meta">
                      <span>{room.language}</span>
                      <span>◷ {room.time}</span>
                      <span>♙ {room.participants}</span>
                    </div>
                  </div>
                </div>

                <div className="meeting-card-right">
                  <span
                    className={`meeting-status coding-status ${
                      room.status === "Live"
                        ? "live"
                        : room.status === "Scheduled"
                          ? "scheduled"
                          : "ended"
                    }`}
                  >
                    {room.status}
                  </span>

                  <button
                    type="button"
                    className="meeting-more"
                    aria-label={`More options for ${room.title}`}
                  >
                    •••
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="dashboard-empty-state">
              <div className="empty-icon coding-empty-icon">
                &lt;/&gt;
              </div>

              <h3>No code rooms found</h3>

              <p>
                Try changing your search or selecting another
                filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </DashboardShell>
  );
}