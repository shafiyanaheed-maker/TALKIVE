"use client";

import { useEffect, useState } from "react";

const DEFAULT_CODE = `function greet(name) {
  return "Hello, " + name + "!";
}

const message = greet("TALKIVE");
console.log(message);
`;

const STORAGE_KEY = "talkive-coding-bootcamp-code";

export default function useCodeEditor() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("JavaScript");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (typeof parsed.code === "string") {
          setCode(parsed.code);
        }

        if (typeof parsed.language === "string") {
          setLanguage(parsed.language);
        }
      }
    } catch {
      // Ignore invalid local storage.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          code,
          language,
        })
      );
    } catch {
      // Ignore storage errors.
    }
  }, [code, language]);

  const resetCode = () => {
    setCode(DEFAULT_CODE);
  };

  const saveCode = () => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          code,
          language,
        })
      );

      return true;
    } catch {
      return false;
    }
  };

  return {
    code,
    setCode,
    language,
    setLanguage,
    resetCode,
    saveCode,
  };
}