import React, { useState } from 'react';
import { Phone, User, ArrowRight, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function QuickLeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const body = `Quick lead from the Promo page (mobile fast-path).\n\nName: ${name}\nPhone: ${phone}`;
    await base44.integrations.Core.SendEmail({
      to: 'rcasas@fahrenheitmarketing.com',
      subject: `Quick Call Request — ${name}`,
      body,
    });
    await base44.integrations.Core.SendEmail({
      to: 'sbosch@fahrenheitmarketing.com',
      subject: `Quick Call Request — ${name}`,
      body,
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 py-3">
        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
        <span className="text-sm font-body text-foreground">Thanks, {name}! We'll call you within one business day.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          required
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-border bg-background rounded-sm pl-9 pr-3 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <div className="relative flex-1">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          required
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-border bg-background rounded-sm pl-9 pr-3 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-accent text-white text-sm font-body font-medium px-6 py-3 rounded-sm hover:bg-accent/90 active:scale-[0.97] transition-all flex items-center justify-center gap-2 disabled:opacity-60 whitespace-nowrap"
      >
        {submitting ? 'Sending…' : <>Call Me <ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  );
}