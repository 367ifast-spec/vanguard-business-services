import Link from "next/link";

const submissions = [
  {
    id: "1",
    name: "John Doe",
    status: "pending",
  },
  {
    id: "2",
    name: "Jane Smith",
    status: "approved",
  },
];

export default function AdminKYCPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          KYC Submissions
        </h1>

        <div className="mt-10 space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="rounded-2xl bg-[#111827] p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {submission.name}
                  </h2>

                  <p className="text-gray-400">
                    Status: {submission.status}
                  </p>
                </div>

                <Link
                  href={`/admin/kyc/${submission.id}`}
                  className="rounded-xl bg-indigo-600 px-5 py-3"
                >
                  Review
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}