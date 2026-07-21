import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms & Conditions governing the use of Vanguard Business Services website and services.",
  alternates: {
    canonical: "https://www.vanguardbusinesservices.com/terms",
  },
  openGraph: {
    title: "Terms & Conditions | Vanguard Business Services",
    description:
      "Terms & Conditions for using Vanguard Business Services.",
    url: "https://www.vanguardbusinesservices.com/terms",
    siteName: "Vanguard Business Services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Vanguard Business Services",
    description:
      "Terms & Conditions for using Vanguard Business Services.",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#05071d] py-24 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
          Legal
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Terms & Conditions
        </h1>

        <p className="mt-6 text-gray-400">
          Last Updated: July 2026
        </p>

        <div className="mt-12 space-y-10 text-gray-300 leading-8">
          <section>
            <h2 className="text-2xl font-bold text-white">
              Acceptance of Terms
            </h2>
            <p className="mt-4">
              By accessing or using this website, you agree to comply with these
              Terms & Conditions and all applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Our Services
            </h2>
            <p className="mt-4">
              Vanguard Business Services provides business registration,
              company formation guidance, business banking assistance, payment
              solution consulting, and related business support services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              User Responsibilities
            </h2>
            <p className="mt-4">
              You agree to provide accurate information, comply with applicable
              laws, and use this website only for lawful purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Intellectual Property
            </h2>
            <p className="mt-4">
              All website content, including text, graphics, logos, branding,
              and design, is the property of Vanguard Business Services unless
              otherwise stated. Unauthorized copying or redistribution is
              prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Limitation of Liability
            </h2>
            <p className="mt-4">
              Vanguard Business Services is not responsible for indirect,
              incidental, or consequential damages resulting from the use of
              this website or our services, to the maximum extent permitted by
              applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Changes to These Terms
            </h2>
            <p className="mt-4">
              We may update these Terms & Conditions at any time. Continued use
              of this website after updates constitutes acceptance of the
              revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Contact Us
            </h2>
            <p className="mt-4">
  If you have any questions regarding these Terms & Conditions,
  please contact us at support@vanguardbusinesservices.com.
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