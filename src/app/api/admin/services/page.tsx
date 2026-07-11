export const metadata = {
  title: "Services | Admin Dashboard",
};

export default function AdminServicesPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl bg-white p-8 shadow">
          <h1 className="text-4xl font-bold text-gray-900">
            Services Management
          </h1>

          <p className="mt-2 text-gray-600">
            Manage all business services from one place.
          </p>

          <div className="mt-10 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <div className="text-6xl">📦</div>

            <h2 className="mt-4 text-2xl font-semibold">
              Enterprise Services Module
            </h2>

            <p className="mt-2 text-gray-500">
              This module will allow you to add, edit, delete, and manage
              services without changing code.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}