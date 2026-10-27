import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { allow, clientIp } from '../../shared/rateLimit.ts';

const MAX_CHAT_AGE_MS = 24 * 60 * 60 * 1000;

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

    // Per visitor, then a site-wide ceiling so rotating addresses cannot run up AI usage
    if (!(await allow(base44, `chat:${clientIp(req)}`, 60, 3600)) || !(await allow(base44, 'chat:all', 600, 3600))) {
      return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    // Use service role for agent management. A bad id answers exactly like a bad token.
    const conversation = await base44.asServiceRole.agents.getConversation(conversationId).catch(() => null);

    // Only the holder of the server-issued token may use this conversation
    if (!conversation?.metadata?.chatToken || conversation.metadata.chatToken !== chatToken) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Chats expire after 24 hours; the page starts a fresh one
    const createdAt = Number(conversation.metadata.createdAt) || 0;
    if (!createdAt || Date.now() - createdAt > MAX_CHAT_AGE_MS) {
      return Response.json({ error: 'Chat expired' }, { status: 410 });
    }

    // At most one message every 2 seconds per chat
    if (!(await allow(base44, `gap:${conversationId}`, 1, 2))) {
      return Response.json({ error: 'Slow down. Please try again in a moment.' }, { status: 429 });
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