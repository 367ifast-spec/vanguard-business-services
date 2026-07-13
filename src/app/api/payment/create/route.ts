import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const NOWPAYMENTS_API = "https://api.nowpayments.io/v1/invoice";

export async function POST(req: NextRequest) {
  try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error: "Supabase is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required." },
        { status: 400 }
      );
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    if (
      order.payment_status === "paid" ||
      order.status === "paid"
    ) {
      return NextResponse.json(
        { error: "Order already paid." },
        { status: 400 }
      );
    }

    const { data: items } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    const description =
      items && items.length
        ? items
            .map(
              (item) =>
                `${item.service_title} x${item.quantity}`
            )
            .join(", ")
        : `Order ${orderId}`;

    const payload = {
      price_amount: Number(order.total_amount),
      price_currency: "USD",
      order_id: order.id,
      order_description: description,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/webhook`,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?order=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel?order=${order.id}`,
    };

    const response = await fetch(NOWPAYMENTS_API, {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const invoice = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            invoice.message ||
            invoice.error ||
            "NOWPayments error.",
        },
        { status: 500 }
      );
    }

    await supabase
      .from("orders")
      .update({
        nowpayments_payment_id:
          invoice.payment_id?.toString() ?? null,
        nowpayments_order_id:
          invoice.order_id?.toString() ?? null,
      })
      .eq("id", order.id);

    await supabase.from("payments").insert({
      payment_id: invoice.payment_id?.toString() ?? null,
      order_id: order.id,
      service: description,
      amount: Number(order.total_amount),
      currency: "USD",
      payment_status:
        invoice.payment_status ??
        invoice.invoice_status ??
        "waiting",
      invoice_url:
        invoice.invoice_url ??
        invoice.invoice_url_string ??
        null,
      pay_address: invoice.pay_address ?? null,
      pay_amount: invoice.pay_amount ?? null,
      pay_currency: invoice.pay_currency ?? null,
      price_amount: invoice.price_amount ?? Number(order.total_amount),
      price_currency: invoice.price_currency ?? "USD",
      actually_paid: invoice.actually_paid ?? 0,
      actually_paid_at_fiat:
        invoice.actually_paid_at_fiat ?? 0,
      outcome_amount: invoice.outcome_amount ?? 0,
      outcome_currency: invoice.outcome_currency ?? null,
    });

    return NextResponse.json({
      success: true,
      paymentUrl:
        invoice.invoice_url ??
        invoice.invoice_url_string,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}