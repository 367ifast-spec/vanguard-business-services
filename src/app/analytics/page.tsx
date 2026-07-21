export default function AnalyticsPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$152,000",
    },
    {
      title: "Total Sales",
      value: "248",
    },
    {
      title: "Total Users",
      value: "1,250",
    },
    {
      title: "Total Listings",
      value: "542",
    },
    {
      title: "Active Escrows",
      value: "18",
    },
    {
      title: "Open Disputes",
      value: "4",
    },
    {
      title: "Messages Sent",
      value: "8,942",
    },
    {
      title: "Monthly Growth",
      value: "+18%",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold">
            Marketplace Analytics
          </h1>

          <p className="mt-4 text-gray-400">
            Monitor marketplace performance,
            revenue, users, and transactions.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-[#111827] p-6"
            >
              <p className="text-gray-400">
                {stat.title}
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <h2 className="text-3xl font-bold">
            Revenue Overview
          </h2>

          <div className="mt-8 flex h-72 items-end gap-4">
            {[30, 50, 40, 75, 60, 90, 80].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-xl bg-indigo-600"
                  style={{
                    height: `${height}%`,
                  }}
                />
              )
            )}
          </div>

          <div className="mt-4 flex justify-between text-sm text-gray-400">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <h2 className="text-3xl font-bold">
            Recent Activity
          </h2>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl bg-[#0B1020] p-4">
              New listing "AI SaaS Startup" was approved.
            </div>

            <div className="rounded-xl bg-[#0B1020] p-4">
              Escrow #1001 completed successfully.
            </div>

            <div className="rounded-xl bg-[#0B1020] p-4">
              New user "john_doe" joined the marketplace.
            </div>

            <div className="rounded-xl bg-[#0B1020] p-4">
              Dispute #5002 moved to "Under Review".
            </div>
          </div>
        </div>

        {/* Top Sellers */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold">
            Top Sellers
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-[#111827] p-6">
              <h3 className="text-2xl font-semibold">
                vanguard
              </h3>

              <p className="mt-2 text-gray-400">
                Revenue: $45,000
              </p>

              <p className="text-gray-400">
                Sales: 52
              </p>
            </div>

            <div className="rounded-2xl bg-[#111827] p-6">
              <h3 className="text-2xl font-semibold">
                agency_pro
              </h3>

              <p className="mt-2 text-gray-400">
                Revenue: $31,000
              </p>

              <p className="text-gray-400">
                Sales: 34
              </p>
            </div>

            <div className="rounded-2xl bg-[#111827] p-6">
              <h3 className="text-2xl font-semibold">
                john_doe
              </h3>

              <p className="mt-2 text-gray-400">
                Revenue: $22,000
              </p>

              <p className="text-gray-400">
                Sales: 28
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}