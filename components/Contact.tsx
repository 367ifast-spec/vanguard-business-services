"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_32cpq0v";
const TEMPLATE_ID = "template_f2hiy4a";
const PUBLIC_KEY = "OpbqUmm6TtbySnwTc";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form,
        PUBLIC_KEY
      );

      setStatus("✅ Message sent successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="bg-[#040714] py-24 text-white"
    >
      <div className="mx-auto max-w-3xl px-6">

        <h2 className="text-center text-4xl font-bold">
          Contact Us
        </h2>

        <p className="mt-4 text-center text-gray-300">
          We'd love to hear about your business. Fill out the form below and
          we'll get back to you as soon as possible.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          <div>
            <label
              htmlFor="from_name"
              className="mb-2 block font-medium"
            >
              Full Name
            </label>

            <input
              id="from_name"
              name="from_name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your Name"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="from_email"
              className="mb-2 block font-medium"
            >
              Email Address
            </label>

            <input
              id="from_email"
              name="from_email"
              type="email"
              required
              autoComplete="email"
              placeholder="your@email.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="mb-2 block font-medium"
            >
              Company Name
            </label>

            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Company (Optional)"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="service"
              className="mb-2 block font-medium"
            >
              Select Service
            </label>

            <select
              id="service"
              name="service"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none transition focus:border-blue-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select Service
              </option>

              <option>US LLC Registration</option>
              <option>UK LTD Registration</option>
              <option>EIN Registration</option>
              <option>Business Banking</option>
              <option>Payment Gateway Setup</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-medium"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={6}
              required
              placeholder="Tell us about your project..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none transition focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p
              role="status"
              aria-live="polite"
              className="text-center"
            >
              {status}
            </p>
          )}
        </form>

      </div>
    </section>
  );
}