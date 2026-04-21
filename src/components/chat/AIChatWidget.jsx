import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Bot, User, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';

export default function AIChatWidget({ pageSource = 'Unknown' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initConversation = async () => {
    const conv = await base44.agents.createConversation({
      agent_name: 'fahrenheit_assistant',
      metadata: { name: `Chat — ${pageSource}`, description: pageSource },
    });
    setConversation(conv);
    setMessages([{ role: 'assistant', content: 'Ask me anything about Fahrenheit — our approach, services, pricing, or whether we might be a good fit for your business.' }]);
    return conv;
  };

  const handleOpen = async () => {
    setIsOpen(true);
    if (!conversation) {
      try {
        await initConversation();
      } catch (error) {
        console.error('Failed to initialize conversation:', error);
        setMessages([{ role: 'assistant', content: 'Unable to start chat. Please try again or email rcasas@fahrenheitmarketing.com.' }]);
      }
    }
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim();
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // simple extraction
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch && !visitorEmail) setVisitorEmail(emailMatch[0]);

    try {
      const updated = await base44.agents.addMessage(conversation, { role: 'user', content: text });
      setConversation(updated);

      const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
        if (data.messages) setMessages(data.messages.filter(m => m.role === 'user' || m.role === 'assistant'));
      });
      setTimeout(() => { unsubscribe(); setLoading(false); }, 15000);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Try again or email rcasas@fahrenheitmarketing.com.' }]);
      setLoading(false);
    }
  };

  const handleClose = async () => {
    if (messages.length > 1) {
      const transcript = messages.map(m => `${m.role === 'user' ? 'Visitor' : 'AI'}: ${m.content}`).join('\n\n');
      base44.functions.invoke('forwardChatEmail', {
        visitor_name: visitorName,
        visitor_email: visitorEmail,
        transcript,
        page_source: pageSource,
      }).catch(() => {});
    }
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-foreground text-background rounded-sm flex items-center justify-center shadow-lg hover:bg-foreground/80 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-32px)] h-[520px] max-h-[calc(100vh-100px)] bg-card border border-border rounded-sm shadow-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-card flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-xs uppercase tracking-widest font-body text-foreground/60">Fahrenheit Concierge</span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button onClick={handleClose} className="p-1 hover:bg-muted rounded-sm transition-colors text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] text-sm rounded-sm px-3 py-2 leading-relaxed font-body ${
                    msg.role === 'user' ? 'bg-foreground text-background' : 'bg-muted text-foreground'
                  }`}>
                    <ReactMarkdown className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
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

            {/* Input */}
            <div className="p-3 border-t border-border flex-shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 border border-border rounded-sm bg-background px-3 py-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent text-sm outline-none font-body text-foreground placeholder:text-muted-foreground"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}