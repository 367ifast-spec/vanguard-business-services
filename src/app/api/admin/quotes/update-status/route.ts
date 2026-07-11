import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const { quote_id, status } = await req.json();

    if (!quote_id || !status) {
      return NextResponse.json(
        { error: "quote_id and status are required" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("quotes")
      .update({ status })
      .eq("quote_id", quote_id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quote status updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}