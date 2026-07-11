import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase is not configured." },
        { status: 500 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("quotes")
      .select(
        "quote_id, full_name, email, service, status, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const headers = [
      "Quote ID",
      "Full Name",
      "Email",
      "Service",
      "Status",
      "Created At",
    ];

    const rows = (data ?? []).map((quote) => [
      quote.quote_id,
      quote.full_name,
      quote.email,
      quote.service,
      quote.status,
      quote.created_at
        ? new Date(quote.created_at).toLocaleString("en-US")
        : "",
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value ?? "").replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const filename = `quotes-${
      new Date().toISOString().split("T")[0]
    }.csv`;

    return new NextResponse("\uFEFF" + csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}