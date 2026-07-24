"use client";

import { useState } from "react";

export default function SellerKYCPage() {
  const [form, setForm] = useState({
    fullName: "",
    country: "",
    documentType: "passport",
    documentFront: "",
    documentBack: "",
    selfie: "",
  });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    alert(
      "KYC submitted successfully! (Database integration next)"
    );
  };

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Seller KYC Verification
        </h1>

        <p className="mt-4 text-gray-400">
          Complete your identity verification to
          unlock marketplace features.
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
            placeholder="Document Front URL"
            className="w-full rounded-xl bg-[#1F2937] p-4"
            value={form.documentFront}
            onChange={(e) =>
              setForm({
                ...form,
                documentFront: e.target.value,
              })
            }
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
          />

          <button className="w-full rounded-xl bg-indigo-600 py-4 font-bold">
            Submit KYC
          </button>
        </form>
      </div>
    </main>
  );
}