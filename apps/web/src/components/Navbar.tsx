"use client";

import Link from "next/link";
import { Video, Sparkles, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1"
          aria-label="TALKIVE Home"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
            <Video className="w-5 h-5 text-primary-foreground stroke-[2.5]" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-baseline">
            <span className="text-xl font-black tracking-tight text-foreground font-mono">
              TALKIVE
            </span>
            <span className="text-xs font-semibold text-primary ml-1 tracking-wider uppercase">
              .in
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#capabilities" className="hover:text-foreground transition-colors">
            Capabilities
          </a>
          <a href="#modes" className="hover:text-foreground transition-colors">
            Modes
          </a>
          <a href="#security" className="hover:text-foreground transition-colors">
            Security
          </a>
          <a href="#architecture" className="hover:text-foreground transition-colors">
            Architecture
          </a>
        </nav>

        {/* Right Action Cluster with Theme Toggle at top-right */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/auth/signin"
            className="hidden sm:inline-flex px-3.5 py-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
          >
            Sign In
          </Link>

          <Link
            href="/auth"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm shadow-primary/25 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>Enter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
