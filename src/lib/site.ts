import type { Metadata } from 'next';

// The one public origin for canonical URLs, Open Graph, robots and the sitemap.
export const SITE_URL = 'https://www.versalabs-studio.com';
export const SITE_NAME = 'VersaLabs Studio';
export const CONTACT_EMAIL = 'contact@versalabs-studio.com';
export const DEFAULT_DESCRIPTION =
  'VersaLabs Studio makes business software: ready-to-use products, and custom ERP systems, online stores, websites and AI tools built for your business. Based in Addis Ababa, Ethiopia.';

const DEFAULT_OG_IMAGE = { url: '/versalabs-logo.png', width: 1000, height: 1000, alt: SITE_NAME };

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt: string };
  // The page has its own opengraph-image file (case studies), which Next adds
  // to the head itself; set this so no other image competes with it.
  generatedImage?: boolean;
  noindex?: boolean;
}

// Next merges metadata shallowly, so a page that sets openGraph or twitter
// replaces the layout's object. Build the full set here for every page.
export function pageMetadata({ title, description, path, image, generatedImage, noindex }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      url: path,
      title: fullTitle,
      description,
      ...(generatedImage ? {} : { images: [ogImage] }),
    },
    twitter: {
      card: image || generatedImage ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      ...(generatedImage ? {} : { images: [ogImage.url] }),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
