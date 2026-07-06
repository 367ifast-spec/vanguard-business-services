export default function Testimonials() {
  const testimonials = [
    {
      name: "Michael Johnson",
      company: "E-commerce Founder",
      review:
        "The registration process was smooth and professional. The team answered every question clearly and made the experience stress-free.",
    },
    {
      name: "Sarah Williams",
      company: "Marketing Agency",
      review:
        "Excellent communication and reliable support from start to finish. Highly recommended for business registration services.",
    },
    {
      name: "David Brown",
      company: "Software Company",
      review:
        "Professional service with fast responses. Everything was handled efficiently and transparently.",
    },
  ];

  return (
    <section className="bg-[#05071d] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            CLIENT TESTIMONIALS
          </span>

          <h2 className="mt-4 text-5xl font-bold">
            What Our Clients Say
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Trusted by entrepreneurs and businesses worldwide.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500"
            >
              <div className="mb-6 text-yellow-400 text-xl">
                ★★★★★
              </div>

              <p className="leading-8 text-gray-300">
                "{item.review}"
              </p>

              <div className="mt-8 border-t border-white/10 pt-6">
                <h4 className="text-xl font-bold">
                  {item.name}
                </h4>

                <p className="text-gray-400">
                  {item.company}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}