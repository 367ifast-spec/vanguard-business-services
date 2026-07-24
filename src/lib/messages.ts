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
    .from("marketplace_messages")
    .insert({
      sender_id,
      receiver_id,
      listing_id,
      message,
    })
    .select()
    .single();

  if (error) {
    console.error("CREATE MESSAGE ERROR:", error);
    throw error;
  }

  return data;
}

export async function getMessagesByListing(
  listing_id: string
) {
  const { data, error } = await supabase
    .from("marketplace_messages")
    .select("*")
    .eq("listing_id", listing_id)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.error("GET MESSAGES ERROR:", error);
    throw error;
  }

  return data;
}

export async function getMessages() {
  const { data, error } = await supabase
    .from("marketplace_messages")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("GET ALL MESSAGES ERROR:", error);
    throw error;
  }

  return data;
}

export async function getMessageById(id: string) {
  const { data, error } = await supabase
    .from("marketplace_messages")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("GET MESSAGE BY ID ERROR:", error);
    throw error;
  }

  return data;
}