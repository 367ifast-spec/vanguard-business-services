import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

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

    if (!payment_id || !payment_status || !order_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid webhook payload.",
        },
        {
          status: 400,
        }
      );
    }

    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from("payments")
        .update({
  payment_status,
  payment_id,

  pay_amount,
  pay_currency,

  price_amount,
  price_currency,

  actually_paid,
  actually_paid_at_fiat,

  outcome_amount,
  outcome_currency,
})
      
        .eq("order_id", order_id);

      if (error) {
        console.error("Supabase Update Error:", error);
      }
    }

    switch (payment_status) {
      case "waiting":
        console.log(`Payment ${order_id} is waiting.`);
        break;

      case "confirming":
        console.log(`Payment ${order_id} is confirming.`);
        break;

      case "confirmed":
      case "finished":
        console.log(`Payment ${order_id} completed.`);
        break;

      case "failed":
      case "expired":
        console.log(`Payment ${order_id} failed or expired.`);
        break;

      default:
        console.log(`Unhandled payment status: ${payment_status}`);
    }

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