"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeCartItem } from "@/app/cart/actions";

type RemoveCartButtonProps = {
  id: string;
};

export default function RemoveCartButton({
  id,
}: RemoveCartButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from your cart?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await removeCartItem(id);
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Failed to remove item.");
      }
    });
  };

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleRemove}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Removing..." : "Remove"}
    </button>
  );
}