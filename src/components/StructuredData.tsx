// src/components/StructuredData.tsx

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.vanguardbusinesservices.com/#organization",
        name: "Vanguard Business Services",
        url: "https://www.vanguardbusinesservices.com",
        logo: "https://www.vanguardbusinesservices.com/logo.png",
        image: "https://www.vanguardbusinesservices.com/og-image.jpg",
        email: "vanguardbusinessservices37@gmail.com",
        telephone: "+19177359503",
        sameAs: [
          "https://t.me/vanguardbusinessservices"
        ]
      },

      {
        "@type": "WebSite",
        "@id": "https://www.vanguardbusinesservices.com/#website",
        url: "https://www.vanguardbusinesservices.com",
        name: "Vanguard Business Services",
        publisher: {
          "@id": "https://www.vanguardbusinesservices.com/#organization"
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.vanguardbusinesservices.com/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },

      {
        "@type": "ProfessionalService",
        "@id": "https://www.vanguardbusinesservices.com/#service",
        name: "Vanguard Business Services",
        url: "https://www.vanguardbusinesservices.com",
        areaServed: "Worldwide",
        priceRange: "$$",
        serviceType: [
          "US LLC Registration",
          "UK LTD Registration",
          "Business Bank Account Setup",
          "Stripe Setup",
          "PayPal Business Setup",
          "Wise Business",
          "Payoneer",
          "Business Verification"
        ]
      }
    ]
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
