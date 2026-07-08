// src/lib/schema.ts

const SITE_URL = "https://vanguardbusinesservices.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  "@id": `${SITE_URL}/#organization`,

  name: "Vanguard Business Services",

  url: SITE_URL,

  logo: `${SITE_URL}/logo.png`,

  image: `${SITE_URL}/logo.png`,

  description:
    "Vanguard Business Services helps entrepreneurs worldwide register US LLCs, UK LTDs, business bank accounts, payment gateways, EIN, and international business solutions.",

  email: "vanguardbusinessservices37@gmail.com",

  telephone: "+19177359503",

  sameAs: [
    "https://www.facebook.com/",
    "https://www.linkedin.com/",
    "https://x.com/",
    "https://www.youtube.com/"
  ],

  contactPoint: [
    {
      "@type": "ContactPoint",

      telephone: "+19177359503",

      contactType: "customer service",

      areaServed: "Worldwide",

      availableLanguage: [
        "English",
        "Bengali"
      ]
    }
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",

  "@type": "WebSite",

  "@id": `${SITE_URL}/#website`,

  url: SITE_URL,

  name: "Vanguard Business Services",

  publisher: {
    "@id": `${SITE_URL}/#organization`
  },

  potentialAction: {
    "@type": "SearchAction",

    target: `${SITE_URL}/?q={search_term_string}`,

    "query-input": "required name=search_term_string"
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",

  "@type": "ProfessionalService",

  "@id": `${SITE_URL}/#business`,

  name: "Vanguard Business Services",

  url: SITE_URL,

  image: `${SITE_URL}/logo.png`,

  email: "vanguardbusinessservices37@gmail.com",

  telephone: "+19177359503",

  areaServed: "Worldwide",

  priceRange: "$$",

  openingHours: "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59"
};

export const serviceSchema = {
  "@context": "https://schema.org",

  "@type": "Service",

  serviceType: "Business Registration",

  provider: {
    "@id": `${SITE_URL}/#organization`
  },

  areaServed: "Worldwide",

  hasOfferCatalog: {
    "@type": "OfferCatalog",

    name: "Business Services",

    itemListElement: [
      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "US LLC Registration"
        }
      },

      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "UK LTD Registration"
        }
      },

      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "Business Banking"
        }
      },

      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "Stripe Setup"
        }
      },

      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "PayPal Business"
        }
      }
    ]
  }
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",

  "@type": "BreadcrumbList",

  itemListElement: [
    {
      "@type": "ListItem",

      position: 1,

      name: "Home",

      item: SITE_URL
    }
  ]
};