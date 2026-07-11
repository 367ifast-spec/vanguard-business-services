import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { deleteCategory } from "./actions";
export const metadata = {
  title: "Categories | Admin Dashboard",
};

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
    const { q = "" } = await searchParams;
  if (!supabaseAdmin) {
    
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Supabase is not configured.
        </p>
      </main>
    );
  }

const search = q.trim();

const { data: categories, error } = await supabaseAdmin
  .from("categories")
  .select("*")
  .or(
    search
      ? `name.ilike.%${search}%,slug.ilike.%${search}%`
      : "id.not.is.null"
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

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Categories Management
              </h1>

              <p className="mt-2 text-gray-600">
                Manage all service categories from one place.
              </p>
            </div>

            <Link
              href="/admin/categories/new"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              + Add Category
              
            </Link>
          </div>
<div className="mt-6 mb-6 flex items-center justify-between gap-4">

  <form
    action="/admin/categories"
    className="flex gap-2"
  >
    <input
      type="text"
      name="q"
      defaultValue={q}
      placeholder="Search categories..."
      className="w-64 rounded-lg border border-gray-300 px-4 py-3"
    />

    <button
      type="submit"
      className="rounded-lg bg-gray-800 px-5 py-3 text-white"
    >
      Search
    </button>
  </form>

  
</div>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-700">
                    Name
                  </th>

                  <th className="p-4 text-left font-semibold text-gray-700">
                    Slug
                  </th>

                  <th className="p-4 text-left font-semibold text-gray-700">
                    Description
                  </th>

                  <th className="p-4 text-left font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="p-4 text-left font-semibold text-gray-700">
                    Created
                  </th>

                  <th className="p-4 text-left font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium text-gray-900">
                        {category.name}
                      </td>

                      <td className="p-4 text-gray-700">
                        {category.slug}
                      </td>

                      <td className="p-4 text-gray-700">
                        {category.description || "-"}
                      </td>

                      <td className="p-4">
                        {category.is_active ? (
                          <span className="rounded bg-green-100 px-3 py-1 text-sm text-green-700">
                            Active
                          </span>
                        ) : (
                          <span className="rounded bg-red-100 px-3 py-1 text-sm text-red-700">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-gray-700">
                        {new Date(
                          category.created_at
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">

                          <Link
                            href={`/admin/categories/${category.id}`}
                            className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                          >
                            Edit
                          </Link>
<form action={deleteCategory.bind(null, category.id)}>
  <button
    type="submit"
    className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
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
                      colSpan={6}
                      className="p-10 text-center text-gray-500"
                    >
                      No categories found.
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