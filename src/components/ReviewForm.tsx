"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  listingId: string;
  sellerId: string;
};

export default function ReviewForm({
  listingId,
  sellerId,
}: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first.");
        return;
      }

      const { error } = await supabase
        .from("reviews")
        .insert({
          listing_id: listingId,
          seller_id: sellerId,
          reviewer_id: user.id,
          rating,
          comment,
        });

      if (error) {
        throw error;
      }

      alert("Review submitted successfully!");

      setRating(5);
      setComment("");
    } catch (error) {
      console.error(
        "Failed to submit review:",
        error
      );

      alert("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 rounded-3xl bg-[#111827] p-8 text-white">
      <h2 className="text-2xl font-bold">
        Leave a Review
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-6"
      >
        <div>
          <label className="mb-2 block">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
            className="w-full rounded-xl bg-[#0B1020] p-4"
          >
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block">
            Comment
          </label>

          <textarea
            rows={5}
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Share your experience..."
            className="w-full rounded-xl bg-[#0B1020] p-4"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-4 font-semibold disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : "Submit Review"}
        </button>
      </form>
    </div>
  );
}