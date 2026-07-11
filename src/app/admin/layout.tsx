"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import LogoutButton from "@/components/admin/LogoutButton";
export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
    const pathname = usePathname();
const isLoginPage = pathname === "/admin/login";
const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {!isLoginPage && (
  <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 shadow lg:hidden">
    <button
      onClick={() => setSidebarOpen(true)}
      className="rounded-lg border px-3 py-2"
    >
      ☰
    </button>

    <h2 className="font-semibold">
      Admin Panel
    </h2>

    <div className="w-10" />
  </header>
)}
        {/* Sidebar */}
        {!isLoginPage && (
        <aside className="hidden w-64 min-h-screen bg-gray-900 text-white lg:block">
         
          <div className="border-b border-gray-800 p-6">
            <h1 className="text-xl font-bold">
              Vanguard Business Services
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Admin Panel
            </p>
          </div>

          <nav className="flex flex-col space-y-2 p-4">
  <Link
    href="/admin"
    className={`rounded-lg px-4 py-3 transition ${
      pathname === "/admin"
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-800 text-gray-200"
    }`}
  >
    📊 Dashboard
  </Link>

  <Link
   href="/admin/quotes"
    className={`rounded-lg px-4 py-3 transition ${
      pathname.startsWith("/admin/quotes")
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-800 text-gray-200"
    }`}
  >
    📄 Quotes
  </Link>

  <Link
    href="/admin"
    className="rounded-lg px-4 py-3 text-gray-200 transition hover:bg-gray-800"
  >
    💳 Payments
  </Link>

  <Link
    href="/admin"
    className="rounded-lg px-4 py-3 text-gray-200 transition hover:bg-gray-800"
  >
    ⚙️ Settings
  </Link>
</nav>

          <div className="absolute bottom-0 w-64 border-t border-gray-800 p-4">
           <LogoutButton />
          </div>
        </aside>
)}
{!isLoginPage && sidebarOpen && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 z-40 bg-black/50 lg:hidden"
      onClick={() => setSidebarOpen(false)}
    />

    {/* Mobile Sidebar */}
    <aside className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-gray-900 text-white shadow-xl lg:hidden">
      <div className="flex items-center justify-between border-b border-gray-800 p-6">
        <div>
          <h1 className="text-lg font-bold">
            Vanguard Business Services
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Admin Panel
          </p>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="rounded px-2 py-1 hover:bg-gray-800"
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-col space-y-2 p-4">
        <Link
          href="/admin"
          onClick={() => setSidebarOpen(false)}
          className={`rounded-lg px-4 py-3 transition ${
            pathname === "/admin"
              ? "bg-blue-600 text-white"
              : "text-gray-200 hover:bg-gray-800"
          }`}
        >
          📊 Dashboard
        </Link>

        <Link
          href="/admin/quotes"
          onClick={() => setSidebarOpen(false)}
          className={`rounded-lg px-4 py-3 transition ${
            pathname.startsWith("/admin/quotes")
              ? "bg-blue-600 text-white"
              : "text-gray-200 hover:bg-gray-800"
          }`}
        >
          📄 Quotes
        </Link>

        <Link
          href="/admin"
          onClick={() => setSidebarOpen(false)}
          className="rounded-lg px-4 py-3 text-gray-200 transition hover:bg-gray-800"
        >
          💳 Payments
        </Link>

        <Link
          href="/admin"
          onClick={() => setSidebarOpen(false)}
          className="rounded-lg px-4 py-3 text-gray-200 transition hover:bg-gray-800"
        >
          ⚙️ Settings
        </Link>
      </nav>

      <div className="mt-auto border-t border-gray-800 p-4">
        <LogoutButton />
      </div>
    </aside>
  </>
)}
        {/* Content */}
        <section className="flex-1 pt-16 lg:pt-0">
          {children}
        </section>
      </div>
    </div>
  );
}