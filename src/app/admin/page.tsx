import Link from "next/link";

import AdminSearch from "@/components/admin/AdminSearch";
import DashboardModules from "@/components/admin/DashboardModules";
import RevenueCards from "@/components/admin/RevenueCards";

import { supabaseAdmin } from "@/lib/supabase";


export const metadata = {
  title: "Admin Dashboard | Vanguard Business Services",
};



export default async function AdminDashboard() {


  if (!supabaseAdmin) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-slate-100">

        <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">

          <h2 className="text-xl font-bold text-red-600">
            Supabase Configuration Error
          </h2>


          <div className="mt-5 space-y-2 text-sm text-slate-600">

            <p>
              NEXT_PUBLIC_SUPABASE_URL:
              {" "}
              {process.env.NEXT_PUBLIC_SUPABASE_URL
                ? "OK"
                : "Missing"}
            </p>


            <p>
              SUPABASE_SERVICE_ROLE_KEY:
              {" "}
              {process.env.SUPABASE_SERVICE_ROLE_KEY
                ? "OK"
                : "Missing"}
            </p>

          </div>


        </div>


      </main>

    );

  }



  const [
  totalQuotesResult,
  recentQuotesResult,
  totalPaymentsResult,
  pendingPaymentsResult,
  completedPaymentsResult,
  recentPaymentsResult,
] = await Promise.all([
  supabaseAdmin
    .from("quotes")
    .select("*", {
      count: "exact",
      head: true,
    }),

  supabaseAdmin
    .from("quotes")
    .select(`
      quote_id,
      full_name,
      email,
      service,
      status,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(10),

  supabaseAdmin
    .from("payments")
    .select("*", {
      count: "exact",
      head: true,
    }),

  supabaseAdmin
    .from("payments")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("payment_status", "pending"),

  supabaseAdmin
    .from("payments")
    .select(`
      price_amount,
      created_at
    `)
    .in("payment_status", [
      "finished",
      "confirmed",
    ]),

  supabaseAdmin
    .from("payments")
    .select(`
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
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(10),
]);

const totalQuotes =
  totalQuotesResult.count ?? 0;

const recentQuotes =
  recentQuotesResult.data ?? [];

const totalPayments =
  totalPaymentsResult.count ?? 0;

const pendingPayments =
  pendingPaymentsResult.count ?? 0;

const completedPayments =
  completedPaymentsResult.data ?? [];

const recentPayments =
  recentPaymentsResult.data ?? [];

const totalRevenue =
  completedPayments.reduce(
    (sum, payment) =>
      sum + Number(payment.price_amount ?? 0),
    0
  );

const currentDate = new Date();

const monthlyRevenue =
  completedPayments
    .filter((payment) => {
      const paymentDate = new Date(payment.created_at);

      return (
        paymentDate.getMonth() === currentDate.getMonth() &&
        paymentDate.getFullYear() === currentDate.getFullYear()
      );
    })
    .reduce(
      (sum, payment) =>
        sum + Number(payment.price_amount ?? 0),
      0
    );

const averageOrderValue =
  completedPayments.length > 0
    ? totalRevenue / completedPayments.length
    : 0;

const totalOrders =
  totalPayments;

const pendingOrders =
  pendingPayments;

const completedOrders =
  completedPayments.length;



  return (

    <main className="min-h-screen bg-slate-100 p-6 lg:p-8">


      <div className="mx-auto max-w-7xl space-y-8">



        {/* Header */}


        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


            <div>


              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                Administration
              </span>



              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Admin Dashboard
              </h1>



              <p className="mt-3 max-w-3xl text-slate-600">
                Monitor revenue, payments, orders and customer activity from one central business dashboard.
              </p>


            </div>



            <form
              action="/api/admin/logout"
              method="POST"
            >

              <button
                type="submit"
                className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Logout
              </button>


            </form>


          </div>


        </section>



        {/* Dashboard Tools */}


        <section className="space-y-6">


          <AdminSearch />


          <DashboardModules />


        </section>




        {/* Revenue Analytics */}


        <RevenueCards

          totalRevenue={
            totalRevenue
          }

          monthlyRevenue={
            monthlyRevenue
          }

          averageOrderValue={
            averageOrderValue
          }

          totalOrders={
            totalOrders
          }

          pendingOrders={
            pendingOrders ?? 0
          }

          completedOrders={
            completedOrders
          }

        />
                {/* Summary Cards */}


        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">


          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Total Quotes
            </p>

            <h2 className="mt-5 text-4xl font-bold text-slate-900">
              {totalQuotes ?? 0}
            </h2>

          </div>



          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Total Payments
            </p>

            <h2 className="mt-5 text-4xl font-bold text-slate-900">
              {totalPayments ?? 0}
            </h2>

          </div>



          <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-wide text-yellow-700">
              Pending Payments
            </p>

            <h2 className="mt-5 text-4xl font-bold text-yellow-700">
              {pendingPayments ?? 0}
            </h2>

          </div>



          <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
              Completed Payments
            </p>

            <h2 className="mt-5 text-4xl font-bold text-green-700">
              {completedOrders}
            </h2>

          </div>


        </section>





        {/* Recent Quotes */}


        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


          <div className="border-b border-slate-200 px-8 py-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Recent Quotes
            </h2>


            <p className="mt-2 text-sm text-slate-500">
              Latest customer quote requests.
            </p>

          </div>



          <div className="overflow-x-auto">


            <table className="min-w-full">


              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Quote ID
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Service
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Action
                  </th>

                </tr>

              </thead>



              <tbody>


                {recentQuotes?.length ? (

                  recentQuotes.map((quote) => (

                    <tr
                     key={quote.quote_id ?? quote.created_at}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >


                      <td className="px-6 py-5 font-mono text-xs">
                        {quote.quote_id}
                      </td>



                      <td className="px-6 py-5">

                        <p className="font-semibold text-slate-900">
                          {quote.full_name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {quote.email}
                        </p>

                      </td>



                      <td className="px-6 py-5">
                        {quote.service}
                      </td>



                      <td className="px-6 py-5">

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                          {quote.status}
                        </span>

                      </td>



                      <td className="px-6 py-5">

                        <Link
                          href={`/admin/quotes/${quote.quote_id}`}
                          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          View
                        </Link>

                      </td>


                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={5}
                      className="px-6 py-16 text-center text-slate-500"
                    >
                      No quotes found.
                    </td>

                  </tr>

                )}


              </tbody>


            </table>


          </div>


        </section>
                {/* Recent Payments */}


        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


          <div className="border-b border-slate-200 px-8 py-6">


            <h2 className="text-2xl font-bold text-slate-900">
              Recent Payments
            </h2>


            <p className="mt-2 text-sm text-slate-500">
              Latest payment transactions from customers.
            </p>


          </div>




          <div className="overflow-x-auto">


            <table className="min-w-full">


              <thead className="bg-slate-50">


                <tr>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Payment ID
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Amount
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Currency
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Status
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Date
                  </th>


                </tr>


              </thead>



              <tbody>


                {recentPayments?.length ? (


                  recentPayments.map((payment) => (


                    <tr

                      key={payment.payment_id ?? payment.created_at}

                      className="border-t border-slate-100 transition hover:bg-slate-50"

                    >


                      <td className="px-6 py-5">

                        <p className="max-w-[220px] truncate font-mono text-xs text-slate-700">

                          {payment.payment_id ?? "-"}

                        </p>

                      </td>




                      <td className="px-6 py-5 font-semibold text-slate-900">


                        $

                        {Number(

                          payment.price_amount ?? 0

                        ).toFixed(2)}


                      </td>




                      <td className="px-6 py-5">


                        {payment.price_currency ?? "USD"}


                      </td>




                      <td className="px-6 py-5">


                        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

                          {payment.payment_status}

                        </span>


                      </td>




                      <td className="px-6 py-5 text-sm text-slate-500">


                        {new Date(

                          payment.created_at

                        ).toLocaleDateString()}


                      </td>


                    </tr>


                  ))


                ) : (


                  <tr>


                    <td

                      colSpan={5}

                      className="px-6 py-16 text-center text-slate-500"

                    >

                      No payments found.

                    </td>


                  </tr>


                )}


              </tbody>


            </table>


          </div>


        </section>



      </div>


    </main>


  );

}
