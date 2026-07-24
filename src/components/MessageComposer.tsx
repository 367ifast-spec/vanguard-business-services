"use client";

import { useState } from "react";

type Props = {
  conversationId: string;
  senderId: string;
};

export default function MessageComposer({
  conversationId,
  senderId,
}: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        "/api/messages/send",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            conversation_id: conversationId,
            sender_id: senderId,
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Failed to send message."
        );
      }

      setMessage("");

      // Temporary refresh
      window.location.reload();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to send message."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3"
    >
      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Type your message..."
        className="flex-1 rounded-xl bg-[#0B1020] p-4"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-indigo-600 px-6"
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}