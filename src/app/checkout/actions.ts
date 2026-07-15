"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/lib/supabase";
import { getCartSessionId } from "@/lib/cart-session";


export async function createOrder(formData: FormData) {

  if (!supabaseAdmin) {
    throw new Error(
      "Supabase service role is not configured."
    );
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
    throw new Error(
      "Full name is required."
    );
  }


  if (!customerEmail) {
    throw new Error(
      "Email is required."
    );
  }


  const sessionId =
    await getCartSessionId();


  if (!sessionId) {
    throw new Error(
      "Cart session not found."
    );
  }


  const {
    data: cartItems,
    error: cartError,
  } = await supabaseAdmin
    .from("cart_items")
    .select(
      `
        quantity,
        services (
          id,
          title,
          price
        )
      `
    )
    .eq(
      "session_id",
      sessionId
    );


  if (cartError) {
    throw new Error(
      cartError.message
    );
  }


  if (!cartItems || cartItems.length === 0) {
    throw new Error(
      "Your cart is empty."
    );
  }


  let customerId: string;


  const {
    data: existingCustomer,
  } = await supabaseAdmin
    .from("customers")
    .select(
      "id"
    )
    .eq(
      "email",
      customerEmail
    )
    .maybeSingle();


  if (existingCustomer) {

    customerId =
      existingCustomer.id;

  } else {

    const {
      data: newCustomer,
      error: customerError,
    } =
      await supabaseAdmin
        .from("customers")
        .insert({
          full_name: customerName,
          email: customerEmail,
          phone:
            customerWhatsapp || null,
          country:
            customerCountry || null,
          total_orders: 0,
          total_spent: 0,
        })
        .select("id")
        .single();


    if (customerError) {
      throw new Error(
        customerError.message
      );
    }


    customerId =
      newCustomer.id;
  }
    const {
    data: order,
    error: orderError,
  } = await supabaseAdmin
    .from("orders")
    .insert({
      customer_id: customerId,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_whatsapp:
        customerWhatsapp || null,
      customer_country:
        customerCountry || null,
      company_name:
        companyName || null,
      notes:
        notes || null,
      payment_method:
        paymentMethod,
      payment_status:
        "pending",
      status:
        "pending",
      total_amount:
        0,
    })
    .select()
    .single();


  if (orderError) {
    throw new Error(
      orderError.message
    );
  }


  let totalAmount = 0;


  for (const item of cartItems) {

    const service = Array.isArray(
      item.services
    )
      ? item.services[0]
      : item.services;


    if (!service) {
      continue;
    }


    const unitPrice =
      Number(service.price ?? 0);


    const quantity =
      Number(item.quantity ?? 1);


    const totalPrice =
      unitPrice * quantity;


    totalAmount += totalPrice;


    const {
      error: itemError,
    } =
      await supabaseAdmin
        .from("order_items")
        .insert({
          order_id:
            order.id,

          service_id:
            service.id,

          service_title:
            service.title,

          unit_price:
            unitPrice,

          quantity,

          total_price:
            totalPrice,
        });


    if (itemError) {
      throw new Error(
        itemError.message
      );
    }
  }


  const {
    error: updateError,
  } =
    await supabaseAdmin
      .from("orders")
      .update({
        total_amount:
          totalAmount,
      })
      .eq(
        "id",
        order.id
      );


  if (updateError) {
    throw new Error(
      updateError.message
    );
  }


await supabaseAdmin.rpc(
  "increment_customer_stats",
  {
    p_customer_id: customerId,
    p_amount: totalAmount,
  }
);

revalidatePath(
  "/admin/orders"
);

await supabaseAdmin
  .from("cart_items")
  .delete()
  .eq("session_id", sessionId);

revalidatePath("/cart");

redirect(
  `/payment?order=${order.id}`
);
}