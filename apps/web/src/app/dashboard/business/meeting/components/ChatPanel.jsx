"use client";

import { useState } from "react";

export default function ChatPanel({
  messages,
  onSendMessage,
  onClose,
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    onSendMessage(trimmedMessage);
    setMessage("");
  };

  return (
    <aside className="side-panel chat-panel">
      <div className="side-panel-header">
        <div>
          <h2>Meeting Chat</h2>
          <span>Everyone in this meeting</span>
        </div>

        <button
          type="button"
          className="close-panel-button"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <div className="empty-chat-icon">
              💬
            </div>
            <strong>No messages yet</strong>
            <span>
              Start the conversation with your
              team.
            </span>
          </div>
        ) : (
          messages.map((item) => (
            <div
              className={`chat-message ${
                item.isLocal ? "local" : ""
              }`}
              key={item.id}
            >
              <div className="chat-message-meta">
                <strong>{item.name}</strong>
                <span>{item.time}</span>
              </div>

              <p>{item.text}</p>
            </div>
          ))
        )}
      </div>

      <form
        className="chat-input-area"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          placeholder="Type a message..."
        />

        <button type="submit">
          →
        </button>
      </form>
    </aside>
  );
}