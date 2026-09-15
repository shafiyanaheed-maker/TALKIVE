import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Briefcase,
  Check,
  ChevronRight,
  Code2,
  FileText,
  Globe2,
  GraduationCap,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Mic,
  Network,
  PenTool,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  WandSparkles,
  Wifi,
  Zap,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const capabilities = [
  {
    icon: Video,
    title: "Real-Time Communication",
    description:
      "High-quality video and audio meetings with screen sharing, chat, participant controls, and adaptive media delivery.",
  },
  {
    icon: Brain,
    title: "AI-Powered Collaboration",
    description:
      "AI captions, meeting intelligence, summaries, key points, decisions, action items, and intelligent visual notes.",
  },
  {
    icon: Code2,
    title: "Collaborative Coding",
    description:
      "Work together in real time with a purpose-built dual-code environment for teaching, reviewing, and correcting code.",
  },
  {
    icon: FileText,
    title: "Intelligent Notes",
    description:
      "Capture speaker notes, ideas, and meeting context, then transform them into structured and useful knowledge.",
  },
  {
    icon: Globe2,
    title: "Multilingual Communication",
    description:
      "Real-time captions, transcription, translation, and intelligent language assistance help people communicate across languages.",
  },
  {
    icon: Wifi,
    title: "Adaptive Experience",
    description:
      "The platform dynamically adapts the experience to connectivity, meeting context, device capabilities, and user needs.",
  },
  {
    icon: Lock,
    title: "Secure Sessions",
    description:
      "Controlled access, protected meetings, role-based capabilities, audit trails, and security-focused session architecture.",
  },
  {
    icon: GraduationCap,
    title: "Education Mode",
    description:
      "Purpose-built tools for mentors, teachers, learners, assessments, collaborative learning, and interactive teaching.",
  },
  {
    icon: Briefcase,
    title: "Business Mode",
    description:
      "A focused professional environment for meetings, presentations, teamwork, communication, and decision-making.",
  },
  {
    icon: Users,
    title: "Connected Communities",
    description:
      "Bring people together around conversations, learning, collaboration, and shared real-time experiences.",
  },
];

const educationFeatures = [
  "Learning",
  "Mentoring",
  "Assessment",
  "Collaboration",
];

const businessFeatures = [
  "Meetings",
  "Teams",
  "Presentations",
  "Productivity",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* =========================================================
          HERO
          ========================================================= */}
      <section className="landing-hero relative overflow-hidden">
        <div className="bg-tech-grid absolute inset-0 pointer-events-none" />

        <div className="hero-glow-center absolute left-1/2 top-[5%] -translate-x-1/2 pointer-events-none" />

        <div className="hero-orb hero-orb-left absolute left-[-12rem] top-[18%] pointer-events-none" />

        <div className="hero-orb hero-orb-right absolute right-[-12rem] top-[20%] pointer-events-none" />

        <div className="hero-ring hero-ring-one absolute left-1/2 top-[12%] -translate-x-1/2 pointer-events-none" />

        <div className="hero-ring hero-ring-two absolute left-1/2 top-[12%] -translate-x-1/2 pointer-events-none" />

        <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center justify-center px-6 pb-24 pt-20 text-center sm:pt-24">
          <div className="w-full max-w-6xl">

            {/* Badge */}
            <div className="hero-badge mx-auto mb-9 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-white/60 px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] text-emerald-900 shadow-[0_8px_30px_rgba(16,185,129,0.08)] backdrop-blur-md dark:bg-emerald-950/40 dark:text-emerald-300">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                <Sparkles className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              </span>

              <span>THE ADAPTIVE REAL-TIME COLLABORATION PLATFORM</span>
            </div>

            {/* TALKIVE */}
            <h1
              className="
                mx-auto
                bg-gradient-to-br
                from-emerald-950
                via-emerald-700
                to-emerald-400
                bg-clip-text
                text-transparent
                text-[clamp(5.5rem,14vw,11rem)]
                font-black
                leading-[0.78]
                tracking-[-0.09em]
                drop-shadow-[0_14px_45px_rgba(16,185,129,0.18)]
                dark:from-emerald-300
                dark:via-emerald-400
                dark:to-teal-300
              "
            >
              TALKIVE
            </h1>

            {/* Tagline */}
            <h2
              className="
                mt-9
                text-[clamp(1.45rem,3vw,2.35rem)]
                font-bold
                leading-tight
                tracking-[-0.035em]
                text-slate-950
                dark:text-white
              "
            >
              Connect. Collaborate.{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Communicate.
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-6
                max-w-3xl
                text-[15px]
                leading-7
                text-slate-600
                sm:text-[17px]
                sm:leading-8
                dark:text-slate-300
              "
            >
              A smart, adaptive real-time platform designed for education,
              business, collaboration, and AI-assisted communication.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

              {/* PRIMARY */}
              <Link
                href="/auth"
                className="
                  group
                  inline-flex
                  h-14
                  min-w-[190px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-emerald-400/30
                  bg-gradient-to-r
                  from-emerald-500
                  via-emerald-500
                  to-teal-500
                  px-8
                  text-[15px]
                  font-bold
                  text-white
                  shadow-[0_14px_35px_rgba(16,185,129,0.28)]
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:shadow-[0_20px_45px_rgba(16,185,129,0.36)]
                  active:translate-y-0
                  dark:from-emerald-400
                  dark:via-emerald-500
                  dark:to-teal-400
                  dark:text-emerald-950
                "
              >
                <span>Get Started</span>

                <ArrowRight
                  className="
                    h-4 w-4
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                />
              </Link>

              {/* SECONDARY */}
              <a
                href="#capabilities"
                className="
                  group
                  inline-flex
                  h-14
                  min-w-[190px]
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  border
                  border-emerald-500/20
                  bg-white/60
                  px-8
                  text-[15px]
                  font-semibold
                  text-emerald-900
                  shadow-[0_8px_25px_rgba(16,185,129,0.06)]
                  backdrop-blur-md
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-emerald-500/40
                  hover:bg-emerald-50/70
                  dark:bg-emerald-950/30
                  dark:text-emerald-200
                  dark:hover:bg-emerald-950/50
                "
              >
                <span>Explore TALKIVE</span>

                <ChevronRight
                  className="
                    h-4 w-4
                    text-emerald-600
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                    dark:text-emerald-400
                  "
                />
              </a>
            </div>

            {/* Feature pills */}
            <div
              className="
                mx-auto
                mt-12
                flex
                max-w-6xl
                flex-wrap
                items-center
                justify-center
                gap-4
                px-2
                sm:mt-14
                sm:gap-5
              "
            >
              {[
                {
                  icon: Video,
                  text: "Real-time video",
                },
                {
                  icon: Brain,
                  text: "AI meeting intelligence",
                },
                {
                  icon: Code2,
                  text: "Collaborative coding",
                },
                {
                  icon: Globe2,
                  text: "Live translation",
                },
                {
                  icon: ShieldCheck,
                  text: "Secure sessions",
                },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="
                    hero-pill
                    group
                    inline-flex
                    h-11
                    items-center
                    gap-2.5
                    rounded-full
                    border
                    border-emerald-500/15
                    bg-white/55
                    px-4
                    text-xs
                    font-semibold
                    text-slate-700
                    shadow-[0_6px_20px_rgba(16,185,129,0.05)]
                    backdrop-blur-md
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:border-emerald-500/30
                    hover:bg-white/80
                    hover:shadow-[0_10px_25px_rgba(16,185,129,0.10)]
                    dark:bg-emerald-950/30
                    dark:text-emerald-100
                    dark:hover:bg-emerald-950/50
                  "
                >
                  <span
                    className="
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-emerald-500/10
                    "
                  >
                    <Icon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  </span>

                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Bottom signal */}
            <div
              className="
                mt-8
                flex
                items-center
                justify-center
                gap-2
                text-[11px]
                font-medium
                tracking-wide
                text-emerald-700/70
                dark:text-emerald-300/70
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              <span>
                Built for real-time communication and collaboration
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CAPABILITIES
          ========================================================= */}
      <section
        id="capabilities"
        className="relative border-t border-border bg-background px-6 py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary/40" />
              CAPABILITIES
              <span className="h-px w-8 bg-primary/40" />
            </div>

            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Built for the way people
              <span className="text-primary"> actually collaborate.</span>
            </h2>

            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
              TALKIVE combines real-time communication, collaboration,
              artificial intelligence, and adaptive experiences in one
              platform.
            </p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;

              return (
                <div
                  key={capability.title}
                  className="group rounded-2xl border border-border bg-card p-7 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-xs font-semibold text-muted-foreground/50">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold">
                    {capability.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {capability.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          MODES
          ========================================================= */}
      <section
        id="modes"
        className="relative overflow-hidden border-t border-border bg-muted/30 px-6 py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary/40" />
              ADAPTIVE MODES
              <span className="h-px w-8 bg-primary/40" />
            </div>

            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              One platform.
              <br />
              <span className="text-primary">Different worlds.</span>
            </h2>

            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
              TALKIVE adapts its experience to the context in which people
              communicate and collaborate.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <div className="mode-card group">
              <div className="mode-icon">
                <GraduationCap className="h-6 w-6" />
              </div>

              <div className="min-w-0">
                <p className="mode-label">EDUCATION</p>

                <h3 className="mode-title">
                  Turn virtual meetings into learning spaces.
                </h3>

                <p className="mode-description">
                  Create interactive environments where mentors and learners
                  can communicate, collaborate, practice, and learn together.
                </p>

                <div className="mode-tags">
                  {educationFeatures.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mode-card group">
              <div className="mode-icon">
                <Briefcase className="h-6 w-6" />
              </div>

              <div className="min-w-0">
                <p className="mode-label">BUSINESS</p>

                <h3 className="mode-title">
                  Make professional collaboration feel natural.
                </h3>

                <p className="mode-description">
                  Give teams a focused environment for meetings,
                  presentations, communication, decision-making, and
                  productive collaboration.
                </p>

                <div className="mode-tags">
                  {businessFeatures.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          REAL-TIME TECHNOLOGY
          ========================================================= */}
      <section
        id="technology"
        className="relative border-t border-border bg-background px-6 py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary/40" />
              REAL-TIME BY DESIGN
            </div>

            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Communication that
              <span className="text-primary"> moves with you.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              TALKIVE is designed around real-time interaction. From video
              and audio to collaborative documents, coding, whiteboards, and
              AI-powered intelligence, the platform is built to keep people
              synchronized.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Low-latency real-time communication",
                "Adaptive audio and video quality",
                "Real-time collaborative state",
                "Scalable meeting architecture",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </div>

                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Network className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold">TALKIVE REAL-TIME CORE</p>
                  <p className="text-xs text-muted-foreground">
                    Adaptive collaboration infrastructure
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                LIVE
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { icon: Video, title: "Video", value: "Real-time" },
                { icon: Mic, title: "Audio", value: "Adaptive" },
                { icon: MessageSquare, title: "Chat", value: "Instant" },
                { icon: Users, title: "Presence", value: "Live" },
              ].map(({ icon: Icon, title, value }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-background p-5"
                >
                  <Icon className="h-5 w-5 text-primary" />

                  <p className="mt-4 text-sm font-bold">{title}</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          AI
          ========================================================= */}
      <section
        id="ai"
        className="relative overflow-hidden border-t border-border bg-muted/30 px-6 py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary/40" />
              AI INTELLIGENCE
              <span className="h-px w-8 bg-primary/40" />
            </div>

            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Don&apos;t just capture the conversation.
              <span className="text-primary"> Understand it.</span>
            </h2>

            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
              TALKIVE turns real-time conversations into structured,
              searchable, and actionable knowledge.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Mic,
                title: "Live Captions",
                text: "Follow conversations with real-time AI-generated captions.",
              },
              {
                icon: Globe2,
                title: "Translation",
                text: "Break language barriers with multilingual communication.",
              },
              {
                icon: Brain,
                title: "Meeting Intelligence",
                text: "Extract key points, decisions, and action items automatically.",
              },
              {
                icon: WandSparkles,
                title: "Visual Notes",
                text: "Transform ideas into structured visual knowledge.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-6 text-lg font-bold">{title}</h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          COLLABORATION
          ========================================================= */}
      <section
        id="collaboration"
        className="relative border-t border-border bg-background px-6 py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3 border-b border-border pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Code2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    DUAL-CODE COLLABORATIVE EDITOR
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Teach, review, correct, and collaborate
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-border">
                  <div className="border-b border-border bg-muted/50 px-4 py-3 text-xs font-semibold">
                    ORIGINAL
                  </div>

                  <div className="min-h-48 bg-background p-4 font-mono text-xs leading-6 text-muted-foreground">
                    <p>
                      <span className="text-primary">function</span>{" "}
                      calculateTotal(items) {"{"}
                    </p>
                    <p className="pl-4">let total = 0;</p>
                    <p className="pl-4">items.forEach(item =&gt; {"{"}</p>
                    <p className="pl-8">total += item.price;</p>
                    <p className="pl-4">{"}"});</p>
                    <p className="pl-4">return total;</p>
                    <p>{"}"}</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-primary/20">
                  <div className="border-b border-primary/20 bg-primary/5 px-4 py-3 text-xs font-semibold text-primary">
                    CORRECTED
                  </div>

                  <div className="min-h-48 bg-background p-4 font-mono text-xs leading-6">
                    <p>
                      <span className="text-primary">function</span>{" "}
                      calculateTotal(items) {"{"}
                    </p>
                    <p className="pl-4">return items.reduce(</p>
                    <p className="pl-8">(total, item) =&gt;</p>
                    <p className="pl-12">total + item.price,</p>
                    <p className="pl-12">0</p>
                    <p className="pl-8">);</p>
                    <p>{"}"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary/40" />
              COLLABORATION
            </div>

            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              More than a meeting.
              <span className="text-primary"> A shared workspace.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Work together while you communicate. Code, draw, write, share,
              discuss, teach, and learn without constantly switching between
              disconnected tools.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Code2, text: "Dual-code editor" },
                { icon: PenTool, text: "Collaborative whiteboard" },
                { icon: FileText, text: "Intelligent notes" },
                { icon: LayoutDashboard, text: "Interactive workspace" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECURITY
          ========================================================= */}
      <section
        id="security"
        className="relative border-t border-border bg-muted/30 px-6 py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <span className="h-px w-8 bg-primary/40" />
                TRUST & SECURITY
              </div>

              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                Built with
                <span className="text-primary"> trust in mind.</span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Real-time communication needs more than speed. TALKIVE is
                designed with controlled access, permissions, secure sessions,
                and auditable activity in mind.
              </p>

              <Link
                href="/auth"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                Create a secure workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: ShieldCheck,
                  title: "Controlled Access",
                  text: "Invite-only and restricted meeting environments.",
                },
                {
                  icon: Lock,
                  title: "Protected Sessions",
                  text: "Security-focused meeting and collaboration architecture.",
                },
                {
                  icon: Users,
                  title: "Role-Based Access",
                  text: "Different roles can receive different capabilities.",
                },
                {
                  icon: Network,
                  title: "Auditability",
                  text: "Important security and collaboration activity can be tracked.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 font-bold">{title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
          ========================================================= */}
      <section className="relative overflow-hidden border-t border-border bg-background px-6 py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Zap className="h-7 w-7" />
          </div>

          <h2 className="mt-8 text-4xl font-black tracking-tight sm:text-6xl">
            The future of
            <span className="text-primary"> collaboration</span>
            <br />
            starts here.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Bring communication, collaboration, learning, and AI together in
            one adaptive real-time platform.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Start with TALKIVE
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#capabilities"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Explore capabilities
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}