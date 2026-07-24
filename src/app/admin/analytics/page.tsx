export default function AnalyticsPage() {
  const stats = [
    { title: "Total Users", value: "1,248" },
    { title: "Total Sellers", value: "342" },
    { title: "Total Buyers", value: "906" },
    { title: "Total Listings", value: "532" },
    { title: "Total Sales", value: "148" },
    { title: "Revenue", value: "$248,000" },
    { title: "Escrows", value: "34" },
    { title: "Disputes", value: "3" },
    { title: "Pending KYC", value: "12" },
    { title: "Pending Listings", value: "18" },
    { title: "Banned Users", value: "4" },
    { title: "Monthly Growth", value: "+18%" },
  ];

  return (
    <main className="min-h-screen bg-[#0B1020] p-6 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold">
            Analytics Dashboard
          </h1>

          <p className="mt-3 text-gray-400">
            Monitor marketplace growth, users, revenue,
            and overall platform performance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-[#111827] p-6 transition hover:border-indigo-500"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                {item.title}
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Revenue Overview */}
        <section className="rounded-3xl border border-white/10 bg-[#111827] p-8">
          <h2 className="text-2xl font-bold">
            Revenue Overview
          </h2>

          <p className="mt-2 text-gray-400">
            Marketplace revenue and financial insights.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-[#0B1020] p-6">
              <p className="text-gray-400">
                Today
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                $1,240
              </h3>
            </div>

            <div className="rounded-2xl bg-[#0B1020] p-6">
              <p className="text-gray-400">
                This Month
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                $18,700
              </h3>
            </div>

            <div className="rounded-2xl bg-[#0B1020] p-6">
              <p className="text-gray-400">
                This Year
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                $248,000
              </h3>
            </div>
          </div>
        </section>

        {/* Marketplace Health */}
        <section className="rounded-3xl border border-white/10 bg-[#111827] p-8">
          <h2 className="text-2xl font-bold">
            Marketplace Health
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-4">
            <div className="rounded-2xl bg-green-500/10 p-6">
              <p className="text-green-400">
                Active Sellers
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                329
              </h3>
            </div>

            <div className="rounded-2xl bg-yellow-500/10 p-6">
              <p className="text-yellow-400">
                Pending KYC
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                12
              </h3>
            </div>

            <div className="rounded-2xl bg-red-500/10 p-6">
              <p className="text-red-400">
                Open Disputes
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                3
              </h3>
            </div>

            <div className="rounded-2xl bg-blue-500/10 p-6">
              <p className="text-blue-400">
                Success Rate
              </p>

              <h3 className="mt-3 text-3xl font-bold">
                98.2%
              </h3>
            </div>
          </div>
        </section>

        {/* Placeholder Chart */}
        <section className="rounded-3xl border border-white/10 bg-[#111827] p-8">
          <h2 className="text-2xl font-bold">
            Growth Chart
          </h2>

          <div className="mt-6 flex h-72 items-center justify-center rounded-2xl border border-dashed border-white/20">
            <p className="text-gray-500">
              Chart Integration Coming Soon...
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}