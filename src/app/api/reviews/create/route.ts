import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      seller_id,
      buyer_id,
      escrow_id,
      title,
      review,
    } = body;

    if (
      !seller_id ||
      !buyer_id ||
      !escrow_id ||
      !title ||
      !review
    ) {
      return NextResponse.json(
        {
          error: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Verify escrow is released
    const { data: escrow } = await supabase
      .from("escrow_transactions")
      .select("*")
      .eq("id", escrow_id)
      .eq("status", "released")
      .single();

    if (!escrow) {
      return NextResponse.json(
        {
          error:
            "Reviews can only be left for completed escrow transactions.",
        },
        {
          status: 400,
        }
      );
    }

    // Prevent duplicate reviews
    const { data: existingReview } =
      await supabase
        .from("reviews")
        .select("id")
        .eq("buyer_id", buyer_id)
        .eq("escrow_id", escrow_id)
        .maybeSingle();

    if (existingReview) {
      return NextResponse.json(
        {
          error:
            "You have already submitted a review for this transaction.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        seller_id,
        buyer_id,
        escrow_id,
        title,
        review,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      review: data,
    });
  } catch (error) {
    console.error(
      "Create review error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create review.",
      },
      {
        status: 500,
      }
    );
  }
}