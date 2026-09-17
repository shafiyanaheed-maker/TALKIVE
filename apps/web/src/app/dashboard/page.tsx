"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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

function generateMeetingCode(length = 8) {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";

  if (typeof window !== "undefined" && window.crypto) {
    const values = new Uint32Array(length);
    window.crypto.getRandomValues(values);

    for (let i = 0; i < length; i += 1) {
      result += characters[values[i] % characters.length];
    }

    return result;
  }

  for (let i = 0; i < length; i += 1) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }

  return result;
}

function generateMeetingPassword(length = 10) {
  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let result = "";

  if (typeof window !== "undefined" && window.crypto) {
    const values = new Uint32Array(length);
    window.crypto.getRandomValues(values);

    for (let i = 0; i < length; i += 1) {
      result += characters[values[i] % characters.length];
    }

    return result;
  }

  for (let i = 0; i < length; i += 1) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }

  return result;
}

export default function DashboardPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All Meetings" | MeetingStatus>(
    "All Meetings"
  );

  const [showCreateMeeting, setShowCreateMeeting] = useState(false);
  const [meetingName, setMeetingName] = useState("");
  const [createdMeeting, setCreatedMeeting] = useState<{
    name: string;
    code: string;
    link: string;
    password: string;
  } | null>(null);

  const [copiedField, setCopiedField] = useState<
    "link" | "password" | null
  >(null);

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

  function openCreateMeeting() {
    setMeetingName("");
    setCreatedMeeting(null);
    setCopiedField(null);
    setShowCreateMeeting(true);
  }

  function closeCreateMeeting() {
    setShowCreateMeeting(false);
    setMeetingName("");
    setCreatedMeeting(null);
    setCopiedField(null);
  }

  function createMeeting() {
    const trimmedName = meetingName.trim();

    if (!trimmedName) {
      return;
    }

    const code = generateMeetingCode();
    const password = generateMeetingPassword();

    const link =
      typeof window !== "undefined"
        ? `${window.location.origin}/room/${code}`
        : `/room/${code}`;

    setCreatedMeeting({
      name: trimmedName,
      code,
      link,
      password,
    });
  }

  async function copyToClipboard(
    value: string,
    field: "link" | "password"
  ) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);

      window.setTimeout(() => {
        setCopiedField(null);
      }, 1800);
    } catch {
      setCopiedField(null);
    }
  }

  function joinCreatedMeeting() {
    if (!createdMeeting) {
      return;
    }

    router.push(`/room/${createdMeeting.code}`);
  }

  return (
    <>
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
              Start a new conversation, join an existing meeting, or manage
              your upcoming sessions from one place.
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
                onClick={
  action.title === "Start Meeting"
    ? () => router.push("/meeting/create")
    : action.title === "Join Meeting"
      ? () => router.push("/meeting/join")
      : undefined
}
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
                <article className="dashboard-meeting-card" key={meeting.id}>
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

      {showCreateMeeting && (
        <div
          className="create-meeting-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-meeting-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCreateMeeting();
            }
          }}
        >
          <div className="create-meeting-modal">
            {!createdMeeting ? (
              <>
                <div className="create-meeting-header">
                  <div className="create-meeting-icon">＋</div>

                  <div>
                    <span className="create-meeting-label">
                      GENERAL MEETING
                    </span>

                    <h2 id="create-meeting-title">Create a Meeting</h2>

                    <p>
                      Give your meeting a name to generate a private meeting
                      link and password.
                    </p>
                  </div>
                </div>

                <div className="create-meeting-form">
                  <label htmlFor="meeting-name">Meeting Name</label>

                  <input
                    id="meeting-name"
                    type="text"
                    placeholder="e.g. Project Discussion"
                    value={meetingName}
                    onChange={(event) => setMeetingName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        createMeeting();
                      }
                    }}
                    autoFocus
                    maxLength={100}
                  />

                  <span className="create-meeting-hint">
                    Choose a clear name so participants know what the meeting
                    is about.
                  </span>
                </div>

                <div className="create-meeting-actions">
                  <button
                    type="button"
                    className="create-meeting-cancel"
                    onClick={closeCreateMeeting}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="create-meeting-submit"
                    onClick={createMeeting}
                    disabled={!meetingName.trim()}
                  >
                    Create Meeting
                    <span>→</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="meeting-created-success">
                  <div className="meeting-success-icon">✓</div>

                  <span className="create-meeting-label">MEETING READY</span>

                  <h2>Meeting Created</h2>

                  <p>
                    Your meeting <strong>{createdMeeting.name}</strong> is
                    ready to share.
                  </p>
                </div>

                <div className="meeting-details">
                  <div className="meeting-detail-row">
                    <div className="meeting-detail-content">
                      <span className="meeting-detail-label">
                        MEETING LINK
                      </span>

                      <span className="meeting-detail-value">
                        {createdMeeting.link}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="meeting-copy-button"
                      onClick={() =>
                        copyToClipboard(createdMeeting.link, "link")
                      }
                    >
                      {copiedField === "link" ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <div className="meeting-detail-row">
                    <div className="meeting-detail-content">
                      <span className="meeting-detail-label">
                        MEETING PASSWORD
                      </span>

                      <span className="meeting-detail-password">
                        {createdMeeting.password}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="meeting-copy-button"
                      onClick={() =>
                        copyToClipboard(
                          createdMeeting.password,
                          "password"
                        )
                      }
                    >
                      {copiedField === "password" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="meeting-created-note">
                  <span>i</span>
                  <p>
                    Keep the password private. Share it only with people you
                    want to allow into this meeting.
                  </p>
                </div>

                <div className="create-meeting-actions">
                  <button
                    type="button"
                    className="create-meeting-cancel"
                    onClick={closeCreateMeeting}
                  >
                    Done
                  </button>

                  <button
                    type="button"
                    className="create-meeting-submit"
                    onClick={joinCreatedMeeting}
                  >
                    Join Meeting
                    <span>→</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .create-meeting-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(15, 23, 19, 0.32);
  backdrop-filter: blur(5px);
}

        .create-meeting-modal {
  width: min(100%, 520px);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  border: 1px solid #dce8e2;
  border-radius: 24px;
  background: #ffffff;
  color: #17211d;
  opacity: 1;
  box-shadow:
    0 28px 80px rgba(0, 0, 0, 0.18);
  padding: 30px;
}

        .create-meeting-header {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .create-meeting-icon {
          display: flex;
          flex: 0 0 auto;
          width: 48px;
          height: 48px;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: #ecfdf5;
          color: #059669;
          font-size: 24px;
          font-weight: 700;
        }

        .create-meeting-label {
          display: block;
          margin-bottom: 6px;
          color: #059669;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .create-meeting-header h2,
        .meeting-created-success h2 {
          margin: 0;
          font-size: 25px;
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .create-meeting-header p,
        .meeting-created-success p {
          margin: 8px 0 0;
          color: var(--muted, #718078);
          font-size: 14px;
          line-height: 1.6;
        }

        .create-meeting-form {
          margin-top: 28px;
        }

        .create-meeting-form label {
          display: block;
          margin-bottom: 9px;
          font-size: 13px;
          font-weight: 700;
        }

        .create-meeting-form input {
          width: 100%;
          height: 50px;
          box-sizing: border-box;
          border: 1px solid var(--border, #e2eae6);
          border-radius: 12px;
          outline: none;
          background: var(--card, #ffffff);
          color: var(--text, #17211d);
          padding: 0 15px;
          font-size: 14px;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .create-meeting-form input::placeholder {
          color: var(--muted, #718078);
        }

        .create-meeting-form input:focus {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.12);
        }

        .create-meeting-hint {
          display: block;
          margin-top: 8px;
          color: var(--muted, #718078);
          font-size: 12px;
          line-height: 1.5;
        }

        .create-meeting-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 28px;
        }

        .create-meeting-cancel,
        .create-meeting-submit {
          min-height: 46px;
          border-radius: 12px;
          padding: 0 18px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            opacity 0.2s ease,
            background 0.2s ease;
        }

        .create-meeting-cancel {
          border: 1px solid var(--border, #e2eae6);
          background: transparent;
          color: var(--text, #17211d);
        }

        .create-meeting-cancel:hover {
          background: rgba(128, 128, 128, 0.08);
        }

        .create-meeting-submit {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 0;
          background: #059669;
          color: #ffffff;
        }

        .create-meeting-submit:hover:not(:disabled) {
          background: #047857;
          transform: translateY(-1px);
        }

        .create-meeting-submit:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .meeting-created-success {
          text-align: center;
        }

        .meeting-success-icon {
          display: flex;
          width: 58px;
          height: 58px;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          border-radius: 50%;
          background: #ecfdf5;
          color: #059669;
          font-size: 25px;
          font-weight: 800;
        }

        .meeting-details {
          margin-top: 28px;
          overflow: hidden;
          border: 1px solid var(--border, #e2eae6);
          border-radius: 16px;
        }

        .meeting-detail-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 18px;
          background: var(--card, #ffffff);
        }

        .meeting-detail-row + .meeting-detail-row {
          border-top: 1px solid var(--border, #e2eae6);
        }

        .meeting-detail-content {
          min-width: 0;
        }

        .meeting-detail-label {
          display: block;
          margin-bottom: 7px;
          color: var(--muted, #718078);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .meeting-detail-value {
          display: block;
          overflow: hidden;
          color: var(--text, #17211d);
          font-size: 13px;
          font-weight: 600;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .meeting-detail-password {
          display: block;
          color: #059669;
          font-family: monospace;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .meeting-copy-button {
          flex: 0 0 auto;
          min-width: 66px;
          height: 36px;
          border: 1px solid #a7dcca;
          border-radius: 9px;
          background: #ecfdf5;
          color: #047857;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .meeting-copy-button:hover {
          background: #d1fae5;
        }

        .meeting-created-note {
          display: flex;
          gap: 10px;
          margin-top: 16px;
          padding: 13px 14px;
          border-radius: 12px;
          background: rgba(5, 150, 105, 0.07);
        }

        .meeting-created-note > span {
          display: flex;
          flex: 0 0 auto;
          width: 20px;
          height: 20px;
          align-items: center;
          justify-content: center;
          border: 1px solid #8bd5ba;
          border-radius: 50%;
          color: #059669;
          font-size: 11px;
          font-weight: 800;
        }

        .meeting-created-note p {
          margin: 0;
          color: var(--muted, #718078);
          font-size: 12px;
          line-height: 1.5;
        }

        @media (max-width: 560px) {
          .create-meeting-overlay {
            padding: 14px;
          }

          .create-meeting-modal {
            padding: 22px;
            border-radius: 20px;
          }

          .create-meeting-header {
            gap: 12px;
          }

          .create-meeting-icon {
            width: 42px;
            height: 42px;
          }

          .create-meeting-header h2,
          .meeting-created-success h2 {
            font-size: 22px;
          }

          .meeting-detail-row {
            align-items: flex-start;
          }

          .meeting-detail-value {
            max-width: 230px;
          }

          .create-meeting-actions {
            flex-direction: column-reverse;
          }

          .create-meeting-cancel,
          .create-meeting-submit {
            width: 100%;
            justify-content: center;
          }
        }

        :global(.dark) .create-meeting-modal {
  --border: #26372f;
  --card: #111c18;
  --text: #f1f7f4;
  --muted: #91a39a;

  background: #111c18;
  color: #f1f7f4;
}

        :global(.dark) .create-meeting-icon,
        :global(.dark) .meeting-success-icon {
          background: #102d23;
        }

        :global(.dark) .create-meeting-form input {
          background: #0d1512;
        }

        :global(.dark) .meeting-detail-row {
          background: #111c18;
        }

        :global(.dark) .meeting-copy-button {
          border-color: #285442;
          background: #102d23;
          color: #34d399;
        }

        :global(.dark) .meeting-copy-button:hover {
          background: #163d30;
        }
      `}</style>
    </>
  );
}