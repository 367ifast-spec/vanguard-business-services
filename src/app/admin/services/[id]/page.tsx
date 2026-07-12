import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { updateService } from "./actions";
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
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Supabase is not configured.
        </p>
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
    .select("id, name")
    .eq("is_active", true)
    .order("name");

if (categoriesError) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-red-600 font-semibold">
        {categoriesError.message}
      </p>
    </main>
  );
}
  if (error || !service) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Service not found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Edit Service
            </h1>

            <p className="mt-2 text-gray-600">
              Service ID: {id}
            </p>
          </div>

          <Link
            href="/admin/services"
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            ← Back
          </Link>
        </div>

        <form
  action={updateService.bind(null, service.id)}
  className="space-y-6"
>

  <div>
    <label className="mb-2 block font-medium">
      Category
    </label>

    <select
      name="category_id"
      defaultValue={service.category_id ?? ""}
      className="w-full rounded-lg border border-gray-300 px-4 py-3"
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
    <label className="mb-2 block font-medium">
      Service Title
    </label>

    <input
      type="text"
      name="title"
      defaultValue={service.title}
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
      defaultValue={service.slug}
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
      defaultValue={service.short_description ?? ""}
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
      defaultValue={service.description ?? ""}
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
      defaultValue={service.price ?? 0}
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
      defaultValue={service.image_url ?? ""}
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
      defaultValue={service.sort_order ?? 0}
      className="w-full rounded-lg border border-gray-300 px-4 py-3"
    />
  </div>

  <div className="flex gap-6">

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="is_featured"
        defaultChecked={service.is_featured}
      />
      Featured
    </label>

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="is_active"
        defaultChecked={service.is_active}
      />
      Active
    </label>

  </div>

  <div className="flex items-center justify-between pt-4">

    <Link
      href="/admin/services"
      className="rounded-lg border px-6 py-3 hover:bg-gray-100"
    >
      Cancel
    </Link>

    <button
      type="submit"
      className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
    >
      Save Changes
    </button>

  </div>

</form>
              </div>
    </main>
  );
}