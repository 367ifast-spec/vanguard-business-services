import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { updateService, deleteService } from "../actions";

export const metadata = {
  title: "Edit Service | Admin Dashboard",
};

export default async function EditServicePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
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


  const { data: service, error } =
    await supabaseAdmin
      .from("services")
      .select("*")
      .eq("id", id)
      .single();


  if (error || !service) {
    notFound();
  }


  const { data: categories } =
    await supabaseAdmin
      .from("categories")
      .select("id,name")
      .eq("is_active", true)
      .order("name");


  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-4xl">

        <div className="rounded-xl bg-white p-8 shadow">


          <div className="mb-8 flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Service
              </h1>

              <p className="mt-2 text-gray-600">
                Update service information.
              </p>
            </div>


            <Link
              href="/admin/services"
              className="rounded-lg bg-gray-700 px-5 py-3 text-white"
            >
              Back
            </Link>

          </div>



          <form
            action={updateService.bind(
              null,
              service.id
            )}
            className="space-y-6"
          >


            <div>

              <label className="mb-2 block font-medium">
                Service Title
              </label>

              <input
                name="title"
                defaultValue={service.title}
                required
                className="w-full rounded-lg border p-3"
              />

            </div>



            <div>

              <label className="mb-2 block font-medium">
                Slug
              </label>

              <input
                name="slug"
                defaultValue={service.slug}
                required
                className="w-full rounded-lg border p-3"
              />

            </div>



            <div>

              <label className="mb-2 block font-medium">
                Category
              </label>


              <select
                name="category_id"
                defaultValue={service.category_id ?? ""}
                className="w-full rounded-lg border p-3"
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
                Price
              </label>


              <input
                type="number"
                step="0.01"
                name="price"
                defaultValue={service.price ?? 0}
                className="w-full rounded-lg border p-3"
              />

            </div>




            <div>

              <label className="mb-2 block font-medium">
                Image URL
              </label>


              <input
                name="image_url"
                defaultValue={service.image_url ?? ""}
                className="w-full rounded-lg border p-3"
              />

            </div>




            <div>

              <label className="mb-2 block font-medium">
                Short Description
              </label>


              <textarea
                name="short_description"
                defaultValue={
                  service.short_description ?? ""
                }
                rows={3}
                className="w-full rounded-lg border p-3"
              />

            </div>




            <div>

              <label className="mb-2 block font-medium">
                Description
              </label>


              <textarea
                name="description"
                defaultValue={
                  service.description ?? ""
                }
                rows={6}
                className="w-full rounded-lg border p-3"
              />

            </div>




            <div className="flex gap-8">


              <label className="flex items-center gap-2">

                <input
                  type="checkbox"
                  name="is_featured"
                  defaultChecked={
                    service.is_featured
                  }
                />

                Featured

              </label>



              <label className="flex items-center gap-2">

                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={
                    service.is_active
                  }
                />

                Active

              </label>


            </div>




            <div className="flex items-center justify-between">


              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              >
                Update Service
              </button>



              <form
                action={deleteService.bind(
                  null,
                  service.id
                )}
              >

                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
                >
                  Delete Service
                </button>

              </form>


            </div>


          </form>


        </div>

      </div>

    </main>
  );
}