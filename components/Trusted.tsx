export default function Trusted() {
  const services = [
    "US LLC Registration",
    "UK LTD Registration",
    "Business Consulting",
    "Payment Solutions",
    "Global Business Support",
  ];

  return (
    <section className="bg-[#070b1f] border-y border-white/10 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.35em] text-gray-400">
          Trusted by Entrepreneurs Worldwide
        </h2>

        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {services.map((service) => (
            <div
              key={service}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition duration-300 hover:border-blue-500 hover:bg-blue-500/10"
            >
              <p className="font-semibold text-white">
                {service}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}