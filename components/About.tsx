export default function About() {
  const features = [
    "US LLC Registration",
    "UK LTD Registration",
    "Business Banking Solutions",
    "EIN Registration",
    "Payment Gateway Setup",
    "Ongoing Business Support",
  ];

  const stats = [
    { value: "500+", label: "Businesses Supported" },
    { value: "50+", label: "Countries Served" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section
      id="about"
      className="bg-[#0B1120] text-white py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="inline-block rounded-full bg-blue-600/20 border border-blue-500/30 px-4 py-2 text-sm font-semibold text-blue-400">
              About Vanguard Business Services
            </span>

            <h2 className="mt-6 text-4xl font-bold tracking-tight text-white">
              Helping Entrepreneurs Build Global Businesses
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Vanguard Business Services helps entrepreneurs launch, grow and
              manage businesses with professional registration, banking,
              compliance and payment solutions. Our mission is to simplify
              international business expansion with reliable guidance and fast
              support.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-700 bg-slate-900 p-4 font-medium text-slate-200 hover:border-blue-500 transition"
                >
                  ✓ {item}
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-4">
              <a
                href="#contact"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
              >
                Contact Us
              </a>

              <a
                href="#services"
                className="rounded-lg border border-slate-600 px-6 py-3 font-semibold text-white hover:bg-slate-800 transition"
              >
                Explore Services
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center"
              >
                <h3 className="text-4xl font-bold text-blue-500">
                  {stat.value}
                </h3>

                <p className="mt-3 text-slate-300">
                  {stat.label}
                </p>
              </div>
            ))}

            <div className="col-span-2 rounded-2xl border border-slate-700 bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-white">
              <h3 className="text-2xl font-bold">
                Trusted Partner for Global Business Growth
              </h3>

              <p className="mt-4 text-blue-100">
                From company formation to banking and payment solutions,
                Vanguard Business Services provides reliable support for
                startups, freelancers, agencies and growing businesses
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}