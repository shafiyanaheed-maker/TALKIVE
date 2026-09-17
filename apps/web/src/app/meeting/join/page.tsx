"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type JoinMeetingResponse = {
  success: boolean;
  message?: string;
  meeting?: {
    id: string;
    name: string;
    code: string;
  };
};

export default function JoinMeetingPage() {
  const router = useRouter();

  const [meetingCode, setMeetingCode] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleMeetingCodeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value
      .toUpperCase()
      .replace(/\s/g, "");

    setMeetingCode(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const code = meetingCode.trim();
    const meetingPassword = password;

    if (!code) {
      setError("Meeting code is required.");
      return;
    }

    if (!meetingPassword) {
      setError("Meeting password is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/meetings/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          password: meetingPassword,
        }),
      });

      const data =
        (await response.json()) as JoinMeetingResponse;

      if (!response.ok || !data.success || !data.meeting) {
        setError(data.message || "Unable to join meeting.");
        return;
      }

      router.push(`/room/${data.meeting.code}`);
    } catch (error) {
      console.error("Join meeting error:", error);

      setError(
        "Unable to connect to the TALKIVE server. Please make sure the server is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="meeting-page">
      <div className="meeting-card">
        <div className="brand">TALKIVE</div>

        <h1>Join Meeting</h1>

        <p className="description">
          Enter the meeting code and password provided by the
          meeting host.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="meeting-code">
              Meeting Code
              <span className="auto-badge">
                Auto Uppercase
              </span>
            </label>

            <div className="input-wrapper">
              <span className="input-icon">&lt;/&gt;</span>

              <input
                id="meeting-code"
                type="text"
                value={meetingCode}
                onChange={handleMeetingCodeChange}
                placeholder="Enter meeting code"
                autoComplete="off"
                maxLength={20}
                disabled={loading}
              />

              {meetingCode && (
                <span className="uppercase-indicator">
                  ABC
                </span>
              )}
            </div>

            <p className="helper-text">
              ⓘ Code will be converted to uppercase
              automatically.
            </p>
          </div>

          <div className="field password-field">
            <label htmlFor="meeting-password">
              Meeting Password
            </label>

            <div className="input-wrapper">
              <span className="input-icon lock-icon">
                🔒
              </span>

              <input
                id="meeting-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter meeting password"
                autoComplete="off"
                disabled={loading}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                disabled={loading}
              >
                {showPassword ? "◉" : "◌"}
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="join-button"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Meeting"}
          </button>
        </form>

        <button
          type="button"
          className="back-button"
          onClick={() => router.push("/dashboard")}
          disabled={loading}
        >
          ← Back to Dashboard
        </button>
      </div>

      <style jsx>{`
        :global(*) {
          box-sizing: border-box;
        }

        :global(html),
        :global(body) {
          margin: 0;
          padding: 0;
        }

        :global(body) {
          background: var(--meeting-bg);
        }

        :global(:root) {
          --meeting-bg: #f7faf9;
          --meeting-card: #ffffff;
          --meeting-border: #e2eae6;
          --meeting-text: #17211d;
          --meeting-muted: #718078;
          --meeting-primary: #059669;
          --meeting-soft: #ecfdf5;
          --meeting-shadow: rgba(0, 0, 0, 0.08);
          --meeting-button-text: #ffffff;
          --meeting-input-bg: #ffffff;
        }

        :global(.dark) {
          --meeting-bg: #0d1512;
          --meeting-card: #111c18;
          --meeting-border: #26372f;
          --meeting-text: #f1f7f4;
          --meeting-muted: #91a39a;
          --meeting-primary: #10b981;
          --meeting-soft: #102d23;
          --meeting-shadow: rgba(0, 0, 0, 0.3);
          --meeting-button-text: #07110d;
          --meeting-input-bg: #0d1512;
        }

        .meeting-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 78px 24px;
          background: var(--meeting-bg);
          color: var(--meeting-text);
          transition:
            background 0.2s ease,
            color 0.2s ease;
        }

        .meeting-card {
          width: 100%;
          max-width: 520px;
          padding: 42px 40px 48px;
          border: 1px solid var(--meeting-border);
          border-radius: 24px;
          background: var(--meeting-card);
          box-shadow:
            0 20px 50px var(--meeting-shadow);
        }

        .brand {
          margin-bottom: 38px;
          color: var(--meeting-primary);
          font-size: 19px;
          font-weight: 800;
          letter-spacing: 4px;
        }

        h1 {
          margin: 0;
          font-size: 32px;
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.7px;
        }

        .description {
          margin: 16px 0 30px;
          max-width: 430px;
          color: var(--meeting-muted);
          font-size: 15px;
          line-height: 1.75;
        }

        .field {
          margin-bottom: 22px;
        }

        .password-field {
          margin-top: 2px;
        }

        label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          color: var(--meeting-text);
          font-size: 14px;
          font-weight: 700;
        }

        .auto-badge {
          padding: 3px 8px;
          border: 1px solid var(--meeting-primary);
          border-radius: 999px;
          color: var(--meeting-primary);
          background: var(--meeting-soft);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          z-index: 1;
          color: var(--meeting-muted);
          font-size: 15px;
          font-weight: 700;
          pointer-events: none;
        }

        .lock-icon {
          font-size: 14px;
        }

        input {
          width: 100%;
          height: 50px;
          padding: 0 48px 0 48px;
          border: 1px solid var(--meeting-border);
          border-radius: 12px;
          outline: none;
          background: var(--meeting-input-bg);
          color: var(--meeting-text);
          font-size: 14px;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        input::placeholder {
          color: var(--meeting-muted);
          opacity: 0.85;
        }

        input:focus {
          border-color: var(--meeting-primary);
          box-shadow:
            0 0 0 3px
            rgba(16, 185, 129, 0.1);
        }

        input:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        #meeting-code {
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding-right: 62px;
        }

        .uppercase-indicator {
          position: absolute;
          right: 16px;
          color: var(--meeting-primary);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
          pointer-events: none;
        }

        .helper-text {
          margin: 8px 2px 0;
          color: var(--meeting-muted);
          font-size: 12px;
          line-height: 1.5;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--meeting-muted);
          font-size: 16px;
          cursor: pointer;
        }

        .password-toggle:hover {
          color: var(--meeting-primary);
          background: var(--meeting-soft);
        }

        .password-toggle:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .error-message {
          margin: 4px 0 16px;
          padding: 11px 13px;
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 10px;
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
          font-size: 13px;
          line-height: 1.5;
        }

        .join-button {
          width: 100%;
          height: 50px;
          margin-top: 6px;
          border: 0;
          border-radius: 12px;
          background: var(--meeting-primary);
          color: var(--meeting-button-text);
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition:
            transform 0.15s ease,
            opacity 0.15s ease,
            box-shadow 0.15s ease;
        }

        .join-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow:
            0 8px 22px rgba(16, 185, 129, 0.2);
        }

        .join-button:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        .back-button {
          display: block;
          margin: 28px auto 0;
          padding: 4px 8px;
          border: 0;
          background: transparent;
          color: var(--meeting-muted);
          font-size: 13px;
          cursor: pointer;
        }

        .back-button:hover:not(:disabled) {
          color: var(--meeting-primary);
        }

        .back-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        @media (max-width: 600px) {
          .meeting-page {
            padding: 30px 16px;
          }

          .meeting-card {
            padding: 32px 24px 36px;
            border-radius: 20px;
          }

          .brand {
            margin-bottom: 30px;
          }

          h1 {
            font-size: 28px;
          }

          .description {
            font-size: 14px;
          }

          .auto-badge {
            font-size: 9px;
          }
        }
      `}</style>
    </main>
  );
}