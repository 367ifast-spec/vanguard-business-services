import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      user_id,
      title,
      message,
      type,
    } = body;

    if (
      !user_id ||
      !title ||
      !message ||
      !type
    ) {
      return NextResponse.json(
        {
          error:
            "user_id, title, message and type are required.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("notifications")
      .insert({
        user_id,
        title,
        message,
        type,
        is_read: false,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      notification: data,
    });
  } catch (error) {
    console.error(
      "Create notification error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create notification.",
      },
      {
        status: 500,
      }
    );
  }
}