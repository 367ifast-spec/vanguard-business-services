"use client";

import { useState } from "react";

export default function MarketplaceImageUpload({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">
        Upload Listing Image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;

          setImage(file);

          if (file) {
            // Temporary until real upload is connected
            onUpload(URL.createObjectURL(file));
          }
        }}
        className="w-full rounded-xl bg-[#0B1020] p-4"
      />

      {image && (
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-sm text-gray-400">
            Selected:
          </p>

          <p>{image.name}</p>
        </div>
      )}
    </div>
  );
}