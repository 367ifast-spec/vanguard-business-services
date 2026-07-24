import { supabase } from "@/lib/supabase";

export async function createReview({
  listing_id,
  seller_id,
  reviewer_id,
  rating,
  comment,
}: {
  listing_id: string;
  seller_id: string;
  reviewer_id: string;
  rating: number;
  comment: string;
}) {
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      listing_id,
      seller_id,
      reviewer_id,
      rating,
      comment,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getReviewsByListing(
  listingId: string
) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("listing_id", listingId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function getReviewsBySeller(
  sellerId: string
) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("seller_id", sellerId);

  if (error) {
    throw error;
  }

  return data;
}

export async function getAverageRating(
  sellerId: string
) {
  const reviews =
    await getReviewsBySeller(sellerId);

  if (!reviews.length) {
    return 0;
  }

  const total = reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  return Number(
    (total / reviews.length).toFixed(1)
  );
}

export async function deleteReview(
  id: string
) {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}