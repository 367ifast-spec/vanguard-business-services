import Link from "next/link";

export default async function MessagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const messages = [
    {
      sender: "Buyer",
      text: "Hi! Is this business still available?",
    },
    {
      sender: "Seller",
      text: "Yes, it's still available.",
    },
    {
      sender: "Buyer",
      text: "Can you share revenue screenshots?",
    },
    {
      sender: "Seller",
      text: "Sure, I can provide them after NDA.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/messages"
          className="text-indigo-400"
        >
          ← Back to Messages
        </Link>

        <h1 className="mt-6 text-4xl font-bold">
          Conversation #{id}
        </h1>

        <div className="mt-10 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="rounded-2xl bg-[#111827] p-6"
            >
              <p className="font-semibold text-indigo-400">
                {message.sender}
              </p>

              <p className="mt-2 text-gray-300">
                {message.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#111827] p-6">
          <textarea
            rows={4}
            placeholder="Type your message..."
            className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
          />

          <button className="mt-4 rounded-xl bg-indigo-600 px-6 py-3 font-semibold">
            Send Message
          </button>
        </div>
      </div>
    </main>
  );
}