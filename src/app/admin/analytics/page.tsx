export default function AnalyticsPage() {
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
    },
    {
      title: "Total Listings",
      value: "532",
    },
    {
      title: "Total Sales",
      value: "148",
    },
    {
      title: "Revenue",
      value: "$248,000",
    },
    {
      title: "Escrows",
      value: "34",
    },
    {
      title: "Disputes",
      value: "3",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-4xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Marketplace insights and statistics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border p-6"
          >
            <h2 className="text-3xl font-bold">
              {item.value}
            </h2>

            <p className="mt-2 text-gray-500">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}