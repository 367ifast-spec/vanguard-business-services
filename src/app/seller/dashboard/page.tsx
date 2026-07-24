import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">Dashboard</h1>

        <div className="mt-6">
          <LogoutButton />
        </div>

        <p className="mt-4 text-gray-400">
          Welcome to your Vanguard Marketplace account.
        </p>

        {/* Seller Package */}
        <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">
          <h2 className="text-xl font-semibold">
            Seller Package: FREE
          </h2>

          <p className="mt-2 text-gray-300">
            Remaining Listings: 15
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">12</h2>
            <p className="text-gray-400">Total Listings</p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">4</h2>
            <p className="text-gray-400">Approved Listings</p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">8</h2>
            <p className="text-gray-400">Pending Listings</p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">$0</h2>
            <p className="text-gray-400">Total Sales</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link
            href="/seller/listings"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              My Listings
            </h3>

            <p className="mt-2 text-gray-400">
              Manage your marketplace listings.
            </p>
          </Link>

          <Link
            href="/marketplace/create-listing"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Create Listing
            </h3>

            <p className="mt-2 text-gray-400">
              Publish a new marketplace listing.
            </p>
          </Link>

          <Link
            href="/seller/kyc"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              KYC Verification
            </h3>

            <p className="mt-2 text-gray-400">
              Complete or review your KYC status.
            </p>
          </Link>

          <Link
            href="/seller/packages"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Seller Packages
            </h3>

            <p className="mt-2 text-gray-400">
              Upgrade your seller account.
            </p>
          </Link>

          <Link
            href="/messages"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Messages
            </h3>

            <p className="mt-2 text-gray-400">
              View conversations with buyers and sellers.
            </p>
          </Link>

          <Link
            href="/escrow"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Escrow
            </h3>

            <p className="mt-2 text-gray-400">
              Track secure marketplace transactions.
            </p>
          </Link>

          <Link
            href="/disputes"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Disputes
            </h3>

            <p className="mt-2 text-gray-400">
              Review and manage disputes.
            </p>
          </Link>

          <Link
            href="/seller/profile"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Profile
            </h3>

            <p className="mt-2 text-gray-400">
              Manage your seller profile.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}