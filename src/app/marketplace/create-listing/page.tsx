"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import MarketplaceImageUpload from "@/components/MarketplaceImageUpload";
import {
  canCreateListing,
  getRemainingListings,
} from "@/lib/seller-packages";
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

type KYCStatus =
  | "loading"
  | "approved"
  | "pending"
  | "rejected"
  | "not_submitted"
  | "not_logged_in"
  | "error";

export default function CreateListingPage() {
  const [loading, setLoading] = useState(false);

  const [kycStatus, setKycStatus] =
    useState<KYCStatus>("loading");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [category, setCategory] = useState(
    categories[0]
  );

  const [packageName, setPackageName] =
    useState("FREE");

  const [remainingListings, setRemainingListings] =
    useState<number | "Unlimited" | null>(null);

  useEffect(() => {
    async function checkSellerAccess() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error(
            "CREATE LISTING SESSION ERROR:",
            sessionError
          );

          setKycStatus("error");
          return;
        }

        const user = session?.user ?? null;

        if (!user) {
          setKycStatus("not_logged_in");
          return;
        }

        // ----------------------------------------
        // 1. CHECK SELLER KYC
        // ----------------------------------------

        const { data: kyc, error: kycError } =
          await supabase
            .from("seller_kyc")
            .select("status")
            .eq("user_id", user.id)
            .order("created_at", {
              ascending: false,
            })
            .limit(1)
            .maybeSingle();

        if (kycError) {
          console.error(
            "CREATE LISTING KYC ERROR:",
            kycError
          );

          setKycStatus("error");
          return;
        }

        if (!kyc) {
          setKycStatus("not_submitted");
          return;
        }

        const status = String(
          kyc.status ?? "pending"
        ).toLowerCase();

        if (status === "rejected") {
          setKycStatus("rejected");
          return;
        }

        if (status !== "approved") {
          setKycStatus("pending");
          return;
        }

        // ----------------------------------------
        // 2. LOAD SELLER PACKAGE
        // seller_subscriptions uses seller_id.
        // ----------------------------------------

        const {
          data: subscription,
          error: subscriptionError,
        } = await supabase
          .from("seller_subscriptions")
          .select(
            `
              seller_packages (
                name
              )
            `
          )
          .eq("seller_id", user.id)
          .eq("status", "active")
          .maybeSingle();

        if (subscriptionError) {
          console.error(
            "SELLER SUBSCRIPTION ERROR:",
            subscriptionError
          );
        }

        const currentPackageName =
          (
            subscription as {
              seller_packages?: {
                name?: string;
              };
            } | null
          )?.seller_packages?.name ?? "FREE";

        setPackageName(currentPackageName);

        // ----------------------------------------
        // 3. COUNT CURRENT SELLER LISTINGS
        // ----------------------------------------

        const {
          count,
          error: countError,
        } = await supabase
          .from("marketplace_listings")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("seller_id", user.id);

        if (countError) {
          console.error(
            "CREATE LISTING COUNT ERROR:",
            countError
          );

          setKycStatus("error");
          return;
        }

        const currentListings = count ?? 0;

        // ----------------------------------------
        // 4. CALCULATE PACKAGE LIMIT
        // ----------------------------------------

        const remaining = getRemainingListings(
          currentPackageName,
          currentListings
        );

        setRemainingListings(remaining);

        setKycStatus("approved");
      } catch (error) {
        console.error(
          "CREATE LISTING INITIAL CHECK ERROR:",
          error
        );

        setKycStatus("error");
      }
    }

    void checkSellerAccess();
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        alert("Please login first.");
        return;
      }

      // ----------------------------------------
      // 1. RE-CHECK KYC BEFORE INSERT
      // ----------------------------------------

      const { data: kyc, error: kycError } =
        await supabase
          .from("seller_kyc")
          .select("status")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle();

      if (kycError) {
        throw kycError;
      }

      const currentKYCStatus = String(
        kyc?.status ?? ""
      ).toLowerCase();

      if (currentKYCStatus !== "approved") {
        alert(
          "KYC approval is required before you can create marketplace listings."
        );

        setKycStatus(
          !kyc
            ? "not_submitted"
            : currentKYCStatus === "rejected"
              ? "rejected"
              : "pending"
        );

        return;
      }

      // ----------------------------------------
      // 2. RE-CHECK ACTIVE SELLER PACKAGE
      // ----------------------------------------

      const {
        data: subscription,
        error: subscriptionError,
      } = await supabase
        .from("seller_subscriptions")
        .select(
          `
            seller_packages (
              name
            )
          `
        )
        .eq("seller_id", user.id)
        .eq("status", "active")
        .maybeSingle();

      if (subscriptionError) {
        console.error(
          "SELLER SUBSCRIPTION ERROR:",
          subscriptionError
        );
      }

      const currentPackageName =
        (
          subscription as {
            seller_packages?: {
              name?: string;
            };
          } | null
        )?.seller_packages?.name ?? "FREE";

      setPackageName(currentPackageName);

      // ----------------------------------------
      // 3. RE-COUNT CURRENT LISTINGS
      // ----------------------------------------

      const {
        count,
        error: countError,
      } = await supabase
        .from("marketplace_listings")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("seller_id", user.id);

      if (countError) {
        throw countError;
      }

      const currentListings = count ?? 0;

      const remaining = getRemainingListings(
        currentPackageName,
        currentListings
      );

      setRemainingListings(remaining);

      if (
        !canCreateListing(
          currentPackageName,
          currentListings
        )
      ) {
        alert(
          `You have reached the ${currentPackageName} package limit. Please upgrade your package.`
        );

        return;
      }

      // ----------------------------------------
      // 4. VALIDATE LISTING
      // ----------------------------------------

      const normalizedTitle = title.trim();

      if (!normalizedTitle) {
        alert("Listing title is required.");
        return;
      }

      const numericPrice = Number(price);

      if (
        !Number.isFinite(numericPrice) ||
        numericPrice <= 0
      ) {
        alert(
          "Please enter a valid listing price."
        );

        return;
      }

      const slug = `${normalizedTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")}-${Date.now()}`;

      // ----------------------------------------
      // 5. CREATE LISTING
      // ----------------------------------------

      await createMarketplaceListing({
        seller_id: user.id,
        title: normalizedTitle,
        slug,
        description: description.trim(),
        category,
        price: numericPrice,
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

      setRemainingListings((current) => {
        if (
          current === null ||
          current === "Unlimited"
        ) {
          return current;
        }

        return Math.max(current - 1, 0);
      });
    } catch (error) {
      console.error(
        "CREATE LISTING ERROR:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Failed to create listing.";

      alert(message);
    } finally {
      setLoading(false);
    }
  }

  if (kycStatus === "loading") {
    return (
      <main className="min-h-screen bg-[#0B1020] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-10">
            <h1 className="text-3xl font-bold">
              Checking Seller Verification...
            </h1>

            <p className="mt-4 text-gray-400">
              Please wait while we verify your
              marketplace seller account.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (kycStatus !== "approved") {
    let titleText =
      "KYC Verification Required";

    let descriptionText =
      "You must complete KYC verification before creating marketplace listings.";

    if (kycStatus === "pending") {
      titleText = "KYC Pending Review";

      descriptionText =
        "Your KYC submission is waiting for admin approval. You can create listings after your identity verification is approved.";
    }

    if (kycStatus === "rejected") {
      titleText = "KYC Verification Rejected";

      descriptionText =
        "Your KYC verification was rejected. Review your KYC status before attempting to create a listing.";
    }

    if (kycStatus === "not_logged_in") {
      titleText = "Seller Login Required";

      descriptionText =
        "Please login to your seller account before creating a marketplace listing.";
    }

    if (kycStatus === "error") {
      titleText =
        "Unable to Verify KYC Status";

      descriptionText =
        "We could not verify your KYC status. Please try again.";
    }

    return (
      <main className="min-h-screen bg-[#0B1020] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link
            href="/marketplace"
            className="text-indigo-400 transition hover:text-indigo-300"
          >
            ← Back to Marketplace
          </Link>

          <div className="mt-10 rounded-3xl border border-yellow-500/20 bg-[#111827] p-10">
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-6">
              <h1 className="text-3xl font-bold text-yellow-400">
                {titleText}
              </h1>

              <p className="mt-4 leading-7 text-gray-300">
                {descriptionText}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {kycStatus !== "not_logged_in" ? (
                <Link
                  href="/seller/kyc"
                  className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700"
                >
                  View KYC Status
                </Link>
              ) : null}

              <Link
                href="/seller/dashboard"
                className="rounded-xl border border-white/10 bg-[#0B1020] px-6 py-3 font-semibold transition hover:bg-white/5"
              >
                Seller Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10">
          <Link
            href="/marketplace"
            className="text-indigo-400 transition hover:text-indigo-300"
          >
            ← Back to Marketplace
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-10">
          <div className="mb-6 inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
            KYC Approved
          </div>

          <h1 className="text-5xl font-bold">
            Create a New Listing
          </h1>

          <p className="mt-4 text-gray-400">
            List your digital asset on Vanguard
            Marketplace.
          </p>

          <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
            <p className="font-semibold">
              Package: {packageName}
            </p>

            <p className="mt-1 text-sm text-gray-300">
              {remainingListings === "Unlimited"
                ? "Unlimited Listings"
                : remainingListings === null
                  ? "Loading listing limit..."
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

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="text-black"
                  >
                    {item}
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
                min="0.01"
                step="0.01"
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
              onUpload={(url) =>
                setImageUrl(url)
              }
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
              className="w-full rounded-xl bg-indigo-600 py-4 font-semibold transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
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