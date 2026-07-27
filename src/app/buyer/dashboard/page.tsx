"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function BuyerDashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [watchlistCount, setWatchlistCount] =
    useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setMessage("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (!active) {
          return;
        }

        if (userError) {
          console.error(
            "BUYER DASHBOARD AUTH ERROR:",
            userError
          );

          setMessage(
            `Authentication failed: ${userError.message}`
          );

          return;
        }

        if (!user) {
          router.replace("/login");
          return;
        }

        setEmail(user.email ?? "");

        const {
          count,
          error: watchlistError,
        } = await supabase
          .from("watchlist")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("user_id", user.id);

        if (!active) {
          return;
        }

        if (watchlistError) {
          console.error(
            "BUYER DASHBOARD WATCHLIST ERROR:",
            watchlistError
          );

          setMessage(
            `Failed to load watchlist count: ${watchlistError.message}`
          );

          return;
        }

        setWatchlistCount(count ?? 0);
      } catch (error) {
        console.error(
          "BUYER DASHBOARD ERROR:",
          error
        );

        if (!active) {
          return;
        }

        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to load buyer dashboard."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogout() {
    try {
      const { error } =
        await supabase.auth.signOut();

      if (error) {
        console.error(
          "BUYER LOGOUT ERROR:",
          error
        );

        setMessage(
          `Logout failed: ${error.message}`
        );

        return;
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(
        "BUYER LOGOUT UNEXPECTED ERROR:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Logout failed."
      );
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B1020] px-6 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-indigo-500" />

          <p className="mt-4 text-gray-400">
            Loading buyer dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Vanguard Marketplace
            </p>

            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
              Buyer Dashboard
            </h1>

            <p className="mt-3 text-gray-400">
              Browse listings, manage saved items,
              and access your marketplace account.
            </p>

            {email ? (
              <p className="mt-2 text-sm text-gray-500">
                Signed in as {email}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/marketplace"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-700"
            >
              Browse Marketplace
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-white/20 px-5 py-3 font-semibold transition hover:bg-white/5"
            >
              Logout
            </button>
          </div>
        </div>

        {message ? (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {message}
          </div>
        ) : null}

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-7">
            <p className="text-sm font-medium text-gray-400">
              Saved Listings
            </p>

            <p className="mt-3 text-4xl font-bold">
              {watchlistCount}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Listings currently in your watchlist.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111827] p-7">
            <p className="text-sm font-medium text-gray-400">
              Buyer Status
            </p>

            <p className="mt-3 text-2xl font-bold text-green-400">
              Active
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Your marketplace buyer account is
              available.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111827] p-7">
            <p className="text-sm font-medium text-gray-400">
              Escrow Protection
            </p>

            <p className="mt-3 text-2xl font-bold text-indigo-400">
              Enabled
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Marketplace transactions use the
              protected transaction flow.
            </p>
          </div>
        </div>

        <section className="mt-10">
          <div>
            <h2 className="text-2xl font-bold">
              Quick Actions
            </h2>

            <p className="mt-2 text-gray-400">
              Access your most-used buyer features.
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Link
              href="/watchlist"
              className="group rounded-3xl border border-white/10 bg-[#111827] p-7 transition hover:border-indigo-500/50 hover:bg-[#151D2E]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl text-indigo-400">
                    ♡
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    My Watchlist
                  </h3>

                  <p className="mt-2 text-gray-400">
                    View and manage the marketplace
                    listings you saved.
                  </p>
                </div>

                <span className="text-2xl text-gray-500 transition group-hover:translate-x-1 group-hover:text-indigo-400">
                  →
                </span>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <span className="font-semibold text-indigo-400">
                  {watchlistCount} saved{" "}
                  {watchlistCount === 1
                    ? "listing"
                    : "listings"}
                </span>
              </div>
            </Link>

            <Link
              href="/marketplace"
              className="group rounded-3xl border border-white/10 bg-[#111827] p-7 transition hover:border-indigo-500/50 hover:bg-[#151D2E]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl text-indigo-400">
                    ◇
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    Marketplace
                  </h3>

                  <p className="mt-2 text-gray-400">
                    Discover approved digital asset
                    listings from marketplace sellers.
                  </p>
                </div>

                <span className="text-2xl text-gray-500 transition group-hover:translate-x-1 group-hover:text-indigo-400">
                  →
                </span>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <span className="font-semibold text-indigo-400">
                  Browse Listings
                </span>
              </div>
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-7">
          <h2 className="text-xl font-bold">
            Marketplace Safety
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-400">
            Keep marketplace deals and payments on
            the platform and use the protected
            transaction process when purchasing a
            listing.
          </p>
        </section>
      </div>
    </main>
  );
}