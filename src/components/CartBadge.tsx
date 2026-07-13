import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { getCartCount } from "@/app/cart/actions";

export default async function CartBadge() {
  const count = await getCartCount();

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
      aria-label="Shopping Cart"
    >
      <ShoppingCart size={22} />

      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}