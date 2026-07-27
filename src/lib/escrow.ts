import { supabaseAdmin } from "@/lib/supabase";

const ESCROW_TABLE = "escrow_transactions";

function getAdminClient() {
  if (!supabaseAdmin) {
    throw new Error(
      "Supabase admin client is unavailable. Check SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return supabaseAdmin;
}

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
  const admin = getAdminClient();

  const { data, error } = await admin
    .from(ESCROW_TABLE)
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
    console.error("CREATE ESCROW ERROR:", error);
    throw error;
  }

  return data;
}

export async function getEscrows() {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from(ESCROW_TABLE)
    .select(
      "id, listing_id, buyer_id, seller_id, amount, status, created_at"
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("GET ESCROWS ERROR:", error);
    throw error;
  }

  return data ?? [];
}

export async function getEscrowById(
  id: string
) {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from(ESCROW_TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(
      "GET ESCROW BY ID ERROR:",
      error
    );

    return null;
  }

  return data;
}

export async function releaseEscrow(
  id: string
) {
  const admin = getAdminClient();

  const now = new Date().toISOString();

  const { data, error } = await admin
    .from(ESCROW_TABLE)
    .update({
      status: "released",
      released_at: now,
      updated_at: now,
    })
    .eq("id", id)
    .eq("status", "delivered")
    .select()
    .maybeSingle();

  if (error) {
    console.error(
      "RELEASE ESCROW ERROR:",
      error
    );

    throw error;
  }

  if (!data) {
    throw new Error(
      "Escrow must be delivered before payment can be released."
    );
  }

  return data;
}

export async function completeEscrow(
  id: string
) {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from(ESCROW_TABLE)
    .update({
      status: "completed",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      "COMPLETE ESCROW ERROR:",
      error
    );

    throw error;
  }

  return data;
}

export async function disputeEscrow(
  id: string
) {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from(ESCROW_TABLE)
    .update({
      status: "disputed",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      "DISPUTE ESCROW ERROR:",
      error
    );

    throw error;
  }

  return data;
}