import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { allow, clientIp } from '../../shared/rateLimit.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { conversationId, chatToken, message } = await req.json().catch(() => ({}));

    if (!conversationId || !message || !chatToken) {
      return Response.json({ error: 'Missing conversationId, chatToken or message' }, { status: 400 });
    }
    if (typeof message !== 'string' || message.length > 4000) {
      return Response.json({ error: 'Invalid message' }, { status: 400 });
    }

    if (!(await allow(base44, `chat:${clientIp(req)}`, 60, 3600))) {
      return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    // Use service role for agent management
    const conversation = await base44.asServiceRole.agents.getConversation(conversationId);

    // Only the holder of the server-issued token may use this conversation
    if (!conversation?.metadata?.chatToken || conversation.metadata.chatToken !== chatToken) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Cap messages per conversation
    const userMessageCount = (conversation.messages || []).filter((m) => m.role === 'user').length;
    if (userMessageCount >= 30) {
      return Response.json({ error: 'Conversation limit reached' }, { status: 429 });
    }

    // Add user message
    await base44.asServiceRole.agents.addMessage(conversation, {
      role: 'user',
      content: message,
    });

    // Wait briefly for agent response and then fetch updated conversation
    await new Promise(r => setTimeout(r, 3000));

    const updated = await base44.asServiceRole.agents.getConversation(conversationId);
    const assistantMsg = updated.messages.reverse().find(m => m.role === 'assistant');

    if (assistantMsg?.content) {
      return Response.json({ success: true, response: assistantMsg.content });
    } else {
      return Response.json({ success: true, response: 'Thinking...' });
    }
  } catch (error) {
    console.error('Chat error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});