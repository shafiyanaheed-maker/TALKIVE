"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type CreateMeetingResponse = {
  success: boolean;
  message?: string;
  meeting?: {
    id: string;
    name: string;
    code: string;
    password: string;
  };
};

export default function CreateMeetingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawMode = searchParams.get("mode");

  const mode =
    rawMode === "business" ||
    rawMode === "coding" ||
    rawMode === "general"
      ? rawMode
      : "general";

  const workspaceLabel =
    mode === "business"
      ? "BUSINESS MEETING"
      : mode === "coding"
        ? "CODING BOOTCAMP"
        : "GENERAL MEETING";

  const [meetingName, setMeetingName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [createdMeeting, setCreatedMeeting] = useState<{
    id: string;
    name: string;
    code: string;
    password: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  function handleMeetingNameChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setMeetingName(event.target.value);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const name = meetingName.trim();

    if (!name) {
      setError("Meeting name is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/meetings/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
          }),
        }
      );

      const data =
        (await response.json()) as CreateMeetingResponse;

      if (
        !response.ok ||
        !data.success ||
        !data.meeting
      ) {
        setError(
          data.message ||
            "Unable to create meeting."
        );

        return;
      }

      setCreatedMeeting({
        id: data.meeting.id,
        name: data.meeting.name,
        code: data.meeting.code,
        password: data.meeting.password,
      });
    } catch (error) {
      console.error(
        "Create meeting error:",
        error
      );

      setError(
        "Unable to connect to the TALKIVE server. Please make sure the server is running."
      );
    } finally {
      setLoading(false);
    }
  }

  function enterMeeting() {
    if (!createdMeeting) {
      return;
    }

    router.push(
      `/room/${createdMeeting.code}?mode=${mode}`
    );
  }

  async function copyMeetingDetails() {
    if (!createdMeeting) {
      return;
    }

    const details = `TALKIVE
Meeting: ${createdMeeting.name}
Meeting Code: ${createdMeeting.code}
Meeting Password: ${createdMeeting.password}`;

    try {
      await navigator.clipboard.writeText(details);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error(
        "Could not copy meeting details:",
        error
      );
    }
  }

  function goBack() {
    if (mode === "business") {
      router.push("/dashboard/business");
      return;
    }

    if (mode === "coding") {
      router.push("/dashboard/coding");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="meeting-page">
      <div className="meeting-card">
        <div className="brand">TALKIVE</div>

        <div className="workspace-label">
          {workspaceLabel}
        </div>

        {!createdMeeting ? (
          <>
            <h1>Create Meeting</h1>

            <p className="description">
              Create a secure TALKIVE meeting and
              share the generated meeting code and
              password with your participants.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="meeting-name">
                  Meeting Name
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">
                    ＋
                  </span>

                  <input
                    id="meeting-name"
                    type="text"
                    value={meetingName}
                    onChange={
                      handleMeetingNameChange
                    }
                    placeholder={
                      mode === "business"
                        ? "e.g. Product Strategy Meeting"
                        : mode === "coding"
                          ? "e.g. JavaScript Bootcamp"
                          : "e.g. Team Discussion"
                    }
                    maxLength={100}
                    autoFocus
                    disabled={loading}
                  />
                </div>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="create-button"
                disabled={loading}
              >
                {loading
                  ? "Creating..."
                  : "Create Meeting"}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="success-icon">
              ✓
            </div>

            <h1>Meeting Created</h1>

            <p className="description success-description">
              Your{" "}
              <strong>
                {workspaceLabel.toLowerCase()}
              </strong>{" "}
              is ready.
            </p>

            <div className="meeting-details">
              <div className="detail-row">
                <div className="detail-content">
                  <span className="detail-label">
                    MEETING NAME
                  </span>

                  <strong>
                    {createdMeeting.name}
                  </strong>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-content">
                  <span className="detail-label">
                    MEETING CODE
                  </span>

                  <strong className="code-value">
                    {createdMeeting.code}
                  </strong>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-content">
                  <span className="detail-label">
                    MEETING PASSWORD
                  </span>

                  <strong className="password-value">
                    {createdMeeting.password}
                  </strong>
                </div>
              </div>
            </div>

            <div className="privacy-note">
              <span>🔒</span>

              <p>
                Keep the meeting password private.
                Share it only with participants you
                want to allow into the meeting.
              </p>
            </div>

            <div className="actions">
              <button
                type="button"
                className="secondary-button"
                onClick={copyMeetingDetails}
              >
                {copied
                  ? "Copied"
                  : "Copy Details"}
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={enterMeeting}
              >
                Enter Meeting
                <span>→</span>
              </button>
            </div>

            <button
              type="button"
              className="back-button"
              onClick={goBack}
            >
              ← Back to Dashboard
            </button>
          </>
        )}

        {!createdMeeting && (
          <button
            type="button"
            className="back-button"
            onClick={goBack}
            disabled={loading}
          >
            ← Back to Dashboard
          </button>
        )}
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
          background: #f7faf9;
        }

        .meeting-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 78px 24px;
          background: #f7faf9;
          color: #17211d;
        }

        .meeting-card {
          width: 100%;
          max-width: 520px;
          padding: 42px 40px 40px;
          border: 1px solid #e2eae6;
          border-radius: 24px;
          background: #ffffff;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
        }

        .brand {
          margin-bottom: 12px;
          color: #059669;
          font-size: 19px;
          font-weight: 800;
          letter-spacing: 4px;
        }

        .workspace-label {
          display: inline-flex;
          margin-bottom: 22px;
          padding: 5px 10px;
          border: 1px solid #b7e5d3;
          border-radius: 999px;
          background: #ecfdf5;
          color: #047857;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
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
          color: #718078;
          font-size: 15px;
          line-height: 1.75;
        }

        .success-description {
          text-align: center;
          margin-bottom: 24px;
        }

        .field {
          margin-bottom: 22px;
        }

        label {
          display: block;
          margin-bottom: 10px;
          color: #17211d;
          font-size: 14px;
          font-weight: 700;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: #718078;
          font-size: 17px;
          pointer-events: none;
        }

        input {
          width: 100%;
          height: 50px;
          padding: 0 16px 0 46px;
          border: 1px solid #e2eae6;
          border-radius: 12px;
          outline: none;
          background: #ffffff;
          color: #17211d;
          font-size: 14px;
        }

        input::placeholder {
          color: #91a39a;
        }

        input:focus {
          border-color: #059669;
          box-shadow:
            0 0 0 3px
            rgba(5, 150, 105, 0.1);
        }

        input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-message {
          margin-bottom: 16px;
          padding: 12px 14px;
          border: 1px solid
            rgba(239, 68, 68, 0.25);
          border-radius: 10px;
          background: rgba(239, 68, 68, 0.07);
          color: #dc2626;
          font-size: 13px;
          line-height: 1.5;
        }

        .create-button,
        .primary-button {
          width: 100%;
          height: 50px;
          border: 0;
          border-radius: 12px;
          background: #059669;
          color: #ffffff;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition:
            background 0.2s ease,
            transform 0.2s ease,
            opacity 0.2s ease;
        }

        .create-button:hover:not(:disabled),
        .primary-button:hover {
          background: #047857;
          transform: translateY(-1px);
        }

        .create-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .back-button {
          display: block;
          margin: 26px auto 0;
          border: 0;
          background: transparent;
          color: #718078;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .back-button:hover {
          color: #059669;
        }

        .back-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .success-icon {
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          border-radius: 50%;
          background: #ecfdf5;
          color: #059669;
          font-size: 25px;
          font-weight: 800;
        }

        .meeting-card > h1 {
          text-align: center;
        }

        .meeting-details {
          overflow: hidden;
          border: 1px solid #e2eae6;
          border-radius: 16px;
        }

        .detail-row {
          padding: 17px 18px;
          background: #ffffff;
        }

        .detail-row + .detail-row {
          border-top: 1px solid #e2eae6;
        }

        .detail-content {
          min-width: 0;
        }

        .detail-label {
          display: block;
          margin-bottom: 7px;
          color: #718078;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .detail-content strong {
          color: #17211d;
          font-size: 14px;
        }

        .code-value {
          font-family: monospace;
          font-size: 17px !important;
          letter-spacing: 0.12em;
        }

        .password-value {
          color: #059669 !important;
          font-family: monospace;
          font-size: 16px !important;
          letter-spacing: 0.08em;
        }

        .privacy-note {
          display: flex;
          gap: 10px;
          margin-top: 16px;
          padding: 13px 14px;
          border-radius: 12px;
          background: #f0faf5;
        }

        .privacy-note span {
          flex: 0 0 auto;
        }

        .privacy-note p {
          margin: 0;
          color: #718078;
          font-size: 12px;
          line-height: 1.5;
        }

        .actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 20px;
        }

        .secondary-button {
          height: 50px;
          border: 1px solid #d8e4de;
          border-radius: 12px;
          background: #ffffff;
          color: #34433c;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .secondary-button:hover {
          background: #f7faf9;
        }

        .primary-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        @media (max-width: 600px) {
          .meeting-page {
            padding: 30px 16px;
          }

          .meeting-card {
            padding: 32px 24px 36px;
            border-radius: 20px;
          }

          h1 {
            font-size: 28px;
          }

          .actions {
            grid-template-columns: 1fr;
          }
        }

        :global(.dark) .meeting-page {
          background: #0d1512;
          color: #f1f7f4;
        }

        :global(.dark) .meeting-card {
          background: #111c18;
          border-color: #26372f;
        }

        :global(.dark) label,
        :global(.dark) .detail-content strong {
          color: #f1f7f4;
        }

        :global(.dark) input,
        :global(.dark) .secondary-button {
          background: #0d1512;
          color: #f1f7f4;
          border-color: #26372f;
        }

        :global(.dark) .meeting-details {
          border-color: #26372f;
        }

        :global(.dark) .detail-row {
          background: #111c18;
        }

        :global(.dark) .detail-row + .detail-row {
          border-color: #26372f;
        }

        :global(.dark) .workspace-label,
        :global(.dark) .success-icon {
          background: #102d23;
        }

        :global(.dark) .privacy-note {
          background: #102d23;
        }
      `}</style>
    </main>
  );
}