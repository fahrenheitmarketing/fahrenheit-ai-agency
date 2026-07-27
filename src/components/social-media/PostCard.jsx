import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PLATFORM_STYLES = {
  facebook: 'bg-blue-100 text-blue-700',
  instagram: 'bg-pink-100 text-pink-700',
  linkedin: 'bg-sky-100 text-sky-700',
};

const STATUS_STYLES = {
  draft: 'bg-gray-100 text-gray-600',
  pending_approval: 'bg-amber-100 text-amber-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  published: 'bg-purple-100 text-purple-700',
};

export default function PostCard({ post, onStatusChange }) {
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (status) => {
    setUpdating(true);
    try {
      await base44.entities.SocialMediaPost.update(post.id, { status });
      onStatusChange(post.id, status);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
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
          <span className={`text-xs px-2 py-0.5 rounded-sm font-body capitalize ${STATUS_STYLES[post.status] || ''}`}>
            {post.status?.replace('_', ' ')}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-2 font-body">{post.topic}</p>
        <p className="text-sm text-foreground leading-relaxed mb-4 line-clamp-4 whitespace-pre-wrap">{post.content}</p>
        {(post.status === 'draft' || post.status === 'pending_approval') && (
          <div className="flex gap-2 mt-auto">
            <Button size="sm" variant="outline" className="gap-1 flex-1" onClick={() => updateStatus('approved')} disabled={updating}>
              {updating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />} Approve
            </Button>
            <Button size="sm" variant="outline" className="gap-1 flex-1" onClick={() => updateStatus('rejected')} disabled={updating}>
              <X className="w-3 h-3" /> Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}