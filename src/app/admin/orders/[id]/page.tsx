import Link from "next/link";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
import PaymentStatusBadge from "@/components/admin/PaymentStatusBadge";
import OrderStatusForm from "@/components/admin/OrderStatusForm";
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
const { data: payment } = await supabaseAdmin
  .from("payments")
  .select("*")
  .eq("order_id", id)
  .maybeSingle();
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
  <div>
    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
      Order Management
    </span>

    <h1 className="mt-3 text-3xl font-bold text-gray-900">
      Order Details
    </h1>

    <p className="mt-2 text-gray-600">
      View customer information, ordered services, payment details and update order status.
    </p>
  </div>

  <Link
    href="/admin/orders"
    className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium transition hover:bg-gray-50"
  >
    ← Back to Orders
  </Link>
</div>

      <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
  Customer Information
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

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
           <h2 className="mb-5 text-xl font-bold text-gray-900">
  Order Information
</h2>

            <div className="flex items-center justify-between">
  <strong>Status</strong>

  <OrderStatusBadge
    status={order.status}
  />
</div>

            <div className="flex items-center justify-between">
  <strong>Payment</strong>

  <PaymentStatusBadge
    status={order.payment_status}
  />
</div>

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

        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
  <h2 className="text-2xl font-bold text-gray-900">
    Ordered Services
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    Services included in this order.
  </p>
</div>

          {items && items.length > 0 ? (
            <div className="overflow-x-auto">
  <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr className="border-b transition-colors hover:bg-gray-50">
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
</div>
          ) : (
            <p className="text-gray-500">
              No services found.
            </p>
          )}
        </div>
      </div>
      
  <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <h2 className="mb-5 text-2xl font-bold text-gray-900">
    Update Order Status
  </h2>

  <OrderStatusForm
    orderId={order.id}
    status={order.status}
    paymentStatus={order.payment_status}
  />
</div>

{/* Payment Information */}
<div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="mb-6 border-b border-gray-200 pb-4">
  <h2 className="text-2xl font-bold text-gray-900">
    Payment Information
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    Payment details associated with this order.
  </p>
</div>

  {payment ? (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <p className="text-sm text-gray-500">Payment ID</p>
        <p className="break-all">{payment.payment_id ?? "-"}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Invoice</p>

        {payment.invoice_url ? (
          <a
            href={payment.invoice_url}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-blue-600 hover:underline"
          >
            Open Invoice
          </a>
        ) : (
          "-"
        )}
      </div>

      <div>
        <p className="text-sm text-gray-500">Pay Amount</p>
        <p>
          {payment.pay_amount ?? "-"} {payment.pay_currency ?? ""}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Actually Paid</p>
        <p>{payment.actually_paid ?? "-"}</p>
      </div>
    </div>
  ) : (
    <p className="text-gray-500">
      No payment record found.
    </p>
  )}
</div>
</main>
  );
}