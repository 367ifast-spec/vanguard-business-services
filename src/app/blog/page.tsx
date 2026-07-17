import Link from "next/link";

export const metadata = {
  title: "Blog | Vanguard Business Services",
  description:
    "Read the latest guides on US LLC formation, Stripe, EIN registration, Wise Business, and banking for non-residents.",
  alternates: {
    canonical: "https://www.vanguardbusinesservices.com/blog",
  },
  openGraph: {
    title: "Vanguard Business Services Blog",
    description:
      "Expert articles on international business registration, banking, and payment solutions.",
    url: "https://www.vanguardbusinesservices.com/blog",
    siteName: "Vanguard Business Services",
    type: "website",
  },
};

const blogs = [
  {
    title: "How to Open a Stripe Account Without Living in the USA",
    href: "/blog/how-to-open-a-stripe-account-without-living-in-the-usa",
    description:
      "Learn how foreigners can legally open a Stripe account using a US LLC, EIN, and business banking setup.",
  },
  {
    title: "US LLC vs UK LTD",
    href: "/blog/us-llc-vs-uk-ltd",
    description:
      "Compare US LLC and UK LTD companies to determine which is best for international entrepreneurs.",
  },
  {
    title: "How to Get EIN Online",
    href: "/blog/how-to-get-ein-online",
    description:
      "Discover how to apply for an EIN and why it is important for your US business.",
  },
  {
    title: "Wise Business Review",
    href: "/blog/wise-business-review",
    description:
      "An in-depth review of Wise Business, including features, fees, and global payment capabilities.",
  },
  {
    title: "Best US Banks for Non-Residents",
    href: "/blog/best-us-banks-for-non-residents",
    description:
      "Compare Mercury, Relay, Brex, Wise, Payoneer, and Bank of America for international entrepreneurs.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <span className="rounded-full border border-blue-500 px-4 py-2 text-sm text-blue-400">
            Vanguard Business Services
          </span>

          <h1 className="mt-6 text-5xl font-bold md:text-6xl">
            Business & Banking Blog
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Explore expert insights on US LLC formation, UK LTD registration,
            Stripe, EIN registration, Wise Business, and international banking
            solutions.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {blogs.map((blog) => (
            <div
              key={blog.href}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-blue-500"
            >
              <h2 className="text-2xl font-bold">{blog.title}</h2>

              <p className="mt-4 leading-7 text-gray-400">
                {blog.description}
              </p>

              <Link
                href={blog.href}
                className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
              >
                Read Article →
              </Link>
            </div>
          ))}
        </div>

        <section className="mt-20 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Need Help Starting Your Business?
          </h2>

          <p className="mt-4 text-lg">
            Vanguard Business Services helps entrepreneurs worldwide establish
            US and UK companies, obtain EINs, and access international banking
            solutions.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-semibold text-black"
          >
            Contact Us
          </Link>
        </section>
      </section>
    </main>
  );
}