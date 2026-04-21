import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { conversationId, message } = await req.json();
    
    if (!conversationId || !message) {
      return Response.json({ error: 'Missing conversationId or message' }, { status: 400 });
    }
    
    // Get the conversation
    const conversation = await base44.asServiceRole.agents.getConversation(conversationId);
    
    // Add user message
    const updated = await base44.asServiceRole.agents.addMessage(conversation, {
      role: 'user',
      content: message,
    });
    
    // Subscribe to get response with timeout
    return new Promise((resolve) => {
      let response = null;
      const unsubscribe = base44.asServiceRole.agents.subscribeToConversation(conversationId, (data) => {
        if (data.messages && data.messages.length > 0) {
          const assistantMsg = data.messages.find(m => m.role === 'assistant');
          if (assistantMsg && !response) {
            response = assistantMsg.content;
            unsubscribe();
            resolve(Response.json({ success: true, response }));
          }
        }
      });
      
      // Timeout after 10 seconds
      setTimeout(() => {
        unsubscribe();
        if (response) {
          resolve(Response.json({ success: true, response }));
        } else {
          resolve(Response.json({ error: 'No response from agent' }, { status: 500 }));
        }
      }, 10000);
    });
  } catch (error) {
    console.error('Chat error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});