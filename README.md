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
| `pnpm build` | Runs `scripts/check-images.mjs`, then `next build` |
| `pnpm start` | Serves the production build |
| `pnpm lint` | ESLint (`eslint.config.mjs`) |
| `pnpm typecheck` | `tsc --noEmit` |

## Where Things Live

| Path | Contents |
|---|---|
| `src/content/projects/<slug>.ts` | One file per project or product: the single source of truth for listings, case studies and the sitemap |
| `src/content/schema.ts` | The Zod schema every project file is validated against at build time |
| `src/content/projects/index.ts` | Listing order, validation, and the `getAllProjects` / `getProjectBySlug` / `toCard` helpers |
| `public/images/<slug>/` | WebP mockups and screenshots, each listed in its project's `gallery` |
| `src/app/` | Routes: `/`, `/studio`, `/projects/[slug]`, `/services`, `/about`, `/blog`, `/contact`, `/privacy`, `/api/contact`, plus `sitemap.ts` and `robots.ts` |
| `src/lib/site.ts` | `SITE_URL` and `pageMetadata()`, which sets title, description, canonical, Open Graph and Twitter tags per page |
| `src/proxy.ts` | Lowercases mixed-case `/projects/*` URLs with a 308 |
| `next.config.ts` | Permanent redirects for renamed URLs |
| `docs/` | Content, tone and UI guidelines |

How to add or change a project, and the image review rule, are in `docs/04-CONTENT-MANAGEMENT.md`.

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
