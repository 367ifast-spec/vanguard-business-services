import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Vanguard Business Services | International Business Experts",
  description:
    "Learn about Vanguard Business Services and our professional guidance for US LLC registration, UK LTD formation, international business banking, payment solutions, and global business growth.",
  keywords: [
    "About Vanguard Business Services",
    "US LLC Registration",
    "UK LTD Registration",
    "Business Banking",
    "International Business",
    "Payment Solutions",
    "Global Business",
    "Business Consulting",
  ],
  alternates: {
    canonical: "https://www.vanguardbusinesservices.com/about",
  },
  openGraph: {
    title: "About Vanguard Business Services",
    description:
      "Professional guidance for entrepreneurs, startups, agencies, freelancers, and international businesses.",
    url: "https://www.vanguardbusinesservices.com/about",
    siteName: "Vanguard Business Services",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "About Vanguard Business Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Vanguard Business Services",
    description:
      "Professional international business guidance and payment solutions.",
    images: ["/opengraph-image.png"],
  },
};

export default function AboutPage() {
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
            name: "About",
            item: "https://www.vanguardbusinesservices.com/about",
          },
        ],
      },
      {
        "@type": "AboutPage",
        name: "About Vanguard Business Services",
        url: "https://www.vanguardbusinesservices.com/about",
      },
      {
        "@type": "Organization",
        name: "Vanguard Business Services",
        url: "https://www.vanguardbusinesservices.com",
        description:
          "Professional guidance for international business formation, business banking, payment solutions, and global business growth.",
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
            About Vanguard Business Services
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Helping Businesses Grow Internationally
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Vanguard Business Services provides professional guidance
            for entrepreneurs, freelancers, agencies, startups,
            eCommerce businesses, SaaS companies, and international
            founders looking to build and expand their businesses
            through structured international business solutions.
          </p>
                    <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Who We Are
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              Vanguard Business Services is committed to helping
              entrepreneurs understand international business
              formation, payment solutions, and business
              documentation. We provide professional guidance
              designed to help businesses prepare for global
              operations with confidence.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Our Mission
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              Our mission is to provide reliable business guidance,
              practical resources, and professional support that help
              entrepreneurs build strong international businesses and
              make informed decisions throughout their business
              journey.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Our Vision
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              We aim to become a trusted international business
              guidance provider by delivering professional support,
              transparent communication, and practical solutions for
              businesses expanding into global markets.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              What We Help With
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Business Formation
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Guidance for US LLC registration,
                  UK LTD formation, and international
                  business preparation.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Business Banking
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Professional guidance regarding
                  business banking options and
                  financial workflows.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Payment Solutions
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Guidance for international payment
                  platforms and business payment
                  operations.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Documentation
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Learn about documentation,
                  onboarding preparation,
                  and compliance awareness.
                </p>
              </div>

            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Who We Serve
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              We support freelancers, agencies,
              SaaS companies, startups,
              eCommerce businesses,
              consultants, digital entrepreneurs,
              remote teams, and international
              founders seeking professional
              business guidance.
            </p>
          </section>
                    <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Why Choose Vanguard Business Services
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Professional Guidance
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  We provide clear and structured guidance
                  to help businesses understand international
                  business processes and payment solutions.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Global Perspective
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Our guidance is designed for businesses
                  operating with international clients,
                  remote teams, and cross-border markets.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Business-Focused Solutions
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  Every recommendation is focused on helping
                  entrepreneurs build organized and sustainable
                  international business operations.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold">
                  Long-Term Support
                </h3>

                <p className="mt-3 text-gray-300 leading-8">
                  We aim to build long-term relationships by
                  providing reliable business guidance and
                  practical information for growing companies.
                </p>
              </div>

            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold">
              Get Started Today
            </h2>

            <p className="mt-6 max-w-3xl text-gray-300 leading-8">
              Whether you are launching your first business,
              expanding internationally, or looking for
              professional guidance on business formation,
              banking, and payment solutions, our team is
              ready to help you move forward with confidence.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="/#contact"
                className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
              >
                Contact Us
              </a>

              <a
                href="/services/us-llc-registration"
                className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
              >
                US LLC Registration
              </a>

              <a
                href="/services/business-banking"
                className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
              >
                Business Banking
              </a>

            </div>
          </section>

        </section>
      </main>
    </>
  );
}
