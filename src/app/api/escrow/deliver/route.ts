import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { supabaseAdmin } from "@/lib/supabase";

type EscrowTransaction = {
  id: string;
  buyer_id: string | null;
  seller_id: string | null;
  listing_id: string | null;
  amount: number | string | null;
  status: string | null;
  delivered_at: string | null;
};

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // 1. Server configuration check
    // --------------------------------------------------
    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration is unavailable.",
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------------------------
    // 2. Create authenticated session client
    // --------------------------------------------------
    const cookieStore = await cookies();

    const authSupabase = createServerClient(
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
              // Cookie refresh may not always be writable here.
            }
          },
        },
      }
    );

    // --------------------------------------------------
    // 3. Verify logged-in user
    // --------------------------------------------------
    const {
      data: { user },
      error: userError,
    } = await authSupabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    // --------------------------------------------------
    // 4. Read request body
    // --------------------------------------------------
    const body = await request.json();

    const escrowId =
      typeof body?.escrow_id === "string"
        ? body.escrow_id.trim()
        : "";

    if (!escrowId) {
      return NextResponse.json(
        {
          success: false,
          error: "Escrow ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------
    // 5. Load transaction using trusted server client
    // --------------------------------------------------
    const {
      data: transactionData,
      error: transactionError,
    } = await supabaseAdmin
      .from("escrow_transactions")
      .select(
        "id, buyer_id, seller_id, listing_id, amount, status, delivered_at"
      )
      .eq("id", escrowId)
      .maybeSingle();

    if (transactionError) {
      console.error(
        "ESCROW DELIVERY LOAD ERROR:",
        transactionError
      );

      return NextResponse.json(
        {
          success: false,
          error: "Unable to load escrow transaction.",
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
          error: "Escrow transaction not found.",
        },
        {
          status: 404,
        }
      );
    }

    const transaction =
      transactionData as EscrowTransaction;

    // --------------------------------------------------
    // 6. Seller authorization
    // --------------------------------------------------
    // The admin client bypasses RLS, so this application-
    // level authorization check is mandatory.
    if (transaction.seller_id !== user.id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Only the seller can mark this transaction as delivered.",
        },
        {
          status: 403,
        }
      );
    }

    // --------------------------------------------------
    // 7. Validate transaction state
    // --------------------------------------------------
    if (transaction.status !== "funded") {
      return NextResponse.json(
        {
          success: false,
          error: `This transaction cannot be delivered from status "${transaction.status}".`,
        },
        {
          status: 409,
        }
      );
    }

    const now = new Date().toISOString();

    // --------------------------------------------------
    // 8. Guarded delivery update
    // --------------------------------------------------
    // Even though authorization was checked above,
    // seller_id and status are checked again here.
    const {
      data: deliveredTransactionData,
      error: deliveryError,
    } = await supabaseAdmin
      .from("escrow_transactions")
      .update({
        status: "delivered",
        delivered_at: now,
        updated_at: now,
      })
      .eq("id", escrowId)
      .eq("seller_id", user.id)
      .eq("status", "funded")
      .select(
        "id, buyer_id, seller_id, listing_id, amount, status, delivered_at, updated_at"
      )
      .maybeSingle();

    if (deliveryError) {
      console.error(
        "ESCROW DELIVERY UPDATE ERROR:",
        deliveryError
      );

      return NextResponse.json(
        {
          success: false,
          error: "Failed to mark escrow as delivered.",
        },
        {
          status: 500,
        }
      );
    }

    if (!deliveredTransactionData) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Transaction status changed before delivery completed.",
        },
        {
          status: 409,
        }
      );
    }

    console.log("ESCROW MARKED DELIVERED:", {
      escrowId: deliveredTransactionData.id,
      sellerId: user.id,
      status: deliveredTransactionData.status,
      deliveredAt:
        deliveredTransactionData.delivered_at,
    });

    return NextResponse.json({
      success: true,
      message:
        "Transaction marked as delivered successfully.",
      escrow: deliveredTransactionData,
    });
  } catch (error) {
    console.error(
      "ESCROW DELIVERY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to mark escrow as delivered.",
      },
      {
        status: 500,
      }
    );
  }
}