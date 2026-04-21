import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';
import { Send } from 'lucide-react';

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef(null);

  const SUGGESTED_QUESTIONS = [
    'What brands have you worked with?',
    'How do you measure AI success?',
    'What makes Fahrenheit different?',
    'How do we get started?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initConversation = async () => {
    try {
      const conv = await base44.agents.createConversation({
        agent_name: 'fahrenheit_assistant',
        metadata: { name: 'Hero Chat', description: 'Homepage hero chatbox' },
      });
      console.log('Conversation created:', conv);
      setConversation(conv);
      return conv;
    } catch (error) {
      console.error('Failed to create conversation:', error);
      throw error;
    }
  };

  const sendMessage = async (text, conv) => {
    const activeConv = conv || conversation;
    if (!text.trim() || loading) return;

    setInput('');
    setLoading(true);
    setStarted(true);

    try {
      // Add user message immediately to UI
      setMessages(prev => [...prev, { role: 'user', content: text }]);
      
      // Send to agent
      const updated = await base44.agents.addMessage(activeConv, { role: 'user', content: text });
      setConversation(updated);
      
      // Subscribe for agent response
      let responseReceived = false;
      const unsubscribe = base44.agents.subscribeToConversation(activeConv.id, (data) => {
        if (data.messages && data.messages.length > 0) {
          const allMessages = data.messages.filter(m => m.role === 'user' || m.role === 'assistant');
          setMessages(allMessages);
          
          // Check if we have assistant response after user message
          const hasNewAssistant = allMessages.some(m => m.role === 'assistant');
          if (hasNewAssistant && !responseReceived) {
            responseReceived = true;
            setLoading(false);
            unsubscribe();
          }
        }
      });
      
      // Fallback timeout
      setTimeout(() => {
        if (!responseReceived) {
          unsubscribe();
          setLoading(false);
        }
      }, 15000);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Unable to connect to agent.' }]);
      setLoading(false);
    }
  };

  const handleSuggestion = async (text) => {
    let conv = conversation;
    if (!conv) conv = await initConversation();
    await sendMessage(text, conv);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    let conv = conversation;
    if (!conv) conv = await initConversation();
    await sendMessage(input, conv);
  };

  return (
    <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden flex flex-col h-full">
      {/* Panel Header */}
      <div className="px-5 py-4 border-b border-border bg-card flex-shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-xs uppercase tracking-widest font-body text-foreground/70">Fahrenheit Concierge</span>
        </div>
        <p className="text-xs text-muted-foreground font-body">Trusted by powerhouse brands</p>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {!started ? (
            <>
              <h3 className="font-heading text-lg font-normal mb-2 leading-snug">
                Ready to grow like the brands we work with?
              </h3>
              <p className="text-sm text-muted-foreground font-body mb-4 leading-relaxed">
                Ask about our AI-first approach, proven results with brands like PepsiCo, RJ Reynolds, and QuikTrip, or how we measure success.
              </p>
              <div className="space-y-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestion(q)}
                    className="w-full text-left text-xs px-3 py-2.5 border border-border rounded-sm hover:border-foreground/30 hover:bg-muted/50 transition-colors font-body text-foreground/70 hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] text-xs rounded-sm px-3 py-2 leading-relaxed font-body ${
                    msg.role === 'user' ? 'bg-foreground text-background' : 'bg-muted text-foreground'
                  }`}>
                    <ReactMarkdown className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 text-xs">
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-sm px-3 py-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-5 pb-5 flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border border-border rounded-sm bg-background px-3 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent text-xs outline-none font-body text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-6 h-6 bg-foreground text-background rounded-sm flex items-center justify-center hover:bg-foreground/80 transition-colors disabled:opacity-40 flex-shrink-0"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}