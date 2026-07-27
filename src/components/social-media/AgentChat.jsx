import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Loader2, Send, Plus, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AGENT_NAME = 'social_media_manager';

export default function AgentChat() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (!activeId) return;
    const unsubscribe = base44.agents.subscribeToConversation(activeId, (data) => {
      setMessages(data.messages || []);
    });
    return () => unsubscribe();
  }, [activeId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversations = async () => {
    try {
      const data = await base44.agents.listConversations({ agent_name: AGENT_NAME });
      setConversations(data);
      if (data.length > 0) {
        setActiveId(data[0].id);
        const full = await base44.agents.getConversation(data[0].id);
        setMessages(full.messages || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectConversation = async (convId) => {
    setActiveId(convId);
    try {
      const conv = await base44.agents.getConversation(convId);
      setMessages(conv.messages || []);
    } catch (err) {
      console.error(err);
    }
  };

  const createConversation = async () => {
    try {
      const conv = await base44.agents.createConversation({
        agent_name: AGENT_NAME,
        metadata: { name: `Social Media Session ${new Date().toLocaleDateString()}` }
      });
      setConversations(prev => [conv, ...prev]);
      setActiveId(conv.id);
      setMessages([]);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !activeId) return;
    const text = input.trim();
    setInput('');
    setSending(true);
    try {
      const conv = conversations.find(c => c.id === activeId);
      await base44.agents.addMessage(conv, { role: 'user', content: text });
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="border border-border rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-[200px_1fr] h-[500px]">
      <div className="border-r border-border bg-card/50 flex flex-col">
        <div className="p-3 border-b border-border">
          <Button size="sm" variant="outline" className="w-full gap-1" onClick={createConversation}>
            <Plus className="w-3 h-3" /> New Chat
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">No conversations yet</p>
          ) : conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => selectConversation(conv.id)}
              className={`w-full text-left px-3 py-2 rounded-sm text-xs font-body transition-colors flex items-center gap-2 ${
                activeId === conv.id ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <MessageSquare className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{conv.metadata?.name || 'Untitled'}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col bg-background">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              <p>Start a conversation with your social media agent.</p>
            </div>
          ) : messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-sm px-4 py-2 text-sm ${
                msg.role === 'user' ? 'bg-foreground text-background' : 'bg-secondary text-foreground'
              }`}>
                {msg.role === 'user' ? msg.content : <ReactMarkdown className="prose prose-sm max-w-none">{msg.content}</ReactMarkdown>}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
        <div className="border-t border-border p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !sending && sendMessage()}
            placeholder="Ask about trends, request content ideas..."
            className="flex-1 px-3 py-2 text-sm bg-transparent border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-ring font-body"
            disabled={!activeId}
          />
          <Button size="sm" onClick={sendMessage} disabled={!input.trim() || sending || !activeId} className="gap-1">
            {sending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
          </Button>
        </div>
      </div>
    </div>
  );
}