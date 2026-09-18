"use client";

import { useEffect, useMemo, useRef } from "react";

export default function CodeEditor({
  code,
  setCode,
  language,
  readOnly = false,
}) {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const lineCount = useMemo(() => {
    return Math.max(code.split("\n").length, 1);
  }, [code]);

  const lineNumbers = useMemo(() => {
    return Array.from({ length: lineCount }, (_, index) => index + 1);
  }, [lineCount]);

  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbersElement = lineNumbersRef.current;

    if (!textarea || !lineNumbersElement) {
      return;
    }

    lineNumbersElement.scrollTop = textarea.scrollTop;
  }, [code]);

  const handleScroll = (event) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = event.currentTarget.scrollTop;
    }
  };

  const handleKeyDown = (event) => {
    if (readOnly) {
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();

      const textarea = event.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const nextValue =
        code.substring(0, start) +
        "  " +
        code.substring(end);

      setCode(nextValue);

      requestAnimationFrame(() => {
        textarea.selectionStart = start + 2;
        textarea.selectionEnd = start + 2;
      });
    }

    if (event.key === "Enter") {
      const textarea = event.currentTarget;
      const start = textarea.selectionStart;

      const currentLineStart = code.lastIndexOf("\n", start - 1) + 1;
      const currentLine = code.substring(currentLineStart, start);

      const indentation = currentLine.match(/^\s*/)?.[0] || "";

      if (indentation.length > 0) {
        event.preventDefault();

        const nextValue =
          code.substring(0, start) +
          `\n${indentation}` +
          code.substring(start);

        setCode(nextValue);

        requestAnimationFrame(() => {
          const nextPosition = start + 1 + indentation.length;
          textarea.selectionStart = nextPosition;
          textarea.selectionEnd = nextPosition;
        });
      }
    }
  };

  return (
    <div className="code-editor-wrapper">
      <div className="code-editor-topbar">
        <div className="code-editor-file">
          <span className="code-file-icon">{language === "Python" ? "PY" : language === "C++" ? "C+" : "JS"}</span>
          <span>main.{language === "Python" ? "py" : language === "C++" ? "cpp" : "js"}</span>
        </div>

        <div className="code-editor-status">
          <span className="code-status-dot" />
          Ready
        </div>
      </div>

      <div className="code-editor-body">
        <div
          ref={lineNumbersRef}
          className="code-line-numbers"
          aria-hidden="true"
        >
          {lineNumbers.map((line) => (
            <div key={line} className="code-line-number">
              {line}
            </div>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          className="code-editor-textarea"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          readOnly={readOnly}
          aria-label="Code editor"
        />
      </div>
    </div>
  );
}