import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const API_URL = "https://api.nowpayments.io/v1/invoice";

export async function POST(req: NextRequest) {
  console.log("========== PAYMENT CREATE ==========");
console.log("POST /api/payment/create called");
  try {
    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    // Environment validation
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "NOWPayments API key is not configured.",
        },
        { status: 500 }
      );
    }

    if (!siteUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "NEXT_PUBLIC_SITE_URL is not configured.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();

    const {
      quote_id,
      price_amount,
      price_currency,
      pay_currency,
      order_id,
      order_description,
    } = body;

    // Validation
    if (
      !quote_id ||
      !price_amount ||
      !price_currency ||
      !pay_currency ||
      !order_id ||
      !order_description
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required payment information.",
        },
        { status: 400 }
      );
    }

    // Create payment
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  price_amount,
  price_currency,
  order_id,
  order_description,

  ipn_callback_url: `${siteUrl}/api/payment/webhook`,
  success_url: `${siteUrl}/payment/success`,
  cancel_url: `${siteUrl}/payment/cancel`,
}),
});

    let data: Record<string, unknown>;

    try {
      data = await response.json();
      console.log("========== NOWPayments Response ==========");
console.dir(data, { depth: null });
console.log("========== INVOICE RESPONSE ==========");
console.dir(data, { depth: null });
    } catch {
      return NextResponse.json(

        {
          success: false,
          message: "Invalid response received from NOWPayments.",
        },
        { status: 502 }
      );
    }

    if (!response.ok) {
      console.error("NOWPayments API Error:", data);
const { error: updateError } = await supabase
  .from("payments")
  .update({
    payment_id: data.payment_id,
    order_id: data.order_id,
    payment_status: data.payment_status,
    invoice_url: data.invoice_url,
    pay_address: data.pay_address,
    pay_amount: data.pay_amount,
    pay_currency: data.pay_currency,
  })
  .eq("quote_id", quote_id);

if (updateError) {
  console.error("Payment Update Error:", updateError);

  return NextResponse.json(
    {
      success: false,
      message: "Unable to update payment record.",
    },
    {
      status: 500,
    }
  );
}
      return NextResponse.json(
        {
          success: false,
          message:
            typeof data.message === "string"
              ? data.message
              : "Unable to create payment.",
          provider: data,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
  success: true,
  quote_id,

  invoice_id: data.id,
  invoice_url: data.invoice_url,

  order_id: data.order_id,

  provider: data,
});
  } catch (error) {
    console.error("Payment Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Payment creation failed.",
      },
      {
        status: 500,
      }
    );
  }
}