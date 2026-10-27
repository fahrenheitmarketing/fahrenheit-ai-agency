import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { escapeHtml, clip } from '../../shared/escapeHtml.ts';
import { allow } from '../../shared/rateLimit.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const visitor_name = clip(body.visitor_name, 200);
    const visitor_email = clip(body.visitor_email, 200);
    const visitor_company = clip(body.visitor_company, 200);
    const transcript = clip(body.transcript, 20000);
    const page_source = clip(body.page_source, 300);

    if (!transcript) {
      return Response.json({ error: 'Missing transcript' }, { status: 400 });
    }

    // Only a real chat (conversation id + its secret token) may forward a transcript
    const conversationId = clip(body.conversationId, 200);
    const chatToken = clip(body.chatToken, 200);
    if (!conversationId || !chatToken) {
      return Response.json({ error: 'Missing conversationId or chatToken' }, { status: 400 });
    }
    const conversation = await base44.asServiceRole.agents.getConversation(conversationId).catch(() => null);
    if (!conversation?.metadata?.chatToken || conversation.metadata.chatToken !== chatToken) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
    // One forwarded transcript per conversation
    if (!(await allow(base44, `fwd:${conversationId}`, 1, 86400))) {
      return Response.json({ error: 'Already forwarded' }, { status: 429 });
    }

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

    // Forward via email (all visitor-supplied values are HTML-escaped)
    const subjectName = (visitor_name || 'Anonymous').replace(/[\r\n]+/g, ' ');
    const subjectCompany = (visitor_company || 'Unknown Company').replace(/[\r\n]+/g, ' ');
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'rcasas@fahrenheitmarketing.com',
      subject: `New Chat Lead: ${subjectName} - ${subjectCompany}`,
      from_name: 'Fahrenheit AI Assistant',
      body: `
        <h2>New AI Chat Interaction</h2>
        <p><strong>Name:</strong> ${escapeHtml(visitor_name || 'Not provided')}</p>
        <p><strong>Email:</strong> ${escapeHtml(visitor_email || 'Not provided')}</p>
        <p><strong>Company:</strong> ${escapeHtml(visitor_company || 'Not provided')}</p>
        <p><strong>Page:</strong> ${escapeHtml(page_source || 'Unknown')}</p>
        <hr/>
        <h3>Conversation Transcript:</h3>
        <pre style="white-space: pre-wrap; font-family: sans-serif;">${escapeHtml(transcript)}</pre>
      `
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('forwardChatEmail error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});