"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  Video,
} from "lucide-react";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("Student");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Backend authentication will be connected here later.
    console.log("TALKIVE signup submitted");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-light-atmosphere text-foreground transition-colors dark:bg-dark-atmosphere">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="auth-glow auth-glow-one" />
        <div className="auth-glow auth-glow-two" />
        <div className="auth-grid" />
      </div>

      {/* Top bar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Video size={23} strokeWidth={2.5} />
          </div>

          <span className="text-xl font-extrabold tracking-[-0.04em]">
            TALKIVE
          </span>
        </Link>

        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Back to home
        </Link>
      </header>

      {/* Main */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-12 px-6 pb-16 pt-8 sm:px-10 lg:grid-cols-[1fr_480px] lg:gap-20 lg:px-14">
        {/* Left content */}
        <section className="hidden lg:block">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 px-4 py-2 text-xs font-semibold tracking-wide text-primary backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
              WELCOME TO TALKIVE
            </div>

            <h1 className="text-6xl font-black leading-[0.95] tracking-[-0.06em] xl:text-7xl">
              Your space
              <br />
              to{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                connect.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">
              Create your TALKIVE account and enter a new kind of digital
              environment built around communication, collaboration, learning,
              and meaningful interaction.
            </p>

            <div className="mt-10 space-y-4">
              <Feature text="Connect with people in real time" />
              <Feature text="Collaborate in intelligent digital spaces" />
              <Feature text="Experience adaptive environments" />
            </div>
          </div>
        </section>

        {/* Signup card */}
        <section className="w-full">
          <div className="auth-card">
            {/* Card header */}
            <div className="mb-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary lg:hidden">
                <Video size={24} />
              </div>

              <h2 className="text-3xl font-bold tracking-[-0.04em]">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Join TALKIVE and start connecting.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full name
                </label>

                <div className="auth-input-wrapper">
                  <User size={18} />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    className="auth-input"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address
                </label>

                <div className="auth-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="auth-input"
                  />
                </div>
              </div>

              {/* Account type */}
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  I am joining as
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {["Student", "Educator", "Professional"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAccountType(type)}
                      className={`rounded-xl border px-2 py-3 text-xs font-semibold transition-all ${
                        accountType === type
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border bg-background/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <div className="auth-input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="auth-input"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="auth-password-toggle"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold"
                >
                  Confirm password
                </label>

                <div className="auth-input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className="auth-input"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="auth-password-toggle"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-muted-foreground">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-emerald-500"
                />

                <span>
                  I agree to the TALKIVE{" "}
                  <button
                    type="button"
                    className="font-semibold text-primary hover:underline"
                  >
                    Terms
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="font-semibold text-primary hover:underline"
                  >
                    Privacy Policy
                  </button>
                  .
                </span>
              </label>

              {/* Submit */}
              <button type="submit" className="auth-submit group">
                <span>Create Account</span>

                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* Sign in */}
            <div className="mt-7 border-t border-border pt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-semibold text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check size={14} strokeWidth={3} />
      </span>

      <span>{text}</span>
    </div>
  );
}