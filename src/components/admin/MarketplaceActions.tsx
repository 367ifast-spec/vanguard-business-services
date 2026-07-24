"use client";

import {
  approveMarketplaceListing,
  rejectMarketplaceListing,
} from "@/lib/marketplace";

export default function MarketplaceActions({
  id,
}: {
  id: string;
}) {
  async function handleApprove() {
    try {
      await approveMarketplaceListing(id);

      alert("Listing approved successfully!");

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("Failed to approve listing.");
    }
  }

  async function handleReject() {
    try {
      await rejectMarketplaceListing(id);

      alert("Listing rejected successfully!");

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("Failed to reject listing.");
    }
  }

  return (
    <>
      <button
        onClick={handleApprove}
        className="rounded-xl bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
      >
        Approve
      </button>

      <button
        onClick={handleReject}
        className="rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
      >
        Reject
      </button>
    </>
  );
}