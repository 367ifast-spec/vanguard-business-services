import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function NewMessagePage({
  searchParams,
}: {
  searchParams: Promise<{
    listing?: string;
  }>;
}) {
  const { listing } = await searchParams;

  if (!listing) {
    redirect("/marketplace");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const buyerId = user.id;

  // Fetch listing to get seller_id
  const { data: listingData, error: listingError } =
    await supabase
      .from("marketplace_listings")
      .select("id, seller_id")
      .eq("id", listing)
      .single();

  if (listingError || !listingData) {
    return (
      <main className="min-h-screen bg-[#0B1020] p-10 text-white">
        <h1 className="text-4xl font-bold">
          Listing not found
        </h1>

        <p className="mt-4 text-gray-400">
          Unable to find the requested listing.
        </p>
      </main>
    );
  }

  const sellerId = listingData.seller_id;

  // Prevent messaging yourself
  if (buyerId === sellerId) {
    return (
      <main className="min-h-screen bg-[#0B1020] p-10 text-white">
        <h1 className="text-4xl font-bold">
          Invalid Action
        </h1>

        <p className="mt-4 text-gray-400">
          You cannot message yourself.
        </p>
      </main>
    );
  }

  // Check existing conversation
  const { data: existingConversation } =
    await supabase
      .from("marketplace_conversations")
      .select("id")
      .eq("buyer_id", buyerId)
      .eq("seller_id", sellerId)
      .eq("listing_id", listing)
      .maybeSingle();

  if (existingConversation) {
    redirect(
      `/messages/${existingConversation.id}`
    );
  }

  // Create conversation
  const { data: conversation, error } =
    await supabase
      .from("marketplace_conversations")
      .insert({
        buyer_id: buyerId,
        seller_id: sellerId,
        listing_id: listing,
      })
      .select()
      .single();

  if (error || !conversation) {
    return (
      <main className="min-h-screen bg-[#0B1020] p-10 text-white">
        <h1 className="text-4xl font-bold">
          Failed to create conversation
        </h1>

        <p className="mt-4 text-gray-400">
          {error?.message}
        </p>
      </main>
    );
  }

  // Create notification
  await supabase
    .from("notifications")
    .insert({
      user_id: sellerId,
      title: "New Conversation",
      message:
        "A buyer has contacted you about your listing.",
    });

  redirect(`/messages/${conversation.id}`);
}