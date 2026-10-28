import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { escapeHtml, clip } from '../../shared/escapeHtml.ts';
import { allow, clientIp } from '../../shared/rateLimit.ts';

const RCASAS = 'rcasas@fahrenheitmarketing.com';
const SBOSCH = 'sbosch@fahrenheitmarketing.com';

// Narrow, fixed set of lead forms: each defines its subject prefix, recipients and allowed fields.
const KINDS: Record<string, { title: string; subject: string; to: string[]; fromName: string; fields: [string, string][] }> = {
  contact: {
    title: 'New Contact Submission', subject: 'New Contact Form', to: [RCASAS, SBOSCH], fromName: 'Fahrenheit Website',
    fields: [['name', 'Name'], ['email', 'Email'], ['company', 'Company'], ['phone', 'Phone'], ['service_interest', 'Service Interest'], ['message', 'Message']],
  },
  promo: {
    title: 'New inquiry from the Fahrenheit Promo page', subject: 'Promo Page Inquiry', to: [RCASAS, SBOSCH], fromName: 'Fahrenheit Website',
    fields: [['name', 'Name'], ['email', 'Email'], ['company', 'Company'], ['phone', 'Phone'], ['interest', 'Service Interest'], ['message', 'Message']],
  },
  retainer: {
    title: 'New retainer inquiry from the Fahrenheit Retainer landing page', subject: 'Retainer Inquiry', to: [RCASAS, SBOSCH], fromName: 'Fahrenheit Website',
    fields: [['name', 'Name'], ['email', 'Email'], ['company', 'Company'], ['phone', 'Phone'], ['tier', 'Interested Tier'], ['message', 'Message']],
  },
  website: {
    title: 'New website redesign inquiry from the Fahrenheit Website Redesign landing page', subject: 'Website Redesign Inquiry', to: [RCASAS, SBOSCH], fromName: 'Fahrenheit Website',
    fields: [['name', 'Name'], ['email', 'Email'], ['company', 'Company'], ['phone', 'Phone'], ['website', 'Current Website'], ['message', 'Message']],
  },
  emailMarketing: {
    title: 'New inquiry from the Email Marketing page', subject: 'Email Marketing Inquiry', to: [RCASAS, SBOSCH], fromName: 'Fahrenheit Website',
    fields: [['name', 'Name'], ['email', 'Email'], ['company', 'Company'], ['phone', 'Phone'], ['message', 'Message']],
  },
  quick: {
    title: 'Quick lead from the Promo page', subject: 'Get in Touch Request', to: [RCASAS, SBOSCH], fromName: 'Fahrenheit Website',
    fields: [['name', 'Name'], ['email', 'Email'], ['url', 'Business URL']],
  },
};

const REQUIRED: Record<string, string[]> = {
  contact: ['name', 'email', 'company', 'phone', 'service_interest', 'message'],
  promo: ['name', 'email', 'company', 'phone', 'interest', 'message'],
  retainer: ['name', 'email', 'company', 'phone', 'tier', 'message'],
  website: ['name', 'email', 'company', 'phone', 'message'],
  emailMarketing: ['name', 'email', 'company', 'phone', 'message'],
  quick: ['name', 'email', 'url'],
};

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const { kind, data, hp } = await req.json().catch(() => ({}));
    const cfg = KINDS[kind];
    if (!cfg || !data || typeof data !== 'object') {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }
    // Spam trap filled in: pretend it worked, send nothing.
    if (hp) return Response.json({ success: true });
    if (!(await allow(base44, `lead:${clientIp(req)}`, 5, 3600))) {
      return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const values: Record<string, string> = {};
    for (const [key] of cfg.fields) {
      values[key] = clip((data as Record<string, unknown>)[key], key === 'message' ? 3000 : 300);
    }
    if (!values.name || !values.email) {
      return Response.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const required = REQUIRED[kind];
    const phoneDigits = (values.phone || '').replace(/\D/g, '');
    const valid = required.every((k) => values[k])
      && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)
      && (!required.includes('phone') || (/^[\d\s()+\-.]+$/.test(values.phone) && phoneDigits.length >= 7 && phoneDigits.length <= 15));
    if (!valid) {
      return Response.json({ error: 'Please complete all required fields with a valid email and phone number' }, { status: 400 });
    }

    // Contact submissions are also stored as leads, server-side
    if (kind === 'contact') {
      const SERVICE_INTERESTS = ['seo', 'sem', 'smm', 'cro', 'strategy', 'automation', 'software-development', 'email-marketing', 'hosting', 'general'];
      await base44.asServiceRole.entities.ContactSubmission.create({
        name: values.name,
        email: values.email,
        company: values.company,
        phone: values.phone,
        message: values.message,
        service_interest: SERVICE_INTERESTS.includes(values.service_interest) ? values.service_interest : 'general',
        status: 'new',
      });
    }

    const subject = `${cfg.subject} — ${values.name.replace(/[\r\n]+/g, ' ').slice(0, 100)}${values.company ? ` (${values.company.replace(/[\r\n]+/g, ' ').slice(0, 100)})` : ''}`;
    const rows = cfg.fields
      .map(([key, label]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(values[key] || 'Not provided').replace(/\n/g, '<br/>')}</p>`)
      .join('');
    const body = `<h2>${escapeHtml(cfg.title)}</h2>${rows}`;

    await Promise.all(
      cfg.to.map((to) =>
        base44.asServiceRole.integrations.Core.SendEmail({ to, subject, from_name: cfg.fromName, body })
      )
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error('submitLead error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}