import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Create conversation using user auth
    const conv = await base44.agents.createConversation({
      agent_name: 'fahrenheit_assistant',
      metadata: { 
        name: 'Hero Chat', 
        description: 'Homepage hero chatbox',
      },
    });
    
    return Response.json({ 
      success: true, 
      conversationId: conv.id 
    });
  } catch (error) {
    console.error('Init chat error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});