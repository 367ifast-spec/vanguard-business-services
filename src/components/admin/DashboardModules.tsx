import Link from "next/link";

const modules = [
  {
    title: "Services",
    icon: "📦",
    href: "/admin/services",
    description: "Manage all business services",
    color: "bg-blue-600",
  },
  {
    title: "Quotes",
    icon: "📄",
    href: "/admin/quotes",
    description: "Customer quote requests",
    color: "bg-green-600",
  },
  {
    title: "Orders",
    icon: "🛒",
    href: "#",
    description: "Coming Soon",
    color: "bg-orange-600",
  },
  {
    title: "Customers",
    icon: "👥",
    href: "#",
    description: "Coming Soon",
    color: "bg-purple-600",
  },
  {
    title: "Payments",
    icon: "💳",
    href: "#",
    description: "Coming Soon",
    color: "bg-pink-600",
  },
  {
    title: "Analytics",
    icon: "📊",
    href: "#",
    description: "Coming Soon",
    color: "bg-indigo-600",
  },
];

export default function DashboardModules() {
  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Enterprise Modules
        </h2>

        <p className="text-sm text-gray-500">
          Access and manage every area of your administration panel.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <Link
            key={module.title}
            href={module.href}
            className="group flex min-h-[200px] flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
          >
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
              <span className="text-sm font-medium text-blue-600">
                Open Module
              </span>

              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}