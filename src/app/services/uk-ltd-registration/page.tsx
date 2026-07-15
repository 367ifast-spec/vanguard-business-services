import type { Metadata } from "next";
import AddToCartButton from "@/components/AddToCartButton";
export const metadata: Metadata = {
  title: "UK LTD Registration",
  description:
    "Register your UK Limited Company with professional guidance from Vanguard Business Services. Fast, reliable, and tailored support for entrepreneurs worldwide.",
  keywords: [
    "UK LTD Registration",
    "UK Company Formation",
    "Limited Company Registration",
    "UK Business Registration",
    "Start UK Business",
    "Vanguard Business Services",
  ],
  alternates: {
    canonical:
      "https://www.vanguardbusinessservices.com/services/uk-ltd-registration",
  },
  openGraph: {
    title: "UK LTD Registration | Vanguard Business Services",
    description:
      "Professional UK LTD company registration and business formation services for entrepreneurs worldwide.",
    url: "https://www.vanguardbusinessservices.com/services/uk-ltd-registration",
    siteName: "Vanguard Business Services",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "UK LTD Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UK LTD Registration | Vanguard Business Services",
    description:
      "Professional UK LTD company registration and business formation services.",
    images: ["/opengraph-image.png"],
  },
};

export default function UKLTDRegistrationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.vanguardbusinessservices.com/services/uk-ltd-registration#breadcrumb",
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
            name: "UK LTD Registration",
            item: "https://www.vanguardbusinessservices.com/services/uk-ltd-registration",
          },
        ],
      },
      {
        "@type": "Service",
        "@id":
          "https://www.vanguardbusinessservices.com/services/uk-ltd-registration#service",
        name: "UK LTD Registration",
        serviceType: "UK LTD Registration",
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
          "Professional UK LTD registration service with expert guidance for entrepreneurs and international businesses.",
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
            UK LTD Registration
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Register Your UK Limited Company
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Start your UK Limited Company with confidence. Vanguard Business
            Services provides professional guidance throughout the registration
            process, helping entrepreneurs establish a compliant UK business
            quickly and efficiently.
          </p>

          <div className="mt-10 space-y-5 text-gray-300 leading-8">
            <p>
              Our team assists clients worldwide with UK company formation,
              required documentation, compliance guidance, and ongoing business
              support.
            </p>

            <p>
              Whether you are a freelancer, agency owner, SaaS founder,
              eCommerce seller, or international entrepreneur, we help simplify
              the registration process while ensuring accuracy and efficiency.
            </p>

            <p>
              We focus on providing reliable support, transparent communication,
              and professional service from the beginning of your business
              journey.
            </p>
          </div>

          <a
            href="/#contact"
            className="mt-10 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
          >
            Contact Us
            </a>
            <div className="mt-6">
 <AddToCartButton serviceId="69d7293a-f266-4b43-a421-ab4f29f69019" />
</div>
            {/* Statistics */}
<div className="mt-16 grid gap-6 md:grid-cols-3">

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
    <h2 className="text-4xl font-bold text-blue-400">
      500+
    </h2>

    <p className="mt-2 text-gray-300">
      Businesses Supported
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
    <h2 className="text-4xl font-bold text-blue-400">
      10+
    </h2>

    <p className="mt-2 text-gray-300">
      Countries Served
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
    <h2 className="text-4xl font-bold text-blue-400">
      24/7
    </h2>

    <p className="mt-2 text-gray-300">
      Professional Support
    </p>
  </div>

</div>
{/* Why Register a UK LTD? */}

<div className="mt-24">

  <h2 className="text-4xl font-bold">
    Why Register a UK Limited Company?

  </h2>

  <p className="mt-8 text-lg leading-8 text-gray-300">
    A UK Limited Company offers a professional business structure that is
    widely recognized internationally. It can help entrepreneurs establish a
    credible presence, separate personal and business responsibilities, and
    support long-term business growth.
  </p>

  <p className="mt-6 text-lg leading-8 text-gray-300">
    Whether you operate an online business, digital agency, SaaS company,
    consulting firm, or eCommerce brand, registering a UK Limited Company can
    provide a strong foundation for your business activities.
  </p>

  <div className="mt-14 grid gap-8 md:grid-cols-2">

    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h3 className="text-2xl font-bold text-blue-400">
        Key Benefits
      </h3>

      <ul className="mt-8 space-y-4 text-gray-300">
        <li>✔ Professional Business Image</li>
        <li>✔ Limited Liability Structure</li>
        <li>✔ International Recognition</li>
        <li>✔ Business Growth Opportunities</li>
        <li>✔ Flexible Company Management</li>
        <li>✔ Long-Term Business Support</li>
      </ul>

    </div>

    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <h3 className="text-2xl font-bold text-blue-400">
        Ideal For
      </h3>

      <ul className="mt-8 space-y-4 text-gray-300">
        <li>✔ Freelancers</li>
        <li>✔ Agency Owners</li>
        <li>✔ eCommerce Businesses</li>
        <li>✔ SaaS Companies</li>
        <li>✔ Consultants</li>
        <li>✔ International Entrepreneurs</li>
      </ul>

    </div>

  </div>

</div>
{/* Registration Process */}

<div className="mt-24">

  <h2 className="text-4xl font-bold">
    Our UK LTD Registration Process
  </h2>

  <p className="mt-8 text-lg leading-8 text-gray-300">
    We follow a structured registration process to help entrepreneurs establish
    their UK Limited Company with confidence and professional guidance.
  </p>

  <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

    {[
      [
        "01",
        "Consultation",
        "Understand your business goals and recommend the appropriate company structure.",
      ],
      [
        "02",
        "Documentation",
        "Assist with the required information and registration documents.",
      ],
      [
        "03",
        "Company Registration",
        "Complete the UK LTD registration process professionally.",
      ],
      [
        "04",
        "Ongoing Support",
        "Continue providing guidance after your company has been registered.",
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
      </main>
    </>
  );
}