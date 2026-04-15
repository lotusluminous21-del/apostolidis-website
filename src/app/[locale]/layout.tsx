import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "../globals.css";

import { Footer } from "@/components/layout/footer";
import { getSiteSettings } from "@/lib/firestore-data";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { PrecisionGrid } from "@/components/ui/precision-grid";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { TechnicalFrame } from "@/components/layout/technical-frame";
import { BootProvider } from "@/contexts/boot-context";

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin", "greek"],
  variable: "--font-manrope",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://apostolidisconstruction.gr'),
    alternates: {
      canonical: '/',
      languages: {
        'el-GR': '/el',
        'en-US': '/en',
      },
    },
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico?v=2', sizes: 'any' },
        { url: '/favicon.svg?v=2', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png?v=2',
      shortcut: '/favicon-32x32.png?v=2',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://apostolidisconstruction.gr',
      siteName: t('siteName'),
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/images/apostolidis_hero_video_alt_poster.webp',
          width: 1280,
          height: 720,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/apostolidis_hero_video_alt_poster.webp'],
    }
  };
}

export function generateStaticParams() {
  return [
    { locale: 'el' },
    { locale: 'en' }
  ];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  const settings = await getSiteSettings();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${manrope.variable} min-h-screen bg-background font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <BootProvider>
            <SmoothScroll>
              {/* Precision Grid is now part of the frame or background, but we can keep it for the inner content too */}

              <TechnicalFrame settings={settings}>
                {children}
                <Footer settings={settings} />
              </TechnicalFrame>
            </SmoothScroll>
          </BootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
