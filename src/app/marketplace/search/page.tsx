import Link from "next/link";
import {
  Search,
  Filter,
  Globe,
  Building2,
  Briefcase,
} from "lucide-react";

const listings = [
  {
    id: 1,
    title: "AI SaaS Startup",
    category: "SaaS",
    price: "$5,000",
  },
  {
    id: 2,
    title: "Finance Blog",
    category: "Websites",
    price: "$2,500",
  },
  {
    id: 3,
    title: "Marketing Agency",
    category: "Agencies",
    price: "$12,000",
  },
  {
    id: 4,
    title: "Premium Domain",
    category: "Domains",
    price: "$9,900",
  },
];

export default function MarketplaceSearchPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold">
            Search Marketplace
          </h1>

          <p className="mt-4 text-gray-400">
            Find websites, SaaS businesses, domains,
            and digital assets.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-6">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-1 items-center rounded-xl bg-[#0B1020] px-4">
              <Search
                size={20}
                className="text-gray-500"
              />

              <input
                type="text"
                placeholder="Search listings..."
                className="w-full bg-transparent p-4 outline-none"
              />
            </div>

            <button className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold transition hover:bg-indigo-700">
              Search
            </button>
          </div>

          {/* Filters */}
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <select className="rounded-xl bg-[#0B1020] p-4 outline-none">
              <option>All Categories</option>
              <option>Websites</option>
              <option>Domains</option>
              <option>SaaS</option>
              <option>Agencies</option>
            </select>

            <select className="rounded-xl bg-[#0B1020] p-4 outline-none">
              <option>Any Price</option>
              <option>$0 - $1,000</option>
              <option>$1,000 - $5,000</option>
              <option>$5,000 - $10,000</option>
              <option>$10,000+</option>
            </select>

            <select className="rounded-xl bg-[#0B1020] p-4 outline-none">
              <option>Any Seller</option>
              <option>john_doe</option>
              <option>agency_pro</option>
              <option>vanguard</option>
            </select>

            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 p-4">
              <Filter size={18} />
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold">
            Search Results
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {listings.map((listing) => {
              const icon =
                listing.category === "Websites"
                  ? Globe
                  : listing.category === "SaaS"
                  ? Building2
                  : listing.category === "Agencies"
                  ? Briefcase
                  : Globe;

              const Icon = icon;

              return (
                <div
                  key={listing.id}
                  className="rounded-2xl border border-white/10 bg-[#111827] p-6"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-600">
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold">
                    {listing.title}
                  </h3>

                  <p className="mt-2 text-gray-400">
                    {listing.category}
                  </p>

                  <p className="mt-4 text-3xl font-bold text-indigo-400">
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
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}