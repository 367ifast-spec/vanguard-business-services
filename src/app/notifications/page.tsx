import Link from "next/link";

const notifications = [
  {
    id: 1,
    title: "Listing Approved",
    description:
      'Your listing "AI SaaS Startup" has been approved.',
    time: "2 minutes ago",
  },
  {
    id: 2,
    title: "New Message",
    description:
      "john_doe sent you a new message.",
    time: "15 minutes ago",
  },
  {
    id: 3,
    title: "Escrow Updated",
    description:
      "Transaction #1001 status changed to Payment Received.",
    time: "1 hour ago",
  },
  {
    id: 4,
    title: "Seller Reply",
    description:
      "agency_pro replied to your conversation.",
    time: "3 hours ago",
  },
];

export default function NotificationsPage() {
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
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-2xl border border-white/10 bg-[#111827] p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {notification.title}
                  </h2>

                  <p className="mt-2 text-gray-400">
                    {notification.description}
                  </p>
                </div>

                <span className="text-sm text-gray-500">
                  {notification.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}