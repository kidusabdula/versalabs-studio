import { defineProject } from '../schema';
import { VERSA_ESTATE } from '../product-names';

// The real estate CRM (repo versalabs-crm). Its name is pending (src/content/product-names.ts). Every claim comes
// from the product's landing page CLAIMS.md, which traces each one to the product repo. Kept off this page on
// purpose (Kidus's call, 2026-10-31 brief):
// - the first client's name;
// - receipts of any kind (the business rule: the software records receipts and never issues them);
// - a public demo link (the demo signs in with seed accounts).
export default defineProject({
  slug: "versa-estate",
  title: VERSA_ESTATE,
  subtitle: "Sell Homes and Lease Space From One Place",
  tagline: "Real estate sales and leasing",
  summary: "A real estate CRM for developers who sell off-plan and lease commercial space, from the first inquiry to the last instalment. Coming soon.",
  category: "Real Estate",
  tags: ["Real Estate", "Property Sales", "Off-Plan Sales", "Leasing", "CRM"],
  year: "2026",
  status: "Coming Soon",
  kind: "product",
  industry: ["Real Estate"],
  links: {},
  gallery: [],
  scope: ["Units", "Buyers", "Instalments", "Leases"],
  availability: "Coming soon. There's no online sign-up: we set up each workspace, and subscriptions are arranged by email.",

  description: `${VERSA_ESTATE} is a real estate CRM for developers who sell off-plan and lease commercial space. It runs the whole path from the first inquiry to the last instalment, and on the commercial side from the lease to the monthly rent bill, meter readings and maintenance.`,
  need: "A developer selling off-plan has to know which units are free, who has been promised what, and which instalments are due, while its commercial floors need leases, rent bills and repairs kept in order.",
  audience: "Property developers in Addis Ababa who sell homes off-plan and lease commercial space. It has roles for sales agents and managers, finance, leasing managers, admins and owners, and viewers who can only look.",
  features: [
    { title: "See Every Unit, Sell It Only Once", description: "Projects, buildings and units on a floor-by-floor stacking plan. A unit holds one active reservation at a time, and an expired hold ends on its own." },
    { title: "Follow Every Buyer to a Signed Deal", description: "Sales and leasing pipelines on a drag-and-drop board, site visits on the team's agenda, and a reason recorded for every lost deal." },
    { title: "Payment Plans That Follow the Build", description: "Instalments fall due on signing, on a construction milestone, at handover or when the buyer's bank loan pays out." },
    { title: "Payments Recorded, Then Verified", description: "Agents record payments as pending, finance checks each one against the bank or wallet reference, and verified money pays the earliest open lines first." },
    { title: "Lease and Maintain in the Same Place", description: "Each lease bills rent and service charge every period, meter readings are billed at the tariff, and repair requests are tracked with who pays for them." },
    { title: "Reports Ready to Print", description: "Sales, collections, forecast, inventory, team and lead-source reports, each ready to print or open in Excel." },
  ],
});
