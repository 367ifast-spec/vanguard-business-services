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
        url: "https://www.vanguardbusinesservices.com/services/us-llc-registration",
        description:
          "Professional US LLC registration and business formation guidance for entrepreneurs worldwide.",
      },
      {
        "@type": "WebPage",
        "@id":
          "https://www.vanguardbusinesservices.com/services/us-llc-registration#webpage",
        url: "https://www.vanguardbusinesservices.com/services/us-llc-registration",
        name: "US LLC Registration | Vanguard Business Services",
        description:
          "Start your US LLC with professional guidance from Vanguard Business Services.",
        breadcrumb: {
          "@id":
            "https://www.vanguardbusinesservices.com/services/us-llc-registration#breadcrumb",
        },
        primaryImageOfPage: {
          "@id": "https://www.vanguardbusinesservices.com/logo.png",
        },
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
            US LLC Registration
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Start Your US LLC
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Vanguard Business Services provides professional guidance for
            entrepreneurs looking to establish a US LLC with confidence.
          </p>

          <a
            href="/#contact"
            className="mt-10 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700"
          >
            Contact Us
          </a>
        </section>
      </main>
    </>
  );
}