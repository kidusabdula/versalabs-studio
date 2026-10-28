import { defineProject } from '../schema';

export default defineProject({
  slug: "rentflow",
  title: "RentFlow",
  subtitle: "Keep Your Office Building's Rent on Track",
  summary: "Track offices, tenants, leases, rent, invoices and utility bills in Birr, all in one place. Coming soon for office landlords in Addis Ababa.",
  category: "Real Estate",
  tags: ["Real Estate", "Property Management", "Rent Collection", "Office Rental", "Landlords"],
  year: "2026",
  status: "Coming Soon",
  kind: "product",
  industry: ["Real Estate"],
  links: {},
  heroGradient: "from-zinc-500/20 via-transparent to-neutral-500/10",
  gallery: [],
  description: "RentFlow gives office landlords in Addis Ababa one place to see occupancy, rent collected and overdue payments. Each lease shows its tenant, office, deposit, payments and utility bills, invoices print with VAT, and tenants can get SMS reminders about rent, utility bills and leases that are ending. RentFlow is coming soon; for now it is a clickable demo on sample data, where reminders are shown but not sent.",
  need: "Many landlords track offices, leases and rent in notebooks and spreadsheets. Late payments slip through, invoices take ages to prepare, and leases run out before anyone notices.",
  audience: "Landlords and building managers who rent out the offices in one building in Addis Ababa. It suits small teams that collect rent and utility payments in Birr.",
  features: [
    { title: "Your Whole Building on One Screen", description: "See occupancy, rent collected, overdue payments and leases ending soon at a glance." },
    { title: "Every Lease in One Record", description: "Each lease shows its tenant, office, deposit, payments and utility bills together." },
    { title: "Print Clean Invoices With VAT", description: "Print a tidy invoice with VAT straight from the browser." },
    { title: "Remind Tenants Before It's Late", description: "Send rent, utility and lease-ending reminders by SMS from ready-made templates; in the demo, sending is simulated." },
    { title: "Bill Utilities From Meter Readings", description: "Turn water and electricity meter readings into bills linked to each lease." },
    { title: "Made for Birr", description: "Every amount is in Birr, and tenants can pay by cash, bank transfer or mobile money." },
  ],
});
