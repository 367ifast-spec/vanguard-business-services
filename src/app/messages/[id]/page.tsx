import MessageComposer from "@/components/MessageComposer";
import { notFound } from "next/navigation";

import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MessagePage({
  params,
}: Props) {
  const { id } = await params;

  const { data: conversation } = await supabase
    .from("marketplace_conversations")
    .select("*")
    .eq("id", id)
    .single();

  if (!conversation) {
    notFound();
  }

  const { data: messages } = await supabase
    .from("marketplace_messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", {
      ascending: true,
    });

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-[#111827]">
          <div className="border-b border-white/10 p-6">
            <h1 className="text-3xl font-bold">
              Conversation
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              ID: {conversation.id}
            </p>
          </div>

          <div className="space-y-4 p-6">
            {messages?.length ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className="rounded-2xl bg-[#1F2937] p-4"
                >
                  <p className="text-sm text-gray-400">
                    Sender: {message.sender_id}
                  </p>

                  <p className="mt-2">
                    {message.message}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    {new Date(
                      message.created_at
                    ).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                No messages yet.
              </p>
            )}
          </div>

          <div className="border-t border-white/10 p-6">
            <MessageComposer
              conversationId={conversation.id}
              senderId={conversation.buyer_id}
            />
          </div>
        </div>
      </div>
    </main>
  );
}