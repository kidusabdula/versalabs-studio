import { defineProject } from '../schema';

export default defineProject({
  slug: "rentflow",
  title: "RentFlow",
  subtitle: "Rental Management for Addis Office Buildings",
  summary: "A clickable demo of a rental desk for office landlords in Addis Ababa. Track offices, tenants, leases, rent, invoices and utility bills in Birr, all in one place.",
  category: "Real Estate",
  tags: ["Real Estate", "Property Management", "Lab"],
  year: "2026",
  status: "Development",
  kind: "product",
  links: {},
  heroGradient: "from-zinc-500/20 via-transparent to-neutral-500/10",
  gallery: [],
  description: "RentFlow is a front-end demo of a rental desk for a single office building in Addis Ababa. It runs in the browser on generated demo data, with no backend yet. Landlords see occupancy, rent collected and overdue payments on one dashboard. Each lease shows its tenant, office, deposit, payments and utility bills. Invoices print with VAT, and tenants can get SMS reminders for rent, utilities and lease expiry; in the demo, delivery is simulated. Every amount is in Ethiopian Birr.",
  businessProblem: "Many Addis landlords track offices, leases and rent in notebooks and spreadsheets. Late payments slip through, invoices take a long time to prepare, and leases run out before anyone notices.",
  architecturalSolution: "A schema-first Next.js 16 front end where Zod schemas define every entity. A generic createRepository<T> factory stores data in localStorage behind an async, API-shaped interface with simulated latency, so a real backend can replace it without touching the UI. TanStack Query factory hooks and a query-key factory drive every screen. A deterministic seeded generator builds a realistic history of payments, invoices, maintenance, utility bills and SMS logs.",
  systemFlow: "Login (demo) → Dashboard → Offices / Tenants → Lease → Rent Payments + Utility Bills → Invoice (print) → SMS Reminder → Reports",
  techStack: [
    {
      label: "Frontend Framework",
      items: [
        { name: "Next.js", version: "16.2.x", purpose: "App Router with route groups for auth and the dashboard" },
        { name: "React", version: "19.2.x", purpose: "Component-based UI" },
        { name: "TypeScript", version: "5.7.x", purpose: "Strict type checking" },
      ],
    },
    {
      label: "State Management & Data",
      items: [
        { name: "TanStack Query", version: "5.62.x", purpose: "Server-state caching over the mock repository" },
        { name: "Zod", version: "3.24.x", purpose: "Schemas as the single source of truth for every entity" },
        { name: "React Hook Form", version: "7.54.x", purpose: "Forms with Zod resolvers" },
        { name: "localStorage", purpose: "Mock persistence behind a swappable repository factory" },
      ],
    },
    {
      label: "UI & Styling",
      items: [
        { name: "Tailwind CSS", version: "4.x", purpose: "Utility CSS with OKLCH design tokens" },
        { name: "Radix UI", purpose: "Accessible dialogs, selects, tabs, menus and tooltips" },
        { name: "Framer Motion", version: "11.x", purpose: "Page and card transitions" },
        { name: "Recharts", version: "2.15.x", purpose: "Revenue, occupancy and payment-mix charts" },
        { name: "Lucide React", purpose: "Iconography" },
        { name: "Sonner", purpose: "Toast notifications" },
      ],
    },
  ],
  architecture: {
    pattern: "Schema-First Front End with a Swappable Mock Repository",
    diagram: "Zod Schemas (every entity) → createRepository<T> (localStorage + simulated latency) → Factory Hooks (useX / useXDetail / useCreateX …) → Query Key Factory → Feature Pages (App Router)",
    designPatterns: [
      "Schema-First Development (Zod as the source of truth)",
      "Repository Factory with an API-shaped async surface",
      "Factory Hooks per entity",
      "Query Key Factory",
      "Deterministic seeded generator for demo data",
      "Centralised UI copy, ready for Amharic",
    ],
  },
  boundedContexts: [
    {
      name: "Property",
      responsibility: "The building, its floors and offices, with status and monthly rate",
      entities: ["Building", "Floor", "Office"],
    },
    {
      name: "Leasing",
      responsibility: "Tenants, lease terms, deposits and expiry tracking",
      entities: ["Tenant", "Lease"],
    },
    {
      name: "Billing",
      responsibility: "Rent payments, invoices with VAT, and utility bills",
      entities: ["Payment", "Invoice", "UtilityBill"],
    },
    {
      name: "Operations",
      responsibility: "Maintenance requests, notifications and SMS reminders",
      entities: ["MaintenanceRequest", "Notification", "SmsMessage"],
    },
    {
      name: "Settings",
      responsibility: "Organisation profile, VAT rate and demo reset",
      entities: ["OrgSettings"],
    },
  ],
  schema: [
    {
      name: "offices",
      description: "Rentable office units per floor",
      keyFields: ["id", "buildingId", "floorId", "number", "area", "monthlyRate", "status"],
    },
    {
      name: "tenants",
      description: "People and companies leasing space",
      keyFields: ["id", "fullName", "company", "phone", "email", "status"],
    },
    {
      name: "leases",
      description: "Lease terms linking a tenant to an office",
      keyFields: ["id", "tenantId", "officeId", "startDate", "endDate", "monthlyRent", "depositAmount", "status"],
    },
    {
      name: "payments",
      description: "Rent payments by cash, bank transfer or mobile money",
      keyFields: ["id", "leaseId", "periodMonth", "amount", "dueDate", "paidDate", "method", "status", "reference"],
    },
    {
      name: "invoices",
      description: "Printable invoices with line items and VAT",
      keyFields: ["id", "invoiceNumber", "tenantId", "leaseId", "lineItems", "subtotal", "vat", "total", "status"],
    },
    {
      name: "utility_bills",
      description: "Water and electricity bills from meter readings",
      keyFields: ["id", "leaseId", "type", "periodMonth", "meterPrev", "meterCurr", "amount", "status"],
    },
    {
      name: "sms_messages",
      description: "Reminder messages with a simulated delivery status",
      keyFields: ["id", "tenantId", "recipientName", "phone", "context", "body", "status", "deliveredAt"],
    },
  ],
  features: [
    { title: "Building Dashboard", description: "See occupancy, rent collected, overdue payments and leases ending soon on one screen." },
    { title: "Lease Tracking", description: "Every lease shows its tenant, office, deposit, payments and utility bills together." },
    { title: "Printable Invoices", description: "Print a clean invoice with service charges and VAT straight from the browser." },
    { title: "SMS Reminders", description: "Send rent, utility and lease-expiry reminders from ready-made templates. In the demo, delivery is simulated." },
    { title: "Utility Billing", description: "Turn water and electricity meter readings into bills linked to each lease." },
    { title: "Birr First", description: "Every amount is in ETB, with cash, bank transfer and mobile money payments." },
  ],
  adrs: [
    { id: "ADR-001", title: "Front End First on a Mock Repository", status: "Accepted", rationale: "A full clickable demo comes first. The repository's async API surface lets a real backend replace localStorage later." },
    { id: "ADR-002", title: "Zod Schemas as the Source of Truth", status: "Accepted", rationale: "One definition drives types, forms and validation for every entity." },
    { id: "ADR-003", title: "Single-Building Model (v2)", status: "Accepted", rationale: "Fits a landlord who runs one building with many offices, and keeps the demo focused." },
    { id: "ADR-004", title: "All Copy in One File", status: "Accepted", rationale: "Keeps strings out of components so Amharic can be added later." },
  ],
});
