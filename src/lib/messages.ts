import { supabase } from "@/lib/supabase";

export async function createMessage({
  sender_id,
  receiver_id,
  listing_id,
  message,
}: {
  sender_id: string;
  receiver_id: string;
  listing_id: string;
  message: string;
}) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      sender_id,
      receiver_id,
      listing_id,
      message,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getMessagesByListing(
  listing_id: string
) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("listing_id", listing_id)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}