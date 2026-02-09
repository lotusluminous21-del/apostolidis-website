import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "../globals.css";

import { Footer } from "@/components/layout/footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { PrecisionGrid } from "@/components/ui/precision-grid";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { TechnicalFrame } from "@/components/layout/technical-frame";

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
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://georgeapostolidis.gr',
      siteName: 'George Apostolidis',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    }
  };
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

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${manrope.variable} min-h-screen bg-background font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            {/* Precision Grid is now part of the frame or background, but we can keep it for the inner content too */}

            <TechnicalFrame>
              {children}
              <Footer />
            </TechnicalFrame>
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
