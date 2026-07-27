"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

type MarketplaceListing = {
  id: string;
  seller_id: string;
  title: string;
  slug: string;
  price: number;
  status: string | null;
  created_at: string | null;
};

function getStatusClasses(status: string) {
  if (status === "approved") {
    return "bg-green-500/20 text-green-400";
  }

  if (status === "rejected") {
    return "bg-red-500/20 text-red-400";
  }

  return "bg-yellow-500/20 text-yellow-400";
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function SellerListingsPage() {
  const [listings, setListings] = useState<
    MarketplaceListing[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [authRequired, setAuthRequired] =
    useState(false);

  useEffect(() => {
    async function loadListings() {
      try {
        setLoading(true);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error(
            "SELLER USER ERROR:",
            userError
          );
        }

        if (!user) {
          setAuthRequired(true);
          setListings([]);
          return;
        }

        const { data, error } = await supabase
          .from("marketplace_listings")
          .select(
            `
              id,
              seller_id,
              title,
              slug,
              price,
              status,
              created_at
            `
          )
          .eq("seller_id", user.id)
          .order("created_at", {
            ascending: false,
          });

        if (error) {
          throw error;
        }

        setListings(
          (data as MarketplaceListing[] | null) ??
            []
        );
      } catch (error) {
        console.error(
          "LOAD SELLER LISTINGS ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  const total = listings.length;

  const approved = listings.filter(
    (listing) =>
      listing.status?.toLowerCase() ===
      "approved"
  ).length;

  const pending = listings.filter(
    (listing) =>
      (listing.status ?? "pending").toLowerCase() ===
      "pending"
  ).length;

  const rejected = listings.filter(
    (listing) =>
      listing.status?.toLowerCase() ===
      "rejected"
  ).length;

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">
              My Listings
            </h1>

            <p className="mt-4 text-gray-400">
              Manage your Vanguard Marketplace
              listings.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/seller/dashboard"
              className="rounded-xl border border-white/10 bg-[#111827] px-5 py-3 font-semibold transition hover:border-indigo-500"
            >
              Back to Dashboard
            </Link>

            <Link
              href="/marketplace/create-listing"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-700"
            >
              Create Listing
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-[#111827] p-8">
            <p className="text-gray-400">
              Loading your listings...
            </p>
          </div>
        ) : authRequired ? (
          <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-8">
            <h2 className="text-xl font-semibold text-yellow-400">
              Login Required
            </h2>

            <p className="mt-2 text-gray-300">
              Please login to view your marketplace
              listings.
            </p>

            <Link
              href="/seller/login"
              className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-700"
            >
              Seller Login
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <h2 className="text-3xl font-bold">
                  {total}
                </h2>

                <p className="mt-1 text-gray-400">
                  Total Listings
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <h2 className="text-3xl font-bold">
                  {approved}
                </h2>

                <p className="mt-1 text-green-400">
                  Approved
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <h2 className="text-3xl font-bold">
                  {pending}
                </h2>

                <p className="mt-1 text-yellow-400">
                  Pending
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
                <h2 className="text-3xl font-bold">
                  {rejected}
                </h2>

                <p className="mt-1 text-red-400">
                  Rejected
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-5">
              {listings.length > 0 ? (
                listings.map((listing) => {
                  const status = (
                    listing.status ?? "pending"
                  ).toLowerCase();

                  return (
                    <div
                      key={listing.id}
                      className="rounded-2xl border border-white/10 bg-[#111827] p-6"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-2xl font-semibold">
                              {listing.title}
                            </h2>

                            <span
                              className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusClasses(
                                status
                              )}`}
                            >
                              {status}
                            </span>
                          </div>

                          <p className="mt-3 text-2xl font-bold text-indigo-400">
                            {formatPrice(
                              Number(listing.price)
                            )}
                          </p>

                          <p className="mt-2 text-sm text-gray-500">
                            Created:{" "}
                            {listing.created_at
                              ? new Date(
                                  listing.created_at
                                ).toLocaleString()
                              : "—"}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {status === "approved" ? (
                            <Link
                              href={`/listing/${listing.slug}`}
                              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-700"
                            >
                              View Listing
                            </Link>
                          ) : (
                            <span className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-400">
                              {status === "rejected"
                                ? "Listing Rejected"
                                : "Awaiting Approval"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-white/10 bg-[#111827] p-10 text-center">
                  <h2 className="text-2xl font-semibold">
                    No Listings Yet
                  </h2>

                  <p className="mt-3 text-gray-400">
                    Create your first marketplace
                    listing to get started.
                  </p>

                  <Link
                    href="/marketplace/create-listing"
                    className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700"
                  >
                    Create Listing
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
