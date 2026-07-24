import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      conversation_id,
      sender_id,
      receiver_id,
      listing_id,
      message,
    } = body;

    if (
      !conversation_id ||
      !sender_id ||
      !message
    ) {
      return NextResponse.json(
        {
          error:
            "conversation_id, sender_id and message are required.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("marketplace_messages")
      .insert({
        conversation_id,
        sender_id,
        receiver_id: receiver_id ?? null,
        listing_id: listing_id ?? null,
        message,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "SEND MESSAGE API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send message.",
      },
      {
        status: 500,
      }
    );
  }
}