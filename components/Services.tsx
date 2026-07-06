export default function Services() {
  const services = [
    {
      title: "US LLC Registration",
      description:
        "Professional LLC formation with reliable guidance and full support.",
      icon: "🏢",
    },
    {
      title: "UK LTD Registration",
      description:
        "Fast and compliant UK company registration for global entrepreneurs.",
      icon: "🇬🇧",
    },
    {
      title: "Business Banking",
      description:
        "Guidance for eligible business banking solutions and financial setup.",
      icon: "🏦",
    },
    {
      title: "Payment Solutions",
      description:
        "Support for payment gateway setup and business payment solutions.",
      icon: "💳",
    },
    {
      title: "Business Consultation",
      description:
        "Expert consultation to help launch and grow your business globally.",
      icon: "💼",
    },
    {
      title: "Ongoing Support",
      description:
        "Long-term business support for entrepreneurs and growing companies.",
      icon: "🤝",
    },
  ];

  return (
    <section
      id="services"
      className="bg-[#05071d] py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Our Services
          </span>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Everything You Need To Build
            <span className="block text-blue-500">
              Your Business
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            We provide professional business registration, banking guidance,
            payment solutions, and ongoing support to entrepreneurs worldwide.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-3xl border border-white/10 bg-[#0d1228] p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:bg-[#101935]"
            >

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl">
                {service.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                {service.description}
              </p>

              <a
                href="#contact"
                className="mt-8 inline-block font-semibold text-blue-400 transition group-hover:translate-x-1"
              >
                Learn More →
              </a>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}