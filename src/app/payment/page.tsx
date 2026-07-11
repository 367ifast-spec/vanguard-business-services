import PaymentButton from "@/components/PaymentButton";

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-[#05071d] text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <span className="inline-block rounded-full bg-green-600/20 px-4 py-2 text-sm font-semibold text-green-400">
            Secure Crypto Payment
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Complete Your Payment
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Complete your payment securely through NOWPayments.
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-bold">
            Order Summary
          </h2>

          <div className="mt-8 space-y-5">
            <div className="flex justify-between">
              <span className="text-gray-400">Service</span>
              <span>US LLC Registration</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Total</span>
              <span>$650</span>
            </div>
          </div>

          <div className="mt-10">
            <PaymentButton
              amount={650}
              service="US LLC Registration"
              quoteId="DEMO-QUOTE"
            />
          </div>
        </div>
      </section>
    </main>
  );
}