import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { escrow_id, reason } = body;

    if (!escrow_id || !reason) {
      return NextResponse.json(
        {
          error: "Escrow ID and reason are required.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("escrow_transactions")
      .update({
        status: "disputed",
        disputed_at: new Date().toISOString(),
      })
      .eq("id", escrow_id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Log dispute message
    await supabase.from("escrow_messages").insert({
      escrow_id,
      sender_id: data.buyer_id,
      message: `DISPUTE OPENED: ${reason}`,
      is_admin: false,
    });

    return NextResponse.json({
      success: true,
      escrow: data,
    });
  } catch (error) {
    console.error("Escrow dispute error:", error);

    return NextResponse.json(
      {
        error: "Failed to open dispute.",
      },
      {
        status: 500,
      }
    );
  }
}