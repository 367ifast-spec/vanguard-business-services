"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ResolutionAction = "release_seller" | "refund_buyer";

type Props = {
  escrowId: string;
};

type ApiResult = {
  success?: boolean;
  message?: string;
  error?: string;
};

export default function DisputeResolutionActions({
  escrowId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState<ResolutionAction | null>(null);

  const [error, setError] = useState<string | null>(null);

  async function submitResolution(
    action: ResolutionAction
  ) {
    if (loading) {
      return;
    }

    setError(null);

    const confirmationMessage =
      action === "release_seller"
        ? "Release this disputed escrow to the seller?"
        : "Refund this disputed escrow to the buyer?";

    if (!window.confirm(confirmationMessage)) {
      return;
    }

    setLoading(action);

    try {
      const response = await fetch(
        "/api/admin/escrow/resolve",
        {
          method: "POST",
          credentials: "include",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            escrow_id: escrowId,
            action,
          }),
        }
      );

      let result: ApiResult = {};

      try {
        result = (await response.json()) as ApiResult;
      } catch {
        result = {};
      }

      if (!response.ok) {
        const message =
          result.error ??
          `Request failed with status ${response.status}.`;

        setError(message);
        window.alert(message);
        return;
      }

      window.alert(
        result.message ??
          (action === "release_seller"
            ? "Funds released to seller successfully."
            : "Buyer refunded successfully.")
      );

      router.refresh();
    } catch (requestError) {
      console.error(
        "ADMIN ESCROW RESOLUTION REQUEST ERROR:",
        requestError
      );

      const message =
        "Unable to resolve the dispute. Please try again.";

      setError(message);
      window.alert(message);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        disabled={loading !== null}
        onClick={() => {
          void submitResolution("release_seller");
        }}
        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading === "release_seller"
          ? "Releasing..."
          : "Release to Seller"}
      </button>

      <button
        type="button"
        disabled={loading !== null}
        onClick={() => {
          void submitResolution("refund_buyer");
        }}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading === "refund_buyer"
          ? "Refunding..."
          : "Refund Buyer"}
      </button>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300"
        >
          {error}
        </p>
      )}
    </div>
  );
}