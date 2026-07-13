import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
const NOWPAYMENTS_API =
  "https://api.nowpayments.io/v1/invoice";


export async function POST(
  req: NextRequest
) {
  try {
const ip = getClientIp(req.headers);

const result = rateLimit(
  `payment-create:${ip}`,
  10,
  60 * 1000
);

if (!result.success) {
  return NextResponse.json(
    {
      error: "Too many requests. Please try again in a minute.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": Math.ceil(
          (result.resetAt - Date.now()) / 1000
        ).toString(),
      },
    }
  );
}
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;


    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;


    const nowPaymentsKey =
      process.env.NOWPAYMENTS_API_KEY;


    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL;



    if (
      !supabaseUrl ||
      !serviceRoleKey
    ) {
      return NextResponse.json(
        {
          error:
            "Supabase is not configured.",
        },
        {
          status: 500,
        }
      );
    }



    if (!nowPaymentsKey) {
      return NextResponse.json(
        {
          error:
            "NOWPayments API key is missing.",
        },
        {
          status: 500,
        }
      );
    }



    if (!siteUrl) {
      return NextResponse.json(
        {
          error:
            "Site URL is not configured.",
        },
        {
          status: 500,
        }
      );
    }



    const supabase =
      createClient(
        supabaseUrl,
        serviceRoleKey,
        {
          auth: {
            autoRefreshToken:
              false,

            persistSession:
              false,
          },
        }
      );



    const body =
      await req.json();


    const orderId =
      body?.orderId;



    if (!orderId) {

      return NextResponse.json(
        {
          error:
            "Order ID is required.",
        },
        {
          status: 400,
        }
      );

    }



    const {
      data: order,
      error: orderError,
    } =
      await supabase
        .from("orders")
        .select("*")
        .eq(
          "id",
          orderId
        )
        .single();



    if (
      orderError ||
      !order
    ) {

      return NextResponse.json(
        {
          error:
            "Order not found.",
        },
        {
          status: 404,
        }
      );

    }



    if (
      order.payment_status === "paid" ||
      order.status === "paid"
    ) {

      return NextResponse.json(
        {
          error:
            "Order already paid.",
        },
        {
          status: 400,
        }
      );

    }



    const {
      data: items,
      error: itemsError,
    } =
      await supabase
        .from("order_items")
        .select("*")
        .eq(
          "order_id",
          orderId
        );


    if (itemsError) {
      throw new Error(
        itemsError.message
      );
    }
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

      price_amount:
        Number(order.total_amount),

      price_currency:
        "USD",

      order_id:
        order.id,

      order_description:
        description,

      ipn_callback_url:
        `${siteUrl}/api/payment/webhook`,

      success_url:
        `${siteUrl}/payment/success?order=${order.id}`,

      cancel_url:
        `${siteUrl}/payment/cancel?order=${order.id}`,

    };



    const response =
      await fetch(
        NOWPAYMENTS_API,
        {
          method:
            "POST",

          headers: {
            "x-api-key":
              nowPaymentsKey,

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              payload
            ),
        }
      );



    const invoice =
      await response.json();



    if (!response.ok) {

      return NextResponse.json(
        {
          error:
            invoice?.message ??
            invoice?.error ??
            "NOWPayments error.",
        },
        {
          status: 500,
        }
      );

    }



    const paymentId =
      invoice.payment_id?.toString() ??
      null;



    await supabase
      .from("orders")
      .update({
        nowpayments_payment_id:
          paymentId,

        nowpayments_order_id:
          invoice.order_id?.toString() ??
          null,
      })
      .eq(
        "id",
        order.id
      );



    const {
      data: existingPayment,
    } =
      await supabase
        .from("payments")
        .select("id")
        .eq(
          "payment_id",
          paymentId
        )
        .maybeSingle();



    if (!existingPayment) {

      await supabase
        .from("payments")
        .insert({

          payment_id:
            paymentId,

          order_id:
            order.id,

          service:
            description,

          amount:
            Number(order.total_amount),

          currency:
            "USD",

          payment_status:
            invoice.payment_status ??
            invoice.invoice_status ??
            "waiting",

          invoice_url:
            invoice.invoice_url ??
            invoice.invoice_url_string ??
            null,

          pay_address:
            invoice.pay_address ??
            null,

          pay_amount:
            invoice.pay_amount ??
            null,

          pay_currency:
            invoice.pay_currency ??
            null,

          price_amount:
            invoice.price_amount ??
            Number(order.total_amount),

          price_currency:
            invoice.price_currency ??
            "USD",

          actually_paid:
            invoice.actually_paid ??
            0,

          actually_paid_at_fiat:
            invoice.actually_paid_at_fiat ??
            0,

          outcome_amount:
            invoice.outcome_amount ??
            0,

          outcome_currency:
            invoice.outcome_currency ??
            null,

        });

    }



    return NextResponse.json({

      success:
        true,

      paymentUrl:
        invoice.invoice_url ??
        invoice.invoice_url_string,

    });


  } catch (error) {


    console.error(
      "Payment create error:",
      error
    );


    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal server error.",
      },
      {
        status: 500,
      }
    );

  }

}