import PaymentButton from "@/components/PaymentButton";

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-[#05071d] text-white">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <span className="rounded-full bg-green-600/20 px-4 py-2 text-sm font-semibold text-green-400">
          Secure Crypto Payment
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Complete Your Payment
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
          Complete your payment securely through NOWPayments.
        </p>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-bold">
            Demo Payment
          </h2>

          <div className="mt-6 flex items-center justify-between">
            <span>Service</span>
            <span>US LLC Registration</span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span>Amount</span>
            <span>$650 USD</span>
          </div>

          <div className="mt-8">
            <PaymentButton
              amount={650}
              service="US LLC Registration"
            />
          </div>
        </div>
      </section>
    </main>
  );
}