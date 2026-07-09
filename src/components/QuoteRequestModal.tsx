"use client";

import { useState } from "react";

type FormData = {
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  businessName: string;
  website: string;
  service: string;
  budget: string;
  contactMethod: string;
  projectDetails: string;
  agree: boolean;
};

const services = [
  "US LLC Registration",
  "UK LTD Registration",
  "EIN Registration",
  "Business Banking",
  "Wise Business",
  "Payoneer Business",
  "Stripe Business",
  "PayPal Business",
  "Other",
];

const budgets = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "Custom Quote",
];

const contactMethods = [
  "WhatsApp",
  "Email",
  "Telegram",
];

export default function QuoteRequestModal() {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    whatsapp: "",
    country: "",
    businessName: "",
    website: "",
    service: "",
    budget: "",
    contactMethod: "WhatsApp",
    projectDetails: "",
    agree: false,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCheckbox(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((prev) => ({
      ...prev,
      agree: e.target.checked,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!form.agree) {
      setError(
        "You must agree to the Account Delivery Policy."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          company: form.businessName,
          service: form.service,

          message: `
Country: ${form.country}

WhatsApp: ${form.whatsapp}

Website: ${form.website}

Budget: ${form.budget}

Preferred Contact: ${form.contactMethod}

Project Details:

${form.projectDetails}
          `,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Submission failed."
        );
      }

      setSuccess(
        "Your request has been submitted successfully."
      );

      setForm({
        fullName: "",
        email: "",
        whatsapp: "",
        country: "",
        businessName: "",
        website: "",
        service: "",
        budget: "",
        contactMethod: "WhatsApp",
        projectDetails: "",
        agree: false,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">

      <div className="mb-10">

        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-400">
          Free Consultation
        </span>

        <h2 className="mt-6 text-4xl font-bold text-white">
          Request Your Custom Quote
        </h2>

        <p className="mt-4 max-w-3xl leading-8 text-gray-400">
          Complete the form below and our specialists
          will review your requirements before providing
          a customized quotation.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >        {/* Personal Information */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Full Name *
            </label>

            <input
              type="text"
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#0b1126] px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email Address *
            </label>

            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#0b1126] px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              WhatsApp Number *
            </label>

            <input
              type="text"
              name="whatsapp"
              required
              value={form.whatsapp}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#0b1126] px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Country *
            </label>

            <input
              type="text"
              name="country"
              required
              value={form.country}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#0b1126] px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Business Information */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Business Name
            </label>

            <input
              type="text"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#0b1126] px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Website (Optional)
            </label>

            <input
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#0b1126] px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Service */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Requested Service *
            </label>

            <select
              required
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#0b1126] px-4 py-3"
            >
              <option value="">Select Service</option>

              {services.map((service) => (
                <option
                  key={service}
                  value={service}
                >
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Estimated Budget
            </label>

            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#0b1126] px-4 py-3"
            >
              <option value="">
                Select Budget
              </option>

              {budgets.map((budget) => (
                <option
                  key={budget}
                  value={budget}
                >
                  {budget}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Preferred Contact */}

        <div>

          <label className="mb-2 block font-medium">
            Preferred Contact Method
          </label>

          <select
            name="contactMethod"
            value={form.contactMethod}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-[#0b1126] px-4 py-3"
          >
            {contactMethods.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

        </div>

        {/* Project */}

        <div>

          <label className="mb-2 block font-medium">
            Project Details *
          </label>

          <textarea
            required
            rows={7}
            name="projectDetails"
            value={form.projectDetails}
            onChange={handleChange}
            placeholder="Describe your business, goals, country and the assistance you need."
            className="w-full rounded-xl border border-white/10 bg-[#0b1126] px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>        {/* Account Delivery Policy */}

        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">

          <h3 className="text-xl font-bold text-yellow-400">
            Account Delivery Policy
          </h3>

          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-300">

            <p>
              For account-related services, clients are responsible for
              reviewing and verifying all delivered account details
              immediately upon delivery.
            </p>

            <p>
              Once the client confirms that the account has been received
              and is functioning as agreed, the order will be considered
              successfully completed.
            </p>

            <p>
              After confirmation, no warranty, guarantee, replacement,
              refund, or free support will be provided for issues arising
              from password changes, security settings, third-party
              platform actions, policy updates, account suspension,
              user misuse, or any modifications made after delivery.
            </p>

            <p className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-blue-200">
              <strong>Note:</strong> Policies may vary depending on the
              selected service. Any additional service-specific terms and
              conditions will be clearly communicated and agreed upon
              before the order is finalized.
            </p>

          </div>

        </div>

        {/* Privacy */}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

          <h3 className="text-lg font-semibold">
            Privacy Notice
          </h3>

          <p className="mt-3 text-sm leading-7 text-gray-400">
            Your information is used solely to review your inquiry,
            prepare your quotation, and communicate regarding your
            requested services. We do not sell or share your personal
            information except where necessary to provide the requested
            service or comply with applicable laws.
          </p>

        </div>

        {/* Agreement */}

        <label className="flex items-start gap-3 rounded-xl border border-white/10 p-4">

          <input
            type="checkbox"
            checked={form.agree}
            onChange={handleCheckbox}
            className="mt-1 h-5 w-5"
          />

          <span className="text-sm leading-7 text-gray-300">
            I have read, understood and agree to the Account Delivery
            Policy, Privacy Notice and Terms & Conditions.
          </span>

        </label>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-300">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Submitting Request..."
            : "Request Free Consultation"}
        </button>

            </form>
    </section>
  );
}