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
        email: "vanguardbusinessservices37@gmail.com",
        telephone: "+19177359503",
      },
      {
        "@type": "WebSite",
        "@id": "https://www.vanguardbusinesservices.com/#website",
        url: "https://www.vanguardbusinesservices.com",
        name: "Vanguard Business Services",
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