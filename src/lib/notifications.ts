import { supabase } from "@/lib/supabase";

export async function createNotification({
  user_id,
  title,
}: {
  user_id: string;
  title: string;
}) {
  const { data, error } = await supabase
    .from("notifications")
    .insert({
      user_id,
      title,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getNotifications(
  user_id: string
) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}