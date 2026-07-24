import Link from "next/link";
import { getEscrows } from "@/lib/escrow";

export default async function EscrowPage() {
  const transactions = (await getEscrows()) || [];

  console.log("ESCROW DATA:", transactions);

  const funded = transactions.filter(
    (t: any) => t.status === "funded"
  ).length;

  const pending = transactions.filter(
    (t: any) => t.status === "pending"
  ).length;

  const disputed = transactions.filter(
    (t: any) => t.status === "disputed"
  ).length;

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Escrow Dashboard
        </h1>

        <p className="mt-4 text-gray-400">
          Manage secure marketplace transactions.
        </p>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-white/5 p-6">
            <h2 className="text-3xl font-bold">
              {transactions.length}
            </h2>

            <p className="text-gray-400">
              Active Deals
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

        {/* Transactions */}
        <div className="mt-10 space-y-6">
          {transactions.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-8">
              <p className="text-gray-400">
                No escrow transactions found.
              </p>
            </div>
          ) : (
            transactions.map((transaction: any) => (
              <Link
                key={transaction.id}
                href={`/escrow/${transaction.id}`}
                className="block rounded-2xl border border-white/10 bg-[#111827] p-6 transition hover:border-indigo-500"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {transaction.listing_id}
                    </h2>

                    <p className="mt-2 text-gray-400">
                      Buyer: {transaction.buyer_id}
                    </p>

                    <p className="text-gray-400">
                      Seller: {transaction.seller_id}
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold text-indigo-400">
                      ${transaction.amount}
                    </p>

                    <span className="mt-2 inline-block rounded-full bg-indigo-500/20 px-4 py-2 text-sm text-indigo-300">
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}