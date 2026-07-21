import Link from "next/link";

export default async function EscrowDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
          Transaction #{id}
        </h1>

        {/* Transaction Card */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold">
                Listing
              </h2>

              <p className="mt-2 text-gray-400">
                AI SaaS Startup
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Amount
              </h2>

              <p className="mt-2 text-indigo-400 text-3xl font-bold">
                $5,000
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Buyer
              </h2>

              <p className="mt-2 text-gray-400">
                john_doe
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Seller
              </h2>

              <p className="mt-2 text-gray-400">
                agency_pro
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Status
              </h2>

              <span className="mt-2 inline-block rounded-full bg-yellow-500/20 px-4 py-2 text-yellow-300">
                Pending Payment
              </span>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Created
              </h2>

              <p className="mt-2 text-gray-400">
                July 21, 2026
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <h2 className="text-3xl font-bold">
            Transaction Timeline
          </h2>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="font-semibold text-green-400">
                ✓ Escrow Created
              </h3>

              <p className="text-gray-400">
                Transaction initialized successfully.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-yellow-400">
                • Waiting for Payment
              </h3>

              <p className="text-gray-400">
                Buyer needs to complete payment.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500">
                • Asset Transfer
              </h3>

              <p className="text-gray-500">
                Waiting for seller action.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500">
                • Buyer Confirmation
              </h3>

              <p className="text-gray-500">
                Pending.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500">
                • Funds Released
              </h3>

              <p className="text-gray-500">
                Pending.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold">
            Complete Payment
          </button>

          <button className="rounded-xl border border-white/20 px-6 py-3">
            Open Dispute
          </button>

          <button className="rounded-xl border border-white/20 px-6 py-3">
            Contact Support
          </button>
        </div>
      </div>
    </main>
  );
}