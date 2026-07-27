"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

type EscrowTransaction = {
  id: string;
  listing_id: string | null;
  buyer_id: string | null;
  seller_id: string | null;
  amount: number | string | null;
  status: string | null;
  created_at: string | null;
};

export default function EscrowPage() {
  const router = useRouter();

  const [transactions, setTransactions] = useState<
    EscrowTransaction[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadEscrows() {
      try {
        setLoading(true);
        setMessage("");

        // 1. Get current logged-in seller
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (!active) {
          return;
        }

        if (userError) {
          console.error(
            "ESCROW AUTH ERROR:",
            userError
          );

          setMessage(
            `Authentication failed: ${userError.message}`
          );

          return;
        }

        if (!user) {
          router.replace("/seller/login");
          return;
        }

        // 2. Load ONLY this seller's transactions
        const { data, error } = await supabase
          .from("escrow_transactions")
          .select(
            "id, listing_id, buyer_id, seller_id, amount, status, created_at"
          )
          .eq("seller_id", user.id)
          .order("created_at", {
            ascending: false,
          });

        if (!active) {
          return;
        }

        if (error) {
          console.error(
            "SELLER ESCROW LOAD ERROR:",
            error
          );

          setMessage(
            `Failed to load escrow transactions: ${error.message}`
          );

          return;
        }

        console.log(
          "SELLER ESCROW DATA:",
          data
        );

        setTransactions(
          (data ?? []) as EscrowTransaction[]
        );
      } catch (error) {
        console.error(
          "ESCROW UNEXPECTED ERROR:",
          error
        );

        if (!active) {
          return;
        }

        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to load escrow transactions."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadEscrows();

    return () => {
      active = false;
    };
  }, [router]);

  const completed = transactions.filter(
    (transaction) =>
      transaction.status?.toLowerCase() ===
      "completed"
  ).length;

  const funded = transactions.filter(
    (transaction) =>
      transaction.status?.toLowerCase() ===
      "funded"
  ).length;

  const pending = transactions.filter(
    (transaction) =>
      transaction.status?.toLowerCase() ===
      "pending"
  ).length;

  const disputed = transactions.filter(
    (transaction) =>
      transaction.status?.toLowerCase() ===
      "disputed"
  ).length;

  function formatAmount(
    amount: EscrowTransaction["amount"]
  ) {
    const numericAmount = Number(amount ?? 0);

    if (Number.isNaN(numericAmount)) {
      return "$0.00";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(numericAmount);
  }

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-bold">
              Escrow Dashboard
            </h1>

            <p className="mt-4 text-gray-400">
              Manage your secure marketplace
              transactions.
            </p>
          </div>

          <Link
            href="/seller/dashboard"
            className="rounded-xl border border-white/10 px-5 py-3 text-center font-semibold transition hover:bg-white/5"
          >
            Seller Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-white/5 p-6">
            <h2 className="text-3xl font-bold">
              {completed}
            </h2>

            <p className="text-gray-400">
              Completed
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <h2 className="text-3xl font-bold">
              {funded}
            </h2>

            <p className="text-gray-400">
              Funded
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <h2 className="text-3xl font-bold">
              {pending}
            </h2>

            <p className="text-gray-400">
              Pending
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <h2 className="text-3xl font-bold">
              {disputed}
            </h2>

            <p className="text-gray-400">
              Disputed
            </p>
          </div>
        </div>

        {/* Error */}
        {message ? (
          <div className="mt-10 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
            {message}
          </div>
        ) : null}

        {/* Loading */}
        {loading ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-[#111827] p-8">
            <p className="text-gray-400">
              Loading escrow transactions...
            </p>
          </div>
        ) : null}

        {/* Transactions */}
        {!loading && !message ? (
          <div className="mt-10 space-y-6">
            {transactions.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#111827] p-8">
                <p className="text-gray-400">
                  No escrow transactions found for
                  your seller account yet.
                </p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <Link
                  key={transaction.id}
                  href={`/escrow/${transaction.id}`}
                  className="block rounded-2xl border border-white/10 bg-[#111827] p-6 transition hover:border-indigo-500"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2 className="break-all text-2xl font-semibold">
                        {transaction.listing_id ??
                          "Marketplace Transaction"}
                      </h2>

                      <p className="mt-2 break-all text-gray-400">
                        Buyer:{" "}
                        {transaction.buyer_id ??
                          "Unknown"}
                      </p>

                      <p className="break-all text-gray-400">
                        Seller:{" "}
                        {transaction.seller_id ??
                          "Unknown"}
                      </p>

                      <p className="mt-2 break-all text-sm text-gray-500">
                        Transaction ID:{" "}
                        {transaction.id}
                      </p>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-3xl font-bold text-indigo-400">
                        {formatAmount(
                          transaction.amount
                        )}
                      </p>

                      <span className="mt-2 inline-block rounded-full bg-indigo-500/20 px-4 py-2 text-sm text-indigo-300">
                        {transaction.status ??
                          "pending"}
                      </span>

                      <p className="mt-2 text-sm text-gray-500">
                        Escrow Fee: 15% (7.5% Buyer +
                        7.5% Seller)
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        ) : null}
      </div>
    </main>
  );
}