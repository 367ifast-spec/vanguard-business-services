import Link from "next/link";

export default async function SellerProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const listings = [
    {
      id: 1,
      title: "AI SaaS Platform",
      price: "$5,000",
    },
    {
      id: 2,
      title: "Finance Blog",
      price: "$2,500",
    },
    {
      id: 3,
      title: "Marketing Agency",
      price: "$12,000",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Back */}
        <Link
          href="/marketplace"
          className="text-indigo-400 hover:text-indigo-300"
        >
          ← Back to Marketplace
        </Link>

        {/* Profile Header */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-4xl font-bold">
              {username.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-5xl font-bold">
                  {username.replaceAll("-", " ")}
                </h1>

                <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400">
                  Verified Seller
                </span>
              </div>

              <p className="mt-4 text-lg text-gray-400">
                Trusted digital entrepreneur and marketplace seller.
              </p>

              <div className="mt-6 flex flex-wrap gap-6">
                <div>
                  <p className="text-3xl font-bold">4.9</p>
                  <p className="text-gray-400">Rating</p>
                </div>

                <div>
                  <p className="text-3xl font-bold">25</p>
                  <p className="text-gray-400">Sales</p>
                </div>

                <div>
                  <p className="text-3xl font-bold">2026</p>
                  <p className="text-gray-400">Member Since</p>
                </div>
              </div>
            </div>

            <div>
              <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700">
                Contact Seller
              </button>
            </div>
          </div>
        </div>

        {/* Seller Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-6">
            <h2 className="text-3xl font-bold">25</h2>
            <p className="text-gray-400">Completed Sales</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <h2 className="text-3xl font-bold">98%</h2>
            <p className="text-gray-400">Positive Feedback</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <h2 className="text-3xl font-bold">12</h2>
            <p className="text-gray-400">Active Listings</p>
          </div>
        </div>

        {/* Listings */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold">
            Seller Listings
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="rounded-2xl border border-white/10 bg-[#111827] p-6"
              >
                <div className="h-44 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600" />

                <h3 className="mt-6 text-2xl font-semibold">
                  {listing.title}
                </h3>

                <p className="mt-3 text-3xl font-bold text-indigo-400">
                  {listing.price}
                </p>

                <Link
                  href={`/listing/${listing.title
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 font-semibold"
                >
                  View Listing
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold">
            Recent Reviews
          </h2>

          <div className="mt-8 space-y-6">
            <div className="rounded-2xl bg-white/5 p-6">
              <p className="text-yellow-400">
                ★★★★★
              </p>

              <p className="mt-3 text-gray-300">
                Great seller. Smooth transaction and
                excellent communication.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                — marketplace_buyer
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-6">
              <p className="text-yellow-400">
                ★★★★★
              </p>

              <p className="mt-3 text-gray-300">
                Delivered everything as promised.
                Highly recommended.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                — verified_client
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}