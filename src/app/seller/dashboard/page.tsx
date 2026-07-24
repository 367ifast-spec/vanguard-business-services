import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>
<div className="mt-6">
  <LogoutButton />
</div>
        <p className="mt-4 text-gray-400">
          Welcome to your Vanguard Marketplace account.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">12</h2>
            <p className="text-gray-400">Listings</p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">8</h2>
            <p className="text-gray-400">Messages</p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">2</h2>
            <p className="text-gray-400">Escrows</p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">1</h2>
            <p className="text-gray-400">Disputes</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link
            href="/seller/dashboard"
            className="rounded-2xl bg-[#111827] p-8 transition hover:border hover:border-indigo-500"
          >
            <h3 className="text-2xl font-semibold">
              Seller Dashboard
            </h3>

            <p className="mt-2 text-gray-400">
              Manage your marketplace listings.
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
        </div>
      </div>
    </main>
  );
}