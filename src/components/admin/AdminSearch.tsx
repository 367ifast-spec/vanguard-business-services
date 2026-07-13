"use client";

import { useMemo, useState } from "react";

type StatusOption =
  | "all"
  | "waiting"
  | "finished"
  | "confirmed"
  | "failed";

export default function AdminSearch() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusOption>("all");

  const searchText = useMemo(
    () => search.trim().toLowerCase(),
    [search]
  );

  return (
    <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Search & Filters
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Quickly locate quotes and payments using the search field and
          payment status filter.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Search Quote ID / Payment ID
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Example: Q-1001 or PAYMENT-12345"
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Payment Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as StatusOption)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="all">All Status</option>
            <option value="waiting">Waiting</option>
            <option value="finished">Finished</option>
            <option value="confirmed">Confirmed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
          Search: {searchText || "None"}
        </span>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          Status: {status}
        </span>
      </div>
    </section>
  );
}