import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';
import { Send } from 'lucide-react';

const LOGO_URL = 'https://media.base44.com/images/public/user_696032597527e77c90fca3ba/9a7da2942_FahrenheitMarketingLogo.png';

const SUGGESTED = [
  'How do you actually deliver AI outcomes?',
  'What does an engagement look like?',
  'How is this different from a traditional agency?',
  'What does $1,500/month get me?',
];

export default function HeroSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initConversation = async () => {
    const conv = await base44.agents.createConversation({
      agent_name: 'fahrenheit_assistant',
      metadata: { name: 'Hero Chat', description: 'Homepage hero chatbox' },
    });
    setConversation(conv);
    return conv;
  };

  const sendMessage = async (text, conv) => {
    const activeConv = conv || conversation;
    if (!text.trim() || loading) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setStarted(true);

    try {
      const updated = await base44.agents.addMessage(activeConv, { role: 'user', content: text });
      setConversation(updated);

      const unsubscribe = base44.agents.subscribeToConversation(activeConv.id, (data) => {
        if (data.messages) {
          setMessages(data.messages.filter(m => m.role === 'user' || m.role === 'assistant'));
        }
      });
      setTimeout(() => { unsubscribe(); setLoading(false); }, 15000);
    } catch {
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
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-[72px]">
      {/* Cubes pattern — top right */}
      <img
        src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 w-[480px] pointer-events-none opacity-70 select-none"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-widest text-muted-foreground mb-8 font-body flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              AI Enablement · Since 2008
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mb-8"
            >
              We don't sell hours. We sell{' '}
              <span className="text-accent italic">profit</span>
              {' '}& growth.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-12 max-w-xl font-body"
            >
              Fahrenheit is an AI enablement partner for companies ready to turn intelligence into revenue. We design the systems, deploy the models, and operate the stack — measured in outcomes, not deliverables.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-0 border-t border-border"
            >
              {[['18+', 'Years Building'], ['350+', 'Global Clients'], ['∞', 'Models Deployed']].map(([val, label]) => (
                <div key={label} className="pr-8 pt-6">
                  <p className="font-heading text-3xl md:text-4xl font-normal text-foreground">{val}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1 font-body">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Chat Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border rounded-sm shadow-sm overflow-hidden"
          >
            {/* Panel Header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-card">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs uppercase tracking-widest font-body text-foreground/70">Fahrenheit Concierge</span>
              </div>
              <span className="text-xs font-body text-muted-foreground flex items-center gap-1">
                <span className="opacity-60">AI</span>
                <span className="mx-1">·</span>
                <span className="text-accent">LIVE</span>
              </span>
            </div>

            <div className="p-5">
              {!started ? (
                <>
                  <h3 className="font-heading text-2xl md:text-3xl font-normal mb-2 leading-snug">
                    Ask what AI can actually do for your business.
                  </h3>
                  <p className="text-sm text-muted-foreground font-body mb-6 leading-relaxed">
                    I'll help you navigate the site, shortcut to the answer, or tell you honestly if we're not the right fit.
                  </p>
                  <div className="space-y-2 mb-6">
                    {SUGGESTED.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSuggestion(q)}
                        className="w-full text-left text-sm px-4 py-2.5 border border-border rounded-sm hover:border-foreground/30 hover:bg-muted/50 transition-colors font-body text-foreground/70 hover:text-foreground"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-64 overflow-y-auto mb-4 space-y-4 pr-1">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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
              )}

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 border border-border rounded-sm bg-background px-3 py-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything — revenue, automation, AI strategy..."
                  className="flex-1 bg-transparent text-sm outline-none font-body text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 bg-foreground text-background rounded-sm flex items-center justify-center hover:bg-foreground/80 transition-colors disabled:opacity-40 flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}