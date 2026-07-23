import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const INDUSTRY = 'AI-first digital marketing, SEO, SEM, CRO, social media marketing, marketing automation, and software development for SMBs and enterprise';
const COMPANY = 'Fahrenheit Marketing — an AI-first digital marketing agency based in Austin, Texas, serving clients since 2008. Services include Strategy, SEO, SEM, Social Media, CRO, Marketing Automation, and Software Development. Retainers start at $1,500/month. Month-to-month, no contracts.';
const CATEGORIES = [
  'SEO', 'Data & Analytics', 'Heat Mapping & UX', 'Conversion Rate Optimization',
  'AI-Assisted PPC', 'AI-Enabled Development', 'Strategy & Growth',
  'Social Media & Influencer', 'UX & Accessibility'
];

const SLUGIFY = (text) => {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 80);
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    const body = await req.json().catch(() => ({}));
    const topicOverride = body.topic || null;
    const category = body.category || null;

    // Step 1: Research trending topics (or use override)
    let selectedTopic;
    if (topicOverride) {
      selectedTopic = topicOverride;
    } else {
      const researchResponse = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: `You are an expert content strategist for ${COMPANY}
        
Your task: Research the current state of ${INDUSTRY} and identify ONE high-impact article topic that would:
1. Be highly relevant to business owners and marketing decision-makers right now
2. Have strong SEO potential (search volume, intent, and ranking opportunity)
3. Align with LLM recommendation patterns (how AI assistants recommend marketing solutions)
4. Support conversion by addressing pain points that Fahrenheit Marketing's services solve
5. Be fresh — not generic evergreen content that everyone has already written

Consider current trends, algorithm changes, new AI tools, industry shifts, and seasonal factors.

Return ONLY a JSON object with:
- "topic": a compelling, specific article title (not generic)
- "category": one of ${CATEGORIES.join(', ')}
- "primary_keyword": the main SEO target keyword
- "secondary_keywords": array of 3-5 supporting keywords
- "search_intent": informational, commercial, or transactional
- "why_this_topic": brief rationale for why this topic matters now`,
        add_context_from_internet: true,
        response_json_schema: {
          type: 'object',
          properties: {
            topic: { type: 'string' },
            category: { type: 'string' },
            primary_keyword: { type: 'string' },
            secondary_keywords: { type: 'array', items: { type: 'string' } },
            search_intent: { type: 'string' },
            why_this_topic: { type: 'string' }
          }
        }
      });
      selectedTopic = researchResponse;
    }

    const finalCategory = category || selectedTopic.category || 'Strategy & Growth';

    // Step 2: Write the full article + FAQ
    const articleResponse = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `You are an expert SEO content writer and digital marketing strategist for ${COMPANY}

Write a comprehensive, in-depth article on the following topic:

TOPIC: ${selectedTopic.topic}
PRIMARY KEYWORD: ${selectedTopic.primary_keyword || 'N/A'}
SECONDARY KEYWORDS: ${(selectedTopic.secondary_keywords || []).join(', ')}
SEARCH INTENT: ${selectedTopic.search_intent || 'informational'}
CATEGORY: ${finalCategory}

SEO & CONTENT REQUIREMENTS:
1. Write 1,500–2,500 words of original, valuable content
2. Include the primary keyword naturally in the title, first paragraph, headings, and throughout
3. Use proper heading hierarchy (H2, H3) with keyword-rich subheadings
4. Write a compelling meta description (under 160 chars) for search snippets
5. Include internal linking suggestions to Fahrenheit Marketing service pages where relevant
6. Optimize for featured snippets — use clear definitions, lists, and tables where appropriate
7. Write for LLM discoverability — clear structure, factual claims, definitive answers
8. Support conversion — include subtle CTAs linking to /contact, /pricing, or relevant service pages
9. Use data, statistics, and examples to build authority (E-E-A-T)
10. Write in a professional but approachable tone matching Fahrenheit Marketing's brand

STRUCTURE:
- Compelling title (H1)
- Engaging introduction with hook and keyword
- 4-6 main sections with H2 headings
- Subsections with H3 where needed
- Practical examples and actionable takeaways
- A "Key Takeaways" section
- An FAQ section with 4-6 common questions and concise, authoritative answers (optimized for voice search and featured snippets)
- A brief author bio / CTA paragraph

Return the FULL article as markdown. Do NOT include code fences.`,
      add_context_from_internet: true
    });

    const articleContent = typeof articleResponse === 'string' ? articleResponse : articleResponse.content || JSON.stringify(articleResponse);

    // Step 3: Generate excerpt and metadata
    const metaResponse = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt: `Based on the following article, extract or generate:
1. A compelling excerpt (2-3 sentences, under 300 chars) for blog listing pages
2. An estimated read time (e.g., "8 min read")
3. A clean URL slug

ARTICLE:
${articleContent.substring(0, 3000)}

Return JSON: { "excerpt": "...", "read_time": "...", "slug": "..." }`,
      response_json_schema: {
        type: 'object',
        properties: {
          excerpt: { type: 'string' },
          read_time: { type: 'string' },
          slug: { type: 'string' }
        }
      }
    });

    // Step 4: Generate featured image
    const imagePrompt = `A professional, modern, editorial-style illustration for a digital marketing blog article titled "${selectedTopic.topic}". 
The image should be visually striking, using a sophisticated color palette of deep charcoal, warm burnt orange, and cream tones. 
Abstract or conceptual, representing the theme of AI-powered marketing, growth, and technology. 
No text in the image. Clean, high-quality, suitable as a featured blog image. 16:9 aspect ratio.`;

    const imageResponse = await base44.asServiceRole.integrations.Core.GenerateImage({
      prompt: imagePrompt
    });

    // Step 5: Create the BlogPost entity
    const slug = metaResponse.slug || SLUGIFY(selectedTopic.topic);
    const today = new Date().toISOString().split('T')[0];

    const blogPost = await base44.asServiceRole.entities.BlogPost.create({
      title: selectedTopic.topic,
      slug: slug,
      category: finalCategory,
      excerpt: metaResponse.excerpt || '',
      content: articleContent,
      author: 'Fahrenheit Marketing',
      read_time: metaResponse.read_time || '8 min read',
      published_date: today,
      featured: false
    });

    return Response.json({
      success: true,
      post_id: blogPost.id,
      title: blogPost.title,
      slug: blogPost.slug,
      category: blogPost.category,
      featured_image_url: imageResponse.url
    });
  } catch (error) {
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
});