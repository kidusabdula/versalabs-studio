import { defineProject } from '../schema';

// Stills: Media's captures of the live demo. The exchange counter, rates,
// compliance, both customer records and the transactions list are from
// production 85b4783 (rig edf7de6), where every rate and record carries a
// "Sample rates" or "Sample data" badge and every flagged person is a
// fictional "<First> Example". The rest are from a22d4fb. Captions say sample
// data, never live rates or a real person. The desktop loop filmed on 683aab6
// was withdrawn on 2026-10-28 (a compliance hold beside a real-looking name):
// do not bring it back until Media re-films it from 85b4783 or later.
export default defineProject({
  slug: "versa-fx",
  title: "Versa FX",
  subtitle: "Run Your Forex Bureau From One Screen",
  summary: "The teller counter, rates, branch cash, compliance and reports for a licensed forex bureau, in one place. In development, with a live demo on sample data.",
  category: "Fintech",
  tags: ["Forex Bureau", "Foreign Exchange", "Compliance", "Branch Management", "Fintech"],
  year: "2026",
  status: "Development",
  kind: "product",
  industry: ["Finance"],
  links: {
    live: "https://versa-fx.vercel.app",
  },
  heroGradient: "from-zinc-500/20 via-transparent to-neutral-500/10",
  cover: "/images/versa-fx/screen-dashboard-kestrel-desktop.webp",
  gallery: [
    { src: "/images/versa-fx/screen-dashboard-kestrel-desktop.webp", alt: "Versa FX dashboard for the fictional Kestrel FX bureau: 30-day volume, commission, transactions, cash held and currency mix", kind: "screen", width: 2880, height: 1800, reviewed: true },
    { src: "/images/versa-fx/screen-exchange-desktop.webp", alt: "Versa FX exchange counter on sample rates: a teller's quote for 500 US dollars with the commission, the notes to count out, and a customer check required before the deal can go through", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-rates-desktop.webp", alt: "Versa FX exchange rates on sample rates, not live market rates: a new rate sheet waiting for a second person's approval beside the one in use", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-users-desktop.webp", alt: "Versa FX users and roles for the fictional Kestrel FX bureau: each person's role, branch and last sign-in", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-compliance-desktop.webp", alt: "Versa FX compliance alerts on sample data: open alerts by severity and type, reports filed and screening coverage, all about fictional customers", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-workspace-desktop.webp", alt: "Versa FX workspace settings: a bureau's name, logo mark, accent colour, traded currencies and modules", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-settings-desktop.webp", alt: "Versa FX settings: the interface language (English or Amharic), today in the Ethiopian and Gregorian calendars, and the Ethiopian fiscal year", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-customer-screened-desktop.webp", alt: "Versa FX record for a fictional customer on sample data, flagged by screening as a politically exposed person, with the alert raised against them", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-transactions-desktop.webp", alt: "Versa FX transactions list on sample data: search, filters, rates, branches and statuses, with one deal held for a compliance check", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-cash-desktop.webp", alt: "Versa FX cash and vault: the currencies held at a branch, a transfer between vaults waiting for a second person's approval, and the last vault count", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-customer-desktop.webp", alt: "Versa FX record for a fictional customer on sample data: verified ID, documents and risk score", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-audit-desktop.webp", alt: "Versa FX audit trail: a permanent record of every sign-in, settings change and transaction, with filters, on demo data", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-reports-desktop.webp", alt: "Versa FX reports for the fictional Acacia Exchange bureau: volume and commission over 30 days on the Ethiopian fiscal year", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-dashboard-light-desktop.webp", alt: "Versa FX dashboard in the light theme", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-dashboard-amharic-desktop.webp", alt: "Versa FX dashboard with the side menu switched to Amharic; the page content stays in English", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-dashboard-acacia-desktop.webp", alt: "Versa FX dashboard for a second fictional bureau, Acacia Exchange, with its own figures and currencies", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-login-desktop.webp", alt: "Versa FX sign-in page: choose one of three fictional demo bureaus, then a role", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/versa-fx/screen-dashboard-kestrel-mobile.webp", alt: "Versa FX dashboard figures for the Kestrel FX demo bureau on a phone", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/versa-fx/screen-exchange-mobile.webp", alt: "Versa FX exchange counter on a phone: a 500 US dollar quote on sample rates", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/versa-fx/screen-transactions-mobile.webp", alt: "Versa FX transactions list and filters on a phone, on sample data", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/versa-fx/screen-cash-mobile.webp", alt: "Versa FX cash and vault figures on a phone", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/versa-fx/screen-customer-mobile.webp", alt: "Versa FX record for a fictional customer on a phone, on sample data", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/versa-fx/screen-audit-mobile.webp", alt: "Versa FX audit trail on a phone", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/versa-fx/screen-workspace-mobile.webp", alt: "Versa FX workspace branding settings on a phone", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/versa-fx/screen-login-mobile.webp", alt: "Versa FX sign-in page with the three demo bureaus on a phone", kind: "screen", width: 780, height: 1688, reviewed: true },
  ],
  loops: [
    {
      src: "/media/versa-fx/loop-tenants-desktop-960.mp4",
      poster: "/images/versa-fx/screen-dashboard-acacia-desktop.webp",
      caption: "One platform, several bureaus: signing in to Acacia Exchange, signing out, signing in to Lumen Currency House, then switching the interface to Amharic. Every bureau, person and figure is fictional demo data.",
      view: "desktop",
      width: 960,
      height: 600,
      reviewed: true,
    },
    {
      src: "/media/versa-fx/loop-mobile.mp4",
      poster: "/images/versa-fx/screen-login-mobile.webp",
      caption: "The demo on a phone: choosing the Kestrel FX bureau and a role, then the dashboard.",
      view: "mobile",
      width: 780,
      height: 1688,
      reviewed: true,
    },
  ],
  description: "Versa FX gives a licensed forex bureau one place to run the teller counter, approve rates, track branch cash, check customers and prepare reports for inspection. Several bureaus each get their own branded workspace on one platform, with their own currencies, branches and data. It is in development: you can try a live demo with fictional bureaus and sample data, and the version for real bureaus is planned.",
  need: "A licensed bureau has to serve customers fast at the counter and still pass the regulator's inspection. Every rate change, cash movement and customer check must be controlled and traceable, at every branch.",
  audience: "Licensed foreign exchange bureaus, from a single counter to several branches. It is made for owners, branch managers, tellers and compliance officers who need control without slowing the counter down.",
  features: [
    { title: "Your Own Branded Workspace", image: "/images/versa-fx/screen-workspace-desktop.webp", description: "Each bureau sets its own name, logo, currencies and branches, keeps its data to itself, and every change is recorded." },
    { title: "Serve Customers Fast at the Counter", image: "/images/versa-fx/screen-exchange-desktop.webp", description: "Quote from the approved rate sheet, count out the right notes and print a receipt, and the counter blocks any deal that fails a customer check." },
    { title: "No Rate Goes Live Unchecked", image: "/images/versa-fx/screen-rates-desktop.webp", description: "One person proposes a rate sheet and another approves it, and nobody can approve their own." },
    { title: "The Right Screen for Every Role", image: "/images/versa-fx/screen-users-desktop.webp", description: "Cashiers, compliance officers and executives each see their own menu and actions." },
    { title: "Stay Ready for Inspection", image: "/images/versa-fx/screen-compliance-desktop.webp", description: "Customer checks, compliance alerts and a record of every change sit in one place, ready to show the regulator." },
    { title: "Amharic and the Ethiopian Calendar", image: "/images/versa-fx/screen-settings-desktop.webp", description: "Switch the screens to Amharic, see every date in the Ethiopian calendar first, and get reports on the Ethiopian fiscal year." },
  ],
});
