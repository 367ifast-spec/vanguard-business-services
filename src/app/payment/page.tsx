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
            Complete your payment securely through NOWPayments. Your payment is
            encrypted and processed using industry-standard security practices.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">

          {/* Order Summary */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 lg:col-span-2">

            <h2 className="text-2xl font-bold">
              Order Summary
            </h2>

            <div className="mt-8 space-y-5">

              <div className="flex justify-between">
                <span className="text-gray-400">Service</span>
                <span className="font-medium">
                  US LLC Registration
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Payment Provider
                </span>
                <span className="font-medium">
                  NOWPayments
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Currency
                </span>
                <span className="font-medium">
                  USD
                </span>
              </div>

              <div className="border-t border-white/10 pt-5 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>$650</span>
              </div>

            </div>

            <div className="mt-10">
              <PaymentButton
                amount={650}
                service="US LLC Registration"
              />
            </div>

          </div>

          {/* Information */}
          <div className="space-y-6">

            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
              <h3 className="text-xl font-semibold">
                Payment Security
              </h3>

              <p className="mt-3 text-sm text-gray-300">
                Your payment is processed securely using NOWPayments.
                Vanguard Business Services does not store your wallet
                credentials or payment information.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">
                Accepted Cryptocurrencies
              </h3>

              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• Bitcoin (BTC)</li>
                <li>• Ethereum (ETH)</li>
                <li>• Litecoin (LTC)</li>
                <li>• USDT</li>
                <li>• USDC</li>
                <li>• 300+ Supported Coins</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6">
              <h3 className="text-xl font-semibold">
                Need Assistance?
              </h3>

              <p className="mt-3 text-sm text-gray-300">
                If you experience any issues during payment, please contact our
                support team before making another payment attempt.
              </p>
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}