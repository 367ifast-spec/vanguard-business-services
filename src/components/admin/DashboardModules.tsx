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
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Enterprise Modules
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Link
            key={module.title}
            href={module.href}
            className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`inline-flex h-12 w-12 items-center justify-center rounded-lg text-2xl text-white ${module.color}`}
            >
              {module.icon}
            </div>

            <h3 className="mt-4 text-xl font-semibold">
              {module.title}
            </h3>

            <p className="mt-2 text-gray-500">
              {module.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}