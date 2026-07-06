export default function About() {
  return (
    <section
      id="about"
      className="bg-[#0b1023] py-28 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Side */}
          <div>
            <span className="rounded-full bg-blue-600/20 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-blue-400">
              About Vanguard
            </span>

            <h2 className="mt-6 text-5xl font-bold leading-tight">
              Helping Entrepreneurs
              <span className="block text-blue-500">
                Build Global Businesses
              </span>
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-400">
              Vanguard Business Services provides professional company
              registration, business banking guidance, payment solutions,
              and consulting services for entrepreneurs worldwide.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              Our mission is to make business formation simple,
              transparent, and reliable while helping our clients
              grow with confidence.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
              >
                Get Started
              </a>

              <a
                href="#services"
                className="rounded-xl border border-white/10 px-8 py-4 font-semibold transition hover:bg-white hover:text-black"
              >
                View Services
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="grid gap-6">
            <div className="rounded-3xl border border-white/10 bg-[#11172d] p-8">
              <h3 className="text-2xl font-bold text-blue-400">
                500+
              </h3>

              <p className="mt-3 text-gray-400">
                Businesses Supported Worldwide
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#11172d] p-8">
              <h3 className="text-2xl font-bold text-blue-400">
                10+
              </h3>

              <p className="mt-3 text-gray-400">
                Countries Served
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
              <h3 className="text-2xl font-bold">
                Professional Support
              </h3>

              <p className="mt-3 text-blue-100">
                Dedicated assistance for entrepreneurs at every stage of their business journey.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}