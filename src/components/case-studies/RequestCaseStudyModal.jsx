import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';

export default function RequestCaseStudyModal({ study, onClose }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.functions.invoke('sendCaseStudy', {
      email,
      name,
      caseStudyId: study.id,
      caseStudyTitle: study.title,
    });
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm">
      <div className="bg-card rounded-sm border border-border w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-normal mb-2">On Its Way</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We've sent the <strong>{study.title}</strong> case study to <strong>{email}</strong>. Check your inbox.
            </p>
            <Button onClick={onClose} className="mt-6 w-full rounded-sm font-body">Done</Button>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Case Study</p>
            <h3 className="font-heading text-2xl font-normal mb-2">{study.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Enter your email and we'll send you the full PDF case study instantly.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full rounded-sm gap-2 font-body"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Me the Case Study'} <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4">No spam. Just the PDF.</p>
          </>
        )}
      </div>
    </div>
  );
}