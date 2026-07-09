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
{/* EIN Registration Process */}

<div className="mt-24">

  <h2 className="text-4xl font-bold">
    Our EIN Registration Guidance Process
  </h2>

  <p className="mt-8 text-lg leading-8 text-gray-300">
    We follow a structured process to help business owners understand the EIN
    application requirements, prepare documentation, and complete the process
    efficiently.
  </p>

  <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

    {[
      [
        "01",
        "Consultation",
        "Review your business structure and EIN requirements.",
      ],
      [
        "02",
        "Document Preparation",
        "Guide you through the required information and supporting documents.",
      ],
      [
        "03",
        "Application Guidance",
        "Assist you throughout the EIN application process.",
      ],
      [
        "04",
        "Ongoing Support",
        "Continue providing guidance after your EIN is obtained.",
      ],
    ].map(([step, title, description]) => (
      <div
        key={step}
        className="rounded-3xl border border-white/10 bg-white/5 p-8"
      >
        <div className="text-5xl font-extrabold text-blue-500">
          {step}
        </div>

        <h3 className="mt-6 text-2xl font-bold">
          {title}
        </h3>

        <p className="mt-4 leading-7 text-gray-300">
          {description}
        </p>
      </div>
    ))}

  </div>

</div>
{/* Frequently Asked Questions */}

<div className="mt-24">

  <h2 className="text-4xl font-bold">
    Frequently Asked Questions
  </h2>

  <div className="mt-12 space-y-6">

    {[
      {
        q: "Who needs an EIN?",
        a: "Many US businesses use an Employer Identification Number (EIN) for tax administration, banking, and other business-related purposes.",
      },
      {
        q: "Can international entrepreneurs apply for an EIN?",
        a: "Depending on their business structure and circumstances, international entrepreneurs may need an EIN for operating a US business.",
      },
      {
        q: "Why is an EIN important?",
        a: "An EIN is commonly used for tax administration and can be required for various business activities such as banking and payment processing.",
      },
      {
        q: "Do you provide guidance throughout the process?",
        a: "Yes. We provide professional guidance to help clients understand the EIN application process and required documentation.",
      },
    ].map((faq) => (
      <div
        key={faq.q}
        className="rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <h3 className="text-xl font-semibold text-blue-400">
          {faq.q}
        </h3>

        <p className="mt-3 leading-7 text-gray-300">
          {faq.a}
        </p>
      </div>
    ))}

  </div>

</div>
{/* Who Can Benefit */}

<div className="mt-24">

  <h2 className="text-4xl font-bold">
    Who Can Benefit from EIN Registration Guidance?
  </h2>

  <p className="mt-8 text-lg leading-8 text-gray-300">
    Professional EIN registration guidance is valuable for entrepreneurs,
    startups, agencies, software companies, eCommerce businesses, consultants,
    and international founders establishing or operating a US business.
  </p>

  <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

    {[
      "US LLC Owners",
      "International Entrepreneurs",
      "Freelancers",
      "Agency Owners",
      "SaaS Companies",
      "eCommerce Businesses",
    ].map((item) => (
      <div
        key={item}
        className="rounded-3xl border border-white/10 bg-white/5 p-8"
      >
        <h3 className="text-xl font-bold text-blue-400">
          {item}
        </h3>

        <p className="mt-4 leading-7 text-gray-300">
          Guidance to help understand EIN requirements and prepare for business
          operations with confidence.
        </p>

      </div>
    ))}

  </div>

</div>
{/* Frequently Asked Questions */}

<div className="mt-24">

  <h2 className="text-4xl font-bold">
    Frequently Asked Questions
  </h2>

  <div className="mt-12 space-y-6">

    {[
      {
        q: "What is an EIN?",
        a: "An Employer Identification Number (EIN) is a federal tax identification number issued by the IRS for eligible businesses.",
      },
      {
        q: "Who needs an EIN?",
        a: "Many businesses require an EIN for taxation, banking, payroll, and certain business-related registrations.",
      },
      {
        q: "Can international entrepreneurs obtain an EIN?",
        a: "Yes. Eligibility depends on the applicable IRS requirements and business circumstances.",
      },
      {
        q: "Does Vanguard Business Services provide IRS guidance?",
        a: "We provide professional guidance regarding documentation and the application process. We do not issue EINs ourselves.",
      },
    ].map((faq) => (
      <div
        key={faq.q}
        className="rounded-3xl border border-white/10 bg-white/5 p-8"
      >
        <h3 className="text-2xl font-bold text-blue-400">
          {faq.q}
        </h3>

        <p className="mt-3 leading-7 text-gray-300">
          {faq.a}
        </p>
      </div>
    ))}

  </div>

</div>
{/* Related Services */}

<div className="mt-24">

  <h2 className="text-4xl font-bold">
    Related Business Services
  </h2>

  <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
    Explore additional business formation and banking services designed to
    support entrepreneurs at every stage of their business journey.
  </p>

  <div className="mt-12 grid gap-6 md:grid-cols-3">

    <a
      href="/services/us-llc-registration"
      className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-blue-500"
    >
      <h3 className="text-2xl font-bold text-blue-400">
        US LLC Registration
      </h3>

      <p className="mt-4 text-gray-300">
        Register your US LLC with professional guidance.
      </p>
    </a>

    <a
      href="/services/business-banking"
      className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-blue-500"
    >
      <h3 className="text-2xl font-bold text-blue-400">
        Business Banking
      </h3>

      <p className="mt-4 text-gray-300">
        Learn about business banking documentation and guidance.
      </p>
    </a>

    <a
      href="/services/uk-ltd-registration"
      className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-blue-500"
    >
      <h3 className="text-2xl font-bold text-blue-400">
        UK LTD Registration
      </h3>

      <p className="mt-4 text-gray-300">
        Start your UK Limited Company with expert assistance.
      </p>
    </a>

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