import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PayPal Business",
  description:
    "Professional guidance for PayPal Business setup, business payments, and international payment solutions.",
  keywords: [
    "PayPal Business",
    "PayPal Business Account",
    "Business Payments",
    "International Payments",
    "Payment Solutions",
    "Vanguard Business Services",
  ],
  alternates: {
    canonical:
      "https://www.vanguardbusinessservices.com/services/paypal-business",
  },
  openGraph: {
    title: "PayPal Business | Vanguard Business Services",
    description:
      "Professional guidance for PayPal Business and international payment solutions.",
    url: "https://www.vanguardbusinessservices.com/services/paypal-business",
    siteName: "Vanguard Business Services",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "PayPal Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PayPal Business | Vanguard Business Services",
    description:
      "Professional guidance for PayPal Business solutions.",
    images: ["/opengraph-image.png"],
  },
};

export default function PayPalBusinessPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.vanguardbusinessservices.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://www.vanguardbusinessservices.com/#services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "PayPal Business",
            item: "https://www.vanguardbusinessservices.com/services/paypal-business",
          },
        ],
      },
      {
        "@type": "Service",
        name: "PayPal Business",
        serviceType: "Business Payment Solutions",
        provider: {
          "@type": "Organization",
          name: "Vanguard Business Services",
          url: "https://www.vanguardbusinessservices.com",
        },
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
        description:
          "Professional guidance for PayPal Business onboarding and business payment solutions.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <main className="min-h-screen bg-[#05071d] text-white">
        <section className="mx-auto max-w-6xl px-6 py-28">
          <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
            PayPal Business
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            PayPal Business Solutions
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Vanguard Business Services provides professional guidance for
            businesses seeking information about PayPal Business, payment
            workflows, and business payment solutions.
          </p>

          <div className="mt-12 space-y-6 text-gray-300 leading-8">
            <h2 className="text-3xl font-bold text-white">
              Our Assistance
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>Business payment guidance</li>
              <li>Documentation preparation</li>
              <li>Business compliance information</li>
              <li>International payment consultation</li>
              <li>General onboarding guidance</li>
            </ul>

            <h2 className="pt-8 text-3xl font-bold text-white">
              Why Work With Us
            </h2>

            <p>
              We help entrepreneurs, agencies, startups, and international
              businesses understand business payment requirements and prepare
              the necessary documentation for their operations.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/#contact"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700 transition"
            >
              Contact Us
            </a>

            <a
              href="/services/payoneer-business"
              className="rounded-xl border border-blue-500 px-8 py-4 text-blue-400 hover:bg-blue-500 hover:text-white transition"
            >
              Payoneer Business
            </a>

            <a
              href="/services/business-banking"
              className="rounded-xl border border-blue-500 px-8 py-4 text-blue-400 hover:bg-blue-500 hover:text-white transition"
            >
              Business Banking
            </a>
          </div>
        </section>
      </main>
    </>
  );
}