import { supabase } from "@/lib/supabase";

export async function getMarketplaceListings() {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getPendingMarketplaceListings() {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getApprovedMarketplaceListings() {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getMarketplaceListingById(
  id: string
) {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
}

export async function getMarketplaceListingBySlug(
  slug: string
) {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;

  return data;
}

export async function createMarketplaceListing(
  listing: {
    seller_id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    price: number;
    image_url?: string;
  }
) {
  const LIMITS = {
    free: 15,
    verified: 50,
    bronze: 100,
    silver: 250,
    gold: 500,
    platinum: 1000,
    diamond: Infinity,
  };

  const { data: subscription } = await supabase
    .from("seller_subscriptions")
    .select("*")
    .eq("seller_id", listing.seller_id)
    .eq("status", "active")
    .single();

  let packageSlug = "free";

  if (subscription?.package_id) {
    const { data: sellerPackage } = await supabase
      .from("seller_packages")
      .select("slug")
      .eq("id", subscription.package_id)
      .single();

    packageSlug = sellerPackage?.slug ?? "free";
  }

  const { count } = await supabase
    .from("marketplace_listings")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("seller_id", listing.seller_id);

  const limit =
    LIMITS[packageSlug as keyof typeof LIMITS];

  if ((count ?? 0) >= limit) {
    throw new Error(
      "Listing limit reached. Please upgrade your seller package."
    );
  }

  const { data, error } = await supabase
    .from("marketplace_listings")
    .insert({
      ...listing,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Marketplace Insert Error:",
      error
    );

    throw error;
  }

  return data;
}

export async function approveMarketplaceListing(
  id: string
) {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .update({
      status: "approved",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function rejectMarketplaceListing(
  id: string
) {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .update({
      status: "rejected",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getMarketplaceListingsCount() {
  const { count, error } = await supabase
    .from("marketplace_listings")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (error) throw error;

  return count || 0;
}