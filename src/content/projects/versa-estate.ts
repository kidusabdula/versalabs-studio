import { defineProject } from '../schema';
import { VERSA_ESTATE } from '../product-names';

// The real estate CRM (repo versalabs-crm). Launched 2026-11-12: a public landing at estate.versalabs-studio.com
// (product-sites.ts), paid plans only (no free trial, Kidus 2026-11-13), and a public demo on a fictional company
// that needs no account and resets every night. Every claim comes from the launched landing page.
// Kept off this page on purpose:
// - any client's name, and any claim to have one (there is none to name yet);
// - prices: the plans are Starter, Growth and Enterprise, and a buyer picks one and then talks to us;
// - receipts of any kind (the software records receipts and never issues them).
// Stills: captured 2026-11-13 from the public demo company "Demo Homes" at 1440x900 (phone 390x844), both at 2x.
// Every name, phone number and figure in them is the demo's made-up data, cleared by Kidus on 2026-11-13. The
// demo's banner (which offers a trial) and the dashboard's set-up checklist were hidden before each capture.
export default defineProject({
  slug: "versa-estate",
  title: VERSA_ESTATE,
  subtitle: "Sell Homes and Lease Space From One Place",
  tagline: "Real estate sales and leasing",
  summary: "A real estate CRM for developers who sell homes and lease commercial space, from the first inquiry to the last instalment and the next rent bill. Try the demo with no sign-up.",
  category: "Real Estate",
  tags: ["Real Estate", "Property Sales", "Off-Plan Sales", "Leasing", "CRM"],
  year: "2026",
  status: "Production",
  kind: "product",
  industry: ["Real Estate"],
  links: {
    live: "https://app.estate.versalabs-studio.com/demo",
  },
  scope: ["Units", "Buyers", "Collections", "Leases"],
  cover: "/images/versa-estate/screen-stacking-plan-desktop.webp",
  gallery: [
    { src: "/images/versa-estate/screen-stacking-plan-desktop.webp", alt: "Versa Estate stacking plan for the fictional Demo Homes company: a building's units floor by floor, each coloured by whether it is available, on hold, reserved, sold or leased", kind: "screen", width: 2880, height: 1800, reviewed: true },
    { src: "/images/versa-estate/screen-dashboard-desktop.webp", alt: "Versa Estate dashboard for the fictional Demo Homes company: sales, money collected, overdue instalments and units for sale, with the date in the Ethiopian calendar beside the Gregorian one", kind: "screen", width: 2880, height: 1800, reviewed: true },
    { src: "/images/versa-estate/screen-pipeline-desktop.webp", alt: "Versa Estate sales pipeline on demo data: buyers on a board from new to negotiation, each with the unit, the deal value and the next follow-up", kind: "screen", width: 2880, height: 1800, reviewed: true },
    { src: "/images/versa-estate/screen-contract-desktop.webp", alt: "Versa Estate sale contract on demo data: a payment plan split between the buyer's own contribution and a bank loan, with a verified telebirr payment", kind: "screen", width: 2880, height: 1800, reviewed: true },
    { src: "/images/versa-estate/screen-receivables-desktop.webp", alt: "Versa Estate receivables on demo data: what buyers and tenants still owe, grouped by how late it is", kind: "screen", width: 2880, height: 1800, reviewed: true },
    { src: "/images/versa-estate/screen-lease-desktop.webp", alt: "Versa Estate commercial lease on demo data: quarterly rent and service-charge bills, the deposit held, 15% VAT and a yearly increase", kind: "screen", width: 2880, height: 1800, reviewed: true },
    { src: "/images/versa-estate/screen-reports-desktop.webp", alt: "Versa Estate sales report on demo data: contracts signed by month and by building, ready to print or download", kind: "screen", width: 2880, height: 1800, reviewed: true },
    { src: "/images/versa-estate/screen-dashboard-mobile.webp", alt: "Versa Estate dashboard on a phone for the fictional Demo Homes company", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/versa-estate/screen-units-mobile.webp", alt: "Versa Estate units list on a phone: counts by status, filters, and each unit's list price in birr", kind: "screen", width: 780, height: 1688, reviewed: true },
  ],
  availability: "Available now. Open the demo with no sign-up, then pick a plan, Starter, Growth or Enterprise, and talk to us.",

  description: `${VERSA_ESTATE} is a real estate CRM for developers in Ethiopia who sell homes and lease commercial space. It runs the whole path from the first inquiry to the last instalment, and on the commercial side from the lease to the rent bill, meter readings and repairs. Each developer gets its own workspace. Try the demo on a made-up company first, then pick a plan and talk to us.`,
  need: "A developer selling homes has to know which units are free, who has been promised what, and which instalments are due and paid, while its commercial floors need leases, rent bills and repairs kept in order.",
  audience: "Property developers in Ethiopia who sell homes, often off-plan, and lease shops and offices. It has roles for sales agents and managers, finance, leasing managers, admins and owners, and viewers who can only look.",
  features: [
    { title: "See Every Unit, Sell It Only Once", image: "/images/versa-estate/screen-stacking-plan-desktop.webp", description: "A stacking plan shows every unit floor by floor, coloured by its status. A unit holds one reservation at a time, and an expired hold ends on its own." },
    { title: "Follow Every Buyer to a Signed Deal", image: "/images/versa-estate/screen-pipeline-desktop.webp", description: "A buyer pipeline with quotations, site visits on the team's agenda, and inquiries that come straight in from your web listing." },
    { title: "Payment Plans That Follow the Build", image: "/images/versa-estate/screen-contract-desktop.webp", description: "Contracts with payment plans tied to construction stages, handover and the share the buyer's bank loan pays." },
    { title: "Collections You Can Trust", image: "/images/versa-estate/screen-receivables-desktop.webp", description: "Each payment is checked against its CBE, telebirr or bank reference before it counts, and receivables age at 30, 60 and 90 days." },
    { title: "Lease and Maintain in the Same Place", image: "/images/versa-estate/screen-lease-desktop.webp", description: "Rent and service-charge bills, yearly increases, deposits, meter readings, renewals and repairs for every lease." },
    { title: "Made for Ethiopia", image: "/images/versa-estate/screen-dashboard-desktop.webp", description: "Birr and the Ethiopian calendar, warnings drawn from the 2024 residential rent law, 15% VAT by default on commercial leases, and Amharic names and notes. It works on a phone, reports print to PDF or CSV, and your units and contacts import from a spreadsheet." },
  ],
});
