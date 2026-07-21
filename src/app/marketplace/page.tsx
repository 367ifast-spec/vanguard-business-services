import { getApprovedMarketplaceListings } from "@/lib/marketplace";
import Link from "next/link";

import {
  Search,
  Globe,
  Building2,
  Monitor,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Users,
  Star,
} from "lucide-react";

const categories = [
  {
    name: "Websites",
    icon: Globe,
    description: "Buy and sell websites.",
  },
  {
    name: "Domains",
    icon: Monitor,
    description: "Premium domain marketplace.",
  },
  {
    name: "SaaS",
    icon: Building2,
    description: "Acquire profitable SaaS products.",
  },
  {
    name: "Agencies",
    icon: Briefcase,
    description: "Buy and sell digital agencies.",
  },
];



export default async function MarketplacePage() {
    const listings =
  (await getApprovedMarketplaceListings()) || [];
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm">
            Vanguard Marketplace
          </div>

          <h1 className="mt-8 text-5xl font-bold leading-tight">
            Buy & Sell Digital Assets Securely
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Discover websites, domains, SaaS businesses, agencies, and
            digital assets from verified sellers worldwide.
          </p>

          <div className="mx-auto mt-10 flex max-w-3xl items-center rounded-2xl bg-white p-3">
            <Search className="ml-2 text-gray-500" size={22} />

            <input
              className="w-full px-4 py-3 text-black outline-none"
              placeholder="Search websites, domains, SaaS..."
            />

            <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700">
              Search
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-6">
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-gray-400">Active Listings</p>
            </div>

            <div className="rounded-2xl bg-white/5 p-6">
              <h3 className="text-3xl font-bold">5K+</h3>
              <p className="text-gray-400">Verified Users</p>
            </div>

            <div className="rounded-2xl bg-white/5 p-6">
              <h3 className="text-3xl font-bold">$1M+</h3>
              <p className="text-gray-400">Transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-4xl font-bold">Browse Categories</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-indigo-500"
              >
                <Icon size={36} />

                <h3 className="mt-5 text-xl font-semibold">{item.name}</h3>

                <p className="mt-2 text-gray-400">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold">Featured Listings</h2>

          <Link
            href="/marketplace/listings"
            className="flex items-center gap-2 text-indigo-400"
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
         {listings.map((listing: any) => (
  <div
    key={listing.id}
              className="rounded-2xl border border-white/10 bg-[#111827] p-6"
            >
              {listing.image_url ? (
  <img
    src={listing.image_url}
    alt={listing.title}
    className="h-44 w-full rounded-xl object-cover"
  />
) : (
  <div className="h-44 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600" />
)}

              <h3 className="mt-6 text-2xl font-semibold">
                {listing.title}
              </h3>

              <p className="mt-3 text-3xl font-bold text-indigo-400">
                {listing.price}
              </p>

              <Link
  href={`/listing/${listing.slug}`}
  className="mt-6 flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 font-semibold"
>
  View Listing
</Link>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-4xl font-bold">
          Why Vanguard Marketplace?
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-8">
            <ShieldCheck size={40} />
            <h3 className="mt-5 text-xl font-semibold">
              Secure Transactions
            </h3>
            <p className="mt-3 text-gray-400">
              Built with escrow and verification in mind.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-8">
            <Users size={40} />
            <h3 className="mt-5 text-xl font-semibold">
              Verified Sellers
            </h3>
            <p className="mt-3 text-gray-400">
              Trusted marketplace for digital businesses.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-8">
            <Star size={40} />
            <h3 className="mt-5 text-xl font-semibold">
              Premium Experience
            </h3>
            <p className="mt-3 text-gray-400">
              Modern UI inspired by leading marketplaces.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-12 text-center">
          <h2 className="text-4xl font-bold">
            Ready to Become a Seller?
          </h2>

          <p className="mt-4 text-lg">
            Start selling your digital assets today.
          </p>

          <Link
            href="/seller/register"
            className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 font-semibold text-black"
          >
            Become a Seller
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 space-y-6">
          <div className="rounded-2xl bg-white/5 p-6">
            <h3 className="font-semibold">
              How does Vanguard Marketplace work?
            </h3>
            <p className="mt-2 text-gray-400">
              Buyers browse listings and sellers create verified listings.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <h3 className="font-semibold">
              Will escrow be available?
            </h3>
            <p className="mt-2 text-gray-400">
              Yes, escrow support is planned in upcoming releases.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}