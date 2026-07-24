import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { escrow_id, payment_id } = body;

    if (!escrow_id || !payment_id) {
      return NextResponse.json(
        {
          error: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("escrow_transactions")
      .update({
        status: "funded",
        payment_id,
        funded_at: new Date().toISOString(),
      })
      .eq("id", escrow_id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      escrow: data,
    });
  } catch (error) {
    console.error("Escrow funding error:", error);

    return NextResponse.json(
      {
        error: "Failed to fund escrow transaction.",
      },
      {
        status: 500,
      }
    );
  }
}