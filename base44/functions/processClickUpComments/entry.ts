import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { PLATFORM_DIMENSIONS, STEVEN_BOSCH_ID, NICK_ERASMUS_ID } from '../../shared/platformConfig.ts';

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

    let postsProcessed = 0;
    let postsApproved = 0;
    let changesApplied = 0;

    for (const post of postsWithTasks) {
      try {
        // Fetch comments from ClickUp
        const commentsResp = await fetch(
          `https://api.clickup.com/api/v2/task/${post.clickup_task_id}/comment`,
          { headers: { 'Authorization': `Bearer ${accessToken}` } }
        );
        const commentsData = await commentsResp.json();
        const comments = commentsData.comments || [];

        // Filter to only new comments since last check
        const lastCheck = post.last_comment_check ? new Date(post.last_comment_check).getTime() : 0;
        const newComments = comments.filter(c => parseInt(c.date) > lastCheck);

        if (newComments.length === 0) continue;

        let copyApproved = post.copy_approved || false;
        let designApproved = post.design_approved || false;
        let latestCommentDate = lastCheck;
        let contentChanged = false;
        let newContent = post.content;
        let newImageUrl = post.image_url;

        for (const comment of newComments) {
          const commentDate = parseInt(comment.date);
          if (commentDate > latestCommentDate) {
            latestCommentDate = commentDate;
          }

          const commenterId = comment.user?.id;
          const commentText = comment.comment?.[0]?.text || '';
          const isApproved = commentText.toLowerCase().trim().includes('approved');

          if (isApproved) {
            // Steven can approve both Copy and Design; Nick can only approve Design
            if (commenterId === STEVEN_BOSCH_ID) {
              copyApproved = true;
              designApproved = true;
            } else if (commenterId === NICK_ERASMUS_ID) {
              designApproved = true;
            }
          } else {
            // Change request — use LLM to parse and apply only the relevant changes
            const reviewerRole = commenterId === STEVEN_BOSCH_ID
              ? 'Steven (Head of Marketing — can request copy and design changes)'
              : commenterId === NICK_ERASMUS_ID
                ? 'Nick (Head of Design — can request design changes)'
                : 'a reviewer';

            const llmResult = await base44.asServiceRole.integrations.Core.InvokeLLM({
              prompt: `You are a social media content editor for Fahrenheit Marketing. A reviewer has commented on a social media post with requested changes.

Current post content:
${post.content}

Platform: ${post.platform}
Reviewer: ${reviewerRole}
Reviewer's comment: "${commentText}"

Apply ONLY the specific changes the reviewer requested. Keep everything else identical. Do not rewrite the entire post unless the reviewer explicitly asks for a full rewrite.

If the reviewer is Nick (Head of Design), only apply changes related to the visual/image — do not change the copy unless he explicitly asks for text changes too.

Return the updated content. If the comment requests image/visual changes, set needs_new_image=true and provide a detailed image_prompt for the new image. If no content changes are needed, return the original content unchanged with needs_new_image=false.`,
              response_json_schema: {
                type: 'object',
                properties: {
                  content: { type: 'string', description: 'The updated post content' },
                  image_prompt: { type: 'string', description: 'Detailed prompt for a new image if needed' },
                  needs_new_image: { type: 'boolean' },
                  summary: { type: 'string', description: 'Brief summary of what was changed' }
                },
                required: ['content', 'needs_new_image']
              }
            });

            if (llmResult.content && llmResult.content !== post.content) {
              newContent = llmResult.content;
              contentChanged = true;
            }

            if (llmResult.needs_new_image && llmResult.image_prompt) {
              const dims = PLATFORM_DIMENSIONS[post.platform] || 'square format';
              const imgResult = await base44.asServiceRole.integrations.Core.GenerateImage({
                prompt: `${llmResult.image_prompt}. Image dimensions: ${dims}. Professional, eye-catching, high-quality digital marketing visual.`
              });
              newImageUrl = imgResult.url;
              contentChanged = true;
            }
          }
        }

        // Build update data
        const updateData = {
          copy_approved: copyApproved,
          design_approved: designApproved,
          last_comment_check: new Date(latestCommentDate).toISOString(),
        };

        if (contentChanged) {
          updateData.content = newContent;
          updateData.image_url = newImageUrl;
          changesApplied++;
        }

        // If both copy and design are approved, mark the post as approved
        if (copyApproved && designApproved) {
          updateData.status = 'approved';
          postsApproved++;
        }

        await base44.asServiceRole.entities.SocialMediaPost.update(post.id, updateData);

        // Update ClickUp task if content changed
        if (contentChanged) {
          await fetch(`https://api.clickup.com/api/v2/task/${post.clickup_task_id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              description: `${newContent}\n\n---\nImage: ${newImageUrl || 'N/A'}\nCopy Approved: ${copyApproved}\nDesign Approved: ${designApproved}`,
            }),
          });

          // Attach the new image to the task
          if (newImageUrl && newImageUrl !== post.image_url) {
            try {
              const imageResp = await fetch(newImageUrl);
              const imageBlob = await imageResp.blob();
              const formData = new FormData();
              formData.append('file', imageBlob, `image_${post.platform}_revised.png`);
              await fetch(`https://api.clickup.com/api/v2/task/${post.clickup_task_id}/attachment`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${accessToken}` },
                body: formData,
              });
            } catch (attachErr) {
              console.error(`Image attachment failed for post ${post.id}:`, attachErr);
            }
          }
        }

        postsProcessed++;
      } catch (err) {
        console.error(`Comment processing failed for post ${post.id}:`, err);
      }
    }

    return Response.json({
      status: 'success',
      posts_checked: postsWithTasks.length,
      posts_with_new_comments: postsProcessed,
      posts_approved: postsApproved,
      changes_applied: changesApplied,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});