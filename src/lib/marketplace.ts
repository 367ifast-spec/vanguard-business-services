import { supabase } from "@/lib/supabase";

export async function getMarketplaceListings() {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getPendingMarketplaceListings() {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getApprovedMarketplaceListings() {
  const { data, error } = await supabase
    .from("marketplace_listings")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

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

  if (error) {
    return null;
  }

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

  if (error) {
    return null;
  }

  return data;
}

export async function createMarketplaceListing(
  listing: {
    title: string;
    slug: string;
    description: string;
    price: number;
    image_url?: string;
    category_id?: string;
  }
){
  const { data, error } = await supabase
    .from("marketplace_listings")
    .insert({
      ...listing,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
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

  if (error) {
    throw error;
  }

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

  if (error) {
    throw error;
  }

  return data;
}