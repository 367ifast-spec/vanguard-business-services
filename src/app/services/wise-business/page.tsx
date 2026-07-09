import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wise Business",
  description:
    "Professional guidance for Wise Business setup, international payments, and business financial solutions.",
  keywords: [
    "Wise Business",
    "Wise Account",
    "International Payments",
    "Business Payments",
    "Global Business",
    "Vanguard Business Services",
  ],
  alternates: {
    canonical:
      "https://www.vanguardbusinessservices.com/services/wise-business",
  },
  openGraph: {
    title: "Wise Business | Vanguard Business Services",
    description:
      "Professional guidance for Wise Business and international payment solutions.",
    url: "https://www.vanguardbusinessservices.com/services/wise-business",
    siteName: "Vanguard Business Services",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Wise Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wise Business | Vanguard Business Services",
    description:
      "Professional guidance for Wise Business and international payment solutions.",
    images: ["/opengraph-image.png"],
  },
};

export default function WiseBusinessPage() {
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
            name: "Wise Business",
            item: "https://www.vanguardbusinessservices.com/services/wise-business",
          },
        ],
      },
      {
        "@type": "Service",
        name: "Wise Business",
        serviceType: "International Business Payment Solutions",
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
          "Professional guidance for Wise Business setup and international payment solutions.",
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
            Wise Business
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Wise Business Solutions
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Vanguard Business Services provides professional guidance for
            businesses seeking international payment solutions and understanding
            Wise Business onboarding requirements.
          </p>

          <div className="mt-12 space-y-6 text-gray-300 leading-8">
            <h2 className="text-3xl font-bold text-white">
              Our Services
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>International payment guidance</li>
              <li>Business documentation support</li>
              <li>Compliance information</li>
              <li>Cross-border payment consultation</li>
              <li>Business onboarding guidance</li>
            </ul>

            <h2 className="pt-8 text-3xl font-bold text-white">
              Why Choose Us
            </h2>

            <p>
              We help entrepreneurs, agencies, eCommerce businesses, SaaS
              founders, and international companies understand business payment
              solutions through professional consultation and ongoing support.
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
              href="/services/stripe-business"
              className="rounded-xl border border-blue-500 px-8 py-4 text-blue-400 hover:bg-blue-500 hover:text-white transition"
            >
              Stripe Business
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