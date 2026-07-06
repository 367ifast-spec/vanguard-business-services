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
        headers: {
          "Content-Type": "application/json",
        },
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
      alert("Server Error");
    }

    setLoading(false);
  }

  return (
    <section
      id="contact"
      className="bg-[#0b1023] py-28 text-white"
    >
      <div className="mx-auto max-w-4xl px-6">

        <div className="text-center">

          <span className="text-sm uppercase tracking-[0.3em] text-blue-400">
            CONTACT US
          </span>

          <h2 className="mt-4 text-5xl font-bold">
            Let's Work Together
          </h2>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-16 space-y-6 rounded-3xl border border-white/10 bg-[#11172d] p-10"
        >

          <input
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full rounded-xl bg-[#0b1023] px-5 py-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full rounded-xl bg-[#0b1023] px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Company Name"
            value={form.company}
            onChange={(e) =>
              setForm({
                ...form,
                company: e.target.value,
              })
            }
            className="w-full rounded-xl bg-[#0b1023] px-5 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Service Required"
            value={form.service}
            onChange={(e) =>
              setForm({
                ...form,
                service: e.target.value,
              })
            }
            className="w-full rounded-xl bg-[#0b1023] px-5 py-4 outline-none"
          />

          <textarea
            rows={6}
            placeholder="Your Message"
            required
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
            className="w-full rounded-xl bg-[#0b1023] px-5 py-4 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-4 text-lg font-bold transition hover:bg-blue-700"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>
    </section>
  );
}