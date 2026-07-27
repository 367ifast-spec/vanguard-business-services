import Link from "next/link";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

type EscrowTransaction = {
  id: string;
  buyer_id: string;
  seller_id: string;
  listing_id: string;
  amount: number | string;
  buyer_fee: number | string;
  seller_fee: number | string;
  total_fee: number | string;
  status: string;
  created_at: string;
};

export default async function AdminEscrowPage() {
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
            // Cookie writes may not be available
            // during Server Component rendering.
          }
        },
      },
    }
  );

  const { data, error } = await supabase
    .from("escrow_transactions")
    .select(
      `
        id,
        buyer_id,
        seller_id,
        listing_id,
        amount,
        buyer_fee,
        seller_fee,
        total_fee,
        status,
        created_at
      `
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "ADMIN ESCROW LOAD ERROR:",
      error
    );
  }

  const escrows =
    (data ?? []) as EscrowTransaction[];

  const totalEscrows = escrows.length;

  const fundedEscrows = escrows.filter(
    (escrow) => escrow.status === "funded"
  ).length;

  const disputedEscrows = escrows.filter(
    (escrow) => escrow.status === "disputed"
  ).length;

  const completedEscrows = escrows.filter(
    (escrow) =>
      escrow.status === "completed" ||
      escrow.status === "released"
  ).length;

  return (
    <main className="min-h-screen bg-[#0B1020] p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold">
          Escrow Management
        </h1>

        <p className="mt-4 text-gray-400">
          Manage marketplace escrow transactions.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <p className="text-sm text-gray-400">
              Total Escrows
            </p>

            <p className="mt-2 text-3xl font-bold">
              {totalEscrows}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <p className="text-sm text-gray-400">
              Funded
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-400">
              {fundedEscrows}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <p className="text-sm text-gray-400">
              Disputed
            </p>

            <p className="mt-2 text-3xl font-bold text-red-400">
              {disputedEscrows}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <p className="text-sm text-gray-400">
              Completed / Released
            </p>

            <p className="mt-2 text-3xl font-bold text-green-400">
              {completedEscrows}
            </p>
          </div>
        </div>

        {error ? (
          <div className="mt-10 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
            <p className="font-semibold text-red-300">
              Failed to load escrow transactions.
            </p>
          </div>
        ) : escrows.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-[#111827] p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Escrow Transactions
            </h2>

            <p className="mt-2 text-gray-400">
              Marketplace escrow transactions will
              appear here.
            </p>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-3xl border border-white/10 bg-[#111827]">
            <table className="w-full min-w-[1000px]">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="p-6 text-left">
                    Transaction
                  </th>

                  <th className="p-6 text-left">
                    Buyer
                  </th>

                  <th className="p-6 text-left">
                    Seller
                  </th>

                  <th className="p-6 text-left">
                    Amount
                  </th>

                  <th className="p-6 text-left">
                    Fees
                  </th>

                  <th className="p-6 text-left">
                    Status
                  </th>

                  <th className="p-6 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {escrows.map((escrow) => {
                  const amount = Number(
                    escrow.amount ?? 0
                  );

                  const totalFee = Number(
                    escrow.total_fee ?? 0
                  );

                  return (
                    <tr
                      key={escrow.id}
                      className="border-b border-white/5 last:border-b-0"
                    >
                      <td className="p-6">
                        <p className="max-w-[220px] break-all font-mono text-sm">
                          {escrow.id}
                        </p>

                        <p className="mt-2 max-w-[220px] break-all text-xs text-gray-500">
                          Listing:{" "}
                          {escrow.listing_id}
                        </p>
                      </td>

                      <td className="p-6">
                        <p className="max-w-[190px] break-all text-sm">
                          {escrow.buyer_id}
                        </p>
                      </td>

                      <td className="p-6">
                        <p className="max-w-[190px] break-all text-sm">
                          {escrow.seller_id}
                        </p>
                      </td>

                      <td className="p-6">
                        <p className="text-xl font-bold text-indigo-400">
                          {new Intl.NumberFormat(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            }
                          ).format(
                            Number.isFinite(amount)
                              ? amount
                              : 0
                          )}
                        </p>
                      </td>

                      <td className="p-6">
                        <p className="text-sm text-gray-300">
                          {new Intl.NumberFormat(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            }
                          ).format(
                            Number.isFinite(totalFee)
                              ? totalFee
                              : 0
                          )}
                        </p>
                      </td>

                      <td className="p-6">
                        <span className="inline-block rounded-full bg-indigo-500/20 px-4 py-2 text-sm text-indigo-300">
                          {escrow.status}
                        </span>
                      </td>

                      <td className="p-6">
                        <Link
                          href={`/escrow/${escrow.id}`}
                          className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold transition hover:bg-indigo-500"
                        >
                          View Transaction
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}