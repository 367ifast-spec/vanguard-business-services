import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { deleteService } from "./actions";

export const metadata = {
  title: "Services | Admin Dashboard",
};

type SearchParams = {
  search?: string;
  status?: string;
  category?: string;
  sort?: string;
  page?: string;
};


type ServiceRow = {
  id: string;
  title: string;
  price: number | null;
  image_url: string | null;
  is_active: boolean;
  category_id: string | null;
  created_at: string;
  categories:
    | {
        name: string;
      }[]
    | {
        name: string;
      }
    | null;
};


export default async function ServicesPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  if (!supabaseAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-2xl border border-red-200 bg-white p-10 shadow">
          <p className="text-lg font-semibold text-red-600">
            Supabase is not configured.
          </p>
        </div>
      </main>
    );
  }


  const params = (await searchParams) ?? {};

  const search = params.search ?? "";
  const status = params.status ?? "all";
  const category = params.category ?? "all";
  const sort = params.sort ?? "newest";

  const page = Number(params.page ?? "1");
  const pageSize = 10;


  const { data: categories } = await supabaseAdmin
    .from("categories")
    .select("id,name")
    .order("name", {
      ascending: true,
    });


  let query = supabaseAdmin
    .from("services")
    .select(
      `
      id,
      title,
      price,
      image_url,
      is_active,
      category_id,
      created_at,
      categories (
        name
      )
      `,
      {
        count: "exact",
      }
    );


  if (search) {
    query = query.ilike(
      "title",
      `%${search}%`
    );
  }


  if (status === "active") {
    query = query.eq(
      "is_active",
      true
    );
  }


  if (status === "inactive") {
    query = query.eq(
      "is_active",
      false
    );
  }


  if (category !== "all") {
    query = query.eq(
      "category_id",
      category
    );
  }


  if (sort === "price_low") {
    query = query.order(
      "price",
      {
        ascending: true,
      }
    );
  } else if (sort === "price_high") {
    query = query.order(
      "price",
      {
        ascending: false,
      }
    );
  } else {
    query = query.order(
      "created_at",
      {
        ascending: false,
      }
    );
  }


  const from =
    (page - 1) * pageSize;

  const to =
    from + pageSize - 1;


  const {
    data,
    error,
    count,
  } = await query.range(
    from,
    to
  );


  const services =
    (data as ServiceRow[]) ?? [];
      if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-2xl border border-red-200 bg-white p-10 shadow">
          <p className="text-lg font-semibold text-red-600">
            {error.message}
          </p>
        </div>
      </main>
    );
  }


  const totalServices = count ?? 0;


  const activeServices =
    services.filter(
      (item) => item.is_active
    ).length;


  const inactiveServices =
    services.filter(
      (item) => !item.is_active
    ).length;


  return (
    <main className="min-h-screen bg-slate-100 p-6 lg:p-8">

      <div className="mx-auto max-w-7xl space-y-8">


        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                Enterprise Service Management
              </span>


              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
                Services
              </h1>


              <p className="mt-3 max-w-2xl text-slate-600">
                Manage services, pricing, categories,
                availability and business operations.
              </p>

            </div>


            <Link
              href="/admin/services/new"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              + Add Service
            </Link>


          </div>

        </div>



        <div className="grid gap-6 md:grid-cols-3">


          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Total Services
            </p>


            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              {totalServices}
            </h2>

          </div>



          <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-medium uppercase tracking-wide text-green-600">
              Active
            </p>


            <h2 className="mt-3 text-4xl font-bold text-green-700">
              {activeServices}
            </h2>

          </div>



          <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-medium uppercase tracking-wide text-red-600">
              Inactive
            </p>


            <h2 className="mt-3 text-4xl font-bold text-red-600">
              {inactiveServices}
            </h2>

          </div>


        </div>



        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

         <form className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">


            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Search
              </label>


              <input
                name="search"
                defaultValue={search}
                placeholder="Search service..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>



            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>


              <select
                name="status"
                defaultValue={status}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              >

                <option value="all">
                  All Status
                </option>

                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>

              </select>

            </div>
                        <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Category
              </label>


              <select
                name="category"
                defaultValue={category}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              >

                <option value="all">
                  All Categories
                </option>


                {categories?.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}


              </select>

            </div>



            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Sort
              </label>


              <select
                name="sort"
                defaultValue={sort}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
              >

                <option value="newest">
                  Newest
                </option>


                <option value="price_low">
                  Price Low
                </option>


                <option value="price_high">
                  Price High
                </option>


              </select>

            </div>



            <div className="flex items-end">

              <button
  type="submit"
  className="w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
  style={{ color: "#ffffff" }}
>
  Apply Filters
</button>

            </div>


          </form>

        </div>




        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">


          <div className="border-b border-slate-200 px-6 py-5">

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">


              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  All Services
                </h2>


                <p className="mt-1 text-sm text-slate-500">
                  Manage service information, images,
                  pricing and availability.
                </p>

              </div>


              <div className="text-sm font-medium text-slate-500">
                Showing {services.length} records
              </div>


            </div>

          </div>




          <div className="overflow-x-auto">


            <table className="min-w-full">


              <thead className="bg-slate-50">

                <tr className="border-b border-slate-200">


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                    Service
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                    Category
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                    Price
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                    Status
                  </th>


                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                    Actions
                  </th>


                </tr>


              </thead>



              <tbody>

                {services.length > 0 ? (

                  services.map((service) => (

                    <tr
                      key={service.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">


                          {service.image_url ? (

                            <img
                              src={service.image_url}
                              alt={service.title}
                              className="h-14 w-14 rounded-xl object-cover"
                            />

                          ) : (

                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                              📦
                            </div>

                          )}


                          <div>

                            <p className="font-semibold text-slate-900">
                              {service.title}
                            </p>


                            <p className="mt-1 text-xs text-slate-500">
                              ID: {service.id}
                            </p>


                          </div>


                        </div>


                      </td>
                                            <td className="px-6 py-5">

                        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">

                          {Array.isArray(service.categories)
                            ? service.categories[0]?.name ??
                              "Uncategorized"
                            : service.categories?.name ??
                              "Uncategorized"}

                        </span>

                      </td>



                      <td className="px-6 py-5">

                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">

                          ${service.price ?? 0}

                        </span>

                      </td>



                      <td className="px-6 py-5">

                        {service.is_active ? (

                          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                            Active

                          </span>

                        ) : (

                          <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">

                            Inactive

                          </span>

                        )}

                      </td>




                      <td className="px-6 py-5">

                        <div className="flex flex-wrap gap-2">


                          <Link
                            href={`/admin/services/${service.id}`}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Edit
                          </Link>



                          <form
                            action={deleteService.bind(
                              null,
                              service.id
                            )}
                          >

                          <button
  type="submit"
  className="w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
  style={{ color: "#ffffff" }}
>
  Apply Filters
</button>

                          </form>


                        </div>

                      </td>


                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={5}
                      className="px-6 py-20 text-center"
                    >

                      <div className="mx-auto flex max-w-md flex-col items-center">


                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-5xl">
                          📦
                        </div>


                        <h3 className="text-2xl font-bold text-slate-900">
                          No Services Found
                        </h3>


                        <p className="mt-3 text-slate-500">
                          No services match your current filters.
                          Create a new service to continue.
                        </p>


                        <Link
  href="/admin/services/new"
  className="mt-8 inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
>
  + Add Service
</Link>


                      </div>

                    </td>

                  </tr>

                )}

              </tbody>


            </table>


          </div>
                    <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">


            <p className="text-sm text-slate-500">

              Page {page} of{" "}

              {Math.max(
                1,
                Math.ceil(totalServices / pageSize)
              )}

            </p>



            <div className="flex gap-3">


              {page > 1 && (

                <Link
                  href={`?search=${search}&status=${status}&category=${category}&sort=${sort}&page=${
                    page - 1
                  }`}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Previous
                </Link>

              )}



              {page <
                Math.ceil(totalServices / pageSize) && (

                <Link
                  href={`?search=${search}&status=${status}&category=${category}&sort=${sort}&page=${
                    page + 1
                  }`}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Next
                </Link>

              )}


            </div>


          </div>


        </div>


      </div>


    </main>
  );
}