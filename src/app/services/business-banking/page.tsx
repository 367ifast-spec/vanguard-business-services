import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Banking",
  description:
    "Business Banking assistance by Vanguard Business Services. Professional guidance for entrepreneurs looking to establish business banking solutions worldwide.",
  keywords: [
    "Business Banking",
    "Business Bank Account",
    "International Business Banking",
    "Business Banking Support",
    "Business Banking Solutions",
    "Vanguard Business Services",
  ],
  alternates: {
    canonical:
      "https://www.vanguardbusinessservices.com/services/business-banking",
  },
  openGraph: {
    title: "Business Banking | Vanguard Business Services",
    description:
      "Professional Business Banking guidance for startups, entrepreneurs, agencies, SaaS founders, and international businesses.",
    url: "https://www.vanguardbusinessservices.com/services/business-banking",
    siteName: "Vanguard Business Services",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Business Banking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Banking | Vanguard Business Services",
    description:
      "Professional Business Banking guidance for entrepreneurs worldwide.",
    images: ["/opengraph-image.png"],
  },
};

export default function BusinessBankingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.vanguardbusinessservices.com/services/business-banking#breadcrumb",
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
            name: "Business Banking",
            item: "https://www.vanguardbusinessservices.com/services/business-banking",
          },
        ],
      },
      {
        "@type": "Service",
        "@id":
          "https://www.vanguardbusinessservices.com/services/business-banking#service",
        name: "Business Banking",
        serviceType: "Business Banking",
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
          "Professional guidance for business banking solutions, documentation, and onboarding support.",
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
            Business Banking
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Business Banking Solutions
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Vanguard Business Services helps entrepreneurs understand business
            banking requirements and prepare the documentation needed for
            eligible business banking solutions. Our goal is to simplify the
            process so you can focus on growing your business.
          </p>

          <div className="mt-12 space-y-6 text-gray-300 leading-8">
            <h2 className="text-3xl font-bold text-white">
              What We Help With
            </h2>

            <ul className="list-disc space-y-3 pl-6">
              <li>Business banking guidance</li>
              <li>Required document preparation</li>
              <li>Company verification support</li>
              <li>International entrepreneur assistance</li>
              <li>Compliance guidance</li>
              <li>Ongoing business support</li>
            </ul>

            <h2 className="pt-8 text-3xl font-bold text-white">
              Why Choose Vanguard Business Services
            </h2>

            <p>
              We work with entrepreneurs, agencies, freelancers, SaaS founders,
              eCommerce sellers, and international business owners. Our team is
              committed to providing professional guidance, transparent
              communication, and dependable support throughout your business
              journey.
            </p>

            <h2 className="pt-8 text-3xl font-bold text-white">
              Get Started Today
            </h2>

            <p>
              Contact our team to discuss your business goals. We'll recommend
              the most suitable solution based on your business structure,
              jurisdiction, and documentation requirements.
            </p>
          </div>
{/* Frequently Asked Questions */}


<div className="mt-24">

  <h2 className="text-4xl font-bold">
    Frequently Asked Questions
  </h2>
{/* Who Can Benefit */}

<div className="mt-24">

  <h2 className="text-4xl font-bold">
    Who Can Benefit from Business Banking Guidance?
  </h2>

  <p className="mt-8 text-lg leading-8 text-gray-300">
    Professional business banking guidance can benefit startups, freelancers,
    agencies, software companies, SaaS businesses, eCommerce brands,
    consultants, and international entrepreneurs looking to build a strong
    financial foundation for their business.
  </p>

  <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

    {[
      "Freelancers",
      "Agency Owners",
      "SaaS Companies",
      "Software Businesses",
      "eCommerce Brands",
      "International Entrepreneurs",
    ].map((item) => (
      <div
        key={item}
        className="rounded-3xl border border-white/10 bg-white/5 p-8"
      >
        <h3 className="text-xl font-bold text-blue-400">
          {item}
        </h3>

        <p className="mt-4 leading-7 text-gray-300">
          Business banking guidance tailored to support sustainable business
          growth and professional financial management.
        </p>

      </div>
    ))}

  </div>

</div>
  <div className="mt-12 space-y-6">

    {[
      {
        q: "Who can benefit from business banking guidance?",
        a: "Our guidance is suitable for freelancers, startups, agencies, SaaS businesses, eCommerce companies, consultants, and international entrepreneurs.",
      },
      {
        q: "Do you help with required documentation?",
        a: "Yes. We provide guidance on preparing the information and documentation commonly required during the onboarding process.",
      },
      {
        q: "Do you provide ongoing support?",
        a: "Yes. We continue assisting clients with business-related guidance after the initial setup process.",
      },
      {
        q: "Can international entrepreneurs use your services?",
        a: "Yes. We support entrepreneurs from many countries based on their business goals and applicable requirements.",
      },
    ].map((faq) => (
      <div
        key={faq.q}
        className="rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <h3 className="text-xl font-semibold text-blue-400">
          {faq.q}
        </h3>

        <p className="mt-3 text-gray-300 leading-7">
          {faq.a}
        </p>
      </div>
    ))}

  </div>

</div>
          <div className="mt-12 flex flex-wrap gap-4">
            {/* Business Banking Benefits */}

<div className="mt-20">

  <h2 className="text-4xl font-bold">
    Why Business Banking Matters
  </h2>

  <p className="mt-8 text-lg leading-8 text-gray-300">
    A dedicated business banking solution helps separate business and personal finances,
    improve financial organization, and support long-term business growth.
  </p>

  <div className="mt-14 grid gap-8 md:grid-cols-2">

    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h3 className="text-2xl font-bold text-blue-400">
        Key Benefits
      </h3>

      <ul className="mt-8 space-y-4 text-gray-300">
        <li>✔ Better Financial Management</li>
        <li>✔ Professional Business Image</li>
        <li>✔ Easier Accounting</li>
        <li>✔ Payment Processing Support</li>
        <li>✔ Business Growth Opportunities</li>
        <li>✔ International Business Readiness</li>
      </ul>

    </div>

    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h3 className="text-2xl font-bold text-blue-400">
        Ideal For
      </h3>

      <ul className="mt-8 space-y-4 text-gray-300">
        <li>✔ Freelancers</li>
        <li>✔ Agency Owners</li>
        <li>✔ SaaS Businesses</li>
        <li>✔ eCommerce Businesses</li>
        <li>✔ Consultants</li>
        <li>✔ International Entrepreneurs</li>
      </ul>

    </div>

  </div>

</div>
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
              href="/services/uk-ltd-registration"
              className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
            >
              UK LTD Registration
            </a>
          </div>
        </section>
      </main>
    </>
  );
}