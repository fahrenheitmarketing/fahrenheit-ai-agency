import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, MessageSquareReply, RefreshCw } from 'lucide-react';
import PostCard from '@/components/social-media/PostCard';
import AgentChat from '@/components/social-media/AgentChat';
import { useToast } from '@/components/ui/use-toast';

const PLATFORMS = ['all', 'facebook', 'instagram', 'linkedin'];

export default function SocialMediaStudio() {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [filter, setFilter] = useState('all');

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await base44.entities.SocialMediaPost.list('-created_date', 100);
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await base44.functions.invoke('generateSocialMediaContent', {});
      await loadPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleRegenerateImages = async () => {
    setRegenerating(true);
    try {
      const result = await base44.functions.invoke('regeneratePostImages', {});
      toast({ title: 'Images regenerated', description: `${result.updated || 0} posts updated with brand-compliant visuals.` });
      await loadPosts();
    } catch (err) {
      toast({ title: 'Regeneration failed', description: err.message, variant: 'destructive' });
    } finally {
      setRegenerating(false);
    }
  };

  const handleStatusChange = (id, status) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const handleProcessFeedback = async () => {
    setProcessing(true);
    try {
      const result = await base44.functions.invoke('processClickUpComments', {});
      const summary = `${result.tasks_with_new_comments || 0} task(s) processed, ${result.changes_applied || 0} with changes, ${result.posts_approved || 0} approved.`;
      toast({ title: 'Feedback processed', description: summary });
      await loadPosts();
    } catch (err) {
      toast({ title: 'Processing failed', description: err.message, variant: 'destructive' });
    } finally {
      setProcessing(false);
    }
  };

  const filtered = filter === 'all' ? posts : posts.filter(p => p.platform === filter);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-normal mb-2">Social Media Studio</h1>
            <p className="text-muted-foreground text-sm">AI-generated social media content, ready for your review.</p>
            <p className="text-muted-foreground text-xs mt-1">
              Leave feedback on ClickUp tasks → click "Process Feedback Now" (or wait ~30 min for auto-pickup) → changes are applied and confirmed in the task.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleProcessFeedback} disabled={processing} variant="outline" className="gap-2">
              {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquareReply className="w-4 h-4" />}
              {processing ? 'Processing...' : 'Process Feedback Now'}
            </Button>
            <Button onClick={handleRegenerateImages} disabled={regenerating} variant="outline" className="gap-2">
              {regenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              {regenerating ? 'Regenerating...' : 'Redo All Creatives'}
            </Button>
            <Button onClick={handleGenerate} disabled={generating} className="gap-2">
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {generating ? 'Generating...' : 'Generate New Posts'}
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {PLATFORMS.map(p => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-4 py-2 rounded-sm text-sm font-body capitalize transition-colors ${
                filter === p ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>No posts yet. Click "Generate New Posts" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <PostCard key={post.id} post={post} onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}

        <div className="mt-16">
          <h2 className="font-heading text-2xl font-normal mb-4">Chat with Your Social Media Agent</h2>
          <AgentChat />
        </div>
      </div>
    </div>
  );
}