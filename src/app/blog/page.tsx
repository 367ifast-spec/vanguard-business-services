import Link from "next/link";

const blogs = [
  {
    title: "How to Open a Stripe Account Without Living in the USA",
    href: "/blog/how-to-open-a-stripe-account-without-living-in-the-usa",
    description:
      "Learn how international entrepreneurs can access Stripe-compatible business setups.",
  },
  {
    title: "US LLC vs UK LTD",
    href: "/blog/us-llc-vs-uk-ltd",
    description:
      "Compare US LLC and UK LTD companies for taxes, banking, and global business.",
  },
  {
    title: "How to Get EIN Online",
    href: "/blog/how-to-get-ein-online",
    description:
      "Everything you need to know about obtaining an EIN for your business.",
  },
  {
    title: "Wise Business Review",
    href: "/blog/wise-business-review",
    description:
      "A complete review of Wise Business and its benefits for international founders.",
  },
  {
    title: "Best US Banks for Non-Residents",
    href: "/blog/best-us-banks-for-non-residents",
    description:
      "Explore popular US banking options for non-resident business owners.",
  },
  {
    title: "Stripe Atlas Review",
    href: "/blog/stripe-atlas-review",
    description:
      "Review Stripe Atlas and determine if it's the right option for your startup.",
  },
  {
    title: "Mercury Bank Review",
    href: "/blog/mercury-bank-review",
    description:
      "Learn about Mercury's features, eligibility, and business banking tools.",
  },
  {
    title: "Payoneer vs Wise",
    href: "/blog/payoneer-vs-wise",
    description:
      "Compare Payoneer and Wise for international payments and business operations.",
  },
  {
    title: "Remote Business Banking Guide",
    href: "/blog/remote-business-banking-guide",
    description:
      "Discover the best remote banking solutions for entrepreneurs worldwide.",
  },
  {
    title: "Best Countries for Online Business",
    href: "/blog/best-countries-for-online-business",
    description:
      "Compare the best countries for launching and scaling an online business.",
  },
];

export const metadata = {
  title: "Blog | Vanguard Business Services",

  description:
    "Explore guides, reviews, and business insights from Vanguard Business Services.",

  alternates: {
    canonical: "https://www.vanguardbusinesservices.com/blog",
  },

  openGraph: {
    title: "Blog | Vanguard Business Services",
    description:
      "Explore guides, reviews, and business insights from Vanguard Business Services.",
    url: "https://www.vanguardbusinesservices.com/blog",
    siteName: "Vanguard Business Services",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold">Vanguard Business Blog</h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Expert guides on US LLCs, UK LTDs, business banking, Stripe,
            Payoneer, Wise, and international entrepreneurship.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.href}
              className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-blue-500"
            >
              <h2 className="text-2xl font-bold">{blog.title}</h2>

              <p className="mt-4 text-gray-400">{blog.description}</p>

              <Link
                href={blog.href}
                className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Read Article
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}