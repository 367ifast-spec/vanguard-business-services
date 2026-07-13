import Link from "next/link";
import { notFound } from "next/navigation";

import { supabaseAdmin } from "@/lib/supabase";


export const metadata = {
  title: "Customer Details | Admin Dashboard",
};



type Props = {
  params: Promise<{
    id: string;
  }>;
};



export default async function CustomerDetailsPage({
  params,
}: Props) {


  if (!supabaseAdmin) {

    return (

      <main className="flex min-h-screen items-center justify-center bg-slate-100">

        <div className="rounded-3xl border border-red-200 bg-white p-10 shadow-sm">

          <p className="font-semibold text-red-600">
            Supabase is not configured.
          </p>

        </div>

      </main>

    );

  }



  const {
    id,
  } =
    await params;



  const {
    data: customer,
    error,
  } =
    await supabaseAdmin
      .from("customers")
      .select(
        `
          id,
          full_name,
          email,
          phone,
          country,
          total_orders,
          total_spent
        `
      )
      .eq(
        "id",
        id
      )
      .single();



  if (
    error ||
    !customer
  ) {

    notFound();

  }



  const {
    data: orders,
    error: ordersError,
  } =
    await supabaseAdmin
      .from("orders")
      .select(
        `
          id,
          total_amount,
          status,
          payment_status,
          created_at
        `
      )
      .eq(
        "customer_id",
        id
      )
      .order(
        "created_at",
        {
          ascending:
            false,
        }
      );



  if (ordersError) {

    throw new Error(
      ordersError.message
    );

  }



  return (

    <main className="min-h-screen bg-slate-100 p-6 lg:p-8">


      <div className="mx-auto max-w-7xl space-y-8">


        {/* Header */}

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


            <div>


              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                Customer Profile
              </span>


              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Customer Details
              </h1>


              <p className="mt-3 text-slate-600">
                Review customer information, orders and spending activity.
              </p>


            </div>


            <Link
              href="/admin/customers"
              className="rounded-xl border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 hover:bg-slate-100"
            >
              ← Back Customers
            </Link>


          </div>


        </section>
                {/* Profile & Statistics */}

        <section className="grid gap-8 xl:grid-cols-2">


          {/* Profile Card */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


            <h2 className="text-2xl font-bold text-slate-900">
              Customer Information
            </h2>



            <div className="mt-6 space-y-5">


              <div>

                <p className="text-sm text-slate-500">
                  Full Name
                </p>

                <p className="font-semibold text-slate-900">
                  {customer.full_name ?? "-"}
                </p>

              </div>



              <div>

                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="font-semibold text-slate-900">
                  {customer.email ?? "-"}
                </p>

              </div>



              <div>

                <p className="text-sm text-slate-500">
                  Phone
                </p>

                <p className="font-semibold text-slate-900">
                  {customer.phone ?? "-"}
                </p>

              </div>



              <div>

                <p className="text-sm text-slate-500">
                  Country
                </p>

                <p className="font-semibold text-slate-900">
                  {customer.country ?? "-"}
                </p>

              </div>


            </div>


          </div>




          {/* Statistics Card */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


            <h2 className="text-2xl font-bold text-slate-900">
              Customer Analytics
            </h2>



            <div className="mt-6 grid gap-5">


              <div className="rounded-2xl bg-slate-100 p-6">


                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Total Orders
                </p>


                <h3 className="mt-3 text-4xl font-bold text-slate-900">
                  {customer.total_orders ?? 0}
                </h3>


              </div>




              <div className="rounded-2xl bg-blue-50 p-6">


                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Total Spent
                </p>


                <h3 className="mt-3 text-4xl font-bold text-blue-700">
                  $
                  {Number(
                    customer.total_spent ?? 0
                  ).toFixed(2)}
                </h3>


              </div>


            </div>


          </div>


        </section>





        {/* Order History */}


        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


          <div className="border-b border-slate-200 px-8 py-6">


            <h2 className="text-2xl font-bold text-slate-900">
              Order History
            </h2>


            <p className="mt-2 text-sm text-slate-500">
              Customer previous orders and payment activity.
            </p>


          </div>



          <div className="overflow-x-auto">


            {orders && orders.length > 0 ? (

              <table className="min-w-full">


                <thead className="bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                      Order ID
                    </th>


                    <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                      Amount
                    </th>


                    <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                      Status
                    </th>


                    <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                      Payment
                    </th>


                    <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                      Action
                    </th>


                  </tr>


                </thead>
                                <tbody>


                  {orders && orders.length > 0 ? (


                    orders.map((order) => (


                      <tr

                        key={order.id}

                        className="border-t border-slate-100 transition hover:bg-slate-50"

                      >


                        <td className="px-6 py-5">


                          <p className="font-mono text-xs font-semibold text-slate-700">

                            {order.id}

                          </p>


                        </td>



                        <td className="px-6 py-5 font-semibold text-slate-900">


                          $
                          {Number(
                            order.total_amount ?? 0
                          ).toFixed(2)}


                        </td>



                        <td className="px-6 py-5">


                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">

                            {order.status}

                          </span>


                        </td>



                        <td className="px-6 py-5">


                          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

                            {order.payment_status}

                          </span>


                        </td>



                        <td className="px-6 py-5">


                          <Link

                            href={`/admin/orders/${order.id}`}

                            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"

                          >

                            View Order

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

                        No orders found for this customer.

                      </td>

                    </tr>


                  )}


                </tbody>


              </table>


            ) : null}


          </div>


        </section>



      </div>


    </main>


  );

}