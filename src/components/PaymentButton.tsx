"use client";

import { useState } from "react";

interface PaymentButtonProps {
  orderId: string;
}

export default function PaymentButton({
  orderId,
}: PaymentButtonProps) {

  const [loading, setLoading] =
    useState(false);


  async function handlePayment() {

    if (loading) {
      return;
    }


    try {

      setLoading(true);


      const response =
        await fetch(
          "/api/payment/create",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              orderId,
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data?.error ??
            "Unable to create payment."
        );

      }


      if (!data.paymentUrl) {

        throw new Error(
          "Payment URL was not generated."
        );

      }


      window.location.href =
        data.paymentUrl;


    } catch (error) {


      alert(
        error instanceof Error
          ? error.message
          : "Payment process failed."
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
      className="
        inline-flex
        w-full
        items-center
        justify-center
        rounded-xl
        bg-blue-600
        px-6
        py-4
        text-base
        font-semibold
        text-white
        transition
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading
        ? "Creating Secure Invoice..."
        : "Pay with Crypto"}
    </button>
  );
}
