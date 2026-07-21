import Link from "next/link";

const transactions = [
  {
    id: "1001",
    title: "AI SaaS Startup",
    buyer: "john_doe",
    seller: "agency_pro",
    amount: "$5,000",
    status: "Pending Payment",
  },
  {
    id: "1002",
    title: "Finance Blog",
    buyer: "market_buyer",
    seller: "vanguard",
    amount: "$2,500",
    status: "Asset Transfer Started",
  },
  {
    id: "1003",
    title: "Marketing Agency",
    buyer: "client_pro",
    seller: "john_doe",
    amount: "$12,000",
    status: "Completed",
  },
];

export default function EscrowPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Escrow Dashboard
        </h1>

        <p className="mt-4 text-gray-400">
          Manage secure marketplace transactions.
        </p>

        <div className="mt-10 space-y-6">
          {transactions.map((transaction) => (
            <Link
              key={transaction.id}
              href={`/escrow/${transaction.id}`}
              className="block rounded-2xl border border-white/10 bg-[#111827] p-6 transition hover:border-indigo-500"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {transaction.title}
                  </h2>

                  <p className="mt-2 text-gray-400">
                    Buyer: {transaction.buyer}
                  </p>

                  <p className="text-gray-400">
                    Seller: {transaction.seller}
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-indigo-400">
                    {transaction.amount}
                  </p>

                  <span className="mt-2 inline-block rounded-full bg-indigo-500/20 px-4 py-2 text-sm text-indigo-300">
                    {transaction.status}
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