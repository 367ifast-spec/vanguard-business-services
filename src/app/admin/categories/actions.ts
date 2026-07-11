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

  if (!name) {
    throw new Error("Category name is required.");
  }

  if (!slug) {
    throw new Error("Category slug is required.");
  }

  // Check duplicate slug
  const { data: existingCategory } = await supabaseAdmin
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existingCategory) {
    throw new Error("This slug already exists.");
  }

  // Insert category
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