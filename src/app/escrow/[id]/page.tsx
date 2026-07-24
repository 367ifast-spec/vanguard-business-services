import Link from "next/link";
import { getEscrows } from "@/lib/escrow";
import EscrowActions from "@/components/EscrowActions";

export default async function EscrowDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const transactions = await getEscrows();

  const transaction = transactions.find(
    (item: any) => item.id === id
  );

  if (!transaction) {
    return (
      <main className="min-h-screen bg-[#0B1020] p-10 text-white">
        <h1 className="text-4xl font-bold">
          Transaction Not Found
        </h1>

        <Link
          href="/escrow"
          className="mt-6 inline-block text-indigo-400"
        >
          ← Back to Escrow Dashboard
        </Link>
      </main>
    );
  }

  const buyerFee = transaction.amount * 0.075;
  const sellerFee = transaction.amount * 0.075;
  const totalFees = buyerFee + sellerFee;

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
              <p className="text-gray-400">Transaction ID</p>
              <h2 className="font-mono text-lg">
                {transaction.id}
              </h2>
            </div>

            <div>
              <p className="text-gray-400">Listing</p>
              <h2 className="text-2xl font-bold">
                {transaction.listing_id}
              </h2>
            </div>

            <div>
              <p className="text-gray-400">Buyer</p>
              <p>{transaction.buyer_id}</p>
            </div>

            <div>
              <p className="text-gray-400">Seller</p>
              <p>{transaction.seller_id}</p>
            </div>

            <div>
              <p className="text-gray-400">Amount</p>
              <p className="text-3xl font-bold text-indigo-400">
                ${transaction.amount}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Escrow Fees</p>
              <p>
                Buyer Fee: ${buyerFee.toFixed(2)}
              </p>
              <p>
                Seller Fee: ${sellerFee.toFixed(2)}
              </p>
              <p className="font-semibold text-indigo-300">
                Total Fees: ${totalFees.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Status</p>

              <span className="inline-block rounded-full bg-indigo-500/20 px-4 py-2 text-indigo-300">
                {transaction.status}
              </span>
            </div>

            <div>
              <p className="text-gray-400">Created At</p>

              <p>
                {new Date(
                  transaction.created_at
                ).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <h2 className="mb-4 text-2xl font-semibold">
              Actions
            </h2>

            <EscrowActions id={transaction.id} />
          </div>
        </div>
      </div>
    </main>
  );
}