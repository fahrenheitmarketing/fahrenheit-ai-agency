import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, MessageSquare, Loader2 } from 'lucide-react';

const PLATFORM_STYLES = {
  facebook: 'bg-blue-100 text-blue-700',
  instagram: 'bg-pink-100 text-pink-700',
  linkedin: 'bg-sky-100 text-sky-700',
};

export default function ReviewPostCard({ post, clientName, feedbackHistory, onSubmitted }) {
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const latestApproved = post.status === 'approved';
  const canSubmit = clientName.trim().length > 0;

  const submitFeedback = async (action) => {
    if (!canSubmit) return;
    setSubmitting(action);
    try {
      await base44.entities.PostFeedback.create({
        post_id: post.id,
        batch_id: post.batch_id,
        platform: post.platform,
        client_name: clientName.trim(),
        comment: comment.trim(),
        action,
      });
      if (action === 'approved') {
        await base44.entities.SocialMediaPost.update(post.id, {
          status: 'approved',
          copy_approved: true,
          design_approved: true,
        });
      }
      setComment('');
      setSubmitted(true);
      await onSubmitted();
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div className="border border-border rounded-sm overflow-hidden bg-card flex flex-col">
      {post.image_url && (
        <div className="aspect-[4/5] bg-muted overflow-hidden">
          <img src={post.image_url} alt={post.topic} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs px-2 py-0.5 rounded-sm font-body font-medium capitalize ${PLATFORM_STYLES[post.platform] || ''}`}>
            {post.platform}
          </span>
          {latestApproved && (
            <span className="text-xs px-2 py-0.5 rounded-sm font-body bg-green-100 text-green-700">Approved</span>
          )}
        </div>
        {post.proposed_publish_date && (
          <p className="text-xs text-muted-foreground mb-2 font-body">📅 {post.proposed_publish_date}</p>
        )}
        <p className="text-sm text-foreground leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>

        {feedbackHistory.length > 0 && (
          <div className="mb-4 space-y-2">
            {feedbackHistory.map(f => (
              <div key={f.id} className="text-xs bg-secondary rounded-sm p-2 font-body">
                <span className="font-medium">{f.client_name || 'Client'}</span>{' '}
                <span className={f.action === 'approved' ? 'text-green-700' : 'text-amber-700'}>
                  {f.action === 'approved' ? 'approved' : 'requested changes'}
                </span>
                {f.comment && <p className="text-muted-foreground mt-1">{f.comment}</p>}
              </div>
            ))}
          </div>
        )}

        {latestApproved ? (
          <p className="text-xs text-green-700 font-body mt-auto">This post has been approved.</p>
        ) : submitted ? (
          <p className="text-xs text-muted-foreground font-body mt-auto">Thanks — your feedback was submitted.</p>
        ) : (
          <div className="mt-auto space-y-2">
            <Textarea
              placeholder="Add a comment or requested changes (optional if approving)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="text-sm min-h-[70px]"
            />
            {!canSubmit && (
              <p className="text-xs text-muted-foreground">Enter your name above to submit feedback.</p>
            )}
            <div className="flex gap-2">
              <Button
                size="sm"
                className="gap-1 flex-1"
                disabled={!canSubmit || submitting}
                onClick={() => submitFeedback('approved')}
              >
                {submitting === 'approved' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1 flex-1"
                disabled={!canSubmit || submitting || !comment.trim()}
                onClick={() => submitFeedback('changes_requested')}
              >
                {submitting === 'changes_requested' ? <Loader2 className="w-3 h-3 animate-spin" /> : <MessageSquare className="w-3 h-3" />}
                Request Changes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}