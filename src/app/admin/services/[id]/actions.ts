"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";

export async function updateService(
  id: string,
  formData: FormData
) {
  if (!supabaseAdmin) {
    throw new Error("Supabase service role is not configured.");
  }

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();

  const categoryId =
    String(formData.get("category_id") ?? "").trim() || null;

  const shortDescription =
    String(formData.get("short_description") ?? "").trim() || null;

  const description =
    String(formData.get("description") ?? "").trim() || null;

  const imageUrl =
    String(formData.get("image_url") ?? "").trim() || null;

  const price = Number(formData.get("price") ?? 0);

  const sortOrder = Number(formData.get("sort_order") ?? 0);

  const isFeatured = formData.get("is_featured") === "on";
  const isActive = formData.get("is_active") !== null;

  if (!title) {
    throw new Error("Title is required.");
  }

  if (!slug) {
    throw new Error("Slug is required.");
  }

  const { error } = await supabaseAdmin
    .from("services")
    .update({
      title,
      slug,
      category_id: categoryId,
      short_description: shortDescription,
      description,
      image_url: imageUrl,
      price,
      sort_order: sortOrder,
      is_featured: isFeatured,
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${id}`);

  redirect("/admin/services");
}