import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-[#05071d] text-white">
      <section className="mx-auto max-w-5xl px-6 py-24">

        <div className="mx-auto max-w-3xl rounded-3xl border border-green-500/20 bg-white/5 p-10 text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">
            <span className="text-5xl">✅</span>
          </div>

          <h1 className="mt-8 text-5xl font-bold">
            Payment Successful
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Thank you for choosing <strong>Vanguard Business Services</strong>.
            Your payment has been received successfully and is currently under review.
          </p>

          <div className="mt-10 rounded-2xl border border-white/10 bg-[#0b1126] p-6 text-left">

            <h2 className="text-2xl font-semibold">
              What Happens Next?
            </h2>

            <ul className="mt-6 space-y-4 text-gray-300">

              <li>✅ Your payment has been securely received.</li>

              <li>✅ Our team will verify your transaction.</li>

              <li>✅ We will contact you using your submitted email or WhatsApp.</li>

              <li>✅ Your requested service will begin after verification.</li>

              <li>✅ If additional documents are required, our team will notify you.</li>

            </ul>

          </div>

          <div className="mt-10 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">

            <h3 className="text-xl font-semibold">
              Need Help?
            </h3>

            <p className="mt-3 text-gray-300">
              If you have any questions regarding your payment,
              please contact our support team.
            </p>

          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <Link
              href="/"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
            >
              Back to Home
            </Link>

            <Link
              href="/#contact"
              className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white hover:text-black"
            >
              Contact Support
            </Link>

            <Link
              href="/payment"
              className="rounded-xl border border-green-500 px-8 py-4 font-semibold text-green-400 transition hover:bg-green-500 hover:text-white"
            >
              Make Another Payment
            </Link>

          </div>

        </div>

      </section>
    </main>
  );
}