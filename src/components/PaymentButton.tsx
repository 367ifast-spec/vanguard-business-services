"use client";

import { useState } from "react";

type PaymentButtonProps = {
  amount: number;
  service: string;
  quoteId: string;
};

export default function PaymentButton({
  amount,
  service,
  quoteId,
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
  quote_id: quoteId,
  price_amount: amount,
  price_currency: "usd",
  pay_currency: "usdttrc20",
  order_id: `VBS-${Date.now()}`,
  order_description: service,
}),
      });

      const data = await response.json();

console.log("Payment Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Unable to create payment.");
      }

      const paymentUrl = data.invoice_url;

if (typeof paymentUrl !== "string" || paymentUrl.length === 0) {
  throw new Error("Invoice URL was not returned by NOWPayments.");
}

window.location.href = paymentUrl;
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Unexpected payment error."
      );
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
      {loading ? "Creating Secure Payment..." : "Pay Securely with Crypto"}
    </button>
  );
}