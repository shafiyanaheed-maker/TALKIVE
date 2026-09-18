"use client";

export default function NotesPanel({ notes, setNotes }) {
  return (
    <section className="side-panel-section notes-section">
      <div className="side-panel-section-header">
        <div>
          <span className="side-panel-eyebrow">WORKSPACE</span>
          <h2>Code Notes</h2>
        </div>

        <span className="notes-saved">Auto</span>
      </div>

      <textarea
        className="notes-textarea"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Write notes for this coding session..."
        spellCheck={false}
      />

      <div className="notes-footer">
        <span>Session notes</span>
        <span>{notes.length} characters</span>
      </div>
    </section>
  );
}