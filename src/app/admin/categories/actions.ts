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

  if (!name || !slug) {
    throw new Error("Name and Slug are required.");
  }

  const { error } = await supabaseAdmin
    .from("service_categories")
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