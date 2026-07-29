import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabase";
import {
  getClientIp,
  rateLimit,
} from "@/lib/rate-limit";

const NOWPAYMENTS_API =
  "https://api.nowpayments.io/v1/invoice";

export async function POST(req: NextRequest) {
  try {
    /*
     * ------------------------------------------------
     * 1. Rate limit
     * ------------------------------------------------
     */

    const ip = getClientIp(req.headers);

    const rateLimitResult = rateLimit(
      `seller-package-payment-create:${ip}`,
      10,
      60 * 1000
    );

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error:
            "Too many requests. Please try again in a minute.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(
              (rateLimitResult.resetAt - Date.now()) /
                1000
            ).toString(),
          },
        }
      );
    }

    /*
     * ------------------------------------------------
     * 2. Environment configuration
     * ------------------------------------------------
     */

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const nowPaymentsKey =
      process.env.NOWPAYMENTS_API_KEY;

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          error:
            "Supabase authentication is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          error:
            "Supabase admin client is not configured.",
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

    /*
     * ------------------------------------------------
     * 3. Authenticate seller using Supabase cookies
     * ------------------------------------------------
     */

    const cookieStore = await cookies();

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },

          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(
                ({ name, value, options }) => {
                  cookieStore.set(
                    name,
                    value,
                    options
                  );
                }
              );
            } catch {
              /*
               * Cookie writes are not required here.
               */
            }
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error:
            "You must be logged in as a seller to purchase a package.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * ------------------------------------------------
     * 4. Parse package slug
     * ------------------------------------------------
     */

    const body = await req.json();

    const packageSlug =
      typeof body?.packageSlug === "string"
        ? body.packageSlug.trim().toLowerCase()
        : "";

    if (!packageSlug) {
      return NextResponse.json(
        {
          error: "Package slug is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ------------------------------------------------
     * 5. Load package from DB
     *
     * Never trust price sent by browser.
     * ------------------------------------------------
     */

    const {
      data: sellerPackage,
      error: packageError,
    } = await supabaseAdmin
      .from("seller_packages")
      .select(
        `
          id,
          name,
          slug,
          price_usd,
          listing_limit,
          is_unlimited,
          is_active
        `
      )
      .eq("slug", packageSlug)
      .eq("is_active", true)
      .maybeSingle();

    if (packageError) {
      console.error(
        "PACKAGE PAYMENT LOOKUP ERROR:",
        packageError
      );

      return NextResponse.json(
        {
          error: "Unable to load seller package.",
        },
        {
          status: 500,
        }
      );
    }

    if (!sellerPackage) {
      return NextResponse.json(
        {
          error:
            "Invalid or inactive package selected.",
        },
        {
          status: 404,
        }
      );
    }

    const price = Number(
      sellerPackage.price_usd
    );

    if (
      !Number.isFinite(price) ||
      price <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "This package does not require paid checkout.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ------------------------------------------------
     * 6. Check active subscription
     * ------------------------------------------------
     */

    const {
      data: activeSubscription,
      error: subscriptionLookupError,
    } = await supabaseAdmin
      .from("seller_subscriptions")
      .select(
        `
          id,
          package_id,
          status
        `
      )
      .eq("seller_id", user.id)
      .eq("status", "active")
      .maybeSingle();

    if (subscriptionLookupError) {
      console.error(
        "ACTIVE SUBSCRIPTION LOOKUP ERROR:",
        subscriptionLookupError
      );

      return NextResponse.json(
        {
          error:
            "Unable to check seller subscription.",
        },
        {
          status: 500,
        }
      );
    }

    if (activeSubscription) {
      console.log(
        "Existing active subscription found; allowing paid package upgrade:",
        {
          subscriptionId: activeSubscription.id,
          currentPackageId: activeSubscription.package_id,
          targetPackageId: sellerPackage.id,
          sellerId: user.id,
        }
      );
    }

    /*
     * ------------------------------------------------
     * 7. Create internal payment reference
     *
     * NOWPayments order_id can be our payments UUID.
     * This lets the webhook locate the package payment
     * without using the normal orders table.
     * ------------------------------------------------
     */

    const {
      data: payment,
      error: paymentInsertError,
    } = await supabaseAdmin
      .from("payments")
      .insert({
        order_id: null,

        payment_type: "package",

        seller_id: user.id,

        package_id: sellerPackage.id,

        service:
          `Seller Package: ${sellerPackage.name}`,

        amount: price,

        currency: "USD",

        payment_status: "creating",

        price_amount: price,

        price_currency: "USD",

        actually_paid: 0,

        actually_paid_at_fiat: 0,

        outcome_amount: 0,
      })
      .select("id")
      .single();

    if (
      paymentInsertError ||
      !payment
    ) {
      console.error(
        "PACKAGE PAYMENT INSERT ERROR:",
        paymentInsertError
      );

      return NextResponse.json(
        {
          error:
            "Unable to create package payment record.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ------------------------------------------------
     * 8. Build NOWPayments invoice
     * ------------------------------------------------
     */

    const description =
      `Vanguard Marketplace ${sellerPackage.name} Seller Package`;

    const callbackUrl =
      `${siteUrl}/api/payment/webhook`;

    const successUrl =
      `${siteUrl}/seller/packages?payment=success`;

    const cancelUrl =
      `${siteUrl}/seller/packages?payment=cancelled`;

    const payload = {
      price_amount: price,

      price_currency: "USD",

      order_id: payment.id,

      order_description: description,

      ipn_callback_url: callbackUrl,

      success_url: successUrl,

      cancel_url: cancelUrl,
    };

    /*
     * ------------------------------------------------
     * 9. Create NOWPayments invoice
     * ------------------------------------------------
     */

    const response = await fetch(
      NOWPAYMENTS_API,
      {
        method: "POST",

        headers: {
          "x-api-key": nowPaymentsKey,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(payload),
      }
    );

    const invoice =
      await response.json();

    if (!response.ok) {
      console.error(
        "NOWPAYMENTS PACKAGE ERROR:",
        invoice
      );

      await supabaseAdmin
        .from("payments")
        .update({
          payment_status: "failed",
        })
        .eq("id", payment.id);

      return NextResponse.json(
        {
          error:
            invoice?.message ??
            invoice?.error ??
            "Unable to create NOWPayments invoice.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * ------------------------------------------------
     * 10. Store NOWPayments invoice data
     * ------------------------------------------------
     */

    const nowPaymentsPaymentId =
      invoice.payment_id !== undefined &&
      invoice.payment_id !== null
        ? String(invoice.payment_id)
        : null;

    const invoiceUrl =
      invoice.invoice_url ??
      invoice.invoice_url_string ??
      null;

    const {
      error: paymentUpdateError,
    } = await supabaseAdmin
      .from("payments")
      .update({
        payment_id:
          nowPaymentsPaymentId,

        payment_status:
          invoice.payment_status ??
          invoice.invoice_status ??
          "waiting",

        invoice_url:
          invoiceUrl,

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
          price,

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
      })
      .eq("id", payment.id);

    if (paymentUpdateError) {
      console.error(
        "PACKAGE PAYMENT UPDATE ERROR:",
        paymentUpdateError
      );

      return NextResponse.json(
        {
          error:
            "Invoice was created but payment record could not be updated.",
        },
        {
          status: 500,
        }
      );
    }

    if (!invoiceUrl) {
      console.error(
        "NOWPayments invoice URL missing:",
        invoice
      );

      return NextResponse.json(
        {
          error:
            "Payment invoice URL was not returned.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * ------------------------------------------------
     * 11. Return checkout URL
     * ------------------------------------------------
     */

    return NextResponse.json({
      success: true,

      requiresPayment: true,

      paymentProvider:
        "nowpayments",

      paymentRecordId:
        payment.id,

      paymentId:
        nowPaymentsPaymentId,

      package: {
        id: sellerPackage.id,

        name: sellerPackage.name,

        slug: sellerPackage.slug,

        price,

        listingLimit:
          sellerPackage.listing_limit,

        isUnlimited:
          sellerPackage.is_unlimited,
      },

      amount: price,

      paymentUrl:
        invoiceUrl,
    });
  } catch (error) {
    console.error(
      "PACKAGE PAYMENT CREATE ERROR:",
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