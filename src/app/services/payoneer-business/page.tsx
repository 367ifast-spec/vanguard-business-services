import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payoneer Business",
  description:
    "Professional guidance for Payoneer Business solutions, international business payments, and global financial operations.",
  keywords: [
    "Payoneer Business",
    "Payoneer",
    "International Business Payments",
    "Global Payments",
    "Business Payment Solutions",
    "Vanguard Business Services",
  ],
  alternates: {
    canonical:
      "https://www.vanguardbusinessservices.com/services/payoneer-business",
  },
  openGraph: {
    title: "Payoneer Business | Vanguard Business Services",
    description:
      "Professional guidance for Payoneer Business and international payment solutions.",
    url: "https://www.vanguardbusinessservices.com/services/payoneer-business",
    siteName: "Vanguard Business Services",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Payoneer Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Payoneer Business | Vanguard Business Services",
    description:
      "Professional guidance for Payoneer Business and global payment solutions.",
    images: ["/opengraph-image.png"],
  },
};

export default function PayoneerBusinessPage() {
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
            name: "Payoneer Business",
            item: "https://www.vanguardbusinessservices.com/services/payoneer-business",
          },
        ],
      },
      {
        "@type": "Service",
        name: "Payoneer Business",
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
          "Professional guidance for Payoneer Business onboarding, international payments, and business financial solutions.",
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
            Payoneer Business
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Payoneer Business Solutions
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Vanguard Business Services provides professional guidance for
            businesses looking to understand Payoneer Business requirements,
            international transactions, and global payment workflows.
          </p>

          <div className="mt-12 space-y-6 text-gray-300 leading-8">
            <h2 className="text-3xl font-bold text-white">
              What We Help With
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>Business payment guidance</li>
              <li>International transaction information</li>
              <li>Business documentation preparation</li>
              <li>Compliance guidance</li>
              <li>Business onboarding support</li>
            </ul>

            <h2 className="pt-8 text-3xl font-bold text-white">
              Professional Support
            </h2>

            <p>
              We help entrepreneurs, agencies, eCommerce businesses, SaaS
              companies, and international founders understand payment
              solutions, required documentation, and business best practices.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/#contact"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
            >
              Contact Us
            </a>

            <a
              href="/services/wise-business"
              className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
            >
              Wise Business
            </a>

            <a
              href="/services/business-banking"
              className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
            >
              Business Banking
            </a>
          </div>
        </section>
      </main>
    </>
  );
}