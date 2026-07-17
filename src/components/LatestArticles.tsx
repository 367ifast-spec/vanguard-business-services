import Link from "next/link";

export default function LatestArticles() {
  return (
    <section className="bg-[#020817] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-4xl font-bold text-white">
          Latest Articles
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/blog/how-to-open-a-stripe-account-without-living-in-the-usa"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
          >
            <h3 className="text-xl font-bold text-white">
              How to Open a Stripe Account
            </h3>

            <p className="mt-3 text-gray-400">
              Learn how non-US residents can legally use Stripe.
            </p>
          </Link>

          <Link
            href="/blog/us-llc-vs-uk-ltd"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
          >
            <h3 className="text-xl font-bold text-white">
              US LLC vs UK LTD
            </h3>

            <p className="mt-3 text-gray-400">
              Compare the two most popular business structures.
            </p>
          </Link>

          <Link
            href="/blog/how-to-get-ein-online"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
          >
            <h3 className="text-xl font-bold text-white">
              How to Get EIN Online
            </h3>

            <p className="mt-3 text-gray-400">
              Everything you need to know about EIN registration.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}