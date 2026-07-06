export default function FAQ() {
  const faqs = [
    {
      q: "How long does US LLC registration take?",
      a: "Usually 1–5 business days depending on the state.",
    },
    {
      q: "Do you help with UK LTD registration?",
      a: "Yes, we provide complete UK LTD registration support.",
    },
    {
      q: "Can you help with payment gateway setup?",
      a: "Yes, we assist with legal payment solution setup where applicable.",
    },
  ];

  return (
    <section className="bg-[#0f172a] py-20 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-700 bg-[#121a2f] p-6"
            >
              <h3 className="text-xl font-semibold">{faq.q}</h3>
              <p className="mt-3 text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}