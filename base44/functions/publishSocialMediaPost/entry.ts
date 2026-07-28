import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user && user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { post_id } = body;
    if (!post_id) {
      return Response.json({ error: 'post_id is required' }, { status: 400 });
    }

    const post = await base44.asServiceRole.entities.SocialMediaPost.get(post_id);
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    if (post.status !== 'approved') {
      return Response.json({ error: 'Post must be approved before publishing' }, { status: 400 });
    }

    let result;
    if (post.platform === 'linkedin') {
      result = await publishToLinkedIn(base44, post);
    } else if (post.platform === 'facebook') {
      result = await publishToFacebook(base44, post);
    } else if (post.platform === 'instagram') {
      result = await publishToInstagram(base44, post);
    } else {
      return Response.json({ error: 'Unknown platform' }, { status: 400 });
    }

    await base44.asServiceRole.entities.SocialMediaPost.update(post.id, { status: 'published' });

    return Response.json({ status: 'success', platform: post.platform, ...result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

async function publishToLinkedIn(base44, post) {
  const { accessToken } = await base44.asServiceRole.connectors.getConnection('linkedin');
  if (!accessToken) throw new Error('LinkedIn not connected');

  // Get organization ID
  const orgResp = await fetch('https://api.linkedin.com/v2/organizations?q=role&role=ADMINISTRATOR&projection=(elements*(id,name))', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });
  const orgData = await orgResp.json();
  const orgId = orgData.elements?.[0]?.id;
  if (!orgId) throw new Error('No LinkedIn organization found. Are you an admin of a Company Page?');
  const authorUrn = `urn:li:organization:${orgId}`;

  let mediaAsset = null;
  if (post.image_url) {
    // Register upload
    const registerResp = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        registerUploadRequest: {
          recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
          owner: authorUrn,
          serviceRelationships: [{ relationshipType: 'OWNER', identifier: 'urn:li:userGeneratedContent' }],
        },
      }),
    });
    const registerData = await registerResp.json();
    const uploadUrl = registerData.value?.uploadMechanism?.['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest']?.uploadUrl;
    const assetUrn = registerData.value?.asset;
    if (uploadUrl && assetUrn) {
      // Download image and upload to LinkedIn
      const imgResp = await fetch(post.image_url);
      const imgBlob = await imgResp.blob();
      await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': imgBlob.type }, body: imgBlob });
      mediaAsset = assetUrn;
    }
  }

  const shareContent = {
    shareCommentary: { text: post.content },
  };
  if (mediaAsset) {
    shareContent.shareMediaCategory = 'IMAGE';
    shareContent.media = [{
      status: 'READY',
      media: mediaAsset,
      title: { text: post.topic },
    }];
  } else {
    shareContent.shareMediaCategory = 'NONE';
  }

  const postResp = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'X-Restli-Protocol-Version': '2.0.0' },
    body: JSON.stringify({
      author: authorUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: { 'com.linkedin.ugc.ShareContent': shareContent },
      visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
    }),
  });
  const postData = await postResp.json();
  if (!postResp.ok) throw new Error(`LinkedIn API error: ${postData.message || JSON.stringify(postData)}`);

  return { post_id: postData.id, url: `https://www.linkedin.com/feed/update/${postData.id}/` };
}

async function publishToFacebook(base44, post) {
  const { accessToken } = await base44.asServiceRole.connectors.getConnection('facebook_pages');
  if (!accessToken) throw new Error('Facebook not connected');

  // Get page ID and page access token
  const accountsResp = await fetch(`https://graph.facebook.com/v25.0/me/accounts?fields=id,name,access_token&access_token=${accessToken}`);
  const accountsData = await accountsResp.json();
  const page = accountsData.data?.[0];
  if (!page) throw new Error('No Facebook Pages found');
  const pageToken = page.access_token;
  const pageId = page.id;

  let fbPostData;
  if (post.image_url) {
    // Post with image
    const photoResp = await fetch(`https://graph.facebook.com/v25.0/${pageId}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: post.image_url, message: post.content, access_token: pageToken }),
    });
    fbPostData = await photoResp.json();
    if (!photoResp.ok) throw new Error(`Facebook API error: ${fbPostData.error?.message || JSON.stringify(fbPostData)}`);
    return { post_id: fbPostData.post_id, url: `https://www.facebook.com/${pageId}/posts/${fbPostData.post_id}` };
  } else {
    // Text-only post
    const feedResp = await fetch(`https://graph.facebook.com/v25.0/${pageId}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: post.content, access_token: pageToken }),
    });
    fbPostData = await feedResp.json();
    if (!feedResp.ok) throw new Error(`Facebook API error: ${fbPostData.error?.message || JSON.stringify(fbPostData)}`);
    return { post_id: fbPostData.id, url: `https://www.facebook.com/${pageId}/posts/${fbPostData.id}` };
  }
}

async function publishToInstagram(base44, post) {
  const { accessToken } = await base44.asServiceRole.connectors.getConnection('instagram');
  if (!accessToken) throw new Error('Instagram not connected');

  // Get IG user ID
  const meResp = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
  const meData = await meResp.json();
  const igUserId = meData.id;
  if (!igUserId) throw new Error('Could not determine Instagram user ID');

  if (!post.image_url) throw new Error('Instagram requires an image for all posts');

  // Step 1: Create media container
  const containerResp = await fetch(`https://graph.instagram.com/${igUserId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image_url: post.image_url,
      caption: post.content,
      access_token: accessToken,
    }),
  });
  const containerData = await containerResp.json();
  if (!containerResp.ok) throw new Error(`Instagram container error: ${containerData.error?.message || JSON.stringify(containerData)}`);
  const creationId = containerData.id;

  // Step 2: Publish the container
  const publishResp = await fetch(`https://graph.instagram.com/${igUserId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creation_id: creationId, access_token: accessToken }),
  });
  const publishData = await publishResp.json();
  if (!publishResp.ok) throw new Error(`Instagram publish error: ${publishData.error?.message || JSON.stringify(publishData)}`);

  return { post_id: publishData.id, url: `https://www.instagram.com/p/${publishData.id}/` };
}