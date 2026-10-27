import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { allow, clientIp } from '../../shared/rateLimit.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Per visitor, then a site-wide ceiling so rotating addresses cannot run up AI usage
    if (!(await allow(base44, `init:${clientIp(req)}`, 5, 3600)) || !(await allow(base44, 'init:all', 200, 3600))) {
      return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    // Unguessable per-conversation token; the client must present it on every message
    const chatToken = crypto.randomUUID();

    // Create conversation using service role
    const conv = await base44.asServiceRole.agents.createConversation({
      agent_name: 'fahrenheit_assistant',
      metadata: {
        name: 'Hero Chat',
        description: 'Homepage hero chatbox',
        chatToken,
        createdAt: Date.now(),
      },
    });

    return Response.json({
      success: true,
      conversationId: conv.id,
      chatToken,
    });
  } catch (error) {
    console.error('Init chat error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});