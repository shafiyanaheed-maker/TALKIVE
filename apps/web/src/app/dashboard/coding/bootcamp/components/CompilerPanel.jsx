"use client";

export default function CompilerPanel({
  output,
  error,
  status,
  executionTime,
  onClear,
}) {
  const hasOutput = output || error;

  return (
    <section className="compiler-panel">
      <div className="compiler-panel-header">
        <div className="compiler-title-group">
          <span className="compiler-terminal-icon">&gt;_</span>

          <div>
            <span className="compiler-eyebrow">CONSOLE</span>
            <h2>Output</h2>
          </div>
        </div>

        <div className="compiler-header-actions">
          {executionTime !== null && (
            <span className="execution-time">
              {executionTime}ms
            </span>
          )}

          <button
            type="button"
            className="compiler-clear-button"
            onClick={onClear}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="compiler-output">
        {!hasOutput && status !== "running" && (
          <div className="compiler-empty">
            <div className="compiler-empty-icon">&gt;_</div>

            <p>Run your code to see the output here.</p>

            <span>
              Your program output and execution status will appear in
              this console.
            </span>
          </div>
        )}

        {status === "running" && (
          <div className="compiler-running">
            <span className="compiler-spinner" />
            <span>Running your code...</span>
          </div>
        )}

        {output && (
          <pre className="compiler-success-output">
            {output}
          </pre>
        )}

        {error && (
          <pre className="compiler-error-output">
            {error}
          </pre>
        )}
      </div>

      <div className="compiler-footer">
        <span
          className={`compiler-status ${
            status === "success"
              ? "success"
              : status === "error"
                ? "error"
                : status === "running"
                  ? "running"
                  : ""
          }`}
        >
          <span className="compiler-status-dot" />

          {status === "success"
            ? "Execution completed"
            : status === "error"
              ? "Execution failed"
              : status === "running"
                ? "Executing"
                : "Ready"}
        </span>
      </div>
    </section>
  );
}