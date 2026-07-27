"use client";

import { useState } from "react";
import { SELLER_PACKAGES } from "@/lib/seller-packages";

type CheckoutResponse = {
  success?: boolean;
  error?: string;
  requiresPayment?: boolean;
  package?: string;
  amount?: number;
  paymentProvider?: string;
  redirectUrl?: string;
};

export default function SellerPackagesPage() {
  const [loadingPackage, setLoadingPackage] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  async function handleUpgrade(packageName: string) {
    const packageSlug = packageName.toLowerCase();

    try {
      setError(null);
      setLoadingPackage(packageName);

      const response = await fetch(
        "/api/seller/packages/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageSlug,
          }),
        }
      );

      const data: CheckoutResponse =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to start checkout."
        );
      }

      if (!data.redirectUrl) {
        throw new Error(
          "Checkout redirect URL was not returned."
        );
      }

      window.location.href = data.redirectUrl;
    } catch (err) {
      console.error(
        "Seller package checkout error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );

      setLoadingPackage(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Seller Packages
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400">
          Upgrade your account to unlock more
          listings and premium marketplace features.
        </p>

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(SELLER_PACKAGES).map(
            (pkg) => {
              const isLoading =
                loadingPackage === pkg.name;

              const checkoutInProgress =
                loadingPackage !== null;

              return (
                <div
                  key={pkg.name}
                  className="flex flex-col rounded-3xl border border-white/10 bg-[#111827] p-8"
                >
                  <h2 className="text-3xl font-bold">
                    {pkg.name}
                  </h2>

                  <div className="mt-4">
                    <span className="text-4xl font-bold text-indigo-400">
                      ${pkg.price}
                    </span>

                    {pkg.price > 0 && (
                      <span className="ml-2 text-gray-500">
                        / package
                      </span>
                    )}
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-6">
                    <p className="text-gray-400">
                      Listing limit
                    </p>

                    <p className="mt-2 text-xl font-semibold">
                      {pkg.isUnlimited
                        ? "Unlimited"
                        : pkg.listingLimit}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={checkoutInProgress}
                    onClick={() =>
                      handleUpgrade(pkg.name)
                    }
                    className="mt-8 w-full rounded-xl bg-indigo-600 py-4 font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading
                      ? "Processing..."
                      : pkg.price === 0
                        ? "Choose Free"
                        : "Upgrade"}
                  </button>
                </div>
              );
            }
          )}
        </div>
      </div>
    </main>
  );
}