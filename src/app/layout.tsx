import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/case-study/JsonLd";
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, CONTACT_EMAIL } from "@/lib/site";

// display "optional": the fonts are preloaded, and a preloaded optional font is
// either ready for the first paint or not used on that page view, so it never
// swaps in afterwards. A swap reflowed the home hero (it sizes to its text) and
// pushed the products below it: a layout shift Lighthouse traced to "Web font
// loaded". The fallbacks are metric-matched Arial, so a missed font only looks
// slightly plainer on a slow first visit; later pages have it cached.
//
// Two families, both variable, so each is one file whatever weights the pages use: Outfit (the brand face) for every
// heading and paragraph, and Geist Mono for labels. Every font file starts before the first paint, so Lighthouse counts
// it toward the mobile LCP; a third family (Geist for body text) cost 29 KB there and was dropped.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

// Applies a saved light theme before the first paint (src/components/layout/ThemeToggle.tsx). Dark needs nothing: it
// is the default in globals.css. Wrapped in try because storage can be blocked.
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const DEFAULT_TITLE = `${SITE_NAME} | Business Software Products and Custom Builds`;

// Pages override title, description, canonical and social cards through
// pageMetadata() in src/lib/site.ts; these are the home page and fallbacks.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/versalabs-logo.png", width: 1000, height: 1000, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/versalabs-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: THEME_SCRIPT sets data-theme on <html> before React hydrates; nothing else differs.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/versalabs-logo.png`,
            description: DEFAULT_DESCRIPTION,
            email: CONTACT_EMAIL,
            foundingDate: "2023",
            address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" },
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium focus:text-background"
        >
          Skip to content
        </a>
        <Navbar />
        <Analytics />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
