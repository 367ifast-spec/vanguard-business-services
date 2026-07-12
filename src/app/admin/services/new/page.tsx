import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { createService } from "./actions";

export const metadata = {
  title: "Add Service | Admin Dashboard",
};

export default async function NewServicePage() {
  if (!supabaseAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Supabase is not configured.
        </p>
      </main>
    );
  }

  const { data: categories, error } = await supabaseAdmin
    .from("categories")
    .select("id, name")
    .eq("is_active", true)
    .order("name");

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
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Service
            </h1>

            <p className="mt-2 text-gray-600">
              Create a new service.
            </p>
          </div>

          <Link
            href="/admin/services"
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            ← Back
          </Link>
        </div>

        <form action={createService} className="space-y-6">

          <div>
            <label className="mb-2 block font-medium">
              Category
            </label>

            <select
              name="category_id"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            >
              <option value="">Select Category</option>

              {categories?.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Service Title
            </label>

            <input
              type="text"
              name="title"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Short Description
            </label>

            <textarea
              name="short_description"
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Price
            </label>

            <input
              type="number"
              step="0.01"
              name="price"
              defaultValue={0}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Image URL
            </label>

            <input
              type="text"
              name="image_url"
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Sort Order
            </label>

            <input
              type="number"
              name="sort_order"
              defaultValue={0}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div className="flex gap-6">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_featured"
              />
              Featured
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked
              />
              Active
            </label>

          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Save Service
          </button>

        </form>
      </div>
    </main>
  );
}