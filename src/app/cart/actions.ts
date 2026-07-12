"use server";

import { revalidatePath } from "next/cache";
import { getCartSessionId } from "@/lib/cart-session";
import { supabaseAdmin } from "@/lib/supabase";

export async function addToCart(serviceId: string) {
  const sessionId = await getCartSessionId();

  if (!sessionId) {
    throw new Error("Unable to create cart session.");
  }

  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = supabaseAdmin;

  const { data: existing } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("session_id", sessionId)
    .eq("service_id", serviceId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
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
    const { error } = await supabase
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

export async function getCartItems() {
  const sessionId = await getCartSessionId();

  if (!sessionId) {
    return [];
  }

  if (!supabaseAdmin) {
    return [];
  }

  const supabase = supabaseAdmin;

  const { data, error } = await supabase
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

  const supabase = supabaseAdmin;

  if (quantity <= 0) {
    await removeCartItem(id);
    return;
  }

  const { error } = await supabase
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

export async function removeCartItem(id: string) {
  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = supabaseAdmin;

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/cart");
}

export async function clearCart() {
  const sessionId = await getCartSessionId();

  if (!sessionId) {
    return;
  }

  if (!supabaseAdmin) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = supabaseAdmin;

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("session_id", sessionId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/cart");
}