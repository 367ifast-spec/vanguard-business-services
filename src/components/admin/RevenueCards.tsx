type RevenueCardsProps = {
  totalRevenue: number;
  monthlyRevenue: number;
  averageOrderValue: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export default function RevenueCards({
  totalRevenue,
  monthlyRevenue,
  averageOrderValue,
  totalOrders,
  pendingOrders,
  completedOrders,
}: RevenueCardsProps) {
  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      color: "text-green-600",
      border: "border-green-100",
      bg: "bg-green-50",
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(monthlyRevenue),
      color: "text-emerald-600",
      border: "border-emerald-100",
      bg: "bg-emerald-50",
    },
    {
      title: "Average Order Value",
      value: formatCurrency(averageOrderValue),
      color: "text-blue-600",
      border: "border-blue-100",
      bg: "bg-blue-50",
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      color: "text-indigo-600",
      border: "border-indigo-100",
      bg: "bg-indigo-50",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toString(),
      color: "text-yellow-600",
      border: "border-yellow-100",
      bg: "bg-yellow-50",
    },
    {
      title: "Completed Orders",
      value: completedOrders.toString(),
      color: "text-green-700",
      border: "border-green-100",
      bg: "bg-green-50",
    },
  ];

  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">
          Revenue Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Financial performance and order statistics at a glance.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`flex min-h-[150px] flex-col justify-between rounded-2xl border ${card.border} ${card.bg} p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {card.title}
              </p>
            </div>

            <div className="mt-6">
              <p className={`break-words text-3xl font-bold ${card.color}`}>
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}