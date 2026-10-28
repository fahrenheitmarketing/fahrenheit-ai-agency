import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

import HoneypotField from '@/components/shared/HoneypotField';

export default function EmailHeroForm() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.functions.invoke('submitLead', { kind: 'emailMarketing', data: formData, hp: e.target.elements.fx_trap_7?.value || '' });
    setSubmitted(true);
    setSubmitting(false);
  };

  const inputClass = "w-full border border-border bg-background rounded-md px-4 py-2.5 text-sm font-body focus:outline-none focus:border-accent transition-colors";
  const labelClass = "block text-xs uppercase tracking-widest text-muted-foreground mb-1.5 font-body";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <CheckCircle className="w-12 h-12 text-accent" />
        <h3 className="font-heading text-2xl font-normal">We've got your message.</h3>
        <p className="text-muted-foreground font-body text-sm max-w-xs leading-relaxed">
          Someone from our team will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <HoneypotField />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name *</label>
          <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="you@company.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Company</label>
          <input type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className={inputClass} placeholder="Company name" />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputClass} placeholder="(512) 000-0000" />
        </div>
      </div>
      <div>
        <label className={labelClass}>What are you looking for?</label>
        <textarea rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className={`${inputClass} resize-none`} placeholder="Tell us about your outreach goals" />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-accent text-white text-sm font-body font-medium px-6 py-3.5 rounded-md hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {submitting ? 'Sending…' : <>Get Started <ArrowRight className="w-4 h-4" /></>}
      </button>
      <p className="text-xs text-muted-foreground font-body text-center">
        We'll respond within one business day.
      </p>
    </form>
  );
}