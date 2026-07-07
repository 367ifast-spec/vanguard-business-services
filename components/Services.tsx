export default function Services() {
  const services = [
    { icon: "🏢", title: "US LLC Registration", description: "Professional US LLC formation with complete guidance and ongoing business support." },
    { icon: "🇬🇧", title: "UK LTD Registration", description: "Fast and compliant UK company registration for entrepreneurs worldwide." },
    { icon: "🆔", title: "EIN Registration", description: "Assistance with obtaining your Employer Identification Number (EIN)." },
    { icon: "🏦", title: "Business Banking", description: "Guidance for eligible business bank account setup and financial solutions." },
    { icon: "💳", title: "Payment Gateway Setup", description: "Professional support for integrating online payment gateway solutions." },
    { icon: "💰", title: "Wise Business", description: "Wise Business setup guidance for international business payments." },
    { icon: "💵", title: "PayPal Business Setup", description: "Professional assistance with PayPal Business account configuration." },
    { icon: "💸", title: "Payoneer Business", description: "Business payment solution guidance using Payoneer services." },
    { icon: "🔗", title: "Stripe Integration", description: "Setup guidance for Stripe payment processing for online businesses." },
    { icon: "👔", title: "LinkedIn Business Consulting", description: "Professional guidance for optimizing your LinkedIn business presence." },
    { icon: "💬", title: "Telegram Business Setup", description: "Business communication and automation support." },
    { icon: "📧", title: "Business Email Setup", description: "Professional business email using your company domain." },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-[#05071d] py-28 text-white">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            OUR SERVICES
          </span>

          <h2 className="mt-8 text-5xl font-bold">
            Complete Business Solutions
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Everything you need to launch, grow and manage your global business.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-600/20"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-4xl transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>

              <h3 className="mt-8 text-xl font-bold">{service.title}</h3>

              <p className="mt-5 text-gray-400 leading-7">
                {service.description}
              </p>

              <div className="mt-8 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />

              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-400 transition group-hover:gap-3"
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
