import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/navigation';

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for:
    // - /api, /_next, /_vercel routes
    // - files with extensions (e.g. favicon.ico)
    // - /admin routes (admin panel has its own layout, no i18n)
    matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)']
};
