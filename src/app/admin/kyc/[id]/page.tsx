import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminKYCReviewPage({
  params,
}: Props) {
  const { id } = await params;

  // TODO:
  // Replace with Supabase query later.
  const submission = {
    id,
    full_name: "John Doe",
    country: "United States",
    document_type: "Passport",
    document_front:
      "https://placehold.co/800x500",
    document_back:
      "https://placehold.co/800x500",
    selfie:
      "https://placehold.co/500x500",
    status: "pending",
  };

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          KYC Review
        </h1>

        <p className="mt-4 text-gray-400">
          Submission ID: {submission.id}
        </p>

        <div className="mt-10 space-y-8 rounded-3xl bg-[#111827] p-8">
          <div>
            <h2 className="text-xl font-bold">
              Full Name
            </h2>

            <p className="mt-2 text-gray-400">
              {submission.full_name}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Country
            </h2>

            <p className="mt-2 text-gray-400">
              {submission.country}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Document Type
            </h2>

            <p className="mt-2 text-gray-400">
              {submission.document_type}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Document Front
            </h2>

            <img
              src={submission.document_front}
              alt="Document Front"
              className="mt-4 rounded-2xl"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Document Back
            </h2>

            <img
              src={submission.document_back}
              alt="Document Back"
              className="mt-4 rounded-2xl"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Selfie
            </h2>

            <img
              src={submission.selfie}
              alt="Selfie"
              className="mt-4 rounded-2xl"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Current Status
            </h2>

            <p className="mt-2 text-yellow-400">
              {submission.status}
            </p>
          </div>

          <div className="flex gap-4">
            <button className="rounded-xl bg-green-600 px-6 py-3 font-semibold">
              Approve
            </button>

            <button className="rounded-xl bg-red-600 px-6 py-3 font-semibold">
              Reject
            </button>
          </div>

          <Link
            href="/admin/kyc"
            className="inline-block text-indigo-400"
          >
            ← Back to KYC Submissions
          </Link>
        </div>
      </div>
    </main>
  );
}