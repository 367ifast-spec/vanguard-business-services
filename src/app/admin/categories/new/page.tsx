import { createCategory } from "../actions";
export const metadata = {
  title: "Add Category | Admin Dashboard",
};

export default function AddCategoryPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-900">
          Add New Category
        </h1>

        <p className="mt-2 text-gray-600">
          Create a new service category.
        </p>

    <form
  action={createCategory}
  className="mt-8 space-y-6"
>
          <div>
            <label className="mb-2 block font-medium">
              Category Name
            </label>

           <input
  type="text"
  name="name"
  placeholder="Business Formation"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
            
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              placeholder="business-formation"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
            name="description"
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Save Category
          </button>
        </form>
      </div>
    </main>
  );
}