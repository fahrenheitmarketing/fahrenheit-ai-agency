import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function RetainerLeadForm() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', tier: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const body = `New retainer inquiry from the Fahrenheit Retainer landing page.\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || '—'}\nPhone: ${formData.phone || '—'}\nInterested Tier: ${formData.tier || '—'}\n\nMessage:\n${formData.message || '—'}`;
    await Promise.all([
      base44.integrations.Core.SendEmail({ to: 'rcasas@fahrenheitmarketing.com', subject: `Retainer Inquiry — ${formData.name} (${formData.company || 'No company'})`, body }),
      base44.integrations.Core.SendEmail({ to: 'sbosch@fahrenheitmarketing.com', subject: `Retainer Inquiry — ${formData.name} (${formData.company || 'No company'})`, body }),
    ]);
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <CheckCircle className="w-12 h-12 text-accent" />
        <h3 className="font-heading text-2xl font-normal text-foreground">We've got your message.</h3>
        <p className="text-muted-foreground font-body text-sm max-w-xs leading-relaxed">Someone from our team will be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">Name *</label>
          <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">Email *</label>
          <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors" placeholder="you@company.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">Company</label>
          <input type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
            className="w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors" placeholder="Company name" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">Phone</label>
          <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors" placeholder="(512) 000-0000" />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">Which retainer interests you?</label>
        <select value={formData.tier} onChange={e => setFormData({ ...formData, tier: e.target.value })}
          className="w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body text-foreground focus:outline-none focus:border-accent transition-colors" style={{ color: 'hsl(18 12% 11%)' }}>
          <option value="">Select an option…</option>
          <option value="Growth Retainer ($1,500/mo)">Growth Retainer — From $1,500/mo</option>
          <option value="Scale Retainer ($3,500/mo)">Scale Retainer — From $3,500/mo</option>
          <option value="Enterprise Retainer">Enterprise Retainer — Custom</option>
          <option value="Not Sure Yet">Not Sure Yet</option>
        </select>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">Tell us about your business</label>
        <textarea rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
          className="w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="What are your current marketing goals, and where are you seeing the biggest challenges?" />
      </div>
      <button type="submit" disabled={submitting}
        className="w-full bg-accent text-white text-sm font-body font-medium px-6 py-4 rounded-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
        {submitting ? 'Sending…' : <>Get My Free Consultation <ArrowRight className="w-4 h-4" /></>}
      </button>
      <p className="text-xs text-muted-foreground font-body text-center">We'll respond within one business day.</p>
    </form>
  );
}