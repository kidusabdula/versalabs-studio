# VersaLabs Studio

The studio site at [www.versalabs-studio.com](https://www.versalabs-studio.com): a Next.js 16 App Router site with
Tailwind CSS v4 (CSS-only motion), deployed on Vercel. Dark by default, with a light theme.

## Getting Started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Script | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Runs `scripts/check-images.mjs`, then `next build` |
| `pnpm start` | Serves the production build |
| `pnpm lint` | ESLint (`eslint.config.mjs`) |
| `pnpm typecheck` | `tsc --noEmit` |

## Where Things Live

| Path | Contents |
|---|---|
| `src/content/projects/<slug>.ts` | One file per project or product: the single source of truth for listings, case studies and the sitemap |
| `src/content/schema.ts` | The Zod schema every project file is validated against at build time |
| `src/content/projects/index.ts` | Listing order, validation (schema plus the plain-language check), and the helpers: `getAllProjects`, `getProjectBySlug`, `getProjectsInSection`, `projectPath`, `toCard` |
| `src/content/plain-language.ts` | The words public copy may not use (technology names and engineering jargon); a project that uses one fails the build |
| `src/content/services.ts` | The four services on `/` and `/services`, their example pages, and the How We Work steps |
| `src/content/labels.ts` | Status labels and tones, the status key, feature stages, availability lines, and `callToAction()`: the one button each product or client page ends with |
| `src/content/product-names.ts` | Product names still being decided (`OBSIDIAN`, `VERSA_ESTATE`), one constant each |
| `src/content/product-sites.ts` | Each product's own site, by slug: the only place those links live (empty until approved) |
| `src/content/home.ts` | The three client stories the home page features |
| `src/content/team.ts` | The team on `/about`, with a `visibility` flag per person |
| `public/images/<slug>/` | WebP mockups and screenshots, each listed in its project's `gallery` |
| `public/media/<slug>/` | Short silent screen recordings (MP4), each listed in its project's `loops` |
| `src/app/` | Routes: `/`, `/work`, `/work/[slug]`, `/products`, `/products/[slug]`, `/services`, `/about`, `/notes`, `/contact`, `/privacy`, `/api/contact`, plus `sitemap.ts` and `robots.ts` |
| `src/components/case-study/` | The page template shared by `/products/[slug]` (a product landing page) and `/work/[slug]` (a client story), and the card |
| `src/components/sections/` | The home page (hero, products, client work, services, how we work, closing call to action) and the product rows on `/products` |
| `src/components/layout/` | Navigation bar, footer, logo mark and theme switch |
| `src/components/ui/` | The design system: `styles.ts` (class strings), badges, product frames and plates, the lightbox, the reveal |
| `src/components/work/WorkIndex.tsx` | The `/work` filters (industry and search), kept in the URL |
| `src/lib/site.ts` | `SITE_URL`, `CONTACT_EMAIL` and `pageMetadata()`, which sets title, description, canonical, Open Graph and Twitter tags per page |
| `src/lib/project-page.ts` | Static params, metadata and related projects for the case-study routes |
| `src/lib/og.tsx` | The per-project Open Graph image, generated at build time by each route's `opengraph-image.tsx` |
| `src/proxy.ts` | Lowercases mixed-case `/work/*`, `/products/*` and `/projects/*` URLs with a 308 |
| `next.config.ts` | Permanent redirects, generated from the content (see below) |
| `docs/` | Content, tone and UI guidelines; `REDESIGN-HANDOFF.md` records the 2026-10-31 redesign |

How to add or change a project, and the image review rule, are in `docs/04-CONTENT-MANAGEMENT.md`.

## Sections and Redirects

A project's `section` decides its URL: `/work/<slug>` or `/products/<slug>`. It defaults to `products` for
`kind: 'product'` and `work` for everything else, and a project file can override it. `/products` lists the
products and `/work` lists client work. `/notes` is a placeholder (noindex, not in the sitemap) until notes are
published.

`next.config.ts` builds the permanent redirects from the content, so each old URL reaches its page in one hop:
`/studio` and `/projects` go to `/work`, `/blog` to `/notes`, `/projects/<slug>` and renamed slugs to the
project's current URL, and a project's URL under the other section to its own. Moving a project between
sections is a one-line change in its file, and its old links keep working. Projects taken off the site are
listed in `REMOVED`, and their old URLs (`/work/<slug>`, `/products/<slug>`, `/projects/<slug>`) go straight
to `/work`.

## Plain Language

The site sells products and services, so public copy never says how the software is built: no technology names,
no engineering jargon (the full list is in `src/content/plain-language.ts`, the rules in
`docs/05-CONTENT-TONE-GUIDE.md`). The project schema has no fields for technology or engineering detail, and the
loader checks every text field of every project against the list, so a banned word fails the build with the
project, the field and the word.

## Search and Social Metadata

- Each case study has an Open Graph image generated at build time (`opengraph-image.tsx` in each section's
  `[slug]` folder) and CreativeWork JSON-LD. The root layout adds Organization JSON-LD.
- `metrics` (outcome numbers) are empty unless each one has evidence, and the Outcomes section only appears
  when there are some.

## Contact Form

`/contact` posts to `src/app/api/contact/route.ts`, which:
- validates the input with Zod (`src/lib/contact-schema.ts`);
- answers a filled honeypot field with a success response and sends nothing;
- rate-limits each IP to 5 messages per 10 minutes, in memory, per serverless instance (best effort);
- HTML-escapes every value it puts in the email, and sends one email through SMTP with Nodemailer to `SMTP_USER`.

`/privacy` describes exactly this. When the form, analytics or hosting change, update that page in the same commit.

### Environment Variables

Create `.env.local` with:

```
SMTP_HOST=mail.versalabs-studio.com   # optional, this is the default
SMTP_PORT=465                         # optional, this is the default
SMTP_USER=contact@versalabs-studio.com
SMTP_PASS=your_smtp_password
NEXT_PUBLIC_GA_ID=                    # optional; loads Google Analytics, and /privacy then mentions it
```

## Deployment

- Vercel project `versalabs-studio`, linked to `kidusabdula/versalabs-studio`. The production branch is `main`.
- **A push to `main` deploys production.** Any other branch gets a preview deployment; previews are `noindex`.
- Add the environment variables above in the Vercel dashboard.
- Vercel Web Analytics (`@vercel/analytics`) is on in the root layout. It sets no cookies.
