import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-demand revalidation API route.
 * Called by the admin CMS after saving changes to bust the static cache.
 *
 * Usage: POST /api/revalidate
 * Body: { "paths": ["/", "/projects", "/projects/my-slug"] }
 *
 * If no paths are provided, revalidates all common paths.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const paths: string[] = body.paths || [];

    if (paths.length === 0) {
      // Revalidate all common paths for both locales
      const defaultPaths = [
        '/en',
        '/el',
        '/en/projects',
        '/el/projects',
      ];
      for (const p of defaultPaths) {
        revalidatePath(p);
      }
    } else {
      for (const p of paths) {
        // Revalidate for both locales
        revalidatePath(`/en${p === '/' ? '' : p}`);
        revalidatePath(`/el${p === '/' ? '' : p}`);
      }
    }

    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { revalidated: false, error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
