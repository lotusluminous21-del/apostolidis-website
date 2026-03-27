/**
 * Trigger on-demand revalidation for the given paths.
 * Call this after CMS save operations to ensure the live site
 * reflects the latest changes instantly.
 *
 * @param paths - Array of path prefixes to revalidate (e.g. ["/", "/projects"])
 *                If empty, revalidates all common paths.
 */
export async function triggerRevalidation(paths: string[] = []): Promise<void> {
  try {
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paths }),
    });
  } catch (err) {
    // Non-blocking: don't let revalidation failures affect the CMS UX
    console.warn('Revalidation request failed (non-blocking):', err);
  }
}
