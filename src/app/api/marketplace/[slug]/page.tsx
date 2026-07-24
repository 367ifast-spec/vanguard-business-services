import { getMarketplaceListingBySlug } from "@/lib/marketplace";
import Link from "next/link";
import BuyNowButton from "@/components/BuyNowButton";
import FavoriteButton from "@/components/FavoriteButton";
export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
const { slug } = await params;

const listing = await getMarketplaceListingBySlug(
  String(slug)
);

if (!listing) {
  return (
    <main className="min-h-screen bg-[#0B1020] p-10 text-white">
      <h1 className="text-4xl font-bold">
        Listing Not Found
      </h1>

      <Link
        href="/marketplace"
        className="mt-6 inline-block text-indigo-400"
      >
        ← Back to Marketplace
      </Link>
    </main>
  );
}
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {listing.image_url ? (
  <img
    src={listing.image_url}
    alt={listing.title}
    className="h-96 w-full rounded-3xl object-cover"
  />
) : (
  <div className="h-96 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600" />
)}

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
           <h1 className="text-5xl font-bold">
  {listing.title}
</h1>

            <p className="mt-6 text-gray-300">
              This premium digital asset is available for purchase through
              Vanguard Marketplace.
            </p>

            <div className="mt-10 rounded-2xl bg-white/5 p-8">
              <h2 className="text-2xl font-bold">Description</h2>

             <p className="mt-4 text-gray-400">
  {listing.description}
</p>
            </div>

            <div className="mt-8 rounded-2xl bg-white/5 p-8">
              <h2 className="text-2xl font-bold">Seller Information</h2>

              <p className="mt-4 text-gray-400">
                Verified Seller • 4.9 Rating • 25 Sales
              </p>
            </div>
          </div>

          <div>
            <div className="rounded-2xl bg-[#111827] p-8">
              <h3 className="text-4xl font-bold text-indigo-400">
  ${listing.price}
  <div className="mt-4">
  <FavoriteButton />
</div>
  <BuyNowButton />
</h3>

              <button className="mt-6 w-full rounded-xl bg-indigo-600 py-4 font-semibold">
                Contact Seller
              </button>

              <button className="mt-4 w-full rounded-xl border border-white/20 py-4">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/marketplace" className="text-indigo-400">
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    </main>
  );
}