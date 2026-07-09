export default function StructuredData() {
  const baseUrl = "https://www.vanguardbusinesservices.com";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Vanguard Business Services",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        image: `${baseUrl}/logo.png`,
        email: "vanguardbusinessservices37@gmail.com",
        telephone: "+19177359503",
        sameAs: [
          "https://www.facebook.com/",
          "https://www.linkedin.com/",
          "https://x.com/",
          "https://t.me/vanguardbusinessservices",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#professionalservice`,
        name: "Vanguard Business Services",
        url: baseUrl,
        image: `${baseUrl}/logo.png`,
        telephone: "+19177359503",
        email: "vanguardbusinessservices37@gmail.com",
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
        serviceType: [
          "US LLC Registration",
          "UK LTD Registration",
          "Business Registration",
          "Business Banking",
          "Payment Gateway Setup",
          "Stripe Setup",
          "PayPal Business",
          "Wise Business",
          "Payoneer",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#localbusiness`,
        name: "Vanguard Business Services",
        url: baseUrl,
        image: `${baseUrl}/logo.png`,
        telephone: "+19177359503",
        email: "vanguardbusinessservices37@gmail.com",
        priceRange: "$$",
        areaServed: "Worldwide",
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Vanguard Business Services",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        url: baseUrl,
        name: "Vanguard Business Services",
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        about: {
          "@id": `${baseUrl}/#organization`,
        },
        primaryImageOfPage: {
          "@id": `${baseUrl}/logo.png`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}