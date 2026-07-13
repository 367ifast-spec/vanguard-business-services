import Link from "next/link";

export default function CustomerNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-5xl">
          👤
        </div>

        <h1 className="mt-8 text-3xl font-bold text-slate-900">
          Customer Not Found
        </h1>

        <p className="mt-4 text-slate-600">
          The customer you are looking for does not exist or may have been removed.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/admin/customers"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Back to Customers
          </Link>
        </div>

      </div>
    </main>
  );
}