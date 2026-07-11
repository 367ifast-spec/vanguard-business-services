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
    <div className="mb-8 rounded-xl bg-white p-6 shadow">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Search Quote ID / Payment ID
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Example: Q-1001 or PAYMENT-12345"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <div className="w-full lg:w-64">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Payment Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as StatusOption)
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="waiting">Waiting</option>
            <option value="finished">Finished</option>
            <option value="confirmed">Confirmed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-600">
        <span className="rounded-full bg-gray-100 px-3 py-1">
          Search: {searchText || "None"}
        </span>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
          Status: {status}
        </span>
      </div>
    </div>
  );
}