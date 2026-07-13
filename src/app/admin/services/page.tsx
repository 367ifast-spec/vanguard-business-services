import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { deleteService } from "./actions";

export const metadata = {
  title: "Services | Admin Dashboard",
};

export default async function ServicesPage() {
  if (!supabaseAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Supabase is not configured.
        </p>
      </main>
    );
  }

  const { data: services, error } =
    await supabaseAdmin
      .from("services")
      .select(
        `
        id,
        title,
        price,
        is_active,
        categories (
          name
        )
        `
      )
      .order("created_at", {
        ascending: false,
      });


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

      <div className="mx-auto max-w-7xl">

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

         <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
  <div>
    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
      Service Management
    </span>

    <h1 className="mt-3 text-4xl font-bold text-gray-900">
      Services
    </h1>

    <p className="mt-2 text-gray-600">
      Manage all business services, pricing, categories and availability from one place.
    </p>
  </div>

  <Link
    href="/admin/services/new"
    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
  >
    + Add Service
  </Link>
</div>


          <div className="overflow-x-auto rounded-2xl border border-gray-200">
  <table className="min-w-full">

            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                  Action
                </th>
              </tr>
            </thead>


            <tbody>
  {services && services.length > 0 ? (
    services.map((service) => (
      <tr
        key={service.id}
        className="border-b transition-colors hover:bg-gray-50"
      >
        <td className="px-6 py-4">
          {service.title}
        </td>

        <td className="px-6 py-4">
          {Array.isArray(service.categories)
            ? service.categories[0]?.name ?? "-"
            : "-"}
        </td>

        <td className="px-6 py-4">
          ${service.price ?? 0}
        </td>

        <td className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/admin/services/${service.id}`}
              className="rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
            >
              Edit
            </Link>

            <form
              action={deleteService.bind(null, service.id)}
            >
              <button
                className="rounded-lg bg-red-600 px-3 py-2 text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </form>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={4}
        className="px-6 py-16 text-center"
      >
        <div className="flex flex-col items-center">
          <div className="mb-4 text-5xl">📦</div>

          <h3 className="text-xl font-semibold text-gray-900">
            No Services Found
          </h3>

          <p className="mt-2 text-gray-500">
            Create your first service to get started.
          </p>

          <Link
            href="/admin/services/new"
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
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

        </div>

      </div>

    </main>
  );
}