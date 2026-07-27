import Link from "next/link";

import { supabaseAdmin } from "@/lib/supabase";

type PaymentRow = {
  id: string;
  transaction_id: string;
  buyer_id: string;
  provider: string;
  payment_reference: string | null;
  amount: number | string;
  status: string;
  submitted_at: string;
  verified_at: string | null;
  created_at: string;
};

function formatMoney(value: number | string) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "$0.00";
  }

  return `$${amount.toFixed(2)}`;
}

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-US");
}

function statusClass(status: string) {
  switch (status.toLowerCase()) {
    case "verified":
      return "border-green-500/30 bg-green-500/10 text-green-300";

    case "rejected":
      return "border-red-500/30 bg-red-500/10 text-red-300";

    default:
      return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
  }
}

export default async function AdminMarketplacePaymentsPage() {
  if (!supabaseAdmin) {
    return (
      <main className="min-h-screen bg-[#0B1020] px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8">
            <h1 className="text-2xl font-bold text-red-300">
              Admin Configuration Error
            </h1>

            <p className="mt-3 text-sm text-red-200">
              Supabase admin client is unavailable.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const { data, error } = await supabaseAdmin
    .from("escrow_payments")
    .select(
      `
        id,
        transaction_id,
        buyer_id,
        provider,
        payment_reference,
        amount,
        status,
        submitted_at,
        verified_at,
        created_at
      `
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "ADMIN ESCROW PAYMENTS ERROR:",
      error
    );
  }

  const payments = (data ?? []) as PaymentRow[];

  const submittedCount = payments.filter(
    (payment) =>
      payment.status.toLowerCase() === "submitted"
  ).length;

  const verifiedCount = payments.filter(
    (payment) =>
      payment.status.toLowerCase() === "verified"
  ).length;

  const submittedAmount = payments
    .filter(
      (payment) =>
        payment.status.toLowerCase() === "submitted"
    )
    .reduce(
      (total, payment) =>
        total + Number(payment.amount || 0),
      0
    );

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-400">
              Vanguard Marketplace
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Escrow Payments
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">
              Review marketplace payment submissions
              before escrow funding is confirmed.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/marketplace"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold transition hover:bg-white/5"
            >
              Marketplace Admin
            </Link>

            <Link
              href="/admin"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-700"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <p className="text-sm text-gray-400">
              Submitted Payments
            </p>

            <p className="mt-3 text-3xl font-bold text-yellow-300">
              {submittedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <p className="text-sm text-gray-400">
              Awaiting Verification
            </p>

            <p className="mt-3 text-3xl font-bold text-indigo-400">
              {formatMoney(submittedAmount)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
            <p className="text-sm text-gray-400">
              Verified Payments
            </p>

            <p className="mt-3 text-3xl font-bold text-green-400">
              {verifiedCount}
            </p>
          </div>
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
          <div className="border-b border-white/10 px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">
                  Payment Submissions
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  {payments.length} payment record
                  {payments.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
          </div>

          {error ? (
            <div className="p-6">
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                Unable to load escrow payments:{" "}
                {error.message}
              </div>
            </div>
          ) : payments.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <h3 className="text-xl font-semibold">
                No payment submissions yet
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-400">
                Buyer payment submissions will appear
                here after a marketplace escrow payment
                is submitted.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left">
                <thead className="border-b border-white/10 bg-white/[0.02]">
                  <tr className="text-xs uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-4">
                      Payment
                    </th>

                    <th className="px-6 py-4">
                      Transaction
                    </th>

                    <th className="px-6 py-4">
                      Method
                    </th>

                    <th className="px-6 py-4">
                      Reference
                    </th>

                    <th className="px-6 py-4">
                      Amount
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Submitted
                    </th>

                    <th className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="transition hover:bg-white/[0.025]"
                    >
                      <td className="px-6 py-5">
                        <p className="font-mono text-xs text-gray-300">
                          {payment.id}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-mono text-xs text-gray-300">
                          {payment.transaction_id}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span className="capitalize text-gray-300">
                          {payment.provider}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-300">
                          {payment.payment_reference ||
                            "—"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="font-semibold">
                          {formatMoney(
                            payment.amount
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusClass(
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm text-gray-300">
                          {formatDate(
                            payment.submitted_at
                          )}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <Link
                          href={`/admin/marketplace/payments/${payment.id}`}
                          className="inline-flex rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
          <h3 className="font-semibold text-indigo-300">
            Escrow Verification
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            A submitted payment does not fund escrow
            automatically. Payment verification must
            succeed before the escrow transaction is
            marked as funded.
          </p>
        </div>
      </div>
    </main>
  );
}