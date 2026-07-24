"use client";
import { canCreateListing } from "@/lib/seller-packages";
import Link from "next/link";
import { useState } from "react";

import MarketplaceImageUpload from "@/components/MarketplaceImageUpload";
import { createMarketplaceListing } from "@/lib/marketplace";
import { supabase } from "@/lib/supabase";

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
  const [category, setCategory] = useState(categories[0]);
const [packageName, setPackageName] = useState("FREE");
const [remainingListings, setRemainingListings] =
  useState<number | null>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

    const sessionResult = await supabase.auth.getSession();

console.log("SESSION RESULT:", sessionResult);

const {
  data: { user },
} = await supabase.auth.getUser();

console.log("USER RESULT:", user);

if (!user) {
  alert("Please login first.");
  setLoading(false);
  return;
}
const { data: subscription } = await supabase
  .from("seller_subscriptions")
  .select(
    `
      seller_packages (
        name
      )
    `
  )
  .eq("user_id", user.id)
  .eq("status", "active")
  .maybeSingle();

const currentPackageName =
  (
    subscription as {
      seller_packages?: {
        name?: string;
      };
    }
  )?.seller_packages?.name ?? "FREE";

setPackageName(currentPackageName);

// Count current listings
const { count } = await supabase
  .from("marketplace_listings")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("seller_id", user.id);

const currentListings = count ?? 0;
const limits: Record<string, number> = {
  FREE: 15,
  VERIFIED: 50,
  BRONZE: 100,
  SILVER: 250,
  GOLD: 500,
  PLATINUM: 1000,
  DIAMOND: Number.MAX_SAFE_INTEGER,
};

const remaining =
  limits[currentPackageName.toUpperCase()] -
  currentListings;

setRemainingListings(
  remaining === Number.MAX_SAFE_INTEGER
    ? null
    : remaining
);
if (
  !canCreateListing(
    currentPackageName,
    currentListings
  )
) {
  alert(
    `You have reached the ${currentPackageName} package limit. Please upgrade your package.`
  );

  setLoading(false);
  return;
}
      console.log("USER:", user);

      const slug = `${title
        .trim()
        .toLowerCase()
        .replaceAll(" ", "-")}-${Date.now()}`;

      await createMarketplaceListing({
        seller_id: user.id,
        title,
        slug,
        description,
        category,
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
      setCategory(categories[0]);
    } catch (error: any) {
      console.error("CREATE LISTING ERROR:", error);

      alert(JSON.stringify(error, null, 2));
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
<div className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
  <p className="font-semibold">
    Package: {packageName}
  </p>

  <p className="text-sm text-gray-300">
    {remainingListings === null
      ? "Unlimited Listings"
      : `${remainingListings} Listings Remaining`}
  </p>
</div>
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
                onChange={(e) => setTitle(e.target.value)}
                placeholder="AI SaaS Startup"
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
              >
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
                onChange={(e) => setPrice(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
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
                All listings are reviewed by our team before they
                are published on Vanguard Marketplace.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-4 font-semibold transition hover:bg-indigo-700 disabled:opacity-50"
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
