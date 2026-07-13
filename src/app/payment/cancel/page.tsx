import Link from "next/link";

export const metadata = {
  title: "Payment Cancelled | Vanguard Business Services",
};

interface CancelPageProps {
  searchParams: Promise<{
    order?: string;
  }>;
}

export default async function PaymentCancelPage({
  searchParams,
}: CancelPageProps) {
  const params = await searchParams;

  return (
    <main className="container mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-3xl">
          ⚠️
        </div>

        <h1 className="text-3xl font-bold text-yellow-700">
          Payment Cancelled
        </h1>

        <p className="mt-4 text-gray-600">
          Your payment was cancelled or was not completed. No payment has been
          received.
        </p>

        {params.order && (
          <div className="mt-6 rounded-lg bg-gray-100 p-4">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="mt-1 break-all font-mono text-sm">
              {params.order}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          {params.order && (
            <Link
              href={`/payment?order=${params.order}`}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Try Payment Again
            </Link>
          )}

          <Link
            href="/cart"
            className="rounded-lg border px-6 py-3 font-semibold hover:bg-gray-50"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </main>
  );
}