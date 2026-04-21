import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { conversationId, message } = await req.json();
    
    if (!conversationId || !message) {
      return Response.json({ error: 'Missing conversationId or message' }, { status: 400 });
    }
    
    // Use service role for agent management
    const conversation = await base44.asServiceRole.agents.getConversation(conversationId);
    
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
    return Response.json({ error: error.message }, { status: 500 });
  }
});