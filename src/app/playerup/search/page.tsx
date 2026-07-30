import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Gamepad2,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Store,
} from "lucide-react";

import { getApprovedMarketplaceListings } from "@/lib/marketplace";

type MarketplaceListing = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  category?: string | null;
  price?: number | string | null;
  image_url?: string | null;
  seller_id?: string | null;
  created_at?: string | null;
};

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    category?: string | string[];
    price?: string | string[];
    sort?: string | string[];
  }>;
};

function getParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function formatPrice(price: MarketplaceListing["price"]) {
  const amount = Number(price);

  if (!Number.isFinite(amount)) {
    return "Contact Seller";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}

function getNumericPrice(price: MarketplaceListing["price"]) {
  const amount = Number(price);

  return Number.isFinite(amount) ? amount : 0;
}

function matchesPrice(
  listing: MarketplaceListing,
  priceFilter: string
) {
  if (!priceFilter) {
    return true;
  }

  const price = getNumericPrice(listing.price);

  switch (priceFilter) {
    case "under-100":
      return price < 100;

    case "100-500":
      return price >= 100 && price <= 500;

    case "500-1000":
      return price > 500 && price <= 1000;

    case "1000-5000":
      return price > 1000 && price <= 5000;

    case "5000-plus":
      return price > 5000;

    default:
      return true;
  }
}

export default async function PlayerUpSearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;

  const query = getParam(params.q).trim();
  const selectedCategory = getParam(params.category).trim();
  const selectedPrice = getParam(params.price).trim();
  const selectedSort = getParam(params.sort).trim() || "newest";

  let listings: MarketplaceListing[] = [];

  try {
    const data = await getApprovedMarketplaceListings();
    listings = (data ?? []) as MarketplaceListing[];
  } catch (error) {
    console.error("PlayerUp search listings error:", error);
  }

  const categories = Array.from(
    new Set(
      listings
        .map((listing) => listing.category?.trim())
        .filter(
          (category): category is string =>
            Boolean(category)
        )
    )
  ).sort((a, b) => a.localeCompare(b));

  const normalizedQuery = query.toLowerCase();

  let filteredListings = listings.filter((listing) => {
    const title = listing.title?.toLowerCase() ?? "";
    const description =
      listing.description?.toLowerCase() ?? "";
    const category =
      listing.category?.toLowerCase() ?? "";

    const matchesQuery =
      !normalizedQuery ||
      title.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      category.includes(normalizedQuery);

    const matchesCategory =
      !selectedCategory ||
      category === selectedCategory.toLowerCase();

    return (
      matchesQuery &&
      matchesCategory &&
      matchesPrice(listing, selectedPrice)
    );
  });

  filteredListings = [...filteredListings].sort((a, b) => {
    if (selectedSort === "price-low") {
      return getNumericPrice(a.price) - getNumericPrice(b.price);
    }

    if (selectedSort === "price-high") {
      return getNumericPrice(b.price) - getNumericPrice(a.price);
    }

    if (selectedSort === "oldest") {
      const aTime = a.created_at
        ? new Date(a.created_at).getTime()
        : 0;

      const bTime = b.created_at
        ? new Date(b.created_at).getTime()
        : 0;

      return aTime - bTime;
    }

    const aTime = a.created_at
      ? new Date(a.created_at).getTime()
      : 0;

    const bTime = b.created_at
      ? new Date(b.created_at).getTime()
      : 0;

    return bTime - aTime;
  });

  const hasFilters = Boolean(
    query ||
      selectedCategory ||
      selectedPrice ||
      selectedSort !== "newest"
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link
            href="/playerup"
            className="flex items-center gap-3 text-xl font-black"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
              <Gamepad2 size={22} />
            </span>

            <span>
              Player<span className="text-emerald-400">Up</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login?source=playerup"
              className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white sm:inline-flex"
            >
              Log In
            </Link>

            <Link
              href="/playerup/seller/register"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </header>

      {/* PAGE HEADER */}
      <section className="border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Link
            href="/playerup"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to PlayerUp
          </Link>

          <div className="mt-7 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
                <Store size={16} />
                Marketplace
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                Browse Listings
              </h1>

              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                Search approved marketplace listings and narrow
                the results by category, price, or sort order.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              <ShieldCheck
                size={18}
                className="text-emerald-400"
              />

              Approved listings only
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* SEARCH + FILTERS */}
        <form
          action="/playerup/search"
          method="GET"
          className="rounded-2xl border border-white/10 bg-slate-900 p-5"
        >
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-slate-950 px-4">
              <Search
                size={20}
                className="shrink-0 text-slate-500"
              />

              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search by title, description, or category..."
                className="h-14 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              className="flex h-14 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              <Search size={18} />
              Search
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Category
              </span>

              <select
                name="category"
                defaultValue={selectedCategory}
                className="h-12 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-emerald-400/50"
              >
                <option value="">All Categories</option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Price
              </span>

              <select
                name="price"
                defaultValue={selectedPrice}
                className="h-12 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-emerald-400/50"
              >
                <option value="">Any Price</option>
                <option value="under-100">
                  Under $100
                </option>
                <option value="100-500">
                  $100 - $500
                </option>
                <option value="500-1000">
                  $500 - $1,000
                </option>
                <option value="1000-5000">
                  $1,000 - $5,000
                </option>
                <option value="5000-plus">
                  Over $5,000
                </option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Sort
              </span>

              <select
                name="sort"
                defaultValue={selectedSort}
                className="h-12 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none focus:border-emerald-400/50"
              >
                <option value="newest">
                  Newest First
                </option>

                <option value="oldest">
                  Oldest First
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <SlidersHorizontal size={17} />

              Use the filters above to refine results.
            </div>

            <div className="flex items-center gap-3">
              {hasFilters ? (
                <Link
                  href="/playerup/search"
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  Clear Filters
                </Link>
              ) : null}

              <button
                type="submit"
                className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300 transition hover:bg-emerald-400/20"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </form>

        {/* RESULTS HEADER */}
        <section className="mt-10">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                Results
              </p>

              <h2 className="mt-2 text-3xl font-black">
                {query
                  ? `Results for "${query}"`
                  : "All Listings"}
              </h2>
            </div>

            <p className="text-sm text-slate-400">
              {filteredListings.length}{" "}
              {filteredListings.length === 1
                ? "listing"
                : "listings"}{" "}
              found
            </p>
          </div>

          {/* RESULTS */}
          {filteredListings.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-slate-900 p-12 text-center">
              <Search
                size={40}
                className="mx-auto text-slate-600"
              />

              <h3 className="mt-5 text-xl font-bold">
                No listings found
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
                No approved listings match the current search
                and filters. Try another keyword or clear the
                filters.
              </p>

              <Link
                href="/playerup/search"
                className="mt-6 inline-flex rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
              >
                View All Listings
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((listing) => (
                <article
                  key={listing.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition hover:-translate-y-1 hover:border-emerald-400/30"
                >
                  {listing.image_url ? (
                    <img
                      src={listing.image_url}
                      alt={listing.title}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-emerald-500/20 via-slate-800 to-slate-900">
                      <Gamepad2
                        size={46}
                        className="text-emerald-400"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                        {listing.category ||
                          "Digital Asset"}
                      </span>

                      <span className="shrink-0 text-xl font-black text-emerald-400">
                        {formatPrice(listing.price)}
                      </span>
                    </div>

                    <h3 className="mt-4 line-clamp-2 text-xl font-bold">
                      {listing.title}
                    </h3>

                    {listing.description ? (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                        {listing.description}
                      </p>
                    ) : (
                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        No description provided.
                      </p>
                    )}

                    <Link
                      href={`/playerup/listing/${listing.slug}`}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                    >
                      View Listing

                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}