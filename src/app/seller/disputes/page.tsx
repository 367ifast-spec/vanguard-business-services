import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";

type EscrowDispute = {
  id: string;
  listing_id: string | null;
  buyer_id: string | null;
  seller_id: string | null;
  amount: number | string | null;
  status: string | null;
  disputed_at: string | null;
  created_at: string | null;
};

export default async function SellerDisputesPage() {
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
      "id, listing_id, buyer_id, seller_id, amount, status, disputed_at, created_at"
    )
    .eq("seller_id", user.id)
    .eq("status", "disputed")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("SELLER DISPUTES LOAD ERROR:", error);
  }

  const disputes = (data ?? []) as EscrowDispute[];

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Link
          href="/seller/dashboard"
          className="text-indigo-400"
        >
          ← Back to Seller Dashboard
        </Link>

        <div className="mt-6">
          <h1 className="text-5xl font-bold">
            Disputes
          </h1>

          <p className="mt-3 text-gray-400">
            Review disputed marketplace escrow transactions.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#111827] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">
                Open Disputes
              </p>

              <p className="mt-1 text-3xl font-bold">
                {disputes.length}
              </p>
            </div>

            <div className="rounded-full bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-300">
              Seller Disputes
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {error ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
              <h2 className="text-xl font-semibold text-red-300">
                Unable to load disputes
              </h2>

              <p className="mt-2 text-gray-400">
                Please try again later.
              </p>
            </div>
          ) : disputes.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-8">
              <h2 className="text-2xl font-semibold">
                No disputes found
              </h2>

              <p className="mt-2 text-gray-400">
                You currently have no disputed escrow transactions.
              </p>
            </div>
          ) : (
            disputes.map((dispute) => {
              const amount = Number(dispute.amount ?? 0);

              const safeAmount = Number.isFinite(amount)
                ? amount
                : 0;

              return (
                <Link
                  key={dispute.id}
                  href={`/escrow/${dispute.id}`}
                  className="block rounded-2xl border border-white/10 bg-[#111827] p-6 transition hover:border-red-400/40"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm text-gray-400">
                        Listing
                      </p>

                      <h2 className="mt-1 break-all text-xl font-bold">
                        {dispute.listing_id ??
                          "Marketplace Transaction"}
                      </h2>

                      <p className="mt-4 break-all text-sm text-gray-400">
                        Buyer:{" "}
                        {dispute.buyer_id ?? "Unknown"}
                      </p>

                      <p className="mt-1 break-all text-sm text-gray-500">
                        Transaction ID: {dispute.id}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Disputed:{" "}
                        {dispute.disputed_at
                          ? new Date(
                              dispute.disputed_at
                            ).toLocaleString()
                          : "Unknown"}
                      </p>
                    </div>

                    <div className="md:text-right">
                      <p className="text-3xl font-bold text-indigo-400">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(safeAmount)}
                      </p>

                      <span className="mt-3 inline-block rounded-full bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-300">
                        disputed
                      </span>

                      <p className="mt-3 text-sm text-indigo-300">
                        View Transaction →
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}