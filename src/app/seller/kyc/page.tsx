"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type KYCStatus = "pending" | "approved" | "rejected";

type ExistingKYC = {
  id: string;
  full_name: string;
  country: string;
  id_type: string;
  id_number: string;
  status: string | null;
  created_at: string | null;
};

export default function SellerKYCPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const [existingKYC, setExistingKYC] =
    useState<ExistingKYC | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    country: "",
    documentType: "passport",
    idNumber: "",
    documentFront: null as File | null,
    documentBack: null as File | null,
    selfie: null as File | null,
  });

  useEffect(() => {
    async function loadKYCStatus() {
      try {
        setCheckingStatus(true);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setExistingKYC(null);
          return;
        }

        const { data, error } = await supabase
          .from("seller_kyc")
          .select(
            `
              id,
              full_name,
              country,
              id_type,
              id_number,
              status,
              created_at
            `
          )
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        setExistingKYC(
          (data as ExistingKYC | null) ?? null
        );
      } catch (error) {
        console.error(
          "KYC STATUS LOAD ERROR:",
          error
        );
      } finally {
        setCheckingStatus(false);
      }
    }

    void loadKYCStatus();
  }, []);

  async function uploadFile(
    file: File,
    userId: string,
    prefix: string
  ) {
    const safeFileName = file.name.replace(
      /[^a-zA-Z0-9._-]/g,
      "-"
    );

    const filePath =
      `${userId}/${prefix}-${Date.now()}-${safeFileName}`;

    const { error } = await supabase.storage
      .from("kyc-documents")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    return filePath;
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Please login before submitting KYC.");
        return;
      }

      if (
        !form.fullName.trim() ||
        !form.country.trim() ||
        !form.idNumber.trim()
      ) {
        alert("Please complete all required fields.");
        return;
      }

      if (
        !form.documentFront ||
        !form.documentBack ||
        !form.selfie
      ) {
        alert("Please upload all required documents.");
        return;
      }

      const { data: currentKYC, error: existingError } =
        await supabase
          .from("seller_kyc")
          .select(
            `
              id,
              full_name,
              country,
              id_type,
              id_number,
              status,
              created_at
            `
          )
          .eq("user_id", user.id)
          .maybeSingle();

      if (existingError) {
        throw existingError;
      }

      if (currentKYC) {
        setExistingKYC(
          currentKYC as ExistingKYC
        );

        alert(
          `You already have a KYC submission. Current status: ${
            currentKYC.status ?? "pending"
          }.`
        );

        return;
      }

      const frontPath = await uploadFile(
        form.documentFront,
        user.id,
        "front"
      );

      const backPath = await uploadFile(
        form.documentBack,
        user.id,
        "back"
      );

      const selfiePath = await uploadFile(
        form.selfie,
        user.id,
        "selfie"
      );

      const { data: insertedKYC, error: insertError } =
        await supabase
          .from("seller_kyc")
          .insert({
            user_id: user.id,
            full_name: form.fullName.trim(),
            country: form.country.trim(),
            id_type: form.documentType,
            id_number: form.idNumber.trim(),
            front_image: frontPath,
            back_image: backPath,
            selfie_image: selfiePath,
            status: "pending",
          })
          .select(
            `
              id,
              full_name,
              country,
              id_type,
              id_number,
              status,
              created_at
            `
          )
          .single();

      if (insertError) {
        throw insertError;
      }

      setExistingKYC(
        insertedKYC as ExistingKYC
      );

      alert(
        "KYC submitted successfully! Your verification is pending admin review."
      );

      router.refresh();
    } catch (error) {
      console.error(
        "KYC SUBMISSION ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting KYC."
      );
    } finally {
      setLoading(false);
    }
  }

  if (checkingStatus) {
    return (
      <main className="min-h-screen bg-[#0B1020] text-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-5xl font-bold">
            Seller KYC Verification
          </h1>

          <div className="mt-8 rounded-3xl border border-white/10 bg-[#111827] p-8">
            <p className="text-gray-400">
              Checking your KYC status...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (existingKYC) {
    const status = (
      existingKYC.status ?? "pending"
    ).toLowerCase() as KYCStatus;

    const statusClasses =
      status === "approved"
        ? "border-green-500/20 bg-green-500/10 text-green-400"
        : status === "rejected"
          ? "border-red-500/20 bg-red-500/10 text-red-400"
          : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";

    const statusTitle =
      status === "approved"
        ? "KYC Approved"
        : status === "rejected"
          ? "KYC Rejected"
          : "KYC Pending Review";

    const statusMessage =
      status === "approved"
        ? "Your identity verification has been approved."
        : status === "rejected"
          ? "Your KYC submission was rejected. Please contact support if you need help with resubmission."
          : "Your KYC submission has been received and is waiting for manual admin review.";

    return (
      <main className="min-h-screen bg-[#0B1020] text-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">
                Seller KYC Verification
              </h1>

              <p className="mt-4 text-gray-400">
                Review your current identity verification
                status.
              </p>
            </div>

            <Link
              href="/seller/dashboard"
              className="w-fit rounded-xl border border-white/10 bg-[#111827] px-5 py-3 font-semibold transition hover:border-indigo-500"
            >
              Back to Dashboard
            </Link>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-8">
            <div
              className={`rounded-2xl border p-6 ${statusClasses}`}
            >
              <h2 className="text-2xl font-bold">
                {statusTitle}
              </h2>

              <p className="mt-3 text-sm">
                {statusMessage}
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-5">
                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                <p className="mt-2 font-semibold">
                  {existingKYC.full_name}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-5">
                <p className="text-sm text-gray-500">
                  Country
                </p>

                <p className="mt-2 font-semibold">
                  {existingKYC.country}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-5">
                <p className="text-sm text-gray-500">
                  Document Type
                </p>

                <p className="mt-2 font-semibold">
                  {existingKYC.id_type}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-5">
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="mt-2 font-semibold capitalize">
                  {status}
                </p>
              </div>
            </div>

            {status === "approved" ? (
              <div className="mt-8">
                <Link
                  href="/seller/dashboard"
                  className="inline-flex rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700"
                >
                  Continue to Seller Dashboard
                </Link>
              </div>
            ) : null}

            {status === "pending" ? (
              <div className="mt-8 rounded-2xl border border-white/10 bg-[#0B1020] p-5">
                <p className="text-sm text-gray-400">
                  You do not need to submit another KYC
                  application. Your current submission is
                  waiting for admin review.
                </p>
              </div>
            ) : null}

            {status === "rejected" ? (
              <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
                <p className="text-sm text-red-200">
                  Resubmission is currently disabled because
                  an existing KYC record is attached to your
                  account.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">
              Seller KYC Verification
            </h1>

            <p className="mt-4 text-gray-400">
              Complete your identity verification to unlock
              marketplace seller features.
            </p>
          </div>

          <Link
            href="/seller/dashboard"
            className="w-fit rounded-xl border border-white/10 bg-[#111827] px-5 py-3 font-semibold transition hover:border-indigo-500"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">
          <p className="text-sm text-indigo-200">
            Your identity documents are stored in private
            storage and submitted for manual verification.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-3xl border border-white/10 bg-[#111827] p-8"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Full legal name"
              className="w-full rounded-xl bg-[#1F2937] p-4 outline-none"
              value={form.fullName}
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName: e.target.value,
                })
              }
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Country
            </label>

            <input
              type="text"
              placeholder="Country"
              className="w-full rounded-xl bg-[#1F2937] p-4 outline-none"
              value={form.country}
              onChange={(e) =>
                setForm({
                  ...form,
                  country: e.target.value,
                })
              }
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Document Type
            </label>

            <select
              className="w-full rounded-xl bg-[#1F2937] p-4 outline-none"
              value={form.documentType}
              onChange={(e) =>
                setForm({
                  ...form,
                  documentType: e.target.value,
                })
              }
              disabled={loading}
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
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              ID Number
            </label>

            <input
              type="text"
              placeholder="Document number"
              className="w-full rounded-xl bg-[#1F2937] p-4 outline-none"
              value={form.idNumber}
              onChange={(e) =>
                setForm({
                  ...form,
                  idNumber: e.target.value,
                })
              }
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Document Front
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="w-full rounded-xl bg-[#1F2937] p-4"
              onChange={(e) =>
                setForm({
                  ...form,
                  documentFront:
                    e.target.files?.[0] ?? null,
                })
              }
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Document Back
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="w-full rounded-xl bg-[#1F2937] p-4"
              onChange={(e) =>
                setForm({
                  ...form,
                  documentBack:
                    e.target.files?.[0] ?? null,
                })
              }
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Selfie
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="w-full rounded-xl bg-[#1F2937] p-4"
              onChange={(e) =>
                setForm({
                  ...form,
                  selfie:
                    e.target.files?.[0] ?? null,
                })
              }
              disabled={loading}
              required
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-4">
            <p className="text-sm text-gray-400">
              Submit clear images that match the information
              entered above. KYC submissions are reviewed
              manually before approval.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-4 font-bold transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Submitting KYC..."
              : "Submit KYC"}
          </button>
        </form>
      </div>
    </main>
  );
}