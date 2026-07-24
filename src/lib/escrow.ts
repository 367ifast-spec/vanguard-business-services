import { supabase } from "@/lib/supabase";

export async function createEscrow({
  buyer_id,
  seller_id,
  listing_id,
  amount,
}: {
  buyer_id: string;
  seller_id: string;
  listing_id: string;
  amount: number;
}) {
  const { data, error } = await supabase
    .from("escrows")
    .insert({
      buyer_id,
      seller_id,
      listing_id,
      amount,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getEscrows() {
  const { data, error } = await supabase
    .from("escrows")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function getEscrowById(
  id: string
) {
  const { data, error } = await supabase
    .from("escrows")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function releaseEscrow(
  id: string
) {
  const { data, error } = await supabase
    .from("escrows")
    .update({
      status: "released",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function completeEscrow(
  id: string
) {
  const { data, error } = await supabase
    .from("escrows")
    .update({
      status: "completed",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function disputeEscrow(
  id: string
) {
  const { data, error } = await supabase
    .from("escrows")
    .update({
      status: "disputed",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}