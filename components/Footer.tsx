import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#05071d] text-white">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
       <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Company */}
          <div>
            <h2 className="text-2xl font-bold">
              Vanguard Business Services
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              Helping entrepreneurs establish companies, business banking,
              payment solutions, and global business growth with professional
              guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-gray-400">
              <li>
                <Link href="/#home" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/#about" className="hover:text-white">
                  About
                </Link>
              </li>

              <li>
                <Link href="/#services" className="hover:text-white">
                  Services
                </Link>
              </li>

              <li>
                <Link href="/#contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold">
              Core Services
            </h3>

            <ul className="mt-5 space-y-3 text-gray-400">
              <li>
                <Link
                  href="/services/us-llc-registration"
                  className="hover:text-white"
                >
                  US LLC Registration
                </Link>
              </li>

              <li>
                <Link
                  href="/services/uk-ltd-registration"
                  className="hover:text-white"
                >
                  UK LTD Registration
                </Link>
              </li>

              <li>
                <Link
                  href="/services/business-banking"
                  className="hover:text-white"
                >
                  Business Banking
                </Link>
              </li>

              <li>
                <Link
                  href="/services/ein-registration"
                  className="hover:text-white"
                >
                  EIN Registration
                </Link>
              </li>
            </ul>
          </div>
{/* Latest Posts */}
<div>
  <h3 className="text-lg font-semibold">
    Latest Posts
  </h3>

  <ul className="mt-5 space-y-3 text-gray-400">
    <li>
      <Link
        href="/blog/stripe-atlas-review"
        className="hover:text-white"
      >
        Stripe Atlas Review
      </Link>
    </li>

    <li>
      <Link
        href="/blog/mercury-bank-review"
        className="hover:text-white"
      >
        Mercury Bank Review
      </Link>
    </li>

    <li>
      <Link
        href="/blog/payoneer-vs-wise"
        className="hover:text-white"
      >
        Payoneer vs Wise
      </Link>
    </li>

    <li>
      <Link
        href="/blog/remote-business-banking-guide"
        className="hover:text-white"
      >
        Remote Banking Guide
      </Link>
    </li>

    <li>
      <Link
        href="/blog/best-countries-for-online-business"
        className="hover:text-white"
      >
        Best Countries for Business
      </Link>
    </li>
  </ul>
</div>
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">
              Contact
            </h3>

            <ul className="mt-5 space-y-3 text-gray-400">
              <li>📧 vanguardbusinessservices37@gmail.com</li>
              <li>💬 @vanguardbusinessservices</li>
              <li>📱 +1 917 735 9503</li>
              <li>🎮 vanguardbusinessservices</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">

          <p>
            © {year} Vanguard Business Services. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6">

            <Link
              href="/privacy-policy"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="/refund-policy"
              className="hover:text-white"
            >
              Refund Policy
            </Link>

            <Link
              href="/cookie-policy"
              className="hover:text-white"
            >
              Cookie Policy
            </Link>

          </div>

        </div>
      </div>
    </footer>
  );
}