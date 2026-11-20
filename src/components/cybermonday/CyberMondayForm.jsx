import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { validateLead } from '@/lib/formValidation';
import { getLeadSource } from '@/lib/leadSource';
import HoneypotField from '@/components/shared/HoneypotField';

const OFFERS = ['Email Marketing', 'Managed Hosting', 'Both'];
const inputCls = 'w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors';
const labelCls = 'block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body';

export default function CyberMondayForm() {
  const [form, setForm] = useState({ first: '', last: '', email: '', company: '', website: '', interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: `${form.first.trim()} ${form.last.trim()}`.trim(),
      email: form.email,
      company: form.company,
      website: form.website,
      interest: form.interest,
      message: form.message,
    };
    const err = !form.first.trim() || !form.last.trim()
      ? 'Please fill in all required fields.'
      : validateLead(data, ['name', 'email', 'company', 'website', 'interest']);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await base44.functions.invoke('submitLead', { kind: 'cybermonday', data, hp: e.target.elements.fx_trap_7?.value || '', source: getLeadSource() });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <CheckCircle className="w-12 h-12 text-accent" />
        <p className="text-foreground font-body text-base max-w-sm leading-relaxed">
          Thanks, we've got it. Someone from our team will reach out within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <HoneypotField />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>First name *</label>
          <input type="text" value={form.first} onChange={set('first')} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Last name *</label>
          <input type="text" value={form.last} onChange={set('last')} className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Business email *</label>
        <input type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="you@company.com" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Company *</label>
          <input type="text" value={form.company} onChange={set('company')} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Website *</label>
          <input type="text" value={form.website} onChange={set('website')} className={inputCls} placeholder="yourcompany.com" />
        </div>
      </div>
      <div>
        <label className={labelCls}>Offer *</label>
        <select value={form.interest} onChange={set('interest')} className={inputCls}>
          <option value="">Select an offer</option>
          {OFFERS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label className={labelCls}>Message (optional)</label>
        <textarea rows={4} value={form.message} onChange={set('message')} className={`${inputCls} resize-none`} />
      </div>
      <button type="submit" disabled={submitting}
        className="w-full bg-accent text-white text-sm font-body font-medium px-6 py-4 rounded-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
        {submitting ? 'Sending…' : <>Claim my offer <ArrowRight className="w-4 h-4" /></>}
      </button>
      {error && <p className="text-sm text-destructive text-center" role="alert">{error}</p>}
    </form>
  );
}