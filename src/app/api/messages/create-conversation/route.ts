import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      buyer_id,
      seller_id,
      listing_id,
    } = body;

    if (!buyer_id || !seller_id) {
      return NextResponse.json(
        {
          error:
            "buyer_id and seller_id are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Check if conversation already exists
    const { data: existingConversation } =
      await supabase
        .from("marketplace_conversations")
        .select("*")
        .eq("buyer_id", buyer_id)
        .eq("seller_id", seller_id)
        .eq("listing_id", listing_id)
        .maybeSingle();

    if (existingConversation) {
      return NextResponse.json({
        success: true,
        conversation: existingConversation,
        redirectUrl: `/messages/${existingConversation.id}`,
      });
    }

    // Create new conversation
    const { data, error } = await supabase
      .from("marketplace_conversations")
      .insert({
        buyer_id,
        seller_id,
        listing_id,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      conversation: data,
      redirectUrl: `/messages/${data.id}`,
    });
  } catch (error) {
    console.error(
      "Create conversation error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create marketplace conversation.",
      },
      {
        status: 500,
      }
    );
  }
}