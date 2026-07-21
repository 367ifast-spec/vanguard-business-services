import Link from "next/link";
import { getPendingMarketplaceListings } from "@/lib/marketplace";

export default async function AdminMarketplacePage() {
  const pendingListings =
    (await getPendingMarketplaceListings()) || [];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          Marketplace Management
        </h1>

        <p className="mt-2 text-gray-500">
          Review and manage marketplace listings.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl border p-6">
          <h2 className="text-3xl font-bold">
            {pendingListings.length}
          </h2>
          <p className="text-gray-500">Pending</p>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-3xl font-bold">0</h2>
          <p className="text-gray-500">Approved</p>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-3xl font-bold">0</h2>
          <p className="text-gray-500">Rejected</p>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-3xl font-bold">$0</h2>
          <p className="text-gray-500">Volume</p>
        </div>
      </div>

      {/* Pending Listings */}
      <div className="rounded-2xl border p-8">
        <h2 className="mb-6 text-2xl font-bold">
          Pending Listings
        </h2>

        {pendingListings.length === 0 ? (
          <div className="rounded-xl border p-6 text-gray-500">
            No pending marketplace listings found.
          </div>
        ) : (
          <div className="space-y-4">
            {pendingListings.map((listing: any) => (
              <div
                key={listing.id}
                className="flex flex-col gap-4 rounded-xl border p-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {listing.title}
                  </h3>

                  <p className="text-gray-500">
                    Status: {listing.status}
                  </p>

                  <p className="font-medium">
                    ${listing.price}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="rounded-xl bg-green-600 px-4 py-2 text-white">
                    Approve
                  </button>

                  <button className="rounded-xl bg-red-600 px-4 py-2 text-white">
                    Reject
                  </button>

                  <Link
                    href={`/admin/marketplace/${listing.id}`}
                    className="rounded-xl border px-4 py-2"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Listings */}
      <div className="rounded-2xl border p-8">
        <h2 className="mb-6 text-2xl font-bold">
          Approved Listings
        </h2>

        <div className="rounded-xl border p-5 text-gray-500">
          Approved listings will appear here.
        </div>
      </div>
    </div>
  );
}