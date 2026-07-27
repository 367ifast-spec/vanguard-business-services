"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

type Props = {
  listingId: string;
  sellerId: string;
  price: number | string;
};

type PaymentResponse = {
  success?: boolean;
  message?: string;
  checkoutUrl?: string;
  transactionId?: string;
};

export default function BuyNowButton({
  listingId,
  sellerId,
  price,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleBuy() {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error(
          "BUY NOW SESSION ERROR:",
          sessionError
        );

        setMessage(
          `Authentication failed: ${sessionError.message}`
        );

        return;
      }

      if (!session?.user || !session.access_token) {
        router.push("/login");
        return;
      }

      if (session.user.id === sellerId) {
        setMessage(
          "You cannot purchase your own listing."
        );

        return;
      }

      const numericPrice = Number(price);

      if (
        !Number.isFinite(numericPrice) ||
        numericPrice <= 0
      ) {
        setMessage("Invalid listing price.");
        return;
      }

      console.log("BUY NOW REQUEST:", {
        listingId,
        buyerId: session.user.id,
      });

      const response = await fetch(
        "/api/marketplace/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            listingId,
          }),
        }
      );

      let data: PaymentResponse;

      try {
        data =
          (await response.json()) as PaymentResponse;
      } catch {
        setMessage(
          "Payment API returned an invalid response."
        );

        return;
      }

      console.log(
        "MARKETPLACE PAYMENT RESPONSE:",
        data
      );

      if (!response.ok || !data.success) {
        setMessage(
          data.message ||
            "Unable to start marketplace transaction."
        );

        return;
      }

      if (data.checkoutUrl) {
        router.push(data.checkoutUrl);
        return;
      }

      if (data.transactionId) {
        router.push(
          `/buyer/orders/${data.transactionId}`
        );

        return;
      }

      router.push("/buyer/orders");
    } catch (error) {
      console.error(
        "BUY NOW ERROR:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to start marketplace transaction."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleBuy}
        disabled={loading}
        className="w-full rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Starting Transaction..."
          : "Buy Now"}
      </button>

      {message ? (
        <p className="mt-3 text-sm text-red-300">
          {message}
        </p>
      ) : null}
    </div>
  );
}