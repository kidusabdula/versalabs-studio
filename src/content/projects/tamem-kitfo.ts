import { defineProject } from '../schema';

export default defineProject({
  slug: "tamem-kitfo",
  title: "Tamem Kitfo",
  subtitle: "Bilingual Restaurant Website with Online Ordering",
  summary: "A restaurant website in English and Amharic. Customers browse the menu, order, book a table or ask about catering. Staff confirm each request with a tap in Telegram.",
  category: "Hospitality",
  tags: ["Restaurant", "Bilingual", "Ordering", "CMS"],
  year: "2026",
  status: "Beta",
  kind: "client",
  client: "Tamem Kitfo",
  links: {},
  heroGradient: "from-zinc-500/20 via-transparent to-neutral-500/10",
  gallery: [],
  description: "Tamem Kitfo is a full website for a kitfo restaurant in Bole, Addis Ababa. It works in English and Amharic. Customers can read the menu, order for pickup, delivery or dine-in, book a table, ask about catering and check the status of their request. Staff manage the menu, photos, text, hours and settings from a private dashboard. New orders arrive in the staff Telegram group, where a tap confirms them. The site is deployed and in beta ahead of handover to the owners.",
  businessProblem: "The restaurant needed a website it could trust and run itself. Its previous site showed details nobody had checked. Many customers browse in Amharic on slow mobile data, where heavy English-only sites fail them.",
  architecturalSolution: "A Next.js 16 App Router build with separate root layouts for the public site and the staff CMS. The public site puts the locale in the URL, with both languages prerendered; the CMS keeps the locale in a cookie. Supabase Postgres holds content in parallel English and Amharic columns, with Row Level Security keyed to a staff profiles table and is_staff() / is_owner() helpers. Public forms write through a server-only service-role client behind Zod validation, a honeypot and a vendor-free rate limiter that stores only salted hashes of IP addresses. Orders carry only dish slugs and quantities, so prices are re-read on the server and stored as line-item snapshots. A Telegram bot posts order, catering and booking cards with status buttons, and a secret-checked webhook redraws the same card in place. Every public read falls back to bundled fixtures, so the site still renders if the database is down.",
  systemFlow: "Customer (English / Amharic) → Menu → Cart → Order API (Zod + honeypot + rate limit) → Server-Side Price Lookup → Order + Line-Item Snapshots (Supabase) → Telegram Card with Buttons → Staff Taps Confirm → Webhook Updates Status and Redraws the Card → Customer Checks Status with Code + Phone",
  techStack: [
    {
      label: "Frontend",
      items: [
        { name: "Next.js", version: "16.x", purpose: "App Router, prerendered English and Amharic routes, proxy-based locale redirect" },
        { name: "React", version: "19.x", purpose: "UI components" },
        { name: "TypeScript", version: "5.9", purpose: "Strict mode; the Amharic dictionary is typed against the English one" },
        { name: "Tailwind CSS", version: "4.x", purpose: "OKLCH design tokens drawn from the logo" },
        { name: "Radix UI", purpose: "Dialog, Select, Tabs and Label primitives" },
        { name: "Motion", version: "13.x", purpose: "Scroll reveals that fall back to static content without JavaScript" },
        { name: "Fraunces + Plus Jakarta Sans + Noto Ethiopic", purpose: "Latin display and body faces, with Ethiopic faces loaded lazily" },
      ],
    },
    {
      label: "Forms & Validation",
      items: [
        { name: "React Hook Form", version: "7.x", purpose: "Order, booking, catering and contact forms" },
        { name: "Zod", version: "4.x", purpose: "Shared client and server schemas" },
      ],
    },
    {
      label: "Backend & Database",
      items: [
        { name: "Supabase (PostgreSQL)", purpose: "Content, orders and requests behind Row Level Security, with staff roles" },
        { name: "Supabase Auth", purpose: "Staff sign-in for the CMS" },
        { name: "Supabase Storage", purpose: "Dish and gallery photos, with staff-only writes" },
        { name: "Next.js Route Handlers", purpose: "Orders, catering, bookings, contact, status lookup and the Telegram webhook" },
      ],
    },
    {
      label: "Operations",
      items: [
        { name: "Telegram Bot API", purpose: "Staff alerts with inline status buttons, edited in place" },
        { name: "WhatsApp deep links", purpose: "A pre-written fallback message when a form fails on weak data" },
        { name: "sharp", purpose: "Resized masters and attention-cropped squares from the original photos" },
      ],
    },
    {
      label: "Deployment",
      items: [
        { name: "Vercel", purpose: "Hosting and CDN" },
      ],
    },
  ],
  architecture: {
    pattern: "Bilingual SSR Site + Staff CMS on Supabase, with Telegram-Driven Operations",
    diagram: "app/(site)/[lang] (public, English and Amharic prerendered) | app/(admin) (CMS, cookie locale)\n\nPublic forms → /api/* (service role, server-only) → Supabase Postgres (RLS)\nCMS → cookie-bound Supabase client → RLS checks the signed-in staff member\n\nOrder → Telegram card ⇄ /api/telegram/webhook (secret header) → status update → card redraw + CMS revalidate\n\nAll public reads → lib/data/queries.ts → Supabase, or bundled fixtures on failure",
    designPatterns: [
      "Locale-in-URL routing with typed dictionaries (a missing key is a compile error)",
      "Server-side pricing with immutable line-item snapshots",
      "Service-role writes confined to server-only paths",
      "Fail-closed webhook, fail-open rate limiter",
      "Graceful degradation to bundled fixtures",
      "Progressive enhancement: content is visible without JavaScript",
    ],
  },
  boundedContexts: [
    {
      name: "Menu & Content",
      responsibility: "Bilingual dishes, categories, gallery, editable text and site settings",
      entities: ["MenuCategory", "Dish", "GalleryImage", "SiteContent", "SiteSettings"],
    },
    {
      name: "Ordering",
      responsibility: "Cart, server-priced orders, snapshots and the status lifecycle",
      entities: ["Order", "OrderItem"],
    },
    {
      name: "Requests",
      responsibility: "Catering enquiries, table bookings, contact messages and customer status lookup",
      entities: ["CateringInquiry", "CateringInquiryItem", "TableBooking", "ContactMessage"],
    },
    {
      name: "Staff Operations",
      responsibility: "CMS access by role and Telegram status actions",
      entities: ["StaffProfile", "TelegramCard"],
    },
    {
      name: "Abuse Protection",
      responsibility: "Per-form rate limits with hashed IP addresses and honeypots",
      entities: ["SubmissionLog"],
    },
  ],
  schema: [
    {
      name: "dishes",
      description: "Bilingual menu items",
      keyFields: ["id", "category_id", "slug", "name_en", "name_am", "price_etb", "spice_level", "tags", "is_available"],
    },
    {
      name: "orders",
      description: "Customer orders with a short lookup code",
      keyFields: ["id", "code", "customer_phone", "fulfilment_type", "subtotal_etb", "status", "telegram_message_id", "locale"],
    },
    {
      name: "order_items",
      description: "Line items frozen at order time",
      keyFields: ["id", "order_id", "dish_id", "dish_name_snapshot", "unit_price_snapshot", "quantity"],
    },
    {
      name: "catering_inquiries",
      description: "Event catering requests",
      keyFields: ["id", "code", "event_type", "event_date", "guest_count", "status"],
    },
    {
      name: "table_bookings",
      description: "Table reservations",
      keyFields: ["id", "code", "party_size", "booking_at", "status"],
    },
    {
      name: "site_settings",
      description: "A single row of contact details, opening hours and the ordering switch",
      keyFields: ["id", "phones", "address_en", "address_am", "hours (JSONB)", "is_accepting_orders"],
    },
    {
      name: "staff_profiles",
      description: "Links signed-in users to a staff role",
      keyFields: ["id", "full_name", "role (owner | manager | staff)"],
    },
    {
      name: "submission_log",
      description: "Rate-limit ledger that never stores raw IP addresses",
      keyFields: ["id", "ip_hash", "kind", "created_at"],
    },
  ],
  features: [
    { title: "English and Amharic", description: "Every page works in both languages. Phones set to Amharic open the Amharic site first." },
    { title: "Online Ordering", description: "Customers order for pickup, delivery or dine-in. Prices always come from the menu, never from the browser." },
    { title: "Staff Alerts in Telegram", description: "New orders, bookings and catering requests land in the staff Telegram group, where a tap confirms them." },
    { title: "Request Tracking", description: "Customers check their order, booking or catering status with their code and phone number." },
    { title: "Easy Menu Editing", description: "Staff update dishes, prices, photos, text and opening hours from a private dashboard." },
    { title: "Built for Slow Connections", description: "Pages load without JavaScript, photos blur in, and a failed form offers a WhatsApp backup." },
    { title: "Ordering On or Off", description: "The owners can pause online orders from settings. The server enforces it too, not only the button." },
  ],
  adrs: [
    { id: "ADR-001", title: "Locale in the URL", status: "Accepted", rationale: "A client-side toggle flashes English for Amharic visitors and hides one language from search engines." },
    { id: "ADR-002", title: "Server-Side Pricing with Snapshots", status: "Accepted", rationale: "Clients post dish slugs only, and snapshots keep past totals stable when the menu changes." },
    { id: "ADR-003", title: "Telegram as the Daily Console", status: "Accepted", rationale: "Staff already live in Telegram. The CMS is kept for menu edits, settings and history." },
    { id: "ADR-004", title: "Fixture Fallback for Public Reads", status: "Accepted", rationale: "A restaurant site that cannot show its address because a database is down has failed at its main job." },
    { id: "ADR-005", title: "Vendor-Free Rate Limiting", status: "Accepted", rationale: "Salted IP hashes in Postgres avoid a third-party dependency and never store raw IP addresses." },
  ],
});
