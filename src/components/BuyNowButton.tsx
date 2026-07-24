"use client";

export default function BuyNowButton() {
  async function handleBuy() {
    try {
      const response = await fetch(
        "/api/marketplace/payment",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      console.log(
        "Payment Response:",
        data
      );

      if (data.success && data.checkoutUrl) {
        window.location.href =
          data.checkoutUrl;
        return;
      }

      alert(
        data.message ||
          "Unable to create checkout session."
      );
    } catch (error) {
      console.error(
        "Buy Now Error:",
        error
      );

      alert(
        "Payment API is not working."
      );
    }
  }

  return (
    <button
      onClick={handleBuy}
      className="rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700"
    >
      Buy Now
    </button>
  );
}