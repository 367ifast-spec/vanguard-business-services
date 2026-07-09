import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Read the Cookie Policy of Vanguard Business Services to learn how cookies are used on our website.",
  alternates: {
    canonical: "https://www.vanguardbusinesservices.com/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | Vanguard Business Services",
    description:
      "Learn how Vanguard Business Services uses cookies to improve your browsing experience.",
    url: "https://www.vanguardbusinesservices.com/cookie-policy",
    siteName: "Vanguard Business Services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | Vanguard Business Services",
    description:
      "Learn how Vanguard Business Services uses cookies to improve your browsing experience.",
  },
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#05071d] py-24 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
          Legal
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Cookie Policy
        </h1>

        <p className="mt-6 text-gray-400">
          Last Updated: July 2026
        </p>

        <div className="mt-12 space-y-10 text-gray-300 leading-8">

          <section>
            <h2 className="text-2xl font-bold text-white">
              What Are Cookies?
            </h2>

            <p className="mt-4">
              Cookies are small text files stored on your device when you visit
              a website. They help improve website performance, remember user
              preferences, and enhance your browsing experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              How We Use Cookies
            </h2>

            <p className="mt-4">
              Vanguard Business Services uses cookies to improve website
              functionality, analyze website traffic, remember user
              preferences, and measure the effectiveness of our services and
              marketing campaigns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Third-Party Cookies
            </h2>

            <p className="mt-4">
              Our website may use trusted third-party services such as Google
              Analytics, Microsoft Clarity, Meta Pixel, and LinkedIn Insight
              Tag. These services may place cookies to help analyze website
              performance and improve user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Managing Cookies
            </h2>

            <p className="mt-4">
              You can control or disable cookies through your browser settings.
              Please note that disabling certain cookies may affect some
              website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Contact Us
            </h2>

            <p className="mt-4">
              If you have any questions regarding this Cookie Policy, please
              contact Vanguard Business Services through our website.
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