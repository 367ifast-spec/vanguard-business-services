"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  listingId: string;
};

export default function WatchlistButton({
  listingId,
}: Props) {
  const [userId, setUserId] = useState<string | null>(
    null
  );

  const [isWatchlisted, setIsWatchlisted] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadWatchlistStatus() {
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
            "WATCHLIST AUTH ERROR:",
            userError
          );

          setUserId(null);
          setIsWatchlisted(false);
          setMessage(
            `Authentication failed: ${userError.message}`
          );

          return;
        }

        if (!user) {
          setUserId(null);
          setIsWatchlisted(false);
          return;
        }

        setUserId(user.id);

        const { data, error } = await supabase
          .from("watchlist")
          .select("id")
          .eq("user_id", user.id)
          .eq("listing_id", listingId)
          .maybeSingle();

        if (!active) {
          return;
        }

        if (error) {
          console.error(
            "WATCHLIST STATUS ERROR:",
            error
          );

          setMessage(
            `Failed to load watchlist: ${error.message}`
          );

          return;
        }

        console.log(
          "WATCHLIST STATUS:",
          data
        );

        setIsWatchlisted(Boolean(data));
      } catch (error) {
        console.error(
          "WATCHLIST LOAD UNEXPECTED ERROR:",
          error
        );

        if (active) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Failed to load watchlist."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadWatchlistStatus();

    return () => {
      active = false;
    };
  }, [listingId]);

  async function handleWatchlist() {
    if (loading) {
      return;
    }

    setMessage("");

    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(
          "WATCHLIST AUTH ERROR:",
          userError
        );

        setMessage(
          `Authentication failed: ${userError.message}`
        );

        return;
      }

      if (!user) {
        setUserId(null);

        setMessage(
          "Please login to use the watchlist."
        );

        return;
      }

      setUserId(user.id);

      if (isWatchlisted) {
        console.log(
          "WATCHLIST DELETE ATTEMPT:",
          {
            user_id: user.id,
            listing_id: listingId,
          }
        );

        const {
          data: deletedRows,
          error: deleteError,
        } = await supabase
          .from("watchlist")
          .delete()
          .eq("user_id", user.id)
          .eq("listing_id", listingId)
          .select("id, user_id, listing_id");

        if (deleteError) {
          console.error(
            "WATCHLIST DELETE ERROR:",
            {
              message: deleteError.message,
              details: deleteError.details,
              hint: deleteError.hint,
              code: deleteError.code,
            }
          );

          setMessage(
            `Failed to remove from watchlist: ${deleteError.message}`
          );

          return;
        }

        console.log(
          "WATCHLIST DELETE RESULT:",
          deletedRows
        );

        if (
          !deletedRows ||
          deletedRows.length === 0
        ) {
          console.error(
            "WATCHLIST DELETE FAILED: No row was deleted."
          );

          setMessage(
            "Remove failed: database did not delete the watchlist row."
          );

          return;
        }

        const {
          data: remainingRow,
          error: verifyError,
        } = await supabase
          .from("watchlist")
          .select("id")
          .eq("user_id", user.id)
          .eq("listing_id", listingId)
          .maybeSingle();

        if (verifyError) {
          console.error(
            "WATCHLIST DELETE VERIFY ERROR:",
            verifyError
          );

          setMessage(
            `Remove verification failed: ${verifyError.message}`
          );

          return;
        }

        if (remainingRow) {
          console.error(
            "WATCHLIST DELETE VERIFY FAILED:",
            remainingRow
          );

          setMessage(
            "Remove failed: watchlist row still exists."
          );

          return;
        }

        setIsWatchlisted(false);
        setMessage("Removed from watchlist.");

        console.log(
          "WATCHLIST DELETE SUCCESS:",
          listingId
        );

        return;
      }

      console.log(
        "WATCHLIST INSERT ATTEMPT:",
        {
          user_id: user.id,
          listing_id: listingId,
        }
      );

      const {
        data: insertedRows,
        error: insertError,
      } = await supabase
        .from("watchlist")
        .insert({
          user_id: user.id,
          listing_id: listingId,
        })
        .select("id, user_id, listing_id");

      if (insertError) {
        console.error(
          "WATCHLIST INSERT ERROR:",
          {
            message: insertError.message,
            details: insertError.details,
            hint: insertError.hint,
            code: insertError.code,
          }
        );

        setMessage(
          `Failed to add to watchlist: ${insertError.message}`
        );

        return;
      }

      if (
        !insertedRows ||
        insertedRows.length === 0
      ) {
        console.error(
          "WATCHLIST INSERT FAILED: No row returned."
        );

        setMessage(
          "Failed to confirm watchlist insert."
        );

        return;
      }

      console.log(
        "WATCHLIST INSERT SUCCESS:",
        insertedRows
      );

      setIsWatchlisted(true);
      setMessage("Added to watchlist.");
    } catch (error) {
      console.error(
        "WATCHLIST UNEXPECTED ERROR:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Watchlist action failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleWatchlist}
        disabled={loading}
        className={`w-full rounded-xl border py-4 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
          isWatchlisted
            ? "border-indigo-500 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
            : "border-white/20 text-white hover:bg-white/5"
        }`}
      >
        {loading
          ? "Loading..."
          : isWatchlisted
            ? "Remove from Watchlist"
            : "Add to Watchlist"}
      </button>

      {message ? (
        <p className="mt-3 text-center text-sm text-gray-400">
          {message}
        </p>
      ) : null}

      {!loading && !userId ? (
        <p className="mt-2 text-center text-xs text-gray-500">
          Login required
        </p>
      ) : null}
    </div>
  );
}