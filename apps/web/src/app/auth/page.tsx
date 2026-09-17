"use client";

import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { FormEvent, useState } from "react";

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z"
      />
      <path
        fill="#34A853"
        d="M12 21.72c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.72Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.8a5.85 5.85 0 0 1 0-3.6V7.67H3.3a9.75 9.75 0 0 0 0 8.66l3.24-2.53Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.17c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.27 14.63 2.28 12 2.28a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53c.77-2.31 2.92-4.03 5.46-4.03Z"
      />
    </svg>
  );
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="auth-page min-h-screen overflow-hidden">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />
      <div className="auth-grid" />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-12">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="TALKIVE home"
        >
          <span className="auth-logo">
            <span className="auth-logo-dot" />
          </span>

          <span className="text-xl font-black tracking-[-0.04em] text-foreground dark:text-emerald-50">
            TALKIVE
          </span>
        </Link>

        <Link href="/" className="auth-back-link">
          Back to home
        </Link>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-6xl items-center gap-14 px-6 pb-12 pt-4 lg:grid-cols-[1fr_440px] lg:px-10">
        <div className="auth-intro hidden lg:block">
          <div className="auth-welcome-badge">
            <span />
            JOIN TALKIVE
          </div>

          <h1 className="auth-heading">
            Your space
            <br />
            to <span>connect.</span>
          </h1>

          <p className="auth-description">
            Create your TALKIVE account and enter an intelligent
            real-time environment built for connecting,
            collaborating, learning, and communicating.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Connect with people in real time",
              "Collaborate in intelligent digital spaces",
              "Access powerful meeting tools",
            ].map((item) => (
              <div key={item} className="auth-benefit">
                <span className="auth-check">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-card">
          <div className="mb-7">
            <h1 className="auth-card-title">Create your account</h1>

            <p className="auth-card-subtitle">
              Start your TALKIVE experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="auth-label">
                Full name
              </label>

              <div className="auth-input-wrapper">
                <User className="auth-input-icon" />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your full name"
                  className="auth-input"
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="auth-label">
                Email address
              </label>

              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="auth-input"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="auth-label">
                Password
              </label>

              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="auth-input pr-10"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="auth-password-toggle"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="auth-label"
              >
                Confirm password
              </label>

              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  placeholder="Confirm your password"
                  className="auth-input pr-10"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((value) => !value)
                  }
                  className="auth-password-toggle"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3 pt-1">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 cursor-pointer accent-emerald-500"
                required
              />

              <span className="text-xs leading-5 text-muted-foreground">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-primary hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <button type="submit" className="auth-submit">
              Sign Up
              <ArrowRight
                className="h-4 w-4"
                strokeWidth={2.5}
              />
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />

              <span className="text-xs font-medium text-muted-foreground">
                OR
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/[0.04]"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </form>

          <div className="auth-divider" />

          <div className="text-center">
            <p className="auth-account-text">
              Already have an account?{" "}
              <Link href="/auth/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}