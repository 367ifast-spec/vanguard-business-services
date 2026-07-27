"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import LogoutButton from "@/components/LogoutButton";
import { supabase } from "@/lib/supabase";

type MarketplaceListing = {
  id: string;
  status: string | null;
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [authRequired, setAuthRequired] =
    useState(false);

  const [totalListings, setTotalListings] =
    useState(0);

  const [approvedListings, setApprovedListings] =
    useState(0);

  const [pendingListings, setPendingListings] =
    useState(0);

  const [rejectedListings, setRejectedListings] =
    useState(0);

  const FREE_LISTING_LIMIT = 15;

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error(
            "SELLER DASHBOARD USER ERROR:",
            userError
          );
        }

        if (!user) {
          setAuthRequired(true);
          return;
        }

        const { data, error } = await supabase
          .from("marketplace_listings")
          .select("id, status")
          .eq("seller_id", user.id);

        if (error) {
          throw error;
        }

        const listings =
          (data as MarketplaceListing[] | null) ??
          [];

        const total = listings.length;

        const approved = listings.filter(
          (listing) =>
            listing.status?.toLowerCase() ===
            "approved"
        ).length;

        const pending = listings.filter(
          (listing) =>
            (
              listing.status ?? "pending"
            ).toLowerCase() === "pending"
        ).length;

        const rejected = listings.filter(
          (listing) =>
            listing.status?.toLowerCase() ===
            "rejected"
        ).length;

        setTotalListings(total);
        setApprovedListings(approved);
        setPendingListings(pending);
        setRejectedListings(rejected);
      } catch (error) {
        console.error(
          "SELLER DASHBOARD LOAD ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const remainingListings = Math.max(
    FREE_LISTING_LIMIT - totalListings,
    0
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0B1020] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-5xl font-bold">
            Dashboard
          </h1>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[#111827] p-8">
            <p className="text-gray-400">
              Loading seller dashboard...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (authRequired) {
    return (
      <main className="min-h-screen bg-[#0B1020] text-white">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-8">
            <h1 className="text-3xl font-bold text-yellow-400">
              Login Required
            </h1>

            <p className="mt-4 text-gray-300">
              Please login to access your seller
              dashboard.
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

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <div className="mt-6">
          <LogoutButton />
        </div>

        <p className="mt-4 text-gray-400">
          Welcome to your Vanguard Marketplace
          account.
        </p>

        {/* Seller Package */}
        <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">
          <h2 className="text-xl font-semibold">
            Seller Package: FREE
          </h2>

          <p className="mt-2 text-gray-300">
            Remaining Listings: {remainingListings}
          </p>

          <p className="mt-1 text-sm text-gray-400">
            {totalListings} of {FREE_LISTING_LIMIT}{" "}
            listing slots used.
          </p>

          {rejectedListings > 0 ? (
            <p className="mt-2 text-sm text-red-400">
              Rejected Listings:{" "}
              {rejectedListings}
            </p>
          ) : null}
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">
              {totalListings}
            </h2>

            <p className="text-gray-400">
              Total Listings
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">
              {approvedListings}
            </h2>

            <p className="text-gray-400">
              Approved Listings
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">
              {pendingListings}
            </h2>

            <p className="text-gray-400">
              Pending Listings
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">
              $0
            </h2>

            <p className="text-gray-400">
              Total Sales
            </p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link
            href="/seller/listings"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              My Listings
            </h3>

            <p className="mt-2 text-gray-400">
              Manage your marketplace listings.
            </p>
          </Link>

          <Link
            href="/marketplace/create-listing"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Create Listing
            </h3>

            <p className="mt-2 text-gray-400">
              Publish a new marketplace listing.
            </p>
          </Link>

          <Link
            href="/seller/kyc"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              KYC Verification
            </h3>

            <p className="mt-2 text-gray-400">
              Complete or review your KYC status.
            </p>
          </Link>

          <Link
            href="/seller/packages"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Seller Packages
            </h3>

            <p className="mt-2 text-gray-400">
              Upgrade your seller account.
            </p>
          </Link>

          <Link
            href="/messages"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Messages
            </h3>

            <p className="mt-2 text-gray-400">
              View conversations with buyers and
              sellers.
            </p>
          </Link>

          <Link
            href="/escrow"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Escrow
            </h3>

            <p className="mt-2 text-gray-400">
              Track secure marketplace transactions.
            </p>
          </Link>

          <Link
            href="/disputes"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Disputes
            </h3>

            <p className="mt-2 text-gray-400">
              Review and manage disputes.
            </p>
          </Link>

          <Link
            href="/seller/profile"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Profile
            </h3>

            <p className="mt-2 text-gray-400">
              Manage your seller profile.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}