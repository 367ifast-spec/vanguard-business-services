import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.nowpayments.io/v1/payment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      price_amount,
      price_currency,
      pay_currency,
      order_id,
      order_description,
    } = body;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount,
        price_currency,
        pay_currency,
        order_id,
        order_description,
        ipn_callback_url:
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/webhook`,
        success_url:
          `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success`,
        cancel_url:
          `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`,
      }),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("NOWPayments Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Payment creation failed",
      },
      {
        status: 500,
      }
    );
  }
}