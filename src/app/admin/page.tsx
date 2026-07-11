import { supabaseAdmin } from "@/lib/supabase";
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
    .eq("payment_status", "waiting");

  const { count: completedPayments } = await supabaseAdmin
    .from("payments")
    .select("*", { count: "exact", head: true })
    .in("payment_status", ["finished", "confirmed"]);

  const { data: recentPayments } = await supabaseAdmin
    .from("payments")
    .select(
      "payment_id, quote_id, pay_currency, pay_amount, payment_status, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mb-8 text-gray-600">
          Vanguard Business Services Admin Panel
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-sm font-medium text-gray-500">
              Total Quotes
            </h2>

            <p className="mt-3 text-3xl font-bold">
              {totalQuotes ?? 0}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-sm font-medium text-gray-500">
              Total Payments
            </h2>

            <p className="mt-3 text-3xl font-bold">
              {totalPayments ?? 0}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-sm font-medium text-gray-500">
              Pending Payments
            </h2>

            <p className="mt-3 text-3xl font-bold text-yellow-600">
              {pendingPayments ?? 0}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-sm font-medium text-gray-500">
              Completed Payments
            </h2>

            <p className="mt-3 text-3xl font-bold text-green-600">
              {completedPayments ?? 0}
            </p>
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
                </tr>
              ))}

              {!recentQuotes?.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-6 text-center text-gray-500"
                  >
                    No quotes found.
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
                    {payment.pay_amount} {payment.pay_currency}
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
                    className="p-6 text-center text-gray-500"
                  >
                    No payments found.
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