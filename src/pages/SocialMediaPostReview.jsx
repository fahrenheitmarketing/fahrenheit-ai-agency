import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import ReviewPostCard from '@/components/social-media/ReviewPostCard';
import { Loader2 } from 'lucide-react';

export default function SocialMediaPostReview() {
  const [posts, setPosts] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clientName, setClientName] = useState('');
  const batchId = new URLSearchParams(window.location.search).get('batch_id');

  const loadData = useCallback(async () => {
    if (!batchId) { setLoading(false); return; }
    setLoading(true);
    try {
      const [postsData, feedbackData] = await Promise.all([
        base44.entities.SocialMediaPost.filter({ batch_id: batchId }, '-created_date', 200),
        base44.entities.PostFeedback.filter({ batch_id: batchId }, '-created_date', 200),
      ]);
      setPosts(postsData);
      setFeedback(feedbackData);
    } finally {
      setLoading(false);
    }
  }, [batchId]);

  useEffect(() => { loadData(); }, [loadData]);

  if (!batchId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <p className="text-muted-foreground text-center">This review link is missing a batch reference. Please ask for a new link.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-accent font-body mb-2">Fahrenheit Marketing</p>
          <h1 className="font-heading text-3xl md:text-4xl font-normal mb-2">Social Media Posts — For Your Review</h1>
          <p className="text-muted-foreground text-sm">Please review each post below. Approve it as-is, or leave a comment describing the changes you'd like.</p>
        </div>

        <div className="mb-8 max-w-sm">
          <label className="block text-sm font-body text-muted-foreground mb-1">Your name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g. Jane Smith"
            className="w-full border border-border rounded-sm px-3 py-2 text-sm bg-card font-body focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>No posts found for this review link.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <ReviewPostCard
                key={post.id}
                post={post}
                clientName={clientName}
                feedbackHistory={feedback.filter(f => f.post_id === post.id)}
                onSubmitted={loadData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}