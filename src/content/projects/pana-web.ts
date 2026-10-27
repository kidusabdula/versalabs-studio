import { defineProject } from '../schema';

export default defineProject({
  slug: "pana-web",
  title: "Pana Web",
  subtitle: "Company Website for a Printing & Branding House",
  summary: "A fast, mobile-friendly company website for a printing and branding business in Addis Ababa. Each of its eight services gets its own page.",
  category: "Corporate Web",
  tags: ["Corporate", "Web Design", "Print & Branding"],
  year: "2025",
  status: "Production",
  kind: "client",
  industry: ["Printing"],
  stack: ["Next.js"],
  // Live link held: the live site shows unverified ratings and project counts
  // beside real client organisations (Ministry of Health, Ethiopian Athletics
  // Federation). Restore it once the client confirms or removes those figures.
  links: {},
  heroGradient: "from-emerald-500/20 via-transparent to-teal-500/10",
  cover: "/images/pana-web/mockup-01.webp",
  gallery: [
    { src: "/images/pana-web/mockup-01.webp", alt: "Pana Web homepage hero in a browser window on a yellow backdrop", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/pana-web/mockup-02.webp", alt: "Pana Web services grid in an angled browser window on yellow", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/pana-web/mockup-03.webp", alt: "Pana Web client logos section in a browser window, cropped close-up on yellow", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/pana-web/mockup-04.webp", alt: "Pana Web about page with mission and vision in a browser window on yellow", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/pana-web/screen-01.webp", alt: "Pana Web homepage hero with service highlights, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/pana-web/screen-02.webp", alt: "Pana Web services grid with eight print and branding services, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/pana-web/screen-03.webp", alt: "Pana Web about section with mission, vision and company stats, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
  ],
  description: "Pana Web is the company website for a printing and branding house in Addis Ababa. It presents eight services, from digital print and signage to merchandise and events, each with its own page. Visitors can read about the company, browse past clients, and find the office on the map. It works well on phones.",
  businessProblem: "Businesses operating with outdated or template-based websites lose credibility with potential clients, resulting in missed opportunities and a brand perception gap that undermines their actual service quality.",
  architecturalSolution: "A Next.js 16 App Router site with static, typed service data rendered into one shared service template. Per-service metadata comes from generateMetadata, and a Next.js proxy normalises service slugs and title aliases to canonical URLs.",
  systemFlow: "Home → Services → Service Detail (8 services) → About / Past Clients → Contact & Directions",
  techStack: [
    {
      label: "Frontend",
      items: [
        { name: "Next.js", version: "16.0.10", purpose: "App Router web framework" },
        { name: "React", version: "19.2", purpose: "UI library" },
        { name: "TypeScript", version: "5.x", purpose: "Reliable codebase" },
        { name: "Tailwind CSS", version: "4.x", purpose: "Custom design system" },
        { name: "Framer Motion", version: "12", purpose: "Page and section animations" },
        { name: "Radix UI", purpose: "Accessible component primitives" },
      ],
    },
  ],
  architecture: {
    pattern: "Static-Data Corporate Site on Next.js App Router",
    diagram: "Typed Service Data → Shared Service Template → Next.js App Router Pages → Vercel",
    designPatterns: [
      "Single Service Template Driven by Typed Data",
      "Slug Normalisation in Next.js Proxy",
      "Per-Route Metadata (generateMetadata)",
      "Responsive Tailwind 4 Design System",
    ],
  },
  boundedContexts: [
    { name: "Pages", responsibility: "Home, about, blog, and services pages", entities: ["Page"] },
    {
      name: "Service Catalogue",
      responsibility: "Eight typed service records rendered through one template",
      entities: ["Service"],
    },
  ],
  schema: [
    {
      name: "services-data.ts",
      description: "Typed service records (no database)",
      keyFields: ["slug", "title", "subtitle", "description", "images"],
    },
  ],
  features: [
    { title: "One Page per Service", description: "Eight service pages share one clean layout, so new services are quick to add." },
    { title: "Directions to the Office", description: "Clear calls to action on every page, plus one-tap directions to the office." },
    { title: "Mobile-First Responsive", description: "A consistent experience across every device, from desktop monitors to mobile phones." },
    { title: "Search-Ready Pages", description: "Each service page has its own search title and description." },
  ],
  adrs: [
    { id: "ADR-001", title: "Server-Side Rendering for Performance", status: "Accepted", rationale: "Fast first loads help visitors and search engines." },
    { id: "ADR-002", title: "Static Typed Service Data", status: "Accepted", rationale: "No CMS needed for eight services that rarely change." },
  ],
});
