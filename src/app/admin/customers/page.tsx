import Link from "next/link";

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Seller",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Buyer",
    status: "Banned",
  },
  {
    id: "3",
    name: "Alex Brown",
    email: "alex@example.com",
    role: "Seller",
    status: "Pending",
  },
];

export default function AdminUsersPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold">
          User Management
        </h1>

        <p className="mt-4 text-gray-400">
          Manage buyers, sellers and user accounts.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">3</h2>
            <p className="text-gray-400">Total Users</p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">2</h2>
            <p className="text-gray-400">Sellers</p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">1</h2>
            <p className="text-gray-400">Buyers</p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">1</h2>
            <p className="text-gray-400">Banned</p>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl bg-[#111827]">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="p-6 text-left">
                  Name
                </th>
                <th className="p-6 text-left">
                  Email
                </th>
                <th className="p-6 text-left">
                  Role
                </th>
                <th className="p-6 text-left">
                  Status
                </th>
                <th className="p-6 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5"
                >
                  <td className="p-6">
                    {user.name}
                  </td>

                  <td className="p-6">
                    {user.email}
                  </td>

                  <td className="p-6">
                    {user.role}
                  </td>

                  <td className="p-6">
                    {user.status}
                  </td>

                  <td className="p-6">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm"
                      >
                        View
                      </Link>

                      <button className="rounded-lg bg-green-600 px-3 py-2 text-sm">
                        Verify
                      </button>

                      <button className="rounded-lg bg-yellow-600 px-3 py-2 text-sm">
                        Suspend
                      </button>

                      <button className="rounded-lg bg-red-600 px-3 py-2 text-sm">
                        Ban
                      </button>

                      <button className="rounded-lg bg-red-800 px-3 py-2 text-sm">
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