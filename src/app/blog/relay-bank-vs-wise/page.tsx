import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Relay Bank vs Wise (2026 Comparison Guide)",
  description:
    "Compare Relay Bank and Wise Business in 2026. Discover fees, features, international transfers, and which platform is best for your US LLC.",
  alternates: {
    canonical:
      "https://www.vanguardbusinesservices.com/blog/relay-bank-vs-wise",
  },
};

export default function RelayBankVsWisePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <article className="space-y-10">
          {/* Hero */}
          <section className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Relay Bank vs Wise (2026 Guide)
            </h1>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Relay and Wise are two popular financial platforms used by US LLC
              owners worldwide. But which one is right for your business?
            </p>
          </section>

          {/* Quick Comparison */}
          <section className="rounded-2xl border bg-white shadow-sm p-8">
            <h2 className="text-3xl font-semibold mb-6">
              Quick Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Feature</th>
                    <th className="text-left py-3">Relay</th>
                    <th className="text-left py-3">Wise</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Business Banking</td>
                    <td>Yes</td>
                    <td>Limited</td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-3">International Transfers</td>
                    <td>Basic</td>
                    <td>Excellent</td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-3">Monthly Fees</td>
                    <td>$0</td>
                    <td>$0</td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-3">Best For</td>
                    <td>US LLC Banking</td>
                    <td>Global Payments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Relay */}
          <section className="rounded-2xl border p-8 shadow-sm">
            <h2 className="text-3xl font-semibold mb-4">
              What is Relay?
            </h2>

            <p className="text-gray-700 leading-8">
              Relay is a modern business banking platform designed for US
              businesses. It offers multiple checking accounts, team access,
              and expense management tools.
            </p>

            <ul className="list-disc pl-6 mt-6 space-y-2">
              <li>Multiple checking accounts</li>
              <li>No monthly fees</li>
              <li>Great for agencies</li>
              <li>Supports US LLCs</li>
            </ul>
          </section>

          {/* Wise */}
          <section className="rounded-2xl border p-8 shadow-sm">
            <h2 className="text-3xl font-semibold mb-4">
              What is Wise Business?
            </h2>

            <p className="text-gray-700 leading-8">
              Wise is one of the best platforms for international payments. It
              supports multiple currencies and offers competitive exchange
              rates.
            </p>

            <ul className="list-disc pl-6 mt-6 space-y-2">
              <li>Multi-currency accounts</li>
              <li>Low transfer fees</li>
              <li>Global payments</li>
              <li>Excellent exchange rates</li>
            </ul>
          </section>

          {/* Winner */}
          <section className="rounded-2xl border p-8 shadow-sm">
            <h2 className="text-3xl font-semibold mb-4">
              Which One Should You Choose?
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border p-5">
                <h3 className="font-semibold text-xl">
                  Choose Relay If:
                </h3>

                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>You own a US LLC.</li>
                  <li>You need business banking.</li>
                  <li>You manage a team.</li>
                </ul>
              </div>

              <div className="rounded-xl border p-5">
                <h3 className="font-semibold text-xl">
                  Choose Wise If:
                </h3>

                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>You receive international payments.</li>
                  <li>You work with multiple currencies.</li>
                  <li>You prioritize low transfer fees.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="rounded-2xl border p-8 shadow-sm">
            <h2 className="text-3xl font-semibold mb-6">FAQ</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-xl">
                  Is Relay better than Wise?
                </h3>
                <p className="text-gray-600 mt-2">
                  Relay is better for US business banking, while Wise is better
                  for international transfers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl">
                  Can I use both?
                </h3>
                <p className="text-gray-600 mt-2">
                  Yes. Many entrepreneurs use Relay for banking and Wise for
                  international payments.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-3xl border bg-gray-50 p-10 text-center">
            <h2 className="text-3xl font-bold">
              Need Help Setting Up Your US LLC?
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Vanguard Business Services helps entrepreneurs register US LLCs,
              obtain EINs, and set up business banking solutions.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/services/us-llc-registration"
                className="rounded-xl border px-5 py-3 hover:bg-gray-100"
              >
                US LLC Registration
              </Link>

              <Link
                href="/blog/mercury-vs-relay"
                className="rounded-xl border px-5 py-3 hover:bg-gray-100"
              >
                Mercury vs Relay
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border px-5 py-3 hover:bg-gray-100"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}