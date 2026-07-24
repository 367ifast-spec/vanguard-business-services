import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      conversation_id,
      sender_id,
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
        message,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: data,
    });
  } catch (error) {
    console.error("Send message error:", error);

    return NextResponse.json(
      {
        error: "Failed to send message.",
      },
      {
        status: 500,
      }
    );
  }
}