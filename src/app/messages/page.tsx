import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function MessagesPage() {
  const { data: conversations } = await supabase
    .from("marketplace_conversations")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

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
          {conversations?.length ? (
            conversations.map((conversation: any) => (
              <Link
                key={conversation.id}
                href={`/messages/${conversation.id}`}
                className="block rounded-2xl border border-white/10 bg-[#111827] p-6 transition hover:border-indigo-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Conversation
                    </h2>

                    <p className="mt-2 text-gray-400">
                      Buyer ID: {conversation.buyer_id}
                    </p>

                    <p className="mt-1 text-gray-400">
                      Seller ID: {conversation.seller_id}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      conversation.created_at
                    ).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
              <p className="text-gray-400">
                No conversations found.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}