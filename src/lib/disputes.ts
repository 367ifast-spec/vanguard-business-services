import { supabase } from "@/lib/supabase";

export async function createDispute({
  escrow_id,
  opened_by,
  reason,
}: {
  escrow_id: string;
  opened_by: string;
  reason: string;
}) {
  const { data, error } = await supabase
    .from("disputes")
    .insert({
      escrow_id,
      opened_by,
      reason,
      status: "open",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getDisputes() {
  const { data, error } = await supabase
    .from("disputes")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}