import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';
import { Send, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AGENT_NAME = 'content_researcher';

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const [expanded, setExpanded] = useState(false);

  const toolCalls = message.tool_calls || [];
  const hasToolCalls = toolCalls.length > 0;

  const statusIcon = (status) => {
    if (['pending', 'running', 'in_progress'].includes(status)) {
      return <Loader2 className="w-3 h-3 animate-spin text-accent" />;
    }
    if (['failed', 'error'].includes(status)) return <span className="text-destructive">✕</span>;
    return <span className="text-accent">✓</span>;
  };

  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div className={`max-w-[80%] ${isUser ? '' : 'w-full'}`}>
        {message.content && (
          isUser ? (
            <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
              <p>{message.content}</p>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
              <ReactMarkdown className="text-sm prose prose-sm max-w-none prose-headings:font-heading prose-a:text-accent prose-strong:text-foreground">
                {message.content}
              </ReactMarkdown>
            </div>
          )
        )}
        {hasToolCalls && toolCalls.map((tc, idx) => (
          <div key={idx} className="mt-2 text-xs">
            <button
              onClick={() => setExpanded(expanded === idx ? null : idx)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {statusIcon(tc.status)}
              <span className="font-medium">{tc.name || 'Tool Call'}</span>
              <span className="text-muted-foreground/60">
                {['pending', 'running', 'in_progress'].includes(tc.status) ? 'running...' : tc.status}
              </span>
            </button>
            {expanded === idx && (
              <div className="mt-2 space-y-1 bg-muted/50 rounded-lg p-3">
                <p className="font-semibold text-foreground">Parameters:</p>
                <pre className="whitespace-pre-wrap text-muted-foreground">
                  {(() => { try { return JSON.stringify(JSON.parse(tc.arguments_string), null, 2); } catch { return tc.arguments_string; } })()}
                </pre>
                <p className="font-semibold text-foreground mt-2">Result:</p>
                <pre className="whitespace-pre-wrap text-muted-foreground">
                  {(() => { try { return JSON.stringify(typeof tc.results === 'string' ? JSON.parse(tc.results) : tc.results, null, 2); } catch { return String(tc.results); } })()}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContentStudio() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [creatingConv, setCreatingConv] = useState(false);
  const messagesEndRef = useRef(null);

  const loadConversations = async () => {
    try {
      const list = await base44.agents.listConversations({ agent_name: AGENT_NAME });
      setConversations(list || []);
    } catch (err) {
      console.error('Failed to load conversations', err);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (activeConversation) {
      const conv = base44.agents.getConversation(activeConversation);
      if (conv) setMessages(conv.messages || []);
      const unsubscribe = base44.agents.subscribeToConversation(activeConversation, (data) => {
        setMessages(data.messages || []);
      });
      return () => unsubscribe();
    }
  }, [activeConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNewConversation = async () => {
    setCreatingConv(true);
    try {
      const conv = await base44.agents.createConversation({
        agent_name: AGENT_NAME,
        metadata: { name: 'New Article Session', description: 'Content research and article generation' }
      });
      await loadConversations();
      setActiveConversation(conv.id);
    } catch (err) {
      console.error('Failed to create conversation', err);
    } finally {
      setCreatingConv(false);
    }
  };

  const handleSelectConversation = (convId) => {
    setActiveConversation(convId);
  };

  const handleSend = async () => {
    if (!input.trim() || !activeConversation) return;
    const message = input.trim();
    setInput('');
    setLoading(true);
    try {
      const conv = base44.agents.getConversation(activeConversation);
      await base44.agents.addMessage(conv, { role: 'user', content: message });
    } catch (err) {
      console.error('Failed to send message', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <Button
            onClick={handleNewConversation}
            disabled={creatingConv}
            className="w-full"
            size="sm"
          >
            {creatingConv ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
            New Article Session
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {conversations.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8 px-4">
              No conversations yet. Start a new session to generate articles.
            </p>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                className={`w-full text-left px-3 py-2 rounded-lg mb-1 text-sm transition-colors ${
                  activeConversation === conv.id
                    ? 'bg-accent/10 text-foreground border border-accent/30'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <p className="font-medium truncate">
                  {conv.metadata?.name || 'Untitled'}
                </p>
                <p className="text-xs text-muted-foreground/60 truncate">
                  {conv.metadata?.description || ''}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {!activeConversation ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <FileText className="w-12 h-12 text-muted-foreground/40 mb-4" />
              <h2 className="font-heading text-xl mb-2">Content Research Studio</h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Start a new session to have the AI research industry trends and generate SEO-optimized articles with FAQs and featured images.
              </p>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-sm text-muted-foreground max-w-md">
                Ask the agent to research a topic, write an article, or generate content for your blog.
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        {activeConversation && (
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask the agent to research and write an article..."
                disabled={loading}
              />
              <Button onClick={handleSend} disabled={loading || !input.trim()} size="icon">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}