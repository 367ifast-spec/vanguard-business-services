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

        <div className="rounded-xl bg-white p-8 shadow">

          <div className="mb-6 flex justify-between">

            <h1 className="text-4xl font-bold">
              Services Management
            </h1>

            <Link
              href="/admin/services/new"
              className="rounded bg-blue-600 px-5 py-3 text-white"
            >
              Add Service
            </Link>

          </div>


          <table className="min-w-full border">

            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">
                  Title
                </th>

                <th className="p-3 text-left">
                  Category
                </th>

                <th className="p-3 text-left">
                  Price
                </th>

                <th className="p-3 text-left">
                  Action
                </th>
              </tr>
            </thead>


            <tbody>

              {services?.map((service) => (

                <tr
                  key={service.id}
                  className="border-b"
                >

                  <td className="p-3">
                    {service.title}
                  </td>


                  <td className="p-3">
                    {Array.isArray(service.categories)
                      ? service.categories[0]?.name ?? "-"
                      : "-"
                    }
                  </td>


                  <td className="p-3">
                    ${service.price ?? 0}
                  </td>


                  <td className="p-3 flex gap-2">

                    <Link
                      href={`/admin/services/${service.id}`}
                      className="rounded bg-blue-600 px-3 py-2 text-white"
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
                        className="rounded bg-red-600 px-3 py-2 text-white"
                      >
                        Delete
                      </button>
                    </form>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}