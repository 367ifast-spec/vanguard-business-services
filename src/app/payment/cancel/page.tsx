import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#05071d] text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Payment Cancelled</h1>
        <p className="mt-4 text-gray-400">
          Your payment was cancelled. You can try again later.
        </p>

        <Link
          href="/payment"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold"
        >
          Try Again
        </Link>
      </div>
    </main>
  );
}