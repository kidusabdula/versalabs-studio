import { defineProject } from '../schema';

export default defineProject({
  slug: "versa-estate",
  title: "Versa Estate",
  subtitle: "Real Estate CRM for Developers and Property Managers",
  summary: "Sell apartments and lease shops from one platform. Track every unit, lead, contract, instalment and rent payment, from the first call to the final receipt.",
  category: "Real Estate",
  tags: ["Real Estate", "CRM", "SaaS", "Multi-Tenant"],
  year: "2026",
  status: "Development",
  kind: "product",
  links: {},
  heroGradient: "from-zinc-500/20 via-transparent to-neutral-500/10",
  gallery: [],
  description: "Versa Estate is a CRM for Addis Ababa developers who sell homes off-plan and lease commercial space. Sales teams manage units, leads, site visits, quotations and reservations. Signed contracts get payment schedules tied to construction milestones, bank loans or handover. Finance verifies every payment and prints receipts with the Ethiopian date and the amount in words. The leasing side bills rent, service charges and utilities, and tracks maintenance. Each client gets its own branded workspace, and the first one is set up for German Mall Residence. The product is in active development, with a hosted demo for that first client.",
  businessProblem: "Developers in Addis often track units, buyers and instalments across spreadsheets, chat threads and paper receipts. The same unit can be promised to more than one buyer, instalments slip, and owners cannot see what is sold, owed or overdue.",
  architecturalSolution: "A multi-tenant Next.js 16 app on Supabase where Postgres enforces the business rules. Every status change for units, reservations, contracts, leases and payments runs through security-definer functions, and guard triggers reject direct edits, so a UI bug cannot sell a unit twice. Row Level Security and composite organization_id foreign keys isolate each client's data. Payment schedules, lease billing periods, VAT and payment allocation are computed in SQL and covered by pgTAP tests. A brand hue and chroma per client re-theme the whole OKLCH palette.",
  systemFlow: "Unit Inventory → Lead (Kanban) → Site Visit → Quotation → Reservation (fee, hold) → Sales Contract → Payment Schedule → Payment → Finance Verification → Receipt → Receivables & Reports | Lease → Rent and Utility Billing → Maintenance",
  techStack: [
    {
      label: "Frontend Framework",
      items: [
        { name: "Next.js", version: "16.4.0", purpose: "App Router with Turbopack, per-organisation routes and a session proxy" },
        { name: "React", version: "19.3.0", purpose: "Concurrent rendering" },
        { name: "TypeScript", version: "5.x", purpose: "Strict mode across the app" },
      ],
    },
    {
      label: "Backend & Database",
      items: [
        { name: "Supabase", purpose: "Postgres, invite-only Auth, Storage and Realtime notifications" },
        { name: "PostgreSQL", purpose: "Business rules in functions, guard triggers, RLS and composite foreign keys" },
        { name: "pg_cron", purpose: "Scheduled reservation expiry, lease lifecycle, quote expiry and the overdue digest" },
      ],
    },
    {
      label: "State Management & Data",
      items: [
        { name: "TanStack Query", version: "5.104.x", purpose: "Entity factory hooks with list state synced to the URL" },
        { name: "TanStack Table", version: "8.21.x", purpose: "Sortable, filterable data tables" },
        { name: "Zod", version: "4.6.x", purpose: "Validation at every API boundary" },
        { name: "React Hook Form", version: "7.90.x", purpose: "Forms with Zod resolvers" },
      ],
    },
    {
      label: "UI & Styling",
      items: [
        { name: "Tailwind CSS", version: "4.x", purpose: "OKLCH semantic tokens, light and dark" },
        { name: "shadcn/ui + Radix", purpose: "Accessible primitives restyled with brand tokens" },
        { name: "dnd-kit", purpose: "Drag-and-drop sales and leasing pipelines" },
        { name: "cmdk", purpose: "Command palette" },
        { name: "Recharts", version: "3.8.x", purpose: "Dashboard and report charts" },
        { name: "Framer Motion", purpose: "Transitions" },
      ],
    },
    {
      label: "Local Market",
      items: [
        { name: "libphonenumber-js", purpose: "International phone numbers for local and diaspora contacts, with call and WhatsApp links" },
        { name: "Ethiopian calendar (in-house)", purpose: "Ethiopian dates beside Gregorian ones on receipts and schedules" },
        { name: "Amount in words (in-house)", purpose: "Amounts written out in words on receipts" },
      ],
    },
    {
      label: "Testing & Quality",
      items: [
        { name: "pgTAP", purpose: "Database checks for RLS, workflows, billing and reports" },
        { name: "Vitest", version: "5.x", purpose: "Unit tests for pure functions" },
        { name: "Playwright", version: "1.64.x", purpose: "End-to-end specs against the real local stack" },
      ],
    },
  ],
  architecture: {
    pattern: "Multi-Tenant SaaS with Database-Enforced Workflows",
    diagram: "Browser (TanStack Query factory hooks) → PostgREST → RLS policies → tables\nWorkflows (reserve, activate, verify, bill) → RPC → security-definer functions → guarded tables\nNext.js server: session refresh proxy, member invite API (service role, Zod, rate limit)\nRealtime: notification bell\npg_cron: expiries, lease lifecycle, overdue digest",
    designPatterns: [
      "Invariants in Postgres (security-definer functions + guard triggers)",
      "Row Level Security generated from one policy factory",
      "Composite organization_id foreign keys for tenant isolation",
      "Derived state (overdue is computed, never stored)",
      "Golden-template module (Units) copied by every feature",
      "Feature isolation (no imports across features; composition happens in routes)",
      "White-label theming from a brand hue and chroma (OKLCH)",
    ],
  },
  boundedContexts: [
    {
      name: "Inventory",
      responsibility: "Projects, buildings, units, unit types, price per square metre, stacking plan and milestones",
      entities: ["Project", "Building", "Unit", "UnitType", "ConstructionMilestone"],
    },
    {
      name: "CRM",
      responsibility: "Contacts, sales and leasing pipelines, activities and the site-visit agenda",
      entities: ["Contact", "Lead", "PipelineStage", "Activity", "LostReason"],
    },
    {
      name: "Sales Desk",
      responsibility: "Quotations, reservations, sales contracts, co-buyers and bank loans",
      entities: ["Quotation", "Reservation", "SalesContract", "ContractParty", "PaymentPlan"],
    },
    {
      name: "Finance",
      responsibility: "Payment schedules, receivables, payments, verification, allocation and credit",
      entities: ["Receivable", "Payment", "PaymentAllocation"],
    },
    {
      name: "Leasing",
      responsibility: "Leases, rent and service-charge billing, renewals, deposits and meter readings",
      entities: ["Lease", "UtilityTariff", "MeterReading"],
    },
    {
      name: "Maintenance",
      responsibility: "Repair requests, triage, assignment and recharges",
      entities: ["MaintenanceRequest"],
    },
    {
      name: "Workspace",
      responsibility: "Organisations, members and roles, branding, settings and the audit log",
      entities: ["Organization", "Membership", "Profile", "ActivityLog"],
    },
  ],
  schema: [
    {
      name: "organizations",
      description: "Client workspaces with branding and sales rules",
      keyFields: ["id", "slug", "name", "brand_hue", "brand_chroma", "reservation_fee", "reservation_hold_days", "default_vat_rate"],
    },
    {
      name: "units",
      description: "Apartments, shops and offices for sale or lease",
      keyFields: ["id", "organization_id", "project_id", "building_id", "code", "floor", "net_area", "price_per_sqm", "list_price", "monthly_rent", "status"],
    },
    {
      name: "leads",
      description: "Sales and leasing opportunities on a kanban pipeline",
      keyFields: ["id", "organization_id", "contact_id", "pipeline", "stage_id", "owner_id", "expected_value", "source", "financing"],
    },
    {
      name: "reservations",
      description: "Time-limited holds with a fee credited to the down payment",
      keyFields: ["id", "organization_id", "unit_id", "contact_id", "fee_amount", "expires_at", "status"],
    },
    {
      name: "sales_contracts",
      description: "Signed sales with plan discounts, co-buyers and bank loans",
      keyFields: ["id", "organization_id", "unit_id", "contact_id", "payment_plan_id", "final_price", "financing", "loan_status", "status"],
    },
    {
      name: "receivables",
      description: "Scheduled and billed lines for contracts, leases and fees",
      keyFields: ["id", "organization_id", "kind", "due_date", "amount", "vat_amount", "paid_amount", "status"],
    },
    {
      name: "payments",
      description: "Money received, verified by finance and allocated to the earliest due line first",
      keyFields: ["id", "organization_id", "amount", "method", "reference", "received_on", "status", "verified_by"],
    },
    {
      name: "leases",
      description: "Commercial and residential leases with a billing cycle and escalation",
      keyFields: ["id", "organization_id", "unit_id", "tenant_id", "start_date", "end_date", "monthly_rent", "billing_cycle", "deposit_amount", "status"],
    },
    {
      name: "maintenance_requests",
      description: "Repair requests with triage, payer and recharge",
      keyFields: ["id", "organization_id", "unit_id", "priority", "assigned_to", "charge_to", "status"],
    },
  ],
  features: [
    { title: "Stacking Plan", description: "See every floor and unit at a glance: available, held, reserved, sold or leased." },
    { title: "Sales Pipeline", description: "Drag leads from first call to site visit to signed deal, with follow-ups and won or lost reasons." },
    { title: "No Double Sales", description: "A unit can be reserved by only one buyer at a time. The database itself blocks the second reservation." },
    { title: "Construction-Linked Instalments", description: "Payment plans fall due on signing, at building milestones, on handover or when the bank loan pays out." },
    { title: "Verified Receipts", description: "Finance checks each payment, then prints a receipt with the Ethiopian date and the amount in words." },
    { title: "Leasing and Maintenance", description: "Bill rent, service charges and metered utilities on schedule, and track every repair to the tenant or the owner." },
    { title: "Your Brand, Your Workspace", description: "Each client gets its own workspace in its own colours and logo, with roles from agent to owner." },
    { title: "Reports and Exports", description: "Sales, collections, forecast, inventory, team and lead-source reports, with Excel-ready CSV export and print." },
  ],
  adrs: [
    { id: "ADR-001", title: "Multi-Tenant from the Start", status: "Accepted", rationale: "Versa Estate is a product: the first client is one organisation row, and the next client is another." },
    { id: "ADR-002", title: "Supabase as the Backend", status: "Accepted", rationale: "Managed Postgres, Auth and Storage now; plain Postgres keeps a self-hosted path open for local data-residency rules." },
    { id: "ADR-003", title: "Invariants Live in Postgres", status: "Accepted", rationale: "Workflow functions and guard triggers make illegal states impossible, whichever client writes." },
    { id: "ADR-004", title: "Composite Tenant Foreign Keys", status: "Accepted", rationale: "Foreign-key checks bypass RLS, so keys that include organization_id stop cross-tenant references." },
    { id: "ADR-005", title: "Invite-Only Auth", status: "Accepted", rationale: "Sign-up is disabled, and RLS uses auth.uid(), so the database enforces isolation." },
    { id: "ADR-006", title: "Addis Business Time Zone", status: "Accepted", rationale: "Overdue status and ageing turn over at Addis midnight, and diaspora agents book visits in Addis time." },
  ],
});
