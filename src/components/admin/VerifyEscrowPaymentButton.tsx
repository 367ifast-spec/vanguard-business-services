"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  paymentId: string;
  paymentStatus: string;
};

type VerifyResponse = {
  success?: boolean;
  message?: string;
  payment?: {
    id?: string;
    status?: string;
    verified_at?: string | null;
  };
  transaction?: {
    id?: string;
    status?: string;
    payment_id?: string | null;
    funded_at?: string | null;
  };
};

export default function VerifyEscrowPaymentButton({
  paymentId,
  paymentStatus,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState(false);

  const isSubmitted =
    paymentStatus.toLowerCase() ===
    "submitted";

  async function handleVerify() {
    if (loading || !isSubmitted) {
      return;
    }

    const confirmed = window.confirm(
      "Verify this payment and fund the escrow transaction?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setError(false);

      const response = await fetch(
        `/api/admin/marketplace/payments/${paymentId}/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      let data: VerifyResponse;

      try {
        data =
          (await response.json()) as VerifyResponse;
      } catch {
        setError(true);

        setMessage(
          "Verification API returned an invalid response."
        );

        return;
      }

      console.log(
        "ADMIN PAYMENT VERIFY RESPONSE:",
        data
      );

      if (
        !response.ok ||
        !data.success
      ) {
        setError(true);

        setMessage(
          data.message ||
            "Unable to verify payment."
        );

        return;
      }

      setMessage(
        data.message ||
          "Payment verified and escrow funded successfully."
      );

      router.refresh();
    } catch (verifyError) {
      console.error(
        "ADMIN PAYMENT VERIFY ERROR:",
        verifyError
      );

      setError(true);

      setMessage(
        verifyError instanceof Error
          ? verifyError.message
          : "Unable to verify payment."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!isSubmitted) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <p className="text-sm text-gray-400">
          Payment status:{" "}
          <span className="font-semibold uppercase text-white">
            {paymentStatus}
          </span>
        </p>

        <p className="mt-2 text-xs text-gray-500">
          Only submitted payments can
          be manually verified.
        </p>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleVerify}
        disabled={loading}
        className="w-full rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Verifying Payment..."
          : "Verify Payment & Fund Escrow"}
      </button>

      {message ? (
        <div
          className={`mt-4 rounded-xl border p-4 text-sm ${
            error
              ? "border-red-500/30 bg-red-500/10 text-red-300"
              : "border-green-500/30 bg-green-500/10 text-green-300"
          }`}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}