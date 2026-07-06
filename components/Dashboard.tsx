export default function Dashboard() {
  return (
    <div className="relative">

      <div className="rounded-3xl border border-white/10 bg-[#0b1228] p-8 shadow-2xl">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-2xl font-bold text-white">
              Business Dashboard
            </h3>

            <p className="mt-2 text-gray-400">
              Vanguard Business Services
            </p>

          </div>

          <div className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            Active
          </div>

        </div>

        <div className="mt-10 grid grid-cols-2 gap-5">

          <div className="rounded-2xl bg-[#111a35] p-6">
            <p className="text-gray-400">
              Clients
            </p>

            <h2 className="mt-2 text-4xl font-bold text-white">
              500+
            </h2>
          </div>

          <div className="rounded-2xl bg-[#111a35] p-6">
            <p className="text-gray-400">
              Countries
            </p>

            <h2 className="mt-2 text-4xl font-bold text-white">
              10+
            </h2>
          </div>

          <div className="rounded-2xl bg-[#111a35] p-6">
            <p className="text-gray-400">
              Support
            </p>

            <h2 className="mt-2 text-4xl font-bold text-white">
              24/7
            </h2>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <p className="text-blue-100">
              Success Rate
            </p>

            <h2 className="mt-2 text-4xl font-bold text-white">
              99%
            </h2>
          </div>

        </div>

      </div>

    </div>
  );
}