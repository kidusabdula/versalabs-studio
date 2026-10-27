import { defineProject } from '../schema';

// Live link held: the live site shows unverified industry figures beside its 14
// real partner organisations, and whether this appears as VersaLabs work waits
// on the owner's Gensys check (proposal section 8).
export default defineProject({
  slug: "unlock-ethiopia-potential",
  title: "Unlock Ethiopia Potential",
  subtitle: "Bitcoin Mining Summit 2025 Website",
  summary: "The website for a Bitcoin mining summit in Addis Ababa. Visitors explore the agenda, meet the speakers and partners, and register in a few taps.",
  category: "Events",
  tags: ["Events", "Blockchain", "Landing Page"],
  year: "2025",
  status: "Production",
  kind: "client",
  links: {},
  heroGradient: "from-[#AF8F6F]/20 via-transparent to-[#74512D]/10",
  cover: "/images/unlock-ethiopia-potential/mockup-01.webp",
  gallery: [
    { src: "/images/unlock-ethiopia-potential/mockup-01.webp", alt: "Unlock Ethiopia Potential event schedule in a browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-02.webp", alt: "Unlock Ethiopia Potential event introduction text on a phone", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-03.webp", alt: "Unlock Ethiopia Potential mobile panel speaker list, phone close-up", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-04.webp", alt: "Unlock Ethiopia Potential event schedule in a steeply angled browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-05.webp", alt: "Unlock Ethiopia Potential Our Team section with speaker portraits, angled browser", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-06.webp", alt: "Unlock Ethiopia Potential home page hero in a tilted browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-07.webp", alt: "Unlock Ethiopia Potential mobile schedule close-up with opening session cards", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-08.webp", alt: "Unlock Ethiopia Potential home page hero on a tilted phone", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-01.webp", alt: "Unlock Ethiopia Potential home page hero with event details, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-02.webp", alt: "Unlock Ethiopia Potential partners logo grid, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-03.webp", alt: "Unlock Ethiopia Potential team portraits and Vital Information section, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-04.webp", alt: "Unlock Ethiopia Potential event schedule with opening sessions, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-05.webp", alt: "Unlock Ethiopia Potential schedule panel discussions with speaker lists, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-06.webp", alt: "Unlock Ethiopia Potential registration redirect loading screen, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-07.webp", alt: "Unlock Ethiopia Potential mobile event introduction over a city photo", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-08.webp", alt: "Unlock Ethiopia Potential mobile event schedule with session cards", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-09.webp", alt: "Unlock Ethiopia Potential mobile panel discussion with speaker list", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-10.webp", alt: "Unlock Ethiopia Potential mobile home hero with View Agenda button", kind: "screen", width: 865, height: 1920, reviewed: true },
  ],

  description: "Unlock Ethiopia Potential is the website for a two-day Bitcoin mining summit at the Hyatt Regency in Addis Ababa. It introduces the event, its speakers and its 14 partner organisations. A day-by-day agenda shows every session, speaker and LinkedIn profile. Visitors register through a simple sign-up form.",
  businessProblem: "The summit organisers needed a polished home for an international event, fast. It had to present the speakers and partners clearly and move visitors to registration, while the schedule kept changing until the event day.",
  architecturalSolution: "A component-based React 19 SPA built with Vite 6 and Tailwind CSS 4, with React Router handling client-side navigation between home, agenda and a registration redirect. Agenda sessions, speakers and partners are plain data arrays rendered by reusable components, so schedule edits are one-line changes. Framer Motion useInView drives scroll-triggered reveals, and registration hands off to an external Google Form. Deployed as a static build on Vercel.",
  systemFlow: "Visitor Arrival → Animated Hero → Partner Grid → Speakers → Agenda Timeline → Registration Redirect (Google Form)",
  techStack: [
    {
      label: "Frontend",
      items: [
        { name: "React", version: "19", purpose: "Component-based UI" },
        { name: "Vite", version: "6", purpose: "Fast builds and dev server" },
        { name: "React Router DOM", version: "7", purpose: "Client-side routing (home, agenda, register)" },
      ],
    },
    {
      label: "Styling & Animation",
      items: [
        { name: "Tailwind CSS", version: "4", purpose: "Utility-first styling with an earthy custom palette" },
        { name: "Framer Motion", version: "12", purpose: "Scroll reveals, floating backgrounds and hover effects" },
        { name: "React Icons", version: "5", purpose: "Social and engagement icons" },
      ],
    },
    {
      label: "Integrations & Deploy",
      items: [
        { name: "Google Forms", purpose: "Event registration" },
        { name: "Vercel", purpose: "Static hosting and custom domain" },
      ],
    },
  ],
  architecture: {
    pattern: "Single-Page Application (SPA) with Client-Side Routing",
    diagram: "Vite Build → React Router (/, /agenda, /register) → / renders Hero, Partners, Content, Speakers and Engagement; /agenda renders a data-driven two-day timeline; /register redirects to a Google Form after a short delay; Navbar and Footer are shared",
    designPatterns: [
      "Component-Based Architecture",
      "Data-Driven Rendering (agenda, speakers, partners as arrays)",
      "Declarative Scroll-Triggered Animation",
      "Mobile-First Responsive Grid with per-logo scaling",
    ],
  },
  boundedContexts: [
    { name: "Event Promotion", responsibility: "Hero, mission statement and engagement pillars", entities: ["HeroSection", "EngagementCard"] },
    { name: "Schedule & People", responsibility: "Two-day agenda, panels, speaker profiles and partner grid", entities: ["Session", "Speaker", "Partner"] },
    { name: "Registration", responsibility: "Hand-off to the external sign-up form", entities: ["RegistrationRedirect"] },
  ],
  schema: [
    { name: "Session (static data)", description: "One agenda item, including multi-speaker panels", keyFields: ["time", "title", "location", "description", "speaker[]", "speakerInfo[]", "speakerImage[]", "linkedin[]"] },
    { name: "Partner (static data)", description: "Partner logo with outbound link and responsive scale", keyFields: ["name", "image", "link", "logoScale{sm, md, lg}"] },
  ],
  features: [
    { title: "Day-by-Day Agenda", description: "A clear timeline of every session, with speaker photos, titles and LinkedIn links." },
    { title: "Partner Showcase", description: "Fourteen partner logos in a tidy grid, each sized to look balanced and linked to its website." },
    { title: "Smooth, Lively Motion", description: "Sections fade and slide in as you scroll, with floating Bitcoin and map artwork." },
    { title: "One-Tap Registration", description: "A short loading screen sends visitors straight to the sign-up form." },
  ],
  adrs: [
    { id: "ADR-001", title: "Vite + React SPA", status: "Accepted", rationale: "Static event content needs no server rendering; an SPA gives instant in-app navigation and a tiny hosting footprint." },
    { id: "ADR-002", title: "Agenda and Partners as Data Arrays", status: "Accepted", rationale: "The schedule changed up to the event day; editing one array updates the timeline without touching layout code." },
    { id: "ADR-003", title: "External Form for Registration", status: "Accepted", rationale: "Registration runs on an external Google Form, so the site stays fully static with no backend or attendee data to secure." },
    { id: "ADR-004", title: "Framer Motion for Animations", status: "Accepted", rationale: "Declarative useInView reveals are simpler to tune than hand-written CSS scroll animations." },
  ],
});
