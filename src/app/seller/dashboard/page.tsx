import Link from "next/link";

export default function SellerDashboardPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">Seller Dashboard</h1>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-white/5 p-6">
            <h3 className="text-3xl font-bold">12</h3>
            <p className="text-gray-400">Listings</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <h3 className="text-3xl font-bold">3</h3>
            <p className="text-gray-400">Sales</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <h3 className="text-3xl font-bold">$4,200</h3>
            <p className="text-gray-400">Revenue</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <h3 className="text-3xl font-bold">4.9</h3>
            <p className="text-gray-400">Rating</p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-white/5 p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Listings</h2>

            <button className="rounded-xl bg-indigo-600 px-5 py-3">
              + Create Listing
            </button>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl bg-[#111827] p-5">
              <h3 className="font-semibold">AI SaaS Startup</h3>
              <p className="text-gray-400">$8,900</p>
            </div>

            <div className="rounded-xl bg-[#111827] p-5">
              <h3 className="font-semibold">Marketing Agency</h3>
              <p className="text-gray-400">$12,000</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/marketplace" className="text-indigo-400">
            Back to Marketplace
          </Link>
        </div>
      </div>
    </main>
  );
}