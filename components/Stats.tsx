import { Building2, Globe2, ShieldCheck, Users } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: <Building2 size={36} />,
      value: "500+",
      label: "Businesses Supported",
    },
    {
      icon: <Globe2 size={36} />,
      value: "10+",
      label: "Countries Served",
    },
    {
      icon: <Users size={36} />,
      value: "24/7",
      label: "Client Support",
    },
    {
      icon: <ShieldCheck size={36} />,
      value: "99%",
      label: "Client Satisfaction",
    },
  ];

  return (
    <section className="bg-[#05071d] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="text-blue-400 uppercase tracking-[0.3em] text-sm font-semibold">
            OUR IMPACT
          </span>

          <h2 className="mt-5 text-5xl font-bold">
            Trusted by Businesses Worldwide
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            We help entrepreneurs launch, grow, and manage their businesses
            with confidence through reliable and professional support.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center transition duration-300 hover:border-blue-500 hover:bg-blue-500/10"
            >
              <div className="flex justify-center text-blue-400">
                {item.icon}
              </div>

              <h3 className="mt-6 text-5xl font-bold">
                {item.value}
              </h3>

              <p className="mt-3 text-gray-400">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}