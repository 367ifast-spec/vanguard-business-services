import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Read the Refund Policy of Vanguard Business Services.",
  alternates: {
    canonical: "https://www.vanguardbusinesservices.com/refund-policy",
  },
  openGraph: {
    title: "Refund Policy | Vanguard Business Services",
    description:
      "Refund Policy for Vanguard Business Services.",
    url: "https://www.vanguardbusinesservices.com/refund-policy",
    siteName: "Vanguard Business Services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy | Vanguard Business Services",
    description:
      "Refund Policy for Vanguard Business Services.",
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#05071d] py-24 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
          Legal
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Refund Policy
        </h1>

        <p className="mt-6 text-gray-400">
          Last Updated: July 2026
        </p>

        <div className="mt-12 space-y-10 text-gray-300 leading-8">
          <section>
            <h2 className="text-2xl font-bold text-white">
              General Policy
            </h2>
            <p className="mt-4">
              Vanguard Business Services is committed to providing professional
              business services. Because many of our services involve
              consultation, document preparation, and administrative work,
              refund eligibility depends on the status of the requested service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Before Work Begins
            </h2>
            <p className="mt-4">
              If you cancel your order before any work has started, you may be
              eligible for a refund, subject to any applicable administrative
              fees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              After Work Has Started
            </h2>
            <p className="mt-4">
              Once work has commenced, documents have been prepared, or
              applications have been submitted, refunds may not be available.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Third-Party Fees
            </h2>
            <p className="mt-4">
              Government filing fees, banking fees, payment processing fees,
              and other third-party charges are generally non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Contact Us
              <section>
  <h2 className="text-2xl font-bold text-white">
    Chargebacks & Fraud Prevention
  </h2>

  <p className="mt-4">
    Vanguard Business Services reserves the right to dispute
    chargebacks and suspend accounts involved in fraudulent
    payment activity or abuse of our services.
  </p>
</section>
            </h2>
            <p className="mt-4">
  If you have any questions regarding this Refund Policy, please
  contact us at support@vanguardbusinesservices.com.
</p>
          </section>
        </div>

        <div className="mt-16">
          <Link
            href="/#contact"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}