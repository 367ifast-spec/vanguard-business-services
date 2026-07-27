import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { verifyAdminSession } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

type ResolutionAction =
  | "release_seller"
  | "refund_buyer";

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        {
          error: "Supabase is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * Verify admin session
     */
    const cookieStore = await cookies();

    const token =
      cookieStore.get("admin_session")?.value ?? "";

    if (!token) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const session =
      await verifyAdminSession(token);

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * Validate request
     */
    const body = await req.json();

    const escrowId =
      typeof body.escrow_id === "string"
        ? body.escrow_id.trim()
        : "";

    const action =
      body.action as ResolutionAction;

    if (!escrowId) {
      return NextResponse.json(
        {
          error: "Escrow ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      action !== "release_seller" &&
      action !== "refund_buyer"
    ) {
      return NextResponse.json(
        {
          error: "Invalid resolution action.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Load escrow first.
     */
    const {
      data: escrow,
      error: loadError,
    } = await supabaseAdmin
      .from("escrow_transactions")
      .select(
        `
          id,
          buyer_id,
          seller_id,
          listing_id,
          amount,
          status
        `
      )
      .eq("id", escrowId)
      .maybeSingle();

    if (loadError) {
      console.error(
        "ADMIN ESCROW RESOLUTION LOAD ERROR:",
        loadError
      );

      return NextResponse.json(
        {
          error: "Failed to load escrow transaction.",
        },
        {
          status: 500,
        }
      );
    }

    if (!escrow) {
      return NextResponse.json(
        {
          error: "Escrow transaction not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Admin resolution is allowed only while
     * the escrow is actively disputed.
     */
    if (escrow.status !== "disputed") {
      return NextResponse.json(
        {
          error:
            "Only disputed escrow transactions can be resolved.",
        },
        {
          status: 409,
        }
      );
    }

    const resolvedAt =
      new Date().toISOString();

    const nextStatus =
      action === "release_seller"
        ? "released"
        : "refunded";

    /*
     * Atomic state guard:
     *
     * The update also requires status=disputed.
     * This prevents a stale/double resolution
     * from overwriting an already resolved escrow.
     *
     * Each resolution path also stores its
     * corresponding audit timestamp.
     */
    const {
      data: updatedEscrow,
      error: updateError,
    } = await supabaseAdmin
      .from("escrow_transactions")
      .update(
        action === "release_seller"
          ? {
              status: nextStatus,
              released_at: resolvedAt,
            }
          : {
              status: nextStatus,
              refunded_at: resolvedAt,
            }
      )
      .eq("id", escrowId)
      .eq("status", "disputed")
      .select(
        `
          id,
          buyer_id,
          seller_id,
          listing_id,
          amount,
          status,
          released_at,
          refunded_at
        `
      )
      .maybeSingle();

    if (updateError) {
      console.error(
        "ADMIN ESCROW RESOLUTION UPDATE ERROR:",
        updateError
      );

      return NextResponse.json(
        {
          error: "Failed to resolve escrow dispute.",
        },
        {
          status: 500,
        }
      );
    }

    if (!updatedEscrow) {
      return NextResponse.json(
        {
          error:
            "Escrow state changed before resolution. Refresh and try again.",
        },
        {
          status: 409,
        }
      );
    }

    console.log(
      "ADMIN ESCROW RESOLVED:",
      {
        admin: session.email,
        escrowId,
        action,
        status: updatedEscrow.status,
      }
    );

    return NextResponse.json({
      success: true,
      message:
        action === "release_seller"
          ? "Dispute resolved in favor of the seller."
          : "Dispute resolved in favor of the buyer.",
      escrow: updatedEscrow,
    });
  } catch (error) {
    console.error(
      "ADMIN ESCROW RESOLUTION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to resolve escrow dispute.",
      },
      {
        status: 500,
      }
    );
  }
}