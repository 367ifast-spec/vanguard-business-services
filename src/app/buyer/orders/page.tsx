"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

type BuyerOrder = {
  id: string;
  listing_id: string | null;
  buyer_id: string | null;
  seller_id: string | null;
  amount: number | string | null;
  status: string | null;
  created_at: string | null;
};

export default function BuyerOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<BuyerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadOrders() {
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
            "BUYER ORDERS AUTH ERROR:",
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

        const { data, error } = await supabase
          .from("escrow_transactions")
          .select(
            "id, listing_id, buyer_id, seller_id, amount, status, created_at"
          )
          .eq("buyer_id", user.id)
          .order("created_at", {
            ascending: false,
          });

        if (!active) {
          return;
        }

        if (error) {
          console.error(
            "BUYER ORDERS LOAD ERROR:",
            error
          );

          setMessage(
            `Failed to load purchases: ${error.message}`
          );

          return;
        }

        setOrders((data ?? []) as BuyerOrder[]);
      } catch (error) {
        console.error(
          "BUYER ORDERS UNEXPECTED ERROR:",
          error
        );

        if (!active) {
          return;
        }

        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to load buyer purchases."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      active = false;
    };
  }, [router]);

  function formatAmount(
    amount: BuyerOrder["amount"]
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

  function formatDate(date: string | null) {
    if (!date) {
      return "Unknown";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Unknown";
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  }

  function statusClasses(status: string | null) {
    const normalizedStatus =
      status?.toLowerCase() ?? "";

    if (
      normalizedStatus === "completed" ||
      normalizedStatus === "released"
    ) {
      return "border-green-500/30 bg-green-500/10 text-green-300";
    }

    if (normalizedStatus === "disputed") {
      return "border-red-500/30 bg-red-500/10 text-red-300";
    }

    if (
      normalizedStatus === "funded" ||
      normalizedStatus === "paid"
    ) {
      return "border-blue-500/30 bg-blue-500/10 text-blue-300";
    }

    return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
  }

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-400">
              Vanguard Marketplace
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              My Purchases
            </h1>

            <p className="mt-3 text-gray-400">
              Track your marketplace purchases and
              protected transactions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/buyer/dashboard"
              className="rounded-xl border border-white/10 px-5 py-3 font-semibold transition hover:bg-white/5"
            >
              Buyer Dashboard
            </Link>

            <Link
              href="/marketplace"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-700"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-[#111827] p-6 md:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Purchase History
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Transactions made through Vanguard
                Marketplace escrow.
              </p>
            </div>

            {!loading ? (
              <p className="text-sm text-gray-400">
                {orders.length}{" "}
                {orders.length === 1
                  ? "transaction"
                  : "transactions"}
              </p>
            ) : null}
          </div>

          {message ? (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {message}
            </div>
          ) : null}

          {loading ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-gray-400">
              Loading purchases...
            </div>
          ) : null}

          {!loading &&
          !message &&
          orders.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
              <h3 className="text-xl font-bold">
                No purchases yet
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-gray-400">
                Your marketplace purchases will appear
                here after you start a protected
                transaction.
              </p>

              <Link
                href="/marketplace"
                className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700"
              >
                Browse Marketplace
              </Link>
            </div>
          ) : null}

          {!loading && orders.length > 0 ? (
            <div className="mt-8 space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold">
                          Transaction
                        </h3>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClasses(
                            order.status
                          )}`}
                        >
                          {order.status ?? "pending"}
                        </span>
                      </div>

                      <p className="mt-3 break-all text-sm text-gray-400">
                        Transaction ID: {order.id}
                      </p>

                      {order.listing_id ? (
                        <p className="mt-1 break-all text-sm text-gray-500">
                          Listing ID:{" "}
                          {order.listing_id}
                        </p>
                      ) : null}

                      <p className="mt-1 text-sm text-gray-500">
                        Created:{" "}
                        {formatDate(order.created_at)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="sm:text-right">
                        <p className="text-sm text-gray-400">
                          Amount
                        </p>

                        <p className="mt-1 text-2xl font-bold text-indigo-400">
                          {formatAmount(order.amount)}
                        </p>
                      </div>

                      <Link
                        href={`/buyer/orders/${order.id}`}
                        className="rounded-xl bg-indigo-600 px-6 py-3 text-center font-semibold transition hover:bg-indigo-700"
                      >
                        View Transaction
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
          <h3 className="font-bold">
            Escrow Protection
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Keep communication and payments on Vanguard
            Marketplace. Transaction status and escrow
            actions will be available from your purchase
            details.
          </p>
        </div>
      </div>
    </main>
  );
}