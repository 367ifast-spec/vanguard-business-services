import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

  const header = [
    "Order ID",
    "Customer Name",
    "Customer Email",
    "Amount",
    "Payment Method",
    "Payment Status",
    "Order Status",
    "NOWPayments Payment ID",
    "NOWPayments Order ID",
    "Created At",
  ];

  const rows = (orders ?? []).map((order) => [
    order.id,
    order.customer_name ?? "",
    order.customer_email ?? "",
    order.total_amount ?? "",
    order.payment_method ?? "",
    order.payment_status ?? "",
    order.status ?? "",
    order.nowpayments_payment_id ?? "",
    order.nowpayments_order_id ?? "",
    order.created_at ?? "",
  ]);

  const csv = [
    header.join(","),
    ...rows.map((row) =>
      row
        .map((value) =>
          `"${String(value ?? "").replace(/"/g, '""')}"`
        )
        .join(",")
    ),
  ].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="orders.csv"',
    },
  });
}