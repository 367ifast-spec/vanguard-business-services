"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";


export async function createService(
  formData: FormData
) {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }


  const title = String(
    formData.get("title") ?? ""
  ).trim();

  const slug = String(
    formData.get("slug") ?? ""
  ).trim();


  const category_id = String(
    formData.get("category_id") ?? ""
  ).trim();


  const price = Number(
    formData.get("price") ?? 0
  );


  const short_description = String(
    formData.get("short_description") ?? ""
  ).trim();


  const description = String(
    formData.get("description") ?? ""
  ).trim();


  const image_url = String(
    formData.get("image_url") ?? ""
  ).trim();


  const is_featured =
    formData.get("is_featured") === "on";


  const is_active =
    formData.get("is_active") === "on";


  if (!title) {
    throw new Error(
      "Service title is required."
    );
  }


  if (!slug) {
    throw new Error(
      "Service slug is required."
    );
  }


  const { data: existing } =
    await supabaseAdmin
      .from("services")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();


  if (existing) {
    throw new Error(
      "Slug already exists."
    );
  }


  const { error } =
    await supabaseAdmin
      .from("services")
      .insert({
        title,
        slug,
        category_id:
          category_id || null,
        price,
        short_description,
        description,
        image_url,
        is_featured,
        is_active,
      });


  if (error) {
    throw new Error(
      error.message
    );
  }


  revalidatePath(
    "/admin/services"
  );

  redirect(
    "/admin/services"
  );
}



export async function updateService(
  id: string,
  formData: FormData
) {
  if (!supabaseAdmin) {
    throw new Error(
      "Supabase is not configured."
    );
  }


  const title = String(
    formData.get("title") ?? ""
  ).trim();


  const slug = String(
    formData.get("slug") ?? ""
  ).trim();


  const category_id = String(
    formData.get("category_id") ?? ""
  ).trim();


  const price = Number(
    formData.get("price") ?? 0
  );


  const short_description = String(
    formData.get("short_description") ?? ""
  ).trim();


  const description = String(
    formData.get("description") ?? ""
  ).trim();


  const image_url = String(
    formData.get("image_url") ?? ""
  ).trim();


  const is_featured =
    formData.get("is_featured") === "on";


  const is_active =
    formData.get("is_active") === "on";


  const { error } =
    await supabaseAdmin
      .from("services")
      .update({
        title,
        slug,
        category_id:
          category_id || null,
        price,
        short_description,
        description,
        image_url,
        is_featured,
        is_active,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id);


  if (error) {
    throw new Error(
      error.message
    );
  }


  revalidatePath(
    "/admin/services"
  );

  redirect(
    "/admin/services"
  );
}



export async function deleteService(
  id: string
) {
  if (!supabaseAdmin) {
    throw new Error(
      "Supabase is not configured."
    );
  }


  const { error } =
    await supabaseAdmin
      .from("services")
      .delete()
      .eq("id", id);


  if (error) {
    throw new Error(
      error.message
    );
  }


  revalidatePath(
    "/admin/services"
  );
}