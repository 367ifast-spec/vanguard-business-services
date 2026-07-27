import {
  NextRequest,
  NextResponse,
} from "next/server";

import { supabaseAdmin } from "@/lib/supabase";

type SubmitPaymentBody = {
  transactionId?: string;
  paymentReference?: string;
  provider?: string;
};

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

    // -----------------------------------------
    // 1. Verify buyer authentication
    // -----------------------------------------

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
            "Please login before submitting payment.",
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
    } =
      await supabaseAdmin.auth.getUser(
        accessToken
      );

    if (authError || !user) {
      console.error(
        "SUBMIT PAYMENT AUTH ERROR:",
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

    // -----------------------------------------
    // 2. Read request body
    // -----------------------------------------

    const body =
      (await request.json()) as SubmitPaymentBody;

    const transactionId =
      body.transactionId?.trim();

    const paymentReference =
      body.paymentReference?.trim();

    const provider =
      body.provider?.trim() || "manual";

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

    if (!paymentReference) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment reference is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (paymentReference.length > 500) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment reference is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (provider.length > 50) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment provider is invalid.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------
    // 3. Load escrow transaction
    // -----------------------------------------

    const {
      data: transaction,
      error: transactionError,
    } = await supabaseAdmin
      .from("escrow_transactions")
      .select(
        `
          id,
          buyer_id,
          seller_id,
          listing_id,
          amount,
          buyer_fee,
          seller_fee,
          total_fee,
          status,
          funded_at
        `
      )
      .eq("id", transactionId)
      .maybeSingle();

    if (transactionError) {
      console.error(
        "SUBMIT PAYMENT TRANSACTION ERROR:",
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

    // -----------------------------------------
    // 4. Make sure buyer owns transaction
    // -----------------------------------------

    if (transaction.buyer_id !== user.id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You do not have permission to submit payment for this transaction.",
        },
        {
          status: 403,
        }
      );
    }

    // -----------------------------------------
    // 5. Transaction must still be pending
    // -----------------------------------------

    if (
      transaction.status !== "pending"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This transaction is not awaiting payment.",
        },
        {
          status: 400,
        }
      );
    }

    if (transaction.funded_at) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This transaction has already been funded.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------
    // 6. Calculate buyer total server-side
    // -----------------------------------------

    const amount = Number(
      transaction.amount
    );

    const buyerFee = Number(
      transaction.buyer_fee
    );

    if (
      !Number.isFinite(amount) ||
      !Number.isFinite(buyerFee) ||
      amount <= 0 ||
      buyerFee < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Transaction amount is invalid.",
        },
        {
          status: 500,
        }
      );
    }

    const buyerTotal =
      Math.round(
        (amount +
          buyerFee +
          Number.EPSILON) *
          100
      ) / 100;

    // -----------------------------------------
    // 7. Prevent duplicate active submissions
    // -----------------------------------------

    const {
      data: existingPayment,
      error: existingPaymentError,
    } = await supabaseAdmin
      .from("escrow_payments")
      .select(
        "id, status, payment_reference"
      )
      .eq(
        "transaction_id",
        transaction.id
      )
      .in("status", [
        "submitted",
        "verified",
      ])
      .limit(1)
      .maybeSingle();

    if (existingPaymentError) {
      console.error(
        "CHECK EXISTING PAYMENT ERROR:",
        existingPaymentError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to check existing payment submission.",
        },
        {
          status: 500,
        }
      );
    }

    if (existingPayment) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A payment has already been submitted for this transaction.",
          paymentId:
            existingPayment.id,
          paymentStatus:
            existingPayment.status,
        },
        {
          status: 409,
        }
      );
    }

    // -----------------------------------------
    // 8. Create payment submission
    // -----------------------------------------

    const {
      data: payment,
      error: paymentError,
    } = await supabaseAdmin
      .from("escrow_payments")
      .insert({
        transaction_id:
          transaction.id,

        buyer_id: user.id,

        provider,

        payment_reference:
          paymentReference,

        amount: buyerTotal,

        status: "submitted",
      })
      .select(
        `
          id,
          transaction_id,
          buyer_id,
          provider,
          payment_reference,
          amount,
          status,
          submitted_at,
          verified_at,
          created_at
        `
      )
      .single();

    if (paymentError) {
      console.error(
        "ESCROW PAYMENT INSERT ERROR:",
        paymentError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to submit payment.",
        },
        {
          status: 500,
        }
      );
    }

    // IMPORTANT:
    // Do NOT mark escrow transaction as funded here.
    // Funding happens only after verification.

    console.log(
      "ESCROW PAYMENT SUBMITTED:",
      {
        paymentId: payment.id,
        transactionId:
          transaction.id,
        buyerId: user.id,
        amount: buyerTotal,
        provider,
      }
    );

    return NextResponse.json(
      {
        success: true,

        message:
          "Payment submitted successfully and is awaiting verification.",

        paymentId: payment.id,

        transactionId:
          transaction.id,

        paymentStatus:
          payment.status,

        amountDue: buyerTotal,

        payment,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "SUBMIT ESCROW PAYMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to submit escrow payment.",
      },
      {
        status: 500,
      }
    );
  }
}