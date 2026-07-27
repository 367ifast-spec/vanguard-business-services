"use client";

import { FormEvent, useState } from "react";

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
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    const cleanComment = comment.trim();

    if (!cleanComment) {
      setIsError(true);
      setMessage("Please enter a review comment.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setIsError(false);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(
          "REVIEW AUTH ERROR:",
          userError
        );

        setIsError(true);
        setMessage(
          `Authentication failed: ${userError.message}`
        );
        return;
      }

      if (!user) {
        setIsError(true);
        setMessage(
          "Please login before submitting a review."
        );
        return;
      }

      if (user.id === sellerId) {
        setIsError(true);
        setMessage(
          "You cannot review your own listing."
        );
        return;
      }

      console.log("REVIEW INSERT ATTEMPT:", {
        listing_id: listingId,
        seller_id: sellerId,
        reviewer_id: user.id,
        rating,
        comment: cleanComment,
      });

      const { error } = await supabase
        .from("reviews")
        .insert({
          listing_id: listingId,
          seller_id: sellerId,
          reviewer_id: user.id,
          rating,
          comment: cleanComment,
        });

      if (error) {
        console.error(
          "REVIEW INSERT ERROR:",
          {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code,
          }
        );

        setIsError(true);

        setMessage(
          `Review failed: ${error.message}${
            error.code
              ? ` (Code: ${error.code})`
              : ""
          }`
        );

        return;
      }

      console.log("REVIEW INSERT SUCCESS");

      setRating(5);
      setComment("");

      setIsError(false);
      setMessage(
        "Review submitted successfully!"
      );
    } catch (error) {
      console.error(
        "UNEXPECTED REVIEW ERROR:",
        error
      );

      setIsError(true);

      setMessage(
        error instanceof Error
          ? `Review failed: ${error.message}`
          : "Review failed due to an unexpected error."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 rounded-3xl bg-[#111827] p-8 text-white">
      <h2 className="text-2xl font-bold">
        Leave a Review
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        Share your experience with this
        marketplace listing.
      </p>

      {message ? (
        <div
          className={`mt-6 rounded-xl border p-4 text-sm ${
            isError
              ? "border-red-500/30 bg-red-500/10 text-red-300"
              : "border-green-500/30 bg-green-500/10 text-green-300"
          }`}
        >
          {message}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-6"
      >
        <div>
          <label
            htmlFor="review-rating"
            className="mb-2 block font-medium"
          >
            Rating
          </label>

          <select
            id="review-rating"
            value={rating}
            disabled={loading}
            onChange={(event) =>
              setRating(
                Number(event.target.value)
              )
            }
            className="w-full rounded-xl border border-white/10 bg-[#0B1020] p-4 text-white outline-none transition focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="review-comment"
            className="mb-2 block font-medium"
          >
            Comment
          </label>

          <textarea
            id="review-comment"
            rows={5}
            value={comment}
            disabled={loading}
            maxLength={2000}
            onChange={(event) =>
              setComment(event.target.value)
            }
            placeholder="Share your experience..."
            className="w-full resize-y rounded-xl border border-white/10 bg-[#0B1020] p-4 text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            required
          />

          <p className="mt-2 text-right text-xs text-gray-500">
            {comment.length}/2000
          </p>
        </div>

        <button
          type="submit"
          disabled={
            loading || !comment.trim()
          }
          className="w-full rounded-xl bg-indigo-600 py-4 font-semibold transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : "Submit Review"}
        </button>
      </form>
    </div>
  );
}