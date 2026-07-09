import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.vanguardbusinesservices.com";

  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/services/us-llc-registration`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/uk-ltd-registration`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/business-banking`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/ein-registration`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/stripe-business`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/wise-business`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/payoneer-business`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/services/paypal-business`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/refund-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },

    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}