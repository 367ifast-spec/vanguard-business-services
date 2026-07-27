import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    /*
     * ------------------------------------------------
     * 1. Verify Supabase server configuration
     * ------------------------------------------------
     */

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          error: "Supabase authentication is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          error: "Supabase admin client is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ------------------------------------------------
     * 2. Create server Supabase client from cookies
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
               * Cookie updates are not required
               * for this checkout request.
               */
            }
          },
        },
      }
    );

    /*
     * ------------------------------------------------
     * 3. Verify authenticated seller
     * ------------------------------------------------
     */

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
     * 4. Parse request
     * ------------------------------------------------
     */

    const body = await request.json();

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
     * 5. Load package from database
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
          badge_name,
          is_active
        `
      )
      .eq("slug", packageSlug)
      .eq("is_active", true)
      .maybeSingle();

    if (packageError) {
      console.error(
        "PACKAGE LOOKUP ERROR:",
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

    const price =
      Number(sellerPackage.price_usd);

    if (
      !Number.isFinite(price) ||
      price < 0
    ) {
      console.error(
        "INVALID PACKAGE PRICE:",
        sellerPackage
      );

      return NextResponse.json(
        {
          error:
            "Package price configuration is invalid.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * ------------------------------------------------
     * 6. FREE package
     * ------------------------------------------------
     */

    if (price === 0) {
      const {
        data: existingSubscription,
        error: existingError,
      } = await supabaseAdmin
        .from("seller_subscriptions")
        .select("id")
        .eq("seller_id", user.id)
        .eq("status", "active")
        .maybeSingle();

      if (existingError) {
        console.error(
          "SUBSCRIPTION LOOKUP ERROR:",
          existingError
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

      if (existingSubscription) {
        return NextResponse.json(
          {
            error:
              "You already have an active seller subscription.",
          },
          {
            status: 409,
          }
        );
      }

      const {
        error: subscriptionError,
      } = await supabaseAdmin
        .from("seller_subscriptions")
        .insert({
          seller_id: user.id,
          package_id: sellerPackage.id,
          status: "active",
          payment_id: null,
          amount_paid: 0,
          auto_renew: false,
        });

      if (subscriptionError) {
        console.error(
          "FREE SUBSCRIPTION ERROR:",
          subscriptionError
        );

        return NextResponse.json(
          {
            error:
              "Unable to activate the free package.",
          },
          {
            status: 500,
          }
        );
      }

      return NextResponse.json({
        success: true,
        requiresPayment: false,

        package: {
          id: sellerPackage.id,
          name: sellerPackage.name,
          slug: sellerPackage.slug,
          price: price,
          listingLimit:
            sellerPackage.listing_limit,
          isUnlimited:
            sellerPackage.is_unlimited,
        },

        redirectUrl:
          "/seller/dashboard",
      });
    }

    /*
     * ------------------------------------------------
     * 7. Paid package
     *
     * Do NOT activate subscription yet.
     * Payment must be verified first.
     * ------------------------------------------------
     */

    return NextResponse.json({
      success: true,

      requiresPayment: true,

      sellerId: user.id,

      package: {
        id: sellerPackage.id,
        name: sellerPackage.name,
        slug: sellerPackage.slug,
        price: price,
        listingLimit:
          sellerPackage.listing_limit,
        isUnlimited:
          sellerPackage.is_unlimited,
      },

      amount: price,

      paymentProvider:
        "nowpayments",

      redirectUrl:
        `/payment?type=package&package=${encodeURIComponent(
          sellerPackage.slug
        )}`,
    });
  } catch (error) {
    console.error(
      "PACKAGE CHECKOUT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}