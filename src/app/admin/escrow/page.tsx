import Link from "next/link";

const escrows = [
  {
    id: "1",
    buyer: "John Doe",
    seller: "Alex Brown",
    amount: "$5,000",
    status: "Pending",
  },
  {
    id: "2",
    buyer: "Jane Smith",
    seller: "Mark Joe",
    amount: "$800",
    status: "Completed",
  },
];

export default function AdminEscrowPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold">
          Escrow Management
        </h1>

        <p className="mt-4 text-gray-400">
          Manage all escrow transactions.
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
                  Amount
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
              {escrows.map((escrow) => (
                <tr
                  key={escrow.id}
                  className="border-b border-white/5"
                >
                  <td className="p-6">
                    {escrow.buyer}
                  </td>

                  <td className="p-6">
                    {escrow.seller}
                  </td>

                  <td className="p-6">
                    {escrow.amount}
                  </td>

                  <td className="p-6">
                    {escrow.status}
                  </td>

                  <td className="p-6">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/escrow/${escrow.id}`}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm"
                      >
                        View
                      </Link>

                      <button className="rounded-lg bg-green-600 px-3 py-2 text-sm">
                        Release
                      </button>

                      <button className="rounded-lg bg-yellow-600 px-3 py-2 text-sm">
                        Freeze
                      </button>

                      <button className="rounded-lg bg-red-600 px-3 py-2 text-sm">
                        Refund
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