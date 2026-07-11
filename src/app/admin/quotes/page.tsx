import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export const metadata = {
  title: "Quotes | Admin Dashboard",
};

export default async function QuotesPage({
  searchParams,
}: Props) {
  if (!supabaseAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Supabase is not configured.
        </p>
      </main>
    );
  }

  const params = await searchParams;

  const page = Math.max(Number(params.page ?? "1"), 1);

  const pageSize = 20;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { count: totalQuotes } = await supabaseAdmin
    .from("quotes")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { data: quotes } = await supabaseAdmin
    .from("quotes")
    .select(
      "quote_id, full_name, email, service, status, created_at"
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.max(
    Math.ceil((totalQuotes ?? 0) / pageSize),
    1
  );

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Quotes
            </h1>

            <p className="mt-2 text-gray-600">
              Manage customer quote requests.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-lg bg-gray-900 px-5 py-2 text-white hover:bg-gray-800"
          >
            ← Dashboard
          </Link>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Total Quotes: <strong>{totalQuotes ?? 0}</strong>
          </p>

          <p className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl bg-white shadow">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="p-4 text-left">Quote ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Service</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Created</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {quotes?.map((quote) => (
                <tr
                  key={quote.quote_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {quote.quote_id}
                  </td>

                  <td className="p-4">
                    {quote.full_name}
                  </td>

                  <td className="p-4">
                    {quote.email}
                  </td>

                  <td className="p-4">
                    {quote.service}
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      {quote.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {quote.created_at
                      ? new Date(
                          quote.created_at
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/admin/quotes/${quote.quote_id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {!quotes?.length && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-10 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-4 text-5xl">
                        📄
                      </div>

                      <h3 className="text-lg font-semibold text-gray-800">
                        No Quotes Found
                      </h3>

                      <p className="mt-2 text-gray-500">
                        Customer quote requests will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex items-center justify-between">
          {page > 1 ? (
            <Link
              href={`/admin/quotes?page=${page - 1}`}
              className="rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
            >
              ← Previous
            </Link>
          ) : (
            <div />
          )}

          {page < totalPages ? (
            <Link
              href={`/admin/quotes?page=${page + 1}`}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Next →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}