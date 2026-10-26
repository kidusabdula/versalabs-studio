import { defineProject } from '../schema';

export default defineProject({
  slug: "live-addis",
  title: "Live Addis",
  subtitle: "Official Website for Live Addis NGO",
  summary: "A clean, mobile-friendly website for LIVE-ADDIS, a non-profit in Addis Ababa that supports vulnerable young people. It presents the organization’s mission, programs, team, and news.",
  category: "Corporate Web",
  tags: ["Corporate", "Web Design", "NGO"],
  year: "2025",
  status: "Production",
  kind: "client",
  industry: ["Nonprofit"],
  stack: ["Next.js"],
  links: {},
  heroGradient: "from-pink-500/20 via-transparent to-rose-500/10",
  cover: "/images/live-addis/mockup-07.webp",
  gallery: [
    { src: "/images/live-addis/mockup-06.webp", alt: "Live Addis FAQ page with expandable questions in a browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/live-addis/mockup-07.webp", alt: "Live Addis Stories of Impact section, phone close-up on a pink backdrop", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/live-addis/screen-03.webp", alt: "Live Addis mobile Stories of Impact carousel with a news card", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/live-addis/screen-11.webp", alt: "Live Addis Stories of Impact news cards with photos, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/live-addis/screen-13.webp", alt: "Live Addis APHEET program section with a workshop photo, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/live-addis/screen-20.webp", alt: "Live Addis FAQ page with grouped expandable questions, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
  ],
  description: "Live Addis is the website for LIVE-ADDIS (Livelihood Improvement for Vulnerable Ethiopians – Addis Ababa), a non-profit that supports vulnerable youth through vocational training, entrepreneurship, and health awareness. It is a static site with pages for the organization’s story, team and timeline, a blog built from the NGO’s Facebook posts, contact details, and an FAQ. There is no backend: all content ships with the site.",
  businessProblem: "The NGO needed a modern, professional online presence to communicate their mission, share program updates, and attract supporters — replacing an outdated digital footprint that limited their reach and credibility.",
  architecturalSolution: "A static Next.js 16 site with no backend, database, or API. Blog posts come from a one-off scrape of the NGO’s Facebook page: a download script saves each post’s images and writes a JSON file that the home and blog pages import. Pages are prerendered, so content is immediately available to search engines.",
  systemFlow: "Facebook Page Scrape → Image Download Script → clean_data.json → Home & Blog Pages → Static Build on Vercel",
  techStack: [
    {
      label: "Frontend",
      items: [
        { name: "Next.js", version: "16.0.10", purpose: "App Router with static generation" },
        { name: "React", version: "19.2.1", purpose: "Component-based UI" },
        { name: "TypeScript", version: "5", purpose: "Type-safe development" },
        { name: "Tailwind CSS", version: "4", purpose: "Utility-first styling" },
        { name: "Framer Motion", version: "12", purpose: "Page animations" },
        { name: "Swiper", version: "12", purpose: "Carousels" },
        { name: "Radix UI", purpose: "Accordion, dialog, and switch primitives" },
        { name: "next-themes", purpose: "Light and dark themes" },
      ],
    },
    {
      label: "Content",
      items: [
        { name: "Facebook page scrape", purpose: "One-off export of the NGO’s posts" },
        { name: "Image download script", purpose: "Saves post images and writes the blog data file" },
      ],
    },
    {
      label: "Infrastructure",
      items: [{ name: "Vercel", purpose: "Static hosting" }, { name: "pnpm", purpose: "Package management" }],
    },
  ],
  architecture: {
    pattern: "Static Marketing Site with Build-Time Content",
    diagram: "Facebook Page Scrape → Download Script → clean_data.json + public/images/posts → Next.js Pages (home, about, blog, contact, faq) → Vercel",
    designPatterns: [
      "Static Generation (no backend)",
      "Build-Time Content from JSON",
      "Shared Layout (navbar and footer)",
      "Light and Dark Themes",
    ],
  },
  boundedContexts: [
    {
      name: "Organization",
      responsibility: "Mission, programs, team, and timeline pages",
      entities: ["Page", "TeamMember", "Program"],
    },
    {
      name: "Blog",
      responsibility: "News posts republished from the NGO’s Facebook page",
      entities: ["Post"],
    },
  ],
  schema: [
    {
      name: "clean_data.json",
      description: "Blog posts from the NGO’s Facebook page (no database)",
      keyFields: ["id", "text", "url", "likes", "comments", "shares", "media"],
    },
  ],
  features: [
    { title: "Mission and Programs", description: "Clear pages for the organization’s story, programs, team, and timeline." },
    { title: "Blog from Facebook Posts", description: "The NGO’s Facebook updates become blog posts on the site, with their photos." },
    { title: "Mobile-Friendly Design", description: "Works well on phones, with smooth page animations." },
    { title: "Light and Dark Themes", description: "Visitors can switch between light and dark modes." },
    { title: "FAQ and Contact", description: "Common questions answered, with contact details on every page." },
  ],
  adrs: [
    { id: "ADR-001", title: "Static Site with No Backend", status: "Accepted", rationale: "An NGO site that rarely changes needs no server, database, or running costs." },
    { id: "ADR-002", title: "Blog Content from a Facebook Scrape", status: "Accepted", rationale: "Reuses the posts the NGO already writes instead of a second publishing workflow." },
    { id: "ADR-003", title: "Next.js with TypeScript for UI", status: "Accepted", rationale: "Static generation and excellent developer ergonomics." },
  ],
});
