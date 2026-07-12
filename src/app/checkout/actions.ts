"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { getCartSessionId } from "@/lib/cart-session";
import { clearCart } from "@/app/cart/actions";

export async function createOrder(formData: FormData) {
  if (!supabaseAdmin) {
    throw new Error("Supabase service role is not configured.");
  }
const sessionId = await getCartSessionId();

if (!sessionId) {
  throw new Error("Cart session not found.");
}

const { data: cartItems, error: cartError } = await supabaseAdmin
  .from("cart_items")
  .select(`
    quantity,
    services (
      id,
      title,
      price
    )
  `)
  .eq("session_id", sessionId);

if (cartError) {
  throw new Error(cartError.message);
}

if (!cartItems || cartItems.length === 0) {
  throw new Error("Your cart is empty.");
}
  const customerName = String(
    formData.get("full_name") ?? ""
  ).trim();

  const customerEmail = String(
    formData.get("email") ?? ""
  ).trim();

  const customerWhatsapp = String(
    formData.get("whatsapp") ?? ""
  ).trim();

  const customerCountry = String(
    formData.get("country") ?? ""
  ).trim();

  const companyName = String(
    formData.get("company_name") ?? ""
  ).trim();

  const notes = String(
    formData.get("order_notes") ?? ""
  ).trim();

  const paymentMethod = String(
    formData.get("payment_method") ?? "crypto"
  );

  if (!customerName) {
    throw new Error("Full name is required.");
  }

  if (!customerEmail) {
    throw new Error("Email is required.");
  }

  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .insert({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_whatsapp: customerWhatsapp || null,
      customer_country: customerCountry || null,
      company_name: companyName || null,
      notes: notes || null,
      payment_method: paymentMethod,
      payment_status: "pending",
      status: "pending",
      total_amount: 0,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
let totalAmount = 0;

for (const item of cartItems) {
  const service = Array.isArray(item.services)
    ? item.services[0]
    : item.services;

  if (!service) continue;

  const unitPrice = Number(service.price ?? 0);
  const quantity = Number(item.quantity ?? 1);
  const totalPrice = unitPrice * quantity;

  totalAmount += totalPrice;

  const { error: itemError } = await supabaseAdmin
    .from("order_items")
    .insert({
      order_id: order.id,
      service_id: service.id,
      service_title: service.title,
      unit_price: unitPrice,
      quantity,
      total_price: totalPrice,
    });

  if (itemError) {
    throw new Error(itemError.message);
  }
}
  revalidatePath("/admin/orders");
await supabaseAdmin
  .from("orders")
  .update({
    total_amount: totalAmount,
  })
  .eq("id", order.id);

await clearCart();
  redirect(`/payment?order=${order.id}`);
}