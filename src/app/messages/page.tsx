import Link from "next/link";

const conversations = [
  {
    id: "1",
    user: "john_doe",
    lastMessage: "Is the website still available?",
    time: "2 min ago",
  },
  {
    id: "2",
    user: "agency_pro",
    lastMessage: "Can we schedule a call?",
    time: "15 min ago",
  },
  {
    id: "3",
    user: "vanguard",
    lastMessage: "Thank you for your interest.",
    time: "1 hour ago",
  },
];

export default function MessagesPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Messages
        </h1>

        <p className="mt-4 text-gray-400">
          Communicate securely with buyers and sellers.
        </p>

        <div className="mt-10 space-y-4">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/messages/${conversation.id}`}
              className="block rounded-2xl border border-white/10 bg-[#111827] p-6 transition hover:border-indigo-500"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {conversation.user}
                  </h2>

                  <p className="mt-2 text-gray-400">
                    {conversation.lastMessage}
                  </p>
                </div>

                <p className="text-sm text-gray-500">
                  {conversation.time}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}