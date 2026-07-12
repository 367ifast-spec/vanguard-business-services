"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";

export async function addToCart(
  sessionId: string,
  serviceId: string
) {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const { data: existing } = await supabaseAdmin
    .from("cart_items")
    .select("id, quantity")
    .eq("session_id", sessionId)
    .eq("service_id", serviceId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabaseAdmin
      .from("cart_items")
      .update({
        quantity: existing.quantity + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    const { error } = await supabaseAdmin
      .from("cart_items")
      .insert({
        session_id: sessionId,
        service_id: serviceId,
        quantity: 1,
      });

    if (error) {
      throw new Error(error.message);
    }
  }

  revalidatePath("/cart");
}

export async function getCartItems(
  sessionId: string
) {
  if (!supabaseAdmin) {
    return [];
  }

  const { data, error } = await supabaseAdmin
    .from("cart_items")
    .select(`
      id,
      quantity,
      services (
        id,
        title,
        slug,
        price,
        image_url
      )
    `)
    .eq("session_id", sessionId);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function updateCartQuantity(
  id: string,
  quantity: number
) {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  if (quantity <= 0) {
    await removeCartItem(id);
    return;
  }

  const { error } = await supabaseAdmin
    .from("cart_items")
    .update({
      quantity,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/cart");
}

export async function removeCartItem(
  id: string
) {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabaseAdmin
    .from("cart_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/cart");
}

export async function clearCart(
  sessionId: string
) {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabaseAdmin
    .from("cart_items")
    .delete()
    .eq("session_id", sessionId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/cart");
}