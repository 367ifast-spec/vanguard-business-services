import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { createService } from "./actions";

export const metadata = {
  title: "Add Service | Admin Dashboard",
};

export default async function NewServicePage() {
  if (!supabaseAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-3xl border border-red-200 bg-white p-10 shadow">
          <p className="text-lg font-semibold text-red-600">
            Supabase is not configured.
          </p>
        </div>
      </main>
    );
  }

  const { data: categories, error } = await supabaseAdmin
    .from("categories")
    .select("id,name")
    .eq("is_active", true)
    .order("name");

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-3xl border border-red-200 bg-white p-10 shadow">
          <p className="text-lg font-semibold text-red-600">
            {error.message}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                Enterprise Service Management
              </span>

              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Add New Service
              </h1>

              <p className="mt-3 text-slate-600">
                Create a new business service that customers can purchase from your website.
              </p>

            </div>

            <Link
              href="/admin/services"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold transition hover:bg-slate-100"
            >
              ← Back to Services
            </Link>

          </div>

        </div>

        <form
          action={createService}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Category
              </label>

              <select
                name="category_id"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              >
                <option value="">
                  Select Category
                </option>

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
              <label className="mb-2 block font-semibold text-slate-700">
                Price
              </label>

              <input
                type="number"
                step="0.01"
                name="price"
                defaultValue={0}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block font-semibold text-slate-700">
                Service Title
              </label>

              <input
                type="text"
                required
                name="title"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block font-semibold text-slate-700">
                Slug
              </label>

              <input
                type="text"
                required
                name="slug"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>
                        <div className="md:col-span-2">

              <label className="mb-2 block font-semibold text-slate-700">
                Short Description
              </label>

              <textarea
                name="short_description"
                rows={3}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block font-semibold text-slate-700">
                Full Description
              </label>

              <textarea
                name="description"
                rows={8}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold text-slate-700">
                Image URL
              </label>

              <input
                type="text"
                name="image_url"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold text-slate-700">
                Sort Order
              </label>

              <input
                type="number"
                name="sort_order"
                defaultValue={0}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>

          </div>

          <div className="mt-8 flex flex-wrap gap-8">

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-5 py-3">
              <input
                type="checkbox"
                name="is_featured"
              />

              <span className="font-medium text-slate-700">
                Featured Service
              </span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-5 py-3">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked
              />

              <span className="font-medium text-slate-700">
                Active Service
              </span>
            </label>

          </div>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/admin/services"
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Save Service
            </button>

          </div>

        </form>

      </div>
    </main>
  );
}