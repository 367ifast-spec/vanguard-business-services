"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "How long does company registration take?",
      answer:
        "Processing time depends on the jurisdiction and documentation. We guide you through each step and keep you informed throughout the process.",
    },
    {
      question: "Do you help international clients?",
      answer:
        "Yes. We assist entrepreneurs and businesses from many countries with company formation and related business services.",
    },
    {
      question: "Can you help with business banking?",
      answer:
        "We provide guidance for eligible business banking solutions and help you understand the required documentation.",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "Yes. Our team continues to support clients with business-related questions after the initial setup.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply contact us through our website. We'll discuss your business goals and recommend the most suitable solution.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <section
        id="faq"
        className="relative bg-[#05071d] py-28 text-white"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
              FAQ
            </span>

            <h2 className="mt-8 text-5xl font-bold">
              Frequently Asked Questions
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Find answers to the most common questions about our business
              registration and support services.
            </p>
          </div>

          <div className="mt-16 space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <button
                  onClick={() => setOpen(open === index ? null : index)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >
                  <span className="text-lg font-semibold">
                    {faq.question}
                  </span>

                  <span className="text-2xl text-blue-400">
                    {open === index ? "−" : "+"}
                  </span>
                </button>

                {open === index && (
                  <div className="border-t border-white/10 px-8 py-6 leading-8 text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}