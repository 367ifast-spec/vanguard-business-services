"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

type SellerPackage = {
  id: string;
  name: string;
  slug: string;
  price_usd: number | null;
  listing_limit: number | null;
  is_unlimited: boolean | null;
  badge_name: string | null;
};

type SellerSubscription = {
  id: string;
  seller_id: string;
  package_id: string;
  status: string;
  amount_paid: number | null;
  created_at: string;
  updated_at: string | null;
};

type MarketplaceListing = {
  id: string;
};

export default function SellerSubscriptionPage() {
  const [loading, setLoading] = useState(true);

  const [authRequired, setAuthRequired] =
    useState(false);

  const [sellerPackage, setSellerPackage] =
    useState<SellerPackage | null>(null);

  const [subscription, setSubscription] =
    useState<SellerSubscription | null>(
      null
    );

  const [usedListings, setUsedListings] =
    useState(0);

  const [loadError, setLoadError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadSubscription() {
      try {
        setLoading(true);
        setLoadError(null);

        /*
         * ----------------------------------------
         * 1. Get logged-in seller
         * ----------------------------------------
         */

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          setAuthRequired(true);
          return;
        }

        /*
         * ----------------------------------------
         * 2. Count seller listings
         * ----------------------------------------
         */

        const {
          data: listingsData,
          error: listingsError,
        } = await supabase
          .from("marketplace_listings")
          .select("id")
          .eq("seller_id", user.id);

        if (listingsError) {
          throw listingsError;
        }

        const listings =
          (listingsData as
            | MarketplaceListing[]
            | null) ?? [];

        setUsedListings(listings.length);

        /*
         * ----------------------------------------
         * 3. Find active seller subscription
         * ----------------------------------------
         */

        const {
          data: subscriptionData,
          error: subscriptionError,
        } = await supabase
          .from("seller_subscriptions")
          .select(
            `
              id,
              seller_id,
              package_id,
              status,
              amount_paid,
              created_at,
              updated_at
            `
          )
          .eq("seller_id", user.id)
          .eq("status", "active")
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle();

        if (subscriptionError) {
          throw subscriptionError;
        }

        if (subscriptionData) {
          const activeSubscription =
            subscriptionData as SellerSubscription;

          setSubscription(
            activeSubscription
          );

          /*
           * ----------------------------------------
           * 4. Load active package
           * ----------------------------------------
           */

          const {
            data: packageData,
            error: packageError,
          } = await supabase
            .from("seller_packages")
            .select(
              `
                id,
                name,
                slug,
                price_usd,
                listing_limit,
                is_unlimited,
                badge_name
              `
            )
            .eq(
              "id",
              activeSubscription.package_id
            )
            .maybeSingle();

          if (packageError) {
            throw packageError;
          }

          if (!packageData) {
            throw new Error(
              "Active seller package was not found."
            );
          }

          setSellerPackage(
            packageData as SellerPackage
          );

          return;
        }

        /*
         * ----------------------------------------
         * 5. No active subscription:
         *    fallback to FREE package
         * ----------------------------------------
         */

        const {
          data: freePackageData,
          error: freePackageError,
        } = await supabase
          .from("seller_packages")
          .select(
            `
              id,
              name,
              slug,
              price_usd,
              listing_limit,
              is_unlimited,
              badge_name
            `
          )
          .eq("slug", "free")
          .maybeSingle();

        if (freePackageError) {
          throw freePackageError;
        }

        if (!freePackageData) {
          throw new Error(
            "FREE seller package was not found."
          );
        }

        setSellerPackage(
          freePackageData as SellerPackage
        );
      } catch (error) {
        console.error(
          "SELLER SUBSCRIPTION LOAD ERROR:",
          error
        );

        setLoadError(
          error instanceof Error
            ? error.message
            : "Unable to load seller subscription."
        );
      } finally {
        setLoading(false);
      }
    }

    loadSubscription();
  }, []);

  /*
   * ----------------------------------------
   * Package calculations
   * ----------------------------------------
   */

  const unlimited =
    sellerPackage?.is_unlimited === true;

  const listingLimit =
    sellerPackage?.listing_limit ?? 0;

  const remainingListings = unlimited
    ? null
    : Math.max(
        listingLimit - usedListings,
        0
      );

  /*
   * ----------------------------------------
   * Loading
   * ----------------------------------------
   */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0B1020] text-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-5xl font-bold">
            Seller Subscription
          </h1>

          <div className="mt-10 rounded-3xl bg-[#111827] p-8">
            <p className="text-gray-400">
              Loading subscription...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ----------------------------------------
   * Login required
   * ----------------------------------------
   */

  if (authRequired) {
    return (
      <main className="min-h-screen bg-[#0B1020] text-white">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-8">
            <h1 className="text-3xl font-bold text-yellow-400">
              Login Required
            </h1>

            <p className="mt-4 text-gray-300">
              Please login to view your seller
              subscription.
            </p>

            <Link
              href="/seller/login"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700"
            >
              Seller Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ----------------------------------------
   * Error
   * ----------------------------------------
   */

  if (loadError || !sellerPackage) {
    return (
      <main className="min-h-screen bg-[#0B1020] text-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-5xl font-bold">
            Seller Subscription
          </h1>

          <div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/10 p-8">
            <h2 className="text-2xl font-bold text-red-400">
              Unable to Load Subscription
            </h2>

            <p className="mt-3 text-gray-300">
              {loadError ??
                "Seller package information is unavailable."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Seller Subscription
        </h1>

        <p className="mt-4 text-gray-400">
          Manage your marketplace subscription and
          package limits.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
                Current Package
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {sellerPackage.name}
              </h2>

              {sellerPackage.badge_name ? (
                <p className="mt-2 text-gray-400">
                  {sellerPackage.badge_name}
                </p>
              ) : null}
            </div>

            <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
              {subscription
                ? "Active"
                : "FREE"}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-[#0B1020] p-5">
              <p className="text-sm text-gray-400">
                Used Listings
              </p>

              <p className="mt-2 text-3xl font-bold">
                {usedListings}
              </p>
            </div>

            <div className="rounded-2xl bg-[#0B1020] p-5">
              <p className="text-sm text-gray-400">
                Listing Limit
              </p>

              <p className="mt-2 text-3xl font-bold">
                {unlimited
                  ? "Unlimited"
                  : listingLimit}
              </p>
            </div>

            <div className="rounded-2xl bg-[#0B1020] p-5">
              <p className="text-sm text-gray-400">
                Remaining Listings
              </p>

              <p className="mt-2 text-3xl font-bold">
                {unlimited
                  ? "Unlimited"
                  : remainingListings}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="space-y-3 text-gray-300">
              <p>
                Package:{" "}
                <span className="font-semibold text-white">
                  {sellerPackage.name}
                </span>
              </p>

              <p>
                Status:{" "}
                <span className="font-semibold text-green-400">
                  Active
                </span>
              </p>

              <p>
                Package Price:{" "}
                <span className="font-semibold text-white">
                  $
                  {Number(
                    sellerPackage.price_usd ??
                      0
                  ).toFixed(2)}
                </span>
              </p>

              {subscription ? (
                <p>
                  Amount Paid:{" "}
                  <span className="font-semibold text-white">
                    $
                    {Number(
                      subscription.amount_paid ??
                        0
                    ).toFixed(2)}
                  </span>
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/seller/packages"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700"
            >
              View Seller Packages
            </Link>

            <Link
              href="/seller/dashboard"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}