"use client";

import { useEffect, useState } from "react";

export default function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cart/count");
        const data = await res.json();

        setCount(data.count ?? 0);
      } catch {
        setCount(0);
      }
    }

    load();
  }, []);

  if (count === 0) return null;

  return (
    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
      {count}
    </span>
  );
}