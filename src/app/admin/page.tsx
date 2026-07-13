import Link from "next/link";
import AdminSearch from "@/components/admin/AdminSearch";
import { supabaseAdmin } from "@/lib/supabase";
import DashboardModules from "@/components/admin/DashboardModules";
import RevenueCards from "@/components/admin/RevenueCards";
export const metadata = {
  title: "Admin Dashboard | Vanguard Business Services",
};

export default async function AdminDashboard() {
  if (!supabaseAdmin) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="space-y-2 text-center">
        <p>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "OK" : "Missing"}</p>
        <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "OK" : "Missing"}</p>
        <p>SUPABASE_SERVICE_ROLE_KEY: {process.env.SUPABASE_SERVICE_ROLE_KEY ? "OK" : "Missing"}</p>
      </div>
    </main>
  );
}

  const { count: totalQuotes } = await supabaseAdmin
    .from("quotes")
    .select("*", { count: "exact", head: true });

  const { data: recentQuotes } = await supabaseAdmin
    .from("quotes")
    .select(
      "quote_id, full_name, email, service, status, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(10);

  const { count: totalPayments } = await supabaseAdmin
    .from("payments")
    .select("*", { count: "exact", head: true });

  const { count: pendingPayments } = await supabaseAdmin
    .from("payments")
    .select("*", { count: "exact", head: true })
   .eq("payment_status", "pending");

  const { count: completedPayments } = await supabaseAdmin
    .from("payments")
    .select("*", { count: "exact", head: true })
    .in("payment_status", ["finished", "confirmed"]);

 const { data: recentPayments } = await supabaseAdmin
  .from("payments")
  .select(
    `
      payment_id,
      quote_id,
      amount,
      currency,
      pay_amount,
      pay_currency,
      price_amount,
      price_currency,
      payment_status,
      created_at
    `
  )
  .order("created_at", { ascending: false })
  .limit(10);
const { data: completedPaymentsData } = await supabaseAdmin
  .from("payments")
  .select("price_amount, created_at")
  .in("payment_status", ["finished", "confirmed"]);

const completedPaymentsList = completedPaymentsData ?? [];

const totalRevenue = completedPaymentsList.reduce((sum, payment) => {
  return sum + Number(payment.price_amount ?? 0);
}, 0);

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const monthlyRevenue = completedPaymentsList
  .filter((payment) => {
    const date = new Date(payment.created_at);

    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  })
  .reduce((sum, payment) => {
    return sum + Number(payment.price_amount ?? 0);
  }, 0);

const averageOrderValue =
  completedPaymentsList.length > 0
    ? totalRevenue / completedPaymentsList.length
    : 0;

const totalOrders = totalPayments ?? 0;

const pendingOrders = await supabaseAdmin
  .from("payments")
  .select("*", { count: "exact", head: true })
  .eq("payment_status", "pending");

const completedOrders = completedPaymentsList.length;
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
     <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
  <div>
    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
      Administration
    </span>

    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
      Admin Dashboard
    </h1>

    <p className="mt-2 max-w-2xl text-gray-600">
      Welcome to the Vanguard Business Services administration panel.
      Monitor revenue, payments, orders and customer activity from one
      central dashboard.
    </p>
  </div>

  <form action="/api/admin/logout" method="POST">
    <button
      type="submit"
      className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-red-700"
    >
      Logout
    </button>
  </form>
</div>

<div className="space-y-6">
  <AdminSearch />
  <DashboardModules />
</div>

  <RevenueCards
  totalRevenue={totalRevenue}
  monthlyRevenue={monthlyRevenue}
  averageOrderValue={averageOrderValue}
  totalOrders={totalOrders}
  pendingOrders={pendingOrders.count ?? 0}
  completedOrders={completedOrders}
/>

<div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
  <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
      Total Quotes
    </h2>

    <div className="mt-auto pt-6">
      <p className="text-4xl font-bold text-gray-900">
        {totalQuotes ?? 0}
      </p>
    </div>
  </div>

  <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
      Total Payments
    </h2>

    <div className="mt-auto pt-6">
      <p className="text-4xl font-bold text-gray-900">
        {totalPayments ?? 0}
      </p>
    </div>
  </div>

  <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
      Pending Payments
    </h2>

    <div className="mt-auto pt-6">
      <p className="text-4xl font-bold text-yellow-600">
        {pendingPayments ?? 0}
      </p>
    </div>
  </div>

  <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
      Completed Payments
    </h2>

    <div className="mt-auto pt-6">
      <p className="text-4xl font-bold text-green-600">
        {completedPayments ?? 0}
      </p>
    </div>
  </div>
</div>
                <div className="mt-10 rounded-xl bg-white p-6 shadow overflow-x-auto">
          <h2 className="mb-4 text-2xl font-semibold">
            Recent Quotes
          </h2>

          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Quote ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {recentQuotes?.map((quote) => (
                <tr
                  key={quote.quote_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">
                    {quote.quote_id}
                  </td>

                  <td className="p-3">
                    {quote.full_name}
                  </td>

                  <td className="p-3">
                    {quote.email}
                  </td>

                  <td className="p-3">
                    {quote.service}
                  </td>

                  <td className="p-3">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      {quote.status}
                    </span>
                    </td>
                    <td className="p-3">
  <Link
    href={`/admin/quotes/${quote.quote_id}`}
    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
  >
    View
  </Link>
</td>
                </tr>
              ))}

              {!recentQuotes?.length && (
  <tr>
    <td
      colSpan={6}
      className="p-10 text-center"
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 text-5xl">📄</div>

        <h3 className="text-lg font-semibold text-gray-800">
          No Quotes Yet
        </h3>

        <p className="mt-2 text-gray-500">
          Quote requests will appear here when customers submit them.
        </p>
      </div>
    </td>
  </tr>
)}
            </tbody>
          </table>
        </div>
                <div className="mt-10 rounded-xl bg-white p-6 shadow overflow-x-auto">
          <h2 className="mb-4 text-2xl font-semibold">
            Recent Payments
          </h2>

          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Payment ID</th>
                <th className="p-3 text-left">Quote ID</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {recentPayments?.map((payment) => (
                <tr
                  key={payment.payment_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">
                    {payment.payment_id}
                  </td>

                  <td className="p-3">
                    {payment.quote_id}
                  </td>

                  <td className="p-3">
                   {payment.price_amount ?? payment.pay_amount ?? payment.amount}{" "}
{payment.price_currency ??
  payment.pay_currency ??
  payment.currency}
                  </td>

                  <td className="p-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        payment.payment_status === "finished" ||
                        payment.payment_status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : payment.payment_status === "waiting"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.payment_status}
                    </span>
                  </td>

                  <td className="p-3">
                    {new Date(
                      payment.created_at
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {!recentPayments?.length && (
  <tr>
    <td
      colSpan={5}
      className="p-10 text-center"
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 text-5xl">💳</div>

        <h3 className="text-lg font-semibold text-gray-800">
          No Payments Yet
        </h3>

        <p className="mt-2 text-gray-500">
          Incoming crypto payments will appear here.
        </p>
      </div>
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