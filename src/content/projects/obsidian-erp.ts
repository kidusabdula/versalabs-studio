import { defineProject } from '../schema';

// Version 4.4 (tag v4.4.0, 2026-09-20). The slug was obsidian-erp-v3.0 until
// Phase B; next.config.ts redirects the old URL. The first client is not named
// here until Kidus confirms it may be.
//
// Images: only the shots cleared on 2026-10-28 (checked by OCR and by eye: no
// names, no client, no framework, no developer badge). Every straight desktop
// capture shows a name, so the page leads with phone screens until the v5
// screenshots exist. The phone screens are cropped to the 9:19.5 phone outline,
// which also takes off a developer tool's floating badge at the bottom right.
export default defineProject({
  slug: "obsidian-erp",
  title: "Obsidian ERP",
  subtitle: "Run Your Whole Business From One Place",
  summary: "Sales, buying, stock, production and accounts in one system. One-click steps cut the busywork, so nothing falls through the cracks.",
  category: "ERP",
  tags: ["ERP", "Business Management", "Inventory", "Manufacturing", "Accounting"],
  year: "2026",
  status: "Production",
  kind: "product",
  industry: ["Manufacturing"],
  links: {},
  heroGradient: "from-violet-500/20 via-transparent to-indigo-500/10",
  cover: "/images/obsidian-erp/screen-11.webp",
  gallery: [
    { src: "/images/obsidian-erp/mockup-03.webp", alt: "Obsidian ERP printing operation profile with cost estimate in an angled browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/obsidian-erp/mockup-04.webp", alt: "Obsidian ERP recent sales orders list, close-up on a phone screen", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/obsidian-erp/mockup-06.webp", alt: "Obsidian ERP chart of accounts hierarchy in an angled browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/obsidian-erp/mockup-15.webp", alt: "Obsidian ERP chart of accounts summary counts, close-up on a phone", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/obsidian-erp/mockup-16.webp", alt: "Obsidian ERP HR departments list in a steeply angled browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/obsidian-erp/screen-11.webp", alt: "Obsidian ERP stock entries list with material transfer cards, mobile view", kind: "screen", width: 822, height: 1780, reviewed: true },
    { src: "/images/obsidian-erp/screen-02.webp", alt: "Obsidian ERP chart of accounts with accounts grouped in a tree, mobile view", kind: "screen", width: 822, height: 1780, reviewed: true },
    { src: "/images/obsidian-erp/screen-12.webp", alt: "Obsidian ERP workstation detail with machine identity and cost rates, mobile view", kind: "screen", width: 822, height: 1780, reviewed: true },
    { src: "/images/obsidian-erp/screen-10.webp", alt: "Obsidian ERP delivery note with delivered items and customer details, mobile view", kind: "screen", width: 822, height: 1780, reviewed: true },
    { src: "/images/obsidian-erp/screen-01.webp", alt: "Obsidian ERP summary cards for customers, sales and stock, mobile view", kind: "screen", width: 822, height: 1780, reviewed: true },
  ],

  description: "Obsidian takes you from quote to order, production, delivery, invoice and payment, and updates your buying, stock and accounts at every step. Every document shows where it came from and what to do next, and a guided setup gets a new company running. We first built it in 2025 for a client's business, and it became our own product in 2026.",
  need: "Many growing companies run sales, stock, production and accounts in separate spreadsheets and tools. Prices go wrong, stock runs out, and invoices go out late.",
  audience: "Growing companies, manufacturers especially, that have outgrown spreadsheets. It suits teams that quote, sell, buy, make and deliver goods and want one record of all of it.",
  features: [
    { title: "Go From Quote to Cash in a Few Clicks", description: "Turn a quote into an order, then deliver, invoice and record the payment with one click each." },
    { title: "See Every Step of a Deal", description: "Every document shows where it came from and what comes next, so nothing gets lost." },
    { title: "Run Production Without the Paperwork", description: "Start and finish jobs in one click, and your stock and job cards update for you." },
    { title: "Order What You're Short Of", description: "Spot missing stock and raise purchase orders to each item's usual supplier." },
    { title: "Know Your Numbers at a Glance", description: "See profit and loss, the balance sheet, money owed, sales and stock in one place." },
    { title: "Give Everyone the Right Access", description: "Each person sees and does only what their role allows." },
  ],
});
