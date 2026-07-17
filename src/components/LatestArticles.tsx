import Link from "next/link";

const articles = [
  {
    title: "Stripe Atlas Review",
    href: "/blog/stripe-atlas-review",
    description:
      "Learn whether Stripe Atlas is the right choice for your startup.",
  },
  {
    title: "Mercury Bank Review",
    href: "/blog/mercury-bank-review",
    description:
      "Discover Mercury's business banking features for international founders.",
  },
  {
    title: "Payoneer vs Wise",
    href: "/blog/payoneer-vs-wise",
    description:
      "Compare two of the most popular international payment platforms.",
  },
  {
    title: "Remote Business Banking Guide",
    href: "/blog/remote-business-banking-guide",
    description:
      "Explore the best remote banking solutions for online businesses.",
  },
  {
    title: "Best Countries for Online Business",
    href: "/blog/best-countries-for-online-business",
    description:
      "Compare the top countries for starting and scaling an online business.",
  },
  {
    title: "US LLC vs UK LTD",
    href: "/blog/us-llc-vs-uk-ltd",
    description:
      "Find out which business structure is best for international entrepreneurs.",
  },
];

export default function LatestArticles() {
  return (
    <section className="bg-[#020817] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-4 text-center text-4xl font-bold text-white">
          Latest Articles
        </h2>

        <p className="mx-auto mb-12 max-w-3xl text-center text-gray-400">
          Explore our latest guides on business formation, banking, and payment
          solutions for entrepreneurs worldwide.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500 hover:scale-[1.02]"
            >
              <h3 className="text-xl font-bold text-white">
                {article.title}
              </h3>

              <p className="mt-3 text-gray-400">
                {article.description}
              </p>

              <span className="mt-6 inline-block font-semibold text-blue-400">
                Read Article →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}