import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { PLATFORM_IMAGE_COMPOSITION, APPROVED_LOGOS, LOGO_INSTRUCTION, STEVEN_BOSCH_ID, NICK_ERASMUS_ID } from '../../shared/platformConfig.ts';
import { resizeImageToPlatform } from '../../shared/imageResizer.ts';

function buildBrandImagePrompt(rawPrompt: string, platform: string, topic: string, composition: string): string {
  const dimensionConstraint = {
    facebook: 'Output dimensions: 1080x1350 pixels',
    instagram: 'Output dimensions: 1080x1350 pixels',
    linkedin: 'Output dimensions: 1200x627 pixels',
  }[platform] || 'Output dimensions: 1080x1350 pixels';

  return `A photorealistic shot of two named business professionals — a CMO in her 40s and a CFO in his 30s, with diverse ethnicity — reviewing ${topic.toLowerCase()} data on a large monitor or printed document in a modern glass-walled office with clean architectural lines, minimal furniture, and floor-to-ceiling windows. Data visualizations — cost curves, ROAS trend lines, or spend-by-channel breakdowns — appear softly blurred on a background screen. Their body language conveys focused scrutiny and deliberate assessment. The mood is analytically confident and deliberate. Soft natural daylight, slightly cool color grade. Color palette: deep near-black Ink (#1C1917) backgrounds with Cream (#F8F5F1) surfaces, single Ember (#E64D1E) accent element. No upward-scaling arrows, no generic stock photo clichés, no celebrations, no handshakes, no warm or saturated color grades. No text, logos, overlays, or written elements anywhere on the image. ${composition}. ${dimensionConstraint}.`;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user && user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: admin access required' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('clickup');
    if (!accessToken) {
      return Response.json({ error: 'ClickUp not connected' }, { status: 500 });
    }

    // Fetch all pending posts that have ClickUp tasks
    const pendingPosts = await base44.asServiceRole.entities.SocialMediaPost.filter(
      { status: 'pending_approval' },
      '-created_date',
      200
    );
    const postsWithTasks = pendingPosts.filter(p => p.clickup_task_id);

    // Group posts by clickup_task_id (one task per batch)
    const taskGroups = {};
    for (const post of postsWithTasks) {
      if (!taskGroups[post.clickup_task_id]) {
        taskGroups[post.clickup_task_id] = [];
      }
      taskGroups[post.clickup_task_id].push(post);
    }

    let tasksProcessed = 0;
    let postsApproved = 0;
    let changesApplied = 0;

    for (const [taskId, posts] of Object.entries(taskGroups)) {
      try {
        // Fetch comments from ClickUp
        const commentsResp = await fetch(
          `https://api.clickup.com/api/v2/task/${taskId}/comment`,
          { headers: { 'Authorization': `Bearer ${accessToken}` } }
        );
        const commentsData = await commentsResp.json();
        const comments = commentsData.comments || [];

        // Use the earliest post's last_comment_check as the baseline
        let lastCheck = 0;
        for (const post of posts) {
          if (post.last_comment_check) {
            const checkTime = new Date(post.last_comment_check).getTime();
            if (checkTime > lastCheck) lastCheck = checkTime;
          }
        }
        const newComments = comments.filter(c => parseInt(c.date) > lastCheck);
        if (newComments.length === 0) continue;

        let copyApproved = posts.every(p => p.copy_approved);
        let designApproved = posts.every(p => p.design_approved);
        let latestCommentDate = lastCheck;
        let contentChanged = false;
        const updatedContents = {};
        const updatedImageUrls = {};
        const changeResponses = []; // { commenterId, commenterName, summaries: [] }

        for (const comment of newComments) {
          const commentDate = parseInt(comment.date);
          if (commentDate > latestCommentDate) latestCommentDate = commentDate;

          const commenterId = comment.user?.id;
          const commentText = (comment.comment || []).map(b => b.text || '').join('');
          const lowerText = commentText.toLowerCase();
          const isApproved = lowerText.includes('approved for publish') || lowerText.includes('approved for schedule');

          if (isApproved) {
            // Steven can approve both Copy and Design; Nick can only approve Design
            if (commenterId === STEVEN_BOSCH_ID) {
              copyApproved = true;
              designApproved = true;
            } else if (commenterId === NICK_ERASMUS_ID) {
              designApproved = true;
            }
          } else {
            // Change request — use LLM to parse and apply changes to relevant posts
            const reviewerRole = commenterId === STEVEN_BOSCH_ID
              ? 'Steven (Head of Marketing — can request copy and design changes)'
              : commenterId === NICK_ERASMUS_ID
                ? 'Nick (Head of Design — primarily requests design/visual changes, but may request copy changes too)'
                : 'a reviewer';

            const postsContext = posts.map((p, i) => 
              `[Post ${i + 1}] Platform: ${p.platform}\nTopic: ${p.topic}\nContent: ${p.content}\nImage URL: ${p.image_url || 'N/A'}`
            ).join('\n\n');

            const llmResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
              prompt: `You are a social media content editor for Fahrenheit Marketing. A reviewer has commented on a batch of social media posts with requested changes.

Here are the posts in this batch:

${postsContext}

Reviewer: ${reviewerRole}
Reviewer's comment: "${commentText}"

Apply ONLY the specific changes the reviewer requested. Keep everything else identical. Do not rewrite entire posts unless explicitly asked.

If the reviewer references a specific post by topic, platform, or number, only change that post.
If the comment is general, apply the changes to all relevant posts.

Return an array of updated posts. Only include posts that have changes. If no content changes are needed, return an empty array.
For each changed post, include the topic (to identify which post), the updated content, and whether a new image is needed (with a detailed image_prompt if so).`,
              response_json_schema: {
                type: 'object',
                properties: {
                  changes: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        topic: { type: 'string', description: 'The topic of the post being changed' },
                        content: { type: 'string', description: 'The updated post content' },
                        needs_new_image: { type: 'boolean' },
                        image_prompt: { type: 'string', description: 'Detailed prompt for the new image if needed' },
                        summary: { type: 'string', description: 'Brief summary of what was changed' }
                      },
                      required: ['topic', 'content', 'needs_new_image']
                    }
                  }
                },
                required: ['changes']
              }
            });

            const commentChangeSummaries = [];
            for (const change of (llmResult.changes || [])) {
              const post = posts.find(p => p.topic === change.topic);
              if (!post) continue;

              let contentUpdated = false;
              if (change.content && change.content !== post.content) {
                updatedContents[post.id] = change.content;
                contentChanged = true;
                contentUpdated = true;
              }

              let imageUpdated = false;
              if (change.needs_new_image && change.image_prompt) {
                const composition = PLATFORM_IMAGE_COMPOSITION[post.platform] || '';
                const brandPrompt = buildBrandImagePrompt(change.image_prompt, post.platform, post.topic, composition);
                // Brand guide: photographic images must contain no text, logos, or overlays.
                const imgResult = await base44.asServiceRole.integrations.Core.GenerateImage({ prompt: brandPrompt });
                // Resize to platform-specific dimensions (cover crop)
                const resizedUrl = await resizeImageToPlatform(
                  imgResult.url,
                  post.platform,
                  async (file: Blob) => {
                    const uploadResult = await base44.asServiceRole.integrations.Core.UploadFile({ file });
                    return uploadResult.file_url;
                  }
                );
                updatedImageUrls[post.id] = resizedUrl;
                contentChanged = true;
                imageUpdated = true;
              }

              commentChangeSummaries.push({
                topic: change.topic,
                platform: post.platform,
                summary: change.summary || 'Content updated',
                content_updated: contentUpdated,
                image_updated: imageUpdated,
              });
            }

            changeResponses.push({
              commenterId,
              commenterName: comment.user?.username || 'Reviewer',
              comment_text: commentText,
              summaries: commentChangeSummaries,
            });
          }
        }

        // Update all posts in the batch
        const checkDate = new Date(latestCommentDate).toISOString();
        for (const post of posts) {
          const updateData = {
            copy_approved: copyApproved,
            design_approved: designApproved,
            last_comment_check: checkDate,
          };

          if (updatedContents[post.id]) {
            updateData.content = updatedContents[post.id];
          }
          if (updatedImageUrls[post.id]) {
            updateData.image_url = updatedImageUrls[post.id];
          }

          // If both approved, set status to approved
          if (copyApproved && designApproved) {
            updateData.status = 'approved';
          }

          await base44.asServiceRole.entities.SocialMediaPost.update(post.id, updateData);
        }

        if (copyApproved && designApproved) {
          postsApproved += posts.length;
        }
        if (contentChanged) {
          changesApplied++;
          // Update ClickUp task description with updated content
          const platforms = ['facebook', 'instagram', 'linkedin'];
          let updatedDesc = `# Social Media Posts\n\n`;
          for (const platform of platforms) {
            const platformPosts = posts.filter(p => p.platform === platform);
            if (platformPosts.length === 0) continue;
            updatedDesc += `\n## ${platform.charAt(0).toUpperCase() + platform.slice(1)} Posts\n`;
            for (const post of platformPosts) {
              const content = updatedContents[post.id] || post.content;
              const imageUrl = updatedImageUrls[post.id] || post.image_url;
              updatedDesc += `\n### ${post.topic}\n${content}\nImage: ${imageUrl || 'N/A'}\n`;
            }
          }
          updatedDesc += `\n---\nCopy Approved: ${copyApproved}\nDesign Approved: ${designApproved}`;

          await fetch(`https://api.clickup.com/api/v2/task/${taskId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: updatedDesc }),
          });

          // Attach any new images
          for (const [postId, imageUrl] of Object.entries(updatedImageUrls)) {
            try {
              const imageResp = await fetch(imageUrl);
              const imageBlob = await imageResp.blob();
              const formData = new FormData();
              formData.append('file', imageBlob, `image_revised_${postId}.png`);
              await fetch(`https://api.clickup.com/api/v2/task/${taskId}/attachment`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${accessToken}` },
                body: formData,
              });
            } catch (attachErr) {
              console.error(`Image attachment failed for post ${postId}:`, attachErr);
            }
          }
        }

        // Post summary comments back to ClickUp mentioning each reviewer who requested changes
        for (const cr of changeResponses) {
          const changedCount = cr.summaries.length;
          let summaryText;
          if (changedCount > 0) {
            summaryText = `@${cr.commenterName} — ✅ Changes applied based on your feedback (${changedCount} post${changedCount > 1 ? 's' : ''} updated):\n`;
            for (const s of cr.summaries) {
              summaryText += `\n• [${s.platform}] "${s.topic}": ${s.summary}`;
              const updates = [];
              if (s.content_updated) updates.push('copy');
              if (s.image_updated) updates.push('image');
              if (updates.length) summaryText += ` (updated: ${updates.join(' + ')})`;
            }
            summaryText += `\n\nUpdated content and images are reflected in the task description above. Please review and confirm or provide further feedback.`;
          } else {
            summaryText = `@${cr.commenterName} — Your feedback was received and reviewed. No specific content changes were identified from your comment. If you'd like changes made, please specify which posts and what should be updated.`;
          }

          try {
            await fetch(`https://api.clickup.com/api/v2/task/${taskId}/comment`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                comment: [{ text: summaryText }],
                assignee: parseInt(cr.commenterId),
                notify_all: false,
              }),
            });
          } catch (commentErr) {
            console.error(`Failed to post summary comment for ${cr.commenterName}:`, commentErr);
          }
        }

        // After posting our own response comments, advance last_comment_check to now
        // so we don't re-process our own comments on the next run
        if (changeResponses.length > 0) {
          const nowIso = new Date().toISOString();
          for (const post of posts) {
            await base44.asServiceRole.entities.SocialMediaPost.update(post.id, { last_comment_check: nowIso });
          }
        }

        tasksProcessed++;
      } catch (err) {
        console.error(`Comment processing failed for task ${taskId}:`, err);
      }
    }

    return Response.json({
      status: 'success',
      tasks_checked: Object.keys(taskGroups).length,
      tasks_with_new_comments: tasksProcessed,
      posts_approved: postsApproved,
      changes_applied: changesApplied,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});