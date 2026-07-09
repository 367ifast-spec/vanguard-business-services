import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#040714] text-white"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[150px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">
        <div className="grid w-full gap-16 lg:grid-cols-2">

          {/* Left Side */}
          <div>
            <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              Trusted Global Business Partner
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
              Build Your
              <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Global Business
              </span>
              With Confidence
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-300">
              Vanguard Business Services helps entrepreneurs establish
              companies, business banking, payment solutions and long-term
              business growth with professional support.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold shadow-lg transition hover:scale-105"
              >
                Start Today
              </Link>

              <Link
                href="/#services"
                className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white hover:text-black"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-5">
              {[
                ["500+", "Clients"],
                ["10+", "Countries"],
                ["24/7", "Support"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <h2 className="text-3xl font-bold text-blue-400">
                    {value}
                  </h2>

                  <p className="mt-2 text-gray-300">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-3xl font-bold">
              Business Solutions
            </h2>

            <p className="mt-3 text-gray-300">
              Everything you need to launch and grow globally.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "US LLC Registration",
                "UK LTD Registration",
                "Business Banking",
                "Payment Solutions",
              ].map((item) => (
                <article
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[#0d1735] p-5 transition hover:-translate-y-1 hover:border-blue-500"
                >
                  <h3 className="font-semibold text-blue-400">
                    {item}
                  </h3>

                  <p className="mt-2 text-sm text-gray-300">
                    Professional guidance from start to finish.
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
              <h3 className="text-2xl font-bold">
                Trusted Worldwide
              </h3>

              <p className="mt-2 text-blue-100">
                Empowering entrepreneurs with reliable business solutions.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}