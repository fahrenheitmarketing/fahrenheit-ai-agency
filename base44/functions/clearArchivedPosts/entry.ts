import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: admin access required' }, { status: 403 });
    }

    const result = await base44.asServiceRole.entities.SocialMediaPost.deleteMany(
      { status: 'published' }
    );

    return Response.json({
      status: 'success',
      deleted: result?.deleted || result?.count || 0,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}