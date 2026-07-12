import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export const metadata = {
  title: "Orders | Admin Dashboard",
};

export default async function OrdersPage() {
  if (!supabaseAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Supabase is not configured.
        </p>
      </main>
    );
  }

  const { data: orders, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          {error.message}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl rounded-xl bg-white p-8 shadow">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Orders Management
            </h1>

            <p className="mt-2 text-gray-600">
              Manage customer orders.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Created</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {order.customer_name}
                    </td>

                    <td className="p-4">
                      {order.customer_email}
                    </td>

                    <td className="p-4">
                      {order.payment_status}
                    </td>

                    <td className="p-4">
                      {order.status}
                    </td>

                    <td className="p-4">
                      ${Number(order.total_amount).toFixed(2)}
                    </td>

                    <td className="p-4">
                      {new Date(
                        order.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-10 text-center text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}