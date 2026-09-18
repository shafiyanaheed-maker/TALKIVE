"use client";

import { useRef, useState } from "react";

function createWorker() {
  const workerCode = `
    self.onmessage = async function(event) {
      const code = event.data.code;

      try {
        const logs = [];

        const formatValue = function(value) {
          if (typeof value === "string") {
            return value;
          }

          if (typeof value === "undefined") {
            return "undefined";
          }

          if (typeof value === "bigint") {
            return value.toString() + "n";
          }

          try {
            return JSON.stringify(value, null, 2);
          } catch {
            return String(value);
          }
        };

        const safeConsole = {
          log: function(...args) {
            logs.push(args.map(formatValue).join(" "));
          },

          info: function(...args) {
            logs.push(args.map(formatValue).join(" "));
          },

          warn: function(...args) {
            logs.push("[warn] " + args.map(formatValue).join(" "));
          },

          error: function(...args) {
            logs.push("[error] " + args.map(formatValue).join(" "));
          }
        };

        const execute = new Function(
          "console",
          '"use strict";\\n' + code
        );

        execute(safeConsole);

        self.postMessage({
          type: "success",
          output: logs.join("\\n")
        });
      } catch (error) {
        self.postMessage({
          type: "error",
          error: error && error.message
            ? error.message
            : String(error)
        });
      }
    };
  `;

  const blob = new Blob([workerCode], {
    type: "application/javascript",
  });

  return new Worker(URL.createObjectURL(blob));
}

export default function useCompiler() {
  const workerRef = useRef(null);

  const [status, setStatus] = useState("idle");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [executionTime, setExecutionTime] = useState(null);

  const clearOutput = () => {
    setOutput("");
    setError("");
    setExecutionTime(null);
    setStatus("idle");
  };

  const runCode = (code, language) => {
    clearOutput();

    if (!code.trim()) {
      setError("No code to execute.");
      setStatus("error");
      return;
    }

    if (language !== "JavaScript") {
      setError(
        `${language} execution is not enabled in the browser compiler yet. JavaScript is currently available for live execution.`
      );
      setStatus("error");
      return;
    }

    setStatus("running");

    const startedAt = performance.now();

    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }

    const worker = createWorker();
    workerRef.current = worker;

    let finished = false;

    const timeout = window.setTimeout(() => {
      if (finished) {
        return;
      }

      finished = true;

      worker.terminate();
      workerRef.current = null;

      setExecutionTime(Math.round(performance.now() - startedAt));
      setError("Execution timed out after 5 seconds.");
      setStatus("error");
    }, 5000);

    worker.onmessage = (event) => {
      if (finished) {
        return;
      }

      finished = true;
      window.clearTimeout(timeout);

      worker.terminate();
      workerRef.current = null;

      const elapsed = Math.round(performance.now() - startedAt);

      setExecutionTime(elapsed);

      if (event.data.type === "success") {
        setOutput(
          event.data.output || "Program finished with no console output."
        );
        setStatus("success");
      } else {
        setError(event.data.error || "Unknown execution error.");
        setStatus("error");
      }
    };

    worker.onerror = (event) => {
      if (finished) {
        return;
      }

      finished = true;
      window.clearTimeout(timeout);

      worker.terminate();
      workerRef.current = null;

      setExecutionTime(
        Math.round(performance.now() - startedAt)
      );

      setError(event.message || "Unable to execute the code.");
      setStatus("error");
    };

    worker.postMessage({
      code,
    });
  };

  return {
    status,
    output,
    error,
    executionTime,
    runCode,
    clearOutput,
  };
}