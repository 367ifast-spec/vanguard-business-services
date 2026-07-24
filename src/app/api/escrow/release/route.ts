import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { escrow_id } = body;

    if (!escrow_id) {
      return NextResponse.json(
        {
          error: "Escrow ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("escrow_transactions")
      .update({
        status: "released",
        released_at: new Date().toISOString(),
      })
      .eq("id", escrow_id)
      .eq("status", "delivered")
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Future:
    // 1. Create seller payout record
    // 2. Send notification to seller
    // 3. Trigger payout provider (Wise/PayPal/Crypto)
    // 4. Log transaction history

    return NextResponse.json({
      success: true,
      message: "Funds released successfully.",
      escrow: data,
    });
  } catch (error) {
    console.error("Escrow release error:", error);

    return NextResponse.json(
      {
        error: "Failed to release funds.",
      },
      {
        status: 500,
      }
    );
  }
}