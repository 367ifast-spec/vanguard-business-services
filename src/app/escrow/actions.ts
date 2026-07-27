"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import {
  getEscrowById,
  releaseEscrow,
  completeEscrow,
  disputeEscrow,
} from "@/lib/escrow";

async function getAuthenticatedUser() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(
              ({ name, value, options }) => {
                cookieStore.set(name, value, options);
              }
            );
          } catch {
            // Server Actions may not always be able
            // to write refreshed auth cookies.
          }
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function releaseEscrowAction(
  id: string
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in.",
      };
    }

    const transaction = await getEscrowById(id);

    if (!transaction) {
      return {
        success: false,
        message: "Escrow transaction not found.",
      };
    }

    // Only the buyer may accept delivery
    // and release the escrow payment.
    if (transaction.buyer_id !== user.id) {
      return {
        success: false,
        message:
          "Only the buyer can release this escrow payment.",
      };
    }

    // Seller must deliver first.
    if (transaction.status !== "delivered") {
      return {
        success: false,
        message:
          "The seller must mark the transaction as delivered before payment can be released.",
      };
    }

    await releaseEscrow(id);

    return {
      success: true,
      message:
        "Delivery accepted and escrow payment released successfully.",
    };
  } catch (error) {
    console.error("RELEASE ACTION ERROR:", error);

    return {
      success: false,
      message:
        "Failed to release escrow payment.",
    };
  }
}

export async function completeEscrowAction(
  id: string
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in.",
      };
    }

    const transaction = await getEscrowById(id);

    if (!transaction) {
      return {
        success: false,
        message: "Escrow transaction not found.",
      };
    }

    // Final completion belongs to the seller
    // after the buyer releases payment.
    if (transaction.seller_id !== user.id) {
      return {
        success: false,
        message:
          "Only the seller can mark this escrow as completed.",
      };
    }

    if (transaction.status !== "released") {
      return {
        success: false,
        message:
          "Payment must be released before the escrow can be completed.",
      };
    }

    await completeEscrow(id);

    return {
      success: true,
      message:
        "Escrow marked as completed successfully.",
    };
  } catch (error) {
    console.error("COMPLETE ACTION ERROR:", error);

    return {
      success: false,
      message:
        "Failed to complete escrow.",
    };
  }
}

export async function disputeEscrowAction(
  id: string
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in.",
      };
    }

    const transaction = await getEscrowById(id);

    if (!transaction) {
      return {
        success: false,
        message: "Escrow transaction not found.",
      };
    }

    const isBuyer =
      transaction.buyer_id === user.id;

    const isSeller =
      transaction.seller_id === user.id;

    if (!isBuyer && !isSeller) {
      return {
        success: false,
        message:
          "You do not have permission to dispute this escrow.",
      };
    }

    // Disputes are allowed while funds are protected
    // and before the buyer releases payment.
    const disputableStatuses = [
      "funded",
      "delivered",
    ];

    if (
      !disputableStatuses.includes(
        transaction.status ?? ""
      )
    ) {
      return {
        success: false,
        message:
          "This escrow can no longer be disputed.",
      };
    }

    await disputeEscrow(id);

    return {
      success: true,
      message:
        "Escrow dispute opened successfully.",
    };
  } catch (error) {
    console.error("DISPUTE ACTION ERROR:", error);

    return {
      success: false,
      message:
        "Failed to open escrow dispute.",
    };
  }
}