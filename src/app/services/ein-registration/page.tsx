import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EIN Registration",
  description:
    "Professional EIN Registration guidance from Vanguard Business Services. Obtain your Employer Identification Number with expert support.",
  keywords: [
    "EIN Registration",
    "Employer Identification Number",
    "IRS EIN",
    "US Business Tax ID",
    "Business Registration",
    "Vanguard Business Services",
  ],
  alternates: {
    canonical:
      "https://www.vanguardbusinessservices.com/services/ein-registration",
  },
  openGraph: {
    title: "EIN Registration | Vanguard Business Services",
    description:
      "Professional EIN Registration support for entrepreneurs and businesses.",
    url: "https://www.vanguardbusinessservices.com/services/ein-registration",
    siteName: "Vanguard Business Services",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "EIN Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EIN Registration | Vanguard Business Services",
    description:
      "Professional EIN Registration guidance for entrepreneurs worldwide.",
    images: ["/opengraph-image.png"],
  },
};

export default function EINRegistrationPage() {
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
            name: "EIN Registration",
            item: "https://www.vanguardbusinessservices.com/services/ein-registration",
          },
        ],
      },
      {
        "@type": "Service",
        name: "EIN Registration",
        serviceType: "Employer Identification Number (EIN)",
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
          "Professional guidance for obtaining an Employer Identification Number (EIN) for your US business.",
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
            EIN Registration
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Employer Identification Number (EIN)
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            An Employer Identification Number (EIN) is essential for many US
            businesses. Vanguard Business Services provides professional
            guidance to help you understand the application process and required
            documentation.
          </p>

          <div className="mt-12 space-y-6 text-gray-300 leading-8">
            <h2 className="text-3xl font-bold text-white">
              Benefits of an EIN
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>Business tax identification</li>
              <li>Business banking eligibility</li>
              <li>Payment processor applications</li>
              <li>Improved business credibility</li>
              <li>Business compliance support</li>
            </ul>

            <h2 className="pt-8 text-3xl font-bold text-white">
              Professional Guidance
            </h2>

            <p>
              Our experienced team helps entrepreneurs understand documentation,
              compliance requirements, and the overall EIN registration process
              from start to finish.
            </p>
          </div>
{/* Why Your Business Needs an EIN */}

<div className="mt-20">

  <h2 className="text-4xl font-bold">
    Why Your Business Needs an EIN
  </h2>

  <p className="mt-8 text-lg leading-8 text-gray-300">
    An Employer Identification Number (EIN) is an important part of operating
    many US businesses. It is commonly used for tax administration, opening
    eligible business banking services, working with payment providers, and
    maintaining a professional business identity.
  </p>

  <div className="mt-14 grid gap-8 md:grid-cols-2">

    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h3 className="text-2xl font-bold text-blue-400">
        Key Benefits
      </h3>

      <ul className="mt-8 space-y-4 text-gray-300">
        <li>✔ Business Tax Identification</li>
        <li>✔ Banking Eligibility Support</li>
        <li>✔ Payment Processor Applications</li>
        <li>✔ Professional Business Identity</li>
        <li>✔ Compliance Preparation</li>
        <li>✔ Long-Term Business Growth</li>
      </ul>

    </div>

    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h3 className="text-2xl font-bold text-blue-400">
        Suitable For
      </h3>

      <ul className="mt-8 space-y-4 text-gray-300">
        <li>✔ US LLC Owners</li>
        <li>✔ UK LTD Owners Operating in the US</li>
        <li>✔ Freelancers</li>
        <li>✔ Agency Owners</li>
        <li>✔ SaaS Businesses</li>
        <li>✔ International Entrepreneurs</li>
      </ul>

    </div>

  </div>

</div>
          <div className="mt-12 flex flex-wrap gap-4">

            <a
              href="/#contact"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700 transition"
            >
              Contact Us
            </a>

            <a
              href="/services/us-llc-registration"
              className="rounded-xl border border-blue-500 px-8 py-4 text-blue-400 hover:bg-blue-500 hover:text-white transition"
            >
              US LLC Registration
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