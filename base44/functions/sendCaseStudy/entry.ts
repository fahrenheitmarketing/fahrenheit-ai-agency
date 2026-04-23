import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const PDF_MAP = {
  1: 'https://media.base44.com/files/public/69e6c4bd9bbd15c86a9a4b38/6e5c9e1fd_ProfessionalServices_HouseholdCleaning.pdf',
  2: 'https://media.base44.com/files/public/69e6c4bd9bbd15c86a9a4b38/21fc659e4_ProfessionalServices_DentalOffice1.pdf',
  3: 'https://media.base44.com/files/public/69e6c4bd9bbd15c86a9a4b38/6fd0a3b0d_FMCaseStudy-FromInvisibletoIn-Demand-BuildingOrganicSearchVisibilityforaMulti-LocationAcuteCareNetwork1.pdf',
  4: 'https://media.base44.com/files/public/69e6c4bd9bbd15c86a9a4b38/db5e758bc_Done-inOne90-DayCaseStudy1.pdf',
  5: 'https://media.base44.com/files/public/69e6c4bd9bbd15c86a9a4b38/b2d914ca0_Temecula-90-DayCaseStudy1.pdf',
  6: 'https://media.base44.com/files/public/69e6c4bd9bbd15c86a9a4b38/08bbbee3c_HealthyPet-90-Day-Case-Study-v2.pdf',
  7: 'https://media.base44.com/files/public/69e6c4bd9bbd15c86a9a4b38/b5dff69c1_NorthernReflectionsCaseStudy1.pdf',
};

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const { email, caseStudyId, caseStudyTitle } = await req.json();

  if (!email || !caseStudyId) {
    return Response.json({ error: 'Missing email or caseStudyId' }, { status: 400 });
  }

  const pdfUrl = PDF_MAP[caseStudyId];
  if (!pdfUrl) {
    return Response.json({ error: 'Case study not found' }, { status: 404 });
  }

  await base44.asServiceRole.integrations.Core.SendEmail({
    to: email,
    subject: `Fahrenheit Marketing Case Study: ${caseStudyTitle}`,
    from_name: 'Fahrenheit Marketing',
    body: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #1c1917;">
        <h2 style="font-size: 24px; font-weight: 400; margin-bottom: 16px;">Your Case Study is Ready</h2>
        <p style="color: #78716c; line-height: 1.6; margin-bottom: 24px;">
          Thank you for your interest in <strong>${caseStudyTitle}</strong>. 
          You can download the full case study using the link below.
        </p>
        <a href="${pdfUrl}" 
           style="display: inline-block; background: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: 500;">
          Download Case Study PDF →
        </a>
        <p style="color: #a8a29e; font-size: 12px; margin-top: 32px; line-height: 1.6;">
          Questions? Reply to this email or call us at 512-206-4220.<br/>
          Fahrenheit Marketing · Austin, Texas · fahrenheitmarketing.com
        </p>
      </div>
    `,
  });

  return Response.json({ success: true });
});