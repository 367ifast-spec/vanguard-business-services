import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      buyer_id,
      seller_id,
      listing_id,
      amount,
    } = body;

    if (
      !buyer_id ||
      !seller_id ||
      !listing_id ||
      !amount
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const buyerFee = Number(amount) * 0.075;
    const sellerFee = Number(amount) * 0.075;
    const totalFee = buyerFee + sellerFee;

    const { data, error } = await supabase
      .from("escrow_transactions")
      .insert({
        buyer_id,
        seller_id,
        listing_id,
        amount,
        buyer_fee: buyerFee,
        seller_fee: sellerFee,
        total_fee: totalFee,
        status: "pending",
      })
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
    console.error("Escrow create error:", error);

    return NextResponse.json(
      {
        error: "Failed to create escrow transaction.",
      },
      {
        status: 500,
      }
    );
  }
}