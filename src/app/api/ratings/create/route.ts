import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      seller_id,
      buyer_id,
      escrow_id,
      rating,
    } = body;

    if (
      !seller_id ||
      !buyer_id ||
      !escrow_id ||
      !rating
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

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          error:
            "Rating must be between 1 and 5.",
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
            "Ratings can only be submitted for completed escrow transactions.",
        },
        {
          status: 400,
        }
      );
    }

    // Prevent duplicate ratings
    const { data: existingRating } =
      await supabase
        .from("ratings")
        .select("id")
        .eq("buyer_id", buyer_id)
        .eq("escrow_id", escrow_id)
        .maybeSingle();

    if (existingRating) {
      return NextResponse.json(
        {
          error:
            "You have already submitted a rating for this transaction.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("ratings")
      .insert({
        seller_id,
        buyer_id,
        escrow_id,
        rating,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      rating: data,
    });
  } catch (error) {
    console.error(
      "Create rating error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create rating.",
      },
      {
        status: 500,
      }
    );
  }
}