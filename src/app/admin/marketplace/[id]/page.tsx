import Link from "next/link";

import {
  approveListingAction,
  rejectListingAction,
} from "../actions";

import {
  getMarketplaceListingById,
} from "@/lib/marketplace";
export default async function AdminMarketplaceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const listing =
    await getMarketplaceListingById(id);

  if (!listing) {
    return <div>Listing not found.</div>;
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/marketplace"
          className="text-indigo-600"
        >
          ← Back to Marketplace
        </Link>

        <h1 className="mt-4 text-4xl font-bold">
          Listing Details
        </h1>

        <p className="mt-2 text-gray-500">
          Review marketplace listing before approval.
        </p>
      </div>

      {/* Listing Card */}
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Image Placeholder */}
          <div className="h-72 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 lg:w-96" />

          {/* Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-3xl font-bold">
              {listing.title}
              </h2>

              <p className="mt-2 text-gray-500">
  Status: {listing.status}
</p>
            </div>

            <div>
              <h3 className="font-semibold">Price</h3>
              <p>${listing.price}</p>
            </div>

            <div>
              <h3 className="font-semibold">Category</h3>
              <p>{listing.category ?? "N/A"}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                Monthly Revenue
              </h3>
              <p>{listing.revenue ?? "N/A"}</p>
            </div>

            <div>
              <h3 className="font-semibold">
                Monthly Traffic
              </h3>
              <p>25,000 Visitors</p>
            </div>

            <div>
              <h3 className="font-semibold">
                Website URL
              </h3>

              <p>{listing.website_url ?? "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">
          Description
        </h2>

        <p className="mt-4 leading-7 text-gray-600">
  {listing.description}
</p>
      </div>

    {/* Actions */}
<div className="flex flex-wrap gap-4">
  <form
    action={async () => {
      "use server";
      await approveListingAction(id);
    }}
  >
    <button
      type="submit"
      className="rounded-xl bg-green-600 px-6 py-3 text-white"
    >
      Approve Listing
    </button>
  </form>

  <form
    action={async () => {
      "use server";
      await rejectListingAction(id);
    }}
  >
    <button
      type="submit"
      className="rounded-xl bg-red-600 px-6 py-3 text-white"
    >
      Reject Listing
    </button>
  </form>

  <Link
    href="/admin/marketplace"
    className="rounded-xl border px-6 py-3"
  >
    Cancel
  </Link>
</div>
    </div>
  );
}