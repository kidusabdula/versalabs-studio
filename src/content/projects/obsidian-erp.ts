import { defineProject } from '../schema';
import { OBSIDIAN } from '../product-names';

// The new Obsidian (v5), being built from scratch. The old v4.4 copy and its screenshots are gone: v4.4 ran on a
// backend that was discarded on 2026-10-29. Every claim below comes from the Obsidian landing page's CLAIMS.md
// (its C-ids are in the comments), which traces each one to the product repo. Rules from the product session
// (obsidian-v5-3d, 2026-10-31):
// - the TIN line uses the safe wording and never says Obsidian prints tax invoices;
// - dates are "side by side", never "by Ethiopian fiscal year";
// - the first client's trade isn't named, so the setups are "made-to-order work" and "importers and traders".
// No screenshots until v5 reaches M2, so the page shows the neutral product plate. The slug keeps the old URL.
export default defineProject({
  slug: "obsidian-erp",
  title: OBSIDIAN,
  subtitle: "Orders, Jobs, Stock and Money in One Place", // C2
  tagline: "Orders, jobs, stock and money",
  summary: "A business system for companies in Addis Ababa. Your team takes orders, runs jobs and records payments, and the books update with every step. In development.", // C1, C3, C4
  category: "Business System",
  tags: ["Business System", "Orders", "Stock", "Accounting", "Made to Order"],
  year: "2026",
  status: "Development", // C1
  kind: "product",
  industry: ["Made to Order", "Import & Trade"], // C5, C6; the old "Manufacturing" was v4.4
  links: {},
  gallery: [],
  scope: ["Orders", "Jobs", "Stock", "Money"], // C2
  availability: "In development and not on sale yet. When it is ready, we set up your workspace and arrange the subscription with you by email.", // C1, C33, C34

  description: `${OBSIDIAN} is a business system for companies in Addis Ababa. Your team takes orders, runs jobs and records payments, and the books update with every step, out of sight until your accountant needs them. The new ${OBSIDIAN} is being built from scratch, and it is not on sale yet.`, // C1, C3, C4
  need: "A business that makes, sells or imports goods needs to know where every order, job, item and birr stands, without asking its team to fill in accounting forms.", // C4
  audience: "Small and medium businesses in Addis Ababa that make, sell or import goods. It comes with setups for made-to-order work and for importers and traders: the made-to-order setup comes first, the importers' setup after it. You start from the setup for your kind of business and change it in settings as you grow.", // C5, C6
  features: [
    { title: "One Button for the Next Step", stage: "in-development", description: "Every order shows its stage and what comes next as one main button. When something blocks it, like a deposit that isn't paid yet, it says so in plain words and offers the step that clears it." }, // C10
    { title: "Books That Keep Themselves", stage: "in-development", description: "A deposit, a delivery or a payment updates the order, the stock and the accounts together, or not at all. A double tap or a retry still records once." }, // C11
    { title: "Set Up for How You Work", stage: "in-development", description: "Your stages, the steps between them, who may take each step, custom fields and document numbering are settings. Each person holds the roles they need." }, // C14, C15, C16
    { title: "Easy on a Phone, Fast on a Desktop", stage: "in-development", description: "On a phone, each order is one screen with one main action and big buttons. On a desktop you get full tables and boards." }, // C17
    { title: "Local From Day One", stage: "in-development", description: "Amharic and English, Ethiopian and Gregorian dates side by side, 15% VAT, amounts written out in words, and cash, CBE transfer, Telebirr, cheque and Chapa, each in its own account." }, // C24-C28
    { title: "Your TIN and FS No", stage: "planned", description: "Your TIN on your invoices and receipts, and the FS No from your fiscal machine recorded with each sale." }, // C29
  ],
});
