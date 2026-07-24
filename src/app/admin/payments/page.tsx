import Link from "next/link";

const payments = [
  {
    id: "PAY-1001",
    user: "John Doe",
    amount: "$5000",
    method: "Stripe",
    status: "Completed",
  },
  {
    id: "PAY-1002",
    user: "Jane Smith",
    amount: "$800",
    method: "PayPal",
    status: "Pending",
  },
  {
    id: "PAY-1003",
    user: "Alex Brown",
    amount: "$1500",
    method: "Crypto",
    status: "Failed",
  },
];

export default function AdminPaymentsPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] p-6 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold">
            Payment Management
          </h1>

          <p className="mt-4 text-gray-400">
            Manage all marketplace payments,
            refunds, and transactions.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">
              $7,300
            </h2>

            <p className="text-gray-400">
              Total Payments
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">
              1
            </h2>

            <p className="text-yellow-400">
              Pending
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">
              1
            </h2>

            <p className="text-red-400">
              Failed
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">
              1
            </h2>

            <p className="text-green-400">
              Completed
            </p>
          </div>
        </div>

        {/* Payments Table */}
        <div className="mt-10 overflow-x-auto rounded-3xl bg-[#111827]">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="p-6 text-left">
                  Payment ID
                </th>

                <th className="p-6 text-left">
                  User
                </th>

                <th className="p-6 text-left">
                  Amount
                </th>

                <th className="p-6 text-left">
                  Method
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
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-white/5"
                >
                  <td className="p-6">
                    {payment.id}
                  </td>

                  <td className="p-6">
                    {payment.user}
                  </td>

                  <td className="p-6">
                    {payment.amount}
                  </td>

                  <td className="p-6">
                    {payment.method}
                  </td>

                  <td className="p-6">
                    {payment.status}
                  </td>

                  <td className="p-6">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/payments/${payment.id}`}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm"
                      >
                        View
                      </Link>

                      <button className="rounded-lg bg-green-600 px-3 py-2 text-sm">
                        Confirm
                      </button>

                      <button className="rounded-lg bg-yellow-600 px-3 py-2 text-sm">
                        Refund
                      </button>

                      <button className="rounded-lg bg-red-600 px-3 py-2 text-sm">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Export */}
        <div className="mt-8 flex justify-end">
          <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700">
            Export Payments CSV
          </button>
        </div>
      </div>
    </main>
  );
}