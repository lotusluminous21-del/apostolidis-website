/**
 * Curated URLs to warm up during the boot splash (first meaningful paint path).
 * Not exhaustive — extend here instead of scattering preload hints across the app.
 */
export type CriticalAssetKind = "image" | "video" | "fetch"

export interface CriticalAsset {
    href: string
    as: CriticalAssetKind
    /** Optional description for debugging */
    label?: string
}

export const CRITICAL_ASSETS: CriticalAsset[] = [
    {
        href: "/images/apostolidis_hero_video_alt.mp4",
        as: "video",
        label: "hero_video",
    },
    {
        href: "/images/apostolidis_hero_video_alt_poster.webp",
        as: "image",
        label: "hero_poster",
    },
    {
        href: "/apostolidis_logo.svg",
        as: "image",
        label: "header_logo",
    },
    {
        href: "/favicon.svg",
        as: "image",
        label: "favicon_mark",
    },
]
