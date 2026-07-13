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
    sort?: string;
  }>;
}


const PAGE_SIZE = 10;


export default async function OrdersPage({
  searchParams,
}: OrdersPageProps) {


  const params =
    await searchParams;


  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;


  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;


  if (
    !supabaseUrl ||
    !serviceRoleKey
  ) {
    throw new Error(
      "Supabase is not configured."
    );
  }



  const supabase =
    createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken:
            false,

          persistSession:
            false,
        },
      }
    );



  const page =
    Number(
      params.page ?? "1"
    );


  const search =
    params.search?.trim() ?? "";


  const status =
    params.status ?? "";


  const payment =
    params.payment ?? "";


  const sort =
    params.sort ?? "newest";



  let query =
    supabase
      .from("orders")
      .select(
        "*",
        {
          count:
            "exact",
        }
      );



  if (search) {

    query =
      query.or(
        `customer_name.ilike.%${search}%,customer_email.ilike.%${search}%`
      );

  }



  if (status) {

    query =
      query.eq(
        "status",
        status
      );

  }



  if (payment) {

    query =
      query.eq(
        "payment_status",
        payment
      );

  }



  if (sort === "amount_high") {

    query =
      query.order(
        "total_amount",
        {
          ascending:
            false,
        }
      );

  } else if (
    sort === "amount_low"
  ) {

    query =
      query.order(
        "total_amount",
        {
          ascending:
            true,
        }
      );

  } else {

    query =
      query.order(
        "created_at",
        {
          ascending:
            false,
        }
      );

  }


  const from =
    (page - 1) *
    PAGE_SIZE;


  const to =
    from +
    PAGE_SIZE -
    1;



  const {
    data: orders,
    count,
    error,
  } =
    await query.range(
      from,
      to
    );



  if (error) {

    throw new Error(
      error.message
    );

  }



  const totalPages =
    Math.max(
      1,
      Math.ceil(
        (count ?? 0) /
        PAGE_SIZE
      )
    );
      const { count: pendingOrders } =
    await supabase
      .from("orders")
      .select(
        "*",
        {
          count:
            "exact",
          head:
            true,
        }
      )
      .eq(
        "status",
        "pending"
      );



  const { count: completedOrders } =
    await supabase
      .from("orders")
      .select(
        "*",
        {
          count:
            "exact",
          head:
            true,
        }
      )
      .eq(
        "status",
        "completed"
      );



  const { data: revenueRows } =
    await supabase
      .from("orders")
      .select(
        "total_amount"
      )
      .eq(
        "payment_status",
        "finished"
      );



  const totalRevenue =
    revenueRows?.reduce(
      (
        sum,
        row
      ) =>
        sum +
        Number(
          row.total_amount ?? 0
        ),
      0
    ) ?? 0;



  return (

    <main className="min-h-screen bg-slate-100 p-6 lg:p-8">

      <div className="mx-auto max-w-7xl space-y-8">



        {/* Header */}

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">


            <div>

              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                Enterprise Order Management
              </span>


              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Orders Dashboard
              </h1>


              <p className="mt-3 max-w-3xl text-slate-600">
                Manage customer orders, payments, revenue and fulfillment operations.
              </p>


            </div>



            <a
              href="/api/admin/orders/export"
              className="rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-green-700"
            >
              Export CSV
            </a>


          </div>




          <form className="mt-8 grid gap-4 lg:grid-cols-6">


            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search customer..."
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 lg:col-span-2"
            />



            <select
              name="status"
              defaultValue={status}
              className="rounded-xl border border-slate-300 px-4 py-3"
            >

              <option value="">
                All Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="processing">
                Processing
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="cancelled">
                Cancelled
              </option>

            </select>




            <select
              name="payment"
              defaultValue={payment}
              className="rounded-xl border border-slate-300 px-4 py-3"
            >

              <option value="">
                All Payments
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="confirmed">
                Confirmed
              </option>

              <option value="finished">
                Finished
              </option>

              <option value="failed">
                Failed
              </option>

            </select>



            <select
              name="sort"
              defaultValue={sort}
              className="rounded-xl border border-slate-300 px-4 py-3"
            >

              <option value="newest">
                Newest
              </option>

              <option value="amount_high">
                Highest Amount
              </option>

              <option value="amount_low">
                Lowest Amount
              </option>


            </select>




            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Filter
            </button>


          </form>


        </section>
                {/* Summary Cards */}

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">


          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Total Orders
            </p>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              {count ?? 0}
            </h2>

          </div>



          <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-wide text-yellow-700">
              Pending Orders
            </p>

            <h2 className="mt-4 text-4xl font-bold text-yellow-700">
              {pendingOrders ?? 0}
            </h2>

          </div>



          <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
              Completed Orders
            </p>

            <h2 className="mt-4 text-4xl font-bold text-green-700">
              {completedOrders ?? 0}
            </h2>

          </div>



          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Revenue
            </p>

            <h2 className="mt-4 text-4xl font-bold text-blue-700">
              ${totalRevenue.toFixed(2)}
            </h2>

          </div>


        </section>



        {/* Orders Table */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


          <div className="border-b border-slate-200 px-6 py-5">

            <h2 className="text-xl font-bold text-slate-900">
              All Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review customer orders and payment status.
            </p>

          </div>



          <div className="overflow-x-auto">

            <table className="min-w-full">


              <thead className="bg-slate-50">

                <tr className="border-b border-slate-200">

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Payment
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

                {orders?.length ? (

                  orders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >


                      <td className="px-6 py-5">

                        <p className="font-mono text-xs text-slate-700">
                          {order.id}
                        </p>

                      </td>



                      <td className="px-6 py-5">

                        <p className="font-semibold text-slate-900">
                          {order.customer_name}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {order.customer_email}
                        </p>

                      </td>



                      <td className="px-6 py-5">

                        <span className="font-semibold text-slate-900">
                          ${Number(
                            order.total_amount ?? 0
                          ).toFixed(2)}
                        </span>

                      </td>



                      <td className="px-6 py-5">

                        <PaymentStatusBadge
                          status={
                            order.payment_status
                          }
                        />

                      </td>



                      <td className="px-6 py-5">

                        <OrderStatusBadge
                          status={
                            order.status
                          }
                        />

                      </td>



                      <td className="px-6 py-5">

                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
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
                      className="px-6 py-20 text-center text-slate-500"
                    >
                      No orders found.
                    </td>

                  </tr>

                )}

              </tbody>


            </table>


          </div>


        </section>
                {/* Pagination */}

        <section className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">


          <p className="text-sm font-medium text-slate-600">

            Showing page{" "}

            <span className="font-bold text-slate-900">
              {page}
            </span>

            {" "}of{" "}

            <span className="font-bold text-slate-900">
              {totalPages}
            </span>

          </p>



          <div className="flex gap-3">


            {page > 1 && (

              <Link
                href={`/admin/orders?page=${
                  page - 1
                }&search=${encodeURIComponent(
                  search
                )}&status=${status}&payment=${payment}&sort=${sort}`}
                className="rounded-xl border border-slate-300 px-5 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                ← Previous
              </Link>

            )}



            {page < totalPages && (

              <Link
                href={`/admin/orders?page=${
                  page + 1
                }&search=${encodeURIComponent(
                  search
                )}&status=${status}&payment=${payment}&sort=${sort}`}
                className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
              >
                Next →
              </Link>

            )}


          </div>


        </section>


      </div>

    </main>

  );

}