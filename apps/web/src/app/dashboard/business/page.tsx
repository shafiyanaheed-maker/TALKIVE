"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  FileText,
  Filter,
  Headphones,
  Plus,
  Search,
  Users,
  Video,
} from "lucide-react";
import DashboardShell from "../../../components/dashboard/dashboard-shell";

type MeetingStatus = "Live" | "Scheduled" | "Completed";

type BusinessMeeting = {
  id: number;
  title: string;
  type: string;
  participants: number;
  date: string;
  time: string;
  status: MeetingStatus;
};

const businessMeetings: BusinessMeeting[] = [
  {
    id: 1,
    title: "Product Strategy Meeting",
    type: "Strategy",
    participants: 12,
    date: "Today",
    time: "10:00 AM",
    status: "Live",
  },
  {
    id: 2,
    title: "Client Presentation",
    type: "Client",
    participants: 8,
    date: "Tomorrow",
    time: "2:00 PM",
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Team Planning",
    type: "Team",
    participants: 15,
    date: "Oct 13, 2026",
    time: "11:30 AM",
    status: "Scheduled",
  },
  {
    id: 4,
    title: "Quarterly Review",
    type: "Review",
    participants: 10,
    date: "Oct 8, 2026",
    time: "3:00 PM",
    status: "Completed",
  },
];

const quickActions = [
  {
    title: "Start Meeting",
    description: "Start a business meeting instantly",
    icon: Video,
    primary: true,
  },
  {
    title: "Join Meeting",
    description: "Join using a meeting code",
    icon: ArrowRight,
    primary: false,
  },
  {
    title: "Schedule Meeting",
    description: "Plan your next meeting",
    icon: CalendarDays,
    primary: false,
  },
  {
    title: "Team",
    description: "Manage your business team",
    icon: Users,
    primary: false,
  },
  {
    title: "Meeting Notes",
    description: "Access your business notes",
    icon: FileText,
    primary: false,
  },
];

export default function BusinessDashboardPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "All Meetings" | "Live" | "Scheduled" | "Completed"
  >("All Meetings");

  const filteredMeetings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return businessMeetings.filter((meeting) => {
      const matchesSearch =
        query.length === 0 ||
        meeting.title.toLowerCase().includes(query) ||
        meeting.type.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All Meetings" || meeting.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const liveCount = businessMeetings.filter(
    (meeting) => meeting.status === "Live"
  ).length;

  const scheduledCount = businessMeetings.filter(
    (meeting) => meeting.status === "Scheduled"
  ).length;

  const completedCount = businessMeetings.filter(
    (meeting) => meeting.status === "Completed"
  ).length;

  return (
    <DashboardShell
      section="business"
      title="Welcome back, Business User"
      subtitle="Connect your team, manage meetings and collaborate with confidence."
    >
      <div className="business-dashboard">
        {/* HERO */}
        <section className="business-hero">
          <div className="business-hero-content">
            <div className="business-hero-icon">
              <BriefcaseBusiness size={26} strokeWidth={1.8} />
            </div>

            <div>
              <span className="business-eyebrow">
                BUSINESS WORKSPACE
              </span>

              <h1>Work better together.</h1>

              <p>
                Run professional meetings, collaborate with your team and
                keep everything organized in one secure workspace.
              </p>
            </div>
          </div>

          <button className="business-primary-button">
            <Plus size={18} />
            Start Meeting
          </button>
        </section>

        {/* STATS */}
        <section className="business-stats">
          <div className="business-stat-card">
            <div className="business-stat-icon live">
              <Video size={19} />
            </div>

            <div>
              <span>Live Meetings</span>
              <strong>{liveCount}</strong>
            </div>
          </div>

          <div className="business-stat-card">
            <div className="business-stat-icon">
              <CalendarDays size={19} />
            </div>

            <div>
              <span>Scheduled</span>
              <strong>{scheduledCount}</strong>
            </div>
          </div>

          <div className="business-stat-card">
            <div className="business-stat-icon">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <span>Completed</span>
              <strong>{completedCount}</strong>
            </div>
          </div>

          <div className="business-stat-card">
            <div className="business-stat-icon">
              <Users size={19} />
            </div>

            <div>
              <span>Team Members</span>
              <strong>24</strong>
            </div>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="business-section">
          <div className="business-section-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>
                Everything you need to manage your business meetings.
              </p>
            </div>
          </div>

          <div className="business-actions">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  className={`business-action-card ${
                    action.primary ? "primary" : ""
                  }`}
                >
                  <div className="business-action-icon">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <div className="business-action-content">
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                  </div>

                  <ArrowRight
                    className="business-action-arrow"
                    size={17}
                  />
                </button>
              );
            })}
          </div>
        </section>

        {/* BUSINESS MEETINGS */}
        <section className="business-section">
          <div className="business-meeting-header">
            <div>
              <h2>Business Meetings</h2>
              <p>
                Manage your upcoming and previous meetings.
              </p>
            </div>

            <button className="business-view-button">
              View all
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="business-meeting-toolbar">
            <div className="business-search">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search meetings..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="business-filter">
              <Filter size={15} />

              <select
                value={filter}
                onChange={(event) =>
                  setFilter(
                    event.target.value as
                      | "All Meetings"
                      | "Live"
                      | "Scheduled"
                      | "Completed"
                  )
                }
              >
                <option>All Meetings</option>
                <option>Live</option>
                <option>Scheduled</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className="business-meeting-table">
            <div className="business-table-header">
              <span>Meeting</span>
              <span>Participants</span>
              <span>Date &amp; Time</span>
              <span>Status</span>
              <span />
            </div>

            {filteredMeetings.length > 0 ? (
              filteredMeetings.map((meeting) => (
                <div
                  className="business-table-row"
                  key={meeting.id}
                >
                  <div className="business-meeting-name">
                    <div className="business-meeting-icon">
                      <Video size={17} />
                    </div>

                    <div>
                      <strong>{meeting.title}</strong>
                      <span>{meeting.type}</span>
                    </div>
                  </div>

                  <div className="business-participants">
                    <Users size={15} />
                    {meeting.participants}
                  </div>

                  <div className="business-date">
                    <strong>{meeting.date}</strong>
                    <span>{meeting.time}</span>
                  </div>

                  <div>
                    <span
                      className={`business-status ${meeting.status.toLowerCase()}`}
                    >
                      <span className="business-status-dot" />
                      {meeting.status}
                    </span>
                  </div>

                  <button
                    className="business-row-arrow"
                    aria-label="Open meeting"
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>
              ))
            ) : (
              <div className="business-empty">
                <Search size={22} />
                <strong>No meetings found</strong>
                <span>
                  Try changing your search or filter.
                </span>
              </div>
            )}
          </div>
        </section>

        {/* BUSINESS TOOLS */}
        <section className="business-tools-grid">
          <div className="business-tool-card">
            <div className="business-tool-icon">
              <Headphones size={22} />
            </div>

            <div>
              <h3>AI Meeting Assistant</h3>
              <p>
                Get intelligent meeting summaries, action items and
                conversation insights.
              </p>
            </div>

            <button>
              Explore
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="business-tool-card">
            <div className="business-tool-icon">
              <FileText size={22} />
            </div>

            <div>
              <h3>Business Notes</h3>
              <p>
                Keep meeting notes, decisions and important
                information organized.
              </p>
            </div>

            <button>
              Open Notes
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </div>

      <style jsx>{`
        /* =========================================================
           BUSINESS DASHBOARD
        ========================================================= */

        .business-dashboard {
          --business-bg: #f7faf9;
          --business-card: #ffffff;
          --business-card-soft: #f4fbf7;
          --business-border: #e2eae6;
          --business-border-soft: #edf2ef;
          --business-text: #17211d;
          --business-text-2: #34433c;
          --business-muted: #718078;
          --business-muted-2: #89978f;
          --business-primary: #059669;
          --business-primary-hover: #047857;
          --business-light: #ecfdf5;

          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }

        /* =========================================================
           HERO
        ========================================================= */

        .business-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 30px 32px;
          border: 1px solid var(--business-border);
          border-radius: 18px;
          background: linear-gradient(
            135deg,
            var(--business-card) 0%,
            var(--business-card-soft) 100%
          );
        }

        .business-hero-content {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .business-hero-icon {
          width: 58px;
          height: 58px;
          flex: 0 0 58px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          background: var(--business-light);
          border: 1px solid #ccefe0;
          color: var(--business-primary);
        }

        .business-eyebrow {
          display: block;
          margin-bottom: 7px;
          color: var(--business-primary);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .business-hero h1 {
          margin: 0;
          color: var(--business-text);
          font-size: 28px;
          line-height: 1.2;
          letter-spacing: -0.035em;
          font-weight: 800;
        }

        .business-hero p {
          max-width: 620px;
          margin: 7px 0 0;
          color: var(--business-muted);
          font-size: 13px;
          line-height: 1.6;
        }

        .business-primary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 150px;
          padding: 12px 18px;
          border: 0;
          border-radius: 10px;
          background: var(--business-primary);
          color: white;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .business-primary-button:hover {
          background: var(--business-primary-hover);
          transform: translateY(-1px);
        }

        /* =========================================================
           STATS
        ========================================================= */

        .business-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .business-stat-card {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 20px;
          border: 1px solid var(--business-border);
          border-radius: 15px;
          background: var(--business-card);
        }

        .business-stat-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: var(--business-light);
          color: var(--business-primary);
        }

        .business-stat-icon.live {
          background: #dff8ec;
        }

        .business-stat-card span {
          display: block;
          color: var(--business-muted);
          font-size: 11px;
          margin-bottom: 4px;
        }

        .business-stat-card strong {
          display: block;
          color: var(--business-text);
          font-size: 21px;
          line-height: 1;
          font-weight: 800;
        }

        /* =========================================================
           SECTIONS
        ========================================================= */

        .business-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .business-section-heading,
        .business-meeting-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .business-section-heading h2,
        .business-meeting-header h2 {
          margin: 0;
          color: var(--business-text);
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .business-section-heading p,
        .business-meeting-header p {
          margin: 5px 0 0;
          color: var(--business-muted);
          font-size: 12px;
        }

        /* =========================================================
           QUICK ACTIONS
        ========================================================= */

        .business-actions {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .business-action-card {
          position: relative;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 19px;
          border: 1px solid var(--business-border);
          border-radius: 14px;
          background: var(--business-card);
          text-align: left;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .business-action-card:hover {
          transform: translateY(-2px);
          border-color: #b8dfcf;
          box-shadow: 0 8px 24px rgba(19, 56, 43, 0.07);
        }

        .business-action-card.primary {
          background: var(--business-primary);
          border-color: var(--business-primary);
        }

        .business-action-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: var(--business-light);
          color: var(--business-primary);
        }

        .business-action-card.primary .business-action-icon {
          background: rgba(255, 255, 255, 0.14);
          color: white;
        }

        .business-action-content {
          margin-top: auto;
          padding-right: 18px;
        }

        .business-action-content h3 {
          margin: 0 0 5px;
          color: var(--business-text);
          font-size: 13px;
          font-weight: 750;
        }

        .business-action-card.primary .business-action-content h3 {
          color: white;
        }

        .business-action-content p {
          margin: 0;
          color: var(--business-muted);
          font-size: 10px;
          line-height: 1.5;
        }

        .business-action-card.primary .business-action-content p {
          color: rgba(255, 255, 255, 0.75);
        }

        .business-action-arrow {
          position: absolute;
          top: 20px;
          right: 18px;
          color: var(--business-muted-2);
        }

        .business-action-card.primary .business-action-arrow {
          color: rgba(255, 255, 255, 0.8);
        }

        /* =========================================================
           MEETINGS
        ========================================================= */

        .business-view-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 11px;
          border: 1px solid var(--business-border);
          border-radius: 8px;
          background: var(--business-card);
          color: var(--business-primary);
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .business-meeting-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .business-search {
          flex: 1;
          max-width: 420px;
          height: 40px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 13px;
          border: 1px solid var(--business-border);
          border-radius: 9px;
          background: var(--business-card);
          color: var(--business-muted-2);
        }

        .business-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--business-text);
          font-size: 12px;
        }

        .business-search input::placeholder {
          color: var(--business-muted-2);
        }

        .business-filter {
          height: 40px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 11px;
          border: 1px solid var(--business-border);
          border-radius: 9px;
          background: var(--business-card);
          color: var(--business-muted);
        }

        .business-filter select {
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--business-text-2);
          font-size: 11px;
          cursor: pointer;
        }

        .business-meeting-table {
          overflow: hidden;
          border: 1px solid var(--business-border);
          border-radius: 14px;
          background: var(--business-card);
        }

        .business-table-header,
        .business-table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1.2fr 1fr 40px;
          align-items: center;
          column-gap: 20px;
        }

        .business-table-header {
          min-height: 42px;
          padding: 0 18px;
          background: var(--business-bg);
          border-bottom: 1px solid var(--business-border);
          color: var(--business-muted-2);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .business-table-row {
          min-height: 76px;
          padding: 0 18px;
          border-bottom: 1px solid var(--business-border-soft);
          background: var(--business-card);
        }

        .business-table-row:last-child {
          border-bottom: 0;
        }

        .business-meeting-name {
          display: flex;
          align-items: center;
          gap: 11px;
          min-width: 0;
        }

        .business-meeting-icon {
          width: 36px;
          height: 36px;
          flex: 0 0 36px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          background: var(--business-light);
          color: var(--business-primary);
        }

        .business-meeting-name strong,
        .business-date strong {
          display: block;
          color: var(--business-text-2);
          font-size: 12px;
          font-weight: 700;
        }

        .business-meeting-name span,
        .business-date span {
          display: block;
          margin-top: 3px;
          color: var(--business-muted-2);
          font-size: 10px;
        }

        .business-participants {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--business-muted);
          font-size: 11px;
        }

        .business-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 8px;
          border-radius: 999px;
          font-size: 9px;
          font-weight: 700;
        }

        .business-status.live {
          background: #e8f9f0;
          color: #148653;
        }

        .business-status.scheduled {
          background: #edf7f3;
          color: #387563;
        }

        .business-status.completed {
          background: #f1f4f2;
          color: #74827b;
        }

        .business-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
        }

        .business-row-arrow {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--business-muted-2);
          cursor: pointer;
        }

        .business-row-arrow:hover {
          background: var(--business-light);
          color: var(--business-primary);
        }

        .business-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 180px;
          color: var(--business-muted-2);
        }

        .business-empty strong {
          color: var(--business-text-2);
          font-size: 13px;
        }

        .business-empty span {
          font-size: 11px;
        }

        /* =========================================================
           BUSINESS TOOLS
        ========================================================= */

        .business-tools-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .business-tool-card {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 15px;
          padding: 21px;
          border: 1px solid var(--business-border);
          border-radius: 14px;
          background: var(--business-card);
        }

        .business-tool-icon {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: var(--business-light);
          color: var(--business-primary);
        }

        .business-tool-card h3 {
          margin: 0 0 5px;
          color: var(--business-text-2);
          font-size: 13px;
          font-weight: 750;
        }

        .business-tool-card p {
          margin: 0;
          color: var(--business-muted);
          font-size: 10px;
          line-height: 1.55;
        }

        .business-tool-card button {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          border: 0;
          background: transparent;
          color: var(--business-primary);
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        /* =========================================================
           DARK MODE
        ========================================================= */

        :global(.dark) .business-dashboard {
          --business-bg: #0d1512;
          --business-card: #111c18;
          --business-card-soft: #14231d;
          --business-border: #26372f;
          --business-border-soft: #1d2d26;
          --business-text: #f1f7f4;
          --business-text-2: #dce9e3;
          --business-muted: #91a39a;
          --business-muted-2: #71837a;
          --business-primary: #10b981;
          --business-primary-hover: #059669;
          --business-light: #102d23;
        }

        :global(.dark) .business-hero {
          background: linear-gradient(
            135deg,
            #111c18 0%,
            #14251e 100%
          );
          border-color: #26372f;
        }

        :global(.dark) .business-hero-icon {
          border-color: #24513f;
        }

        :global(.dark) .business-stat-icon {
          background: #102d23;
        }

        :global(.dark) .business-stat-icon.live {
          background: #123c2c;
        }

        :global(.dark) .business-action-card {
          box-shadow: none;
        }

        :global(.dark) .business-action-card:hover {
          border-color: #31634f;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
        }

        :global(.dark) .business-action-card.primary {
          background: #059669;
          border-color: #059669;
        }

        :global(.dark) .business-action-icon {
          background: #102d23;
        }

        :global(.dark) .business-action-card.primary
          .business-action-icon {
          background: rgba(255, 255, 255, 0.14);
        }

        :global(.dark) .business-view-button:hover {
          background: #102d23;
        }

        :global(.dark) .business-search input {
          color: #f1f7f4;
        }

        :global(.dark) .business-filter select {
          color: #dce9e3;
        }

        :global(.dark) .business-table-header {
          background: #0f1915;
        }

        :global(.dark) .business-table-row {
          background: #111c18;
        }

        :global(.dark) .business-table-row:hover {
          background: #14231d;
        }

        :global(.dark) .business-meeting-icon,
        :global(.dark) .business-tool-icon {
          background: #102d23;
        }

        :global(.dark) .business-status.live {
          background: #123c2c;
          color: #5ee0ad;
        }

        :global(.dark) .business-status.scheduled {
          background: #153127;
          color: #79b9a0;
        }

        :global(.dark) .business-status.completed {
          background: #202a26;
          color: #9aa9a2;
        }

        :global(.dark) .business-row-arrow:hover {
          background: #102d23;
        }

        /* =========================================================
           SUPPORT OTHER COMMON DARK THEME SELECTORS
        ========================================================= */

        :global([data-theme="dark"]) .business-dashboard {
          --business-bg: #0d1512;
          --business-card: #111c18;
          --business-card-soft: #14231d;
          --business-border: #26372f;
          --business-border-soft: #1d2d26;
          --business-text: #f1f7f4;
          --business-text-2: #dce9e3;
          --business-muted: #91a39a;
          --business-muted-2: #71837a;
          --business-primary: #10b981;
          --business-primary-hover: #059669;
          --business-light: #102d23;
        }

        :global([data-theme="dark"]) .business-hero {
          background: linear-gradient(
            135deg,
            #111c18 0%,
            #14251e 100%
          );
        }

        :global([data-theme="dark"]) .business-table-header {
          background: #0f1915;
        }

        :global([data-theme="dark"]) .business-table-row {
          background: #111c18;
        }

        :global([data-theme="dark"]) .business-table-row:hover {
          background: #14231d;
        }

        /* =========================================================
           RESPONSIVE
        ========================================================= */

        @media (max-width: 1100px) {
          .business-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .business-actions {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 800px) {
          .business-hero {
            align-items: flex-start;
            flex-direction: column;
          }

          .business-primary-button {
            width: 100%;
          }

          .business-actions {
            grid-template-columns: repeat(2, 1fr);
          }

          .business-table-header {
            display: none;
          }

          .business-table-row {
            grid-template-columns: 1fr auto;
            row-gap: 10px;
            padding: 17px;
          }

          .business-participants,
          .business-date {
            display: none;
          }

          .business-status {
            justify-self: start;
          }

          .business-tools-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          .business-stats,
          .business-actions {
            grid-template-columns: 1fr;
          }

          .business-hero {
            padding: 22px;
          }

          .business-hero-content {
            align-items: flex-start;
          }

          .business-meeting-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .business-search {
            max-width: none;
          }

          .business-filter {
            width: fit-content;
          }

          .business-tool-card {
            grid-template-columns: auto 1fr;
          }

          .business-tool-card button {
            grid-column: 2;
          }
        }
      `}</style>
    </DashboardShell>
  );
}