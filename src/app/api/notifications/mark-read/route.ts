import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { notification_id } = body;

    if (!notification_id) {
      return NextResponse.json(
        {
          error: "notification_id is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("id", notification_id)
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
      "Mark notification as read error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to mark notification as read.",
      },
      {
        status: 500,
      }
    );
  }
}