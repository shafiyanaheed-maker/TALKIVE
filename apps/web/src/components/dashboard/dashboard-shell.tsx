"use client";

import Link from "next/link";
import { ReactNode } from "react";

type DashboardShellProps = {
  children: ReactNode;
  section?: "general" | "coding bootcamp" | "business" | string;
  title: string;
  subtitle: string;
};

export default function DashboardShell({
  children,
  section = "general",
  title,
  subtitle,
}: DashboardShellProps) {
  const isCoding = section === "coding bootcamp";
  const isBusiness = section === "business";

  /*
   * DASHBOARD ROUTES
   *
   * General       -> /dashboard
   * Coding        -> /dashboard/coding
   * Business      -> /dashboard/business
   */
  const dashboardPath = isCoding
    ? "/dashboard/coding"
    : isBusiness
      ? "/dashboard/business"
      : "/dashboard";

  const meetingsPath = `${dashboardPath}#meetings`;
  const schedulePath = `${dashboardPath}#schedule`;
  const recordingsPath = `${dashboardPath}#recordings`;
  const notesPath = `${dashboardPath}#notes`;
  const settingsPath = `${dashboardPath}#settings`;

  /*
   * CURRENT MODE
   */
  const modeTitle = isCoding
    ? "CODING BOOTCAMP"
    : isBusiness
      ? "BUSINESS"
      : "GENERAL";

  const modeDescription = isCoding
    ? "Collaborative coding workspace"
    : isBusiness
      ? "Professional business workspace"
      : "Meeting workspace";

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        {/* BRAND */}
        <div className="dashboard-brand">
          <div className="dashboard-brand-mark">T</div>

          <div>
            <div className="dashboard-brand-name">TALKIVE</div>

            <div className="dashboard-brand-tagline">
              Connect. Collaborate.
            </div>
          </div>
        </div>

        {/* CURRENT MODE */}
        <div className="dashboard-mode-card">
          <span className="dashboard-mode-dot" />

          <div>
            <strong>{modeTitle}</strong>

            <span>{modeDescription}</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="dashboard-nav">
          <div className="dashboard-nav-label">WORKSPACE</div>

          <Link
            href={dashboardPath}
            className="dashboard-nav-item"
          >
            <span className="dashboard-nav-icon">⌂</span>
            <span>Dashboard</span>
          </Link>

          <Link
            href={meetingsPath}
            className="dashboard-nav-item"
          >
            <span className="dashboard-nav-icon">▣</span>
            <span>Meetings</span>
          </Link>

          <Link
            href={schedulePath}
            className="dashboard-nav-item"
          >
            <span className="dashboard-nav-icon">□</span>
            <span>Schedule</span>
          </Link>

          <Link
            href={recordingsPath}
            className="dashboard-nav-item"
          >
            <span className="dashboard-nav-icon">▷</span>
            <span>Recordings</span>
          </Link>

          <Link
            href={notesPath}
            className="dashboard-nav-item"
          >
            <span className="dashboard-nav-icon">▤</span>
            <span>Notes</span>
          </Link>
        </nav>

        {/* BOTTOM */}
        <div className="dashboard-sidebar-bottom">
          <Link
            href={settingsPath}
            className="dashboard-nav-item"
          >
            <span className="dashboard-nav-icon">⚙</span>
            <span>Settings</span>
          </Link>

          {/* USER */}
          <div className="dashboard-user">
            <div className="dashboard-user-avatar">G</div>

            <div className="dashboard-user-info">
              <strong>Guest User</strong>

              <span>{modeTitle}</span>
            </div>

            <button
              type="button"
              className="dashboard-user-menu"
              aria-label="User menu"
            >
              •••
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="dashboard-main">
        {/* HEADER */}
        <header className="dashboard-header">
          <div>
            <span className="dashboard-header-section">
              {modeTitle}
            </span>

            <h1>{title}</h1>

            <p>{subtitle}</p>
          </div>

          <div className="dashboard-header-actions">
            {/* NOTIFICATIONS */}
            <button
              type="button"
              className="dashboard-notification"
              aria-label="Notifications"
            >
              ♧
            </button>

            {/* USER */}
            <div className="dashboard-header-user">
              <div className="dashboard-header-avatar">G</div>

              <div>
                <strong>Guest User</strong>

                <span>{modeTitle}</span>
              </div>

              <span className="dashboard-header-chevron">
                ⌄
              </span>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}