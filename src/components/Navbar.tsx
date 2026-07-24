"use client";

import Link from "next/link";
import NotificationBell from "@/components/NotificationBell";

export default function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-[#111827] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/marketplace"
          className="text-2xl font-bold text-indigo-400"
        >
          Vanguard Marketplace
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="transition hover:text-indigo-400"
          >
            Business Services
          </Link>

          <Link
            href="/marketplace"
            className="transition hover:text-indigo-400"
          >
            Marketplace
          </Link>

          <Link
            href="/messages"
            className="transition hover:text-indigo-400"
          >
            Messages
          </Link>

          <NotificationBell />

          <Link
            href="/seller/dashboard"
            className="transition hover:text-indigo-400"
          >
            Dashboard
          </Link>

          <Link
            href="/seller/packages"
            className="transition hover:text-indigo-400"
          >
            Packages
          </Link>

          <Link
            href="/seller/subscription"
            className="transition hover:text-indigo-400"
          >
            Subscription
          </Link>

          <Link
            href="/seller/kyc"
            className="transition hover:text-indigo-400"
          >
            KYC
          </Link>

          <Link
            href="/profile"
            className="rounded-lg bg-indigo-600 px-4 py-2 transition hover:bg-indigo-700"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}