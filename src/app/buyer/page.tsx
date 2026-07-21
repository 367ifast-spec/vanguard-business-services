import Link from "next/link";

const purchases = [
  {
    id: "1001",
    title: "AI SaaS Startup",
    price: "$5,000",
    status: "Completed",
  },
  {
    id: "1002",
    title: "Finance Blog",
    price: "$2,500",
    status: "In Escrow",
  },
];

const savedListings = [
  "Marketing Agency",
  "Premium Domain",
  "E-commerce Store",
];

export default function BuyerDashboardPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold">
            Buyer Dashboard
          </h1>

          <p className="mt-4 text-gray-400">
            Manage your purchases, saved listings,
            messages, and escrow transactions.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-4xl font-bold">2</h2>
            <p className="mt-2 text-gray-400">
              Purchases
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-4xl font-bold">3</h2>
            <p className="mt-2 text-gray-400">
              Saved Listings
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-4xl font-bold">1</h2>
            <p className="mt-2 text-gray-400">
              Active Escrows
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-4xl font-bold">4</h2>
            <p className="mt-2 text-gray-400">
              Notifications
            </p>
          </div>
        </div>

        {/* Purchases */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold">
            My Purchases
          </h2>

          <div className="mt-6 space-y-4">
            {purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="rounded-2xl bg-[#111827] p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold">
                      {purchase.title}
                    </h3>

                    <p className="mt-2 text-gray-400">
                      Transaction ID: {purchase.id}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-indigo-400">
                      {purchase.price}
                    </p>

                    <p className="mt-2 text-gray-400">
                      {purchase.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Listings */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold">
            Saved Listings
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {savedListings.map((listing) => (
              <div
                key={listing}
                className="rounded-2xl bg-[#111827] p-6"
              >
                <h3 className="text-xl font-semibold">
                  {listing}
                </h3>

                <Link
                  href={`/listing/${listing
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  className="mt-4 inline-flex text-indigo-400"
                >
                  View Listing →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold">
            Quick Actions
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Link
              href="/messages"
              className="rounded-2xl bg-[#111827] p-6 text-center transition hover:bg-[#1F2937]"
            >
              Messages
            </Link>

            <Link
              href="/notifications"
              className="rounded-2xl bg-[#111827] p-6 text-center transition hover:bg-[#1F2937]"
            >
              Notifications
            </Link>

            <Link
              href="/escrow"
              className="rounded-2xl bg-[#111827] p-6 text-center transition hover:bg-[#1F2937]"
            >
              Escrow
            </Link>

            <Link
              href="/marketplace"
              className="rounded-2xl bg-[#111827] p-6 text-center transition hover:bg-[#1F2937]"
            >
              Marketplace
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}