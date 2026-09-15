import Link from "next/link";
import { Video, ShieldCheck, Cpu, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                <Video className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-foreground font-mono">
                TALKIVE<span className="text-primary">.in</span>
              </span>
            </div>
            <p className="text-xs uppercase font-bold tracking-widest text-primary">
              CONNECT. COLLABORATE. COMMUNICATE.
            </p>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              A smart, adaptive real-time video meeting and collaboration platform engineered for education, business, paired engineering, and AI-assisted learning.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" /> End-to-End Encrypted
              </span>
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-primary" /> WebRTC SFU Engine
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-primary" /> Global Edge
              </span>
            </div>
          </div>

          {/* Column 2: Environments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Environments
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/auth?redirect=/experience" className="hover:text-foreground transition-colors">
                  Education Classroom
                </Link>
              </li>
              <li>
                <Link href="/auth?redirect=/experience" className="hover:text-foreground transition-colors">
                  Coding Bootcamp IDE
                </Link>
              </li>
              <li>
                <Link href="/auth?redirect=/experience" className="hover:text-foreground transition-colors">
                  Business & Executive
                </Link>
              </li>
              <li>
                <Link href="/auth?redirect=/experience" className="hover:text-foreground transition-colors">
                  Secure Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Technology
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Next.js 15 & React 19</li>
              <li>LiveKit Media SFU</li>
              <li>Fastify WebSocket Gateway</li>
              <li>PostgreSQL 16 & Drizzle ORM</li>
              <li>Deepgram AI Real-Time STT</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} TALKIVE.IN. All rights reserved. Built as a production platform.
          </p>
          <div className="flex items-center gap-6">
            <span>Production Grade</span>
            <span>WCAG 2.1 Compliant</span>
            <span>Zero Data Brokerage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
