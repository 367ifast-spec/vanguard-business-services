export default function GlobalPresence() {
  const countries = [
    { flag: "🇺🇸", name: "United States", desc: "LLC Formation & Business Support" },
    { flag: "🇬🇧", name: "United Kingdom", desc: "LTD Registration Services" },
    { flag: "🇨🇦", name: "Canada", desc: "International Business Support" },
    { flag: "🇦🇪", name: "United Arab Emirates", desc: "Business Expansion Guidance" },
    { flag: "🇦🇺", name: "Australia", desc: "Global Entrepreneur Support" },
    { flag: "🇪🇺", name: "Europe", desc: "International Business Solutions" },
    { flag: "🌏", name: "Asia", desc: "Worldwide Business Services" },
    { flag: "🌍", name: "Worldwide", desc: "Serving Clients Globally" },
  ];

  return (
    <section className="bg-[#040714] py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            GLOBAL PRESENCE
          </span>

          <h2 className="mt-8 text-5xl font-bold">
            Trusted By Entrepreneurs Worldwide
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Vanguard Business Services supports entrepreneurs and companies
            across multiple regions with reliable business solutions and
            professional guidance.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {countries.map((country) => (
            <div
              key={country.name}
              className="rounded-3xl border border-white/10 bg-[#0d1228] p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500"
            >
              <div className="text-5xl">{country.flag}</div>

              <h3 className="mt-6 text-2xl font-bold">
                {country.name}
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                {country.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-8 text-center md:grid-cols-4">

          <div>
            <h3 className="text-5xl font-bold text-blue-500">1000+</h3>
            <p className="mt-3 text-gray-400">Businesses Assisted</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-blue-500">30+</h3>
            <p className="mt-3 text-gray-400">Countries Reached</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-blue-500">24/7</h3>
            <p className="mt-3 text-gray-400">Customer Support</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-blue-500">99%</h3>
            <p className="mt-3 text-gray-400">Client Satisfaction</p>
          </div>

        </div>

      </div>
    </section>
  );
}