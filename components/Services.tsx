export default function Services() {
  const services = [
    {
      icon: "🏢",
      title: "US LLC Registration",
      description:
        "Professional US LLC formation with complete guidance and ongoing business support.",
    },
    {
      icon: "🇬🇧",
      title: "UK LTD Registration",
      description:
        "Fast and compliant UK company registration for entrepreneurs worldwide.",
    },
    {
      icon: "🆔",
      title: "EIN Registration",
      description:
        "Assistance with obtaining your Employer Identification Number (EIN).",
    },
    {
      icon: "🏦",
      title: "Business Banking",
      description:
        "Guidance for eligible business bank account setup and financial solutions.",
    },
    {
      icon: "💳",
      title: "Payment Gateway Setup",
      description:
        "Professional support for integrating online payment gateway solutions.",
    },
    {
      icon: "💰",
      title: "Wise Business",
      description:
        "Wise Business setup guidance for international business payments.",
    },
    {
      icon: "💵",
      title: "PayPal Business Setup",
      description:
        "Professional assistance with PayPal Business account configuration.",
    },
    {
      icon: "💸",
      title: "Payoneer Business",
      description:
        "Business payment solution guidance using Payoneer services.",
    },
    {
      icon: "🔗",
      title: "Stripe Integration",
      description:
        "Setup guidance for Stripe payment processing for online businesses.",
    },
    {
      icon: "👔",
      title: "LinkedIn Business Consulting",
      description:
        "Professional guidance for building and optimizing your business presence on LinkedIn.",
    },
    {
      icon: "💬",
      title: "Telegram Business Setup",
      description:
        "Support for setting up Telegram channels, business communication, and automation.",
    },
    {
      icon: "📧",
      title: "Business Email Setup",
      description:
        "Professional business email setup using your custom company domain.",
    },
    {
      icon: "☁️",
      title: "Google Workspace Setup",
      description:
        "Google Workspace configuration for business email and collaboration.",
    },
    {
      icon: "🪙",
      title: "Crypto Payment Integration",
      description:
        "Consulting for integrating cryptocurrency payment options into your business.",
    },
    {
      icon: "🌐",
      title: "Digital Payment Consulting",
      description:
        "Expert guidance for modern digital payment solutions and online commerce.",
    },
    {
      icon: "✅",
      title: "Business Verification Support",
      description:
        "Guidance for completing business verification processes with supported platforms.",
    },
    {
      icon: "📑",
      title: "Merchant Account Assistance",
      description:
        "Support with merchant account setup and payment acceptance solutions.",
    },
    {
      icon: "🚀",
      title: "Startup Consulting",
      description:
        "End-to-end consulting for launching and growing a new business.",
    },
    {
      icon: "🌍",
      title: "International Business Support",
      description:
        "Professional guidance for entrepreneurs expanding into international markets.",
    },
    {
      icon: "🤝",
      title: "Business Consultation",
      description:
        "Personalized consulting to help you make informed business decisions.",
    },
  ];

  return (
    <section
      id="services"
      className="bg-[#05071d] py-28 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            OUR SERVICES
          </span>

          <h2 className="mt-8 text-5xl font-bold">
            Complete Business Solutions
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Vanguard Business Services provides professional business registration,
            payment solutions, business setup, and consulting services for entrepreneurs worldwide.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-3xl border border-white/10 bg-[#0d1228] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-600/20"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-4xl">
                {service.icon}
              </div>

              <h3 className="mt-8 text-xl font-bold">
                {service.title}
              </h3>

              <p className="mt-5 leading-7 text-gray-400">
                {service.description}
              </p>

              <a
                href="#contact"
                className="mt-8 inline-flex items-center rounded-full border border-blue-500 px-5 py-3 font-semibold text-blue-400 transition hover:bg-blue-600 hover:text-white"
              >
                Get Started →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}