import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortObject);
  }

  if (
    value !== null &&
    typeof value === "object"
  ) {
    const objectValue = value as Record<string, unknown>;

    return Object.keys(objectValue)
      .sort()
      .reduce<Record<string, unknown>>(
        (result, key) => {
          result[key] = sortObject(objectValue[key]);
          return result;
        },
        {}
      );
  }

  return value;
}

function verifyNowPaymentsSignature(
  payload: Record<string, unknown>,
  signature: string,
  secret: string
) {
  const sortedPayload = sortObject(payload);

  const message = JSON.stringify(sortedPayload);

  const expectedSignature = crypto
    .createHmac("sha512", secret)
    .update(message)
    .digest("hex");

  const receivedBuffer = Buffer.from(
    signature.trim().toLowerCase(),
    "utf8"
  );

  const expectedBuffer = Buffer.from(
    expectedSignature,
    "utf8"
  );

  if (
    receivedBuffer.length !==
    expectedBuffer.length
  ) {
    return false;
  }

  return crypto.timingSafeEqual(
    receivedBuffer,
    expectedBuffer
  );
}

export async function POST(
  req: NextRequest
) {
  try {
    const ipnSecret =
      process.env.NOWPAYMENTS_IPN_SECRET;

    if (!ipnSecret) {
      console.error(
        "NOWPAYMENTS_IPN_SECRET is missing."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment webhook is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const signature =
      req.headers.get("x-nowpayments-sig");

    if (!signature) {
      console.warn(
        "NOWPayments webhook rejected: missing signature."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Missing webhook signature.",
        },
        {
          status: 401,
        }
      );
    }

    const payload =
      (await req.json()) as Record<
        string,
        unknown
      >;

    const signatureValid =
      verifyNowPaymentsSignature(
        payload,
        signature,
        ipnSecret
      );

    if (!signatureValid) {
      console.warn(
        "NOWPayments webhook rejected: invalid signature."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid webhook signature.",
        },
        {
          status: 401,
        }
      );
    }

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
      payment_id === undefined ||
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

    if (
      typeof payment_status !== "string" ||
      typeof order_id !== "string"
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
      data: order,
      error: orderLookupError,
    } = await supabaseAdmin
      .from("orders")
      .select(
        "id, payment_status, status"
      )
      .eq("id", order_id)
      .maybeSingle();

    if (orderLookupError) {
      console.error(
        "Order lookup error:",
        orderLookupError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to verify order.",
        },
        {
          status: 500,
        }
      );
    }

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    const {
      error: paymentError,
    } = await supabaseAdmin
      .from("payments")
      .update({
        payment_id:
          String(payment_id),

        payment_status,

        pay_amount:
          pay_amount ?? null,

        pay_currency:
          pay_currency ?? null,

        price_amount:
          price_amount ?? null,

        price_currency:
          price_currency ?? null,

        actually_paid:
          actually_paid ?? null,

        actually_paid_at_fiat:
          actually_paid_at_fiat ?? null,

        outcome_amount:
          outcome_amount ?? null,

        outcome_currency:
          outcome_currency ?? null,
      })
      .eq("order_id", order_id);

    if (paymentError) {
      console.error(
        "Payment update error:",
        paymentError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to update payment.",
        },
        {
          status: 500,
        }
      );
    }

    const isPaid =
      payment_status === "confirmed" ||
      payment_status === "finished";

    const orderUpdate = isPaid
      ? {
          payment_status: "paid",
          status: "processing",
        }
      : {
          payment_status,
        };

    const {
      error: orderError,
    } = await supabaseAdmin
      .from("orders")
      .update(orderUpdate)
      .eq("id", order_id);

    if (orderError) {
      console.error(
        "Order update error:",
        orderError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to update order.",
        },
        {
          status: 500,
        }
      );
    }

    console.log(
      "NOWPayments webhook processed:",
      {
        payment_id,
        payment_status,
        order_id,
      }
    );

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