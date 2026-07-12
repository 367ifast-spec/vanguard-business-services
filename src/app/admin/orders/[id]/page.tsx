import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export const metadata = {
  title: "Order Details | Admin Dashboard",
};

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!supabaseAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Supabase is not configured.
        </p>
      </main>
    );
  }

  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !order) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Order not found.
        </p>
      </main>
    );
  }

  const { data: items, error: itemsError } = await supabaseAdmin
    .from("order_items")
    .select("*")
    .eq("order_id", id);

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Order Details
          </h1>

          <Link
            href="/admin/orders"
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            ← Back
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-5">
            <h2 className="mb-3 font-semibold">
              Customer
            </h2>

            <p>
              <strong>Name:</strong> {order.customer_name}
            </p>

            <p>
              <strong>Email:</strong> {order.customer_email}
            </p>

            <p>
              <strong>WhatsApp:</strong>{" "}
              {order.customer_whatsapp ?? "-"}
            </p>

            <p>
              <strong>Country:</strong>{" "}
              {order.customer_country ?? "-"}
            </p>

            <p>
              <strong>Company:</strong>{" "}
              {order.company_name ?? "-"}
            </p>
          </div>

          <div className="rounded-lg border p-5">
            <h2 className="mb-3 font-semibold">
              Order
            </h2>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.payment_status}
            </p>

            <p>
              <strong>Method:</strong>{" "}
              {order.payment_method}
            </p>

            <p>
              <strong>Total:</strong> $
              {Number(order.total_amount).toFixed(2)}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {new Date(
                order.created_at
              ).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border p-6">
          <h2 className="mb-4 text-2xl font-semibold">
            Ordered Services
          </h2>

          {items && items.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">
                    Service
                  </th>

                  <th className="p-3 text-left">
                    Qty
                  </th>

                  <th className="p-3 text-left">
                    Unit Price
                  </th>

                  <th className="p-3 text-left">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b"
                  >
                    <td className="p-3">
                      {item.service_title}
                    </td>

                    <td className="p-3">
                      {item.quantity}
                    </td>

                    <td className="p-3">
                      $
                      {Number(
                        item.unit_price
                      ).toFixed(2)}
                    </td>

                    <td className="p-3">
                      $
                      {Number(
                        item.total_price
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">
              No services found.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}