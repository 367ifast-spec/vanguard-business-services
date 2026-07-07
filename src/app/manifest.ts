import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vanguard Business Services",
    short_name: "Vanguard",
    description:
      "Professional US LLC Registration, UK LTD Registration, Business Banking, Payment Solutions, EIN Registration and Business Consulting.",

    start_url: "/",
    display: "standalone",

    background_color: "#05071d",
    theme_color: "#2563eb",

    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}