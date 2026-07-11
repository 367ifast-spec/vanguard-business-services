export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Header */}
        <div className="mb-8">
          <div className="h-10 w-72 rounded bg-gray-300" />
          <div className="mt-3 h-5 w-56 rounded bg-gray-200" />
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow"
            >
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="mt-4 h-10 w-20 rounded bg-gray-300" />
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="mt-10 rounded-xl bg-white p-6 shadow">
          <div className="mb-6 h-8 w-48 rounded bg-gray-300" />

          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="mb-4 h-12 rounded bg-gray-100"
            />
          ))}
        </div>
      </div>
    </main>
  );
}