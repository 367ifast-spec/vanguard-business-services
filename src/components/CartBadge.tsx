import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartBadge() {
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10"
      aria-label="Shopping Cart"
    >
      <ShoppingCart size={22} />
    </Link>
  );
}