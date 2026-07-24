"use client";

import { Heart } from "lucide-react";

export default function FavoriteButton() {
  async function handleFavorite() {
    alert(
      "Listing added to favorites!"
    );
  }

  return (
    <button
      onClick={handleFavorite}
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 transition hover:border-red-500"
    >
      <Heart size={18} />
      Favorite
    </button>
  );
}