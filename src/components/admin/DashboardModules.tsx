import Link from "next/link";

const modules = [
  {
    title: "Services",
    icon: "📦",
    href: "/admin/services",
    description: "Manage all business services",
    color: "bg-blue-600",
    enabled: true,
  },
  {
    title: "Quotes",
    icon: "📄",
    href: "/admin/quotes",
    description: "Customer quote requests",
    color: "bg-green-600",
    enabled: true,
  },
  {
    title: "Orders",
    icon: "🛒",
    href: "/admin/orders",
    description: "Coming Soon",
    color: "bg-orange-600",
    enabled: false,
  },
  {
    title: "Customers",
    icon: "👥",
    href: "/admin/customers",
    description: "Coming Soon",
    color: "bg-purple-600",
    enabled: false,
  },
  {
    title: "Payments",
    icon: "💳",
    href: "/admin/payments",
    description: "Coming Soon",
    color: "bg-pink-600",
    enabled: false,
  },
  {
    title: "Analytics",
    icon: "📊",
    href: "/admin/analytics",
    description: "Coming Soon",
    color: "bg-indigo-600",
    enabled: false,
  },
];

export default function DashboardModules() {
  return (
    <section className="mt-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Enterprise Modules
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Access and manage every area of your administration panel.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => {
          const content = (
            <>
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl text-white ${module.color}`}
              >
                {module.icon}
              </div>

              <div className="mt-6 flex-1">
                <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                  {module.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {module.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <span
                  className={`text-sm font-medium ${
                    module.enabled ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {module.enabled ? "Open Module" : "Coming Soon"}
                </span>

                <span
                  className={`text-lg ${
                    module.enabled
                      ? "transition-transform group-hover:translate-x-1"
                      : "text-gray-400"
                  }`}
                >
                  →
                </span>
              </div>
            </>
          );

          if (!module.enabled) {
            return (
              <div
                key={module.title}
                className="group flex min-h-[200px] cursor-not-allowed flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 opacity-70"
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={module.title}
              href={module.href}
              className="group flex min-h-[200px] flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
