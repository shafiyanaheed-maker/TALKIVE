"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Code2,
  GraduationCap,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function EducationExperiencePage() {
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
          href="/experience"
          className="group flex items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08]">
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
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-12 sm:px-8 lg:px-10 lg:pt-16">
        {/* Page intro */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.05] px-4 py-2 text-[11px] font-bold tracking-[0.16em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            EDUCATION
          </div>

          <h1 className="text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
            Select Your <span className="text-primary">Learning Path</span>
          </h1>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            Choose the learning environment that best fits your
            educational needs.
          </p>
        </div>

        {/* Learning options */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* GENERAL */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[0_20px_70px_hsl(var(--primary)/0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_28px_90px_hsl(var(--primary)/0.10)] sm:p-10">
            <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-primary/[0.07] blur-3xl" />

            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/15 bg-primary/[0.08] text-primary">
                <BookOpen
                  className="h-8 w-8"
                  strokeWidth={1.8}
                />
              </div>

              <h2 className="mt-8 text-3xl font-bold tracking-[-0.04em]">
                General
              </h2>

              <p className="mt-3 text-base leading-7 text-muted-foreground">
                A flexible virtual classroom experience for
                teaching, learning, discussions, and collaboration.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Virtual classrooms with HD video",
                  "Interactive group discussions",
                  "Shared notes and whiteboard",
                  "AI-powered learning assistance",
                  "Real-time collaboration",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>

                    <span className="text-sm text-foreground/75">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* IMPORTANT:
                  Do NOT send this to /room?mode=education.
                  We will connect it to the actual meeting flow later.
              */}
              <Link
                href="/dashboard"
                className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-primary"
              >
                Continue with General

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
            </div>
          </div>

          {/* CODING BOOTCAMP */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[0_20px_70px_hsl(var(--primary)/0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_28px_90px_hsl(var(--primary)/0.10)] sm:p-10">
            <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-primary/[0.07] blur-3xl" />

            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/15 bg-primary/[0.08] text-primary">
                <Code2
                  className="h-8 w-8"
                  strokeWidth={1.8}
                />
              </div>

              <h2 className="mt-8 text-3xl font-bold tracking-[-0.04em]">
                Coding Bootcamp
              </h2>

              <p className="mt-3 text-base leading-7 text-muted-foreground">
                An integrated learning environment for live
                coding, debugging, mentoring, and project-based
                development.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Live coding sessions",
                  "Collaborative code editor",
                  "Real-time debugging",
                  "AI-powered coding assistance",
                  "Project-based learning",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>

                    <span className="text-sm text-foreground/75">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/dashboard/coding"
                className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-primary"
              >
                Continue with Coding Bootcamp

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="mt-10 text-center">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to experiences
          </Link>
        </div>
      </section>
    </main>
  );
}