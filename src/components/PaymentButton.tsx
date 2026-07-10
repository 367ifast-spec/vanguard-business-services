"use client";

import { useState } from "react";

type PaymentButtonProps = {
  amount: number;
  service: string;
};

export default function PaymentButton({
  amount,
  service,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handlePayment() {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_amount: amount,
          price_currency: "usd",
          pay_currency: "usdttrc20",
          order_id: `VBS-${Date.now()}`,
          order_description: service,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create payment.");
      }

      if (!data.invoice_url) {
        throw new Error("Payment link was not returned.");
      }

      window.location.assign(data.invoice_url);

    } catch (error) {
      console.error("Payment Error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Unexpected error occurred.";

      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={loading}
      className="inline-flex items-center justify-center rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <svg
            className="mr-2 h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              opacity="0.25"
            />
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>

          Creating Secure Payment...
        </>
      ) : (
        "Pay Securely with Crypto"
      )}
    </button>
  );
}