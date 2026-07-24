import Link from "next/link";

const disputes = [
  {
    id: "1",
    buyer: "John Doe",
    seller: "Alex Brown",
    reason: "Account not delivered",
    status: "Open",
  },
  {
    id: "2",
    buyer: "Jane Smith",
    seller: "Mark Joe",
    reason: "Description mismatch",
    status: "Resolved",
  },
];

export default function AdminDisputesPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold">
          Dispute Management
        </h1>

        <p className="mt-4 text-gray-400">
          Review and resolve marketplace disputes.
        </p>

        <div className="mt-10 overflow-x-auto rounded-3xl bg-[#111827]">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="p-6 text-left">
                  Buyer
                </th>

                <th className="p-6 text-left">
                  Seller
                </th>

                <th className="p-6 text-left">
                  Reason
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
              {disputes.map((dispute) => (
                <tr
                  key={dispute.id}
                  className="border-b border-white/5"
                >
                  <td className="p-6">
                    {dispute.buyer}
                  </td>

                  <td className="p-6">
                    {dispute.seller}
                  </td>

                  <td className="p-6">
                    {dispute.reason}
                  </td>

                  <td className="p-6">
                    {dispute.status}
                  </td>

                  <td className="p-6">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/disputes/${dispute.id}`}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm"
                      >
                        View
                      </Link>

                      <button className="rounded-lg bg-green-600 px-3 py-2 text-sm">
                        Resolve
                      </button>

                      <button className="rounded-lg bg-yellow-600 px-3 py-2 text-sm">
                        Refund
                      </button>

                      <button className="rounded-lg bg-red-600 px-3 py-2 text-sm">
                        Ban User
                      </button>

                      <button className="rounded-lg bg-gray-700 px-3 py-2 text-sm">
                        Close
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