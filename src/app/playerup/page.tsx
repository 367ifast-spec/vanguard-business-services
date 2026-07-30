import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Gamepad2,
  MessageSquareText,
  Search,
  ShieldCheck,
  ShoppingBag,
  Store,
  Users,
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

const categories = [
  {
    name: "Gaming",
    description: "Browse gaming-related digital listings.",
    icon: Gamepad2,
  },
  {
    name: "Digital Assets",
    description: "Discover digital assets from marketplace sellers.",
    icon: ShoppingBag,
  },
  {
    name: "Online Businesses",
    description: "Explore websites, SaaS products, and online businesses.",
    icon: Store,
  },
  {
    name: "Services",
    description: "Find digital services offered by marketplace sellers.",
    icon: Users,
  },
];

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

export default async function PlayerUpPage() {
  let listings: MarketplaceListing[] = [];

  try {
    const data = await getApprovedMarketplaceListings();
    listings = (data ?? []) as MarketplaceListing[];
  } catch (error) {
    console.error("PlayerUp listings error:", error);
  }

  const featuredListings = listings.slice(0, 6);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* TOP BAR */}
      <div className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/playerup"
            className="flex items-center gap-3 text-xl font-bold"
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
      </div>

      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
            <ShieldCheck size={16} />
            Digital Marketplace
          </div>

          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Buy and Sell Digital Assets
            <span className="text-emerald-400"> Securely</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Discover marketplace listings, connect with sellers, and manage
            digital transactions through one marketplace experience.
          </p>

         <form
  action="/playerup/search"
  method="GET"
            className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-900 px-4">
              <Search className="shrink-0 text-slate-500" size={20} />

              <input
                type="search"
                name="q"
                placeholder="Search marketplace listings..."
                className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              className="h-12 rounded-xl bg-emerald-500 px-7 font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              Search
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-emerald-400" />
              Escrow Protection
            </span>

            <span className="flex items-center gap-2">
              <BadgeCheck size={17} className="text-emerald-400" />
              Seller Verification
            </span>

            <span className="flex items-center gap-2">
              <MessageSquareText size={17} className="text-emerald-400" />
              Marketplace Messaging
            </span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              Marketplace
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Browse Categories
            </h2>
          </div>

          <Link
           href="/playerup/search"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
          >
            Browse Marketplace
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
               href={`/playerup/search?q=${encodeURIComponent(
  category.name
)}`}
                className="group rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-emerald-400/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {category.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
                  Explore
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* LISTINGS */}
      <section className="border-y border-white/10 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                Latest
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Marketplace Listings
              </h2>

              <p className="mt-2 text-slate-400">
                Recently approved listings available in the marketplace.
              </p>
            </div>

            <Link
              href="/playerup/search"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400"
            >
              View All
              <ArrowRight size={17} />
            </Link>
          </div>

          {featuredListings.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-slate-900 p-10 text-center">
              <ShoppingBag
                size={36}
                className="mx-auto text-slate-500"
              />

              <h3 className="mt-4 text-lg font-bold">
                No approved listings yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                Approved marketplace listings will appear here automatically.
              </p>

              <Link
                href="/playerup/seller/register"
                className="mt-6 inline-flex rounded-lg bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950"
              >
                Become a Seller
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredListings.map((listing) => (
                <article
                  key={listing.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
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
                        size={44}
                        className="text-emerald-400"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                        {listing.category || "Digital Asset"}
                      </span>

                      <span className="text-lg font-black text-emerald-400">
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
                    ) : null}

                    <Link
                      href={`/playerup/listing/${listing.slug}`}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-bold transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
                    >
                      View Listing
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-7">
            <ShieldCheck size={32} className="text-emerald-400" />

            <h3 className="mt-5 text-xl font-bold">
              Protected Transactions
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Marketplace transactions can use the existing escrow workflow
              for safer buyer and seller interactions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-7">
            <BadgeCheck size={32} className="text-emerald-400" />

            <h3 className="mt-5 text-xl font-bold">
              Seller Verification
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Build marketplace trust through seller verification and listing
              approval workflows.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-7">
            <MessageSquareText
              size={32}
              className="text-emerald-400"
            />

            <h3 className="mt-5 text-xl font-bold">
              Buyer & Seller Communication
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Keep communication connected to the marketplace through the
              existing messaging system.
            </p>
          </div>
        </div>
      </section>

      {/* SELLER CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-8 md:p-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="font-bold text-emerald-400">
                Sell on PlayerUp
              </p>

              <h2 className="mt-2 text-3xl font-black md:text-4xl">
                Turn your digital assets into opportunities.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Create your seller account and use the marketplace listing,
                approval, messaging, and transaction infrastructure.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/playerup/seller/register"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-400"
              >
                Start Selling
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/login?source=playerup"
                className="inline-flex rounded-xl border border-white/15 px-6 py-3 font-bold transition hover:bg-white/5"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>PlayerUp Digital Marketplace</p>

          <div className="flex flex-wrap gap-5">
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>

            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>

            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
