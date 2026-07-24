"use client";

import { useState } from "react";
import { createMessage } from "@/lib/messages";

export default function SendMessageForm({
  listingId,
}: {
  listingId: string;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    try {
      setLoading(true);

      await createMessage({
        sender_id: "buyer-demo",
        receiver_id: "seller-demo",
        listing_id: listingId,
        message,
      });

      alert("Message sent successfully!");

      setMessage("");

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
      <textarea
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="mt-4 rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </div>
  );
}