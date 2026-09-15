"use client";

import Link from "next/link";
import { Moon, Sun, Video } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Modes", href: "#modes" },
  { label: "Security", href: "#security" },
  { label: "Architecture", href: "#technology" },
];

export function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("talkive-theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      setDarkMode(prefersDark);

      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextMode = !darkMode;

    setDarkMode(nextMode);

    if (nextMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("talkive-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("talkive-theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* =====================================================
            BRAND
            ===================================================== */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="TALKIVE home"
        >
          <span
            className="
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-emerald-400
              via-emerald-500
              to-teal-500
              text-white
              shadow-[0_8px_22px_rgba(16,185,129,0.22)]
              transition-all
              duration-200
              group-hover:-translate-y-0.5
              group-hover:shadow-[0_10px_28px_rgba(16,185,129,0.32)]
            "
          >
            <Video className="h-[18px] w-[18px]" strokeWidth={2.4} />

            <span className="absolute right-[5px] top-[5px] h-1.5 w-1.5 rounded-full bg-white shadow-sm" />
          </span>

          <span
            className="
              text-[17px]
              font-black
              tracking-[-0.03em]
              text-foreground
              transition-colors
              group-hover:text-primary
            "
          >
            TALKIVE
          </span>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
            ===================================================== */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="
                relative
                py-2
                text-[13px]
                font-semibold
                text-muted-foreground
                transition-colors
                duration-200
                hover:text-primary
                after:absolute
                after:bottom-0
                after:left-1/2
                after:h-px
                after:w-0
                after:-translate-x-1/2
                after:bg-primary
                after:transition-all
                after:duration-200
                hover:after:w-full
              "
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* =====================================================
            RIGHT SIDE — THEME ONLY
            ===================================================== */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            title={darkMode ? "Light mode" : "Dark mode"}
            className="
              group
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-border
              bg-background/80
              text-muted-foreground
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-primary/30
              hover:bg-primary/5
              hover:text-primary
            "
          >
            {darkMode ? (
              <Sun
                className="h-[17px] w-[17px] transition-transform duration-300 group-hover:rotate-45"
                strokeWidth={2}
              />
            ) : (
              <Moon
                className="h-[17px] w-[17px] transition-transform duration-300 group-hover:-rotate-12"
                strokeWidth={2}
              />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
          ===================================================== */}
      <div className="border-t border-border/50 lg:hidden">
        <nav
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            gap-5
            overflow-x-auto
            px-5
            py-3
            scrollbar-none
            sm:px-6
          "
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="
                shrink-0
                text-xs
                font-semibold
                text-muted-foreground
                transition-colors
                hover:text-primary
              "
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}