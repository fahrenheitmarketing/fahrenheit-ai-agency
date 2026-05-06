import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQSection({ faqs, title = "Frequently Asked Questions" }) {
  const [openIndex, setOpenIndex] = useState(null);

  // Inject FAQ schema into <head>
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(({ question, answer }) => ({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('faq-schema');
      if (existing) existing.remove();
    };
  }, [faqs]);

  return (
    <section className="py-24 px-6 border-b border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="lg:col-span-1 pr-0 lg:pr-16 mb-10 lg:mb-0">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">FAQ</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
              {title}
            </h2>
          </div>
          <div className="lg:col-span-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border-t border-border">
                <button
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="font-heading text-lg font-normal leading-snug group-hover:text-accent transition-colors">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 mt-1 text-accent">
                    {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {openIndex === i && (
                  <div className="pb-6 pr-10">
                    <p className="text-muted-foreground text-sm leading-relaxed font-body">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </div>
    </section>
  );
}