export default function Footer() {
  return (
    <footer className="bg-[#040714] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">

          {/* Company */}
          <div>
            <h2 className="text-3xl font-bold">
              <span className="text-blue-500">Vanguard</span> Business Services
            </h2>

            <p className="mt-6 text-gray-400 leading-8">
              Helping entrepreneurs worldwide establish and grow their
              businesses through professional registration, banking,
              payment solutions, and consulting services.
            </p>

            <div className="mt-6 flex gap-3">

              <span className="rounded-full bg-blue-600 px-3 py-1 text-sm">
                Trusted
              </span>

              <span className="rounded-full bg-green-600 px-3 py-1 text-sm">
                Secure
              </span>

              <span className="rounded-full bg-indigo-600 px-3 py-1 text-sm">
                Global
              </span>

            </div>
          </div>

          {/* Services */}

          <div>

            <h3 className="text-xl font-bold">
              Our Services
            </h3>

            <ul className="mt-6 space-y-4 text-gray-400">

              <li>US LLC Registration</li>

              <li>UK LTD Registration</li>

              <li>Business Banking</li>

              <li>Payment Gateway Setup</li>

              <li>Tax EIN Assistance</li>

              <li>Business Consulting</li>

            </ul>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-bold">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <a href="#home" className="text-gray-400 hover:text-blue-400">
                  Home
                </a>
              </li>

              <li>
                <a href="#about" className="text-gray-400 hover:text-blue-400">
                  About
                </a>
              </li>

              <li>
                <a href="#services" className="text-gray-400 hover:text-blue-400">
                  Services
                </a>
              </li>

              <li>
                <a href="#faq" className="text-gray-400 hover:text-blue-400">
                  FAQ
                </a>
              </li>

              <li>
                <a href="#contact" className="text-gray-400 hover:text-blue-400">
                  Contact
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold">
              Contact Us
            </h3>

            <div className="mt-6 space-y-4 text-gray-400">

              <p>
                📧 vanguardbusinessservices37@gmail.com
              </p>

              <p>
                💬 Telegram: @vanguardbusinessservices
              </p>

              <p>
                📱 WhatsApp: +1 917 735 9503
              </p>

              <p>
                🌍 Worldwide Online Support
              </p>

            </div>

          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            <p className="text-gray-500">
              © {new Date().getFullYear()} Vanguard Business Services.
              All Rights Reserved.
            </p>

            <div className="flex gap-6 text-sm">

              <a href="#" className="text-gray-400 hover:text-blue-400">
                Privacy Policy
              </a>

              <a href="#" className="text-gray-400 hover:text-blue-400">
                Terms of Service
              </a>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}