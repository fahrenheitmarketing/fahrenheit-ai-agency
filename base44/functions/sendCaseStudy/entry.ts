import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { escapeHtml, clip } from '../../shared/escapeHtml.ts';
import { allow, clientIp } from '../../shared/rateLimit.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const email = clip(body.email, 200);
    const name = clip(body.name, 200);
    const caseStudyId = clip(body.caseStudyId, 100);
    const caseStudyTitle = clip(body.caseStudyTitle, 300);

    if (!email || !caseStudyId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Spam trap filled in: pretend it worked, do nothing.
    if (body.hp) return Response.json({ success: true });
    if (!(await allow(base44, `case:${clientIp(req)}`, 3, 3600))) {
      return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }
    // Same email asking for the same case study again: already recorded and sent to the team.
    const dup = await base44.asServiceRole.entities.CaseStudyRequest.filter({ email, case_study_id: caseStudyId });
    if ((Array.isArray(dup) ? dup : dup?.items || []).length > 0) return Response.json({ success: true });

    // Save the request to the database
    await base44.asServiceRole.entities.CaseStudyRequest.create({
      email,
      name,
      case_study_id: caseStudyId,
      case_study_title: caseStudyTitle,
      status: 'pending',
    });

    // Notify the team (all request-supplied values are HTML-escaped)
    const notifyBody = `
      <h2>New Case Study Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name || 'Not provided')}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Case Study:</strong> ${escapeHtml(caseStudyTitle)}</p>
      <p>Please send them the PDF manually.</p>
    `;
    await Promise.all(
      ['rcasas@fahrenheitmarketing.com', 'sbosch@fahrenheitmarketing.com'].map((to) =>
        base44.asServiceRole.integrations.Core.SendEmail({
          to,
          subject: `Case Study Request: ${caseStudyTitle.replace(/[\r\n]+/g, ' ')}`,
          from_name: 'Fahrenheit Website',
          body: notifyBody,
        })
      )
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error('sendCaseStudy error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});