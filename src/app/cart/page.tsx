"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "@/app/cart/actions";

type AddToCartButtonProps = {
  serviceId: string;
  className?: string;
};

export default function AddToCartButton({
  serviceId,
  className,
}: AddToCartButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      try {
        await addToCart(serviceId);

        router.refresh();

        alert("Service added to cart successfully.");
      } catch (error) {
        console.error(error);

        alert(
          error instanceof Error
            ? error.message
            : "Failed to add service to cart."
        );
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isPending}
      className={
        className ??
        "inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      }
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  );
}