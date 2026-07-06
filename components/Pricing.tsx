export default function Pricing() {
  const plans = [
    {
      title: "Startup",
      description: "Perfect for new entrepreneurs starting their business journey.",
      features: [
        "Business Registration Guidance",
        "Basic Consultation",
        "Email Support",
        "Business Setup Assistance",
      ],
    },
    {
      title: "Business",
      description: "Ideal for growing businesses that need additional support.",
      features: [
        "Everything in Startup",
        "Business Banking Guidance",
        "Payment Solution Guidance",
        "Priority Support",
      ],
      popular: true,
    },
    {
      title: "Enterprise",
      description: "Comprehensive support for established businesses and international expansion.",
      features: [
        "Everything in Business",
        "Dedicated Consultation",
        "Business Growth Strategy",
        "Long-Term Support",
      ],
    },
  ];

  return (
    <section id="pricing" className="bg-[#040714] py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            PRICING
          </span>

          <h2 className="mt-8 text-5xl font-bold">
            Choose the Right Plan
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Contact us for a personalized quotation based on your business needs.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? "border-blue-500 bg-blue-600/10"
                  : "border-white/10 bg-[#0d1228]"
              }`}
            >
              {plan.popular && (
                <span className="rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold">
                  Most Popular
                </span>
              )}

              <h3 className="mt-6 text-3xl font-bold">{plan.title}</h3>

              <p className="mt-4 text-gray-400">{plan.description}</p>

              <div className="mt-8 text-5xl font-bold">
                Contact
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    ✅ {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-10 block rounded-xl bg-blue-600 py-4 text-center font-semibold transition hover:bg-blue-700"
              >
                Request Quote
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}