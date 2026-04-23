import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, name, caseStudyId, caseStudyTitle } = await req.json();

    if (!email || !caseStudyId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save the request to the database
    await base44.asServiceRole.entities.CaseStudyRequest.create({
      email,
      name: name || '',
      case_study_id: String(caseStudyId),
      case_study_title: caseStudyTitle,
      status: 'pending',
    });

    // Notify the team
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'rcasas@fahrenheitmarketing.com',
      subject: `Case Study Request: ${caseStudyTitle}`,
      from_name: 'Fahrenheit Website',
      body: `
        <h2>New Case Study Request</h2>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Case Study:</strong> ${caseStudyTitle}</p>
        <p>Please send them the PDF manually.</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});