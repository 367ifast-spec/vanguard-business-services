"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SellerRegisterPage() {
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await supabase
        .from("seller_applications")
        .insert({
          full_name: fullName,
          email,
          username,
          bio,
        });

      if (error) {
        throw error;
      }

      alert(
        "Application submitted successfully! Please wait for admin approval."
      );

      setFullName("");
      setEmail("");
      setUsername("");
      setBio("");
    } catch (error: any) {
      console.error(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-5xl font-bold">
          Become a Seller
        </h1>

        <p className="mt-4 text-gray-400">
          Join Vanguard Marketplace and start
          selling your digital assets.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-2xl bg-white/5 p-8"
        >
          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            placeholder="Full Name"
            required
            className="w-full rounded-xl bg-[#111827] p-4 outline-none"
          />

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email Address"
            required
            className="w-full rounded-xl bg-[#111827] p-4 outline-none"
          />

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            placeholder="Username"
            required
            className="w-full rounded-xl bg-[#111827] p-4 outline-none"
          />

          <textarea
            rows={5}
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
            placeholder="Tell us about yourself"
            className="w-full rounded-xl bg-[#111827] p-4 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-4 font-semibold"
          >
            {loading
              ? "Submitting..."
              : "Submit Application"}
          </button>
        </form>

        <div className="mt-8">
          <Link
            href="/marketplace"
            className="text-indigo-400"
          >
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    </main>
  );
}