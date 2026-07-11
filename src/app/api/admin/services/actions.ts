"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function createService(formData: FormData) {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const title = getString(formData, "title");
  const slug = getString(formData, "slug");
  const category_id = getString(formData, "category_id");
  const short_description = getString(formData, "short_description");
  const description = getString(formData, "description");
  const image_url = getString(formData, "image_url");

  const price = Number(formData.get("price") ?? 0);

  const is_featured = formData.get("is_featured") === "on";
  const is_active = formData.get("is_active") === "on";

  if (!title) throw new Error("Service title is required.");
  if (!slug) throw new Error("Service slug is required.");

  const { data: existing } = await supabaseAdmin
    .from("services")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    throw new Error("Slug already exists.");
  }

  const { error } = await supabaseAdmin
    .from("services")
    .insert({
      title,
      slug,
      category_id: category_id || null,
      short_description,
      description,
      image_url,
      price,
      is_featured,
      is_active,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(
  id: string,
  formData: FormData
) {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const title = getString(formData, "title");
  const slug = getString(formData, "slug");
  const category_id = getString(formData, "category_id");
  const short_description = getString(formData, "short_description");
  const description = getString(formData, "description");
  const image_url = getString(formData, "image_url");

  const price = Number(formData.get("price") ?? 0);

  const is_featured = formData.get("is_featured") === "on";
  const is_active = formData.get("is_active") === "on";

  if (!title) throw new Error("Service title is required.");
  if (!slug) throw new Error("Service slug is required.");

  const { data: duplicate } = await supabaseAdmin
    .from("services")
    .select("id")
    .eq("slug", slug)
    .neq("id", id)
    .maybeSingle();

  if (duplicate) {
    throw new Error("Slug already exists.");
  }

  const { error } = await supabaseAdmin
    .from("services")
    .update({
      title,
      slug,
      category_id: category_id || null,
      short_description,
      description,
      image_url,
      price,
      is_featured,
      is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabaseAdmin
    .from("services")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/services");
}