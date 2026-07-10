import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen bg-[#05071d] text-white">
      <section className="mx-auto max-w-5xl px-6 py-24">

        <div className="mx-auto max-w-3xl rounded-3xl border border-red-500/20 bg-white/5 p-10 text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20">
            <span className="text-5xl">❌</span>
          </div>

          <h1 className="mt-8 text-5xl font-bold">
            Payment Cancelled
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Your payment was cancelled before it was completed.
            No funds have been received by Vanguard Business Services.
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-[#0b1126] p-6 text-left">

            <h2 className="text-2xl font-semibold">
              What Can You Do Next?
            </h2>

            <ul className="mt-6 space-y-4 text-gray-300">
              <li>• Return to the payment page and try again.</li>
              <li>• Confirm that your wallet has sufficient funds.</li>
              <li>• Check that you selected the correct cryptocurrency.</li>
              <li>• If the problem continues, contact our support team.</li>
            </ul>

          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <Link
              href="/payment"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
            >
              Try Payment Again
            </Link>

            <Link
              href="/#contact"
              className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white hover:text-black"
            >
              Contact Support
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-red-500 px-8 py-4 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              Back to Home
            </Link>

          </div>

        </div>

      </section>
    </main>
  );
}