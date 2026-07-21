import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Disclaimer
        </h1>

        <p className="mt-4 text-gray-400">
          Last Updated: July 22, 2026
        </p>

        <div className="mt-10 space-y-8 leading-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold">
              General Information
            </h2>

            <p className="mt-3">
              All information provided on Vanguard
              Marketplace is for informational
              purposes only and should not be
              considered legal, financial, or tax
              advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              Marketplace Listings
            </h2>

            <p className="mt-3">
              Vanguard Marketplace does not
              guarantee the accuracy of seller
              listings, revenue claims, or traffic
              statistics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              Financial Risk
            </h2>

            <p className="mt-3">
              Buying and selling digital assets
              involves risk. Users are responsible
              for conducting their own due
              diligence before completing any
              transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              Limitation of Liability
            </h2>

            <p className="mt-3">
              Vanguard Marketplace shall not be
              held liable for any losses, damages,
              or disputes arising from the use of
              the platform.
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-10 inline-block text-indigo-400"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}