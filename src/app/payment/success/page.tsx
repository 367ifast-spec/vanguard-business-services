import Link from "next/link";

export const metadata = {
  title: "Payment Successful | Vanguard Business Services",
};

interface SuccessPageProps {
  searchParams: Promise<{
    order?: string;
  }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;

  return (
    <main className="container mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
          ✅
        </div>

        <h1 className="text-3xl font-bold text-green-700">
          Payment Received
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for your payment. We have received your transaction and
          will begin processing your order shortly.
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
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Home
          </Link>

          <Link
            href="/services"
            className="rounded-lg border px-6 py-3 font-semibold hover:bg-gray-50"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </main>
  );
}