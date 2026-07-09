import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-[#05071d] text-white">
      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <div className="rounded-full bg-green-500/20 p-5">
          <span className="text-5xl">✅</span>
        </div>

        <h1 className="mt-8 text-5xl font-bold">
          Payment Successful
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-300">
          Thank you for your payment.
          Your transaction has been received successfully.
          Our team will review your order and contact you shortly.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700"
          >
            Back to Home
          </Link>

          <Link
            href="/#contact"
            className="rounded-xl border border-white/20 px-8 py-4 font-semibold hover:bg-white hover:text-black"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}