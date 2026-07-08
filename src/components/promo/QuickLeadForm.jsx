import React, { useState } from 'react';
import { Mail, User, ArrowRight, CheckCircle, Globe } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function QuickLeadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const body = `Quick lead from the Promo page (mobile fast-path).\n\nName: ${name}\nEmail: ${email}\nBusiness URL: ${url}`;
    await base44.integrations.Core.SendEmail({
      to: 'rcasas@fahrenheitmarketing.com',
      subject: `Get in Touch Request — ${name}`,
      body,
    });
    await base44.integrations.Core.SendEmail({
      to: 'sbosch@fahrenheitmarketing.com',
      subject: `Get in Touch Request — ${name}`,
      body,
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 py-3">
        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
        <span className="text-sm font-body text-foreground">Thanks, {name}! We'll be in touch within one business day.</span>
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
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-border bg-background rounded-sm pl-9 pr-3 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <div className="relative flex-1">
        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          required
          type="url"
          placeholder="Business URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-border bg-background rounded-sm pl-9 pr-3 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-accent text-white text-sm font-body font-medium px-6 py-3 rounded-sm hover:bg-accent/90 active:scale-[0.97] transition-all flex items-center justify-center gap-2 disabled:opacity-60 whitespace-nowrap"
      >
        {submitting ? 'Sending…' : <>Get in Touch <ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  );
}