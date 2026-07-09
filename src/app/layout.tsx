import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vanguardbusinesservices.com"),

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
    "PayPal Business",
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
formatDetection: {
  email: false,
  address: false,
  telephone: false,
},

verification: {
  google: "mrPZFsuNx2H5dr_SWjQGp4iiYswyYIJBHzQuhyHv2ws",
},

  alternates: {
    canonical: "https://www.vanguardbusinesservices.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Vanguard Business Services",
    description:
      "Professional Business Registration & Business Banking Solutions Worldwide.",
    url: "https://www.vanguardbusinesservices.com",
    siteName: "Vanguard Business Services",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Vanguard Business Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vanguard Business Services",
    description:
      "Professional US LLC Registration, UK LTD Registration, Business Banking & Payment Solutions.",
    images: ["/opengraph-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s);
            }(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1404267761512790');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1404267761512790&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}

        <GoogleAnalytics gaId="G-W0NVYS45EM" />

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","xitcmdtf0d");
          `}
        </Script>

        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id="9626644";
            window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l){
              if(!l){
                window.lintrk=function(a,b){window.lintrk.q.push([a,b]);};
                window.lintrk.q=[];
              }
              var s=document.getElementsByTagName("script")[0];
              var b=document.createElement("script");
              b.type="text/javascript";
              b.async=true;
              b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b,s);
            })(window.lintrk);
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=9626644&fmt=gif"
          />
        </noscript>
      </body>
    </html>
  );
}