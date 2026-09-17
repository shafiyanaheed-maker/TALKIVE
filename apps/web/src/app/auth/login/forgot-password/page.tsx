"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <main className="auth-page min-h-screen overflow-hidden">
      {/* Background effects */}
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
          href="/auth/login"
          className="auth-back-link"
        >
          Back to sign in
        </Link>
      </header>

      {/* Main content */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl items-center justify-center px-6 pb-12 pt-4">
        <div className="w-full max-w-[440px]">
          {!submitted ? (
            <div className="auth-card">
              {/* Header */}
              <div className="mb-7">
                <div className="auth-welcome-badge mb-4">
                  <span />
                  ACCOUNT RECOVERY
                </div>

                <h1 className="auth-card-title">
                  Forgot your password?
                </h1>

                <p className="auth-card-subtitle">
                  Enter the email address associated with your
                  TALKIVE account and we&apos;ll help you reset
                  your password.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="auth-label"
                  >
                    Email address
                  </label>

                  <div className="auth-input-wrapper">
                    <Mail className="auth-input-icon" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="you@example.com"
                      className="auth-input"
                      autoComplete="email"
                      autoFocus
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="auth-submit"
                >
                  Send reset link

                  <ArrowRight
                    className="h-4 w-4"
                    strokeWidth={2.5}
                  />
                </button>
              </form>

              {/* Back to sign in */}
              <div className="auth-divider" />

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />

                  Back to sign in
                </Link>
              </div>
            </div>
          ) : (
            <div className="auth-card text-center">
              {/* Success icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>

              {/* Success message */}
              <div>
                <div className="auth-welcome-badge mx-auto mb-4 w-fit">
                  <span />
                  CHECK YOUR EMAIL
                </div>

                <h1 className="auth-card-title">
                  Reset link sent
                </h1>

                <p className="auth-card-subtitle mx-auto max-w-sm">
                  If an account exists for{" "}
                  <span className="font-semibold text-foreground dark:text-emerald-50">
                    {email}
                  </span>
                  , you&apos;ll receive instructions to reset your
                  password.
                </p>
              </div>

              {/* Information */}
              <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-left">
                <p className="text-xs leading-5 text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam or
                  junk folder. You can also try again with the same
                  email address.
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="flex h-12 w-full items-center justify-center rounded-xl border border-border bg-background font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/[0.04]"
                >
                  Try another email
                </button>

                <Link
                  href="/auth/login"
                  className="auth-submit"
                >
                  Back to sign in

                  <ArrowRight
                    className="h-4 w-4"
                    strokeWidth={2.5}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}