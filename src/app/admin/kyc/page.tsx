import Link from "next/link";

import { supabaseAdmin } from "@/lib/supabase";

type KYCSubmission = {
  id: string;
  full_name: string;
  country: string;
  id_type: string;
  id_number: string;
  status: string | null;
  created_at: string | null;
  user_id: string | null;
};

function getStatusClasses(status: string) {
  if (status === "approved") {
    return "bg-green-500/20 text-green-400";
  }

  if (status === "rejected") {
    return "bg-red-500/20 text-red-400";
  }

  return "bg-yellow-500/20 text-yellow-400";
}

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString();
}

export default async function AdminKYCPage() {
  if (!supabaseAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B1020] px-6 text-white">
        <div className="w-full max-w-xl rounded-3xl border border-red-500/20 bg-red-500/10 p-8">
          <h1 className="text-2xl font-bold text-red-400">
            Supabase Admin Configuration Error
          </h1>

          <p className="mt-3 text-gray-300">
            Supabase admin client is not available.
          </p>

          <Link
            href="/admin"
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-700"
          >
            Back to Admin
          </Link>
        </div>
      </main>
    );
  }

  const { data, error } = await supabaseAdmin
    .from("seller_kyc")
    .select(
      `
        id,
        full_name,
        country,
        id_type,
        id_number,
        status,
        created_at,
        user_id
      `
    )
    .order("created_at", {
      ascending: false,
    });

  const submissions =
    (data as KYCSubmission[] | null) ?? [];

  const total = submissions.length;

  const pending = submissions.filter(
    (submission) =>
      (submission.status ?? "pending").toLowerCase() ===
      "pending"
  ).length;

  const approved = submissions.filter(
    (submission) =>
      submission.status?.toLowerCase() ===
      "approved"
  ).length;

  const rejected = submissions.filter(
    (submission) =>
      submission.status?.toLowerCase() ===
      "rejected"
  ).length;

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">
              Admin KYC Management
            </h1>

            <p className="mt-4 text-gray-400">
              Review seller identity verification submissions
              and manage approval status.
            </p>
          </div>

          <Link
            href="/admin"
            className="w-fit rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-700"
          >
            Back to Admin
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">
              {total}
            </h2>

            <p className="mt-1 text-gray-400">
              Total Submissions
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">
              {pending}
            </h2>

            <p className="mt-1 text-yellow-400">
              Pending
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">
              {approved}
            </h2>

            <p className="mt-1 text-green-400">
              Approved
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <h2 className="text-3xl font-bold">
              {rejected}
            </h2>

            <p className="mt-1 text-red-400">
              Rejected
            </p>
          </div>
        </div>

        {error ? (
          <div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
            <h2 className="font-semibold text-red-400">
              Failed to load KYC submissions
            </h2>

            <p className="mt-2 text-sm text-gray-300">
              {error.message}
            </p>
          </div>
        ) : null}

        {!error ? (
          <div className="mt-10 overflow-x-auto rounded-3xl border border-white/10 bg-[#111827]">
            <table className="w-full min-w-[1000px]">
              <thead className="border-b border-white/10">
                <tr className="text-left">
                  <th className="p-6">Name</th>
                  <th className="p-6">Country</th>
                  <th className="p-6">ID Type</th>
                  <th className="p-6">Submitted</th>
                  <th className="p-6">User</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Actions</th>
                </tr>
              </thead>

              <tbody>
                {submissions.length > 0 ? (
                  submissions.map((submission) => {
                    const status = (
                      submission.status ?? "pending"
                    ).toLowerCase();

                    return (
                      <tr
                        key={submission.id}
                        className="border-b border-white/5 last:border-b-0"
                      >
                        <td className="p-6 font-semibold">
                          {submission.full_name}
                        </td>

                        <td className="p-6 text-gray-400">
                          {submission.country}
                        </td>

                        <td className="p-6 text-gray-400">
                          {submission.id_type}
                        </td>

                        <td className="p-6 text-gray-400">
                          {formatDate(
                            submission.created_at
                          )}
                        </td>

                        <td className="p-6">
                          {submission.user_id ? (
                            <div>
                              <span className="text-sm font-semibold text-green-400">
                                Linked
                              </span>

                              <p className="mt-1 max-w-[220px] truncate text-xs text-gray-500">
                                {submission.user_id}
                              </p>
                            </div>
                          ) : (
                            <span className="text-sm text-red-400">
                              Not Linked
                            </span>
                          )}
                        </td>

                        <td className="p-6">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusClasses(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="p-6">
                          <Link
                            href={`/admin/kyc/${submission.id}`}
                            className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold transition hover:bg-indigo-700"
                          >
                            Review
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-12 text-center text-gray-400"
                    >
                      No KYC submissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </main>
  );
}