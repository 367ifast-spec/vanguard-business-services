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
    const objectValue =
      value as Record<string, unknown>;

    return Object.keys(objectValue)
      .sort()
      .reduce<Record<string, unknown>>(
        (result, key) => {
          result[key] =
            sortObject(objectValue[key]);

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
  const sortedPayload =
    sortObject(payload);

  const message =
    JSON.stringify(sortedPayload);

  const expectedSignature =
    crypto
      .createHmac("sha512", secret)
      .update(message)
      .digest("hex");

  const receivedBuffer =
    Buffer.from(
      signature.trim().toLowerCase(),
      "utf8"
    );

  const expectedBuffer =
    Buffer.from(
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

function isPaidStatus(
  paymentStatus: string
) {
  return (
    paymentStatus === "confirmed" ||
    paymentStatus === "finished"
  );
}

export async function POST(
  req: NextRequest
) {
  try {
    /*
     * ------------------------------------------------
     * 1. Verify webhook configuration
     * ------------------------------------------------
     */

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

    /*
     * ------------------------------------------------
     * 2. Verify NOWPayments signature
     * ------------------------------------------------
     */

    const signature =
      req.headers.get(
        "x-nowpayments-sig"
      );

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

    /*
     * ------------------------------------------------
     * 3. Read webhook payload
     * ------------------------------------------------
     */

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
      typeof payment_status !==
        "string" ||
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

    const externalPaymentId =
      String(payment_id);

    const paid =
      isPaidStatus(payment_status);

    /*
     * ------------------------------------------------
     * 4. First check whether order_id is an internal
     *    payments.id.
     *
     * Package payments use:
     *
     * NOWPayments order_id = payments.id
     * ------------------------------------------------
     */

    const {
      data: internalPayment,
      error: internalPaymentError,
    } = await supabaseAdmin
      .from("payments")
      .select(
        `
          id,
          order_id,
          payment_id,
          payment_type,
          seller_id,
          package_id,
          amount,
          payment_status
        `
      )
      .eq("id", order_id)
      .maybeSingle();

    if (internalPaymentError) {
      console.error(
        "Internal payment lookup error:",
        internalPaymentError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to verify payment.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ------------------------------------------------
     * 5. PACKAGE PAYMENT FLOW
     * ------------------------------------------------
     */

    if (
      internalPayment &&
      internalPayment.payment_type ===
        "package"
    ) {
      if (
        !internalPayment.seller_id ||
        !internalPayment.package_id
      ) {
        console.error(
          "Package payment is missing seller/package:",
          internalPayment
        );

        return NextResponse.json(
          {
            success: false,
            message:
              "Package payment configuration is invalid.",
          },
          {
            status: 500,
          }
        );
      }

      /*
       * Update internal payment row.
       */

      const {
        error: packagePaymentUpdateError,
      } = await supabaseAdmin
        .from("payments")
        .update({
          payment_id:
            externalPaymentId,

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
            actually_paid_at_fiat ??
            null,

          outcome_amount:
            outcome_amount ?? null,

          outcome_currency:
            outcome_currency ?? null,
        })
        .eq("id", internalPayment.id);

      if (
        packagePaymentUpdateError
      ) {
        console.error(
          "Package payment update error:",
          packagePaymentUpdateError
        );

        return NextResponse.json(
          {
            success: false,
            message:
              "Unable to update package payment.",
          },
          {
            status: 500,
          }
        );
      }

      /*
       * Waiting / confirming / failed / expired
       * statuses should NOT activate package.
       */

      if (!paid) {
        console.log(
          "Package payment webhook processed without activation:",
          {
            payment_id:
              externalPaymentId,
            payment_status,
            internal_payment_id:
              internalPayment.id,
          }
        );

        return NextResponse.json(
          {
            success: true,
            received: true,
            payment_id:
              externalPaymentId,
            payment_status,
            order_id,
            payment_type:
              "package",
            activated: false,
            message:
              "Package payment status updated.",
          },
          {
            status: 200,
          }
        );
      }

      /*
       * ------------------------------------------------
       * 6. Idempotency
       *
       * If this exact internal payment already
       * activated a subscription, do not insert
       * another one.
       * ------------------------------------------------
       */

      const {
        data: existingSubscription,
        error:
          existingSubscriptionError,
      } = await supabaseAdmin
        .from("seller_subscriptions")
        .select(
          `
            id,
            seller_id,
            package_id,
            status,
            payment_id
          `
        )
        .eq(
          "payment_id",
          internalPayment.id
        )
        .maybeSingle();

      if (
        existingSubscriptionError
      ) {
        console.error(
          "Package subscription lookup error:",
          existingSubscriptionError
        );

        return NextResponse.json(
          {
            success: false,
            message:
              "Unable to verify package subscription.",
          },
          {
            status: 500,
          }
        );
      }

      if (existingSubscription) {
        console.log(
          "Package subscription already activated:",
          {
            subscription_id:
              existingSubscription.id,
            payment_id:
              internalPayment.id,
          }
        );

        return NextResponse.json(
          {
            success: true,
            received: true,
            payment_id:
              externalPaymentId,
            payment_status,
            order_id,
            payment_type:
              "package",
            activated: true,
            duplicate: true,
            subscriptionId:
              existingSubscription.id,
            message:
              "Package subscription was already activated.",
          },
          {
            status: 200,
          }
        );
      }

      /*
       * ------------------------------------------------
       * 7. Cancel any previous active subscription.
       *
       * Normally checkout blocks buying while one is
       * active. This is additional protection against
       * duplicate active rows / race conditions.
       * ------------------------------------------------
       */

      const {
        error:
          cancelPreviousError,
      } = await supabaseAdmin
        .from("seller_subscriptions")
        .update({
          status: "cancelled",
          updated_at:
            new Date().toISOString(),
        })
        .eq(
          "seller_id",
          internalPayment.seller_id
        )
        .eq("status", "active");

      if (cancelPreviousError) {
        console.error(
          "Previous subscription cancel error:",
          cancelPreviousError
        );

        return NextResponse.json(
          {
            success: false,
            message:
              "Unable to prepare package activation.",
          },
          {
            status: 500,
          }
        );
      }

      /*
       * ------------------------------------------------
       * 8. Activate seller package
       * ------------------------------------------------
       */

      const amountPaid =
        actually_paid_at_fiat !==
          undefined &&
        actually_paid_at_fiat !== null
          ? Number(
              actually_paid_at_fiat
            )
          : price_amount !== undefined &&
              price_amount !== null
            ? Number(price_amount)
            : Number(
                internalPayment.amount ??
                  0
              );

      const safeAmountPaid =
        Number.isFinite(amountPaid)
          ? amountPaid
          : Number(
              internalPayment.amount ??
                0
            );

      const {
        data: newSubscription,
        error:
          subscriptionInsertError,
      } = await supabaseAdmin
        .from("seller_subscriptions")
        .insert({
          seller_id:
            internalPayment.seller_id,

          package_id:
            internalPayment.package_id,

          status: "active",

          payment_id:
            internalPayment.id,

          amount_paid:
            safeAmountPaid,

          auto_renew: false,

          updated_at:
            new Date().toISOString(),
        })
        .select("id")
        .single();

      if (
        subscriptionInsertError ||
        !newSubscription
      ) {
        console.error(
          "Package subscription activation error:",
          subscriptionInsertError
        );

        return NextResponse.json(
          {
            success: false,
            message:
              "Payment confirmed, but package activation failed.",
          },
          {
            status: 500,
          }
        );
      }

      console.log(
        "Seller package activated:",
        {
          seller_id:
            internalPayment.seller_id,
          package_id:
            internalPayment.package_id,
          payment_id:
            internalPayment.id,
          subscription_id:
            newSubscription.id,
        }
      );

      return NextResponse.json(
        {
          success: true,
          received: true,
          payment_id:
            externalPaymentId,
          payment_status,
          order_id,
          payment_type:
            "package",
          activated: true,
          subscriptionId:
            newSubscription.id,
          message:
            "Seller package activated successfully.",
        },
        {
          status: 200,
        }
      );
    }

    /*
     * ------------------------------------------------
     * 9. NORMAL ORDER PAYMENT FLOW
     *
     * Normal orders use:
     *
     * NOWPayments order_id = orders.id
     * ------------------------------------------------
     */

    const {
      data: order,
      error: orderLookupError,
    } = await supabaseAdmin
      .from("orders")
      .select(
        `
          id,
          payment_status,
          status
        `
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
            "Payment reference not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Update payment belonging to normal order.
     */

    const {
      error: paymentError,
    } = await supabaseAdmin
      .from("payments")
      .update({
        payment_id:
          externalPaymentId,

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
          actually_paid_at_fiat ??
          null,

        outcome_amount:
          outcome_amount ?? null,

        outcome_currency:
          outcome_currency ?? null,
      })
      .eq("order_id", order.id)
      .eq("payment_type", "order");

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

    /*
     * Update normal order.
     */

    const orderUpdate =
      paid
        ? {
            payment_status:
              "paid",
            status:
              "processing",
          }
        : {
            payment_status,
          };

    const {
      error: orderError,
    } = await supabaseAdmin
      .from("orders")
      .update(orderUpdate)
      .eq("id", order.id);

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
      "NOWPayments order webhook processed:",
      {
        payment_id:
          externalPaymentId,
        payment_status,
        order_id,
      }
    );

    return NextResponse.json(
      {
        success: true,
        received: true,
        payment_id:
          externalPaymentId,
        payment_status,
        order_id,
        payment_type:
          "order",
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