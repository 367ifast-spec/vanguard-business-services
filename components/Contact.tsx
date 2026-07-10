"use client";

import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    const form = e.currentTarget;

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.get("from_name"),
          email: formData.get("from_email"),
          company: formData.get("company"),
          service: formData.get("service"),

          country: "",
          whatsapp: "",
          website: "",

          budget: "",
          contactMethod: "Email",

          projectDetails: formData.get("message"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Request failed."
        );
      }

      setStatus("✅ Message sent successfully!");

      form.reset();

    } catch (error) {

      console.error(error);

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
      We'd love to hear about your business.
      Fill out the form below and our team
      will contact you shortly.
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
          placeholder="Your Name"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none focus:border-blue-500"
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
          placeholder="your@email.com"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none focus:border-blue-500"
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
          placeholder="Company (Optional)"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none focus:border-blue-500"
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
          defaultValue=""
          className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none focus:border-blue-500"
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
          className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {status && (
        <p
          className="text-center font-medium"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
      )}
          </form>

  </div>

</section>

  );
}