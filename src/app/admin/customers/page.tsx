import Link from "next/link";

import { supabaseAdmin } from "@/lib/supabase";


export const metadata = {
  title: "Customers | Admin Dashboard",
};



type Customer = {

  id: string;

  full_name: string | null;

  email: string | null;

  phone: string | null;

  country: string | null;

  total_orders: number | null;

  total_spent: number | null;

};



type CustomersPageProps = {

  searchParams: Promise<{

    search?: string;

    page?: string;

  }>;

};



const PAGE_SIZE = 10;



export default async function CustomersPage({

  searchParams,

}: CustomersPageProps) {



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



  const params =
    await searchParams;



  const search =
    params.search?.trim() ?? "";



  const currentPage =
    Number(
      params.page ?? "1"
    );



  const from =
    (currentPage - 1) *
    PAGE_SIZE;



  const to =
    from +
    PAGE_SIZE -
    1;



  let query =
    supabaseAdmin
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
        `,
        {
          count:
            "exact",
        }
      );



  if (search) {

    query =
      query.or(
        `full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
      );

  }



  const {

    data,

    count,

    error,

  } =
    await query
      .order(
        "total_spent",
        {
          ascending:
            false,
        }
      )
      .range(
        from,
        to
      );



  if (error) {

    throw new Error(
      error.message
    );

  }



  const customers =
    (data ?? []) as Customer[];



  const totalCustomers =
    count ?? 0;



  const totalOrders =
    customers.reduce(
      (
        sum,
        customer
      ) =>
        sum +
        Number(
          customer.total_orders ?? 0
        ),
      0
    );



  const totalRevenue =
    customers.reduce(
      (
        sum,
        customer
      ) =>
        sum +
        Number(
          customer.total_spent ?? 0
        ),
      0
    );



  const totalPages =
    Math.max(
      1,
      Math.ceil(
        totalCustomers /
        PAGE_SIZE
      )
    );
      return (

    <main className="min-h-screen bg-slate-100 p-6 lg:p-8">


      <div className="mx-auto max-w-7xl space-y-8">



        {/* Header */}

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">


          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


            <div>


              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                Enterprise Customer Management
              </span>


              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Customers
              </h1>


              <p className="mt-3 text-slate-600">
                Manage customer profiles, order history and spending analytics.
              </p>


            </div>


          </div>



          <form
            method="GET"
            className="mt-8 flex flex-col gap-4 md:flex-row"
          >

            <input

              type="text"

              name="search"

              defaultValue={search}

              placeholder="Search name, email or phone..."

              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"

            />


            <button

              type="submit"

              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"

            >

              Search

            </button>


          </form>


        </section>




        {/* Summary Cards */}


        <section className="grid gap-6 md:grid-cols-3">


          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Total Customers
            </p>


            <h2 className="mt-5 text-4xl font-bold text-slate-900">
              {totalCustomers}
            </h2>


          </div>




          <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
              Customer Orders
            </p>


            <h2 className="mt-5 text-4xl font-bold text-green-700">
              {totalOrders}
            </h2>


          </div>




          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Customer Revenue
            </p>


            <h2 className="mt-5 text-4xl font-bold text-blue-700">
              ${totalRevenue.toFixed(2)}
            </h2>


          </div>


        </section>




        {/* Customers Table */}


        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


          <div className="border-b border-slate-200 px-8 py-6">


            <h2 className="text-2xl font-bold text-slate-900">
              Customer List
            </h2>


            <p className="mt-2 text-sm text-slate-500">
              View customer information and business activity.
            </p>


          </div>




          <div className="overflow-x-auto">


            <table className="min-w-full">


              <thead className="bg-slate-50">


                <tr>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Customer
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Phone
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Country
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Orders
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Spent
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-600">
                    Action
                  </th>


                </tr>


              </thead>
                            <tbody>


                {customers.length > 0 ? (


                  customers.map((customer) => (


                    <tr

                      key={customer.id}

                      className="border-t border-slate-100 transition hover:bg-slate-50"

                    >


                      <td className="px-6 py-5">


                        <div className="font-semibold text-slate-900">

                          {customer.full_name ?? "-"}

                        </div>


                        <div className="mt-1 text-sm text-slate-500">

                          {customer.email ?? "-"}

                        </div>


                      </td>



                      <td className="px-6 py-5 text-slate-700">

                        {customer.phone ?? "-"}

                      </td>



                      <td className="px-6 py-5 text-slate-700">

                        {customer.country ?? "-"}

                      </td>



                      <td className="px-6 py-5 font-semibold text-slate-900">

                        {customer.total_orders ?? 0}

                      </td>



                      <td className="px-6 py-5 font-semibold text-blue-700">

                        $
                        {Number(
                          customer.total_spent ?? 0
                        ).toFixed(2)}

                      </td>



                      <td className="px-6 py-5">


                        <Link

                          href={`/admin/customers/${customer.id}`}

                          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"

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

                      className="px-6 py-16 text-center text-slate-500"

                    >

                      No customers found.

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

              {currentPage}

            </span>

            {" "}of{" "}

            <span className="font-bold text-slate-900">

              {totalPages}

            </span>


          </p>




          <div className="flex gap-3">


            {currentPage > 1 && (


              <Link

                href={`/admin/customers?search=${encodeURIComponent(
                  search
                )}&page=${currentPage - 1}`}

                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"

              >

                ← Previous

              </Link>


            )}



            {currentPage < totalPages && (


              <Link

                href={`/admin/customers?search=${encodeURIComponent(
                  search
                )}&page=${currentPage + 1}`}

                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"

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
