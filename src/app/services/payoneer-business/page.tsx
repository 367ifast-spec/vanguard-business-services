import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Payoneer Business Guidance | Vanguard Business Services",
  description:
    "Professional guidance for Payoneer Business, international payment workflows, business documentation, onboarding preparation, and global financial operations.",
  keywords: [
    "Payoneer Business",
    "Payoneer",
    "International Payments",
    "Cross Border Payments",
    "Business Payment Solutions",
    "Business Banking",
    "Freelancer Payments",
    "Agency Payments",
    "eCommerce Payments",
    "Global Business",
    "Vanguard Business Services",
  ],

  alternates: {
    canonical:
      "https://www.vanguardbusinesservices.com/services/payoneer-business",
  },

  openGraph: {
    title:
      "Payoneer Business | Vanguard Business Services",
    description:
      "Professional guidance for Payoneer Business, international payment workflows, and business documentation.",
    url:
      "https://www.vanguardbusinesservices.com/services/payoneer-business",
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
    title:
      "Payoneer Business | Vanguard Business Services",
    description:
      "Professional guidance for global business payment solutions.",
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
            name: "Payoneer Business",
            item:
              "https://www.vanguardbusinesservices.com/services/payoneer-business",
          },
        ],
      },

      {
        "@type": "Service",

        name: "Payoneer Business Guidance",

        serviceType:
          "International Payment Guidance",

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
          "Professional guidance for entrepreneurs who want to understand Payoneer Business onboarding, documentation, international payment workflows, and compliance considerations.",
      },

      {
        "@type": "FAQPage",

        mainEntity: [
          {
            "@type": "Question",

            name:
              "Who can benefit from Payoneer Business guidance?",

            acceptedAnswer: {
              "@type": "Answer",

              text:
                "Freelancers, agencies, SaaS companies, eCommerce businesses, consultants, remote teams, and international entrepreneurs can benefit from professional guidance regarding global payment workflows and documentation.",
            },
          },

          {
            "@type": "Question",

            name:
              "Do you provide documentation guidance?",

            acceptedAnswer: {
              "@type": "Answer",

              text:
                "Yes. We provide professional guidance regarding onboarding preparation, documentation requirements, and compliance considerations.",
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
            Global Payment Solutions
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Payoneer Business Guidance
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Vanguard Business Services provides
            professional guidance for entrepreneurs,
            agencies, freelancers, software companies,
            and international businesses looking to
            understand Payoneer Business, payment
            workflows, onboarding preparation, and
            international business operations.
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
              Our professional guidance is designed for freelancers,
              agencies, software companies, digital businesses,
              consultants, online sellers, remote teams,
              startups, and international founders who work with
              global clients and payment ecosystems.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Why Choose Vanguard Business Services
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              We help businesses understand documentation,
              onboarding preparation, compliance considerations,
              and international payment workflows through
              professional business guidance. Our goal is to help
              entrepreneurs build organized and sustainable
              international operations.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Frequently Asked Questions
            </h2>

            <div className="mt-8 space-y-8">

              <div>
                <h3 className="text-xl font-semibold">
                  What is Payoneer Business?
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Payoneer provides international business payment
                  solutions that help eligible businesses send,
                  receive, and manage cross-border payments. Features
                  and eligibility depend on location, business type,
                  and verification requirements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Do you provide onboarding guidance?
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Yes. We provide professional guidance regarding
                  documentation preparation, onboarding readiness,
                  and business best practices.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Who typically uses international payment platforms?
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Freelancers, agencies, SaaS companies,
                  eCommerce businesses, consultants, exporters,
                  and international service providers commonly use
                  global payment platforms.
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
              href="/services/wise-business"
              className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
            >
              Wise Business
            </a>

          </div>

        </section>
      </main>
    </>
  );
}