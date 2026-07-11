export const metadata = {
  title: "Edit Category | Admin Dashboard",
};

export default function EditCategoryPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Category
        </h1>

        <p className="mt-2 text-gray-600">
          Update category information.
        </p>

        <div className="mt-10 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          ✏️ Category Editor (Coming Next Step)
        </div>
      </div>
    </main>
  );
}