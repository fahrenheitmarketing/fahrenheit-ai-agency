import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { action, conversationId, message, pageSource } = await req.json();

    if (action === 'create') {
      // Create a conversation as a service role (works for public apps)
      const conv = await base44.asServiceRole.agents.createConversation({
        agent_name: 'fahrenheit_assistant',
        metadata: { 
          name: `Chat — ${pageSource}`, 
          description: pageSource,
          is_public: true
        },
      });
      return Response.json({ conversation: conv });
    } 
    
    if (action === 'addMessage') {
      // Add a message to conversation
      const conv = await base44.asServiceRole.agents.addMessage(conversationId, { 
        role: 'user', 
        content: message 
      });
      return Response.json({ conversation: conv });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Chat error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});