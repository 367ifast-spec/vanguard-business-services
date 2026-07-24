import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default async function NotificationsPage() {
  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold">
            Notifications
          </h1>

          <Link
            href="/marketplace"
            className="text-indigo-400"
          >
            Back to Marketplace
          </Link>
        </div>

        <p className="mt-4 text-gray-400">
          Stay updated with your marketplace
          activity.
        </p>

        <div className="mt-10 space-y-4">
          {notifications?.length ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-2xl border p-6 ${
                  notification.is_read
                    ? "border-white/10 bg-[#111827]"
                    : "border-indigo-500 bg-indigo-500/10"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {notification.title}
                    </h2>

                    <p className="mt-2 text-gray-400">
                      {notification.message}
                    </p>

                    <p className="mt-3 text-sm text-gray-500">
                      Type: {notification.type}
                    </p>
                  </div>

                  <span className="text-sm text-gray-500">
                    {new Date(
                      notification.created_at
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-10 text-center text-gray-400">
              No notifications found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}