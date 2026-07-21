"use client";

import { useState } from "react";
import { uploadMarketplaceImage } from "@/lib/marketplace-upload";

export default function MarketplaceImageUpload() {
  const [image, setImage] = useState<File | null>(
    null
  );

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!image) return;

    try {
      setLoading(true);

      const publicUrl =
        await uploadMarketplaceImage(image);

      setImageUrl(publicUrl);

      alert("Image uploaded successfully!");
    } catch (error) {
      console.error(error);

      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">
        Upload Listing Image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(
            e.target.files?.[0] || null
          )
        }
        className="w-full rounded-xl bg-[#0B1020] p-4"
      />

      {image && (
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-sm text-gray-400">
            Selected:
          </p>

          <p>{image.name}</p>

          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className="mt-4 rounded-xl bg-indigo-600 px-5 py-2"
          >
            {loading
              ? "Uploading..."
              : "Upload Image"}
          </button>
        </div>
      )}

      {imageUrl && (
        <div className="space-y-4 rounded-xl border border-green-500/20 p-4">
          <p className="text-green-400">
            Upload Successful
          </p>

          <img
            src={imageUrl}
            alt="Marketplace Listing"
            className="h-48 w-full rounded-xl object-cover"
          />

          <p className="break-all text-xs text-gray-400">
            {imageUrl}
          </p>
        </div>
      )}
    </div>
  );
}