"use client";

import { useState } from "react";

export default function ChatPanel() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Alex Johnson",
      initials: "AJ",
      text: "Ready to work on the challenge!",
      time: "10:02",
    },
    {
      id: 2,
      sender: "Priya Sharma",
      initials: "PS",
      text: "I can help with the array logic.",
      time: "10:03",
    },
  ]);

  const sendMessage = () => {
    const trimmed = message.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: "You",
        initials: "Y",
        text: trimmed,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="side-panel-section chat-section">
      <div className="side-panel-section-header">
        <div>
          <span className="side-panel-eyebrow">COLLABORATE</span>
          <h2>Chat</h2>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((item) => (
          <div className="chat-message" key={item.id}>
            <div className="chat-avatar">{item.initials}</div>

            <div className="chat-message-content">
              <div className="chat-message-meta">
                <strong>{item.sender}</strong>
                <span>{item.time}</span>
              </div>

              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message the team..."
          aria-label="Chat message"
        />

        <button
          type="button"
          onClick={sendMessage}
          aria-label="Send message"
        >
          →
        </button>
      </div>
    </section>
  );
}