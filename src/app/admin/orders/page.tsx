import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
import PaymentStatusBadge from "@/components/admin/PaymentStatusBadge";
export const metadata = {
  title: "Orders | Admin",
};


interface OrdersPageProps {
searchParams: Promise<{
  page?: string;
  search?: string;
  status?: string;
  payment?: string;
}>;
}
const PAGE_SIZE = 10;

export default async function OrdersPage({
  searchParams,
}: OrdersPageProps) {
  const params = await searchParams;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Supabase is not configured.");
}

const supabase = createClient(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
  const page = Number(params.page ?? "1");
  const search = params.search?.trim() ?? "";
const status = params.status ?? "";
const payment = params.payment ?? "";
  let query = supabase
    .from("orders")
    .select("*", { count: "exact" });

  if (search) {
    query = query.or(
      `customer_name.ilike.%${search}%,customer_email.ilike.%${search}%`
    );
  }
if (status) {
  query = query.eq("status", status);
}

if (payment) {
  query = query.eq("payment_status", payment);
}
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: orders, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.max(
    1,
    Math.ceil((count ?? 0) / PAGE_SIZE)
  );
const { count: pendingOrders } = await supabase
  .from("orders")
  .select("*", { count: "exact", head: true })
  .eq("status", "pending");

const { count: completedOrders } = await supabase
  .from("orders")
  .select("*", { count: "exact", head: true })
  .eq("status", "completed");

const { data: revenueRows } = await supabase
  .from("orders")
  .select("total_amount")
  .eq("payment_status", "finished");

const totalRevenue =
  revenueRows?.reduce(
    (sum, row) => sum + Number(row.total_amount ?? 0),
    0
  ) ?? 0;
  return (
    <div className="space-y-6">
   <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
    <div>
      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
        Order Management
      </span>

      <h1 className="mt-3 text-3xl font-bold text-gray-900">
        Orders
      </h1>

      <p className="mt-2 text-gray-600">
        Manage customer orders, payment status, fulfillment and exports from one place.
      </p>
    </div>

    <a
      href="/api/admin/orders/export"
      className="rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-green-700"
    >
      Export CSV
    </a>
  </div>

  <form className="mt-8 grid gap-4 lg:grid-cols-[1fr_220px_220px_auto_auto]">
    <input
      type="text"
      name="search"
      defaultValue={search}
      placeholder="Search customer..."
      className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    />

    <select
      name="status"
      defaultValue={status}
      className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    >
      <option value="">All Status</option>
      <option value="pending">Pending</option>
      <option value="processing">Processing</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
    </select>

    <select
      name="payment"
      defaultValue={payment}
      className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    >
      <option value="">All Payments</option>
      <option value="pending">Pending</option>
      <option value="waiting">Waiting</option>
      <option value="confirming">Confirming</option>
      <option value="confirmed">Confirmed</option>
      <option value="finished">Finished</option>
      <option value="failed">Failed</option>
      <option value="expired">Expired</option>
    </select>

    <button
      type="submit"
      className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
    >
      Filter
    </button>

    <Link
      href="/admin/orders"
      className="rounded-xl border border-gray-300 px-6 py-3 text-center transition hover:bg-gray-50"
    >
      Reset
    </Link>
</form>
</div>

<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
  <div className="flex min-h-[150px] flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
      Total Orders
    </p>

    <h2 className="mt-6 text-4xl font-bold text-gray-900">
      {count ?? 0}
    </h2>
  </div>

  <div className="flex min-h-[150px] flex-col justify-between rounded-2xl border border-yellow-100 bg-yellow-50 p-6 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
      Pending Orders
    </p>

    <h2 className="mt-6 text-4xl font-bold text-yellow-600">
      {pendingOrders ?? 0}
    </h2>
  </div>

  <div className="flex min-h-[150px] flex-col justify-between rounded-2xl border border-green-100 bg-green-50 p-6 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
      Completed Orders
    </p>

    <h2 className="mt-6 text-4xl font-bold text-green-700">
      {completedOrders ?? 0}
    </h2>
  </div>

  <div className="flex min-h-[150px] flex-col justify-between rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
      Total Revenue
    </p>

    <h2 className="mt-6 break-words text-4xl font-bold text-blue-600">
      ${totalRevenue.toFixed(2)}
    </h2>
</div>
</div>
     <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
  <div className="overflow-x-auto">
        <table className="min-w-full">
         <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-600">Order</th>
<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-600">Customer</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-600">Amount</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-600">Payment</th>
<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-600">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-600"></th>
            </tr>
          </thead>

          <tbody>
            {orders?.length ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                 className="border-t transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-mono text-xs">
                    {order.id}
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {order.customer_name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {order.customer_email}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    ${Number(order.total_amount).toFixed(2)}
                  </td>

                  <td className="px-4 py-3">
  <PaymentStatusBadge
    status={order.payment_status}
  />
</td>

<td className="px-4 py-3">
  <OrderStatusBadge
    status={order.status}
  />
</td>

                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
      </table>
  </div>
</div>

      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
  <div>
    <p className="text-sm font-medium text-gray-600">
      Showing page <span className="font-bold">{page}</span> of{" "}
      <span className="font-bold">{totalPages}</span>
    </p>
  </div>

  <div className="flex gap-3">
    {page > 1 && (
      <Link
        href={`/admin/orders?page=${page - 1}&search=${encodeURIComponent(
          search
        )}&status=${status}&payment=${payment}`}
        className="rounded-xl border border-gray-300 px-5 py-2 font-medium transition hover:bg-gray-50"
      >
        ← Previous
      </Link>
    )}

    {page < totalPages && (
      <Link
        href={`/admin/orders?page=${page + 1}&search=${encodeURIComponent(
          search
        )}&status=${status}&payment=${payment}`}
        className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        Next →
      </Link>
    )}
  </div>
</div>
</div>
  );
}