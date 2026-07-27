"use client";

import { useState } from "react";

import {
  releaseEscrowAction,
  completeEscrowAction,
  disputeEscrowAction,
} from "@/app/escrow/actions";

type EscrowRole = "buyer" | "seller";

type EscrowActionsProps = {
  id: string;
  role: EscrowRole;
  status: string;
};

export default function EscrowActions({
  id,
  role,
  status,
}: EscrowActionsProps) {
  const [loading, setLoading] = useState<
    "deliver" | "release" | "complete" | "dispute" | null
  >(null);

  async function handleDeliver() {
    console.log("DELIVER BUTTON CLICKED", {
      id,
      role,
      status,
    });

    window.alert(
      `Deliver handler fired\nTransaction: ${id}`
    );

    if (loading) {
      console.log("DELIVER BLOCKED: loading =", loading);
      return;
    }

    const confirmed = window.confirm(
      "Mark this transaction as delivered?"
    );

    console.log(
      "DELIVER CONFIRM RESULT:",
      confirmed
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading("deliver");

      console.log(
        "SENDING DELIVER REQUEST:",
        id
      );

      const response = await fetch(
        "/api/escrow/deliver",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            escrow_id: id,
          }),
        }
      );

      console.log(
        "DELIVER RESPONSE STATUS:",
        response.status
      );

      const result = await response.json();

      console.log(
        "DELIVER RESPONSE BODY:",
        result
      );

      if (!response.ok || !result.success) {
        window.alert(
          result.error ??
            "Failed to mark transaction as delivered."
        );
        return;
      }

      window.alert(
        result.message ??
          "Transaction marked as delivered successfully."
      );

      window.location.reload();
    } catch (error) {
      console.error(
        "ESCROW DELIVERY CLIENT ERROR:",
        error
      );

      window.alert(
        "Failed to mark transaction as delivered."
      );
    } finally {
      setLoading(null);
    }
  }

  async function handleRelease() {
    if (loading) {
      return;
    }

    const confirmed = window.confirm(
      "Accept the delivery and release the escrow payment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading("release");

      const result =
        await releaseEscrowAction(id);

      window.alert(result.message);

      if (result.success) {
        window.location.reload();
      }
    } finally {
      setLoading(null);
    }
  }

  async function handleComplete() {
    if (loading) {
      return;
    }

    const confirmed = window.confirm(
      "Mark this escrow transaction as completed?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading("complete");

      const result =
        await completeEscrowAction(id);

      window.alert(result.message);

      if (result.success) {
        window.location.reload();
      }
    } finally {
      setLoading(null);
    }
  }

  async function handleDispute() {
    if (loading) {
      return;
    }

    const confirmed = window.confirm(
      "Open a dispute for this transaction?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading("dispute");

      const result =
        await disputeEscrowAction(id);

      window.alert(result.message);

      if (result.success) {
        window.location.reload();
      }
    } finally {
      setLoading(null);
    }
  }

  const isBusy = loading !== null;

  if (role === "seller" && status === "funded") {
    return (
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => {
            console.log(
              "DELIVER BUTTON onClick TRIGGERED"
            );

            void handleDeliver();
          }}
          disabled={isBusy}
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "deliver"
            ? "Marking Delivered..."
            : "Mark as Delivered"}
        </button>

        <button
          type="button"
          onClick={() => {
            void handleDispute();
          }}
          disabled={isBusy}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "dispute"
            ? "Opening Dispute..."
            : "Open Dispute"}
        </button>
      </div>
    );
  }

  if (role === "buyer" && status === "delivered") {
    return (
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => {
            void handleRelease();
          }}
          disabled={isBusy}
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "release"
            ? "Releasing..."
            : "Release Payment"}
        </button>

        <button
          type="button"
          onClick={() => {
            void handleDispute();
          }}
          disabled={isBusy}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "dispute"
            ? "Opening Dispute..."
            : "Open Dispute"}
        </button>
      </div>
    );
  }

  if (role === "buyer" && status === "funded") {
    return (
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => {
            void handleDispute();
          }}
          disabled={isBusy}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "dispute"
            ? "Opening Dispute..."
            : "Open Dispute"}
        </button>
      </div>
    );
  }

  if (role === "seller" && status === "released") {
    return (
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => {
            void handleComplete();
          }}
          disabled={isBusy}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "complete"
            ? "Completing..."
            : "Mark Completed"}
        </button>
      </div>
    );
  }

  return (
    <p className="mt-10 text-sm text-gray-400">
      No actions are available for this transaction
      in its current status.
    </p>
  );
}