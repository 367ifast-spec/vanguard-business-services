import Link from "next/link";

import DisputeResolutionActions from "@/components/admin/DisputeResolutionActions";
import { supabaseAdmin } from "@/lib/supabase";

type DisputeTransaction = {
  id: string;
  buyer_id: string;
  seller_id: string;
  listing_id: string;
  amount: number | string;
  buyer_fee: number | string;
  seller_fee: number | string;
  total_fee: number | string;
  status: string;
  disputed_at: string | null;
  created_at: string;
};

export default async function AdminDisputesPage() {
  if (!supabaseAdmin) {
    return (
      <main className="min-h-screen bg-[#0B1020] p-6 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold">
            Dispute Management
          </h1>

          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
            <h2 className="text-xl font-semibold text-red-300">
              Supabase Configuration Error
            </h2>

            <p className="mt-2 text-gray-400">
              Admin database access is unavailable.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const { data, error } = await supabaseAdmin
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
        disputed_at,
        created_at
      `
    )
    .eq("status", "disputed")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("ADMIN DISPUTES LOAD ERROR:", error);
  }

  const disputes = (data ?? []) as DisputeTransaction[];

  return (
    <main className="min-h-screen bg-[#0B1020] p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold">
          Dispute Management
        </h1>

        <p className="mt-4 text-gray-400">
          Review marketplace escrow disputes.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#111827] p-6">
          <p className="text-sm text-gray-400">
            Open Disputes
          </p>

          <p className="mt-1 text-3xl font-bold">
            {disputes.length}
          </p>
        </div>

        {error ? (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
            <h2 className="text-xl font-semibold text-red-300">
              Unable to load disputes
            </h2>

            <p className="mt-2 text-gray-400">
              Check the server console for the database error.
            </p>
          </div>
        ) : disputes.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#111827] p-8">
            <h2 className="text-2xl font-semibold">
              No open disputes
            </h2>

            <p className="mt-2 text-gray-400">
              There are currently no disputed escrow transactions.
            </p>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#111827]">
            <table className="w-full min-w-[1100px]">
              <thead className="border-b border-white/10 bg-white/[0.02]">
                <tr>
                  <th className="p-5 text-left">
                    Transaction
                  </th>

                  <th className="p-5 text-left">
                    Buyer
                  </th>

                  <th className="p-5 text-left">
                    Seller
                  </th>

                  <th className="p-5 text-left">
                    Amount
                  </th>

                  <th className="p-5 text-left">
                    Status
                  </th>

                  <th className="p-5 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {disputes.map((dispute) => {
                  const amount = Number(dispute.amount ?? 0);

                  const safeAmount = Number.isFinite(amount)
                    ? amount
                    : 0;

                  const totalFee = Number(dispute.total_fee ?? 0);

                  const safeTotalFee = Number.isFinite(totalFee)
                    ? totalFee
                    : 0;

                  return (
                    <tr
                      key={dispute.id}
                      className="border-b border-white/5 last:border-b-0"
                    >
                      <td className="p-5">
                        <p className="max-w-[220px] break-all font-mono text-sm">
                          {dispute.id}
                        </p>

                        <p className="mt-2 max-w-[220px] break-all text-xs text-gray-500">
                          Listing: {dispute.listing_id}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {dispute.disputed_at
                            ? `Disputed: ${new Date(
                                dispute.disputed_at
                              ).toLocaleString()}`
                            : "Disputed timestamp unavailable"}
                        </p>
                      </td>

                      <td className="p-5">
                        <p className="max-w-[190px] break-all text-sm">
                          {dispute.buyer_id}
                        </p>
                      </td>

                      <td className="p-5">
                        <p className="max-w-[190px] break-all text-sm">
                          {dispute.seller_id}
                        </p>
                      </td>

                      <td className="p-5">
                        <p className="text-xl font-bold text-indigo-400">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(safeAmount)}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Fee: ${safeTotalFee.toFixed(2)}
                        </p>
                      </td>

                      <td className="p-5">
                        <span className="inline-block rounded-full bg-red-500/15 px-3 py-2 text-sm font-semibold text-red-300">
                          {dispute.status}
                        </span>
                      </td>

                      <td className="p-5">
                        <div className="flex min-w-[170px] flex-col gap-2">
                          <Link
                            href={`/escrow/${dispute.id}`}
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold transition hover:bg-indigo-500"
                          >
                            View Transaction
                          </Link>

                          <DisputeResolutionActions
                            escrowId={dispute.id}
                          />
                        </div>
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