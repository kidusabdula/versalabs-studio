// ============================================================================
// VERSALABS STUDIO — COMPLETE PROJECT DATABASE
// ============================================================================
// This file is the single source of truth for all project content displayed
// on the /studio listing page, the /projects/[slug] detail pages and the
// sitemap. Entries with `visibility: 'hide'` are excluded everywhere: the
// helpers below never return them, so they have no route, card or sitemap URL.
// Every field is crafted from the original project README and architected
// for a premium portfolio showcase. The UI agent should consume this data
// directly — no parsing or transformation needed.
// ============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TechDependency {
  name: string;
  version?: string;
  purpose: string;
}

export interface TechLayer {
  label: string; // e.g. "Frontend Framework", "Backend & Database"
  items: TechDependency[];
}

export interface BoundedContext {
  name: string;
  responsibility: string;
  entities: string[];
}

export interface SchemaTable {
  name: string;
  description: string;
  keyFields: string[];
}

export interface Feature {
  title: string;
  description: string;
  icon?: string; // lucide icon name for UI rendering
}

export interface ADRRecord {
  id: string;
  title: string;
  status: "Accepted" | "Proposed" | "Deprecated";
  rationale: string;
}

export type ProjectStatus = "Production" | "Beta" | "MVP" | "Prototype" | "Demo" | "Development";

export interface ProjectEntry {
  // ── Card-level fields (studio listing page) ──
  slug: string;
  title: string;
  subtitle: string; // Short tagline for hero area
  summary: string; // 1-2 sentence hook for card
  category: string; // Primary vertical — "ERP", "Fintech", "AI/ML" …
  tags: string[];
  year: string;
  status: ProjectStatus;
  client?: string; // End client name if applicable
  liveUrl?: string;
  githubUrl?: string;
  heroGradient: string; // CSS gradient classes for card accent
  thumbnail?: string; // Specific image path for studio card display
  imageDir?: string; // Override directory name in public/ for image discovery (e.g. 'Oskaz Import' for oskaz-ecommerce)
  productType: 'saas' | 'client-project' | 'internal' | 'research'; // Controls badge and CTA messaging: SaaS = product, Client = "We can build this for you", Internal = studio build, Research = university/research project
  visibility?: 'show' | 'hide'; // Defaults to 'show'. Hidden entries never render, route or appear in the sitemap

  // ── Detail page fields ──
  description: string; // Full 3-5 sentence project description
  businessProblem: string;
  architecturalSolution: string;
  systemFlow: string; // Plaintext pipeline e.g. "Client → API → DB"

  // ── Full tech stack: every dependency ──
  techStack: TechLayer[];

  // ── Architecture ──
  architecture: {
    pattern: string; // e.g. "Microservices-Inspired Monorepo"
    diagram: string; // ASCII or text description of the system topology
    designPatterns: string[];
  };

  // ── Domain-Driven Design ──
  boundedContexts: BoundedContext[];

  // ── Schema Design ──
  schema: SchemaTable[];

  // ── Premium Showcase Features ──
  features: Feature[];

  // ── Architecture Decision Records ──
  adrs: ADRRecord[];
}

// ---------------------------------------------------------------------------
// DATABASE
// ---------------------------------------------------------------------------

export const PROJECT_DATABASE: ProjectEntry[] = [
  // =========================================================================
  // 1. THREATMATRIX AI
  // =========================================================================
  {
    slug: "threatmatrix-ai",
    title: "ThreatMatrix AI",
    subtitle: "Network Security Command Center — University Senior Project",
    summary:
      "A network security platform that spots unusual traffic and explains each alert in plain language. Built as a university senior project by a team of four.",
    category: "Cybersecurity",
    tags: ["AI/ML", "Cybersecurity", "Research"],
    year: "2026",
    status: "MVP",
    heroGradient: "from-red-500/20 via-transparent to-orange-500/10",
    thumbnail: "/ThreatMatrix AI/Mockups/threatmatrix-ai-4.png",
    productType: "research",

    description:
      "ThreatMatrix AI is a network security command center built as a university senior project by a team of four, between February and April 2026. It reads network traffic, scores each connection with three machine-learning models, and plots alerts on a live threat map. An AI analyst explains each alert and writes briefings in English or Amharic. Version 1.0 ran against a live server in April 2026; today it is an MVP, not a hosted product.",
    businessProblem:
      "Security teams in emerging markets often rely on costly global tools that lack local context and local-language support.",
    architecturalSolution:
      "A three-tier, event-driven architecture separating Capture, Intelligence, and Interaction bounded contexts. Python/Scapy ingests live traffic, a FastAPI Intelligence Engine runs an ensemble of three ML models in parallel, and a Next.js Command Center renders real-time maps and dashboards via WebSocket. Redis Pub/Sub decouples all tiers for independent scaling.",
    systemFlow:
      "Scapy Capture → Redis Pub/Sub → FastAPI ML Inference (Isolation Forest + Random Forest + Autoencoder) → Alert Persistence (PostgreSQL) → WebSocket Push → Next.js Command Center",

    techStack: [
      {
        label: "Frontend",
        items: [
          { name: "Next.js", version: "16.1", purpose: "SSR/SSG full-stack React framework" },
          { name: "TypeScript", version: "5.x", purpose: "Strict type safety across the UI" },
          { name: "next-intl", version: "4.x", purpose: "English/Amharic interface" },
          { name: "CSS Variables + Vanilla CSS", purpose: "Glass-morphism design system" },
          { name: "Deck.gl", version: "9.x", purpose: "GPU-accelerated geospatial threat map rendering" },
          { name: "Maplibre GL", version: "5.x", purpose: "Open-source vector tile map engine" },
          { name: "Recharts", purpose: "Analytics dashboard chart library" },
        ],
      },
      {
        label: "Backend",
        items: [
          { name: "FastAPI", version: "0.115", purpose: "Async Python REST + WebSocket API" },
          { name: "Python", version: "3.11+", purpose: "Core runtime for ML and capture" },
          { name: "Scapy", version: "2.6", purpose: "Raw packet capture and flow aggregation" },
          { name: "Alembic", purpose: "Database schema migration management" },
        ],
      },
      {
        label: "Machine Learning",
        items: [
          { name: "scikit-learn", version: "1.6", purpose: "Isolation Forest and Random Forest classifiers" },
          { name: "TensorFlow / Keras", version: "2.18", purpose: "Autoencoder deep learning reconstruction model" },
        ],
      },
      {
        label: "LLM Gateway",
        items: [
          { name: "OpenRouter", purpose: "Unified multi-model LLM API access" },
          { name: "Cascading Model Fallback", purpose: "One ordered list of models per task, so a request moves to the next model if one is unavailable" },
        ],
      },
      {
        label: "Infrastructure",
        items: [
          { name: "PostgreSQL", version: "16", purpose: "Primary relational store with JSONB and INET types" },
          { name: "Redis", version: "7", purpose: "Pub/Sub event bus and rate-limiting cache" },
          { name: "Docker Compose", version: "v2", purpose: "Multi-service orchestration" },
          { name: "Nginx", purpose: "Reverse proxy with TLS (Let's Encrypt)" },
          { name: "Vercel", purpose: "Frontend edge hosting and HTTPS" },
        ],
      },
    ],

    architecture: {
      pattern: "Three-Tier Event-Driven Architecture with DDD Bounded Contexts",
      diagram:
        "Capture Engine (Python/Scapy) → Redis Pub/Sub → Intelligence Engine (FastAPI + ML Ensemble) → PostgreSQL → WebSocket → Command Center (Next.js/Vercel)",
      designPatterns: [
        "Event-Driven Communication (Redis Pub/Sub)",
        "Ensemble ML Scoring (Weighted Composite)",
        "Domain-Driven Design with Bounded Contexts",
        "Contract-First API (OpenAPI)",
        "Repository Pattern for data access",
        "CQRS-lite (read-optimised WebSocket push, write via REST)",
      ],
    },

    boundedContexts: [
      { name: "Capture", responsibility: "Ingest raw packets, produce flow records with 40+ features", entities: ["NetworkFlow", "CaptureSession"] },
      { name: "Intelligence", responsibility: "Apply ML models, enrich with threat intel feeds, generate alerts", entities: ["Alert", "MLModel", "ThreatIntelIOC"] },
      { name: "Interaction", responsibility: "UI rendering, user actions, LLM conversations, report generation", entities: ["User", "LLMConversation", "Report"] },
    ],

    schema: [
      { name: "network_flows", description: "Raw and aggregated network flow records", keyFields: ["flow_id", "src_ip", "dst_ip", "protocol", "feature_vector (JSONB)", "timestamp"] },
      { name: "alerts", description: "Detected anomalies with ML scores and LLM narratives", keyFields: ["alert_id", "severity", "composite_score", "ml_labels (JSONB)", "ai_narrative", "status"] },
      { name: "threat_intel_iocs", description: "Indicators of compromise from external feeds", keyFields: ["ioc_id", "type", "value", "source_feed", "confidence"] },
      { name: "users", description: "Platform users with RBAC roles", keyFields: ["user_id", "role (admin|soc_manager|analyst|viewer)", "jwt_claims"] },
      { name: "llm_conversations", description: "AI Analyst chat sessions", keyFields: ["conversation_id", "user_id", "messages (JSONB)", "model_used"] },
      { name: "ml_models", description: "Model registry with performance metrics", keyFields: ["model_id", "type", "version", "accuracy", "deployed_at"] },
    ],

    features: [
      { title: "War Room", description: "Real-time geospatial threat map with live alert ticker, metric cards, and global threat intelligence overlay.", icon: "Globe" },
      { title: "AI Analyst", description: "Conversational LLM interface enabling natural-language threat investigation, briefing generation, and Amharic translation.", icon: "Bot" },
      { title: "Three-Model ML Ensemble", description: "Parallel Isolation Forest, Random Forest, and Autoencoder inference with weighted composite scoring for zero-day and known-attack detection.", icon: "Brain" },
      { title: "Forensics Lab", description: "PCAP upload with packet inspection, flow reconstruction, and ML re-analysis for post-incident investigation.", icon: "FileSearch" },
      { title: "Real-Time Alert Pipeline", description: "New alerts appear on the analyst's screen within moments, with no page refresh.", icon: "Zap" },
      { title: "ML Operations Dashboard", description: "See how each AI model is performing and retrain it from the dashboard.", icon: "BarChart3" },
    ],

    adrs: [
      { id: "ADR-001", title: "Adopt Domain-Driven Design", status: "Accepted", rationale: "Establishes Ubiquitous Language across Capture, Intelligence, and Interaction contexts." },
      { id: "ADR-002", title: "Three Bounded Contexts", status: "Accepted", rationale: "Each context owns its model and persistence, reducing coupling and enabling independent scaling." },
      { id: "ADR-003", title: "Event-Driven Communication (Redis Pub/Sub)", status: "Accepted", rationale: "Guarantees eventual consistency while keeping contexts decoupled." },
      { id: "ADR-004", title: "FastAPI for Intelligence Engine", status: "Accepted", rationale: "Provides clean, contract-first API mirroring domain services." },
      { id: "ADR-005", title: "Next.js 16 for Interaction Layer", status: "Accepted", rationale: "Enables type-safe UI reflecting domain models (AlertDTO, FlowDTO)." },
      { id: "ADR-006", title: "PostgreSQL with JSONB", status: "Accepted", rationale: "Rich domain objects (Alert with embedded LLM Narrative) with relational integrity." },
      { id: "ADR-007", title: "LLM Gateway as Domain Service", status: "Accepted", rationale: "Treats LLM calls as application services augmenting Alert aggregates." },
      { id: "ADR-008", title: "Docker Compose Deployment", status: "Accepted", rationale: "Infrastructure model aligned with bounded contexts — one container per context." },
      { id: "ADR-009", title: "JWT-Based RBAC (4 Roles)", status: "Accepted", rationale: "Access control as domain policy ensuring authorized aggregate mutations." },
      { id: "ADR-010", title: "Three-Model ML Ensemble", status: "Accepted", rationale: "Each model represents a different anomaly detection sub-domain." },
      { id: "ADR-011", title: "AI Analyst as First-Class UI", status: "Accepted", rationale: "Elevates LLM from utility to domain-level collaborator." },
    ],
  },

  // =========================================================================
  // 2. OBSIDIAN ERP v3.0
  // =========================================================================
  {
    slug: "obsidian-erp-v3.0",
    title: "Obsidian ERP",
    subtitle: "All-in-One Business Management Platform",
    summary:
      "Run your entire business from one place. Obsidian connects your sales, customers, inventory, manufacturing, and accounting into a single system — so nothing falls through the cracks.",
    category: "ERP",
    tags: ["ERP", "SaaS", "Manufacturing"],
    year: "2026",
    status: "Production",
    heroGradient: "from-violet-500/20 via-transparent to-indigo-500/10",
    thumbnail: "/Obsidian ERP/Mockups/New folder/obsidian-erp-2 (2).png",
    productType: "saas",

    description:
      "Obsidian is the ERP system we build for growing companies. It covers the journey from lead to cash: quote, order, produce, deliver, invoice, and get paid, with stock and accounting updating at each step. It replaces disconnected spreadsheets with one system and one dashboard for the whole business.",
    businessProblem:
      "Growing businesses manage operations across disconnected spreadsheets and siloed tools for CRM, sales, production, inventory, and accounting — creating costly reconciliation errors, pricing mistakes, and delayed invoicing.",
    architecturalSolution:
      "A Next.js front end over ERPNext (Frappe). TypeScript types and Zod schemas are generated from DocType metadata, and a factory layer builds the CRUD hooks and API routes, so modules share one data contract. The business modules share a single ERPNext database, so data flows from first customer contact to final payment.",
    systemFlow:
      "ERPNext DocTypes → Type Generation → TypeScript + Zod Validation → Factory Pattern Hooks → Next.js App Router UI",

    techStack: [
      {
        label: "Frontend Framework",
        items: [
          { name: "Next.js", version: "16.0.10", purpose: "Full-stack React framework with App Router" },
          { name: "React", version: "19.2.3", purpose: "Latest React with concurrent features" },
          { name: "TypeScript", version: "5.9.3", purpose: "Strict type checking" },
        ],
      },
      {
        label: "State Management & Data",
        items: [
          { name: "TanStack Query", version: "v5.90.7", purpose: "Server state management with caching" },
          { name: "React Hook Form", version: "v7", purpose: "Performant forms with validation" },
          { name: "Zod", version: "v3.25.76", purpose: "Runtime type validation and schema parsing" },
          { name: "Frappe JS SDK", version: "1.10.0", purpose: "Official Frappe API client" },
        ],
      },
      {
        label: "UI & Styling",
        items: [
          { name: "Tailwind CSS", version: "v4.1.10", purpose: "Utility-first CSS framework" },
          { name: "Radix UI", purpose: "Accessible component primitives" },
          { name: "Framer Motion", version: "v12", purpose: "Smooth animations and transitions" },
          { name: "Lucide React", purpose: "Consistent iconography" },
          { name: "Sonner", purpose: "Toast notifications" },
        ],
      },
      {
        label: "Backend",
        items: [
          { name: "Frappe Framework + ERPNext", version: "v15", purpose: "Python-based ERP engine with DocType ORM" },
          { name: "MariaDB", purpose: "Primary relational database (via Frappe)" },
          { name: "Redis", purpose: "Cache and queue (via Frappe)" },
        ],
      },
      {
        label: "Development Tools",
        items: [
          { name: "ESLint", purpose: "Code linting and formatting" },
          { name: "PostCSS", purpose: "CSS processing and optimization" },
          { name: "TypeScript ESLint", purpose: "Type-aware linting rules" },
          { name: "pnpm", purpose: "Fast, disk-efficient package manager" },
        ],
      },
    ],

    architecture: {
      pattern: "Schema-First Monolith with Factory Pattern CRUD",
      diagram:
        "Frappe DocTypes → Auto-Gen Types → Central DocType Registry → Generic Hooks (useFrappeList, useFrappeCreate, useFrappeDoc) → Factory API Routes → Next.js App Router Pages",
      designPatterns: [
        "Schema-First Development (DocType → TS → Zod)",
        "Factory Pattern for zero-boilerplate CRUD",
        "Centralized DocType Configuration Registry",
        "Generic Hooks (DocType-agnostic data fetching)",
        "Dual Theme System (OKLCH color space)",
        "Repository Pattern for data access",
      ],
    },

    boundedContexts: [
      { name: "CRM", responsibility: "Lead-to-customer conversion, contact and address management", entities: ["Lead", "Customer", "Contact", "Address"] },
      { name: "Sales", responsibility: "Quotation-to-order pipeline, commission tracking", entities: ["Quotation", "SalesOrder", "SalesOrderItem", "SalesTeam", "SalesPartner"] },
      { name: "Manufacturing", responsibility: "BOM management, work order tracking, production scheduling", entities: ["BOM", "BOMItem", "WorkOrder", "Workstation", "Operation"] },
      { name: "Inventory", responsibility: "Multi-warehouse stock management and valuation", entities: ["Warehouse", "StockEntry", "Item", "MaterialRequest", "StockBalance"] },
      { name: "Accounting", responsibility: "Double-entry bookkeeping, invoicing, and payment reconciliation", entities: ["SalesInvoice", "PurchaseInvoice", "PaymentEntry", "JournalEntry", "Account", "CostCenter"] },
    ],

    schema: [
      { name: "Customer", description: "Enterprise customer profile with groups and territory", keyFields: ["name", "customer_name", "customer_group", "territory", "status"] },
      { name: "Quotation", description: "Professional quote creation with dynamic pricing", keyFields: ["name", "customer", "items", "total", "valid_till", "status"] },
      { name: "Sales Order", description: "Confirmed orders with fulfillment workflow", keyFields: ["name", "customer", "items", "delivery_date", "status", "payment_terms"] },
      { name: "BOM (Bill of Materials)", description: "Multi-level manufacturing recipe with operations", keyFields: ["name", "item", "bom_items", "operations", "total_cost"] },
      { name: "Work Order", description: "Production job with tracking and material consumption", keyFields: ["name", "bom", "qty", "status", "planned_start", "actual_start"] },
      { name: "Stock Entry", description: "Material receipt, issue, and transfer records", keyFields: ["name", "stock_entry_type", "items", "warehouse", "posting_date"] },
      { name: "Sales Invoice", description: "Revenue recognition with GL posting", keyFields: ["name", "customer", "items", "total", "outstanding_amount", "status"] },
      { name: "Payment Entry", description: "Universal cash handler with reconciliation", keyFields: ["name", "payment_type", "party", "paid_amount", "references"] },
    ],

    features: [
      { title: "Schema-First Type Generation", description: "Generates TypeScript interfaces and Zod schemas from Frappe DocType metadata, so the front end and the ERP share one data contract.", icon: "FileCode2" },
      { title: "Factory Pattern CRUD", description: "Generic hooks and API route generators cut CRUD boilerplate, so a new module needs little new code.", icon: "Factory" },
      { title: "Lead-to-Cash Pipeline", description: "Complete sales automation from customer inquiry through quotation, order, delivery, invoicing, and payment collection.", icon: "TrendingUp" },
      { title: "Manufacturing Execution", description: "Production tracking with BOM management, work order scheduling, material consumption, and workstation planning.", icon: "Settings2" },
      { title: "Double-Entry Bookkeeping", description: "Automated journal entries with Chart of Accounts, cost center tracking, and financial reporting suite.", icon: "BookOpen" },
      { title: "Dual Theme System", description: "Professional light/dark modes using OKLCH perceptually-uniform color space with 200ms smooth transitions.", icon: "Palette" },
    ],

    adrs: [
      { id: "ADR-001", title: "Schema-First Development from Frappe DocTypes", status: "Accepted", rationale: "Eliminates type drift between frontend and backend — DocTypes are the absolute source of truth." },
      { id: "ADR-002", title: "Factory Pattern for Generic CRUD", status: "Accepted", rationale: "One generic factory serves every DocType, so new modules need little new code." },
      { id: "ADR-003", title: "Centralized DocType Configuration Registry", status: "Accepted", rationale: "Single source of truth for all routing, query keys, and API endpoints." },
      { id: "ADR-004", title: "TanStack Query for Server State", status: "Accepted", rationale: "Intelligent caching, background refetching, and optimistic updates for enterprise data." },
      { id: "ADR-005", title: "ERPNext on Frappe as Backend Platform", status: "Accepted", rationale: "ERPNext supplies proven accounting, stock, and manufacturing logic, so we focus on the business-specific experience." },
    ],
  },

  // =========================================================================
  // 3. PANA WEB
  // =========================================================================
  {
    slug: "pana-web",
    title: "Pana Web",
    subtitle: "Company Website for a Printing & Branding House",
    summary:
      "A fast, mobile-friendly company website for a printing and branding business in Addis Ababa. Each of its eight services gets its own page.",
    category: "Corporate Web",
    tags: ["Corporate", "Web Design", "Print & Branding"],
    year: "2025",
    status: "Production",
    liveUrl: "https://pana-web-nine.vercel.app/",
    heroGradient: "from-emerald-500/20 via-transparent to-teal-500/10",
    thumbnail: "/Pana Web/Mockups/160shots_so.png",
    productType: "client-project",

    description:
      "Pana Web is the company website for a printing and branding house in Addis Ababa. It presents eight services, from digital print and signage to merchandise and events, each with its own page. Visitors can read about the company, browse past clients, and find the office on the map. It works well on phones.",
    businessProblem:
      "Businesses operating with outdated or template-based websites lose credibility with potential clients, resulting in missed opportunities and a brand perception gap that undermines their actual service quality.",
    architecturalSolution:
      "A Next.js 16 App Router site with static, typed service data rendered into one shared service template. Per-service metadata comes from generateMetadata, and a Next.js proxy normalises service slugs and title aliases to canonical URLs.",
    systemFlow:
      "Home → Services → Service Detail (8 services) → About / Past Clients → Contact & Directions",

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
      { name: "Service Catalogue", responsibility: "Eight typed service records rendered through one template", entities: ["Service"] },
    ],

    schema: [
      { name: "services-data.ts", description: "Typed service records (no database)", keyFields: ["slug", "title", "subtitle", "description", "images"] },
    ],

    features: [
      { title: "One Page per Service", description: "Eight service pages share one clean layout, so new services are quick to add.", icon: "LayoutGrid" },
      { title: "Directions to the Office", description: "Clear calls to action on every page, plus one-tap directions to the office.", icon: "Target" },
      { title: "Mobile-First Responsive", description: "A consistent experience across every device, from desktop monitors to mobile phones.", icon: "Smartphone" },
      { title: "Search-Ready Pages", description: "Each service page has its own search title and description.", icon: "Search" },
    ],

    adrs: [
      { id: "ADR-001", title: "Server-Side Rendering for Performance", status: "Accepted", rationale: "Fast first loads help visitors and search engines." },
      { id: "ADR-002", title: "Static Typed Service Data", status: "Accepted", rationale: "No CMS needed for eight services that rarely change." },
    ],
  },

  // =========================================================================
  // 4. OSKAZ E-COMMERCE
  // =========================================================================
  {
    slug: "oskaz-ecommerce",
    title: "OSKAZ E-Commerce",
    subtitle: "Online Store Connected to the Company ERP",
    summary:
      "An online store connected live to the company's ERP. Customers see real stock and prices, order in a few clicks, and pay on delivery.",
    category: "E-Commerce",
    tags: ["E-Commerce", "ERP Integration", "Retail"],
    year: "2025",
    status: "Production",
    heroGradient: "from-blue-500/20 via-transparent to-cyan-500/10",
    thumbnail: "/Oskaz Import/Mockups/937shots_so.png",
    imageDir: "Oskaz Import",
    productType: "client-project",

    description:
      "OSKAZ E-Commerce is the online store for OSKAZ Import, which sells interactive displays, power and automation products in Ethiopia. Products, prices and stock come straight from the company's ERP, so the website never goes out of date. Customers sign in, build a cart, and place orders that land in the ERP as sales orders. They can track past orders from their account.",
    businessProblem:
      "OSKAZ kept products, prices and stock in its ERP, but customers could only order by phone or in person. They needed a store that reads from the ERP directly, so staff never update two systems.",
    architecturalSolution:
      "A Next.js 16 App Router storefront. Server API routes wrap the Frappe JS SDK, so ERP credentials never reach the browser. Clerk handles sign-in, and a Svix-verified webhook creates the matching ERPNext Customer. The cart lives in a React context persisted to localStorage, and checkout posts a Sales Order to ERPNext.",
    systemFlow:
      "Browse (ERP Items) → Cart (localStorage) → Clerk Sign-In → Checkout (Cash on Delivery) → Next.js API Route → Frappe JS SDK → ERPNext Sales Order → My Orders",

    techStack: [
      {
        label: "Frontend Framework",
        items: [
          { name: "Next.js", version: "16.0.10", purpose: "Full-stack React framework with SSR/SSG" },
          { name: "React", version: "19.2.0", purpose: "Concurrent rendering and hooks" },
          { name: "TypeScript", version: "5.7.2", purpose: "Type-safe development" },
        ],
      },
      {
        label: "UI & Styling",
        items: [
          { name: "Tailwind CSS", version: "4.0.0", purpose: "Utility-first CSS with custom design system" },
          { name: "Radix UI", purpose: "Accessible, unstyled UI primitives" },
          { name: "Framer Motion", purpose: "Production-ready animations" },
          { name: "Lucide React", purpose: "Icon library" },
          { name: "next-themes", purpose: "Dark/light mode management" },
        ],
      },
      {
        label: "Authentication & Security",
        items: [
          { name: "Clerk", version: "6.36.3", purpose: "Complete user management and authentication" },
          { name: "Svix", version: "1.77.0", purpose: "Webhook handling for real-time events" },
        ],
      },
      {
        label: "Backend Integration",
        items: [
          { name: "Frappe JS SDK", version: "1.11.0", purpose: "Client library for ERPNext integration" },
        ],
      },
      {
        label: "Development & Build",
        items: [
          { name: "ESLint", version: "9.17.0", purpose: "Code linting and quality" },
          { name: "PostCSS", purpose: "CSS processing via @tailwindcss/postcss 4" },
          { name: "Autoprefixer", version: "10.4.21", purpose: "CSS vendor prefixing" },
          { name: "Turbopack", purpose: "Fast development server" },
        ],
      },
    ],

    architecture: {
      pattern: "Headless Storefront on ERPNext (Backend-for-Frontend API Routes)",
      diagram:
        "Next.js App (Storefront) ↔ Clerk Auth (Identity) ↔ ERPNext (Backend)\n\nPages → Next.js API Routes → Frappe JS SDK → ERPNext Items, Customers and Sales Orders",
      designPatterns: [
        "Backend-for-Frontend API routes over the Frappe JS SDK",
        "Shared API handler template with endpoint logging",
        "Clerk → ERPNext Customer sync via Svix-verified webhook",
        "Client-side cart with localStorage persistence",
        "Route protection via Clerk middleware",
      ],
    },

    boundedContexts: [
      { name: "Catalog", responsibility: "Products, categories, stock and prices read live from the ERP", entities: ["Item", "Item Group"] },
      { name: "Cart", responsibility: "Cart operations in the browser", entities: ["CartItem (client-side)"] },
      { name: "Orders", responsibility: "Checkout and order history", entities: ["Sales Order"] },
      { name: "Customers", responsibility: "Sign-in and the matching ERP customer record", entities: ["Clerk User", "ERPNext Customer"] },
    ],

    schema: [
      { name: "Item", description: "ERPNext product records", keyFields: ["item_code", "item_name", "item_group", "standard_rate", "image"] },
      { name: "Item Group", description: "ERPNext product categories", keyFields: ["item_group_name", "parent_item_group"] },
      { name: "Sales Order", description: "Web orders created in the ERP", keyFields: ["customer", "delivery_date", "grand_total", "status", "items"] },
      { name: "Customer", description: "ERP customer created from a Clerk sign-up", keyFields: ["customer_name", "email"] },
    ],

    features: [
      { title: "Sign In Once", description: "Customers sign in once, and their account is created in the ERP automatically.", icon: "UserCheck" },
      { title: "ERP-Backed Inventory", description: "Stock and prices come live from the company ERP, so the store is always current.", icon: "Package" },
      { title: "Orders Straight Into the ERP", description: "Every web order becomes a sales order in the ERP, ready for the sales team.", icon: "Workflow" },
      { title: "Cash on Delivery Checkout", description: "Customers place orders online and pay when the goods arrive.", icon: "Truck" },
      { title: "Responsive Dark/Light Theme", description: "System-aware theming with next-themes and user preference persistence.", icon: "Moon" },
    ],

    adrs: [
      { id: "ADR-001", title: "Server-Side API Routes as the Only ERP Gateway", status: "Accepted", rationale: "ERP credentials stay on the server; the browser only talks to our own API routes." },
      { id: "ADR-002", title: "Clerk for Identity with Webhook Sync to ERPNext", status: "Accepted", rationale: "Sign-up creates the ERP customer automatically, so staff never re-key accounts." },
      { id: "ADR-003", title: "Client-Side Cart", status: "Accepted", rationale: "No server cart table; the cart persists in the browser until checkout." },
      { id: "ADR-004", title: "Cash on Delivery for v1", status: "Accepted", rationale: "Orders go live without a payment gateway; payment happens on delivery." },
    ],
  },

  // =========================================================================
  // 5. FASTPAY ET WALLET
  // =========================================================================
  {
    slug: "fastpay",
    title: "FastPay ET Wallet",
    subtitle: "Send Money Home — Fast & Secure",
    summary:
      "A mobile app prototype for sending money between the US and Ethiopia. Live-style exchange rates, PIN sign-in, and a polished experience built for the Ethiopian diaspora.",
    category: "Fintech",
    tags: ["Fintech", "Mobile", "Payments"],
    year: "2026",
    status: "Prototype",
    client: "FastPay LLC",
    heroGradient: "from-green-500/20 via-transparent to-emerald-500/10",
    thumbnail: "/FastPay/Mockups/228shots_so.png",
    productType: "client-project",

    description:
      "FastPay ET Wallet is a working prototype of a mobile app for cross-border payments between the United States and Ethiopia, built for FastPay LLC to show stakeholders the product. It runs on realistic sample data, with UI-thread animations, Zustand state management, and Domain-Driven Design across five business domains — Auth, Wallet, Transaction, Contact, and Notification.",
    businessProblem:
      "Ethiopian diaspora communities in the US face high fees, slow settlement times, and poor mobile UX when sending remittances home. Existing apps lack a native mobile feel and clear, up-to-date exchange rates.",
    architecturalSolution:
      "A React Native (Expo SDK 55) mobile app with five DDD bounded contexts, Zustand state stores persisted with AsyncStorage, and an animation system powered by Reanimated 4 running on the UI thread. Schema-first development ensures all data contracts are TypeScript interfaces before implementation, with factory patterns for zero-placeholder UI demos.",
    systemFlow:
      "PIN Auth → Zustand Session Store → Wallet Balance (Multi-Currency) → Transaction Creation → Exchange Rate Engine → Recipient Selection → Confirmation → In-App Notification",

    techStack: [
      {
        label: "Core Framework & Runtime",
        items: [
          { name: "Expo SDK", version: "~55", purpose: "Managed React Native runtime with custom builds" },
          { name: "React Native", version: "0.83", purpose: "Cross-platform mobile framework" },
          { name: "TypeScript", version: "5.x", purpose: "Strict type safety" },
          { name: "Expo Router", purpose: "File-based navigation with native performance" },
        ],
      },
      {
        label: "UI & Animation Engine",
        items: [
          { name: "React Native Reanimated", version: "4.2", purpose: "UI-thread animations and gestures" },
          { name: "React Native Gesture Handler", version: "v2", purpose: "Advanced touch interactions and pan gestures" },
          { name: "Expo Linear Gradient", purpose: "Smooth gradient backgrounds" },
          { name: "Lottie React Native", purpose: "Complex micro-interactions and success animations" },
          { name: "Expo Blur", purpose: "Glass-morphism overlay effects" },
          { name: "Expo Haptics", purpose: "Tactile feedback for all interactive elements" },
        ],
      },
      {
        label: "State Management & Data",
        items: [
          { name: "Zustand", purpose: "Lightweight reactive global state container" },
          { name: "AsyncStorage", version: "2.2", purpose: "On-device key-value persistence" },
          { name: "@faker-js/faker", purpose: "Realistic mock data generation (300+ transactions)" },
          { name: "Dayjs", purpose: "Date formatting and timezone handling" },
          { name: "@shopify/flash-list", purpose: "60fps virtualized lists" },
        ],
      },
      {
        label: "Asset & Font Management",
        items: [
          { name: "Expo Google Fonts", purpose: "Plus Jakarta Sans typography system" },
          { name: "Expo Vector Icons", purpose: "Ionicons and Material Community Icons" },
          { name: "React Native SVG", purpose: "Custom vector graphics and charts" },
          { name: "Expo Image", purpose: "High-performance image rendering with caching" },
        ],
      },
      {
        label: "Development & Quality",
        items: [
          { name: "ESLint + Prettier", purpose: "Code quality and formatting" },
          { name: "Expo Dev Client", purpose: "Custom development builds with hot reloading" },
          { name: "React Native Safe Area Context", purpose: "Cross-device safe area handling" },
        ],
      },
    ],

    architecture: {
      pattern: "Domain-Driven Mobile Architecture with Zustand State Machines",
      diagram:
        "Expo Router Screens → Domain Hooks → Zustand Stores (AsyncStorage Persistence) → Factory Data Layer\n\nDomains: Auth | Wallet | Transactions | Contacts | Notifications",
      designPatterns: [
        "Domain-Driven Design with 5 Bounded Contexts",
        "Schema-First Development (Interfaces → Implementation)",
        "Factory Pattern for components and data generation",
        "Observer Pattern (Zustand subscriptions)",
        "UI-Thread Animation System (Reanimated 4)",
        "Persisted Zustand Stores (AsyncStorage)",
      ],
    },

    boundedContexts: [
      { name: "Auth", responsibility: "PIN authentication, session lifecycle", entities: ["User", "PIN (Value Object)", "Session (Aggregate)"] },
      { name: "Wallet", responsibility: "Multi-currency balance tracking and funding sources", entities: ["Wallet", "Balance (Value Object)", "Currency (Value Object)", "FundingSource"] },
      { name: "Transaction", responsibility: "Cross-border transfer processing and history", entities: ["Transaction", "TransactionType (Enum)", "TransactionStatus (Enum)", "Recipient (Value Object)", "ExchangeRate (Value Object)"] },
      { name: "Contact", responsibility: "Recipient management with favorites and search", entities: ["Contact", "ContactMethod (Value Object)", "Favorite (Aggregate)"] },
      { name: "Notification", responsibility: "Real-time alerts for transactions and security", entities: ["Notification", "NotificationType (Enum)"] },
    ],

    schema: [
      { name: "users", description: "User profile with KYC and session data", keyFields: ["id", "phone", "email", "kyc_status", "pin_hash", "biometric_enabled"] },
      { name: "wallets", description: "Multi-currency balance tracking", keyFields: ["id", "user_id", "balance_usd", "balance_etb", "funding_sources"] },
      { name: "transactions", description: "Transfer records with exchange rates", keyFields: ["id", "sender_id", "recipient_id", "amount_cents", "currency", "exchange_rate", "status", "type"] },
      { name: "contacts", description: "Saved recipients with transaction history", keyFields: ["id", "user_id", "name", "phone", "bank_info", "is_favorite"] },
      { name: "notifications", description: "Push notification history", keyFields: ["id", "user_id", "type", "title", "body", "read_at"] },
    ],

    features: [
      { title: "UI-Thread Animations", description: "Interactions run on the native UI thread via Reanimated 4 — spring physics, gesture-driven transitions, and Lottie micro-interactions.", icon: "Sparkles" },
      { title: "PIN Authentication", description: "4-digit PIN sign-in with session management. Biometric unlock is planned.", icon: "Fingerprint" },
      { title: "Live Exchange Rate Engine", description: "USD-to-ETB conversion with simulated live rates and multi-currency balance display.", icon: "ArrowLeftRight" },
      { title: "Factory Pattern Data Generation", description: "50+ Ethiopian/US contacts and 300+ transaction records generated via typed factories for zero-placeholder demos.", icon: "Database" },
      { title: "Offline Persistence", description: "Sessions and app data persist on the device with AsyncStorage. Encrypted storage is planned.", icon: "HardDrive" },
      { title: "Cross-Platform Deployment", description: "One codebase that runs on iOS, Android, and Web via the Expo managed workflow.", icon: "Smartphone" },
    ],

    adrs: [
      { id: "ADR-001", title: "Domain-Driven Design for Fintech", status: "Accepted", rationale: "Financial applications benefit from explicit domain modeling with clear bounded contexts." },
      { id: "ADR-002", title: "Schema-First Development", status: "Accepted", rationale: "TypeScript interfaces defined before implementation ensure frontend-backend contract alignment." },
      { id: "ADR-003", title: "Factory Pattern for Components and Data", status: "Accepted", rationale: "Reduces duplication, ensures consistency, enables rapid prototyping." },
      { id: "ADR-004", title: "Zustand over Redux", status: "Accepted", rationale: "Lightweight with better TypeScript support, synchronous updates, zero boilerplate." },
      { id: "ADR-005", title: "Reanimated 4 for Animation System", status: "Accepted", rationale: "UI-thread execution keeps animations smooth — important for fintech trust." },
      { id: "ADR-006", title: "Cross-Platform Expo Managed Workflow", status: "Accepted", rationale: "Faster development than bare React Native with excellent native performance." },
      { id: "ADR-007", title: "AsyncStorage Persistence (MMKV Planned)", status: "Accepted", rationale: "AsyncStorage keeps the prototype simple; encrypted MMKV storage is planned for a production build." },
    ],
  },

  // =========================================================================
  // 6. PANA SPORTS
  // =========================================================================
  {
    slug: "pana-sport",
    title: "Pana Sports",
    subtitle: "Ethiopia's Football Hub",
    summary:
      "A home for Ethiopian football fans. Live scores, league tables, team and player profiles, and news — in English and Amharic.",
    category: "Sports",
    tags: ["Sports", "Real-Time", "Media"],
    year: "2026",
    status: "Production",
    liveUrl: "https://panasport.et",
    heroGradient: "from-amber-500/20 via-transparent to-yellow-500/10",
    thumbnail: "/Pana Sport/Mockups/246shots_so.png",
    productType: "client-project",

    description:
      "Pana Sports is a digital home for Ethiopian football. Fans follow live scores, tables, cups, and player profiles in English or Amharic. Editors run each match minute by minute from a control panel and publish news from one dashboard. It covers the Premier League, Higher League, League One, Women's League, Ethiopian Cup, and the Walias.",
    businessProblem:
      "Ethiopian football scores and news were scattered across social media posts. Fans had no single place to check results, tables, and fixtures in their own language.",
    architecturalSolution:
      "A layered Next.js 16 app on Supabase (PostgreSQL, Auth, Storage, Realtime). Public match pages subscribe to Realtime channels on matches, match events, and lineups. Every entity carries _en/_am columns for bilingual content. The CMS is a separate route group behind an admin-role check, and editors curate standings with per-season group settings.",
    systemFlow:
      "CMS Match Control → API Route (Zod) → Supabase PostgreSQL → Realtime Channel (matches / match_events / match_lineups) → TanStack Query Cache → Public Match Page",

    techStack: [
      {
        label: "Frontend Framework",
        items: [
          { name: "Next.js", version: "16.0.10", purpose: "App Router with server components" },
          { name: "React", version: "19.2.1", purpose: "Concurrent features and hooks" },
          { name: "TypeScript", version: "5.x", purpose: "Strict type-safe development" },
        ],
      },
      {
        label: "Backend & Database",
        items: [
          { name: "Supabase", purpose: "PostgreSQL, real-time subscriptions, auth, and storage" },
          { name: "PostgreSQL", purpose: "Relational database with advanced querying" },
          { name: "Supabase Realtime", purpose: "Live score, event, and lineup channels" },
        ],
      },
      {
        label: "State Management & Data",
        items: [
          { name: "TanStack Query", version: "5.90.9", purpose: "Data fetching, caching, and sync" },
          { name: "Zod", version: "4.1.13", purpose: "Runtime type validation and schema enforcement" },
          { name: "React Hook Form", version: "7.66.1", purpose: "Performant CMS form handling" },
        ],
      },
      {
        label: "UI & Styling",
        items: [
          { name: "Tailwind CSS", version: "4.x", purpose: "Utility-first CSS with custom design system" },
          { name: "Radix UI", purpose: "Accessible UI primitives" },
          { name: "Framer Motion", version: "12.23.24", purpose: "Animation library" },
          { name: "Lucide React", version: "0.553.0", purpose: "Icon library" },
        ],
      },
      {
        label: "Content & Forms",
        items: [
          { name: "TipTap", version: "3.11.x", purpose: "Rich text editor for CMS content creation" },
        ],
      },
      {
        label: "Development & Quality",
        items: [
          { name: "ESLint", purpose: "Code linting and enforcement" },
        ],
      },
    ],

    architecture: {
      pattern: "Clean Layered Architecture (DDD) with BaaS Backend",
      diagram:
        "Presentation Layer (Next.js Pages, Components) → Application Layer (TanStack Query Hooks, Business Logic) → Domain Layer (Zod Schemas, Domain Models) → Infrastructure Layer (Supabase, API Routes)",
      designPatterns: [
        "Clean Layered Architecture (4 layers)",
        "DDD with Bounded Contexts (Public + CMS)",
        "Bilingual Content Model (_en / _am fields)",
        "Repository Pattern via Supabase Client",
        "Realtime Subscriptions (Supabase postgres_changes)",
        "Per-Season League Configuration (groups, promotion, relegation)",
      ],
    },

    boundedContexts: [
      { name: "Public Platform", responsibility: "Fan-facing live scores, standings, team/player profiles, news", entities: ["Match", "League", "Team", "Player", "NewsArticle", "Standing"] },
      { name: "CMS", responsibility: "Admin content management, match control, media uploads", entities: ["MatchEvent", "MatchLineup", "Author", "Comment", "AdCampaign", "User"] },
      { name: "Competitions", responsibility: "Seasons, cups, cup editions, groups, and knockout rounds", entities: ["Season", "Cup", "CupEdition", "CupGroup", "KnockoutRound", "LeagueSeasonConfig"] },
    ],

    schema: [
      { name: "leagues", description: "League definitions", keyFields: ["id", "slug", "name_en", "name_am", "category", "is_active"] },
      { name: "teams", description: "Club profiles with roster links", keyFields: ["id", "slug", "name_en", "name_am", "league_id", "stadium_en", "founded"] },
      { name: "players", description: "Player profiles", keyFields: ["id", "name_en", "name_am", "team_id", "position_en", "jersey_number", "photo_url"] },
      { name: "matches", description: "Match records with live status", keyFields: ["id", "league_id", "home_team_id", "away_team_id", "score_home", "score_away", "minute", "status", "match_day", "season"] },
      { name: "match_events", description: "Goals, cards, substitutions, and VAR decisions per match", keyFields: ["id", "match_id", "type", "minute", "player_id", "team_id", "confirmed"] },
      { name: "news", description: "Bilingual news articles with rich text content", keyFields: ["id", "title_en", "title_am", "content_en", "content_am", "category_id", "author_id", "published_at"] },
      { name: "standings", description: "League tables curated by editors", keyFields: ["id", "league_id", "team_id", "season", "played", "won", "draw", "lost", "gd", "points", "rank"] },
    ],

    features: [
      { title: "Real-Time Live Scores", description: "Scores, goals, cards, and lineups update on fans' screens the moment editors record them.", icon: "Radio" },
      { title: "Bilingual Content System", description: "Every page, team, player, and article works in English and Amharic, with a one-tap language switch.", icon: "Languages" },
      { title: "Leagues, Cups, and National Team", description: "Premier League, Higher League, League One, Women's League, the Ethiopian Cup, and the Walias — each with its own tables and fixtures.", icon: "Trophy" },
      { title: "Match Control Panel", description: "Editors run the match clock, log goals, cards, and VAR checks, record penalty shootouts, and fix mistakes afterwards.", icon: "Gamepad2" },
      { title: "Built-In News Editor", description: "Editors write and publish news with images, tables, and links, straight from the dashboard.", icon: "PenTool" },
      { title: "Global Search (⌘K)", description: "Press ⌘K to find any team, player, match, or article, in English or Amharic.", icon: "Search" },
    ],

    adrs: [
      { id: "ADR-001", title: "Clean Layered Architecture", status: "Accepted", rationale: "DDD alignment with independent testability per layer." },
      { id: "ADR-002", title: "Supabase as Primary Backend", status: "Accepted", rationale: "Built-in WebSocket for live scores, PostgreSQL for complex queries, managed infrastructure." },
      { id: "ADR-003", title: "Zod Schema Validation", status: "Accepted", rationale: "Enforces domain invariants at boundaries with TypeScript-first DX." },
      { id: "ADR-004", title: "TanStack Query for Data Management", status: "Accepted", rationale: "Intelligent caching and background updates for data-heavy sports app." },
      { id: "ADR-005", title: "Bilingual Content Model (_en/_am)", status: "Accepted", rationale: "Language as a core domain concept — foundation for additional languages." },
      { id: "ADR-006", title: "CMS as Separate Bounded Context", status: "Accepted", rationale: "Clear isolation of admin and fan-facing domains for security and independent evolution." },
      { id: "ADR-007", title: "Editor-Controlled Standings over Database Triggers", status: "Accepted", rationale: "Trigger-driven score updates double-counted goals; editors now own scores and standings directly." },
    ],
  },

  // =========================================================================
  // 7. PAVILION360
  // =========================================================================
  {
    slug: "pavilion-360",
    title: "Pavilion360",
    subtitle: "Event Production Platform with Built-in CRM",
    summary:
      "A complete platform for event production companies. Manage your services, rental equipment, client quotes, and leads — all from one dashboard with a stunning public website.",
    category: "Events",
    tags: ["Events", "CMS", "CRM"],
    year: "2025",
    status: "Production",
    liveUrl: "https://www.pavilion360.events/",
    heroGradient: "from-purple-500/20 via-transparent to-pink-500/10",
    thumbnail: "/Pavilion360/Mockups/610shots_so.png",
    productType: "client-project",

    description:
      "Pavilion360 turns a static marketing website into a data-driven platform with an integrated CMS and lightweight CRM. Built for an event production company in Indianapolis that specializes in audio-visual production and rental equipment, it features 8 comprehensive content modules, quote basket functionality, lead management, and Supabase PostgreSQL with Row Level Security.",
    businessProblem:
      "Pavilion360's static website required developer intervention for every content update, had no lead capture capability, and couldn't showcase their rental inventory dynamically — losing potential clients to competitors with interactive online presences.",
    architecturalSolution:
      "A Next.js full-stack platform with clear separation between public site and CMS bounded contexts. 15+ PostgreSQL tables with JSONB for flexible schemas, full-text search, and RLS policies. TipTap rich text editing, centralized media library via Supabase Storage, and TanStack Query for intelligent caching. RESTful APIs with consistent Zod validation across all public and protected endpoints.",
    systemFlow:
      "Public Visitor → Browse Services/Rentals → Quote Basket → Submit Request → CMS Admin Reviews → Lead Status Pipeline → Client Communication",

    techStack: [
      {
        label: "Core Framework",
        items: [
          { name: "Next.js", version: "16.x", purpose: "Full-stack React with App Router and Server Components" },
          { name: "React", version: "19.x", purpose: "Concurrent rendering" },
          { name: "TypeScript", version: "5.x", purpose: "End-to-end type safety" },
        ],
      },
      {
        label: "Backend & Database",
        items: [
          { name: "Supabase", purpose: "Backend-as-a-Service (PostgreSQL, Auth, Storage, Real-Time)" },
          { name: "PostgreSQL", version: "15.x", purpose: "ACID, JSONB, full-text search, RLS policies" },
          { name: "Supabase Auth", purpose: "JWT session management with user metadata for roles" },
          { name: "Supabase Storage", purpose: "CDN-backed image storage with thumbnails" },
        ],
      },
      {
        label: "State Management & Data",
        items: [
          { name: "TanStack Query", version: "5.x", purpose: "Server state with intelligent caching" },
          { name: "React Hook Form", version: "7.x", purpose: "Performant form state management" },
          { name: "Zod", version: "3.x", purpose: "Schema validation across all API boundaries" },
        ],
      },
      {
        label: "UI & UX",
        items: [
          { name: "Tailwind CSS", version: "4.x", purpose: "Utility-first CSS" },
          { name: "Radix UI", purpose: "WCAG-compliant component primitives" },
          { name: "Framer Motion", version: "12.x", purpose: "Performance-optimized animations" },
          { name: "Lucide React", purpose: "Consistent iconography" },
          { name: "Sonner", version: "1.x", purpose: "Toast notifications" },
          { name: "TipTap", purpose: "Extensible rich text editor for CMS" },
        ],
      },
      {
        label: "Development & Quality",
        items: [
          { name: "ESLint", purpose: "Code linting" },
          { name: "Prettier", purpose: "Code formatting" },
          { name: "pnpm", purpose: "Fast, disk-efficient package manager" },
        ],
      },
    ],

    architecture: {
      pattern: "Dual-Context Platform (Public + CMS) with BaaS Backend",
      diagram:
        "Public Website (/api/public/* — read-only) ↔ Supabase Backend (PostgreSQL + Storage + Auth)\nCMS Dashboard (/api/cms/* — CRUD, protected) ↔ Supabase Backend\n\n15+ Tables | RLS Policies | JSONB Schemas | Full-Text Search",
      designPatterns: [
        "DDD with 3 Bounded Contexts (Content, Rental, CRM)",
        "Repository Pattern (IServiceRepository interface)",
        "Value Objects (Slug, Email, Money, Address, SEO)",
        "Domain Events (ContentPublished, QuoteRequested)",
        "CRUD-First CMS with Templated Forms",
        "Row Level Security at Database Layer",
      ],
    },

    boundedContexts: [
      { name: "Content Management", responsibility: "Services, portfolio, blog, venues, FAQs, team, testimonials lifecycle", entities: ["Service", "PortfolioProject", "BlogPost", "Venue", "FAQ", "TeamMember", "Testimonial"] },
      { name: "Rental Management", responsibility: "Equipment inventory, categories, pricing, and quote basket", entities: ["RentalItem", "RentalCategory", "QuoteBasket"] },
      { name: "CRM", responsibility: "Quote requests, contact inquiries, and lead scoring", entities: ["QuoteRequest", "Inquiry", "Lead"] },
    ],

    schema: [
      { name: "services", description: "Service offerings with use cases and process steps", keyFields: ["id", "title", "slug", "description", "use_cases (JSONB)", "process_steps (JSONB)", "packages (JSONB)"] },
      { name: "rental_items", description: "Equipment catalog with specifications", keyFields: ["id", "name", "slug", "category_id", "specifications (JSONB)", "price_per_day", "stock"] },
      { name: "portfolio_projects", description: "Event case studies with technical highlights", keyFields: ["id", "title", "slug", "client_name", "technical_highlights (JSONB)", "client_quote"] },
      { name: "quote_requests", description: "Customer rental quote submissions", keyFields: ["id", "customer_name", "email", "items (JSONB)", "event_date", "status", "notes"] },
      { name: "inquiries", description: "General contact form submissions", keyFields: ["id", "name", "email", "message", "status", "created_at"] },
      { name: "blog_posts", description: "Company news with SEO metadata", keyFields: ["id", "title", "slug", "content", "seo (JSONB)", "published_at", "author"] },
      { name: "site_settings", description: "Global site configuration", keyFields: ["id", "company_name", "contact_info", "social_links (JSONB)"] },
    ],

    features: [
      { title: "8 CMS Content Modules", description: "Services, Rentals, Portfolio, Venues, Blog, Team, FAQs, and Testimonials — each with CRUD operations and rich text editing.", icon: "LayoutGrid" },
      { title: "Quote Basket System", description: "Interactive rental selection with multi-item quote builder, event date selection, and automated lead creation.", icon: "ShoppingCart" },
      { title: "Lead Management CRM", description: "Quote-to-lead pipeline with status tracking, priority scoring, and customer communication workflows.", icon: "Users" },
      { title: "Centralized Media Library", description: "Supabase Storage integration with CDN-backed image management, thumbnail generation, and access control.", icon: "Image" },
      { title: "Row Level Security", description: "Database-level access control ensuring public endpoints are read-only and CMS mutations require admin authentication.", icon: "ShieldCheck" },
      { title: "Admin Overview", description: "Content counts plus the latest inquiries and quote requests, at a glance.", icon: "BarChart3" },
    ],

    adrs: [
      { id: "ADR-001", title: "Next.js 16 + Supabase + TypeScript Stack", status: "Accepted", rationale: "Full-stack framework with managed backend reduces infrastructure overhead." },
      { id: "ADR-002", title: "PostgreSQL with JSONB and RLS", status: "Accepted", rationale: "Flexible schemas for complex data + database-level security." },
      { id: "ADR-003", title: "TanStack Query + React Context for State", status: "Accepted", rationale: "Server state optimized with intelligent caching; client state kept simple." },
      { id: "ADR-004", title: "Radix UI + Tailwind for UI", status: "Accepted", rationale: "WCAG compliance with full customization flexibility." },
      { id: "ADR-005", title: "Supabase Auth with Metadata Roles", status: "Accepted", rationale: "JWT auth with role stored in user profile for middleware protection." },
      { id: "ADR-006", title: "CRUD-First CMS with TipTap", status: "Accepted", rationale: "Familiar workflow for non-technical content managers." },
      { id: "ADR-007", title: "RESTful API with Zod Validation", status: "Accepted", rationale: "Consistent response format with type-safe runtime validation." },
      { id: "ADR-008", title: "Vercel + Supabase Deployment", status: "Accepted", rationale: "Optimized for Next.js with integrated managed backend." },
    ],
  },

  // =========================================================================
  // 8. PRINTONLINE.ET
  // =========================================================================
  {
    slug: "printonline-et",
    title: "PrintOnline.et",
    subtitle: "Online Ordering for Printing Services",
    summary:
      "Order printing online with instant prices, secure Chapa payments and live order tracking. Business cards to booklets, delivered across Addis Ababa.",
    category: "E-Commerce",
    tags: ["E-Commerce", "Print", "Payments"],
    year: "2026",
    status: "Production",
    liveUrl: "https://printonline.et",
    heroGradient: "from-orange-500/20 via-transparent to-red-500/10",
    thumbnail: "/PrintOnline-ET/Mockups/405shots_so.png",
    productType: "client-project",

    description:
      "PrintOnline.et is the online print shop we built for Pana Promotion in Addis Ababa. Customers choose from 15 print products, see the exact price as they pick options, upload their artwork and pay with Chapa. Every order moves through eight production steps, and customers get an email at each one. Staff run the whole shop from one dashboard: products, prices, orders, customers and the homepage.",
    businessProblem:
      "Ethiopian printing businesses rely on manual quoting, cash-on-delivery payments, and phone-based order tracking — creating pricing errors, payment delays, and zero visibility for customers into their order status.",
    architecturalSolution:
      "A schema-first Next.js 16 application with six DDD bounded contexts (Catalog, Ordering, Customer, Payment, Fulfillment, Admin). Prices come from a per-combination matrix where a product has one, and from option add-ons where it doesn't. The server reprices every order before saving it and rejects any mismatch. Chapa's hosted checkout keeps card data off our servers, and each settlement is re-verified with Chapa's API. better-auth handles sessions and Google sign-in, and Resend sends transactional email.",
    systemFlow:
      "Product Browse → Option Selection → Live Price (Matrix or Add-Ons) → Cart (Browser) → Checkout (Delivery Zone or Pickup) → Server Repricing → Chapa Hosted Payment → Verified Settlement → 8-Step Production Pipeline → Status Emails",

    techStack: [
      {
        label: "Frontend",
        items: [
          { name: "Next.js", version: "16.x", purpose: "Full-stack App Router with SSR/SSG" },
          { name: "React", version: "19.x", purpose: "Component-based UI" },
          { name: "TypeScript", version: "5.x", purpose: "Strict type safety" },
          { name: "Tailwind CSS", version: "v4.x", purpose: "Utility-first CSS" },
          { name: "shadcn/ui (Radix)", purpose: "Accessible component primitives (new-york variant)" },
          { name: "Framer Motion", version: "v11.x", purpose: "Micro-interactions" },
          { name: "Lucide React", purpose: "Icon library" },
          { name: "next-themes", purpose: "Dark mode with OKLCH color system" },
        ],
      },
      {
        label: "Data & State",
        items: [
          { name: "TanStack Query", version: "v5.x", purpose: "Server state management" },
          { name: "React Hook Form", version: "v7.x", purpose: "Form handling" },
          { name: "Zod", version: "v3.x", purpose: "Runtime validation" },
        ],
      },
      {
        label: "Backend & Database",
        items: [
          { name: "Supabase (PostgreSQL)", purpose: "Database, storage, and RLS" },
          { name: "Supabase Storage", purpose: "Artwork uploads via signed URLs (4 files, 10 MB each)" },
          { name: "better-auth", version: "1.6.x", purpose: "Session auth with email verification and Google sign-in" },
          { name: "Resend", version: "6.x", purpose: "Transactional email (order, status, verification)" },
        ],
      },
      {
        label: "Payment",
        items: [
          { name: "Chapa", purpose: "Ethiopian payment gateway (hosted checkout)" },
        ],
      },
      {
        label: "Deployment",
        items: [
          { name: "Vercel", purpose: "Hosting, CDN, and serverless functions" },
        ],
      },
    ],

    architecture: {
      pattern: "Schema-First E-Commerce with Matrix Pricing Engine",
      diagram:
        "Next.js (Storefront + CMS) → API Routes (Zod + session checks) → better-auth (Sessions, Google) → Supabase (PostgreSQL + Storage, RLS)\n\nChapa Hosted Checkout → Callback / Webhook / Verify → Re-Verify With Chapa → Single Conditional Update → Resend Email\n\nRoute Groups: (storefront) | (auth) | (account) | (cms)",
      designPatterns: [
        "DDD with 6 Bounded Contexts",
        "Hybrid Pricing (exact matrix lookup, option add-ons as fallback)",
        "8-Step Order Status Pipeline with transition rules",
        "Schema-First Development (Supabase → Types → Zod)",
        "Server-Side Repricing (409 on price mismatch)",
        "Idempotent Payment Settlement (re-verify + conditional update)",
        "Row Level Security for data isolation",
      ],
    },

    boundedContexts: [
      { name: "Catalog", responsibility: "Products, categories, options, and pricing matrices", entities: ["Product", "ProductOptions", "ProductOptionValues", "PricingMatrix"] },
      { name: "Ordering", responsibility: "Cart management, checkout wizard, order lifecycle", entities: ["Order", "OrderItem", "DesignAsset", "Cart (client-side)"] },
      { name: "Customer", responsibility: "User profiles, authentication, account management", entities: ["CustomerProfile"] },
      { name: "Payment", responsibility: "Chapa integration and transaction verification", entities: ["Order.payment (tx_ref, status, receipt)", "ChapaVerification"] },
      { name: "Fulfillment", responsibility: "8-step production pipeline, delivery zones, status emails and order messaging", entities: ["OrderStatus", "StatusHistory", "DeliveryZone", "Message"] },
      { name: "Admin", responsibility: "CMS dashboard, order management, and customer insights", entities: ["CMS_Order", "CMS_Customer", "CMS_Analytics"] },
    ],

    schema: [
      { name: "products", description: "Printing product catalog", keyFields: ["id", "name", "slug", "category_id", "base_price", "description", "features (JSONB)"] },
      { name: "product_options", description: "Configurable options per product (size, paper, lamination)", keyFields: ["id", "product_id", "option_name", "display_order"] },
      { name: "product_option_values", description: "Possible values for each option", keyFields: ["id", "option_id", "value", "label"] },
      { name: "product_pricing_matrix", description: "Exact price per option combination (v3.0)", keyFields: ["id", "product_id", "matrix_key", "matrix_label", "price", "matrix_json (JSONB)"] },
      { name: "orders", description: "Order headers with 8-step status pipeline", keyFields: ["id", "order_number", "customer_id", "total_amount", "delivery_fee", "status", "status_history (JSONB)", "payment_status", "tx_ref"] },
      { name: "order_items", description: "Line items with option selections and file uploads", keyFields: ["id", "order_id", "product_id", "selected_options (JSONB)", "quantity", "unit_price", "design_file_url"] },
      { name: "customer_profiles", description: "User data linked to better-auth", keyFields: ["id", "auth_user_id", "name", "phone", "city", "sub_city", "woreda"] },
    ],

    features: [
      { title: "Exact Prices, Instantly", description: "Customers see the final price as they choose size, paper and finish. The server checks every price again before taking payment.", icon: "Grid3X3" },
      { title: "Chapa Payments", description: "Customers pay in birr on Chapa's secure page. Card details never touch our servers, and every payment is double-checked with Chapa.", icon: "CreditCard" },
      { title: "8-Step Order Tracking", description: "Confirmed, design review, approved, printing, ready, out for delivery, delivered. Customers get an email at every step.", icon: "GitBranch" },
      { title: "Artwork Upload", description: "Attach up to four files per item. Each file is stored privately with its order.", icon: "Upload" },
      { title: "Instant Product Search", description: "Results appear as you type, across every product and category.", icon: "Search" },
      { title: "ETB Currency Localization", description: "Localized Ethiopian Birr formatting and display throughout storefront, checkout, and admin dashboard.", icon: "BadgeDollarSign" },
    ],

    adrs: [
      { id: "ADR-001", title: "Schema-First Development", status: "Accepted", rationale: "Supabase schema as source of truth with auto-generated TypeScript types." },
      { id: "ADR-002", title: "Matrix-Based Pricing", status: "Accepted", rationale: "Client pricing depends on option combinations — prevents additive errors." },
      { id: "ADR-003", title: "Hosted Payment (Chapa)", status: "Accepted", rationale: "Card data never reaches our servers; Chapa carries the card-handling compliance." },
      { id: "ADR-004", title: "8-Step Order Status Pipeline", status: "Accepted", rationale: "Models real printing business workflow with strict transition rules." },
      { id: "ADR-005", title: "Server Recomputes Every Price", status: "Accepted", rationale: "The browser's price is never trusted; mismatches return 409 and nothing is saved." },
      { id: "ADR-006", title: "TanStack Query for Data Fetching", status: "Accepted", rationale: "Caching, sync, and error handling for all data operations." },
    ],
  },

  // =========================================================================
  // 9. AUROQUEUE
  // =========================================================================
  {
    slug: "auroqueue",
    title: "AuroQueue",
    subtitle: "Smart Queue Management System",
    summary:
      "No more long lines. AuroQueue manages walk-in queues for hospitals, banks, and offices with self-service kiosks, live dashboards, and performance analytics — all in real time.",
    category: "SaaS",
    tags: ["SaaS", "Real-Time", "Multi-Tenant", "Healthcare"],
    year: "2026",
    status: "Production",
    heroGradient: "from-sky-500/20 via-transparent to-blue-500/10",
    thumbnail: "/AuroQueue/Mockups/628shots_so.png",
    productType: "saas",
    visibility: "hide", // Not presented as studio work (proposal §2)

    description:
      "AuroQueue is an enterprise-grade Queue Management System architected for operational excellence in hospitals, banks, government offices, and enterprise organizations. It delivers real-time queue orchestration across three components — a Hapi.js API server, a Next.js staff dashboard, and an Expo self-service kiosk — with multi-tenant Docker deployment and Traefik load balancing for horizontal scaling.",
    businessProblem:
      "Service organizations manage walk-in queues with manual ticketing, paper logs, and verbal announcements — creating long wait times, staff confusion, and zero analytics on operational throughput and bottlenecks.",
    architecturalSolution:
      "A microservices-inspired monorepo with three independent components: a Hapi.js REST API with JWT auth and Sequelize ORM, a Next.js admin dashboard with ShadCN UI and Recharts analytics, and an Expo-based self-service kiosk with QR ticket generation. Multi-tenant isolation via Docker containers with Traefik automatic load balancing and Redis queue state caching.",
    systemFlow:
      "Self-Service Kiosk → Ticket Generation → Redis Cache → Staff Dashboard → Call/Complete → Analytics Engine → Performance Dashboard",

    techStack: [
      {
        label: "Backend",
        items: [
          { name: "Hapi.js", version: "v21+", purpose: "Enterprise API framework" },
          { name: "Sequelize", version: "6+", purpose: "ORM with PostgreSQL/SQLite support" },
          { name: "PostgreSQL", version: "13+", purpose: "Primary production database" },
          { name: "Redis", version: "6+", purpose: "Session and queue state caching" },
          { name: "JWT (HS256)", purpose: "Token-based authentication" },
          { name: "Joi", purpose: "API input validation schemas" },
          { name: "Socket.io", version: "4+", purpose: "Real-time queue updates" },
          { name: "Multer", purpose: "File uploads with S3/cloud storage support" },
          { name: "Winston", purpose: "Structured logging" },
          { name: "Bcrypt", purpose: "Password hashing with salt rounds" },
        ],
      },
      {
        label: "Frontend Dashboard",
        items: [
          { name: "Next.js", version: "14+", purpose: "Full-stack React framework with App Router" },
          { name: "TypeScript", version: "5+", purpose: "Strict type safety" },
          { name: "ShadCN UI (Radix)", purpose: "UI component library with Radix primitives" },
          { name: "Tailwind CSS", version: "v4", purpose: "Custom design system" },
          { name: "TanStack Query", purpose: "Server state management" },
          { name: "React Hook Form + Zod", purpose: "Form handling with validation" },
          { name: "Recharts", purpose: "Analytics visualization" },
          { name: "Framer Motion", purpose: "Micro-interactions" },
        ],
      },
      {
        label: "Ticket Kiosk",
        items: [
          { name: "Expo SDK", purpose: "React Native Web cross-platform kiosk" },
          { name: "React Native", purpose: "Native touch UI with large targets" },
          { name: "Axios", purpose: "HTTP client with automatic retry logic" },
        ],
      },
      {
        label: "Infrastructure",
        items: [
          { name: "Docker", version: "20+", purpose: "Containerization" },
          { name: "Traefik", version: "2+", purpose: "Automatic load balancing and routing" },
          { name: "PM2", version: "5+", purpose: "Process management" },
        ],
      },
    ],

    architecture: {
      pattern: "Microservices-Inspired Monorepo with Multi-Tenant Docker",
      diagram:
        "Self-Service Kiosk (Expo) → REST API (Hapi.js) ← Staff Dashboard (Next.js)\n\nAll → Redis Cache + PostgreSQL → Traefik Load Balancer → Per-Client Docker Instances",
      designPatterns: [
        "DDD with 4 Bounded Contexts",
        "Multi-Tenant Container Isolation",
        "Short Polling (5s) with WebSocket-Ready Architecture",
        "Repository Pattern (Sequelize)",
        "Role-Based Access Control (Admin vs Employee)",
        "Optimistic UI Updates with Conflict Resolution",
      ],
    },

    boundedContexts: [
      { name: "Queue Management", responsibility: "Ticket lifecycle, queue algorithms, prioritization", entities: ["Ticket", "QueueSession"] },
      { name: "Staff Operations", responsibility: "Employee authentication, ticket calling, performance tracking", entities: ["User", "CallRecord"] },
      { name: "Administration", responsibility: "Department configuration, user management, system settings", entities: ["Department", "SystemConfig"] },
      { name: "Analytics & Reporting", responsibility: "Performance metrics, wait time analysis, historical reporting", entities: ["Metric", "Report", "DashboardWidget"] },
    ],

    schema: [
      { name: "tickets", description: "Central queue ticket with status and timestamps", keyFields: ["id", "ticket_number", "department_id", "status", "created_at", "called_at", "completed_at"] },
      { name: "departments", description: "Service departments with custom prefixes", keyFields: ["id", "name", "prefix", "is_active", "avg_service_time"] },
      { name: "users", description: "Staff members with roles", keyFields: ["id", "username", "role (admin|employee)", "department_id", "password_hash"] },
      { name: "queue_sessions", description: "Daily operational context", keyFields: ["id", "date", "department_id", "total_served", "avg_wait_time"] },
    ],

    features: [
      { title: "Self-Service Kiosk", description: "Touch-enabled Expo app with QR code ticket generation, large accessibility targets, and offline fallback via local storage.", icon: "Tablet" },
      { title: "Multi-Tenant Deployment", description: "Each client runs in isolated Docker containers with separate databases, independent scaling, and shared Traefik infrastructure.", icon: "Server" },
      { title: "Real-Time Queue Status", description: "5-second polling with WebSocket-ready architecture, TV display integration, and cross-device state consistency.", icon: "MonitorPlay" },
      { title: "Performance Analytics", description: "Average wait time, service time, tickets-per-hour, department comparisons, and individual staff efficiency tracking.", icon: "PieChart" },
      { title: "Traefik Load Balancing", description: "Automatic horizontal scaling with Traefik reverse proxy distributing traffic across backend instances per client.", icon: "Network" },
      { title: "TV Display Integration", description: "Real-time public display showing current ticket numbers, called tickets, and estimated wait times.", icon: "MonitorPlay" },
    ],

    adrs: [
      { id: "ADR-001", title: "Hapi.js for Enterprise API", status: "Accepted", rationale: "Plugin architecture, Joi validation, and built-in caching for enterprise workloads." },
      { id: "ADR-002", title: "Multi-Tenant Docker Isolation", status: "Accepted", rationale: "Separate databases and containers per client for data isolation and independent scaling." },
      { id: "ADR-003", title: "Expo for Cross-Platform Kiosk", status: "Accepted", rationale: "Single codebase deploys to web, iOS, and Android kiosk hardware." },
      { id: "ADR-004", title: "Redis for Queue State", status: "Accepted", rationale: "In-memory caching for sub-second queue status reads across all clients." },
    ],
  },

  // =========================================================================
  // 10. POTENTIA
  // =========================================================================
  {
    slug: "potentia",
    title: "Potentia",
    subtitle: "Bitcoin Mining Business Platform",
    summary:
      "Everything you need to run a Bitcoin mining business — from learning the basics to tracking your fleet, managing finances, and calculating tax depreciation.",
    category: "Blockchain",
    tags: ["Blockchain", "Analytics"],
    year: "2025",
    status: "MVP",
    liveUrl: "https://potentia.digital",
    heroGradient: "from-yellow-500/20 via-transparent to-amber-500/10",
    thumbnail: "/Potentia/Mockups/335shots_so.png",
    productType: "saas",

    description:
      "Potentia is a Bitcoin mining business platform, live today as a marketing site with a waitlist. It is built around three phases — Learn (education & certification), Own (equipment & asset management), and Operate (fleet monitoring & financial reporting). Demo flows show each phase, with dashboards running on sample data kept in the browser.",
    businessProblem:
      "Bitcoin mining operators lack integrated tooling to manage the full business lifecycle — education, equipment procurement, hosting contracts, fleet health monitoring, P&L reporting, and tax compliance — resulting in fragmented spreadsheets and missed depreciation opportunities.",
    architecturalSolution:
      "A DDD-architected platform with three bounded contexts (Learn, Own, Operate), each with dedicated domain services (learnService, analyticsService, taxService, financeService). Client-side LocalStorage with a structured service layer provides zero-backend MVP persistence, while TypeScript interfaces keep the models consistent. Waitlist sign-ups are forwarded to a Google Form.",
    systemFlow:
      "Learning Curriculum → Certification → Equipment Procurement → Hosting Contracts → Fleet Health Dashboard → P&L Reports → Tax Depreciation Schedules",

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
      diagram:
        "Next.js App Router → React Components → Custom Hooks → Domain Services (learnService, taxService, financeService, analyticsService) → LocalStorage Persistence\n\nDomains: Learn | Own | Operate | Shared Infrastructure",
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
      { name: "Learn", responsibility: "Bitcoin mining curriculum, assessments, certification, study streaks", entities: ["Lesson", "Track", "Quiz", "Certification", "LearningProgress"] },
      { name: "Own", responsibility: "Equipment procurement, hosting contracts, capital deployment", entities: ["Equipment", "HostingContract", "Asset", "Facility"] },
      { name: "Operate", responsibility: "Fleet health, P&L reporting, tax depreciation, treasury management", entities: ["Fleet", "FinancialReport", "DepreciationSchedule", "Alert"] },
    ],

    schema: [
      { name: "lessons", description: "Individual learning units with video and assessment", keyFields: ["id", "track_id", "title", "content_url", "quiz", "duration"] },
      { name: "tracks", description: "Learning paths grouping related lessons", keyFields: ["id", "title", "lessons", "difficulty", "certification"] },
      { name: "equipment", description: "Mining hardware with specifications", keyFields: ["id", "model", "hash_rate", "power_consumption", "purchase_price", "acquisition_date"] },
      { name: "contracts", description: "Hosting agreements with terms and costs", keyFields: ["id", "facility_name", "start_date", "end_date", "monthly_cost", "power_rate"] },
      { name: "financial_reports", description: "P&L statements and balance sheets", keyFields: ["id", "period", "revenue", "expenses", "net_income", "cash_flow"] },
    ],

    features: [
      { title: "Interactive Learning Curriculum", description: "Comprehensive Bitcoin mining education from fundamentals to advanced strategy, with video content, quizzes, study streaks, and certification.", icon: "GraduationCap" },
      { title: "Equipment & Asset Management", description: "Track mining hardware inventory, hosting contracts, capital deployment, and facility management in one dashboard.", icon: "HardDrive" },
      { title: "P&L Financial Reporting", description: "Profit & loss views with revenue, expense, and cash flow breakdowns, shown on sample data in the demo.", icon: "DollarSign" },
      { title: "Tax Depreciation Engine", description: "Automated depreciation schedules for mining equipment with multiple strategy options (straight-line, MACRS).", icon: "Calculator" },
      { title: "Fleet Health Dashboard", description: "Dashboards for mining fleet performance and alert thresholds, shown on sample data in the demo.", icon: "Activity" },
      { title: "Domain Analytics Events", description: "Structured event tracking across Learn, Own, and Operate phases for data-driven business decisions.", icon: "BarChart" },
    ],

    adrs: [
      { id: "ADR-001", title: "DDD with Learn/Own/Operate Contexts", status: "Accepted", rationale: "Complex mining business lifecycle requires explicit domain modeling." },
      { id: "ADR-002", title: "Service Layer Architecture", status: "Accepted", rationale: "Business logic decoupled from UI for testability and domain isolation." },
      { id: "ADR-003", title: "Client-Side LocalStorage for MVP", status: "Accepted", rationale: "Zero backend dependency for rapid development — migration path to full backend." },
      { id: "ADR-004", title: "Radix UI + Tailwind for Components", status: "Accepted", rationale: "WCAG compliance with consistent design system." },
      { id: "ADR-005", title: "Domain-Specific Event Tracking", status: "Accepted", rationale: "Structured analytics across all three phases for business intelligence." },
    ],
  },

  // =========================================================================
  // 11. LIVE ADDIS
  // =========================================================================
  {
    slug: "live-addis",
    title: "Live Addis",
    subtitle: "Official Website for Live Addis NGO",
    summary:
      "A clean, mobile-friendly website for LIVE-ADDIS, a non-profit in Addis Ababa that supports vulnerable young people. It presents the organization’s mission, programs, team, and news.",
    category: "Corporate Web",
    tags: ["Corporate", "Web Design", "NGO"],
    year: "2025",
    status: "Production",
    heroGradient: "from-pink-500/20 via-transparent to-rose-500/10",
    thumbnail: "/LiveAddis/Mockups/47shots_so.png",
    productType: "client-project",

    description:
      "Live Addis is the website for LIVE-ADDIS (Livelihood Improvement for Vulnerable Ethiopians – Addis Ababa), a non-profit that supports vulnerable youth through vocational training, entrepreneurship, and health awareness. It is a static site with pages for the organization’s story, team and timeline, a blog built from the NGO’s Facebook posts, contact details, and an FAQ. There is no backend: all content ships with the site.",
    businessProblem:
      "The NGO needed a modern, professional online presence to communicate their mission, share program updates, and attract supporters — replacing an outdated digital footprint that limited their reach and credibility.",
    architecturalSolution:
      "A static Next.js 16 site with no backend, database, or API. Blog posts come from a one-off scrape of the NGO’s Facebook page: a download script saves each post’s images and writes a JSON file that the home and blog pages import. Pages are prerendered, so content is immediately available to search engines.",
    systemFlow:
      "Facebook Page Scrape → Image Download Script → clean_data.json → Home & Blog Pages → Static Build on Vercel",

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
        items: [
          { name: "Vercel", purpose: "Static hosting" },
          { name: "pnpm", purpose: "Package management" },
        ],
      },
    ],

    architecture: {
      pattern: "Static Marketing Site with Build-Time Content",
      diagram:
        "Facebook Page Scrape → Download Script → clean_data.json + public/images/posts → Next.js Pages (home, about, blog, contact, faq) → Vercel",
      designPatterns: [
        "Static Generation (no backend)",
        "Build-Time Content from JSON",
        "Shared Layout (navbar and footer)",
        "Light and Dark Themes",
      ],
    },

    boundedContexts: [
      { name: "Organization", responsibility: "Mission, programs, team, and timeline pages", entities: ["Page", "TeamMember", "Program"] },
      { name: "Blog", responsibility: "News posts republished from the NGO’s Facebook page", entities: ["Post"] },
    ],

    schema: [
      { name: "clean_data.json", description: "Blog posts from the NGO’s Facebook page (no database)", keyFields: ["id", "text", "url", "likes", "comments", "shares", "media"] },
    ],

    features: [
      { title: "Mission and Programs", description: "Clear pages for the organization’s story, programs, team, and timeline.", icon: "Users" },
      { title: "Blog from Facebook Posts", description: "The NGO’s Facebook updates become blog posts on the site, with their photos.", icon: "Share2" },
      { title: "Mobile-Friendly Design", description: "Works well on phones, with smooth page animations.", icon: "Smartphone" },
      { title: "Light and Dark Themes", description: "Visitors can switch between light and dark modes.", icon: "Moon" },
      { title: "FAQ and Contact", description: "Common questions answered, with contact details on every page.", icon: "MessageSquare" },
    ],

    adrs: [
      { id: "ADR-001", title: "Static Site with No Backend", status: "Accepted", rationale: "An NGO site that rarely changes needs no server, database, or running costs." },
      { id: "ADR-002", title: "Blog Content from a Facebook Scrape", status: "Accepted", rationale: "Reuses the posts the NGO already writes instead of a second publishing workflow." },
      { id: "ADR-003", title: "Next.js with TypeScript for UI", status: "Accepted", rationale: "Static generation and excellent developer ergonomics." },
    ],
  },

  // =========================================================================
  // 12. JARVIS
  // =========================================================================
  {
    slug: "jarvis",
    title: "JARVIS",
    subtitle: "AI-Powered Development Automation",
    summary:
      "Our in-house AI assistant. Ask it on Telegram, web, or mobile, and it plans work, reviews code, and runs our daily routines.",
    category: "AI Infra",
    tags: ["AI Infra", "AI/ML", "DevOps", "Automation"],
    year: "2026",
    status: "Development",
    heroGradient: "from-cyan-500/20 via-transparent to-teal-500/10",
    thumbnail: "/Jarvis/Mockups/175shots_so.png",
    productType: "internal",

    description:
      "JARVIS is the assistant our studio runs on. You chat with it from Telegram, a web dashboard, or a mobile app. It follows written playbooks, from morning check-ins to shipping a feature or drafting a client report, and it connects to GitHub, Notion, Supabase, a browser, and files to get real work done.",
    businessProblem:
      "A small studio loses hours to repeat work: checking repos, writing updates, reviewing code, and chasing deploys. That time should go into building.",
    architecturalSolution:
      "A Turborepo monorepo with four apps: a Fastify 5 API (Supabase Auth, tenant-scoped row-level security, a CRUD route factory), Hermes, a Next.js dashboard, and an Expo mobile app. Hermes is an in-house agent runtime with per-role OpenRouter fallback chains, skill docs, and a BullMQ cron. MCP servers run as pinned Docker containers behind a stdio bridge.",
    systemFlow:
      "Telegram / Web / Mobile → Fastify API (Supabase Auth + Tenant Context) → Hermes Runtime (Skill Matcher → OpenRouter Fallback Chain) → MCP Bridge (GitHub | Notion | Supabase | Browser | Filesystem) → WebSocket Progress + Telegram Reply",

    techStack: [
      {
        label: "Agent Runtime",
        items: [
          { name: "Hermes", purpose: "In-house agent runtime (Fastify 5 + BullMQ)" },
          { name: "OpenRouter", purpose: "Model access with per-role fallback chains" },
        ],
      },
      {
        label: "MCP Integrations",
        items: [
          { name: "GitHub MCP", purpose: "Repository management, PRs, and issues" },
          { name: "Notion MCP", purpose: "Documentation and knowledge base" },
          { name: "Supabase MCP", purpose: "Database access" },
          { name: "Browser MCP (Playwright)", purpose: "Web automation and research" },
          { name: "Filesystem MCP", purpose: "Project files" },
        ],
      },
      {
        label: "Platform",
        items: [
          { name: "Fastify", version: "5", purpose: "API server" },
          { name: "Supabase", purpose: "Postgres, Auth, and row-level security" },
          { name: "Redis + BullMQ", purpose: "Job queue and scheduled jobs" },
          { name: "Next.js", purpose: "Web dashboard" },
          { name: "Expo / React Native", purpose: "Mobile app" },
          { name: "Turborepo + pnpm", purpose: "Monorepo tooling" },
        ],
      },
      {
        label: "Infrastructure",
        items: [
          { name: "Docker Compose", purpose: "API, runtime, Redis, and MCP containers" },
          { name: "GitHub Actions", purpose: "CI with custom audit guards" },
        ],
      },
      {
        label: "Chat Interface",
        items: [
          { name: "Telegram Bot API", purpose: "Two-way chat with allow-listed chats" },
        ],
      },
    ],

    architecture: {
      pattern: "Multi-Client Agent Platform (API + Agent Runtime + MCP Bridge)",
      diagram:
        "Clients (Telegram | Web Dashboard | Mobile App) → Fastify API (Supabase Auth, Tenant Context)\n↓\nHermes Runtime (Skills, Fallback Chains, Cron)\n↓\nMCP Bridge (GitHub | Notion | Supabase | Browser | Filesystem)",
      designPatterns: [
        "Per-Role Model Fallback Chains with Boot-Time Catalog Check",
        "MCP (Model Context Protocol) for tool integration",
        "Skill Docs as Agent Playbooks",
        "Tenant-Scoped Row-Level Security",
        "Read-Only Docker Socket Proxy",
      ],
    },

    boundedContexts: [
      { name: "Agent Runtime", responsibility: "Skill matching, model chains, cron jobs, and MCP tool calls", entities: ["Skill", "WorkflowRun", "Chain"] },
      { name: "Platform", responsibility: "Tenants, users, services, secrets, and audit logs", entities: ["Tenant", "Profile", "Service", "Secret", "AuditLog"] },
      { name: "Conversation", responsibility: "Chat sessions across Telegram, web, and mobile", entities: ["ChatSession", "ChatMessage"] },
    ],

    schema: [
      { name: "tenants", description: "Workspaces that own all other records", keyFields: ["id", "name"] },
      { name: "workflows", description: "Saved multi-step routines", keyFields: ["id", "tenant_id", "name"] },
      { name: "workflow_runs", description: "Run history for each workflow", keyFields: ["id", "workflow_id", "status"] },
      { name: "skills", description: "Agent playbooks the runtime can match", keyFields: ["id", "tenant_id", "name"] },
      { name: "chat_sessions", description: "Conversations across Telegram, web, and mobile", keyFields: ["id", "tenant_id"] },
      { name: "chat_messages", description: "Messages within a chat session", keyFields: ["id", "session_id"] },
    ],

    features: [
      { title: "Multi-Model Agent Routing", description: "Each job goes to the model best suited for it, with backups ready if one is down.", icon: "Route" },
      { title: "Connected Tools", description: "Works directly in GitHub, Notion, Supabase, a web browser, and project files.", icon: "Plug" },
      { title: "Built-In Playbooks", description: "Written routines for morning check-ins, code reviews, shipping features, client reports, and invoices.", icon: "Server" },
      { title: "Containerized Services", description: "The assistant, its job queue, and each connected tool run in their own Docker containers.", icon: "Container" },
      { title: "Chat-First Interface", description: "Chat with it from Telegram, the web dashboard, or the mobile app.", icon: "MessageSquare" },
      { title: "Scheduled Jobs", description: "Runs routines on a schedule and reports back on Telegram.", icon: "Settings" },
    ],

    adrs: [
      { id: "ADR-001", title: "OpenClaw as Self-Hosted Gateway", status: "Deprecated", rationale: "Replaced in v1.5 by the in-house Hermes runtime." },
      { id: "ADR-002", title: "OpenRouter for Model Access", status: "Accepted", rationale: "Free model tiers keep costs near zero; a boot-time check catches renamed models." },
      { id: "ADR-003", title: "One Container per MCP Server", status: "Accepted", rationale: "One pinned image, with each integration in its own container." },
      { id: "ADR-004", title: "Docker Containerization", status: "Accepted", rationale: "Portable deployment with the API, runtime, and tools in containers." },
      { id: "ADR-005", title: "In-House Hermes Runtime", status: "Accepted", rationale: "Owning the agent loop gives control over skills, fallback chains, and tool security." },
    ],
  },
  // =========================================================================
  // 13. UNLOCK ETHIOPIA POTENTIAL
  // =========================================================================
  {
    slug: "unlock-ethiopia-potential",
    title: "Unlock Ethiopia Potential",
    subtitle: "Bitcoin Mining Summit 2025",
    summary: "The website for a Bitcoin mining summit in Ethiopia. An immersive event landing page showcasing speakers, partners, and the agenda.",
    category: "Events",
    tags: ["Events", "Blockchain", "Landing Page"],
    year: "2025",
    status: "Production",
    liveUrl: "https://www.unlockethiopiapotential.com/",
    heroGradient: "from-[#AF8F6F]/20 via-transparent to-[#74512D]/10",
     thumbnail: "/Unlock Ethiopian Potential/Mockups/188shots_so.png",
     imageDir: "Unlock Ethiopian Potential",
    productType: "client-project",

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
          { name: "React Router DOM", purpose: "Client-side SPA navigation" }
        ]
      },
      {
        label: "Styling & Animation",
        items: [
          { name: "Tailwind CSS", version: "4+", purpose: "Utility-first design system" },
          { name: "Framer Motion", version: "12+", purpose: "Declarative scroll and layout animations" },
          { name: "Flowbite", purpose: "Accessible Tailwind UI components" }
        ]
      }
    ],

    architecture: {
      pattern: "Single-Page Application (SPA) with Client-Side Routing",
      diagram: "Vite Bundler → React App Router → Shared UI Components (Hero, Teams, Vital-Info) → External Registration",
      designPatterns: [
        "Component-Based Architecture",
        "Declarative Animation Logic",
        "Mobile-First Responsive Grid"
      ]
    },

    boundedContexts: [
      { name: "Event Promotion", responsibility: "Hero, mission statement, and statistics", entities: ["StatisticCard", "HeroSection"] },
      { name: "Schedule & People", responsibility: "Agenda timeline, speaker profiles, and sponsor grids", entities: ["Speaker", "Session", "Sponsor"] }
    ],

    schema: [
      { name: "Event Content", description: "Static content structures powering the UI", keyFields: ["title", "description", "image_asset", "social_links"] }
    ],

    features: [
      { title: "Cinematic Scroll Reveals", description: "Framer Motion powers smooth fade-ins, slide-ups, and floating background elements for a premium feel.", icon: "Sparkles" },
      { title: "Dynamic Partner Grid", description: "Responsive showcase of the summit's partner organizations, with per-logo scaling and hover effects.", icon: "LayoutGrid" },
      { title: "Vital Industry Statistics", description: "Animated data cards presenting Ethiopia's hashrate, energy allocation, and mining footprint.", icon: "BarChart3" },
      { title: "Interactive Agenda", description: "Day-by-day timeline with speaker profiles, session descriptions, and integrated LinkedIn links.", icon: "Calendar" }
    ],

    adrs: [
      { id: "ADR-001", title: "Vite + React SPA", status: "Accepted", rationale: "Static event content does not require SSR; SPA provides fastest possible intra-page navigation." },
      { id: "ADR-002", title: "Framer Motion for Animations", status: "Accepted", rationale: "Declarative API simplifies complex scroll-triggered reveals compared to pure CSS." }
    ]
  },

  // =========================================================================
  // 14. MINAB CLOTHING
  // =========================================================================
  {
    slug: "minab-clothing",
    title: "Minab Clothing",
    subtitle: "Premium Ethiopian Fashion E-Commerce",
    summary: "A demo storefront for contemporary Ethiopian fashion. Dark and light themes, smooth animations, and a full mock shopping flow from browsing to checkout.",
    category: "E-Commerce",
    tags: ["E-Commerce", "Fashion", "Retail"],
    year: "2024",
    status: "Demo",
    heroGradient: "from-[#8B4513]/20 via-transparent to-[#D2B48C]/10",
    thumbnail: "/Minab/Mockups/524shots_so.png",
    imageDir: "Minab",
    productType: "internal",

    description: "Minab Clothing is a demo storefront for contemporary Ethiopian fashion rooted in heritage craftsmanship. Built in 2024 on a mock data layer, it shows the full shopping flow with a dual-theme OKLCH color system, fluid Framer Motion transitions, and a strictly modular component structure.",
    businessProblem: "Fashion brands require more than just an 'add to cart' button; they need a digital environment that reflects the quality of their physical products. Standard templates often feel cheap and fail to provide the immersive, premium feel necessary for luxury or heritage fashion.",
    architecturalSolution: "Built on Next.js App Router, the platform employs a strict three-tier architecture (Public, Customer, Admin) and an 'Extreme Modularization' pattern. It utilizes a custom Radix-inspired UI primitive library, ensuring perfect accessibility while maintaining complete design freedom. State is managed locally with a robust mock data layer for instant interaction feedback.",
    systemFlow: "Discovery (Collections/Home) → Product Detail (SSG) → Cart Management → 3-Step Checkout Flow → Order Confirmation",

    techStack: [
      {
        label: "Frontend",
        items: [
          { name: "Next.js", version: "15.5", purpose: "App Router, SSR/SSG" },
          { name: "TypeScript", version: "5.8", purpose: "Strict mode schemas" },
          { name: "Tailwind CSS", version: "3.4", purpose: "OKLCH design tokens" },
          { name: "Framer Motion", version: "12.3", purpose: "Spring animations" }
        ]
      },
      {
        label: "Forms & State",
        items: [
          { name: "React Hook Form", version: "7.55", purpose: "Checkout and account forms" },
          { name: "Sonner", version: "2.0", purpose: "Toast notification system" }
        ]
      }
    ],

    architecture: {
      pattern: "Extreme Modularization Hybrid SSG",
      diagram: "Next.js Pages → Shared UI Primitives → Feature Components → Centralized Mock Data Layer",
      designPatterns: [
        "Three-Tier Architecture",
        "Schema-First (typefile.d.ts)",
        "Strict Import Direction (ui → shared → feature)"
      ]
    },

    boundedContexts: [
      { name: "Shop", responsibility: "Product discovery, filtering, and detail pages", entities: ["Product", "Collection", "Category"] },
      { name: "Account", responsibility: "Order history, wishlists, and shipping profiles", entities: ["Order", "Address", "WishlistItem"] },
      { name: "Checkout", responsibility: "Cart totals, promo codes, and multi-step payment", entities: ["Cart", "CheckoutSession"] }
    ],

    schema: [
      { name: "Product", description: "Fashion items with variations", keyFields: ["id", "name", "price", "colors", "sizes", "images"] },
      { name: "Order", description: "Customer purchases", keyFields: ["id", "status", "total", "items", "shipping_address"] }
    ],

    features: [
      { title: "OKLCH Dual Theme System", description: "Perceptually uniform color tokens provide perfect contrast ratios across both deep espresso dark mode and warm cream light mode.", icon: "Palette" },
      { title: "Fluid Spring Animations", description: "Framer Motion powers staggered entrances, layout transitions, and interactive micro-animations for a native app feel.", icon: "Activity" },
      { title: "Multi-Step Checkout", description: "A comprehensive mock checkout flow including shipping profiles, promo code validation, and order review.", icon: "CreditCard" },
      { title: "Custom UI Primitives", description: "A Radix-inspired component library built for accessibility and the brand's own look.", icon: "Component" }
    ],

    adrs: [
      { id: "ADR-001", title: "OKLCH Color Space", status: "Accepted", rationale: "Provides predictable, accessible color scaling across light/dark themes impossible with standard RGB/HSL." },
      { id: "ADR-002", title: "Extreme Modularization", status: "Accepted", rationale: "Strict downward-only import rules prevent dependency cycles and enforce clean boundaries." }
    ]
  },

  // =========================================================================
  // 15. TIBEB
  // =========================================================================
  {
    slug: "tibeb",
    title: "Tibeb",
    subtitle: "Traditional Habesha Clothing Platform",
    summary: "Bridging centuries of Ethiopian artistry with modern digital commerce. A storefront with international card payments, built to bring traditional Habesha clothing to a global market.",
    category: "E-Commerce",
    tags: ["E-Commerce", "Cultural", "Retail"],
    year: "2025",
    status: "MVP",
    heroGradient: "from-[#D4AF37]/20 via-transparent to-[#1C2526]/10",
    thumbnail: "/Tibeb/Mockups/765shots_so.png",
    imageDir: "Tibeb",
    productType: "client-project",

    description: "Tibeb is a digital storefront celebrating the beauty of traditional Ethiopian Habesha clothing. Designed for high-end cultural fashion, it offers a seamless browsing experience for dresses, menswear, and couples' sets. The platform is architected with a tier-1 public interface for SEO-optimized discovery, transitioning to a secure, authenticated flow for cart management and checkout.",
    businessProblem: "Traditional clothing artisans and retailers often lack the technical infrastructure to reach global diaspora markets. They require a platform that not only processes international payments securely but also presents their handcrafted products with the visual dignity they deserve.",
    architecturalSolution: "Built on Next.js 15 App Router, Tibeb utilizes a dual-tier architecture. The public storefront is highly optimized for read-only discovery, while Clerk authentication protects the cart and checkout flows. Supabase PostgreSQL serves as the primary data store, integrated via a strict schema-first Factory Pattern. Payments are processed securely via Stripe Elements.",
    systemFlow: "Public Browsing (SSR/SSG) → Clerk Authentication (for Cart) → Supabase Cart → Stripe Checkout → Order Fulfillment",

    techStack: [
      {
        label: "Frontend & Auth",
        items: [
          { name: "Next.js", version: "15.x", purpose: "App Router and Server Actions" },
          { name: "Clerk", version: "6.x", purpose: "Authentication and session management" },
          { name: "Tailwind CSS", version: "4.x", purpose: "Utility styling with OKLCH tokens" }
        ]
      },
      {
        label: "Backend & Payments",
        items: [
          { name: "Supabase", version: "2.x", purpose: "PostgreSQL database and storage" },
          { name: "Stripe", version: "18.x", purpose: "Secure payment processing" }
        ]
      }
    ],

    architecture: {
      pattern: "Tier 1 Public Interface + Authenticated Backend",
      diagram: "Next.js Public Storefront → Clerk Auth Wall → Protected Cart/Checkout → Stripe + Supabase PostgreSQL",
      designPatterns: [
        "Schema-First Database Types",
        "Factory Pattern CRUD",
        "Dual API Namespace (Public vs Protected)",
        "Query Key Factory"
      ]
    },

    boundedContexts: [
      { name: "Storefront", responsibility: "SEO-optimized product catalog and cultural content", entities: ["Product", "Category", "Review"] },
      { name: "Commerce", responsibility: "Session-based carts, checkout, and payment intents", entities: ["Cart", "CartItem", "Transaction", "Order"] }
    ],

    schema: [
      { name: "products", description: "Catalog items with stock and category", keyFields: ["id", "name", "price", "category", "stock"] },
      { name: "transactions", description: "Stripe payment records", keyFields: ["id", "order_id", "stripe_payment_intent_id", "status"] }
    ],

    features: [
      { title: "Stripe Checkout Integration", description: "International card payments through Stripe Elements, so card details are handled by Stripe.", icon: "CreditCard" },
      { title: "Clerk Auth Wall", description: "Frictionless browsing transitions into secure authentication only when users interact with the cart or checkout.", icon: "Lock" },
      { title: "Supabase-Backed Cart", description: "A PostgreSQL-backed shopping cart stored on the server instead of the browser.", icon: "ShoppingCart" },
      { title: "Cultural Spotlight UI", description: "Premium, abstract geometric hero sections and glassmorphism elements that elevate the brand aesthetic.", icon: "Sparkles" }
    ],

    adrs: [
      { id: "ADR-001", title: "Dual API Namespace", status: "Accepted", rationale: "Strict separation of /api/public and /api/protected ensures sensitive mutation routes cannot be accessed accidentally." },
      { id: "ADR-002", title: "Supabase + Stripe Stack", status: "Accepted", rationale: "Combines relational data integrity with Stripe's hosted payment security." }
    ]
  }
];

// ---------------------------------------------------------------------------
// CANONICAL PROJECT DISPLAY ORDER
// ---------------------------------------------------------------------------

const PROJECT_ORDER: string[] = [
  'obsidian-erp-v3.0',
  'threatmatrix-ai',
  'jarvis',
  'auroqueue',
  'pana-sport',
  'pavilion-360',
  'printonline-et',
  'oskaz-ecommerce',
  'fastpay',
  'unlock-ethiopia-potential',
  'pana-web',
  'potentia',
  'live-addis',
  'minab-clothing',
  'tibeb',
];

// ---------------------------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------------------------

const isVisible = (p: ProjectEntry) => p.visibility !== 'hide';

const VISIBLE_PROJECTS: ProjectEntry[] = PROJECT_DATABASE.filter(isVisible);

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return VISIBLE_PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjects(): ProjectEntry[] {
  return PROJECT_ORDER
    .map(slug => VISIBLE_PROJECTS.find(p => p.slug === slug))
    .filter((p): p is ProjectEntry => Boolean(p));
}

export function getAllSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

export function getProjectsByCategory(category: string): ProjectEntry[] {
  return VISIBLE_PROJECTS.filter((p) => p.category === category);
}

export function getProjectsByTag(tag: string): ProjectEntry[] {
  return VISIBLE_PROJECTS.filter((p) => p.tags.includes(tag));
}

export function getAllCategories(): string[] {
  return Array.from(new Set(VISIBLE_PROJECTS.map((p) => p.category)));
}

export function getAllTags(): string[] {
  return Array.from(new Set(VISIBLE_PROJECTS.flatMap((p) => p.tags)));
}
