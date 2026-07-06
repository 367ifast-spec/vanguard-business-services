export default function WhyChooseUs() {
  const features = [
    {
      title: "Trusted Expertise",
      description:
        "Professional business registration and consulting backed by experience.",
    },
    {
      title: "Fast Processing",
      description:
        "Efficient workflows to help you establish your business quickly.",
    },
    {
      title: "Transparent Service",
      description:
        "Clear communication with no hidden surprises throughout the process.",
    },
    {
      title: "Global Support",
      description:
        "Helping entrepreneurs from different countries start and grow businesses.",
    },
    {
      title: "Dedicated Assistance",
      description:
        "Responsive support whenever you need guidance or updates.",
    },
    {
      title: "Long-Term Partnership",
      description:
        "We're here to support your business beyond the registration stage.",
    },
  ];

  return (
    <section
      id="why-us"
      className="bg-[#040714] py-28 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Why Choose Us
          </span>

          <h2 className="mt-5 text-5xl font-bold">
            Why Businesses Trust
            <span className="block text-blue-500">
              Vanguard Business Services
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            We combine professionalism, transparency, and reliable support
            to help entrepreneurs confidently build and grow their businesses.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-[#0d1228] p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold">
                ✓
              </div>

              <h3 className="text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}