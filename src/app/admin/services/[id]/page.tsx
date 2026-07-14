import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { updateService } from "./actions";
import ServiceImageUpload from "@/components/admin/ServiceImageUpload";

export const metadata = {
  title: "Edit Service | Admin Dashboard",
};

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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

  const { data: service, error } = await supabaseAdmin
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  const { data: categories, error: categoriesError } =
    await supabaseAdmin
      .from("categories")
      .select("id,name")
      .eq("is_active", true)
      .order("name");

  if (categoriesError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-3xl border border-red-200 bg-white p-10 shadow">
          <p className="text-lg font-semibold text-red-600">
            {categoriesError.message}
          </p>
        </div>
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-3xl border border-red-200 bg-white p-10 shadow">
          <p className="text-lg font-semibold text-red-600">
            Service not found.
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
              <span className="inline-flex rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
                Enterprise Service Management
              </span>

              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Edit Service
              </h1>

              <p className="mt-3 text-slate-600">
                Update your service information, pricing and visibility.
              </p>
            </div>

            <Link
              href="/admin/services"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              ← Back to Services
            </Link>

          </div>

        </div>
                <div className="mb-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-wide text-slate-500">
              Service ID
            </p>

            <p className="mt-2 break-all font-semibold text-slate-900">
              {service.id}
            </p>
          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm uppercase tracking-wide text-slate-500">
              Current Status
            </p>

            {service.is_active ? (
              <span className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Active
              </span>
            ) : (
              <span className="mt-3 inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                Inactive
              </span>
            )}

          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm uppercase tracking-wide text-slate-500">
              Current Price
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              ${service.price ?? 0}
            </p>

          </div>

        </div>


        <form
          action={updateService.bind(null, service.id)}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >

          <div className="grid gap-6 md:grid-cols-2">


            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Category
              </label>

              <select
                name="category_id"
                defaultValue={service.category_id ?? ""}
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
                defaultValue={service.price ?? 0}
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
                defaultValue={service.title}
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
                defaultValue={service.slug}
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
                defaultValue={service.short_description ?? ""}
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
                defaultValue={service.description ?? ""}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>


            <div className="md:col-span-2">

              <label className="mb-2 block font-semibold text-slate-700">
                Service Image
              </label>


              {service.image_url && (
                <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4">

                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="h-56 rounded-xl object-cover"
                  />

                </div>
              )}


              <ServiceImageUpload />


              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">

                <p className="text-sm font-semibold text-blue-700">
                  Current Image
                </p>

                <p className="mt-2 break-all text-xs text-slate-600">
                  {service.image_url || "No image uploaded"}
                </p>

              </div>

            </div>


            <div>

              <label className="mb-2 block font-semibold text-slate-700">
                Sort Order
              </label>

              <input
                type="number"
                name="sort_order"
                defaultValue={service.sort_order ?? 0}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>


          </div>


          <div className="mt-8 flex flex-wrap gap-8">

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-5 py-3">

              <input
                type="checkbox"
                name="is_featured"
                defaultChecked={service.is_featured}
              />

              <span className="font-medium text-slate-700">
                Featured Service
              </span>

            </label>


            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-5 py-3">

              <input
                type="checkbox"
                name="is_active"
                defaultChecked={service.is_active}
              />

              <span className="font-medium text-slate-700">
                Active Service
              </span>

            </label>

          </div>
                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-8">

            <Link
              href="/admin/services"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>


            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>

          </div>


        </form>


      </div>

    </main>
  );
}