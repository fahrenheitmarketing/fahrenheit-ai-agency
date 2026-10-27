import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { escapeHtml, clip } from '../../shared/escapeHtml.ts';

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

    // Save the request to the database
    await base44.asServiceRole.entities.CaseStudyRequest.create({
      email,
      name,
      case_study_id: caseStudyId,
      case_study_title: caseStudyTitle,
      status: 'pending',
    });

    // Notify the team (all request-supplied values are HTML-escaped)
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'rcasas@fahrenheitmarketing.com',
      subject: `Case Study Request: ${caseStudyTitle.replace(/[\r\n]+/g, ' ')}`,
      from_name: 'Fahrenheit Website',
      body: `
        <h2>New Case Study Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name || 'Not provided')}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Case Study:</strong> ${escapeHtml(caseStudyTitle)}</p>
        <p>Please send them the PDF manually.</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('sendCaseStudy error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});