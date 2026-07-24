import Link from "next/link";

const submissions = [
  {
    id: "1",
    name: "John Doe",
    country: "United States",
    idType: "Passport",
    status: "pending",
    createdAt: "2026-07-24",
  },
  {
    id: "2",
    name: "Jane Smith",
    country: "United Kingdom",
    idType: "National ID",
    status: "approved",
    createdAt: "2026-07-23",
  },
  {
    id: "3",
    name: "Alex Brown",
    country: "Canada",
    idType: "Driving License",
    status: "rejected",
    createdAt: "2026-07-22",
  },
];

export default function AdminKYCPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold">
              Admin KYC Management
            </h1>

            <p className="mt-4 text-gray-400">
              Review, approve, and reject seller KYC submissions.
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold"
          >
            Back to Admin
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">3</h2>
            <p className="text-gray-400">
              Total Submissions
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">1</h2>
            <p className="text-yellow-400">
              Pending
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">1</h2>
            <p className="text-green-400">
              Approved
            </p>
          </div>

          <div className="rounded-2xl bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">1</h2>
            <p className="text-red-400">
              Rejected
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="mt-10 overflow-x-auto rounded-3xl bg-[#111827]">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr className="text-left">
                <th className="p-6">Name</th>
                <th className="p-6">Country</th>
                <th className="p-6">ID Type</th>
                <th className="p-6">Submitted</th>
                <th className="p-6">Status</th>
                <th className="p-6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="border-b border-white/5"
                >
                  <td className="p-6 font-semibold">
                    {submission.name}
                  </td>

                  <td className="p-6 text-gray-400">
                    {submission.country}
                  </td>

                  <td className="p-6 text-gray-400">
                    {submission.idType}
                  </td>

                  <td className="p-6 text-gray-400">
                    {submission.createdAt}
                  </td>

                  <td className="p-6">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        submission.status === "approved"
                          ? "bg-green-500/20 text-green-400"
                          : submission.status === "rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </td>

                  <td className="p-6">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/kyc/${submission.id}`}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm"
                      >
                        Review
                      </Link>

                      <button className="rounded-lg bg-green-600 px-4 py-2 text-sm">
                        Approve
                      </button>

                      <button className="rounded-lg bg-red-600 px-4 py-2 text-sm">
                        Reject
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