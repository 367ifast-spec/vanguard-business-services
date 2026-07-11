import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
export const metadata = {
  title: "Categories | Admin Dashboard",
};

export default async function CategoriesPage() {
    if (!supabaseAdmin) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-red-600">
        Supabase is not configured.
      </p>
    </main>
  );
}

const { data: categories } = await supabaseAdmin
  .from("service_categories")
  .select("*")
  .order("sort_order")
  .order("name");
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl bg-white p-8 shadow">
          <h1 className="text-4xl font-bold text-gray-900">
            Categories Management
          </h1>

          <p className="mt-2 text-gray-600">
            <div className="mt-6">
  <Link
    href="/admin/categories/new"
    className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
  >
    + Add Category
  </Link>
</div>
            Manage all service categories from one place.
          </p>

          <div className="mt-10 overflow-x-auto rounded-xl border bg-white">
  <table className="min-w-full">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-4 text-left">Name</th>
        <th className="p-4 text-left">Slug</th>
        <th className="p-4 text-left">Status</th>
      </tr>
    </thead>

    <tbody>
      {categories?.map((category) => (
        <tr
          key={category.id}
          className="border-t"
        >
          <td className="p-4">
            {category.name}
          </td>

          <td className="p-4">
            {category.slug}
          </td>

          <td className="p-4">
            {category.active ? "Active" : "Inactive"}
          </td>
        </tr>
      ))}

      {!categories?.length && (
        <tr>
          <td
            colSpan={3}
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