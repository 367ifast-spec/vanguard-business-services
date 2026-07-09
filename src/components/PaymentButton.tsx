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
    try {
      setLoading(true);

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_amount: amount,
          price_currency: "usd",
          pay_currency: "usdttrc20",
          order_id: `ORD-${Date.now()}`,
          order_description: service,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Payment failed.");
        return;
      }

      if (data.invoice_url) {
        window.location.href = data.invoice_url;
        return;
      }

      alert("Invoice URL not found.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Creating Payment..." : "Pay with Crypto"}
    </button>
  );
}