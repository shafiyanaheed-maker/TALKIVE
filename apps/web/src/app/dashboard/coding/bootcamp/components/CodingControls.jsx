"use client";

const languages = [
  {
    value: "JavaScript",
    label: "JavaScript",
    extension: "JS",
  },
  {
    value: "Python",
    label: "Python",
    extension: "PY",
  },
  {
    value: "C++",
    label: "C++",
    extension: "C+",
  },
];

export default function CodingControls({
  language,
  setLanguage,
  onRun,
  onClear,
  isRunning,
  onSave,
}) {
  return (
    <div className="coding-controls">
      <div className="coding-control-left">
        <label className="language-selector">
          <span className="language-icon">
            {languages.find((item) => item.value === language)?.extension}
          </span>

          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            disabled={isRunning}
            aria-label="Programming language"
          >
            {languages.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <span className="language-chevron">⌄</span>
        </label>

        <button
          type="button"
          className="coding-secondary-control"
          onClick={onClear}
        >
          Clear
        </button>
      </div>

      <div className="coding-control-right">
        <button
          type="button"
          className="coding-save-button"
          onClick={onSave}
        >
          <span>↓</span>
          Save
        </button>

        <button
          type="button"
          className="coding-run-button"
          onClick={onRun}
          disabled={isRunning}
        >
          {isRunning ? (
            <>
              <span className="run-spinner" />
              Running...
            </>
          ) : (
            <>
              <span className="run-icon">▶</span>
              Run Code
            </>
          )}
        </button>
      </div>
    </div>
  );
}