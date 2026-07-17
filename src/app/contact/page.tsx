import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Phone,
  MessageCircle,
  Building2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Vanguard Business Services",
  description:
    "Contact Vanguard Business Services for US LLC Registration, UK LTD Registration, EIN, Stripe, Wise, Payoneer, and Business Banking services.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Contact Vanguard Business Services
          </h1>

          <p className="mt-6 text-lg text-slate-300">
            Have questions about US LLC Registration, UK LTD Registration,
            Business Banking, Stripe, Wise, or Payoneer? Our team is ready to
            help you build and grow your business worldwide.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {/* Email */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:border-blue-500">
            <Mail className="h-8 w-8 text-blue-400" />

            <h2 className="mt-4 text-2xl font-semibold">Email</h2>

            <p className="mt-3 text-slate-400">
              Send us an email and we'll get back to you as soon as possible.
            </p>

            <a
              href="mailto:vanguardbusinessservices37@gmail.com"
              className="mt-6 block text-blue-400 hover:text-blue-300"
            >
              vanguardbusinessservices37@gmail.com
            </a>
          </div>

          {/* WhatsApp */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:border-blue-500">
            <Phone className="h-8 w-8 text-blue-400" />

            <h2 className="mt-4 text-2xl font-semibold">WhatsApp</h2>

            <p className="mt-3 text-slate-400">
              Talk directly with our support team on WhatsApp.
            </p>

            <a
              href="https://wa.me/19177359503"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-blue-400 hover:text-blue-300"
            >
              +1 (917) 735-9503
            </a>
          </div>

          {/* Telegram */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:border-blue-500">
            <MessageCircle className="h-8 w-8 text-blue-400" />

            <h2 className="mt-4 text-2xl font-semibold">Telegram</h2>

            <p className="mt-3 text-slate-400">
              Join our Telegram channel for quick support and updates.
            </p>

            <a
              href="https://t.me/vanguardbusinessservices"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-blue-400 hover:text-blue-300"
            >
              @vanguardbusinessservices
            </a>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-16 rounded-3xl border border-slate-800 bg-slate-900 p-10">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-blue-400" />
            <h2 className="text-3xl font-bold">Our Services</h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "US LLC Registration",
              "UK LTD Registration",
              "Business Banking",
              "EIN Registration",
              "Stripe Business Setup",
              "Wise Business Setup",
              "Payoneer Business Setup",
              "PayPal Business Setup",
            ].map((service) => (
              <div
                key={service}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-slate-300"
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-center">
          <h2 className="text-3xl font-bold">
            Ready to Launch Your Business?
          </h2>

          <p className="mt-4 text-lg text-slate-100">
            Start your journey with Vanguard Business Services today.
          </p>

          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:scale-105"
          >
            Explore Services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}