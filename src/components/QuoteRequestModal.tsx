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

export default function QuoteRequestModal() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<FormData>({
    fullName:"",
    email:"",
    whatsapp:"",
    country:"",
    businessName:"",
    website:"",
    service:"",
    budget:"",
    contactMethod:"WhatsApp",
    projectDetails:"",
    agree:false,
  });

  function update(name: keyof FormData, value: string | boolean) {
    setForm(prev => ({...prev,[name]: value}));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.agree) {
      setMessage("Please accept the Account Delivery Policy.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/contact",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          name: form.fullName,
          email: form.email,
          company: form.businessName,
          service: form.service,
          message:
`Country: ${form.country}
WhatsApp: ${form.whatsapp}
Website: ${form.website}
Budget: ${form.budget}
Preferred Contact: ${form.contactMethod}

Project Details:
${form.projectDetails}`
        })
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.message || "Request failed");
      }

      setMessage("Your consultation request has been submitted successfully.");

      setForm({
        fullName:"",
        email:"",
        whatsapp:"",
        country:"",
        businessName:"",
        website:"",
        service:"",
        budget:"",
        contactMethod:"WhatsApp",
        projectDetails:"",
        agree:false,
      });

    } catch(err){
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    } finally{
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-4xl font-bold">Request Free Consultation</h2>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">

        <input className="w-full rounded-xl p-3 bg-[#0b1126]" placeholder="Full Name *"
          value={form.fullName}
          onChange={e=>update("fullName",e.target.value)} required />

        <input className="w-full rounded-xl p-3 bg-[#0b1126]" type="email" placeholder="Email *"
          value={form.email}
          onChange={e=>update("email",e.target.value)} required />

        <input className="w-full rounded-xl p-3 bg-[#0b1126]" placeholder="WhatsApp *"
          value={form.whatsapp}
          onChange={e=>update("whatsapp",e.target.value)} required />

        <input className="w-full rounded-xl p-3 bg-[#0b1126]" placeholder="Country *"
          value={form.country}
          onChange={e=>update("country",e.target.value)} required />

        <input className="w-full rounded-xl p-3 bg-[#0b1126]" placeholder="Business Name"
          value={form.businessName}
          onChange={e=>update("businessName",e.target.value)} />

        <input className="w-full rounded-xl p-3 bg-[#0b1126]" placeholder="Website (Optional)"
          value={form.website}
          onChange={e=>update("website",e.target.value)} />

        <select className="w-full rounded-xl p-3 bg-[#0b1126]"
          value={form.service}
          onChange={e=>update("service",e.target.value)} required>
          <option value="">Select Service</option>
          {services.map(s=><option key={s}>{s}</option>)}
        </select>

        <select className="w-full rounded-xl p-3 bg-[#0b1126]"
          value={form.budget}
          onChange={e=>update("budget",e.target.value)}>
          <option value="">Select Budget</option>
          {budgets.map(b=><option key={b}>{b}</option>)}
        </select>

        <textarea rows={6}
          className="w-full rounded-xl p-3 bg-[#0b1126]"
          placeholder="Project Details"
          value={form.projectDetails}
          onChange={e=>update("projectDetails",e.target.value)}
          required />

        <div className="rounded-xl border border-yellow-500/30 p-4 text-sm">
          <strong>Account Delivery Policy</strong>
          <p className="mt-2">
            Clients must verify delivered account details immediately after delivery.
            Once confirmed, the order is considered completed. No warranty,
            guarantee, replacement or refund is provided for issues arising after
            confirmation due to password changes, platform actions, policy updates,
            user modifications or misuse.
          </p>
          <p className="mt-2">
            <strong>Note:</strong> Policies may vary depending on the selected service.
            Additional service-specific terms will be communicated before the order is finalized.
          </p>
        </div>

        <label className="flex gap-3">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={e=>update("agree",e.target.checked)}
          />
          <span>I have read and agree to the Account Delivery Policy and Terms & Conditions.</span>
        </label>

        {message && <div>{message}</div>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold">
          {loading ? "Submitting..." : "Request Free Consultation"}
        </button>

      </form>
    </section>
  );
}
