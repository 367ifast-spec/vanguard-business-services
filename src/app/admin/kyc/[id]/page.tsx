import Link from "next/link";

import {
  supabase,
  supabaseAdmin,
} from "@/lib/supabase";

import {
  approveKYC,
  rejectKYC,
} from "../actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type KYCSubmission = {
  id: string;
  full_name: string;
  country: string;
  id_type: string;
  id_number: string;
  front_image: string | null;
  back_image: string | null;
  selfie_image: string | null;
  status: string | null;
  created_at: string | null;
  user_id: string | null;
};

type DocumentPreviewProps = {
  title: string;
  path: string | null;
  signedUrl: string | null;
};

function getStatusClasses(status: string) {
  if (status === "approved") {
    return "border-green-500/20 bg-green-500/10 text-green-400";
  }

  if (status === "rejected") {
    return "border-red-500/20 bg-red-500/10 text-red-400";
  }

  return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
}

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString();
}

async function createDocumentSignedUrl(
  path: string | null
): Promise<string | null> {
  if (!path || !supabaseAdmin) {
    return null;
  }

  const { data, error } = await supabaseAdmin.storage
    .from("kyc-documents")
    .createSignedUrl(path, 60 * 10);

  if (error) {
    console.error(
      "KYC SIGNED URL ERROR:",
      path,
      error.message
    );

    return null;
  }

  return data.signedUrl;
}

function DocumentPreview({
  title,
  path,
  signedUrl,
}: DocumentPreviewProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold">
          {title}
        </p>

        {signedUrl ? (
          <a
            href={signedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20"
          >
            Open Full Image
          </a>
        ) : null}
      </div>

      {!path ? (
        <div className="mt-4 rounded-xl border border-dashed border-white/10 p-6 text-sm text-gray-500">
          Not submitted
        </div>
      ) : signedUrl ? (
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          <img
            src={signedUrl}
            alt={title}
            className="max-h-[600px] w-full object-contain"
          />
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm font-semibold text-red-400">
            Preview unavailable
          </p>

          <p className="mt-2 break-all text-xs text-gray-400">
            {path}
          </p>
        </div>
      )}

      {path ? (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-gray-500 transition hover:text-gray-300">
            Show storage path
          </summary>

          <p className="mt-3 break-all rounded-xl border border-white/10 bg-[#111827] p-3 text-xs text-gray-500">
            {path}
          </p>
        </details>
      ) : null}
    </div>
  );
}

export default async function AdminKYCReviewPage({
  params,
}: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("seller_kyc")
    .select(
      `
        id,
        full_name,
        country,
        id_type,
        id_number,
        front_image,
        back_image,
        selfie_image,
        status,
        created_at,
        user_id
      `
    )
    .eq("id", id)
    .maybeSingle();

  const submission =
    (data as KYCSubmission | null) ?? null;

  if (error) {
    return (
      <main className="min-h-screen bg-[#0B1020] text-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8">
            <h1 className="text-3xl font-bold text-red-400">
              Failed to load KYC submission
            </h1>

            <p className="mt-4 text-gray-300">
              {error.message}
            </p>

            <Link
              href="/admin/kyc"
              className="mt-6 inline-block text-indigo-400 transition hover:text-indigo-300"
            >
              ← Back to KYC Submissions
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!submission) {
    return (
      <main className="min-h-screen bg-[#0B1020] text-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-8">
            <h1 className="text-3xl font-bold">
              KYC Submission Not Found
            </h1>

            <p className="mt-4 text-gray-400">
              No KYC submission exists with this ID.
            </p>

            <Link
              href="/admin/kyc"
              className="mt-6 inline-block text-indigo-400 transition hover:text-indigo-300"
            >
              ← Back to KYC Submissions
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const status = (
    submission.status ?? "pending"
  ).toLowerCase();

  const [
    frontSignedUrl,
    backSignedUrl,
    selfieSignedUrl,
  ] = await Promise.all([
    createDocumentSignedUrl(
      submission.front_image
    ),
    createDocumentSignedUrl(
      submission.back_image
    ),
    createDocumentSignedUrl(
      submission.selfie_image
    ),
  ]);

  const approveAction = async () => {
    "use server";

    await approveKYC(submission.id);
  };

  const rejectAction = async () => {
    "use server";

    await rejectKYC(submission.id);
  };

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">
              KYC Review
            </h1>

            <p className="mt-4 text-gray-400">
              Review seller identity verification details
              and submitted documents.
            </p>
          </div>

          <Link
            href="/admin/kyc"
            className="w-fit rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-700"
          >
            Back to KYC
          </Link>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-5">
              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <p className="mt-2 text-lg font-semibold">
                {submission.full_name}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-5">
              <p className="text-sm text-gray-500">
                Country
              </p>

              <p className="mt-2 text-lg font-semibold">
                {submission.country}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-5">
              <p className="text-sm text-gray-500">
                Document Type
              </p>

              <p className="mt-2 text-lg font-semibold">
                {submission.id_type}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-5">
              <p className="text-sm text-gray-500">
                ID Number
              </p>

              <p className="mt-2 break-all text-lg font-semibold">
                {submission.id_number}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-5">
              <p className="text-sm text-gray-500">
                Submitted
              </p>

              <p className="mt-2 text-lg font-semibold">
                {formatDate(
                  submission.created_at
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1020] p-5">
              <p className="text-sm text-gray-500">
                User Account
              </p>

              {submission.user_id ? (
                <>
                  <p className="mt-2 font-semibold text-green-400">
                    Linked
                  </p>

                  <p className="mt-2 break-all text-sm text-gray-400">
                    {submission.user_id}
                  </p>
                </>
              ) : (
                <p className="mt-2 font-semibold text-red-400">
                  Not Linked
                </p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Current Status
            </p>

            <span
              className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${getStatusClasses(
                status
              )}`}
            >
              {status}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {status !== "approved" ? (
              <form action={approveAction}>
                <button
                  type="submit"
                  className="rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700"
                >
                  Approve KYC
                </button>
              </form>
            ) : null}

            {status !== "rejected" ? (
              <form action={rejectAction}>
                <button
                  type="submit"
                  className="rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
                >
                  Reject KYC
                </button>
              </form>
            ) : null}

            {status === "approved" ? (
              <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-6 py-3 font-semibold text-green-400">
                KYC Approved
              </div>
            ) : null}

            {status === "rejected" ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3 font-semibold text-red-400">
                KYC Rejected
              </div>
            ) : null}
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold">
              Submitted Documents
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Secure document previews from private
              KYC storage.
            </p>

            {!supabaseAdmin ? (
              <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
                <p className="font-semibold text-red-400">
                  Document previews unavailable
                </p>

                <p className="mt-2 text-sm text-gray-300">
                  SUPABASE_SERVICE_ROLE_KEY is not
                  configured on the server.
                </p>
              </div>
            ) : null}

            <div className="mt-6 space-y-6">
              <DocumentPreview
                title="Document Front"
                path={submission.front_image}
                signedUrl={frontSignedUrl}
              />

              <DocumentPreview
                title="Document Back"
                path={submission.back_image}
                signedUrl={backSignedUrl}
              />

              <DocumentPreview
                title="Selfie"
                path={submission.selfie_image}
                signedUrl={selfieSignedUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}