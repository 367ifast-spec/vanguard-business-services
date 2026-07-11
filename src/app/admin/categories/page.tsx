export const metadata = {
  title: "Categories | Admin Dashboard",
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl bg-white p-8 shadow">
          <h1 className="text-4xl font-bold text-gray-900">
            Categories Management
          </h1>

          <p className="mt-2 text-gray-600">
            Manage all service categories from one place.
          </p>

          <div className="mt-10 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <div className="text-6xl">🗂️</div>

            <h2 className="mt-4 text-2xl font-semibold">
              Enterprise Categories Module
            </h2>

            <p className="mt-2 text-gray-500">
              Here you will be able to create, edit and delete categories without touching code.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}