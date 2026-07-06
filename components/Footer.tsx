export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#05071d] border-t border-white/10 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Company */}

          <div>
            <h2 className="text-2xl font-bold">
              Vanguard Business Services
            </h2>

            <p className="mt-5 text-gray-400 leading-8">
              Helping entrepreneurs worldwide establish companies,
              business banking, payment solutions, and global business
              expansion with professional support.
            </p>
          </div>

          {/* Services */}

          <div>
            <h3 className="text-xl font-semibold">
              Services
            </h3>

            <ul className="mt-5 space-y-3 text-gray-400">

              <li>US LLC Registration</li>

              <li>UK LTD Registration</li>

              <li>Business Banking</li>

              <li>Payment Gateway Setup</li>

              <li>Business Consultation</li>

            </ul>
          </div>

          {/* Company */}

          <div>
            <h3 className="text-xl font-semibold">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-gray-400">

              <li>About Us</li>

              <li>Reviews</li>

              <li>FAQ</li>

              <li>Contact</li>

              <li>Privacy Policy</li>

            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-xl font-semibold">
              Contact
            </h3>

            <ul className="mt-5 space-y-4 text-gray-400">

              <li>
                📧 vanguardbusinessservices37@gmail.com
              </li>

              <li>
                💬 Telegram: @vanguardbusinessservices
              </li>

              <li>
                📱 WhatsApp: +1 917 735 9503
              </li>

              <li>
                🎮 Discord: vanguardbusinessservices
              </li>

            </ul>
          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-gray-500">

          © {year} Vanguard Business Services.
          All Rights Reserved.

        </div>

      </div>
    </footer>
  );
}