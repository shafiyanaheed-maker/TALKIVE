"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function ExperiencePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("talkive-theme");

    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("talkive-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("talkive-theme", "light");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -right-48 -top-48 h-[650px] w-[650px] rounded-full bg-primary/[0.08] blur-[150px]" />

        <div className="absolute -bottom-56 -left-48 h-[650px] w-[650px] rounded-full bg-primary/[0.07] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.018] dark:opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary) / 0.7) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-12">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="TALKIVE home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] transition-all duration-300 group-hover:border-primary/40">
            <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.55)]" />
          </span>

          <span className="text-lg font-black tracking-[-0.04em]">
            TALKIVE
          </span>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/80 text-muted-foreground shadow-sm backdrop-blur-xl transition-all hover:border-primary/30 hover:text-primary"
        >
          {theme === "dark" ? (
            <Sun className="h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </button>
      </header>

      {/* Main */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-6xl flex-col items-center px-6 pb-16 pt-12 sm:px-8 lg:px-10 lg:pt-20">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.05] px-4 py-2 text-[11px] font-bold tracking-[0.16em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          WELCOME TO TALKIVE
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-center text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
          Choose Your <span className="text-primary">Experience</span>
        </h1>

        <p className="mt-5 max-w-2xl text-center text-base leading-7 text-muted-foreground sm:text-lg">
          Select the environment that best fits how you want to
          connect, collaborate, learn, and communicate.
        </p>

        {/* Cards */}
        <div className="mt-14 grid w-full gap-6 lg:grid-cols-2">
          {/* EDUCATION */}
          <Link
            href="/experience/education"
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[0_20px_70px_hsl(var(--primary)/0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_28px_90px_hsl(var(--primary)/0.10)] sm:p-10"
          >
            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/[0.07] blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/15 bg-primary/[0.08] text-primary">
                  <GraduationCap
                    className="h-8 w-8"
                    strokeWidth={1.8}
                  />
                </div>

                <span className="rounded-full border border-primary/15 bg-primary/[0.05] px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-primary">
                  LEARNING
                </span>
              </div>

              <h2 className="mt-8 text-3xl font-bold tracking-[-0.04em]">
                Education
              </h2>

              <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
                An intelligent learning environment designed for
                teachers, mentors, students, classrooms, and
                collaborative education.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Interactive virtual classrooms",
                  "Collaborative whiteboard and notes",
                  "AI-powered learning assistance",
                  "Real-time collaboration",
                  "Coding and project-based learning",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                    <span className="text-sm text-foreground/75">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-primary">
                Select Education

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </Link>

          {/* BUSINESS */}
          <Link
            href="/experience/business"
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[0_20px_70px_hsl(var(--primary)/0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_28px_90px_hsl(var(--primary)/0.10)] sm:p-10"
          >
            <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/[0.07] blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/15 bg-primary/[0.08] text-primary">
                  <BriefcaseBusiness
                    className="h-8 w-8"
                    strokeWidth={1.8}
                  />
                </div>

                <span className="rounded-full border border-primary/15 bg-primary/[0.05] px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-primary">
                  PROFESSIONAL
                </span>
              </div>

              <h2 className="mt-8 text-3xl font-bold tracking-[-0.04em]">
                Business
              </h2>

              <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
                A focused professional environment for meetings,
                presentations, teamwork, communication, and
                productive collaboration.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Professional video meetings",
                  "Screen sharing and presentations",
                  "Team collaboration tools",
                  "Meeting notes and AI assistance",
                  "Real-time communication",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                    <span className="text-sm text-foreground/75">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-primary">
                Select Business

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}