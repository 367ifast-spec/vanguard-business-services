"use client";

import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully!");
        setForm({
          name: "",
          email: "",
          company: "",
          service: "",
          message: "",
        });
      } else {
        alert("Something went wrong.");
      }
    } catch {
      alert("Server error.");
    }

    setLoading(false);
  }

  const contacts = [
    ["📧","Email","vanguardbusinessservices37@gmail.com"],
    ["💬","Telegram","@vanguardbusinessservices"],
    ["📱","WhatsApp","+1 917 735 9503"],
    ["🌍","Coverage","Worldwide"],
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0b1023] py-28 text-white">
      <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm tracking-[0.3em] text-blue-400">CONTACT US</span>
          <h2 className="mt-6 text-5xl font-bold">Let's Build Your Business</h2>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Tell us about your project and we'll help you choose the right business solution.
          </p>

          <div className="mt-10 space-y-5">
            {contacts.map(([i,t,v])=>(
              <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <div className="text-2xl">{i}</div>
                <h3 className="mt-2 font-semibold">{t}</h3>
                <p className="text-gray-400">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="grid gap-5 md:grid-cols-2">
            <input className="rounded-xl bg-[#0b1023] px-5 py-4 outline-none" placeholder="Your Name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            <input type="email" className="rounded-xl bg-[#0b1023] px-5 py-4 outline-none" placeholder="Email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <input className="rounded-xl bg-[#0b1023] px-5 py-4 outline-none" placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/>
            <input className="rounded-xl bg-[#0b1023] px-5 py-4 outline-none" placeholder="Service Required" value={form.service} onChange={e=>setForm({...form,service:e.target.value})}/>
          </div>
          <textarea rows={6} className="mt-5 w-full rounded-xl bg-[#0b1023] px-5 py-4 outline-none" placeholder="Message" required value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
          <button disabled={loading} className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-bold transition hover:opacity-90">
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
