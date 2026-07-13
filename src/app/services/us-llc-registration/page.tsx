import type { Metadata } from "next";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
export const metadata: Metadata = {
  title: "US LLC Registration | Vanguard Business Services",
  description:
    "Professional US LLC Registration services for entrepreneurs worldwide. Start your US company with expert guidance from Vanguard Business Services.",
  keywords: [
    "US LLC Registration",
    "Register US LLC",
    "LLC Formation",
    "US Company Registration",
    "Non Resident LLC",
    "Business Formation",
    "Wyoming LLC",
    "Delaware LLC",
    "Business Banking",
    "EIN Registration",
    "Vanguard Business Services",
  ],
  alternates: {
    canonical:
      "https://www.vanguardbusinesservices.com/services/us-llc-registration",
  },
  openGraph: {
    title: "US LLC Registration | Vanguard Business Services",
    description:
      "Professional US LLC Registration services for entrepreneurs worldwide.",
    url: "https://www.vanguardbusinesservices.com/services/us-llc-registration",
    siteName: "Vanguard Business Services",
    type: "website",
    images: [
      {
        url: "https://www.vanguardbusinesservices.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "US LLC Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "US LLC Registration | Vanguard Business Services",
    description:
      "Professional US LLC Registration services for entrepreneurs worldwide.",
    images: [
      "https://www.vanguardbusinesservices.com/opengraph-image.png",
    ],
  },
};

export default function UsLLCRegistrationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.vanguardbusinesservices.com/services/us-llc-registration#breadcrumb",
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
            name: "US LLC Registration",
            item: "https://www.vanguardbusinesservices.com/services/us-llc-registration",
          },
        ],
      },
      {
        "@type": "Service",
        "@id":
          "https://www.vanguardbusinesservices.com/services/us-llc-registration#service",
        name: "US LLC Registration",
        serviceType: "US LLC Registration",
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
          "Professional US LLC Registration and business formation services for entrepreneurs worldwide.",
        url: "https://www.vanguardbusinesservices.com/services/us-llc-registration",
      },
      {
        "@type": "WebPage",
        url: "https://www.vanguardbusinesservices.com/services/us-llc-registration",
        name: "US LLC Registration",
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
        <section className="mx-auto max-w-7xl px-6 py-28">
          <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
            Professional Business Formation
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-6xl">
            US LLC Registration
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            Launch your US company with confidence. Vanguard Business Services
            provides professional US LLC Registration, business formation
            guidance, document preparation, and ongoing support for
            entrepreneurs worldwide.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
            
              href="/#contact"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700"
            >
              Start Your LLC
            </Link>
<AddToCartButton
  serviceId="40254304-74a0-4bba-9b3a-ad324aa9b93d"
  className="rounded-xl bg-green-600 px-8 py-4 font-semibold hover:bg-green-700"
/>
            <Link
              href="/#services"
              className="rounded-xl border border-white/20 px-8 py-4 font-semibold hover:bg-white hover:text-black"
            >
              View Services
            </Link>
          </div>
                    <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="text-3xl font-bold text-blue-400">
                500+
              </h2>

              <p className="mt-2 text-gray-300">
                Businesses Registered
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="text-3xl font-bold text-blue-400">
                10+
              </h2>

              <p className="mt-2 text-gray-300">
                Countries Served
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="text-3xl font-bold text-blue-400">
                24/7
              </h2>

              <p className="mt-2 text-gray-300">
                Professional Support
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#081126]">
          <div className="mx-auto max-w-7xl px-6 py-24">

            <h2 className="text-4xl font-bold">
              Why Choose Our US LLC Registration Service?
            </h2>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-300">
              Registering a US LLC provides entrepreneurs with credibility,
              liability protection, international business opportunities, and
              access to modern financial services. Our experienced team guides
              you throughout the registration process while ensuring accuracy,
              transparency, and professional support.
            </p>

            <div className="mt-14 grid gap-8 lg:grid-cols-2">

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-2xl font-bold text-blue-400">
                  What's Included
                </h3>

                <ul className="mt-8 space-y-4 text-gray-300">

                  <li>✔ Professional US LLC Registration</li>

                  <li>✔ Company Formation Guidance</li>

                  <li>✔ Articles Preparation Support</li>

                  <li>✔ Business Documentation Assistance</li>

                  <li>✔ EIN Registration Guidance</li>

                  <li>✔ Business Banking Consultation</li>

                  <li>✔ Payment Solution Consultation</li>

                  <li>✔ Ongoing Professional Support</li>

                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

                <h3 className="text-2xl font-bold text-blue-400">
                  Benefits
                </h3>

                <ul className="mt-8 space-y-4 text-gray-300">

                  <li>✔ Limited Liability Protection</li>

                  <li>✔ Professional Business Image</li>

                  <li>✔ International Business Opportunities</li>

                  <li>✔ Flexible Business Structure</li>

                  <li>✔ Global Payment Solutions</li>

                  <li>✔ Business Banking Opportunities</li>

                  <li>✔ Long-Term Business Growth</li>

                  <li>✔ Worldwide Entrepreneur Support</li>

                </ul>

              </div>

            </div>

          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">

          <h2 className="text-4xl font-bold">
            Our Registration Process
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {[
              ["01", "Consultation"],
              ["02", "Document Preparation"],
              ["03", "Business Registration"],
              ["04", "Business Growth"],
            ].map(([step, title]) => (
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
                  Professional guidance throughout every stage of your US LLC
                  registration journey.
                </p>

              </div>
            ))}

          </div>
        </section>
                <section className="border-y border-white/10 bg-[#081126]">
          <div className="mx-auto max-w-7xl px-6 py-24">

            <h2 className="text-4xl font-bold">
              {/* Why Choose Vanguard Business Services */}
<section className="mx-auto max-w-7xl px-6 py-24">
  <h2 className="text-4xl font-bold">
    Why Choose Vanguard Business Services?
  </h2>

  <p className="mt-8 max-w-4xl text-lg leading-8 text-gray-300">
    Vanguard Business Services provides professional business registration
    guidance, transparent communication, and long-term support for entrepreneurs
    looking to establish and grow their businesses internationally.
  </p>

  <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

    {[
      [
        "Professional Guidance",
        "Experienced assistance throughout the business registration process.",
      ],
      [
        "Reliable Support",
        "Responsive communication and ongoing client support.",
      ],
      [
        "Global Entrepreneurs",
        "Helping clients from multiple countries establish their businesses.",
      ],
      [
        "Long-Term Growth",
        "Supporting businesses beyond registration with practical guidance.",
      ],
    ].map(([title, description]) => (
      <div
        key={title}
        className="rounded-3xl border border-white/10 bg-white/5 p-8"
      >
        <h3 className="text-xl font-bold text-blue-400">
          {title}
        </h3>

        <p className="mt-4 leading-7 text-gray-300">
          {description}
        </p>
      </div>
    ))}

  </div>
</section>
              Frequently Asked Questions
            </h2>

            <div className="mt-12 space-y-6">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold">
                  Who can register a US LLC?
                </h3>

                <p className="mt-3 leading-7 text-gray-300">
                  Entrepreneurs from many countries can establish a US LLC,
                  depending on applicable laws and documentation requirements.
                  Our team provides professional guidance throughout the
                  registration process.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold">
                  Do you provide business banking guidance?
                </h3>

                <p className="mt-3 leading-7 text-gray-300">
                  Yes. We provide professional guidance regarding business
                  banking options and payment solution setup based on your
                  business needs.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold">
                  How long does the registration process take?
                </h3>

                <p className="mt-3 leading-7 text-gray-300">
                  Processing time depends on the selected jurisdiction and the
                  completeness of the required documentation.
                </p>
              </div>

            </div>

          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">

          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-center">

            <h2 className="text-4xl font-bold">
              Ready to Start Your US LLC?
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
              Vanguard Business Services provides professional guidance to help
              entrepreneurs establish their US LLC with confidence. From company
              formation to business banking consultation, our team is committed
              to supporting your long-term business success.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Link
                href="/#contact"
                className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:scale-105"
              >
                Contact Us
              </Link>

              <Link
                href="/services/business-banking"
                className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-blue-700"
              >
                Business Banking
              </Link>

            </div>

          </div>
{/* Why Register a US LLC */}
<section className="border-y border-white/10 bg-[#081126]">
  <div className="mx-auto max-w-7xl px-6 py-24">

    <h2 className="text-4xl font-bold">
      Why Register a US LLC?
      {/* Who Should Register a US LLC */}
<section className="mx-auto max-w-7xl px-6 py-24">

  <h2 className="text-4xl font-bold">
    Who Should Register a US LLC?
    {/* Registration Process */}
<section className="border-y border-white/10 bg-[#081126]">
  <div className="mx-auto max-w-7xl px-6 py-24">

    <h2 className="text-4xl font-bold">
      Our US LLC Registration Process
    </h2>

    <p className="mt-8 max-w-4xl text-lg leading-8 text-gray-300">
      We follow a structured process designed to help entrepreneurs complete
      their business registration efficiently while providing professional
      guidance at every stage.
    </p>

    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

      {[
        [
          "01",
          "Business Consultation",
          "We discuss your business goals and recommend the most suitable registration approach.",
        ],
        [
          "02",
          "Document Preparation",
          "We guide you through the required information and documentation.",
        ],
        [
          "03",
          "Registration",
          "Your business registration process is completed with professional support.",
        ],
        [
          "04",
          "Ongoing Assistance",
          "We continue supporting your business with practical guidance after registration.",
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
</section>
  </h2>

  <p className="mt-8 text-lg leading-8 text-gray-300">
    A US LLC is suitable for many types of businesses, including freelancers,
    digital agencies, software companies, consultants, online stores,
    eCommerce brands, SaaS businesses, and international entrepreneurs seeking
    a professional business structure.
  </p>

  <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

    {[
      "Freelancers",
      "Agency Owners",
      "Software Companies",
      "SaaS Businesses",
      "Consultants",
      "eCommerce Businesses",
    ].map((item) => (
      <div
        key={item}
        className="rounded-3xl border border-white/10 bg-white/5 p-8"
      >
        <h3 className="text-xl font-bold text-blue-400">
          {item}
        </h3>

        <p className="mt-4 text-gray-300">
          Professional business registration guidance designed to support
          sustainable business growth.
        </p>
      </div>
    ))}

  </div>

</section>
    </h2>

    <p className="mt-8 text-lg leading-8 text-gray-300">
      A United States Limited Liability Company (LLC) is one of the most
      popular business structures for entrepreneurs because it combines
      flexibility with liability protection. Whether you operate an online
      business, software company, digital agency, eCommerce store or consulting
      business, an LLC can provide a professional business identity and support
      future growth.
    </p>

    <p className="mt-6 text-lg leading-8 text-gray-300">
      Vanguard Business Services provides professional guidance throughout the
      registration process, helping entrepreneurs prepare documentation,
      understand requirements and confidently establish their business.
    </p>

    <div className="mt-14 grid gap-8 md:grid-cols-2">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

        <h3 className="text-2xl font-bold text-blue-400">
          Key Advantages
        </h3>

        <ul className="mt-8 space-y-4 text-gray-300">

          <li>✔ Limited Liability Protection</li>

          <li>✔ Professional Business Image</li>

          <li>✔ Flexible Business Management</li>

          <li>✔ International Business Opportunities</li>

          <li>✔ Business Banking Opportunities</li>

          <li>✔ Payment Solution Compatibility</li>

          <li>✔ Long-Term Business Growth</li>

        </ul>

      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

        <h3 className="text-2xl font-bold text-blue-400">
          Perfect For
        </h3>

        <ul className="mt-8 space-y-4 text-gray-300">

          <li>✔ Freelancers</li>

          <li>✔ Agency Owners</li>

          <li>✔ SaaS Companies</li>

          <li>✔ eCommerce Businesses</li>

          <li>✔ Digital Entrepreneurs</li>

          <li>✔ Consultants</li>

          <li>✔ International Founders</li>

        </ul>

      </div>

    </div>

  </div>
</section>
        </section>
        {/* Required Documents */}
<section className="mx-auto max-w-7xl px-6 py-24">

  <h2 className="text-4xl font-bold">
    Documents & Information You May Need
  </h2>

  <p className="mt-8 max-w-4xl text-lg leading-8 text-gray-300">
    The exact requirements depend on your business type and applicable
    regulations. Preparing complete and accurate information helps make the
    registration process smoother.
  </p>

  <div className="mt-14 grid gap-8 md:grid-cols-2">

    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h3 className="text-2xl font-bold text-blue-400">
        Common Information
      </h3>

      <ul className="mt-8 space-y-4 text-gray-300">
        <li>✔ Proposed Business Name</li>
        <li>✔ Business Activities</li>
        <li>✔ Owner Information</li>
        <li>✔ Contact Details</li>
        <li>✔ Business Address (if applicable)</li>
      </ul>

    </div>

    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h3 className="text-2xl font-bold text-blue-400">
        Our Support Includes
      </h3>

      <ul className="mt-8 space-y-4 text-gray-300">
        <li>✔ Registration Guidance</li>
        <li>✔ Documentation Assistance</li>
        <li>✔ Business Banking Consultation</li>
        <li>✔ Payment Solution Guidance</li>
        <li>✔ Ongoing Professional Support</li>
      </ul>

    </div>

  </div>

</section>
      </main>
    </>
  );
}