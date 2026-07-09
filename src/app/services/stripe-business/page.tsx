import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stripe Business Setup",
  description:
    "Professional Stripe Business setup guidance from Vanguard Business Services. Learn about eligibility, documentation, and onboarding for your business.",
  keywords: [
    "Stripe Business",
    "Stripe Setup",
    "Stripe Account",
    "Payment Gateway",
    "Online Payments",
    "Business Payments",
    "Vanguard Business Services",
  ],
  alternates: {
    canonical:
      "https://www.vanguardbusinessservices.com/services/stripe-business",
  },
  openGraph: {
    title: "Stripe Business Setup | Vanguard Business Services",
    description:
      "Professional guidance for Stripe Business setup and payment solutions.",
    url: "https://www.vanguardbusinessservices.com/services/stripe-business",
    siteName: "Vanguard Business Services",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Stripe Business Setup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stripe Business Setup | Vanguard Business Services",
    description:
      "Professional guidance for Stripe Business setup and payment solutions.",
    images: ["/opengraph-image.png"],
  },
};

export default function StripeBusinessPage() {
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
            name: "Stripe Business Setup",
            item: "https://www.vanguardbusinessservices.com/services/stripe-business",
          },
        ],
      },
      {
        "@type": "Service",
        name: "Stripe Business Setup",
        serviceType: "Payment Gateway Setup",
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
          "Professional guidance for Stripe Business setup, payment gateway onboarding, and documentation.",
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
            Stripe Business
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Stripe Business Setup
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Vanguard Business Services provides professional guidance for
            businesses looking to understand Stripe onboarding, payment gateway
            requirements, and documentation for online payment acceptance.
          </p>

          <div className="mt-12 space-y-6 text-gray-300 leading-8">
            <h2 className="text-3xl font-bold text-white">
              Our Guidance Includes
            </h2>

            <ul className="list-disc space-y-3 pl-6">
              <li>Payment gateway onboarding guidance</li>
              <li>Business documentation preparation</li>
              <li>Compliance information</li>
              <li>Business verification guidance</li>
              <li>International business support</li>
              <li>General payment solution consultation</li>
            </ul>

            <h2 className="pt-8 text-3xl font-bold text-white">
              Who We Help
            </h2>

            <p>
              We assist freelancers, agencies, SaaS founders, eCommerce
              businesses, startups, and entrepreneurs seeking professional
              guidance on business payment solutions.
            </p>

            <h2 className="pt-8 text-3xl font-bold text-white">
              Start Today
            </h2>

            <p>
              Contact our team to discuss your business goals and receive
              guidance on the documentation and preparation required for your
              payment solution.
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
              href="/services/business-banking"
              className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
            >
              Business Banking
            </a>

            <a
              href="/services/ein-registration"
              className="rounded-xl border border-blue-500 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-500 hover:text-white"
            >
              EIN Registration
            </a>
          </div>
        </section>
      </main>
    </>
  );
}