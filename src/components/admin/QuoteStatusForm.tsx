"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  quoteId: string;
  currentStatus: string;
};

export default function QuoteStatusForm({
  quoteId,
  currentStatus,
}: Props) {
  const router = useRouter();

  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function saveStatus() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/quotes/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote_id: quoteId,
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed");
      }

      setMessage("✅ Status updated successfully.");
      router.refresh();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update status.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteQuote() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quote?"
    );

    if (!confirmed) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/quotes/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote_id: quoteId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Delete failed");
      }

      window.location.href = "/admin";
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to delete quote.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Update Quote Status
      </h2>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border px-4 py-2"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button
          onClick={saveStatus}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Status"}
        </button>

        <button
          onClick={deleteQuote}
          disabled={loading}
          className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete Quote"}
        </button>
      </div>

      {message && (
        <p className="mt-4 text-sm font-medium">
          {message}
        </p>
      )}
    </div>
  );
}