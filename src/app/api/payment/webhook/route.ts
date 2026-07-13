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
      outcome_amount,
      outcome_currency,
    } = payload;


    if (
      !payment_id ||
      !payment_status ||
      !order_id
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid webhook payload.",
        },
        {
          status: 400,
        }
      );
    }


    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Supabase is not configured.",
        },
        {
          status: 500,
        }
      );
    }


    const {
      error: paymentError,
    } =
      await supabaseAdmin
        .from("payments")
        .update({
          payment_id,

          payment_status,

          pay_amount,

          pay_currency,

          price_amount,

          price_currency,

          actually_paid,

          actually_paid_at_fiat,

          outcome_amount,

          outcome_currency,

        })
        .eq(
          "order_id",
          order_id
        );


    if (paymentError) {
      console.error(
        "Payment update error:",
        paymentError
      );
    }



    const isPaid =
      payment_status === "confirmed" ||
      payment_status === "finished";



    const orderUpdate = isPaid
      ? {
          payment_status: "paid",
          status: "completed",
        }
      : {
          payment_status,
        };



    const {
      error: orderError,
    } =
      await supabaseAdmin
        .from("orders")
        .update(orderUpdate)
        .eq(
          "id",
          order_id
        );


    if (orderError) {
      console.error(
        "Order update error:",
        orderError
      );
    }



    return NextResponse.json(
      {
        success: true,

        received: true,

        payment_id,

        payment_status,

        order_id,

        message:
          "Webhook processed successfully.",
      },
      {
        status: 200,
      }
    );


  } catch (error) {

    console.error(
      "Webhook Error:",
      error
    );


    return NextResponse.json(
      {
        success: false,

        message:
          "Webhook processing failed.",
      },
      {
        status: 500,
      }
    );

  }
}
