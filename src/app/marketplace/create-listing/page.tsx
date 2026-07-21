"use client";

import Link from "next/link";
import { useState } from "react";

import MarketplaceImageUpload from "@/components/MarketplaceImageUpload";
import { createMarketplaceListing } from "@/lib/marketplace";

const categories = [
  "Websites",
  "Domains",
  "SaaS",
  "Agencies",
  "Digital Businesses",
  "Templates",
  "E-books",
];

export default function CreateListingPage() {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await createMarketplaceListing({
        title,
        slug: `${title
          .toLowerCase()
          .replaceAll(" ", "-")}-${Date.now()}`,
        description,
        price: Number(price),
        image_url: imageUrl,
      });

      alert(
        "Listing submitted successfully! Pending admin approval."
      );

      setTitle("");
      setPrice("");
      setDescription("");
      setImageUrl("");
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while creating the listing."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10">
          <Link
            href="/marketplace"
            className="text-indigo-400 hover:text-indigo-300"
          >
            ← Back to Marketplace
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-10">
          <h1 className="text-5xl font-bold">
            Create a New Listing
          </h1>

          <p className="mt-4 text-gray-400">
            List your digital asset on Vanguard Marketplace.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">
                Listing Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="AI SaaS Startup"
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select className="w-full rounded-xl bg-[#0B1020] p-4 outline-none">
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="text-black"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Price (USD)
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                placeholder="8900"
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Monthly Revenue
              </label>

              <input
                type="text"
                placeholder="$1,200"
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Monthly Traffic
              </label>

              <input
                type="text"
                placeholder="25,000 visitors"
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Website URL (Optional)
              </label>

              <input
                type="url"
                placeholder="https://example.com"
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                rows={8}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Describe your digital asset..."
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
                required
              />
            </div>

            <MarketplaceImageUpload
              onUpload={(url) => setImageUrl(url)}
            />

            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">
              <p className="text-sm text-indigo-200">
                All listings are reviewed by our team
                before they are published on Vanguard
                Marketplace.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-4 font-semibold transition hover:bg-indigo-700"
            >
              {loading
                ? "Submitting..."
                : "Submit Listing for Approval"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}