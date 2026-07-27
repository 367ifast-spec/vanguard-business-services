import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type EscrowPayment = {
  id: string;
  transaction_id: string;
  buyer_id: string;
  provider: string;
  payment_reference: string | null;
  amount: number | string;
  status: string;
  submitted_at: string;
  verified_at: string | null;
};

type EscrowTransaction = {
  id: string;
  buyer_id: string;
  seller_id: string;
  listing_id: string;
  amount: number | string;
  buyer_fee: number | string;
  seller_fee: number | string;
  total_fee: number | string;
  status: string;
  payment_id: string | null;
  funded_at: string | null;
  updated_at?: string;
};

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    void request;

    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Server configuration is unavailable.",
        },
        {
          status: 500,
        }
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Load submitted payment
    const {
      data: paymentData,
      error: paymentError,
    } = await supabaseAdmin
      .from("escrow_payments")
      .select(
        "id, transaction_id, buyer_id, provider, payment_reference, amount, status, submitted_at, verified_at"
      )
      .eq("id", id)
      .maybeSingle();

    if (paymentError) {
      console.error(
        "ADMIN VERIFY PAYMENT LOAD ERROR:",
        paymentError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to load payment record.",
        },
        {
          status: 500,
        }
      );
    }

    if (!paymentData) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment record not found.",
        },
        {
          status: 404,
        }
      );
    }

    const payment =
      paymentData as EscrowPayment;

    if (payment.status === "verified") {
      return NextResponse.json(
        {
          success: false,
          message:
            "This payment has already been verified.",
        },
        {
          status: 409,
        }
      );
    }

    if (payment.status !== "submitted") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only submitted payments can be verified.",
        },
        {
          status: 400,
        }
      );
    }

    // Load escrow transaction
    const {
      data: transactionData,
      error: transactionError,
    } = await supabaseAdmin
      .from("escrow_transactions")
      .select(
        "id, buyer_id, seller_id, listing_id, amount, buyer_fee, seller_fee, total_fee, status, payment_id, funded_at"
      )
      .eq(
        "id",
        payment.transaction_id
      )
      .maybeSingle();

    if (transactionError) {
      console.error(
        "ADMIN VERIFY TRANSACTION LOAD ERROR:",
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

    if (!transactionData) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Associated escrow transaction was not found.",
        },
        {
          status: 404,
        }
      );
    }

    const transaction =
      transactionData as EscrowTransaction;

    // Buyer integrity check
    if (
      payment.buyer_id !==
      transaction.buyer_id
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment buyer does not match transaction buyer.",
        },
        {
          status: 409,
        }
      );
    }

    if (transaction.status !== "pending") {
      return NextResponse.json(
        {
          success: false,
          message:
            `Transaction cannot be funded from status "${transaction.status}".`,
        },
        {
          status: 409,
        }
      );
    }

    // Buyer must have submitted:
    // listing price + 7.5% buyer fee
    const expectedAmount =
      Math.round(
        (
          Number(transaction.amount) +
          Number(transaction.buyer_fee) +
          Number.EPSILON
        ) *
          100
      ) / 100;

    const submittedAmount =
      Math.round(
        (
          Number(payment.amount) +
          Number.EPSILON
        ) *
          100
      ) / 100;

    if (
      !Number.isFinite(expectedAmount) ||
      !Number.isFinite(submittedAmount)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment amount could not be validated.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      submittedAmount !== expectedAmount
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            `Payment amount mismatch. Expected $${expectedAmount.toFixed(
              2
            )}, received $${submittedAmount.toFixed(
              2
            )}.`,
        },
        {
          status: 409,
        }
      );
    }

    const now =
      new Date().toISOString();

    // Mark payment verified
    const {
      data: verifiedPaymentData,
      error: verifyError,
    } = await supabaseAdmin
      .from("escrow_payments")
      .update({
        status: "verified",
        verified_at: now,
        updated_at: now,
      })
      .eq("id", payment.id)
      .eq("status", "submitted")
      .select(
        "id, transaction_id, buyer_id, provider, payment_reference, amount, status, submitted_at, verified_at"
      )
      .maybeSingle();

    if (verifyError) {
      console.error(
        "ADMIN PAYMENT VERIFY ERROR:",
        verifyError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to verify payment.",
        },
        {
          status: 500,
        }
      );
    }

    if (!verifiedPaymentData) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment status changed before verification completed.",
        },
        {
          status: 409,
        }
      );
    }

    const verifiedPayment =
      verifiedPaymentData as EscrowPayment;

    // Fund escrow transaction
    const {
      data: fundedTransactionData,
      error: fundingError,
    } = await supabaseAdmin
      .from("escrow_transactions")
      .update({
        status: "funded",
        payment_id:
          verifiedPayment.id,
        funded_at: now,
        updated_at: now,
      })
      .eq("id", transaction.id)
      .eq("status", "pending")
      .select(
        "id, buyer_id, seller_id, listing_id, amount, buyer_fee, seller_fee, total_fee, status, payment_id, funded_at, updated_at"
      )
      .maybeSingle();

    if (fundingError) {
      console.error(
        "ADMIN ESCROW FUNDING ERROR:",
        fundingError
      );

      // Roll payment back if funding failed
      const { error: rollbackError } =
        await supabaseAdmin
          .from("escrow_payments")
          .update({
            status: "submitted",
            verified_at: null,
            updated_at:
              new Date().toISOString(),
          })
          .eq(
            "id",
            verifiedPayment.id
          )
          .eq("status", "verified");

      if (rollbackError) {
        console.error(
          "PAYMENT VERIFY ROLLBACK ERROR:",
          rollbackError
        );
      }

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment verification succeeded but escrow funding failed.",
        },
        {
          status: 500,
        }
      );
    }

    if (!fundedTransactionData) {
      const { error: rollbackError } =
        await supabaseAdmin
          .from("escrow_payments")
          .update({
            status: "submitted",
            verified_at: null,
            updated_at:
              new Date().toISOString(),
          })
          .eq(
            "id",
            verifiedPayment.id
          )
          .eq("status", "verified");

      if (rollbackError) {
        console.error(
          "PAYMENT FUNDING ROLLBACK ERROR:",
          rollbackError
        );
      }

      return NextResponse.json(
        {
          success: false,
          message:
            "Escrow transaction status changed before funding completed.",
        },
        {
          status: 409,
        }
      );
    }

    const fundedTransaction =
      fundedTransactionData as EscrowTransaction;

    console.log(
      "ESCROW PAYMENT VERIFIED:",
      {
        paymentId:
          verifiedPayment.id,
        transactionId:
          fundedTransaction.id,
        amount:
          verifiedPayment.amount,
        status:
          fundedTransaction.status,
      }
    );

    return NextResponse.json({
      success: true,
      message:
        "Payment verified and escrow funded successfully.",
      payment: verifiedPayment,
      transaction:
        fundedTransaction,
    });
  } catch (error) {
    console.error(
      "ADMIN VERIFY PAYMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to verify escrow payment.",
      },
      {
        status: 500,
      }
    );
  }
}