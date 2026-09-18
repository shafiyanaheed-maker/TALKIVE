"use client";

export default function MeetingControls({
  microphoneEnabled,
  cameraEnabled,
  onToggleMicrophone,
  onToggleCamera,
  onShareScreen,
  onRecord,
  onLeave,
}) {
  return (
    <div className="meeting-controls">
      <div className="control-group">
        <button
          type="button"
          className={`control-button ${
            microphoneEnabled ? "" : "disabled"
          }`}
          onClick={onToggleMicrophone}
          title={
            microphoneEnabled
              ? "Mute microphone"
              : "Unmute microphone"
          }
        >
          {microphoneEnabled ? "🎙" : "🔇"}
        </button>

        <button
          type="button"
          className={`control-button ${
            cameraEnabled ? "" : "disabled"
          }`}
          onClick={onToggleCamera}
          title={
            cameraEnabled
              ? "Turn camera off"
              : "Turn camera on"
          }
        >
          {cameraEnabled ? "📹" : "🚫"}
        </button>
      </div>

      <div className="control-group center-controls">
        <button
          type="button"
          className="secondary-control-button"
          onClick={onShareScreen}
        >
          <span>▣</span>
          Share Screen
        </button>

        <button
          type="button"
          className="secondary-control-button"
          onClick={onRecord}
        >
          <span>●</span>
          Record
        </button>
      </div>

      <button
        type="button"
        className="leave-button"
        onClick={onLeave}
      >
        <span>↗</span>
        Leave
      </button>
    </div>
  );
}