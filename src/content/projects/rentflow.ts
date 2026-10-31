import { defineProject } from '../schema';

// RentFlow as it is being built now (versalabs-rentflow, M1). Every claim comes from the RentFlow landing page's
// CLAIMS.md (its C-ids are in the comments). Rules from the product session (versalabs-rentals-72, 2026-10-31):
// - RentFlow issues payment requests and statements and records the landlord's own receipt numbers; it never
//   prints an invoice or a receipt;
// - it covers 1 to 20 office, commercial and mixed-use buildings;
// - reminders go by Telegram, then email (SMS is undecided, so it isn't mentioned);
// - the old frozen demo is not the product and is never linked.
export default defineProject({
  slug: "rentflow",
  title: "RentFlow",
  subtitle: "Know Who Owes What, Today", // C3
  tagline: "Rent for office and commercial buildings",
  summary: "Rent management for owners and property managers of office, commercial and mixed-use buildings in Addis Ababa. In development.", // C1, C2
  category: "Property Management",
  tags: ["Real Estate", "Property Management", "Rent", "Office Buildings", "Landlords"],
  year: "2026",
  status: "Development", // C1
  kind: "product",
  industry: ["Real Estate"],
  links: {},
  gallery: [],
  scope: ["Leases", "Rent", "Utilities", "Statements"], // C4, C13
  availability: "In development, and nothing has shipped yet. Access is by request, and subscriptions are arranged by email.", // C1, C20

  description: "RentFlow is rent management for owners and property managers of office, commercial and mixed-use buildings. Bill rent and utilities, record every payment with its proof, and follow up on arrears without awkward phone calls. It is in development, and access is by request.", // C1, C2, C4, C5, C6
  need: "Landlords with a handful of buildings often keep rent in Excel, on paper or with a broker, which makes it hard to see who owes what today.", // C3, C7
  audience: "Owners and property managers running 1 to 20 office, commercial or mixed-use buildings in Addis Ababa, who keep rent in Excel, on paper or with a broker today.", // C2, C7
  features: [
    { title: "See Who Owes What", stage: "planned", description: "Every lease's balance, what's overdue, what's due soon, and which payments are waiting for you to verify." }, // C3, C8
    { title: "Every Payment, With Its Proof", stage: "planned", description: "Tenants pay you directly, by cash, bank transfer, Telebirr, CBE Birr or cheque. Record each payment with a screenshot or a photo as proof, then verify it. RentFlow never collects or holds rent." }, // C5, C10
    { title: "Payment Requests and Statements", stage: "planned", description: "Send payment requests and statements of account as PDFs in your own brand, with both calendars and the amount in words." }, // C13
    { title: "Utilities at the Official Tariff", stage: "planned", description: "Turn sub-meter readings into utility charges at the official EEU and AAWSA tariffs, recharged at cost with no markup." }, // C15
    { title: "Reminders Without the Awkward Call", stage: "planned", description: "Tenants get reminders by Telegram and email, in Amharic or English: rent due soon, rent overdue, and a lease ending in 60 and in 30 days." }, // C6
    { title: "Your Team, Your Languages", stage: "in-development", description: "Amharic and English, dates in the Ethiopian and Gregorian calendars, and roles for owners, property managers, accountants, maintenance and viewers." }, // C23, C24
  ],
});
