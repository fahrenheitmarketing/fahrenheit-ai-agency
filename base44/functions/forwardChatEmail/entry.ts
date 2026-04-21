import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { visitor_name, visitor_email, visitor_company, transcript, page_source } = await req.json();

    // Save interaction to entity
    await base44.asServiceRole.entities.ChatInteraction.create({
      visitor_name: visitor_name || 'Anonymous',
      visitor_email: visitor_email || 'Not provided',
      visitor_company: visitor_company || 'Not provided',
      full_transcript: transcript,
      page_source: page_source || 'Unknown',
      status: 'new',
      conversation_summary: `Chat from ${visitor_name || 'Anonymous'} (${visitor_company || 'Unknown company'}) on ${page_source || 'unknown page'}`
    });

    // Forward via email
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'rcasas@fahrenheitmarketing.com',
      subject: `New Chat Lead: ${visitor_name || 'Anonymous'} - ${visitor_company || 'Unknown Company'}`,
      from_name: 'Fahrenheit AI Assistant',
      body: `
        <h2>New AI Chat Interaction</h2>
        <p><strong>Name:</strong> ${visitor_name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${visitor_email || 'Not provided'}</p>
        <p><strong>Company:</strong> ${visitor_company || 'Not provided'}</p>
        <p><strong>Page:</strong> ${page_source || 'Unknown'}</p>
        <hr/>
        <h3>Conversation Transcript:</h3>
        <pre style="white-space: pre-wrap; font-family: sans-serif;">${transcript}</pre>
      `
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});