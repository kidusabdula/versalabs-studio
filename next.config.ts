import type { NextConfig } from "next";
import { getProjectRoutes } from "./src/content/projects";

// Slugs that were renamed, mapped to the current slug.
const RENAMED: Record<string, string> = {
  "pavillion-360": "pavilion-360",
  "oskaz-erp": "obsidian-erp",
  "obsidian-erp-v3.0": "obsidian-erp",
};

const OTHER_SECTION = { work: "products", products: "work" } as const;

const nextConfig: NextConfig = {
  // Every redirect is a single permanent hop to the page's current URL, and the
  // project ones are generated from src/content/projects, so moving a project
  // between /work and /products (its `kind` or `section`) moves its redirects too.
  // Matching ignores case; src/proxy.ts lowercases any other mixed-case URL.
  async redirects() {
    const routes = getProjectRoutes();
    const sectionOf = new Map(routes.map(({ slug, section }) => [slug, section]));

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
      // Anything else under /projects lands on /work, where an unknown slug is a 404.
      { source: "/projects/:path*", destination: "/work/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
