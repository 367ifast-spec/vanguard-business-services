import Link from "next/link";

export default async function DisputeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Link
          href="/disputes"
          className="text-indigo-400"
        >
          ← Back to Disputes
        </Link>

        <h1 className="mt-6 text-5xl font-bold">
          Dispute #{id}
        </h1>

        {/* Details */}
        <div className="mt-10 rounded-3xl bg-[#111827] p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-semibold">
                Listing
              </h2>

              <p className="mt-2 text-gray-400">
                AI SaaS Startup
              </p>
            </div>

            <div>
              <h2 className="font-semibold">
                Status
              </h2>

              <span className="mt-2 inline-block rounded-full bg-yellow-500/20 px-4 py-2 text-yellow-300">
                Under Review
              </span>
            </div>

            <div>
              <h2 className="font-semibold">
                Buyer
              </h2>

              <p className="mt-2 text-gray-400">
                john_doe
              </p>
            </div>

            <div>
              <h2 className="font-semibold">
                Seller
              </h2>

              <p className="mt-2 text-gray-400">
                agency_pro
              </p>
            </div>

            <div>
              <h2 className="font-semibold">
                Transaction ID
              </h2>

              <p className="mt-2 text-gray-400">
                #1001
              </p>
            </div>

            <div>
              <h2 className="font-semibold">
                Opened On
              </h2>

              <p className="mt-2 text-gray-400">
                July 22, 2026
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 rounded-3xl bg-[#111827] p-8">
          <h2 className="text-3xl font-bold">
            Dispute Description
          </h2>

          <p className="mt-4 text-gray-400 leading-7">
            The buyer claims that the delivered
            digital asset does not match the
            description provided in the original
            listing. The case is currently under
            review by the Vanguard Marketplace
            support team.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-10 rounded-3xl bg-[#111827] p-8">
          <h2 className="text-3xl font-bold">
            Timeline
          </h2>

          <div className="mt-6 space-y-4">
            <div>
              <p className="font-semibold text-green-400">
                ✓ Dispute Opened
              </p>

              <p className="text-gray-500">
                Buyer submitted dispute.
              </p>
            </div>

            <div>
              <p className="font-semibold text-yellow-400">
                • Under Review
              </p>

              <p className="text-gray-500">
                Support team reviewing evidence.
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-500">
                • Resolution Pending
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold">
            Upload Evidence
          </button>

          <button className="rounded-xl border border-white/20 px-6 py-3">
            Contact Support
          </button>

          <button className="rounded-xl border border-white/20 px-6 py-3">
            Close Dispute
          </button>
        </div>
      </div>
    </main>
  );
}