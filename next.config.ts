import type { NextConfig } from "next";
import { getHiddenSlugs, getProjectRoutes } from "./src/content/projects";

// Slugs that were renamed, mapped to the current slug.
const RENAMED: Record<string, string> = {
  "pavillion-360": "pavilion-360",
  "oskaz-erp": "obsidian-erp",
  "obsidian-erp-v3.0": "obsidian-erp",
};

// Projects taken off the site. Their old URLs (case study, other section and
// legacy /projects) go straight to /work, so an old link lands on the listing
// instead of a 404.
const REMOVED = ["tibeb", "potentia", "pana-web", "fastpay", "threatmatrix-ai"];

// Projects kept in src/content/projects but hidden for now (visibility: 'hide'),
// whose old URLs are linked from elsewhere (the GitHub profile READMEs link to
// /products/jarvis). Each URL goes to the listing named here in one hop instead
// of a 404. To show the project again, set it to 'show' and delete its line.
const PARKED: Record<string, string> = {
  jarvis: "/products",
};

const OTHER_SECTION = { work: "products", products: "work" } as const;

const nextConfig: NextConfig = {
  // Product screenshots are most of a page's weight. Browsers that take AVIF get
  // it (smaller than WebP for flat interface screens); the rest get WebP.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Every redirect is a single permanent hop to the page's current URL, and the
  // project ones are generated from src/content/projects, so moving a project
  // between /work and /products (its `kind` or `section`) moves its redirects too.
  // Matching ignores case; src/proxy.ts lowercases any other mixed-case URL.
  async redirects() {
    const routes = getProjectRoutes();
    const sectionOf = new Map(routes.map(({ slug, section }) => [slug, section]));
    for (const slug of REMOVED) {
      if (sectionOf.has(slug)) throw new Error(`"${slug}" is on the site again; take it out of REMOVED in next.config.ts`);
    }
    const hidden = new Set(getHiddenSlugs());
    for (const slug of Object.keys(PARKED)) {
      if (sectionOf.has(slug)) throw new Error(`"${slug}" is on the site again; take it out of PARKED in next.config.ts`);
      if (!hidden.has(slug)) throw new Error(`"${slug}" in PARKED is not a hidden project; a deleted one belongs in REMOVED`);
    }

    return [
      { source: "/studio", destination: "/work", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/blog", destination: "/notes", permanent: true },
      ...Object.entries(RENAMED).flatMap(([oldSlug, slug]) => {
        const section = sectionOf.get(slug);
        return section ? [{ source: `/projects/${oldSlug}`, destination: `/${section}/${slug}`, permanent: true }] : [];
      }),
      // Old case study URLs, and a slug asked for under the other section.
      ...routes.flatMap(({ slug, section }) => [
        { source: `/projects/${slug}`, destination: `/${section}/${slug}`, permanent: true },
        { source: `/${OTHER_SECTION[section]}/${slug}`, destination: `/${section}/${slug}`, permanent: true },
      ]),
      // Removed projects: one hop to the listing. These come before the /projects
      // fallback below, which would otherwise send /projects/<slug> to a dead /work/<slug>.
      ...REMOVED.flatMap((slug) =>
        ["work", "products", "projects"].map((prefix) => ({
          source: `/${prefix}/${slug}`,
          destination: "/work",
          permanent: true,
        })),
      ),
      // Parked (hidden) projects: one hop to the listing PARKED names.
      ...Object.entries(PARKED).flatMap(([slug, destination]) =>
        ["work", "products", "projects"].map((prefix) => ({ source: `/${prefix}/${slug}`, destination, permanent: true })),
      ),
      // Anything else under /projects lands on /work, where an unknown slug is a 404.
      { source: "/projects/:path*", destination: "/work/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
