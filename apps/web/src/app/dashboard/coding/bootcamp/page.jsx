"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CodingHeader from "./components/CodingHeader";
import CodeEditor from "./components/CodeEditor";
import CompilerPanel from "./components/CompilerPanel";
import CodingControls from "./components/CodingControls";
import ParticipantsPanel from "./components/ParticipantsPanel";
import ChatPanel from "./components/ChatPanel";
import NotesPanel from "./components/NotesPanel";

import useCodeEditor from "./hooks/useCodeEditor";
import useCompiler from "./hooks/useCompiler";

import "./styles/coding-bootcamp.css";

export default function CodingBootcampPage() {
  const router = useRouter();

  const {
    code,
    setCode,
    language,
    setLanguage,
    resetCode,
    saveCode,
  } = useCodeEditor();

  const {
    status,
    output,
    error,
    executionTime,
    runCode,
    clearOutput,
  } = useCompiler();

  const [notes, setNotes] = useState(
    "• Define the problem first.\n• Test edge cases.\n• Keep the solution simple."
  );

  const [roomName] = useState("Coding Bootcamp");
  const [roomCode] = useState("TALK-CODE");

  const isRunning = status === "running";

  const handleRunCode = () => {
    runCode(code, language);
  };

  const handleClearCode = () => {
    resetCode();
    clearOutput();
  };

  const handleSave = () => {
    const saved = saveCode();

    if (saved) {
      clearOutput();
    }
  };

  return (
    <main className="coding-bootcamp-page">
      <CodingHeader
        roomName={roomName}
        roomCode={roomCode}
        language={language}
        participants={4}
      />

      <div className="coding-workspace">
        <section className="coding-main-area">
          <div className="coding-editor-section">
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
              readOnly={isRunning}
            />
          </div>

          <CodingControls
            language={language}
            setLanguage={setLanguage}
            onRun={handleRunCode}
            onClear={handleClearCode}
            onSave={handleSave}
            isRunning={isRunning}
          />

          <CompilerPanel
            output={output}
            error={error}
            status={status}
            executionTime={executionTime}
            onClear={clearOutput}
          />
        </section>

        <aside className="coding-side-panel">
          <ParticipantsPanel />

          <ChatPanel />

          <NotesPanel
            notes={notes}
            setNotes={setNotes}
          />
        </aside>
      </div>
    </main>
  );
}