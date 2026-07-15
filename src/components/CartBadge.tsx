import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { getCartSessionId } from "@/lib/cart-session";
import { supabaseAdmin } from "@/lib/supabase";

export default async function CartBadge() {
  const sessionId = await getCartSessionId();

  const { count } = await supabaseAdmin!
    .from("cart_items")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("session_id", sessionId);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
      aria-label="Shopping Cart"
    >
      <ShoppingCart size={22} />

      {count && count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}