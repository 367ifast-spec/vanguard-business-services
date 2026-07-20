import Link from "next/link";

const blogs = [
  {
    title: "How to Open a US Bank Account With an LLC",
    href: "/blog/how-to-open-a-us-bank-account-with-an-llc",
    description:
      "Learn how to open a US business bank account using your LLC.",
  },
  {
    title: "How to Open a US Bank Account Without Visiting the USA",
    href: "/blog/how-to-open-a-us-bank-account-without-visiting-the-usa",
    description:
      "A complete guide for opening a US bank account remotely.",
  },
  {
    title: "Best Business Banks for US LLC",
    href: "/blog/best-business-banks-for-us-llc",
    description:
      "Compare the top business banks for US LLC owners in 2026.",
  },
  {
    title: "How to Get EIN for Foreign-Owned LLC",
    href: "/blog/how-to-get-ein-for-foreign-owned-llc",
    description:
      "Step-by-step guide to obtaining an EIN without an SSN.",
  },
  {
    title: "Best States for US LLC in 2026",
    href: "/blog/best-states-for-us-llc-in-2026",
    description:
      "Compare Wyoming, Delaware, and New Mexico for your LLC.",
  },
  {
    title: "Mercury vs Relay",
    href: "/blog/mercury-vs-relay",
    description:
      "Compare Mercury and Relay for startups and agencies.",
  },
  {
    title: "Relay Bank vs Wise",
    href: "/blog/relay-bank-vs-wise",
    description:
      "Which platform is better for banking and transfers?",
  },
  {
    title: "Wise Business vs Payoneer",
    href: "/blog/wise-business-vs-payoneer",
    description:
      "Compare Wise Business and Payoneer for global payments.",
  },
  {
    title: "Stripe Atlas vs Doola",
    href: "/blog/stripe-atlas-vs-doola",
    description:
      "Find out which company formation platform is right for you.",
  },
  {
    title: "Payoneer Review",
    href: "/blog/payoneer-review",
    description:
      "An in-depth review of Payoneer in 2026.",
  },

  // Existing blogs
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
      "Everything you need to know about obtaining an EIN.",
  },
  {
    title: "Wise Business Review",
    href: "/blog/wise-business-review",
    description:
      "A complete review of Wise Business.",
  },
  {
    title: "Best US Banks for Non-Residents",
    href: "/blog/best-us-banks-for-non-residents",
    description:
      "Explore popular US banking options for non-residents.",
  },
  {
    title: "Stripe Atlas Review",
    href: "/blog/stripe-atlas-review",
    description:
      "Review Stripe Atlas and determine if it's right for you.",
  },
  {
    title: "Mercury Bank Review",
    href: "/blog/mercury-bank-review",
    description:
      "Learn about Mercury's business banking tools.",
  },
  {
    title: "Payoneer vs Wise",
    href: "/blog/payoneer-vs-wise",
    description:
      "Compare Payoneer and Wise for international payments.",
  },
];

export const metadata = {
  title: "Blog | Vanguard Business Services",
  description:
    "Explore guides, reviews, and business insights from Vanguard Business Services.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold">
            Vanguard Business Blog
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Expert guides on US LLCs, banking, Stripe, Wise,
            Payoneer, and international business.
          </p>
        </div>

        {/* Featured */}
        <div className="mb-16 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Featured Guide
          </h2>

          <p className="mt-4 text-lg">
            How to Open a US Bank Account Without Visiting the USA
          </p>

          <Link
            href="/blog/how-to-open-a-us-bank-account-without-visiting-the-usa"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black"
          >
            Read Featured Article
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.href}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500"
            >
              <h2 className="text-2xl font-bold">
                {blog.title}
              </h2>

              <p className="mt-4 text-gray-400">
                {blog.description}
              </p>

              <Link
                href={blog.href}
                className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
              >
                Read Article
              </Link>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <section className="mt-20 rounded-3xl bg-slate-900 p-10 text-center">
          <h2 className="text-4xl font-bold">
            Stay Updated
          </h2>

          <p className="mt-4 text-gray-400">
            Get the latest guides on US LLCs, banking, and global business.
          </p>

          <Link
            href="/contact"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3"
          >
            Contact Us
          </Link>
        </section>
      </section>
    </main>
  );
}