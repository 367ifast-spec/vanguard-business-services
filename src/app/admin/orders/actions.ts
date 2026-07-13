"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const VALID_STATUSES = [
  "pending",
  "processing",
  "completed",
  "cancelled",
] as const;

type OrderStatus = (typeof VALID_STATUSES)[number];

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
) {
  if (!orderId) {
    throw new Error("Order ID is required.");
  }

  if (!VALID_STATUSES.includes(status)) {
    throw new Error("Invalid order status.");
  }

  const { error } = await supabase
    .from("orders")
    .update({
      status,
    })
    .eq("id", orderId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);

  return {
    success: true,
  };
}

export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: string
) {
  if (!orderId) {
    throw new Error("Order ID is required.");
  }

  const { error: orderError } = await supabase
    .from("orders")
    .update({
      payment_status: paymentStatus,
    })
    .eq("id", orderId);

  if (orderError) {
    throw new Error(orderError.message);
  }

  const { error: paymentError } = await supabase
    .from("payments")
    .update({
      payment_status: paymentStatus,
    })
    .eq("order_id", orderId);

  if (paymentError) {
    throw new Error(paymentError.message);
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);

  return {
    success: true,
  };
}