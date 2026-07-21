import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Privacy Policy
        </h1>

        <p className="mt-4 text-gray-400">
          Last Updated: July 22, 2026
        </p>

        <div className="mt-10 space-y-8 leading-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold">
              Information We Collect
            </h2>

            <p className="mt-3">
              We may collect your name, email
              address, payment information, and
              marketplace activity when you use
              Vanguard Marketplace.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              How We Use Your Information
            </h2>

            <p className="mt-3">
              We use your information to provide
              services, process payments, improve
              user experience, and maintain
              marketplace security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              Data Security
            </h2>

            <p className="mt-3">
              We implement reasonable security
              measures to protect your data from
              unauthorized access and disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              Third-Party Services
            </h2>

            <p className="mt-3">
              We may use third-party services such
              as Supabase, Stripe, NowPayments, and
              Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              Contact Us
            </h2>

            <p className="mt-3">
              If you have questions regarding this
              Privacy Policy, please contact us at
              support@vanguardbusinesservices.com
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