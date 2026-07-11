import { supabaseAdmin } from "@/lib/supabase";

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

  const { data: services, error } = await supabaseAdmin
    .from("services")
    .select(`
      id,
      title,
      slug,
      price,
      is_active,
      is_featured,
      created_at,
      categories (
        name
      )
    `)
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

          <h1 className="text-4xl font-bold text-gray-900">
            Services Management
          </h1>

          <p className="mt-2 text-gray-600">
            Manage all business services.
          </p>


          <div className="mt-8 overflow-x-auto">

            <table className="min-w-full border">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">
                    Title
                  </th>

                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Price
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Featured
                  </th>
                </tr>
              </thead>


              <tbody>

                {services?.map((service) => (
                  <tr
                    key={service.id}
                    className="border-t"
                  >

                    <td className="p-4 font-medium">
                      {service.title}
                    </td>


                 <td className="p-4">
  {
    Array.isArray(service.categories)
      ? service.categories[0]?.name ?? "-"
      : "-"
  }
</td>


                    <td className="p-4">
                      ${service.price ?? 0}
                    </td>


                    <td className="p-4">
                      {service.is_active ? (
                        <span className="rounded bg-green-100 px-3 py-1 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded bg-red-100 px-3 py-1 text-red-700">
                          Inactive
                        </span>
                      )}
                    </td>


                    <td className="p-4">
                      {service.is_featured ? "Yes" : "No"}
                    </td>

                  </tr>
                ))}


                {!services?.length && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-10 text-center text-gray-500"
                    >
                      No services found.
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