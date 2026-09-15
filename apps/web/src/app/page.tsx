import Link from "next/link";
import {
  Video,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Code2,
  FileText,
  Languages,
  Sliders,
  GraduationCap,
  Briefcase,
  Users2,
  Lock,
  Cpu,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CapabilityCard } from "@/components/CapabilityCard";

export default function HomePage() {
  const capabilities = [
    {
      icon: Video,
      title: "HD Video & Audio",
      badge: "WebRTC SFU",
      description: "Crystal-clear, ultra-low latency audio and video streams powered by dynamic simulcast and dynacast bandwidth optimization.",
    },
    {
      icon: Sparkles,
      title: "AI Meeting Assistant",
      badge: "Real-Time AI",
      description: "Intelligent in-meeting copilot that provides context-aware prompts, automated action items, and live participant insights.",
    },
    {
      icon: Users2,
      title: "Real-Time Collaboration",
      badge: "Zero Latency",
      description: "Synchronized interactive whiteboards, instant file sharing, and high-frequency live reaction channels with CRDT consistency.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Meetings",
      badge: "Enterprise",
      description: "DTLS-SRTP transport security, optional E2EE SFrame encryption, domain gating, and immutable supervisor audit trails.",
    },
    {
      icon: Languages,
      title: "Smart Captions & Translation",
      badge: "Sub-300ms",
      description: "Live multilingual transcription with speaker diarization and on-the-fly caption translation in over 30 languages.",
    },
    {
      icon: Code2,
      title: "Collaborative Coding",
      badge: "Dual IDE",
      description: "Side-by-side Monaco dual-code editor with pair programming synchronization, syntax highlighting, and sandboxed code execution.",
    },
    {
      icon: FileText,
      title: "AI Visual Notes",
      badge: "Synthesis",
      description: "Automatic post-meeting knowledge graphs, executive summaries, decision matrices, and Mermaid architectural diagrams.",
    },
    {
      icon: Sliders,
      title: "Adaptive Experience Engine",
      badge: "Intelligent",
      description: "The room interface dynamically adjusts tools, layouts, and permissions based on whether you are teaching, coding, or managing business.",
    },
    {
      icon: GraduationCap,
      title: "Education Mode",
      badge: "Classroom",
      description: "Teacher spotlighting, structured hand-raise queues, attention scores, pop quizzes, and secure assessment proctoring.",
    },
    {
      icon: Briefcase,
      title: "Business Mode",
      badge: "Executive",
      description: "Executive presentation stages, structured agendas, screen-share watermarks, and automated executive minutes of meeting.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border/60 bg-radial-glow">
          <div className="absolute inset-0 bg-tech-grid pointer-events-none opacity-40 dark:opacity-25" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            {/* Top Identity Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/80 border border-border text-accent-foreground text-xs font-semibold tracking-wide mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono uppercase tracking-wider">TALKIVE.IN</span>
              <span className="text-muted-foreground">•</span>
              <span>Next-Generation Virtual Platform</span>
            </div>

            {/* Main Tagline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] max-w-4xl">
              <span className="block text-foreground">CONNECT.</span>
              <span className="block bg-gradient-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent">
                COLLABORATE.
              </span>
              <span className="block text-foreground">COMMUNICATE.</span>
            </h1>

            {/* Supporting Statement */}
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed">
              Experience the future of virtual meetings with AI-powered collaboration tools.
            </p>

            {/* Primary CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/auth"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base tracking-wide shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span>ENTER THE PLATFORM</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Subtle Platform Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" /> Low Latency WebRTC
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-primary" /> Multi-Tenant Security
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-primary" /> Adaptive Environments
              </span>
            </div>
          </div>
        </section>

        {/* CAPABILITY HIGHLIGHTS GRID */}
        <section id="capabilities" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-primary mb-3">
              Core Capabilities
            </h2>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Engineered For High-Stakes Collaboration
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Every tool within TALKIVE is purpose-built to eliminate friction between teachers, students, engineers, and executives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <CapabilityCard
                key={cap.title}
                icon={cap.icon}
                title={cap.title}
                description={cap.description}
                badge={cap.badge}
              />
            ))}
          </div>
        </section>

        {/* SPECIALIZED MODES OVERVIEW */}
        <section id="modes" className="py-20 bg-secondary/50 border-y border-border/80 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-primary mb-3">
                Tailored Workspaces
              </h2>
              <p className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                One Platform. Purpose-Built Environments.
              </p>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Choose the workspace that mirrors your workflow. TALKIVE reconfigures its video stage, sidebars, and permissions in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Education Card Preview */}
              <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 shadow-sm transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center mb-6">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    Education & Virtual Classrooms
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Designed for interactive learning, mentorship, and high-integrity evaluations. Includes General Purpose interactive lectures and live Coding Bootcamps with paired editors.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">
                    General Purpose &bull; Coding Bootcamp
                  </span>
                  <Link
                    href="/auth"
                    className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Business Card Preview */}
              <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 shadow-sm transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center mb-6">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground">
                    Business & Executive Meetings
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    High-efficiency executive conferences with synchronized agendas, confidentiality watermarking, instant AI executive summaries, and action item tracking.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Executive Briefings &bull; Standups
                  </span>
                  <Link
                    href="/auth"
                    className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-14 rounded-3xl bg-card border border-border shadow-md flex flex-col items-center">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-card-foreground">
              Step Into The Next Generation of Meetings
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl">
              Launch your session in seconds. Select your specialized environment and connect seamlessly across desktop, tablet, or mobile.
            </p>
            <div className="mt-8">
              <Link
                href="/auth"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-200 group"
              >
                <span>ENTER THE PLATFORM</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
