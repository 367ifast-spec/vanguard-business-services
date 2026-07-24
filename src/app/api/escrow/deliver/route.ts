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
        status: "delivered",
        delivered_at: new Date().toISOString(),
      })
      .eq("id", escrow_id)
      .eq("status", "funded")
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
    console.error("Escrow delivery error:", error);

    return NextResponse.json(
      {
        error: "Failed to mark escrow as delivered.",
      },
      {
        status: 500,
      }
    );
  }
}