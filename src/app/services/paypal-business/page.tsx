import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PayPal Business Guidance | Vanguard Business Services",
  description:
    "Professional guidance for PayPal Business, international business payments, onboarding preparation, documentation, and global payment workflows.",
  keywords: [
    "PayPal Business",
    "PayPal Business Account",
    "Business Payments",
    "International Payments",
    "Cross Border Payments",
    "Business Payment Solutions",
    "Global Payments",
    "Freelancer Payments",
    "Agency Payments",
    "eCommerce Payments",
    "Vanguard Business Services",
  ],
  alternates: {
    canonical:
      "https://www.vanguardbusinesservices.com/services/paypal-business",
  },
  openGraph: {
    title: "PayPal Business | Vanguard Business Services",
    description:
      "Professional guidance for PayPal Business, international payment workflows, and business documentation.",
    url:
      "https://www.vanguardbusinesservices.com/services/paypal-business",
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
      "Professional guidance for PayPal Business and international payment solutions.",
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
            item: "https://www.vanguardbusinesservices.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://www.vanguardbusinesservices.com/#services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "PayPal Business",
            item:
              "https://www.vanguardbusinesservices.com/services/paypal-business",
          },
        ],
      },
      {
        "@type": "Service",
        name: "PayPal Business Guidance",
        serviceType: "Business Payment Guidance",
        provider: {
          "@type": "Organization",
          name: "Vanguard Business Services",
          url: "https://www.vanguardbusinesservices.com",
        },
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
        description:
          "Professional guidance for understanding PayPal Business onboarding, business documentation, international payment workflows, and compliance considerations.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who can benefit from PayPal Business guidance?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Freelancers, agencies, consultants, SaaS companies, eCommerce businesses, online sellers, and international entrepreneurs can benefit from professional guidance regarding business payment workflows.",
            },
          },
          {
            "@type": "Question",
            name: "Do you provide onboarding guidance?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Yes. We provide professional guidance regarding documentation preparation, onboarding readiness, and compliance considerations.",
            },
          },
        ],
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
        <section className="mx-auto max-w-6xl px-6 py-24">

          <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
            Global Business Payments
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            PayPal Business Guidance
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Vanguard Business Services provides professional guidance
            for entrepreneurs, freelancers, agencies, software
            companies, and international businesses looking to
            understand PayPal Business, onboarding preparation,
            documentation requirements, international payment
            workflows, and business best practices.
          </p>
                    <section className="mt-16">
            <h2 className="text-3xl font-bold">
              What We Help You Understand
            </h2>

            <ul className="mt-8 list-disc pl-6 space-y-4 text-gray-300 leading-8">
              <li>Business payment workflows</li>
              <li>Business documentation preparation</li>
              <li>International payment best practices</li>
              <li>Business onboarding guidance</li>
              <li>Compliance awareness</li>
              <li>Cross-border payment information</li>
              <li>Financial workflow planning</li>
              <li>Global business operations</li>
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Who Can Benefit
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              Our professional guidance is designed for freelancers,
              agencies, consultants, SaaS companies,
              eCommerce businesses, digital entrepreneurs,
              startups, remote teams, international founders,
              and organizations working with global clients.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Why Professional Guidance Matters
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              Understanding business payment platforms,
              documentation requirements, onboarding
              preparation, verification processes,
              and compliance expectations helps
              businesses prepare more efficiently
              while maintaining organized financial
              operations across international markets.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Key Benefits
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Documentation Guidance
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Learn about commonly required
                  business documentation and
                  onboarding preparation.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  International Payments
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Understand payment workflows,
                  cross-border transactions,
                  and business payment operations.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Compliance Awareness
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Receive professional guidance
                  regarding verification,
                  documentation,
                  and compliance considerations.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Business Growth
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Prepare your business
                  for international operations
                  with structured payment guidance.
                </p>
              </div>

            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Frequently Asked Questions
            </h2>

            <div className="mt-8 space-y-8">

              <div>
                <h3 className="text-xl font-semibold">
                  What is PayPal Business?
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  PayPal Business is designed for
                  businesses that need to send,
                  receive, and manage business
                  payments through PayPal's
                  business platform.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Do you provide onboarding guidance?
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Yes. We provide professional
                  guidance regarding documentation,
                  onboarding preparation,
                  and business best practices.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Who typically uses PayPal Business?
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Freelancers, agencies,
                  SaaS companies,
                  eCommerce businesses,
                  consultants,
                  online sellers,
                  startups,
                  and international businesses.
                </p>
              </div>

            </div>
          </section>
                    <div className="mt-16 flex flex-wrap gap-4">
            <a
              href="/#contact"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
            >
              Contact Us
            </a>

            <a
              href="/services/payoneer-business"
              className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
            >
              Payoneer Business
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