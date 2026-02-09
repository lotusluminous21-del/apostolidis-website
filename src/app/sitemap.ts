import { MetadataRoute } from 'next'

const BASE_URL = 'https://georgeapostolidis.gr'

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/projects',
        '/contact',
    ]

    // Mock projects for sitemap
    const projects = ['ap-001', 'ap-002', 'ap-003', 'ap-004', 'ap-005', 'ap-006']

    const locales = ['el', 'en']

    const sitemapEntries = routes.flatMap(route =>
        locales.map(locale => ({
            url: `${BASE_URL}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: route === '' ? 1 : 0.8,
        }))
    )

    const projectEntries = projects.flatMap(slug =>
        locales.map(locale => ({
            url: `${BASE_URL}/${locale}/projects/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    )

    return [
        ...sitemapEntries,
        ...projectEntries
    ]
}
