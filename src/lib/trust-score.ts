import { supabase } from "@/lib/supabase";

export async function getSellerTrustScore(
  sellerId: string
) {
  let score = 0;

  // Average Rating (50)
  const { data: ratings } = await supabase
    .from("ratings")
    .select("rating")
    .eq("seller_id", sellerId);

  const averageRating =
    ratings?.length
      ? ratings.reduce(
          (sum, item) => sum + item.rating,
          0
        ) / ratings.length
      : 0;

  score += (averageRating / 5) * 50;

  // Completed Escrows (25)
  const { count: escrowCount } = await supabase
    .from("escrow_transactions")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("seller_id", sellerId)
    .eq("status", "released");

  score += Math.min(
    ((escrowCount ?? 0) / 100) * 25,
    25
  );

  // Verification Status (15)
  const { data: verification } = await supabase
    .from("seller_verifications")
    .select("*")
    .eq("seller_id", sellerId)
    .eq("status", "approved")
    .single();

  if (verification) {
    score += 15;
  }

  // Account Age (10)
  // TODO: Replace with auth.users.created_at
  score += 10;

  return Math.round(score);
}