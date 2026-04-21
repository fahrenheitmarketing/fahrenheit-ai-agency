import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';

export default function AIChatWidget({ pageSource = 'Homepage' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [visitorInfo, setVisitorInfo] = useState({ name: '', email: '', company: '' });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initConversation = async () => {
    const conv = await base44.agents.createConversation({
      agent_name: 'fahrenheit_assistant',
      metadata: { name: `Chat from ${pageSource}`, description: `Visitor chat on ${pageSource}` },
    });
    setConversation(conv);
    
    // Add initial greeting
    const greeting = {
      role: 'assistant',
      content: `Welcome to Fahrenheit Marketing! I'm here to help you explore how our AI-first approach can accelerate your growth. What brings you here today?`,
    };
    setMessages([greeting]);
  };

  const handleOpen = async () => {
    setIsOpen(true);
    if (!conversation) {
      await initConversation();
    }
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const extractInfoFromMessages = (allMessages) => {
    const info = { ...visitorInfo };
    const fullText = allMessages.filter(m => m.role === 'user').map(m => m.content).join(' ');
    
    // Simple email extraction
    const emailMatch = fullText.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) info.email = emailMatch[0];
    
    return info;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const updatedConv = await base44.agents.addMessage(conversation, {
        role: 'user',
        content: userMessage.content,
      });
      setConversation(updatedConv);

      // Subscribe for streaming response
      const unsubscribe = base44.agents.subscribeToConversation(
        conversation.id,
        (data) => {
          if (data.messages && data.messages.length > 0) {
            const agentMessages = data.messages.filter(m => m.role === 'assistant' || m.role === 'user');
            setMessages(agentMessages);
          }
        }
      );

      // Cleanup after a timeout
      setTimeout(() => {
        unsubscribe();
        setLoading(false);
        
        // Try to forward conversation via email periodically
        const info = extractInfoFromMessages(newMessages);
        setVisitorInfo(info);
      }, 15000);

    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, I encountered an issue. Please try again or reach out directly to rcasas@fahrenheitmarketing.com.' }]);
      setLoading(false);
    }
  };

  const handleClose = async () => {
    // Forward transcript on close
    if (messages.length > 1) {
      const transcript = messages.map(m => `${m.role === 'user' ? 'Visitor' : 'AI'}: ${m.content}`).join('\n\n');
      try {
        await base44.functions.invoke('forwardChatEmail', {
          visitor_name: visitorInfo.name,
          visitor_email: visitorInfo.email,
          visitor_company: visitorInfo.company,
          transcript,
          page_source: pageSource,
        });
      } catch (e) {
        // silent fail
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={handleOpen}
              className="h-14 w-14 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              <MessageSquare className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[540px] max-h-[calc(100vh-120px)] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-primary text-primary-foreground flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Fahrenheit AI</p>
                  <p className="text-xs opacity-80">Ask us anything</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-primary-foreground/10 rounded-lg transition-colors">
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button onClick={handleClose} className="p-1.5 hover:bg-primary-foreground/10 rounded-lg transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role !== 'user' && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}>
                    {msg.role === 'user' ? (
                      <p>{msg.content}</p>
                    ) : (
                      <ReactMarkdown className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-foreground/60" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full bg-muted border-0 text-sm h-10"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || loading}
                  className="h-10 w-10 rounded-full flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}