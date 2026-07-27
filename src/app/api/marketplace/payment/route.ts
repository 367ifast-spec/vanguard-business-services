import {
  NextRequest,
  NextResponse,
} from "next/server";

import { supabaseAdmin } from "@/lib/supabase";

type PaymentRequestBody = {
  listingId?: string;
};

function roundMoney(value: number) {
  return (
    Math.round(
      (value + Number.EPSILON) * 100
    ) / 100
  );
}

export async function POST(
  request: NextRequest
) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Server payment configuration is unavailable.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * --------------------------------------------------
     * 1. Authenticate buyer
     * --------------------------------------------------
     */

    const authorization =
      request.headers.get("authorization");

    if (
      !authorization ||
      !authorization.startsWith("Bearer ")
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please login before purchasing.",
        },
        {
          status: 401,
        }
      );
    }

    const accessToken = authorization
      .slice(7)
      .trim();

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Authentication token is missing.",
        },
        {
          status: 401,
        }
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(
      accessToken
    );

    if (authError || !user) {
      console.error(
        "MARKETPLACE PAYMENT AUTH ERROR:",
        authError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Your login session is invalid or expired.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * --------------------------------------------------
     * 2. Read request
     * --------------------------------------------------
     */

    let body: PaymentRequestBody;

    try {
      body =
        (await request.json()) as PaymentRequestBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid payment request.",
        },
        {
          status: 400,
        }
      );
    }

    const listingId =
      typeof body.listingId === "string"
        ? body.listingId.trim()
        : "";

    if (!listingId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Listing ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * --------------------------------------------------
     * 3. Load listing from database
     *
     * IMPORTANT:
     * Never trust sellerId or price sent by browser.
     * --------------------------------------------------
     */

    const {
      data: listing,
      error: listingError,
    } = await supabaseAdmin
      .from("marketplace_listings")
      .select(
        "id, seller_id, title, price, status"
      )
      .eq("id", listingId)
      .maybeSingle();

    if (listingError) {
      console.error(
        "MARKETPLACE LISTING ERROR:",
        listingError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to load marketplace listing.",
        },
        {
          status: 500,
        }
      );
    }

    if (!listing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Listing not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * --------------------------------------------------
     * 4. Listing validation
     * --------------------------------------------------
     */

    if (listing.status !== "approved") {
      return NextResponse.json(
        {
          success: false,
          message:
            "This listing is not available for purchase.",
        },
        {
          status: 400,
        }
      );
    }

    if (!listing.seller_id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This listing does not have a valid seller.",
        },
        {
          status: 400,
        }
      );
    }

    if (user.id === listing.seller_id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You cannot purchase your own listing.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * --------------------------------------------------
     * 5. Calculate marketplace fees
     * --------------------------------------------------
     */

    const amount = Number(listing.price);

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Listing price is invalid.",
        },
        {
          status: 400,
        }
      );
    }

    const buyerFee = roundMoney(
      amount * 0.075
    );

    const sellerFee = roundMoney(
      amount * 0.075
    );

    const totalFee = roundMoney(
      buyerFee + sellerFee
    );

    const buyerTotal = roundMoney(
      amount + buyerFee
    );

    const sellerReceives = roundMoney(
      amount - sellerFee
    );

    /*
     * --------------------------------------------------
     * 6. Prevent duplicate active purchase
     * --------------------------------------------------
     */

    const {
      data: existingTransaction,
      error: existingError,
    } = await supabaseAdmin
      .from("escrow_transactions")
      .select("id, status")
      .eq("buyer_id", user.id)
      .eq("listing_id", listing.id)
      .in("status", [
        "pending",
        "funded",
        "delivered",
        "disputed",
      ])
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    if (existingError) {
      console.error(
        "ESCROW DUPLICATE CHECK ERROR:",
        existingError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to validate transaction status.",
        },
        {
          status: 500,
        }
      );
    }

    if (existingTransaction) {
      return NextResponse.json({
        success: true,
        message:
          "You already have an active transaction for this listing.",
        transactionId:
          existingTransaction.id,
        checkoutUrl:
          `/buyer/orders/${existingTransaction.id}`,
        existing: true,
      });
    }

    /*
     * --------------------------------------------------
     * 7. Create pending escrow transaction
     * --------------------------------------------------
     */

    const {
      data: transaction,
      error: transactionError,
    } = await supabaseAdmin
      .from("escrow_transactions")
      .insert({
        buyer_id: user.id,
        seller_id: listing.seller_id,
        listing_id: listing.id,

        amount,
        buyer_fee: buyerFee,
        seller_fee: sellerFee,
        total_fee: totalFee,

        status: "pending",
      })
     .select(`
  id,
  buyer_id,
  seller_id,
  listing_id,
  amount,
  buyer_fee,
  seller_fee,
  total_fee,
  status,
  payment_id,
  created_at,
  updated_at
`)
.single();

    if (
      transactionError ||
      !transaction
    ) {
      console.error(
        "ESCROW TRANSACTION ERROR:",
        transactionError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to create protected transaction.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * --------------------------------------------------
     * 8. Return transaction
     *
     * Payment is NOT funded here.
     * Actual payment confirmation will later move:
     *
     * pending -> funded
     * --------------------------------------------------
     */

    return NextResponse.json(
      {
        success: true,

        message:
          "Protected transaction created successfully.",

        transactionId:
          transaction.id,

        checkoutUrl:
          `/buyer/orders/${transaction.id}`,

        payment: {
          listingPrice: amount,
          buyerFee,
          buyerTotal,
          sellerFee,
          totalPlatformFee: totalFee,
          sellerReceives,
        },

        transaction,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "MARKETPLACE PAYMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create marketplace transaction.",
      },
      {
        status: 500,
      }
    );
  }
}