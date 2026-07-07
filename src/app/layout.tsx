import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vanguardbusinesservices.com"),

  title: {
    default: "Vanguard Business Services",
    template: "%s | Vanguard Business Services",
  },

  description:
    "Professional US LLC Registration, UK LTD Registration, Business Banking, Payment Solutions, EIN Registration, and Business Consulting for entrepreneurs worldwide.",

  keywords: [
    "US LLC Registration",
    "UK LTD Registration",
    "Business Registration",
    "Business Banking",
    "Business Consulting",
    "Business Bank Account",
    "Payment Gateway",
    "Stripe",
    "Wise Business",
    "Payoneer",
    "EIN Registration",
    "Vanguard Business Services",
  ],

  authors: [
    {
      name: "Vanguard Business Services",
    },
  ],

  creator: "Vanguard Business Services",

  publisher: "Vanguard Business Services",

  applicationName: "Vanguard Business Services",

  category: "Business Services",

  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: "https://vanguardbusinesservices.com",
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "GOOGLE_VERIFICATION_CODE",google-site-verification: googlebc869ab4eafc492c.html
  },

  openGraph: {
    title: "Vanguard Business Services",
    description:
      "Professional Business Registration & Business Banking Solutions Worldwide.",
    url: "https://vanguardbusinesservices.com",
    siteName: "Vanguard Business Services",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Vanguard Business Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vanguard Business Services",
    description:
      "Professional US LLC Registration, UK LTD Registration, Business Banking & Payment Solutions.",
    images: ["/opengraph-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vanguard Business Services",
  url: "https://vanguardbusinesservices.com",
  logo: "https://vanguardbusinesservices.com/icon.png",
  description:
    "Professional US LLC Registration, UK LTD Registration, Business Banking, Payment Solutions and Business Consulting.",

  email: "vanguardbusinessservices37@gmail.com",

  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "vanguardbusinessservices37@gmail.com",
      telephone: "+1-917-735-9503",
      availableLanguage: ["English"],
    },
  ],

  sameAs: [
    "https://t.me/vanguardbusinessservices",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}