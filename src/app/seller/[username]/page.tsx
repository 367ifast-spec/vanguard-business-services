import Link from "next/link";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function SellerProfilePage({
  params,
}: Props) {
  const { username } = await params;

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          @{username}
        </h1>

        <p className="mt-4 text-gray-400">
          Seller profile page coming soon.
        </p>

        <div className="mt-10 rounded-3xl bg-[#111827] p-8">
          <h2 className="text-2xl font-bold">
            Seller Statistics
          </h2>

          <div className="mt-6 space-y-2 text-gray-300">
            <p>Total Sales: 0</p>
            <p>Active Listings: 0</p>
            <p>Rating: 0.0</p>
            <p>KYC Status: Pending</p>
          </div>
        </div>

        <Link
          href="/marketplace"
          className="mt-8 inline-block text-indigo-400"
        >
          ← Back to Marketplace
        </Link>
      </div>
    </main>
  );
}