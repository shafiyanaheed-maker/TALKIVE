"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  FileText,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Settings,
  Users,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";

type DashboardShellProps = {
  children: ReactNode;
  section?: "general" | "coding bootcamp" | "business" | string;
  title: string;
  subtitle: string;
};

type NavigationItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
};

export default function DashboardShell({
  children,
  section = "general",
  title,
  subtitle,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCoding = section === "coding bootcamp";
  const isBusiness = section === "business";

  const dashboardPath = isCoding
    ? "/dashboard/coding"
    : isBusiness
      ? "/dashboard/business"
      : "/dashboard";

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

  const navigation: NavigationItem[] = isCoding
    ? [
        {
          label: "Dashboard",
          href: "/dashboard/coding",
          icon: LayoutDashboard,
        },
        {
          label: "Coding Rooms",
          href: "/dashboard/coding#coding-rooms",
          icon: Code2,
        },
        {
          label: "Students",
          href: "/dashboard/coding#students",
          icon: Users,
        },
        {
          label: "Meetings",
          href: "/dashboard/coding#meetings",
          icon: Video,
        },
        {
          label: "Projects",
          href: "/dashboard/coding#projects",
          icon: FileText,
        },
        {
          label: "Settings",
          href: "/dashboard/coding#settings",
          icon: Settings,
        },
      ]
    : isBusiness
      ? [
          {
            label: "Dashboard",
            href: "/dashboard/business",
            icon: LayoutDashboard,
          },
          {
            label: "Meetings",
            href: "/dashboard/business#meetings",
            icon: Video,
          },
          {
            label: "Schedule",
            href: "/dashboard/business#schedule",
            icon: BookOpen,
          },
          {
            label: "Team",
            href: "/dashboard/business#team",
            icon: Users,
          },
          {
            label: "Notes",
            href: "/dashboard/business#notes",
            icon: MessageSquare,
          },
          {
            label: "Settings",
            href: "/dashboard/business#settings",
            icon: Settings,
          },
        ]
      : [
          {
            label: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            label: "Meetings",
            href: "/dashboard#meetings",
            icon: Video,
          },
          {
            label: "Schedule",
            href: "/dashboard#schedule",
            icon: BookOpen,
          },
          {
            label: "Recordings",
            href: "/dashboard#recordings",
            icon: FileText,
          },
          {
            label: "Notes",
            href: "/dashboard#notes",
            icon: MessageSquare,
          },
          {
            label: "Settings",
            href: "/dashboard#settings",
            icon: Settings,
          },
        ];

  return (
    <div className="dashboard-shell">
      <style jsx>{`
        .dashboard-shell {
          min-height: 100vh;
          background: var(--dashboard-bg);
          color: var(--dashboard-text);
        }

        .dashboard-layout {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          position: fixed;
          inset: 0 auto 0 0;
          width: 260px;
          background: var(--dashboard-card);
          border-right: 1px solid var(--dashboard-border);
          display: flex;
          flex-direction: column;
          z-index: 50;
        }

        .brand {
          height: 78px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          border-bottom: 1px solid var(--dashboard-border);
        }

        .brand-link {
          text-decoration: none;
          color: inherit;
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .brand-mark {
          width: 36px;
          height: 36px;
          border-radius: 11px;
          background: linear-gradient(135deg, #059669, #10b981);
          display: grid;
          place-items: center;
          color: white;
          font-size: 15px;
          font-weight: 800;
        }

        .brand-name {
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .mode-card {
          margin: 20px 16px 14px;
          padding: 14px;
          border: 1px solid var(--dashboard-border);
          border-radius: 14px;
          background: var(--dashboard-soft);
        }

        .mode-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--dashboard-primary);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .mode-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
        }

        .mode-title {
          margin-top: 7px;
          font-size: 13px;
          font-weight: 800;
        }

        .mode-description {
          margin-top: 3px;
          color: var(--dashboard-muted);
          font-size: 11px;
          line-height: 1.45;
        }

        .nav {
          flex: 1;
          padding: 8px 12px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 44px;
          padding: 0 13px;
          margin-bottom: 4px;
          border-radius: 11px;
          color: var(--dashboard-muted);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: 160ms ease;
        }

        .nav-item:hover {
          background: var(--dashboard-soft);
          color: var(--dashboard-text);
        }

        .nav-item:first-child {
          background: var(--dashboard-primary-soft);
          color: var(--dashboard-primary);
        }

        .nav-icon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .user-area {
          padding: 16px;
          border-top: 1px solid var(--dashboard-border);
        }

        .user-card {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--dashboard-primary-soft);
          color: var(--dashboard-primary);
          display: grid;
          place-items: center;
          font-size: 13px;
          font-weight: 800;
        }

        .user-info {
          min-width: 0;
          flex: 1;
        }

        .user-name {
          font-size: 13px;
          font-weight: 700;
        }

        .user-role {
          margin-top: 2px;
          color: var(--dashboard-muted);
          font-size: 11px;
        }

        .main {
          width: 100%;
          margin-left: 260px;
          min-width: 0;
        }

        .topbar {
          min-height: 78px;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--dashboard-border);
          background: var(--dashboard-card);
        }

        .topbar-title {
          font-size: 14px;
          font-weight: 700;
        }

        .topbar-subtitle {
          margin-top: 3px;
          color: var(--dashboard-muted);
          font-size: 12px;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--dashboard-muted);
          font-size: 11px;
        }

        .breadcrumb strong {
          color: var(--dashboard-primary);
          font-weight: 700;
        }

        .content {
          padding: 32px;
          max-width: 1500px;
          margin: 0 auto;
        }

        .mobile-button {
          display: none;
          width: 40px;
          height: 40px;
          border: 1px solid var(--dashboard-border);
          background: var(--dashboard-card);
          color: var(--dashboard-text);
          border-radius: 10px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .mobile-overlay {
          display: none;
        }

        @media (max-width: 900px) {
          .sidebar {
            transform: translateX(-100%);
            transition: transform 180ms ease;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main {
            margin-left: 0;
          }

          .mobile-button {
            display: flex;
          }

          .mobile-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.35);
            z-index: 40;
          }

          .topbar {
            padding: 0 20px;
          }

          .content {
            padding: 24px 20px;
          }
        }

        @media (max-width: 600px) {
          .breadcrumb {
            display: none;
          }

          .content {
            padding: 20px 16px;
          }
        }
      `}</style>

      <div className="dashboard-layout">
        {mobileOpen && (
          <button
            type="button"
            className="mobile-overlay"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
          <div className="brand">
            <Link href={dashboardPath} className="brand-link">
              <div className="brand-mark">T</div>
              <span className="brand-name">TALKIVE</span>
            </Link>

            <button
              type="button"
              className="mobile-button"
              style={{ marginLeft: "auto" }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mode-card">
            <div className="mode-label">
              <span className="mode-dot" />
              {modeTitle}
            </div>

            <div className="mode-title">{title}</div>

            <div className="mode-description">{modeDescription}</div>
          </div>

          <nav className="nav">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-item"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="nav-icon" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="user-area">
            <div className="user-card">
              <div className="avatar">U</div>

              <div className="user-info">
                <div className="user-name">Talkive User</div>
                <div className="user-role">{subtitle}</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                type="button"
                className="mobile-button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation"
              >
                <Menu size={18} />
              </button>

              <div>
                <div className="topbar-title">{title}</div>
                <div className="topbar-subtitle">{subtitle}</div>
              </div>
            </div>

            <div className="breadcrumb">
              <span>TALKIVE</span>
              <ChevronRight size={13} />
              <strong>{modeTitle}</strong>
            </div>
          </header>

          <div className="content">{children}</div>
        </main>
      </div>
    </div>
  );
}