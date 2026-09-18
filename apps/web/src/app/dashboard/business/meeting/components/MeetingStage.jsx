"use client";

export default function MeetingStage({
  videoRef,
  cameraEnabled,
  microphoneEnabled,
  meetingCode,
  participantName,
}) {
  return (
    <section className="meeting-stage">
      <div className="main-video-card">
        {cameraEnabled ? (
          <video
            ref={videoRef}
            className="main-video"
            autoPlay
            playsInline
            muted
          />
        ) : (
          <div className="camera-off-view">
            <div className="large-avatar">
              {participantName.charAt(0).toUpperCase()}
            </div>

            <h2>{participantName}</h2>
            <span>Camera Off</span>

            <div className="camera-status">
              <span className="status-dot" />
              Your camera is turned off
            </div>
          </div>
        )}

        <div className="meeting-code-badge">
          {meetingCode}
        </div>

        <div className="main-video-status">
          <span
            className={`mini-status ${
              microphoneEnabled ? "enabled" : "disabled"
            }`}
          >
            {microphoneEnabled ? "Mic On" : "Mic Off"}
          </span>

          <span
            className={`mini-status ${
              cameraEnabled ? "enabled" : "disabled"
            }`}
          >
            {cameraEnabled ? "Camera On" : "Camera Off"}
          </span>
        </div>
      </div>
    </section>
  );
}