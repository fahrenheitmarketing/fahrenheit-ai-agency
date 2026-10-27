import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { escapeHtml, clip } from '../../shared/escapeHtml.ts';

const RCASAS = 'rcasas@fahrenheitmarketing.com';
const SBOSCH = 'sbosch@fahrenheitmarketing.com';

// Narrow, fixed set of lead forms: each defines its subject prefix, recipients and allowed fields.
const KINDS: Record<string, { title: string; subject: string; to: string[]; fromName: string; fields: [string, string][] }> = {
  contact: {
    title: 'New Contact Submission', subject: 'New Contact Form', to: [RCASAS], fromName: 'Fahrenheit Website',
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
    title: 'New inquiry from the Email Marketing page', subject: 'Email Marketing Inquiry', to: [RCASAS], fromName: 'Fahrenheit Website',
    fields: [['name', 'Name'], ['email', 'Email'], ['company', 'Company'], ['phone', 'Phone'], ['message', 'Message']],
  },
  quick: {
    title: 'Quick lead from the Promo page', subject: 'Get in Touch Request', to: [RCASAS, SBOSCH], fromName: 'Fahrenheit Website',
    fields: [['name', 'Name'], ['email', 'Email'], ['url', 'Business URL']],
  },
};

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const { kind, data } = await req.json().catch(() => ({}));
    const cfg = KINDS[kind];
    if (!cfg || !data || typeof data !== 'object') {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    const values: Record<string, string> = {};
    for (const [key] of cfg.fields) {
      values[key] = clip((data as Record<string, unknown>)[key], key === 'message' ? 3000 : 300);
    }
    if (!values.name || !values.email) {
      return Response.json({ error: 'Name and email are required' }, { status: 400 });
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