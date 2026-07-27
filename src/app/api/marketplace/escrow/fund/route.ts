import {
  NextRequest,
  NextResponse,
} from "next/server";

import { supabaseAdmin } from "@/lib/supabase";

type FundRequestBody = {
  transactionId?: string;
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
            "Server escrow configuration is unavailable.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * --------------------------------------------
     * 1. Authenticate buyer
     * --------------------------------------------
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
            "Please login before funding escrow.",
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
        "ESCROW FUND AUTH ERROR:",
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
     * --------------------------------------------
     * 2. Read request
     * --------------------------------------------
     */

    let body: FundRequestBody;

    try {
      body =
        (await request.json()) as FundRequestBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid escrow funding request.",
        },
        {
          status: 400,
        }
      );
    }

    const transactionId =
      typeof body.transactionId === "string"
        ? body.transactionId.trim()
        : "";

    if (!transactionId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Transaction ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * --------------------------------------------
     * 3. Load transaction
     * --------------------------------------------
     */

    const {
      data: transaction,
      error: transactionError,
    } = await supabaseAdmin
      .from("escrow_transactions")
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
      .eq("id", transactionId)
      .maybeSingle();

    if (transactionError) {
      console.error(
        "ESCROW FUND LOAD ERROR:",
        transactionError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to load escrow transaction.",
        },
        {
          status: 500,
        }
      );
    }

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Escrow transaction not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * --------------------------------------------
     * 4. Verify buyer ownership
     * --------------------------------------------
     */

    if (transaction.buyer_id !== user.id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You do not have permission to fund this transaction.",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * --------------------------------------------
     * 5. Validate transaction state
     * --------------------------------------------
     */

    const status = String(
      transaction.status ?? ""
    ).toLowerCase();

    if (
      status === "funded" ||
      status === "paid"
    ) {
      return NextResponse.json(
        {
          success: true,
          alreadyFunded: true,
          message:
            "This escrow transaction is already funded.",
          transactionId: transaction.id,
          status: transaction.status,
          paymentId: transaction.payment_id,
        },
        {
          status: 200,
        }
      );
    }

    if (status !== "pending") {
      return NextResponse.json(
        {
          success: false,
          message:
            `This transaction cannot be funded while its status is "${transaction.status}".`,
        },
        {
          status: 409,
        }
      );
    }

    /*
     * --------------------------------------------
     * 6. Calculate amount buyer must pay
     *
     * Buyer pays:
     * listing amount + 7.5% buyer fee
     * --------------------------------------------
     */

    const amount = Number(
      transaction.amount
    );

    const buyerFee = Number(
      transaction.buyer_fee ?? 0
    );

    if (
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !Number.isFinite(buyerFee) ||
      buyerFee < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Escrow transaction contains an invalid payment amount.",
        },
        {
          status: 400,
        }
      );
    }

    const buyerTotal = roundMoney(
      amount + buyerFee
    );

    /*
     * --------------------------------------------
     * 7. Payment provider required
     *
     * IMPORTANT:
     * Do NOT change status to funded here.
     *
     * A trusted payment provider webhook/server
     * confirmation must verify the payment first.
     * --------------------------------------------
     */

    return NextResponse.json(
      {
        success: true,
        paymentRequired: true,

        message:
          "Escrow transaction is ready for payment.",

        transactionId:
          transaction.id,

        status:
          transaction.status,

        payment: {
          currency: "USD",
          listingAmount:
            roundMoney(amount),

          buyerFee:
            roundMoney(buyerFee),

          buyerTotal,
        },

        nextStep:
          "Connect a payment provider and confirm payment server-side before marking this transaction as funded.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "ESCROW FUND ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to prepare escrow funding.",
      },
      {
        status: 500,
      }
    );
  }
}