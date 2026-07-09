import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Privacy Policy of Vanguard Business Services to learn how we collect, use, and protect your information.",
  alternates: {
    canonical: "https://www.vanguardbusinessservices.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Vanguard Business Services",
    description:
      "Learn how Vanguard Business Services collects, uses, and protects your information.",
    url: "https://www.vanguardbusinessservices.com/privacy-policy",
    siteName: "Vanguard Business Services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Vanguard Business Services",
    description:
      "Learn how Vanguard Business Services collects, uses, and protects your information.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#05071d] py-24 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
          Legal
        </span>

        <h1 className="mt-6 text-5xl font-bold">Privacy Policy</h1>

        <p className="mt-6 text-gray-400">
          Last Updated: July 2026
        </p>

        <div className="mt-12 space-y-10 text-gray-300 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-white">
              Information We Collect
            </h2>
            <p className="mt-4">
              We may collect information that you voluntarily provide through
              contact forms, email communications, and other interactions with
              our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              How We Use Information
            </h2>
            <p className="mt-4">
              Information is used to respond to inquiries, provide requested
              services, improve our website, and communicate with clients when
              appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Data Security
            </h2>
            <p className="mt-4">
              We take reasonable measures to protect your information against
              unauthorized access, disclosure, alteration, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Third-Party Services
            </h2>
            <p className="mt-4">
              Our website may use trusted third-party services including
              analytics, advertising, and communication platforms to improve
              user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Contact
            </h2>
            <p className="mt-4">
              If you have any questions regarding this Privacy Policy, please
              contact us through our website.
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