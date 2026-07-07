export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#05071d] text-white">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <h2 className="text-2xl font-bold">Vanguard Business Services</h2>
            <p className="mt-5 leading-8 text-gray-400">
              Helping entrepreneurs establish companies, payment solutions,
              and business banking with professional guidance.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-gray-400">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Core Services</h3>
            <ul className="mt-5 space-y-3 text-gray-400">
              <li>US LLC Registration</li>
              <li>UK LTD Registration</li>
              <li>Business Banking</li>
              <li>Payment Solutions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-5 space-y-3 text-gray-400">
              <li>📧 vanguardbusinessservices37@gmail.com</li>
              <li>💬 @vanguardbusinessservices</li>
              <li>📱 +1 917 735 9503</li>
              <li>🎮 vanguardbusinessservices</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>© {year} Vanguard Business Services. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
