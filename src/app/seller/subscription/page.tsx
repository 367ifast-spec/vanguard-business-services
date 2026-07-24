export default function SellerSubscriptionPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Seller Subscription
        </h1>

        <p className="mt-4 text-gray-400">
          Manage your marketplace subscription and
          package limits.
        </p>

        <div className="mt-10 rounded-3xl bg-[#111827] p-8">
          <h2 className="text-2xl font-bold">
            Current Package
          </h2>

          <div className="mt-6 space-y-3 text-gray-300">
            <p>Package: FREE</p>
            <p>Used Listings: 0</p>
            <p>Remaining Listings: 15</p>
            <p>Status: Active</p>
          </div>

          <button className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold">
            Upgrade Package
          </button>
        </div>
      </div>
    </main>
  );
}