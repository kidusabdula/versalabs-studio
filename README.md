# VersaLabs Studio

The studio site at [www.versalabs-studio.com](https://www.versalabs-studio.com): a Next.js 16 App Router site with
Tailwind CSS v4 and Framer Motion, deployed on Vercel.

## Getting Started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Script | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Runs `scripts/check-images.mjs` and `scripts/check-diagrams.mjs`, then `next build` |
| `pnpm start` | Serves the production build |
| `pnpm lint` | ESLint (`eslint.config.mjs`) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm diagrams [slug...]` | Renders architecture diagrams from Mermaid to SVG with a local Chrome or Edge (see below) |

## Where Things Live

| Path | Contents |
|---|---|
| `src/content/projects/<slug>.ts` | One file per project or product: the single source of truth for listings, case studies and the sitemap |
| `src/content/schema.ts` | The Zod schema every project file is validated against at build time |
| `src/content/projects/index.ts` | Listing order, validation, and the helpers: `getAllProjects`, `getProjectBySlug`, `getProjectsInSection`, `projectPath`, `toCard` |
| `src/content/diagrams/<slug>.mmd` | Architecture diagram sources (Mermaid), each with its rendered `<slug>.svg` committed next to it |
| `src/content/team.ts` | The team on `/about`, with a `visibility` flag per person |
| `public/images/<slug>/` | WebP mockups and screenshots, each listed in its project's `gallery` |
| `public/media/<slug>/` | Short silent screen recordings (MP4), each listed in its project's `loops` |
| `src/app/` | Routes: `/`, `/work`, `/work/[slug]`, `/products`, `/products/[slug]`, `/services`, `/about`, `/notes`, `/contact`, `/privacy`, `/api/contact`, plus `sitemap.ts` and `robots.ts` |
| `src/components/case-study/` | The case-study template shared by `/work/[slug]` and `/products/[slug]`, and the project card |
| `src/components/work/WorkIndex.tsx` | The `/work` filters (type, industry, stack, search), kept in the URL |
| `src/lib/site.ts` | `SITE_URL`, `CONTACT_EMAIL` and `pageMetadata()`, which sets title, description, canonical, Open Graph and Twitter tags per page |
| `src/lib/project-page.ts` | Static params, metadata and related projects for the case-study routes |
| `src/lib/og.tsx` | The per-project Open Graph image, generated at build time by each route's `opengraph-image.tsx` |
| `src/proxy.ts` | Lowercases mixed-case `/work/*`, `/products/*` and `/projects/*` URLs with a 308 |
| `next.config.ts` | Permanent redirects, generated from the content (see below) |
| `docs/` | Content, tone and UI guidelines |

How to add or change a project, and the image review rule, are in `docs/04-CONTENT-MANAGEMENT.md`.

## Sections and Redirects

A project's `section` decides its URL: `/work/<slug>` or `/products/<slug>`. It defaults to `products` for
`kind: 'product'` and `work` for everything else, and a project file can override it. `/work` lists every
project, products included, and each card links to the project's own URL. `/notes` is a placeholder (noindex,
not in the sitemap) until notes are published.

`next.config.ts` builds the permanent redirects from the content, so each old URL reaches its page in one hop:
`/studio` and `/projects` go to `/work`, `/blog` to `/notes`, `/projects/<slug>` and renamed slugs to the
project's current URL, and a project's URL under the other section to its own. Moving a project between
sections is a one-line change in its file, and its old links keep working. Projects taken off the site are
listed in `REMOVED`, and their old URLs (`/work/<slug>`, `/products/<slug>`, `/projects/<slug>`) go straight
to `/work`.

## Architecture Diagrams

A case study shows an architecture diagram when `src/content/diagrams/<slug>.mmd` exists. Write the diagram in
Mermaid (`flowchart TD`, with `accTitle` and `accDescr` for screen readers), from what the project file
already says, then run `pnpm diagrams <slug>` and commit both files. The script renders with Mermaid in a
local headless Chrome or Edge (`CHROME_PATH` if neither is found). It downloads Mermaid at a pinned version and
checks the file against a pinned SHA-384 first, so no Mermaid code reaches the site. The SVG has no styles of
its own; `.diagram` in `src/app/globals.css` colours it.

`pnpm build` runs `scripts/check-diagrams.mjs`, which fails when an SVG is missing, was rendered from an older
source (the SVG records its source's SHA-256), belongs to no project, or contains anything active (scripts,
event handlers, `foreignObject`, external references or styles).

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
