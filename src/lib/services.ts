import { supabaseAdmin } from "@/lib/supabase";

export async function getServiceBySlug(slug: string) {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabaseAdmin
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllServices() {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabaseAdmin
    .from("services")
    .select("*")
    .order("title");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}