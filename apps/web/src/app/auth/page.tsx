"use client";

import Link from "next/link";
import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="auth-page min-h-screen overflow-hidden">
      {/* Background atmosphere */}
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />
      <div className="auth-grid" />

      {/* Header */}
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

        <Link
          href="/"
          className="auth-back-link"
        >
          Back to home
        </Link>
      </header>

      {/* Main */}
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-6xl items-center gap-14 px-6 pb-12 pt-4 lg:grid-cols-[1fr_440px] lg:px-10">
        {/* Left content */}
        <div className="auth-intro hidden lg:block">
          <div className="auth-welcome-badge">
            <span />
            WELCOME TO TALKIVE
          </div>

          <h1 className="auth-heading">
            Your space
            <br />
            to <span>connect.</span>
          </h1>

          <p className="auth-description">
            Create your TALKIVE account and enter a new kind of digital
            environment built around communication, collaboration, learning,
            and meaningful interaction.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Connect with people in real time",
              "Collaborate in intelligent digital spaces",
              "Experience adaptive environments",
            ].map((item) => (
              <div key={item} className="auth-benefit">
                <span className="auth-check">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Signup card */}
        <div className="auth-card">
          <div className="mb-7">
            <h2 className="auth-card-title">
              Create your account
            </h2>

            <p className="auth-card-subtitle">
              Join TALKIVE and start connecting.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name */}
            <div>
              <label htmlFor="name" className="auth-label">
                Full name
              </label>

              <div className="auth-input-wrapper">
                <User className="auth-input-icon" />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="auth-input"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
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
                />
              </div>
            </div>

            {/* Password */}
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
                  placeholder="Create a strong password"
                  className="auth-input pr-10"
                  autoComplete="new-password"
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

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className="auth-label">
                Confirm password
              </label>

              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="auth-input pr-10"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((value) => !value)
                  }
                  className="auth-password-toggle"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
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

            {/* Terms */}
            <label className="auth-terms">
              <input
                type="checkbox"
                name="terms"
                className="auth-checkbox"
              />

              <span>
                I agree to the TALKIVE{" "}
                <Link href="/terms" className="auth-inline-link">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="auth-inline-link">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {/* Create account */}
            <button type="submit" className="auth-submit">
              Create Account
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </form>

          {/* Bottom links */}
          <div className="auth-divider" />

          <div className="text-center">
            <p className="auth-account-text">
              Already have an account?{" "}
              <Link href="/auth/login" className="auth-link">
                Sign in
              </Link>
            </p>

            <Link href="/auth/forgot-password" className="auth-forgot-link">
              Forgot password?
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}