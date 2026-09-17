"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type CreatedMeeting = {
  id: string;
  name: string;
  code: string;
  password: string;
  createdAt: string;
};

export default function CreateMeetingPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [meeting, setMeeting] = useState<CreatedMeeting | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/meetings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create meeting.");
        return;
      }

      setMeeting(data.meeting);
    } catch (err) {
      console.error(err);

      setError(
        "Cannot connect to TALKIVE server. Make sure the backend is running on port 4000."
      );
    } finally {
      setLoading(false);
    }
  }

  function openMeeting() {
    if (!meeting) return;

    router.push(`/room/${meeting.code}`);
  }

  if (meeting) {
    return (
      <main className="meeting-page">
        <section className="meeting-card">
          <div className="brand">TALKIVE</div>

          <div className="success-icon">✓</div>

          <h1>Meeting Created</h1>

          <p className="subtitle">
            Your meeting is ready. Share the meeting details with your
            participants.
          </p>

          <div className="meeting-details">
            <div className="detail">
              <span>Meeting Name</span>
              <strong>{meeting.name}</strong>
            </div>

            <div className="detail">
              <span>Meeting Code</span>
              <strong>{meeting.code}</strong>
            </div>

            <div className="detail">
              <span>Meeting Password</span>
              <strong>{meeting.password}</strong>
            </div>
          </div>

          <div className="actions">
            <button
              type="button"
              className="primary-button"
              onClick={openMeeting}
            >
              Enter Meeting
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                navigator.clipboard.writeText(
                  `Meeting: ${meeting.name}\nCode: ${meeting.code}\nPassword: ${meeting.password}`
                );
              }}
            >
              Copy Details
            </button>

            <button
              type="button"
              className="text-button"
              onClick={() => router.push("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </section>

        <style jsx>{`
          .meeting-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: var(--meeting-bg);
            color: var(--meeting-text);
            transition:
              background 0.2s ease,
              color 0.2s ease;
          }

          .meeting-card {
            width: 100%;
            max-width: 520px;
            padding: 40px;
            border: 1px solid var(--meeting-border);
            border-radius: 24px;
            background: var(--meeting-card);
            box-shadow: 0 24px 70px var(--meeting-shadow);
          }

          .brand {
            margin-bottom: 28px;
            color: var(--meeting-primary);
            font-size: 18px;
            font-weight: 800;
            letter-spacing: 0.12em;
          }

          .success-icon {
            width: 58px;
            height: 58px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            border-radius: 50%;
            background: var(--meeting-soft);
            color: var(--meeting-primary);
            font-size: 28px;
            font-weight: 800;
          }

          h1 {
            margin: 0 0 10px;
            font-size: 32px;
            font-weight: 800;
          }

          .subtitle {
            margin: 0 0 28px;
            color: var(--meeting-muted);
            line-height: 1.6;
          }

          .meeting-details {
            display: grid;
            gap: 12px;
            margin-bottom: 28px;
          }

          .detail {
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 16px;
            border: 1px solid var(--meeting-border);
            border-radius: 14px;
            background: var(--meeting-bg);
          }

          .detail span {
            color: var(--meeting-muted);
            font-size: 13px;
          }

          .detail strong {
            color: var(--meeting-text);
            font-size: 17px;
            word-break: break-word;
          }

          .actions {
            display: grid;
            gap: 10px;
          }

          button {
            width: 100%;
            min-height: 48px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: 0.2s ease;
          }

          .primary-button {
            border: 1px solid var(--meeting-primary);
            background: var(--meeting-primary);
            color: var(--meeting-button-text);
          }

          .primary-button:hover {
            opacity: 0.9;
          }

          .secondary-button {
            border: 1px solid var(--meeting-border);
            background: transparent;
            color: var(--meeting-text);
          }

          .secondary-button:hover {
            background: var(--meeting-soft);
          }

          .text-button {
            border: 0;
            background: transparent;
            color: var(--meeting-muted);
          }

          .text-button:hover {
            color: var(--meeting-primary);
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
          }

          @media (max-width: 600px) {
            .meeting-card {
              padding: 28px 22px;
            }

            h1 {
              font-size: 28px;
            }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="meeting-page">
      <section className="meeting-card">
        <div className="brand">TALKIVE</div>

        <h1>Create Meeting</h1>

        <p className="subtitle">
          Create a secure meeting and invite others to collaborate.
        </p>

        <form onSubmit={handleCreate}>
          <label htmlFor="meeting-name">Meeting Name</label>

          <input
            id="meeting-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter meeting name"
            maxLength={100}
            autoComplete="off"
            required
          />

          {error && <p className="error">{error}</p>}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? "Creating Meeting..." : "Create Meeting"}
          </button>
        </form>

        <button
          type="button"
          className="text-button"
          onClick={() => router.push("/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </section>

      <style jsx>{`
        .meeting-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: var(--meeting-bg);
          color: var(--meeting-text);
        }

        .meeting-card {
          width: 100%;
          max-width: 520px;
          padding: 40px;
          border: 1px solid var(--meeting-border);
          border-radius: 24px;
          background: var(--meeting-card);
          box-shadow: 0 24px 70px var(--meeting-shadow);
        }

        .brand {
          margin-bottom: 28px;
          color: var(--meeting-primary);
          font-size: 18px;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        h1 {
          margin: 0 0 10px;
          font-size: 32px;
          font-weight: 800;
        }

        .subtitle {
          margin: 0 0 28px;
          color: var(--meeting-muted);
          line-height: 1.6;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
        }

        input {
          width: 100%;
          box-sizing: border-box;
          min-height: 50px;
          margin-bottom: 14px;
          padding: 0 15px;
          border: 1px solid var(--meeting-border);
          border-radius: 12px;
          outline: none;
          background: var(--meeting-bg);
          color: var(--meeting-text);
          font-size: 15px;
        }

        input:focus {
          border-color: var(--meeting-primary);
        }

        input::placeholder {
          color: var(--meeting-muted);
        }

        .error {
          margin: 0 0 14px;
          padding: 12px;
          border: 1px solid #d99;
          border-radius: 10px;
          background: #fff5f5;
          color: #b42318;
          font-size: 14px;
        }

        .primary-button {
          width: 100%;
          min-height: 50px;
          margin-bottom: 14px;
          border: 1px solid var(--meeting-primary);
          border-radius: 12px;
          background: var(--meeting-primary);
          color: var(--meeting-button-text);
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }

        .primary-button:hover:not(:disabled) {
          opacity: 0.9;
        }

        .primary-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .text-button {
          width: 100%;
          min-height: 42px;
          border: 0;
          background: transparent;
          color: var(--meeting-muted);
          font-size: 14px;
          cursor: pointer;
        }

        .text-button:hover {
          color: var(--meeting-primary);
        }

        :global(:root) {
          --meeting-bg: #f7faf9;
          --meeting-card: #ffffff;
          --meeting-border: #e2eae6;
          --meeting-text: #17211d;
          --meeting-muted: #718078;
          --meeting-primary: #059669;
          --meeting-shadow: rgba(0, 0, 0, 0.08);
          --meeting-button-text: #ffffff;
        }

        :global(.dark) {
          --meeting-bg: #0d1512;
          --meeting-card: #111c18;
          --meeting-border: #26372f;
          --meeting-text: #f1f7f4;
          --meeting-muted: #91a39a;
          --meeting-primary: #10b981;
          --meeting-shadow: rgba(0, 0, 0, 0.3);
          --meeting-button-text: #07110d;
        }

        @media (max-width: 600px) {
          .meeting-card {
            padding: 28px 22px;
          }

          h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </main>
  );
}