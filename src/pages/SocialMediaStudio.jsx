import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, MessageSquareReply, RefreshCw, Trash2, Archive, Link2, Check } from 'lucide-react';
import PostCard from '@/components/social-media/PostCard';
import AgentChat from '@/components/social-media/AgentChat';
import { useToast } from '@/components/ui/use-toast';

const PLATFORMS = ['all', 'facebook', 'instagram', 'linkedin'];

export default function SocialMediaStudio() {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('studio');
  const [clearing, setClearing] = useState(false);
  const [copiedBatch, setCopiedBatch] = useState(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const [data, feedbackData] = await Promise.all([
        base44.entities.SocialMediaPost.list('-created_date', 100),
        base44.entities.PostFeedback.list('-created_date', 200),
      ]);
      setPosts(data);
      setFeedback(feedbackData);
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

  const handleRegenerateImage = async (post) => {
    toast({ title: 'Regenerating image...', description: post.topic });
    try {
      await base44.functions.invoke('regeneratePostImages', { post_ids: [post.id] });
      toast({ title: 'Image regenerated', description: post.topic });
      await loadPosts();
    } catch (err) {
      toast({ title: 'Regeneration failed', description: err.message, variant: 'destructive' });
    }
  };

  const handleCreateNewPost = async (post) => {
    toast({ title: 'Creating new post...', description: `Based on: ${post.topic}` });
    try {
      await base44.functions.invoke('createNewPost', { based_on_post_id: post.id });
      toast({ title: 'New post created' });
      await loadPosts();
    } catch (err) {
      toast({ title: 'Creation failed', description: err.message, variant: 'destructive' });
    }
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

  const handleClearArchive = async () => {
    if (!window.confirm('This will permanently delete all published posts. Are you sure?')) return;
    setClearing(true);
    try {
      const result = await base44.functions.invoke('clearArchivedPosts', {});
      toast({ title: 'Archive cleared', description: `${result.deleted || 0} published posts deleted.` });
      await loadPosts();
    } catch (err) {
      toast({ title: 'Clear failed', description: err.message, variant: 'destructive' });
    } finally {
      setClearing(false);
    }
  };

  const handleCopyReviewLink = (batchId) => {
    const url = `${window.location.origin}/social-media-post-review?batch_id=${batchId}`;
    navigator.clipboard.writeText(url);
    setCopiedBatch(batchId);
    toast({ title: 'Review link copied', description: 'Paste it in an email or message to your client.' });
    setTimeout(() => setCopiedBatch(null), 2000);
  };

  const studioPosts = posts.filter(p => p.status !== 'published');
  const archivedPosts = posts.filter(p => p.status === 'published');
  const filtered = activeTab === 'studio'
    ? (filter === 'all' ? studioPosts : studioPosts.filter(p => p.platform === filter))
    : (filter === 'all' ? archivedPosts : archivedPosts.filter(p => p.platform === filter));

  const batchGroups = activeTab === 'studio'
    ? filtered.reduce((acc, post) => {
        const key = post.batch_id || 'no-batch';
        if (!acc[key]) acc[key] = [];
        acc[key].push(post);
        return acc;
      }, {})
    : null;

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

        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-4 py-2 rounded-sm text-sm font-body capitalize transition-colors ${
                activeTab === 'studio' ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              Active Studio
            </button>
            <button
              onClick={() => setActiveTab('archive')}
              className={`px-4 py-2 rounded-sm text-sm font-body capitalize transition-colors flex items-center gap-2 ${
                activeTab === 'archive' ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              Archive
              {archivedPosts.length > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === 'archive' ? 'bg-background/20' : 'bg-muted'}`}>
                  {archivedPosts.length}
                </span>
              )}
            </button>
          </div>
          {activeTab === 'archive' && archivedPosts.length > 0 && (
            <Button onClick={handleClearArchive} disabled={clearing} variant="destructive" className="gap-2">
              {clearing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              {clearing ? 'Clearing...' : 'Clear Archive'}
            </Button>
          )}
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
            <p>{activeTab === 'archive' ? 'No published posts in the archive.' : 'No posts yet. Click "Generate New Posts" to get started.'}</p>
          </div>
        ) : activeTab === 'studio' ? (
          <div className="space-y-10">
            {Object.entries(batchGroups).map(([batchId, batchPosts]) => (
              <div key={batchId}>
                {batchId !== 'no-batch' && (
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
                    <p className="text-xs text-muted-foreground font-body">Batch: {batchId}</p>
                    <Button size="sm" variant="outline" className="gap-2" onClick={() => handleCopyReviewLink(batchId)}>
                      {copiedBatch === batchId ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                      {copiedBatch === batchId ? 'Link Copied' : 'Copy Review Link'}
                    </Button>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {batchPosts.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onStatusChange={handleStatusChange}
                      onRegenerateImage={handleRegenerateImage}
                      onCreateNew={handleCreateNewPost}
                      clientFeedback={feedback.filter(f => f.post_id === post.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <PostCard key={post.id} post={post} onStatusChange={handleStatusChange} onRegenerateImage={handleRegenerateImage} onCreateNew={handleCreateNewPost} />
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