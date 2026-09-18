"use client";

export default function NotesPanel({
  notes,
  onChange,
  onClose,
}) {
  return (
    <aside className="side-panel notes-panel">
      <div className="side-panel-header">
        <div>
          <h2>Meeting Notes</h2>
          <span>Shared workspace</span>
        </div>

        <button
          type="button"
          className="close-panel-button"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="notes-content">
        <textarea
          value={notes}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder="Write your meeting notes here..."
        />

        <div className="notes-footer">
          <span>Auto-saved</span>
        </div>
      </div>
    </aside>
  );
}