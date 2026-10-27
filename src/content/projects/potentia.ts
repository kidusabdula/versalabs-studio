import { defineProject } from '../schema';

export default defineProject({
  slug: "potentia",
  title: "Potentia",
  subtitle: "Bitcoin Mining Business Platform",
  summary: "Everything you need to run a Bitcoin mining business — from learning the basics to tracking your fleet, managing finances, and calculating tax depreciation.",
  category: "Blockchain",
  tags: ["Blockchain", "Analytics"],
  year: "2025",
  status: "MVP",
  kind: "client",
  links: {},
  heroGradient: "from-yellow-500/20 via-transparent to-amber-500/10",
  cover: "/images/potentia/mockup-01.webp",
  gallery: [
    { src: "/images/potentia/mockup-01.webp", alt: "Potentia homepage hero with waitlist button in a browser window, grey backdrop", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/potentia/mockup-02.webp", alt: "Potentia platform features grid and waitlist banner in an angled browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/potentia/mockup-03.webp", alt: "Potentia homepage hero in a steeply angled browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/potentia/mockup-04.webp", alt: "Potentia Africa section with highlighted map in an angled browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/potentia/mockup-05.webp", alt: "Potentia about page with core pillars in an angled browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/potentia/mockup-06.webp", alt: "Potentia how it works journey page in an angled browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/potentia/screen-01.webp", alt: "Potentia homepage hero with world map and waitlist button, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/potentia/screen-02.webp", alt: "Potentia platform features grid and join waitlist banner, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/potentia/screen-03.webp", alt: "Potentia about page with learn, own and operate pillars, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/potentia/screen-04.webp", alt: "Potentia Africa section with map and regional activity cards, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/potentia/screen-05.webp", alt: "Potentia how it works page with five step journey, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
  ],
  description: "Potentia is a Bitcoin mining business platform for the company of the same name, built as a marketing site with a waitlist. It is built around three phases — Learn (education & certification), Own (equipment & asset management), and Operate (fleet monitoring & financial reporting). Demo flows show each phase, with dashboards running on sample data kept in the browser.",
  businessProblem: "Bitcoin mining operators lack integrated tooling to manage the full business lifecycle — education, equipment procurement, hosting contracts, fleet health monitoring, P&L reporting, and tax compliance — resulting in fragmented spreadsheets and missed depreciation opportunities.",
  architecturalSolution: "A DDD-architected platform with three bounded contexts (Learn, Own, Operate), each with dedicated domain services (learnService, analyticsService, taxService, financeService). Client-side LocalStorage with a structured service layer provides zero-backend MVP persistence, while TypeScript interfaces keep the models consistent. Waitlist sign-ups are forwarded to a Google Form.",
  systemFlow: "Learning Curriculum → Certification → Equipment Procurement → Hosting Contracts → Fleet Health Dashboard → P&L Reports → Tax Depreciation Schedules",
  techStack: [
    {
      label: "Frontend Framework",
      items: [
        { name: "Next.js", version: "16.1.0", purpose: "React framework with App Router" },
        { name: "React", version: "19.0.0", purpose: "Concurrent features" },
        { name: "TypeScript", version: "5.0", purpose: "Type-safe domain modeling" },
      ],
    },
    {
      label: "UI & Styling",
      items: [
        { name: "Tailwind CSS", version: "4.1.9", purpose: "Utility-first CSS" },
        { name: "Radix UI", purpose: "Accessible component primitives" },
        { name: "Framer Motion", purpose: "Animation library" },
        { name: "Lucide React", purpose: "Icon library" },
      ],
    },
    {
      label: "Data Management",
      items: [
        { name: "LocalStorage API", purpose: "Client-side persistence (MVP)" },
        { name: "Custom Service Layer", purpose: "Business logic abstraction" },
        { name: "TypeScript Interfaces", purpose: "Strong domain model typing" },
      ],
    },
    {
      label: "Analytics",
      items: [
        { name: "Vercel Analytics", purpose: "Web analytics and performance monitoring" },
        { name: "Custom Event Tracking", purpose: "Domain-specific analytics events" },
      ],
    },
    {
      label: "Development Tools",
      items: [
        { name: "ESLint", purpose: "Code linting" },
        { name: "PostCSS", purpose: "CSS processing" },
        { name: "Autoprefixer", purpose: "CSS vendor prefixing" },
        { name: "pnpm", purpose: "Package management" },
      ],
    },
  ],
  architecture: {
    pattern: "DDD Service Layer Architecture with Client-Side Persistence",
    diagram: "Next.js App Router → React Components → Custom Hooks → Domain Services (learnService, taxService, financeService, analyticsService) → LocalStorage Persistence\n\nDomains: Learn | Own | Operate | Shared Infrastructure",
    designPatterns: [
      "Domain-Driven Design with 3 Bounded Contexts",
      "Service Layer Pattern",
      "Repository Pattern for persistence",
      "Observer Pattern (analytics event tracking)",
      "Strategy Pattern (financial calculations, tax strategies)",
      "Event-Driven Analytics",
    ],
  },
  boundedContexts: [
    {
      name: "Learn",
      responsibility: "Bitcoin mining curriculum, assessments, certification, study streaks",
      entities: ["Lesson", "Track", "Quiz", "Certification", "LearningProgress"],
    },
    {
      name: "Own",
      responsibility: "Equipment procurement, hosting contracts, capital deployment",
      entities: ["Equipment", "HostingContract", "Asset", "Facility"],
    },
    {
      name: "Operate",
      responsibility: "Fleet health, P&L reporting, tax depreciation, treasury management",
      entities: ["Fleet", "FinancialReport", "DepreciationSchedule", "Alert"],
    },
  ],
  schema: [
    {
      name: "lessons",
      description: "Individual learning units with video and assessment",
      keyFields: ["id", "track_id", "title", "content_url", "quiz", "duration"],
    },
    {
      name: "tracks",
      description: "Learning paths grouping related lessons",
      keyFields: ["id", "title", "lessons", "difficulty", "certification"],
    },
    {
      name: "equipment",
      description: "Mining hardware with specifications",
      keyFields: ["id", "model", "hash_rate", "power_consumption", "purchase_price", "acquisition_date"],
    },
    {
      name: "contracts",
      description: "Hosting agreements with terms and costs",
      keyFields: ["id", "facility_name", "start_date", "end_date", "monthly_cost", "power_rate"],
    },
    {
      name: "financial_reports",
      description: "P&L statements and balance sheets",
      keyFields: ["id", "period", "revenue", "expenses", "net_income", "cash_flow"],
    },
  ],
  features: [
    {
      title: "Interactive Learning Curriculum",
      description: "Comprehensive Bitcoin mining education from fundamentals to advanced strategy, with video content, quizzes, study streaks, and certification.",
    },
    { title: "Equipment & Asset Management", description: "Track mining hardware inventory, hosting contracts, capital deployment, and facility management in one dashboard." },
    { title: "P&L Financial Reporting", description: "Profit & loss views with revenue, expense, and cash flow breakdowns, shown on sample data in the demo." },
    { title: "Tax Depreciation Engine", description: "Automated depreciation schedules for mining equipment with multiple strategy options (straight-line, MACRS)." },
    { title: "Fleet Health Dashboard", description: "Dashboards for mining fleet performance and alert thresholds, shown on sample data in the demo." },
    { title: "Domain Analytics Events", description: "Structured event tracking across Learn, Own, and Operate phases for data-driven business decisions." },
  ],
  adrs: [
    { id: "ADR-001", title: "DDD with Learn/Own/Operate Contexts", status: "Accepted", rationale: "Complex mining business lifecycle requires explicit domain modeling." },
    { id: "ADR-002", title: "Service Layer Architecture", status: "Accepted", rationale: "Business logic decoupled from UI for testability and domain isolation." },
    { id: "ADR-003", title: "Client-Side LocalStorage for MVP", status: "Accepted", rationale: "Zero backend dependency for rapid development — migration path to full backend." },
    { id: "ADR-004", title: "Radix UI + Tailwind for Components", status: "Accepted", rationale: "WCAG compliance with consistent design system." },
    { id: "ADR-005", title: "Domain-Specific Event Tracking", status: "Accepted", rationale: "Structured analytics across all three phases for business intelligence." },
  ],
});
