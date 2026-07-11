import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { updateCategory } from "../actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return {
    title: `Edit Category | ${id}`,
  };
}

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!supabaseAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Supabase is not configured.
        </p>
      </main>
    );
  }

  const { id } = await params;

  const { data: category } = await supabaseAdmin
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (!category) {
    notFound();
  }

  const updateAction = updateCategory.bind(null, id);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Edit Category
            </h1>

            <p className="mt-2 text-gray-600">
              Update category information.
            </p>
          </div>

          <Link
            href="/admin/categories"
            className="rounded-lg border px-5 py-3 hover:bg-gray-100"
          >
            Back
          </Link>
        </div>

        <form
          action={updateAction}
          className="space-y-6"
        >
          <div>
            <label className="mb-2 block font-medium">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              defaultValue={category.name}
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
              defaultValue={category.slug}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows={5}
              defaultValue={category.description ?? ""}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={category.is_active}
            />

            <span>Active Category</span>
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>

            <Link
              href="/admin/categories"
              className="rounded-lg border px-6 py-3 hover:bg-gray-100"
            >
              Cancel
            </Link>
          </div>
        </form>

      </div>
    </main>
  );
}