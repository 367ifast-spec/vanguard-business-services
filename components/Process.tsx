export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Free Consultation",
      description:
        "Tell us about your business goals and we will recommend the most suitable solution.",
    },
    {
      number: "02",
      title: "Document Review",
      description:
        "We review the required information and guide you through each step of the process.",
    },
    {
      number: "03",
      title: "Business Setup",
      description:
        "Our team assists with registration and business setup based on your selected service.",
    },
    {
      number: "04",
      title: "Ongoing Support",
      description:
        "Receive continued support and guidance after your business is successfully established.",
    },
  ];

  return (
    <section
      id="process"
      className="bg-[#05071d] py-28 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            OUR PROCESS
          </span>

          <h2 className="mt-8 text-5xl font-bold">
            Simple & Transparent Process
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            We follow a clear process to help entrepreneurs launch and grow
            their businesses with confidence.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1228] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500"
            >

              <div className="absolute -right-4 -top-4 text-7xl font-black text-white/5">
                {step.number}
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl font-bold">
                {step.number}
              </div>

              <h3 className="mt-8 text-2xl font-bold">
                {step.title}
              </h3>

              <p className="mt-5 leading-8 text-gray-400">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}