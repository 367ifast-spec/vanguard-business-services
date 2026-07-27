import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";

import EscrowActions from "@/components/EscrowActions";

type EscrowTransaction = {
  id: string;
  listing_id: string | null;
  buyer_id: string | null;
  seller_id: string | null;
  amount: number | string | null;
  status: string | null;
  created_at: string | null;
};

type EscrowRole = "buyer" | "seller";

export default async function EscrowDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(
              ({ name, value, options }) => {
                cookieStore.set(name, value, options);
              }
            );
          } catch {
            // Server Components may not always be allowed
            // to write refreshed auth cookies.
          }
        },
      },
    }
  );

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/seller/login");
  }

  const { data, error } = await supabase
    .from("escrow_transactions")
    .select(
      "id, listing_id, buyer_id, seller_id, amount, status, created_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(
      "ESCROW DETAILS LOAD ERROR:",
      error
    );
  }

  const transaction =
    data as EscrowTransaction | null;

  const authorized =
    transaction &&
    (transaction.buyer_id === user.id ||
      transaction.seller_id === user.id);

  if (error || !authorized || !transaction) {
    return (
      <main className="min-h-screen bg-[#0B1020] p-10 text-white">
        <h1 className="text-4xl font-bold">
          Transaction Not Found
        </h1>

        <p className="mt-4 text-gray-400">
          This transaction does not exist or you do not
          have permission to view it.
        </p>

        <Link
          href="/escrow"
          className="mt-6 inline-block text-indigo-400"
        >
          ← Back to Escrow Dashboard
        </Link>
      </main>
    );
  }

  const role: EscrowRole =
    transaction.seller_id === user.id
      ? "seller"
      : "buyer";

  const status =
    transaction.status ?? "pending";

  // TEMP DEBUG:
  // Confirms which account is logged in and
  // which escrow role the page has assigned.
  console.log("ESCROW ROLE DEBUG:", {
    loggedInUserId: user.id,
    buyerId: transaction.buyer_id,
    sellerId: transaction.seller_id,
    role,
    status,
  });

  const amount =
    Number(transaction.amount ?? 0);

  const safeAmount =
    Number.isFinite(amount)
      ? amount
      : 0;

  const buyerFee =
    safeAmount * 0.075;

  const sellerFee =
    safeAmount * 0.075;

  const totalFees =
    buyerFee + sellerFee;

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Link
          href="/escrow"
          className="text-indigo-400"
        >
          ← Back to Escrow Dashboard
        </Link>

        <h1 className="mt-6 text-5xl font-bold">
          Escrow Transaction
        </h1>

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#111827] p-8">
          <div className="space-y-6">
            <div>
              <p className="text-gray-400">
                Transaction ID
              </p>

              <h2 className="break-all font-mono text-lg">
                {transaction.id}
              </h2>
            </div>

            <div>
              <p className="text-gray-400">
                Listing
              </p>

              <h2 className="break-all text-2xl font-bold">
                {transaction.listing_id ??
                  "Marketplace Transaction"}
              </h2>
            </div>

            <div>
              <p className="text-gray-400">
                Buyer
              </p>

              <p className="break-all">
                {transaction.buyer_id ??
                  "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Seller
              </p>

              <p className="break-all">
                {transaction.seller_id ??
                  "Unknown"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Amount
              </p>

              <p className="text-3xl font-bold text-indigo-400">
                {new Intl.NumberFormat(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                ).format(safeAmount)}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Escrow Fees
              </p>

              <p>
                Buyer Fee: $
                {buyerFee.toFixed(2)}
              </p>

              <p>
                Seller Fee: $
                {sellerFee.toFixed(2)}
              </p>

              <p className="font-semibold text-indigo-300">
                Total Fees: $
                {totalFees.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Status
              </p>

              <span className="inline-block rounded-full bg-indigo-500/20 px-4 py-2 text-indigo-300">
                {status}
              </span>
            </div>

            <div>
              <p className="text-gray-400">
                Created At
              </p>

              <p>
                {transaction.created_at
                  ? new Date(
                      transaction.created_at
                    ).toLocaleString()
                  : "Unknown"}
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <h2 className="mb-4 text-2xl font-semibold">
              Actions
            </h2>

            <EscrowActions
              id={transaction.id}
              role={role}
              status={status}
            />
          </div>
        </div>
      </div>
    </main>
  );
}