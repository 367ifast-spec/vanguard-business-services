export default function Testimonials() {
  const testimonials = [
    {
      name: "Michael Johnson",
      company: "E-Commerce Founder",
      country: "🇺🇸 United States",
      review:
        "Vanguard Business Services made our company formation process smooth and professional. Every step was explained clearly, and the support team was responsive throughout.",
    },
    {
      name: "Sarah Williams",
      company: "Marketing Agency",
      country: "🇬🇧 United Kingdom",
      review:
        "Outstanding communication and reliable business support. The entire registration process was completed faster than expected.",
    },
    {
      name: "David Brown",
      company: "Software Company",
      country: "🇨🇦 Canada",
      review:
        "Professional, transparent, and efficient. I highly recommend Vanguard Business Services for entrepreneurs looking to expand internationally.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#040714] py-28 text-white"
    >
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            CLIENT TESTIMONIALS
          </span>

          <h2 className="mt-8 text-5xl font-bold">
            Trusted By Businesses Worldwide
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Entrepreneurs around the world trust Vanguard Business Services for
            reliable company formation, banking guidance, and business support.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((client) => (
            <div
              key={client.name}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-600/20"
            >
              <div className="flex items-center justify-between">
                <div className="text-yellow-400 text-xl tracking-widest">
                  ★★★★★
                </div>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                  Verified Client
                </span>
              </div>

              <p className="mt-8 leading-8 text-gray-300">
                "{client.review}"
              </p>

              <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-xl font-bold">
                  {client.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    {client.name}
                  </h3>

                  <p className="text-sm text-blue-400">
                    {client.company}
                  </p>

                  <p className="text-xs text-gray-500">
                    {client.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 p-10 text-center">
          <h3 className="text-3xl font-bold">
            Join Hundreds of Successful Businesses
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-gray-300">
            Whether you're launching your first company or expanding globally,
            Vanguard Business Services is ready to support your business journey.
          </p>

          <a
            href="#contact"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
          >
            Start Your Business Today
          </a>
        </div>
      </div>
    </section>
  );
}