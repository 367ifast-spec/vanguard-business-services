// components/Contact.tsx
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
    <section id="contact" className="bg-[#040714] py-24 text-white">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-4xl font-bold text-center">Contact Us</h2>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <input name="from_name" placeholder="Your Name" required className="w-full rounded-xl bg-slate-900 p-4 border border-slate-700"/>
          <input type="email" name="from_email" placeholder="Email" required className="w-full rounded-xl bg-slate-900 p-4 border border-slate-700"/>
          <input name="company" placeholder="Company" className="w-full rounded-xl bg-slate-900 p-4 border border-slate-700"/>

          <select name="service" required className="w-full rounded-xl bg-slate-900 p-4 border border-slate-700">
            <option value="">Select Service</option>
            <option>US LLC Registration</option>
            <option>UK LTD Registration</option>
            <option>EIN Registration</option>
            <option>Business Banking</option>
            <option>Payment Gateway Setup</option>
          </select>

          <textarea
            name="message"
            rows={6}
            required
            placeholder="Your Message"
            className="w-full rounded-xl bg-slate-900 p-4 border border-slate-700"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-4 font-semibold hover:bg-blue-700"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p className="text-center mt-4">{status}</p>
          )}
        </form>
      </div>
    </section>
  );
}
