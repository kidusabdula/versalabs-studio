# Redesign Handoff (feat/redesign-v2)

The working record for the 2026-10-31 redesign: new content and a new UI for the whole site. The brief is
`versalabs-workspace/briefs/2026-10-31-studio-redesign.md`. This file stands on its own after a compaction: read it
first, then `git log origin/main..feat/redesign-v2`.

## Where It Stands

| Item | State |
|---|---|
| Branch | `feat/redesign-v2` from `origin/main` `6abd792`, worktree `C:/Users/kidus/w/studio-v2` |
| PR | https://github.com/kidusabdula/versalabs-studio/pull/1 (to `main`) |
| Preview | https://versalabs-studio-git-feat-redesign-v2-versalabs-projects.vercel.app (branch alias; built by Vercel with Turbopack, protected, `noindex`) |
| Checks | all pass on the local production build, every negative control seen failing (see "Checks") |
| Review | waiting for Kidus; no merge without his OK |

## Decisions (Kidus, 2026-10-31)

- **Products first.** Home leads with the six products, then client work as proof, then services.
- **Palette kept.** Near-black and white monochrome, zinc greys, colour only for status, violet for "in development".
  Everything else (components, layout, type, spacing, motion, page structure) was the owner's call.

## Design System

Tokens live in `src/app/globals.css`, mapped to Tailwind utilities through `@theme inline`. Components use only the
semantic names, never raw hex or zinc classes. `docs/03-UI-UX-GUIDELINES.md` is the full description.

| Token | Dark (default) | Light | Used for |
|---|---|---|---|
| `background` | #0d0d0f | #ffffff | the page |
| `surface` / `surface-2` | #161618 / #1c1c1f | #f5f5f6 / #ebebed | cards, panels, frames |
| `muted` | #27272a | #d4d4d8 | frame dots |
| `foreground` | #ffffff | #0d0d0f | headings, primary button |
| `fg-2` / `fg-3` / `fg-4` | #d4d4d8 / #a1a1aa / #8e8e98 | #3f3f46 / #52525b / #5c5c64 | text steps, all AA on every surface |
| `line` / `line-2` | white 8% / 16% | ink 10% / 20% | hairlines |
| `wash` | white 4% | ink 4% | hover fill |
| `ok` / `warn` / `dev` / `err` | emerald / amber / violet / red 300-400 | the 700-800 steps | status and form errors only |
| `--logo-1/2/3` | #bfbfbf / #ffffff / #696969 | #353535 / #d9d9d9 / #000000 | the logo mark's facets |

**Kept from `6abd792`:** the dark values themselves (#0D0D0F, #161618, #1C1C1F, #27272A, #A1A1AA, white 8% hairline,
#8E8E98). **Renamed:** `surface-elevated` → `surface-2`, `muted-foreground` → `fg-3`, `border` → `line`,
`border-hover` (12%) → `line-2` (16%), the `zinc-500` override → `fg-4`. **Removed:** `glass-white`, `glass-black`,
`zinc-600`. **New:** the light theme on `[data-theme="light"]`, `fg-2`, `wash`, the status tokens, the logo tokens,
`shadow-frame`, the `light:` variant.

**ADE session, please note:** the studio's tokens changed as listed above. Anything that copies the studio's look
(names or values) should follow the new names; the dark values are unchanged.

- **Type:** two variable families, both preloaded: Outfit for headings and text, Geist Mono for labels and figures.
  Geist (sans) was dropped: a third font file put 29 KB more on the mobile critical path. Scale in
  `src/components/ui/styles.ts` (DISPLAY, H1, H2, H3, SUBTITLE, LEAD, BODY, SMALL, EYEBROW, MONO).
- **Theme:** dark by default. The switch in the header sets `data-theme` on `<html>` and keeps the choice in
  `localStorage` (`theme`); an inline script in `<head>` applies it before the first paint. The privacy page says so.
- **Components changed:** buttons (8px radius, 44px), cards (12px radius, no lift), badges (mono, tone dot),
  chips, pills, inputs, the navigation bar (active underline, phone menu), the footer (products with status, status
  key), `Plate` (a product with no screenshots), product rows and cards, the case-study template, the work index
  toolbar, the contact layout, a 404 page. `ProductBento` and `ShotPlaceholder` are gone.
- **Motion:** one entrance, a 24px rise driven by the scroll position (`.reveal`, CSS only, no fade, so no text is
  ever semi-transparent for contrast checks). Off with reduced motion and never on a page's first view. framer-motion
  and Radix Tabs are gone; the lightbox renders in a portal.
- **Logo:** an inline SVG (`src/components/layout/Logo.tsx`) traced from `public/versalabs-logo.png`, its facets
  coloured by `--logo-1/2/3` so it inverts with the theme.

## Content Rules Applied

- Product copy comes from each landing repo's `CLAIMS.md` (C-ids in comments in each product file).
- Obsidian: working name in `src/content/product-names.ts`; v5, in development, no screenshots (a plate); safe
  TIN/FS No wording; dates side by side; made-to-order work, importers and traders; industries "Made to Order" and
  "Import & Trade" (the v4.4 "Manufacturing" vocabulary entry and the v4.4 screenshots are gone).
- RentFlow: payment requests and statements only, never invoices or receipts; 1 to 20 office, commercial and
  mixed-use buildings; Telegram then email; no demo link.
- Versa Estate: name in one constant (`VERSA_ESTATE`); no client name; no receipts; no demo link.
- VersaLabs ADE: "Free during the beta" only; no roadmap; no agent-tool names.
- SafeFrame and Versa FX: kept as they were, with a tagline and scope (taken from their copy) added for the cards.
- Product sites: `src/content/product-sites.ts`, empty, with no address guessed. A filled entry adds a "Product Site"
  button; the build rejects an entry for a non-product or a non-https URL.
- OSKAZ: Media's clean cart shots (rig `6401826`) replace `mockup-06`, `mockup-08` and `screen-05`; the copy no longer
  says customers see prices (the store says the sales team confirms them). Still no live link. The ERP behind the store
  was deleted on 10-29 and the store's link to it is broken, so the story describes what we built, in the past tense:
  a store built on the company's ERP for its catalogue and orders. Nothing says it is connected now; the About
  milestone says "built on", not "connected live" (coordinator, 2026-10-31). Its status is unchanged.
- PrintOnline: the client's name is removed (open question below), and it is not featured on the home page.
- Home features OSKAZ, Pavilion360 and Live Addis (`src/content/home.ts`); the rest of the client work follows as a list.
- Unchanged from PR #5: ThreatMatrix removed, JARVIS parked, EventEye hidden, no consent or credit lines except
  SafeFrame's CC BY credit, no PII, no revenue, no client count.

## Open Questions For Kidus

Each takes the brief's conservative default until Kidus rules.

1. Client count: none shown. Say a number?
2. PrintOnline's client and Versa Estate's first client: not named. Name them?
3. Potentia and Unlock Ethiopia as VersaLabs work (the Gensys check): left as they were.
4. LiveTrack: still hidden.
5. ThreatMatrix's school, and PrintOnline as a portfolio entry: no change.
6. Product names: "Obsidian" is a working name; "Versa Estate" or "VersaLabs CRM"? One constant each.
7. OSKAZ: answered (coordinator, 2026-10-31). The store is no longer connected to an ERP, so its story is now in the
   past tense (see "Content Rules Applied").
8. Privacy page: it names Vercel as the site's host and analytics provider, which is a banned name everywhere else.
   Kept as a processor disclosure (pre-existing, also on production) and allowed by file in the term check. Keep it,
   or say "our hosting provider"?
9. Home page: PrintOnline is not featured (its client question is open). Feature it once that is settled?
10. Product sites: the map is empty. Which product gets a site link first, and at what address?

## Media Request

One line per asset: page, size, theme, content. Until each exists, the page shows a plate (no invented interface).

- `/products/obsidian-erp`: Obsidian v5 screens once v5 has them (M2 or later): 2 desktop (1440x900, 2x master
  2880x1800 for the cover) and 2 phone (780x1688), the app's default theme, sample data only, no client names.
- `/products/rentflow`: RentFlow screens when the product has them: 1 desktop (1440x900) of payment requests and 1
  phone (780x1688) of a statement, sample data only, no invoice or receipt wording on screen.
- `/products/versa-estate`: Versa Estate screens when they exist: 1 desktop (1440x900) and 1 phone (780x1688), sample
  data only, no client name or project.
- `/products/versalabs-ade`: ADE screens when they exist: 1 desktop (1440x900), no agent-tool names visible.

## Checks

Run against the local production build (`pnpm build`, then `next start`), never the preview. The scripts and the
results are outside the repo, in `C:/Users/kidus/w/studio-v2-checks/` (`tools/`, `summary-final.json`,
`summary-control.json`, `lighthouse/`, `shots/`). Every server-backed run starts its own server and stops it when it
ends, through `heavy-fifo.sh` with at least 1.5 GB free.

**Re-run after the OSKAZ fix (2026-10-31, the OSKAZ commit).** Build exit 0 (265 images). Banned terms and truths: 0
hits in 25 files (the same 1 allowed), with a new rule that no page says "connected live" and the OSKAZ story makes no
present-tense live claim; controls: the previous build failed the rule with 10 hits on 6 pages (the story, home, the
work index, About and two related cards), and a planted copy of the new story was caught 6 times. Links: 23 pages, 153
internal URLs, 0 broken; redirects: 57 cases, each one 308 hop, all 22 production sitemap URLs answer; controls:
`/pricing`, `#nowhere` and the two-hop `/studio/` caught. Build control: exit 1 at check-images (typecheck and lint
controls failed again: TS2322, `rules-of-hooks`). Browser checks weren't re-run: the change is copy only.

| Check | Result (2026-10-31, build of `2b3c68e`) | Negative control, seen failing |
|---|---|---|
| typecheck | exit 0 | a string assigned to a number: exit 2, TS2322 |
| lint | exit 0 | a hook called conditionally: exit 1, `react-hooks/rules-of-hooks` |
| build (with check-images) | exit 0, 265 listed images | a project file listing a missing image: exit 1 at check-images |
| Banned terms and truths, built HTML | 0 hits in 25 files (1 allowed: "Vercel" on `/privacy`) | planted "Supabase", "React", a client's name, "Sign Up Free", RentFlow "invoices", "receipts", "SMS", "Try the Live Demo", Obsidian "Production", "Manufacturing", "v4.4": all 11 caught |
| Internal links and #fragments | 23 pages, 153 internal URLs, 0 broken | planted `/pricing` and `#nowhere`: both caught |
| Redirects | 57 cases one 308 hop (every next.config source, the wildcard, mixed case), all 22 production sitemap URLs answer 200 | `/studio/` (two hops: slash, then redirect): caught |
| Console and failed requests | 0 in 52 runs (13 pages, 2 themes, 390 and 1440) | a planted `console.error`: caught in every run |
| Horizontal scroll | 0 in 104 runs (13 pages at 360, 375, 390, 414, 768, 1024, 1280, 1440) | a 2000px block: caught at every width |
| axe, WCAG 2.1 A and AA | 0 violations in 52 runs, both themes | planted low-contrast text and an image with no alt: `color-contrast` and `image-alt` caught in every run |
| Behaviour | one `main`, one `h1`, skip link, nav, footer, `lang` on 13 pages; theme switch flips and is remembered; reduced motion turns the reveal off | storage writes disabled: "remembered" caught; reveal forced on: caught |

Two local-only exceptions, both in the summaries: Vercel's analytics script (`/_vercel/insights/script.js`) exists only
on Vercel, so `next start` answers 404 for it (this is also why local Lighthouse Best Practices is 96, not 100); and
Chromium logs the 404 page's own document status as a console error.

## Lighthouse (Mobile, Median Of 3)

**Like for like** (local, webpack builds of both, same session; neither emits font preloads locally):

| Page | Before (`6abd792`) Perf / LCP / FCP | After Perf / LCP / FCP |
|---|---|---|
| `/` | 95 / 2842 / 1216 | 96 / 2692 / 1369 |
| `/products` | 95 / 2827 / 1213 | 97 / 2495 / 1212 |
| `/work` | 96 / 2653 / 1212 | 97 / 2408 / 1212 |
| `/products/versa-fx` | 92 / 3211 / 1363 | 95 / 2881 / 1361 |
| `/work/oskaz-ecommerce` | 94 / 3002 / 1213 | 94 / 2899 / 1364 |

Accessibility 100 and Best Practices 96 (the local analytics 404) on both, every page. LCP is lower on all five
pages (100 to 330 ms), mostly from fewer bytes before the first paint: no framer-motion chunk, no early images, and two
font files instead of three.

**The deployed build** (Turbopack, as Vercel builds it): after, local: `/` 95 / 2802 / 932, `/products` 96 / 2782 / 907,
`/work` 94 / 2978 / 778, `/products/versa-fx` 95 / 2882 / 908, `/work/oskaz-ecommerce` 95 / 2862 / 907. The base
can't be built with Turbopack on this machine (its static Outfit weights fail to resolve locally; Vercel builds it),
so its Turbopack numbers come from production, over the real network from Addis: 86 / 2550 / 2187, 90 / 2125 / 1975,
66 / 3674 / 3104, 94 / 3498 / 2966, 93 / 1711 / 1261, Accessibility and Best Practices 100. Those carry the network's
noise (one `/products/versa-fx` run never painted) and aren't comparable with the local runs. The clean after number
is PageSpeed Insights on production once this merges.

## Sitemap And Redirects

Unchanged. The built `sitemap.xml` lists the same 22 URLs as production's, and `robots.txt` is identical. No project
changed section, so the content-generated redirects are the same; every one was checked as a single 308 hop above.

Sitemap (before = after): `/`, `/about`, `/contact`, `/privacy`, `/products`, `/products/obsidian-erp`,
`/products/rentflow`, `/products/safeframe`, `/products/versa-estate`, `/products/versa-fx`, `/products/versalabs-ade`,
`/services`, `/work`, `/work/eventology`, `/work/live-addis`, `/work/minab-clothing`, `/work/oskaz-ecommerce`,
`/work/pana-sport`, `/work/pavilion-360`, `/work/printonline-et`, `/work/tamem-kitfo`,
`/work/unlock-ethiopia-potential`.

## Screenshots

52 full-page shots in `C:/Users/kidus/w/studio-v2-checks/shots/`: every top-level page (`/`, `/products`, `/work`,
`/services`, `/about`, `/contact`, `/privacy`, `/notes`) plus Obsidian, Versa FX, RentFlow, the OSKAZ story and the
404 page, each at 390 and 1440 in dark and light, taken with reduced motion so every section is in its settled place.
