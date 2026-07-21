import Link from "next/link";

const disputes = [
  {
    id: "5001",
    title: "AI SaaS Startup",
    status: "Open",
    buyer: "john_doe",
    seller: "agency_pro",
  },
  {
    id: "5002",
    title: "Finance Blog",
    status: "Under Review",
    buyer: "market_buyer",
    seller: "vanguard",
  },
  {
    id: "5003",
    title: "Marketing Agency",
    status: "Resolved",
    buyer: "client_pro",
    seller: "john_doe",
  },
];

export default function DisputesPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Dispute Center
        </h1>

        <p className="mt-4 text-gray-400">
          Manage and track marketplace disputes.
        </p>

        <div className="mt-10 space-y-6">
          {disputes.map((dispute) => (
            <Link
              key={dispute.id}
              href={`/disputes/${dispute.id}`}
              className="block rounded-2xl border border-white/10 bg-[#111827] p-6 transition hover:border-indigo-500"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {dispute.title}
                  </h2>

                  <p className="mt-2 text-gray-400">
                    Buyer: {dispute.buyer}
                  </p>

                  <p className="text-gray-400">
                    Seller: {dispute.seller}
                  </p>
                </div>

                <div>
                  <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm text-red-300">
                    {dispute.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}