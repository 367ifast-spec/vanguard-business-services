"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";

export async function createCategory(formData: FormData) {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name) throw new Error("Category name is required.");
  if (!slug) throw new Error("Category slug is required.");

  const { data: existing } = await supabaseAdmin
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    throw new Error("Slug already exists.");
  }

  const { error } = await supabaseAdmin
    .from("categories")
    .insert({
      name,
      slug,
      description,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(
  id: string,
  formData: FormData
) {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const is_active = formData.get("is_active") === "on";

  if (!name) throw new Error("Category name is required.");
  if (!slug) throw new Error("Category slug is required.");

  const { data: duplicate } = await supabaseAdmin
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .neq("id", id)
    .maybeSingle();

  if (duplicate) {
    throw new Error("Slug already exists.");
  }

  const { error } = await supabaseAdmin
    .from("categories")
    .update({
      name,
      slug,
      description,
      is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}