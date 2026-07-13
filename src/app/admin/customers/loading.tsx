export default function LoadingCustomers() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="h-5 w-40 rounded bg-slate-200" />
          <div className="mt-5 h-10 w-72 rounded bg-slate-200" />
          <div className="mt-4 h-4 w-full max-w-xl rounded bg-slate-200" />
          <div className="mt-2 h-4 w-96 rounded bg-slate-200" />
        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="mt-5 h-10 w-24 rounded bg-slate-200" />
              <div className="mt-4 h-4 w-40 rounded bg-slate-200" />
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="h-6 w-44 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  {["Customer", "Phone", "Country", "Orders", "Spent"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index} className="border-t border-slate-100">
                    {Array.from({ length: 5 }).map((__, col) => (
                      <td key={col} className="px-6 py-5">
                        <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}