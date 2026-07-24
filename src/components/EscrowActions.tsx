"use client";

import {
  releaseEscrowAction,
  completeEscrowAction,
  disputeEscrowAction,
} from "@/app/escrow/actions";

export default function EscrowActions({
  id,
}: {
  id: string;
}) {
  async function handleRelease() {
    const result =
      await releaseEscrowAction(id);

    alert(result.message);

    if (result.success) {
      window.location.reload();
    }
  }

  async function handleComplete() {
    const result =
      await completeEscrowAction(id);

    alert(result.message);

    if (result.success) {
      window.location.reload();
    }
  }

  async function handleDispute() {
    const result =
      await disputeEscrowAction(id);

    alert(result.message);

    if (result.success) {
      window.location.reload();
    }
  }

  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <button
        onClick={handleRelease}
        className="rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700"
      >
        Release Payment
      </button>

      <button
        onClick={handleComplete}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
      >
        Mark Completed
      </button>

      <button
        onClick={handleDispute}
        className="rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
      >
        Open Dispute
      </button>
    </div>
  );
}