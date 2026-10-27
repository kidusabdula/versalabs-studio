import { defineProject } from '../schema';

export default defineProject({
  slug: "versa-fx",
  title: "Versa FX",
  subtitle: "Forex Bureau Management, Multi-Tenant",
  summary: "One platform for running licensed foreign exchange bureaus: the teller counter, rates, cash, compliance and reporting. The live product demo runs in the browser on demo data, with no backend yet.",
  category: "Fintech",
  tags: ["Fintech", "Forex", "Compliance", "Multi-Tenant"],
  year: "2026",
  status: "Development",
  kind: "product",
  industry: ["Finance"],
  stack: ["Next.js"],
  links: {
    live: "https://versa-fx.vercel.app",
  },
  heroGradient: "from-zinc-500/20 via-transparent to-neutral-500/10",
  gallery: [],
  description: "Versa FX runs a foreign exchange bureau end to end: the teller counter, rate approval, branch cash, KYC and AML case work, and audit-ready reporting. One platform serves many bureaus. Each bureau gets its own workspace with its own name, logo, traded currencies, branches, modules and data. The current release is a product demo on demo data: fictional bureaus, people and accounts, stored in the browser, with no backend or real sign-in. The production backend is specified but not built yet.",
  businessProblem: "A licensed bureau has to serve customers quickly at the counter and still pass a regulator's inspection. Every rate change, cash movement and customer check has to be controlled and traceable, at every branch.",
  architecturalSolution: "A Next.js 16 front end on a seeded demo store (Zustand, persisted to localStorage). Tenancy is a single layer: every record carries a tenant id, and screens only ever read the active tenant's slice, so no screen can read or write another bureau's data. Money is never a float: amounts are integer minor units, and rounding happens once at a named boundary. Roles and permissions live in one map that drives navigation, actions and the published permission matrix. The production platform is specified separately: a NestJS modular monolith on self-hosted, in-country PostgreSQL, with a restrictive row-level security policy per tenant, an append-only hash-chained audit log and exact decimal money.",
  systemFlow: "Workspace (tenant) → Sign In by Role → Rate Sheet Proposed → Checker Approves → Teller Quote → KYC and Sanction Checks → Transaction + Printable Receipt → Drawer and Vault Positions → Compliance Alerts → Reports + Audit Trail",
  techStack: [
    {
      label: "Product Demo",
      items: [
        { name: "Next.js", version: "16.3", purpose: "App Router with Turbopack" },
        { name: "React", version: "19.2", purpose: "Component UI" },
        { name: "TypeScript", version: "5.x", purpose: "Strict mode across the app" },
        { name: "Tailwind CSS", version: "4.x", purpose: "Monochrome design tokens, dark and light themes" },
        { name: "Zustand", version: "5.x", purpose: "Seeded demo store with explicit hydration" },
        { name: "Framer Motion", version: "12.x", purpose: "Motion that honours reduced-motion settings" },
        { name: "Hand-built SVG charts", purpose: "Charts with no charting dependency" },
        { name: "Outfit + Geist + Noto Sans Ethiopic", purpose: "Self-hosted fonts for headings, interface and Amharic" },
      ],
    },
    {
      label: "Production Plan (Specified, Not Built)",
      items: [
        { name: "NestJS", purpose: "Modular monolith backend with enforced module boundaries" },
        { name: "PostgreSQL", purpose: "Self-hosted and in-country, with row-level security per tenant" },
        { name: "Zod", purpose: "Shared contracts at every boundary between API and client" },
        { name: "TanStack Query", purpose: "Server state once the API replaces the demo store" },
      ],
    },
  ],
  architecture: {
    pattern: "Multi-Tenant Front-End Demo on a Tenant-Scoped Store",
    diagram: "Tenant resolution (?tenant= · subdomain · last visit) → Tenant provider → Demo store (every record stamped with tenantId) → scopeToTenant → screens read only the active tenant's slice → writes merge back stamped with the tenant\n\nRBAC map → navigation · actions · permission matrix\n\nPlanned production: Next.js → NestJS modular monolith → PostgreSQL (restrictive RLS on app.tenant_id, append-only hash-chained audit)",
    designPatterns: [
      "One tenant-scoping layer for every read and write",
      "Integer minor-unit money layer",
      "Maker–checker approval for rate sheets",
      "Role-based access from a single permission map",
      "Per-tenant currencies, branches and module switches",
      "Explicit hydration so server and client HTML agree",
      "Dual-calendar dates (Ethiopian first, Gregorian second)",
    ],
  },
  boundedContexts: [
    {
      name: "Counter",
      responsibility: "Live quotes, denomination breakdown, compliance gating and printable receipts",
      entities: ["Transaction", "Quote", "Receipt"],
    },
    {
      name: "Rates",
      responsibility: "Rate sheets, maker–checker approval and comparison with the central bank reference rate",
      entities: ["RateSet", "RateQuote"],
    },
    {
      name: "Cash",
      responsibility: "Vault and drawer positions, dual-control transfers and variance tracking",
      entities: ["CashDrawer", "DrawerSession", "VaultBalance", "CashMovement"],
    },
    {
      name: "Compliance",
      responsibility: "KYC register, risk tiering, sanction screening, alert triage, cases and suspicious transaction reports",
      entities: ["Customer", "ComplianceAlert", "ScreeningResult", "StrFiling"],
    },
    {
      name: "Workspace",
      responsibility: "The bureau's branding, currencies, modules, branches, users and roles",
      entities: ["Tenant", "Branch", "User", "Role"],
    },
    {
      name: "Audit & Reporting",
      responsibility: "Append-only event log, management reporting and exports",
      entities: ["AuditEvent", "Report"],
    },
  ],
  schema: [
    {
      name: "tenants (production spec)",
      description: "One row per bureau workspace; every tenant-owned table carries tenant_id",
      keyFields: ["id", "slug", "display_name", "logo_mark", "accent", "base_currency", "licence_label", "status"],
    },
    {
      name: "rate_sets (production spec)",
      description: "Rate sheets; a database check stops the proposer from approving their own sheet",
      keyFields: ["id", "version", "effective_date", "status", "branch_id", "proposed_by", "approved_by"],
    },
    {
      name: "transactions (production spec)",
      description: "Counter deals tied to the rate sheet they used, with a consistency check on the totals",
      keyFields: ["id", "ref", "direction", "currency_code", "foreign_amount", "rate", "rate_set_id", "commission_etb", "net_etb", "customer_id", "branch_id", "status"],
    },
    {
      name: "compliance_alerts (production spec)",
      description: "AML alerts with severity, assignment and a due time",
      keyFields: ["id", "ref", "alert_type", "severity", "status", "customer_id", "transaction_id", "assigned_to", "sla_due_at"],
    },
    {
      name: "audit_events (production spec)",
      description: "Append-only, hash-chained log of every action",
      keyFields: ["id", "occurred_at", "actor_label", "action", "entity", "entity_id", "detail", "prev_hash", "row_hash"],
    },
  ],
  features: [
    { title: "A Workspace per Bureau", description: "Each bureau has its own name, logo, currencies, branches and data. Nothing from one bureau shows in another." },
    { title: "Customise a Workspace", description: "Admins rename the workspace, change its logo, switch currencies and modules on or off, and add branches. Every change lands in the audit trail." },
    { title: "Teller Counter", description: "A live quote, a denomination breakdown and a printable receipt. The counter blocks a deal for a customer with a sanction hit or expired KYC, and says why." },
    { title: "Maker–Checker Rates", description: "One person proposes a rate sheet and another approves it. The proposer cannot approve their own sheet." },
    { title: "Role-Based Views", description: "A cashier, a compliance officer and an executive each get their own navigation and actions." },
    { title: "English and Amharic", description: "The interface switches to Amharic in Ge'ez script, while money stays in Arabic numerals." },
    { title: "Ethiopian Calendar", description: "Every date shows the Ethiopian calendar first and the Gregorian second, and reports follow the Ethiopian fiscal year." },
  ],
  adrs: [
    { id: "ADR-001", title: "One Tenant-Scoping Layer", status: "Accepted", rationale: "Screens only read the active tenant's slice, so isolation does not depend on each screen getting it right." },
    { id: "ADR-002", title: "Money Is Never a Float", status: "Accepted", rationale: "Floating-point arithmetic drifts on money. The demo uses integer minor units, and production uses exact decimals sent as strings." },
    { id: "ADR-003", title: "Tenant from the Verified Session, Never the Request", status: "Accepted", rationale: "In production the tenant comes from the signed session, and a tenant id sent in a request body is ignored." },
    { id: "ADR-004", title: "Modular Monolith over Microservices", status: "Accepted", rationale: "One NestJS application with enforced module boundaries. Microservices and Kubernetes were considered and rejected." },
    { id: "ADR-005", title: "Append-Only, Hash-Chained Audit Log", status: "Accepted", rationale: "The app cannot edit or delete audit rows, and changing any row breaks the chain after it." },
    { id: "ADR-006", title: "Ethiopian Fiscal Periods", status: "Accepted", rationale: "Reports follow the Ethiopian fiscal year, never a January to December year." },
    { id: "ADR-007", title: "Monochrome Interface, Colour Means Status", status: "Accepted", rationale: "Colour is reserved for status, and a bureau's accent appears only on its own logo tile." },
  ],
});
