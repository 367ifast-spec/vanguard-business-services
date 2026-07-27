"use client";

import { useState } from "react";
import { SELLER_PACKAGES } from "@/lib/seller-packages";

type PackageInfo = {
  id?: string;
  name?: string;
  slug?: string;
  price?: number;
  listingLimit?: number | null;
  isUnlimited?: boolean;
};

type CheckoutResponse = {
  success?: boolean;
  error?: string;
  requiresPayment?: boolean;
  sellerId?: string;
  package?: PackageInfo;
  amount?: number;
  paymentProvider?: string;
  redirectUrl?: string;
};

type PaymentCreateResponse = {
  success?: boolean;
  error?: string;
  requiresPayment?: boolean;
  paymentProvider?: string;
  paymentRecordId?: string;
  paymentId?: string | null;
  package?: PackageInfo;
  amount?: number;
  paymentUrl?: string;
};

export default function SellerPackagesPage() {
  const [loadingPackage, setLoadingPackage] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  async function handleUpgrade(packageName: string) {
    const packageSlug =
      packageName.trim().toLowerCase();

    try {
      setError(null);
      setLoadingPackage(packageName);

      /*
       * Step 1:
       * Validate seller + selected package.
       *
       * FREE package can be activated here.
       * Paid packages continue to the dedicated
       * package payment endpoint.
       */
      const checkoutResponse = await fetch(
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

      const checkoutData: CheckoutResponse =
        await checkoutResponse.json();

      if (
        !checkoutResponse.ok ||
        !checkoutData.success
      ) {
        throw new Error(
          checkoutData.error ||
            "Unable to start package checkout."
        );
      }

      /*
       * Step 2:
       * FREE package.
       *
       * Checkout route activates the subscription
       * and returns the seller dashboard URL.
       */
      if (!checkoutData.requiresPayment) {
        if (!checkoutData.redirectUrl) {
          throw new Error(
            "Package activation redirect URL was not returned."
          );
        }

        window.location.assign(
          checkoutData.redirectUrl
        );

        return;
      }

      /*
       * Step 3:
       * Paid package.
       *
       * Do NOT send the seller to the normal
       * /payment or /checkout flow.
       *
       * Create a dedicated seller-package
       * NOWPayments invoice instead.
       */
      const paymentResponse = await fetch(
        "/api/seller/packages/payment/create",
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

      const paymentData: PaymentCreateResponse =
        await paymentResponse.json();

      if (
        !paymentResponse.ok ||
        !paymentData.success
      ) {
        throw new Error(
          paymentData.error ||
            "Unable to create package payment."
        );
      }

      /*
       * Step 4:
       * NOWPayments returns the hosted invoice URL.
       */
      if (!paymentData.paymentUrl) {
        throw new Error(
          "NOWPayments invoice URL was not returned."
        );
      }

      /*
       * Step 5:
       * Redirect directly to NOWPayments.
       *
       * This completely bypasses the normal
       * cart/order checkout flow.
       */
      window.location.assign(
        paymentData.paymentUrl
      );
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
                      ? pkg.price === 0
                        ? "Activating..."
                        : "Creating Payment..."
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