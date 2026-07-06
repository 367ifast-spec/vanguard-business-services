export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#040714] pt-28 text-white lg:pt-32"
    >
      {/* Background Glow */}
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Content */}
          <div>

            <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-300">
              Trusted Business Registration & Consulting
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
              Launch Your
              <span className="block text-blue-500">
                Global Business
              </span>
              With Confidence
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-300">
              Vanguard Business Services helps entrepreneurs establish
              companies, business banking guidance, payment solutions,
              and long-term business growth.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
              >
                Start Today
              </a>

              <a
                href="#services"
                className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white hover:text-black"
              >
                Our Services
              </a>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-6">

              <div>
                <h3 className="text-4xl font-bold text-blue-400">
                  500+
                </h3>

                <p className="mt-2 text-gray-400">
                  Clients
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-blue-400">
                  10+
                </h3>

                <p className="mt-2 text-gray-400">
                  Countries
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-blue-400">
                  24/7
                </h3>

                <p className="mt-2 text-gray-400">
                  Support
                </p>
              </div>

            </div>

          </div>

          {/* Right Content */}
          <div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

              <h3 className="text-3xl font-bold">
                Business Solutions
              </h3>

              <p className="mt-3 text-gray-400">
                Professional support for entrepreneurs.
              </p>

              <div className="mt-8 space-y-5">

                <div className="rounded-2xl bg-[#0d1735] p-5">
                  <h4 className="font-semibold text-blue-400">
                    US LLC Registration
                  </h4>

                  <p className="mt-2 text-sm text-gray-400">
                    Fast company formation support.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#0d1735] p-5">
                  <h4 className="font-semibold text-blue-400">
                    UK LTD Registration
                  </h4>

                  <p className="mt-2 text-sm text-gray-400">
                    Reliable UK business setup.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#0d1735] p-5">
                  <h4 className="font-semibold text-blue-400">
                    Business Banking
                  </h4>

                  <p className="mt-2 text-sm text-gray-400">
                    Professional guidance.
                  </p>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
                  <h4 className="text-2xl font-bold">
                    Trusted Worldwide
                  </h4>

                  <p className="mt-2 text-blue-100">
                    Professional Business Services
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}