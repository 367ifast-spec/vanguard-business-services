
import Link from "next/link";

const packages = [
  {
    id: "1",
    name: "FREE",
    price: "$0",
    listings: "15",
    status: "Active",
  },
  {
    id: "2",
    name: "VERIFIED",
    price: "$10",
    listings: "50",
    status: "Active",
  },
  {
    id: "3",
    name: "GOLD",
    price: "$50",
    listings: "500",
    status: "Active",
  },
];

export default function AdminPackagesPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold">
            Package Management
          </h1>

          <button className="rounded-xl bg-indigo-600 px-5 py-3">
            Add Package
          </button>
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl bg-[#111827]">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="p-6 text-left">Name</th>
                <th className="p-6 text-left">Price</th>
                <th className="p-6 text-left">Listings</th>
                <th className="p-6 text-left">Status</th>
                <th className="p-6 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {packages.map((pkg) => (
                <tr
                  key={pkg.id}
                  className="border-b border-white/5"
                >
                  <td className="p-6">{pkg.name}</td>
                  <td className="p-6">{pkg.price}</td>
                  <td className="p-6">{pkg.listings}</td>
                  <td className="p-6">{pkg.status}</td>

                  <td className="p-6">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/packages/${pkg.id}`}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm"
                      >
                        View
                      </Link>

                      <button className="rounded-lg bg-yellow-600 px-3 py-2 text-sm">
                        Edit
                      </button>

                      <button className="rounded-lg bg-green-600 px-3 py-2 text-sm">
                        Enable
                      </button>

                      <button className="rounded-lg bg-red-600 px-3 py-2 text-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}