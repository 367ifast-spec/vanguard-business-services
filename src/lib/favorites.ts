import { supabase } from "@/lib/supabase";

export async function addFavorite(
  user_id: string,
  listing_id: string
) {
  const { data, error } = await supabase
    .from("favorites")
    .insert({
      user_id,
      listing_id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getFavorites(
  user_id: string
) {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    throw error;
  }

  return data;
}