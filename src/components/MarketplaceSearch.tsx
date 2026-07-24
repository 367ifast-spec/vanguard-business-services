"use client";

import { useState } from "react";

export default function MarketplaceSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Search listings..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full rounded-xl bg-[#111827] p-4 outline-none"
      />

      <button className="rounded-xl bg-indigo-600 px-6 py-4 font-semibold">
        Search
      </button>
    </div>
  );
}