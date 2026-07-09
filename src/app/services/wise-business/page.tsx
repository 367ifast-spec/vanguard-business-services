import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wise Business Guidance | Vanguard Business Services",
  description:
    "Professional guidance for Wise Business, international payments, business documentation, onboarding preparation, and global financial operations.",
  keywords: [
    "Wise Business",
    "Wise",
    "International Payments",
    "Business Payments",
    "Cross Border Payments",
    "Global Business",
    "Business Banking",
    "Freelancer Payments",
    "Agency Payments",
    "eCommerce Payments",
    "Vanguard Business Services",
  ],
  alternates: {
    canonical:
      "https://www.vanguardbusinesservices.com/services/wise-business",
  },
  openGraph: {
    title: "Wise Business | Vanguard Business Services",
    description:
      "Professional guidance for Wise Business, international payment workflows, and business documentation.",
    url:
      "https://www.vanguardbusinesservices.com/services/wise-business",
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
      "Professional guidance for international payment solutions.",
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
            name: "Wise Business",
            item:
              "https://www.vanguardbusinesservices.com/services/wise-business",
          },
        ],
      },
      {
        "@type": "Service",
        name: "Wise Business Guidance",
        serviceType: "International Payment Guidance",
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
          "Professional guidance for understanding Wise Business onboarding, documentation, international payment workflows, and compliance considerations.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who can benefit from Wise Business guidance?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Freelancers, agencies, SaaS companies, consultants, online sellers, and international businesses can benefit from understanding global payment workflows and documentation.",
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
            International Payment Solutions
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Wise Business Guidance
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Vanguard Business Services provides professional guidance
            for entrepreneurs, freelancers, agencies, software
            companies, and international businesses looking to
            understand Wise Business, international payment
            workflows, onboarding preparation, and documentation
            requirements.
          </p>
                    <section className="mt-16">
            <h2 className="text-3xl font-bold">
              What We Help You Understand
            </h2>

            <ul className="mt-8 list-disc pl-6 space-y-4 text-gray-300 leading-8">
              <li>International payment workflows</li>
              <li>Business documentation preparation</li>
              <li>Cross-border payment best practices</li>
              <li>Business onboarding guidance</li>
              <li>Compliance awareness</li>
              <li>Financial workflow planning</li>
              <li>Global business operations</li>
              <li>Business payment organization</li>
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Who Can Benefit
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              Our guidance is designed for freelancers,
              agencies, consultants, digital businesses,
              SaaS companies, online sellers,
              startups, remote teams,
              international founders,
              and organizations working with
              global clients and cross-border payments.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Why Professional Guidance Matters
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              Understanding international payment
              platforms, business documentation,
              onboarding preparation, and compliance
              expectations helps businesses prepare
              efficiently while maintaining organized
              financial operations across multiple
              countries.
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
                  Global Payments
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Understand international payment
                  workflows and cross-border
                  business operations.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Compliance Awareness
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Gain guidance regarding
                  business verification and
                  compliance considerations.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Business Support
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Professional guidance for
                  entrepreneurs expanding
                  internationally.
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
                  What is Wise Business?
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Wise Business provides solutions
                  for international business payments,
                  multiple currency balances,
                  and cross-border financial operations.
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
                  Who typically uses Wise Business?
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Freelancers, agencies,
                  SaaS companies,
                  eCommerce businesses,
                  consultants,
                  remote teams,
                  and international founders.
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
              href="/services/business-banking"
              className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
            >
              Business Banking
            </a>

            <a
              href="/services/payoneer-business"
              className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
            >
              Payoneer Business
            </a>

            <a
              href="/services/stripe-business"
              className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
            >
              Stripe Business
            </a>
          </div>

        </section>
      </main>
    </>
  );
}