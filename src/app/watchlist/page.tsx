"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

type WatchlistRow = {
  id: string;
  listing_id: string;
  created_at: string | null;
};

type Listing = {
  id: string;
  title: string;
  slug: string;
  price: number | string;
  image_url: string | null;
  status: string | null;
};

type WatchlistItem = {
  watchlistId: string;
  createdAt: string | null;
  listing: Listing;
};

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<
    string | null
  >(null);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadWatchlist() {
      try {
        setLoading(true);
        setMessage("");
        setIsError(false);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (!active) {
          return;
        }

        if (userError) {
          console.error(
            "WATCHLIST PAGE AUTH ERROR:",
            userError
          );

          setIsError(true);
          setMessage(
            `Authentication failed: ${userError.message}`
          );

          return;
        }

        if (!user) {
          setItems([]);

          setIsError(true);
          setMessage(
            "Please login to view your watchlist."
          );

          return;
        }

        const {
          data: watchlistRows,
          error: watchlistError,
        } = await supabase
          .from("watchlist")
          .select("id, listing_id, created_at")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

        if (!active) {
          return;
        }

        if (watchlistError) {
          console.error(
            "WATCHLIST PAGE LOAD ERROR:",
            watchlistError
          );

          setIsError(true);
          setMessage(
            `Failed to load watchlist: ${watchlistError.message}`
          );

          return;
        }

        const rows =
          (watchlistRows as WatchlistRow[] | null) ??
          [];

        if (rows.length === 0) {
          setItems([]);
          return;
        }

        const listingIds = rows.map(
          (row) => row.listing_id
        );

        const {
          data: listings,
          error: listingsError,
        } = await supabase
          .from("marketplace_listings")
          .select(
            "id, title, slug, price, image_url, status"
          )
          .in("id", listingIds);

        if (!active) {
          return;
        }

        if (listingsError) {
          console.error(
            "WATCHLIST LISTINGS ERROR:",
            listingsError
          );

          setIsError(true);
          setMessage(
            `Failed to load saved listings: ${listingsError.message}`
          );

          return;
        }

        const listingData =
          (listings as Listing[] | null) ?? [];

        const listingMap = new Map(
          listingData.map((listing) => [
            listing.id,
            listing,
          ])
        );

        const finalItems: WatchlistItem[] = [];

        for (const row of rows) {
          const listing = listingMap.get(
            row.listing_id
          );

          if (!listing) {
            continue;
          }

          finalItems.push({
            watchlistId: row.id,
            createdAt: row.created_at,
            listing,
          });
        }

        console.log(
          "WATCHLIST PAGE LOAD SUCCESS:",
          finalItems
        );

        setItems(finalItems);
      } catch (error) {
        console.error(
          "WATCHLIST PAGE UNEXPECTED ERROR:",
          error
        );

        if (!active) {
          return;
        }

        setIsError(true);

        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to load watchlist."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadWatchlist();

    return () => {
      active = false;
    };
  }, []);

  async function removeFromWatchlist(
    item: WatchlistItem
  ) {
    if (removingId) {
      return;
    }

    try {
      setRemovingId(item.watchlistId);
      setMessage("");
      setIsError(false);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        setIsError(true);

        setMessage(
          `Authentication failed: ${userError.message}`
        );

        return;
      }

      if (!user) {
        setIsError(true);

        setMessage(
          "Please login to manage your watchlist."
        );

        return;
      }

      const {
        data: deletedRows,
        error: deleteError,
      } = await supabase
        .from("watchlist")
        .delete()
        .eq("id", item.watchlistId)
        .eq("user_id", user.id)
        .select("id");

      if (deleteError) {
        console.error(
          "WATCHLIST PAGE DELETE ERROR:",
          deleteError
        );

        setIsError(true);

        setMessage(
          `Failed to remove listing: ${deleteError.message}`
        );

        return;
      }

      if (
        !deletedRows ||
        deletedRows.length === 0
      ) {
        setIsError(true);

        setMessage(
          "Remove failed: database did not delete the watchlist item."
        );

        return;
      }

      setItems((currentItems) =>
        currentItems.filter(
          (currentItem) =>
            currentItem.watchlistId !==
            item.watchlistId
        )
      );

      setMessage(
        `"${item.listing.title}" removed from your watchlist.`
      );

      console.log(
        "WATCHLIST PAGE REMOVE SUCCESS:",
        item.watchlistId
      );
    } catch (error) {
      console.error(
        "WATCHLIST PAGE REMOVE UNEXPECTED ERROR:",
        error
      );

      setIsError(true);

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to remove watchlist item."
      );
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Vanguard Marketplace
            </p>

            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
              My Watchlist
            </h1>

            <p className="mt-3 text-gray-400">
              View and manage your saved marketplace
              listings.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="inline-flex rounded-xl border border-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/5"
          >
            Browse Marketplace
          </Link>
        </div>

        {message ? (
          <div
            className={`mt-8 rounded-xl border p-4 text-sm ${
              isError
                ? "border-red-500/30 bg-red-500/10 text-red-300"
                : "border-green-500/30 bg-green-500/10 text-green-300"
            }`}
          >
            {message}
          </div>
        ) : null}

        {loading ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-10 text-center">
            <p className="text-gray-400">
              Loading your watchlist...
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 text-3xl text-indigo-400">
              ♡
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Your watchlist is empty
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-gray-400">
              Save listings from the marketplace and
              they will appear here for quick access.
            </p>

            <Link
              href="/marketplace"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700"
            >
              Explore Marketplace
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-10 flex items-center justify-between">
              <p className="text-gray-400">
                {items.length} saved{" "}
                {items.length === 1
                  ? "listing"
                  : "listings"}
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => {
                const { listing } = item;

                return (
                  <article
                    key={item.watchlistId}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827]"
                  >
                    {listing.image_url ? (
                      <img
                        src={listing.image_url}
                        alt={listing.title}
                        className="h-52 w-full object-cover"
                      />
                    ) : (
                      <div className="h-52 bg-gradient-to-r from-indigo-600 to-purple-600" />
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-bold">
                            {listing.title}
                          </h2>

                          {listing.status ? (
                            <p className="mt-2 text-xs uppercase tracking-wider text-green-400">
                              {listing.status}
                            </p>
                          ) : null}
                        </div>

                        <p className="text-xl font-bold text-indigo-400">
                          ${listing.price}
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <Link
                          href={`/listing/${listing.slug}`}
                          className="rounded-xl bg-indigo-600 px-4 py-3 text-center font-semibold transition hover:bg-indigo-700"
                        >
                          View Listing
                        </Link>

                        <button
                          type="button"
                          disabled={
                            removingId ===
                            item.watchlistId
                          }
                          onClick={() =>
                            removeFromWatchlist(
                              item
                            )
                          }
                          className="rounded-xl border border-white/20 px-4 py-3 font-semibold transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {removingId ===
                          item.watchlistId
                            ? "Removing..."
                            : "Remove"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}