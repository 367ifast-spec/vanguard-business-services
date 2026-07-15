"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getCartSessionId } from "@/lib/cart-session";
import { supabaseAdmin } from "@/lib/supabase";

export async function addToCart(serviceId: string) {
  const sessionId = await getCartSessionId();

  if (!sessionId) {
    throw new Error(
      "Cart session not found. Please refresh the page and try again."
    );
  }
const cookieStore = await cookies();

cookieStore.set("cart_session", sessionId, {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
});
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
  console.error("CART INSERT ERROR:", error);

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

export async function getCartItems() {
  const sessionId = await getCartSessionId();

  if (!sessionId || !supabaseAdmin) {
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

export async function getCartCount() {
  const sessionId = await getCartSessionId();

  if (!sessionId || !supabaseAdmin) {
    return 0;
  }

  const { data, error } = await supabaseAdmin
    .from("cart_items")
    .select("quantity")
    .eq("session_id", sessionId);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).reduce(
    (total, item) => total + Number(item.quantity ?? 0),
    0
  );
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

export async function removeCartItem(id: string) {
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

export async function clearCart() {
  const sessionId = await getCartSessionId();

  if (!sessionId || !supabaseAdmin) {
    return;
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