import { defineProject } from '../schema';

export default defineProject({
  slug: "unlock-ethiopia-potential",
  title: "Unlock Ethiopia Potential",
  subtitle: "Bitcoin Mining Summit 2025",
  summary: "The website for a Bitcoin mining summit in Ethiopia. An immersive event landing page showcasing speakers, partners, and the agenda.",
  category: "Events",
  tags: ["Events", "Blockchain", "Landing Page"],
  year: "2025",
  status: "Production",
  kind: "client",
  links: { live: "https://www.unlockethiopiapotential.com/" },
  heroGradient: "from-[#AF8F6F]/20 via-transparent to-[#74512D]/10",
  cover: "/images/unlock-ethiopia-potential/mockup-01.webp",
  gallery: [
    { src: "/images/unlock-ethiopia-potential/mockup-01.webp", alt: "Unlock Ethiopia Potential: product mockup 1", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-02.webp", alt: "Unlock Ethiopia Potential: product mockup 2", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-03.webp", alt: "Unlock Ethiopia Potential: product mockup 3", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-04.webp", alt: "Unlock Ethiopia Potential: product mockup 4", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-05.webp", alt: "Unlock Ethiopia Potential: product mockup 5", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-06.webp", alt: "Unlock Ethiopia Potential: product mockup 6", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-07.webp", alt: "Unlock Ethiopia Potential: product mockup 7", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-08.webp", alt: "Unlock Ethiopia Potential: product mockup 8", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-01.webp", alt: "Unlock Ethiopia Potential: screenshot 1", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-02.webp", alt: "Unlock Ethiopia Potential: screenshot 2", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-03.webp", alt: "Unlock Ethiopia Potential: screenshot 3", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-04.webp", alt: "Unlock Ethiopia Potential: screenshot 4", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-05.webp", alt: "Unlock Ethiopia Potential: screenshot 5", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-06.webp", alt: "Unlock Ethiopia Potential: screenshot 6", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-07.webp", alt: "Unlock Ethiopia Potential: screenshot 7", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-08.webp", alt: "Unlock Ethiopia Potential: screenshot 8", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-09.webp", alt: "Unlock Ethiopia Potential: screenshot 9", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-10.webp", alt: "Unlock Ethiopia Potential: screenshot 10", kind: "screen", width: 865, height: 1920, reviewed: true },
  ],
  description: "Unlock Ethiopia Potential is the website for a Bitcoin mining summit held in Ethiopia in March 2025. Built as an immersive web experience, it highlights the nation's rising status as a global destination for Bitcoin mining. The platform features an interactive agenda, speaker profiles, a comprehensive partner showcase, and data-driven insights into energy allocation and hashrate metrics.",
  businessProblem: "A premier international summit requires a digital presence that reflects its magnitude. The organizers needed a premium, performant platform capable of handling international traffic, presenting complex industry statistics elegantly, and driving ticket registrations without relying on generic event templates.",
  architecturalSolution: "A component-based React SPA built with Vite for rapid loading and Framer Motion for cinematic scroll reveals. The architecture separates the agenda, vital statistics, and sponsor grids into isolated, easily updatable components. The routing is handled entirely client-side for zero-latency navigation, with a seamless handoff to Google Forms for registration processing.",
  systemFlow: "Visitor Arrival → Immersive Hero Animation → Industry Statistics Reveal → Agenda/Speaker Exploration → Registration Redirect",
  techStack: [
    {
      label: "Frontend",
      items: [
        { name: "React", version: "19+", purpose: "Component-based UI rendering" },
        { name: "Vite", version: "6+", purpose: "Lightning-fast build tooling and HMR" },
        { name: "React Router DOM", purpose: "Client-side SPA navigation" },
      ],
    },
    {
      label: "Styling & Animation",
      items: [
        { name: "Tailwind CSS", version: "4+", purpose: "Utility-first design system" },
        { name: "Framer Motion", version: "12+", purpose: "Declarative scroll and layout animations" },
        { name: "Flowbite", purpose: "Accessible Tailwind UI components" },
      ],
    },
  ],
  architecture: {
    pattern: "Single-Page Application (SPA) with Client-Side Routing",
    diagram: "Vite Bundler → React App Router → Shared UI Components (Hero, Teams, Vital-Info) → External Registration",
    designPatterns: ["Component-Based Architecture", "Declarative Animation Logic", "Mobile-First Responsive Grid"],
  },
  boundedContexts: [
    {
      name: "Event Promotion",
      responsibility: "Hero, mission statement, and statistics",
      entities: ["StatisticCard", "HeroSection"],
    },
    {
      name: "Schedule & People",
      responsibility: "Agenda timeline, speaker profiles, and sponsor grids",
      entities: ["Speaker", "Session", "Sponsor"],
    },
  ],
  schema: [
    {
      name: "Event Content",
      description: "Static content structures powering the UI",
      keyFields: ["title", "description", "image_asset", "social_links"],
    },
  ],
  features: [
    { title: "Cinematic Scroll Reveals", description: "Framer Motion powers smooth fade-ins, slide-ups, and floating background elements for a premium feel." },
    { title: "Dynamic Partner Grid", description: "Responsive showcase of the summit's partner organizations, with per-logo scaling and hover effects." },
    { title: "Vital Industry Statistics", description: "Animated data cards presenting Ethiopia's hashrate, energy allocation, and mining footprint." },
    { title: "Interactive Agenda", description: "Day-by-day timeline with speaker profiles, session descriptions, and integrated LinkedIn links." },
  ],
  adrs: [
    { id: "ADR-001", title: "Vite + React SPA", status: "Accepted", rationale: "Static event content does not require SSR; SPA provides fastest possible intra-page navigation." },
    { id: "ADR-002", title: "Framer Motion for Animations", status: "Accepted", rationale: "Declarative API simplifies complex scroll-triggered reveals compared to pure CSS." },
  ],
});
