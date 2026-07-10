import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    console.log("========== NOWPayments Webhook ==========");
    console.log(payload);
    console.log("=========================================");

    const {
      payment_id,
      payment_status,
      order_id,
      pay_amount,
      pay_currency,
      price_amount,
      price_currency,
      actually_paid,
      actually_paid_at_fiat,
      purchase_id,
      outcome_amount,
      outcome_currency,
    } = payload;

    // এখানে ভবিষ্যতে Database update করতে পারবে
    // Example:
    // - Update order status
    // - Send confirmation email
    // - Notify Telegram
    // - Generate invoice
    // - Unlock client dashboard

    return NextResponse.json(
      {
        success: true,
        received: true,
        payment_id,
        payment_status,
        order_id,
        pay_amount,
        pay_currency,
        price_amount,
        price_currency,
        actually_paid,
        actually_paid_at_fiat,
        purchase_id,
        outcome_amount,
        outcome_currency,
        message: "Webhook received successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Webhook Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Webhook processing failed.",
      },
      {
        status: 500,
      }
    );
  }
}