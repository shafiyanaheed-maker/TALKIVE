"use client";

import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

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
        d="M6.54 13.8a5.85 5.85 0 0 1 0-3.6V7.67H3.3a9.75 9.75 0 0 0 0 8.66l3.24-2.53c.77-2.31 2.92-4.03 5.46-4.03Z"
      />

      <path
        fill="#EA4335"
        d="M12 6.17c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.27 14.63 2.28 12 2.28a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53c.77-2.31 2.92-4.03 5.46-4.03Z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    router.push("/experience");
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

        <Link
          href="/"
          className="auth-back-link"
        >
          Back to home
        </Link>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-6xl items-center gap-14 px-6 pb-12 pt-4 lg:grid-cols-[1fr_440px] lg:px-10">
        <div className="auth-intro hidden lg:block">
          <div className="auth-welcome-badge">
            <span />
            WELCOME BACK TO TALKIVE
          </div>

          <h1 className="auth-heading">
            Your space
            <br />
            to <span>connect.</span>
          </h1>

          <p className="auth-description">
            Sign in to your TALKIVE account and continue connecting,
            collaborating, learning, and communicating in one intelligent
            real-time environment.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Connect with people in real time",
              "Collaborate in intelligent digital spaces",
              "Continue where you left off",
            ].map((item) => (
              <div
                key={item}
                className="auth-benefit"
              >
                <span className="auth-check">
                  ✓
                </span>

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-card">
          <div className="mb-7">
            <div className="auth-welcome-badge mb-4">
              <span />
              SIGN IN
            </div>

            <h1 className="auth-card-title">
              Welcome back
            </h1>

            <p className="auth-card-subtitle">
              Sign in to continue to your TALKIVE workspace.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
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
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="auth-label mb-0"
                >
                  Password
                </label>

                <Link
                  href="/auth/login/forgot-password"
                  className="auth-forgot-link"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  className="auth-input pr-10"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (value) => !value
                    )
                  }
                  className="auth-password-toggle"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
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

            {/* Sign In */}
            <button
              type="submit"
              className="auth-submit"
            >
              Sign In

              <ArrowRight
                className="h-4 w-4"
                strokeWidth={2.5}
              />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />

              <span className="text-xs font-medium text-muted-foreground">
                OR
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-background font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/[0.04]"
            >
              <GoogleIcon />

              Continue with Google
            </button>
          </form>

          <div className="auth-divider" />

          {/* Sign Up */}
          <div className="text-center">
            <p className="auth-account-text">
              Don&apos;t have an account?{" "}

              <Link
                href="/auth"
                className="auth-link"
              >
                Create new account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}