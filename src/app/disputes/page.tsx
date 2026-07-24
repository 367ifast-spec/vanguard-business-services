import Link from "next/link";
import { getDisputes } from "@/lib/disputes";

export default async function DisputesPage() {
  const disputes = (await getDisputes()) || [];

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Dispute Center
        </h1>

        <p className="mt-4 text-gray-400">
          Manage and track marketplace disputes.
        </p>

        <div className="mt-10 space-y-6">
          {disputes.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
              <p className="text-gray-400">
                No disputes found.
              </p>
            </div>
          ) : (
            disputes.map((dispute: any) => (
              <Link
                key={dispute.id}
                href={`/disputes/${dispute.id}`}
                className="block rounded-2xl border border-white/10 bg-[#111827] p-6 transition hover:border-indigo-500"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Escrow: {dispute.escrow_id}
                    </h2>

                    <p className="mt-2 text-gray-400">
                      Opened By: {dispute.opened_by}
                    </p>

                    <p className="text-gray-400">
                      Reason: {dispute.reason}
                    </p>
                  </div>

                  <div>
                    <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm text-red-300">
                      {dispute.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}