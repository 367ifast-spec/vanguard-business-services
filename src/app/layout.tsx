import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vanguardbusinessservices.com"),

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

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "GOOGLE_VERIFICATION_CODE",
  },

  openGraph: {
    title: "Vanguard Business Services",
    description:
      "Professional Business Registration & Business Banking Solutions Worldwide.",
    url: "https://vanguardbusinessservices.com",
    siteName: "Vanguard Business Services",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vanguard Business Services",
    description:
      "Professional US LLC Registration, UK LTD Registration, Business Banking & Payment Solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}