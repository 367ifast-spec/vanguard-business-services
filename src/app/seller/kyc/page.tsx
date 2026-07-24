"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SellerKYCPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    country: "",
    documentType: "passport",
    idNumber: "",
    documentFront: "",
    documentBack: "",
    selfie: "",
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await supabase
        .from("seller_kyc")
        .insert([
          {
            full_name: form.fullName,
            country: form.country,
            id_type: form.documentType,
            id_number: form.idNumber,
            front_image: form.documentFront,
            back_image: form.documentBack,
            selfie_image: form.selfie,
            status: "pending",
          },
        ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert(
        "KYC submitted successfully! Redirecting to Seller Packages..."
      );

      router.push("/seller/packages");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Seller KYC Verification
        </h1>

        <p className="mt-4 text-gray-400">
          Complete your identity verification to unlock
          marketplace features.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-3xl bg-[#111827] p-8"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl bg-[#1F2937] p-4"
            value={form.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                fullName: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Country"
            className="w-full rounded-xl bg-[#1F2937] p-4"
            value={form.country}
            onChange={(e) =>
              setForm({
                ...form,
                country: e.target.value,
              })
            }
            required
          />

          <select
            className="w-full rounded-xl bg-[#1F2937] p-4"
            value={form.documentType}
            onChange={(e) =>
              setForm({
                ...form,
                documentType: e.target.value,
              })
            }
          >
            <option value="passport">
              Passport
            </option>
            <option value="nid">
              National ID
            </option>
            <option value="license">
              Driving License
            </option>
          </select>

          <input
            type="text"
            placeholder="ID Number"
            className="w-full rounded-xl bg-[#1F2937] p-4"
            value={form.idNumber}
            onChange={(e) =>
              setForm({
                ...form,
                idNumber: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Document Front URL"
            className="w-full rounded-xl bg-[#1F2937] p-4"
            value={form.documentFront}
            onChange={(e) =>
              setForm({
                ...form,
                documentFront: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Document Back URL"
            className="w-full rounded-xl bg-[#1F2937] p-4"
            value={form.documentBack}
            onChange={(e) =>
              setForm({
                ...form,
                documentBack: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Selfie URL"
            className="w-full rounded-xl bg-[#1F2937] p-4"
            value={form.selfie}
            onChange={(e) =>
              setForm({
                ...form,
                selfie: e.target.value,
              })
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-4 font-bold transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit KYC"}
          </button>
        </form>
      </div>
    </main>
  );
}