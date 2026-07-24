import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { user_id } = body;

    if (!user_id) {
      return NextResponse.json(
        {
          error: "user_id is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { count, error } = await supabase
      .from("notifications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user_id)
      .eq("is_read", false);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      unread: count ?? 0,
    });
  } catch (error) {
    console.error(
      "Unread notifications error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch unread notifications.",
      },
      {
        status: 500,
      }
    );
  }
}