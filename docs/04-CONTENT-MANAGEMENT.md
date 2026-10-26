# VersaLabs Studio - Content Management

## 1. Project Content

Every project and product on the site is one typed file in `src/content/projects/<slug>.ts`. It is the single source of
truth: the home page, the `/studio` listing, the case study pages and the sitemap all read from
`src/content/projects/index.ts`.

### Project Files
- Each file exports `defineProject({ ... })`, typed by `src/content/schema.ts`, so the editor flags mistakes as you write.
- `src/content/projects/index.ts` lists every file in listing order and validates each one with the Zod schema when the
  site builds. A missing field, a bad slug, an `http` link or a duplicate image fails the build with a readable error.
- `kind` is `client`, `product`, `internal` or `research`; `status` is one of `Production`, `Beta`, `MVP`, `Prototype`,
  `Demo` or `Development`. Badges for both come from `src/content/labels.ts`.
- `links.live` and `links.repo` are optional. Leave `repo` out for private repositories, and leave `live` out until the
  live site is something we stand behind.
- `visibility: 'hide'` removes a project everywhere at once: listings, `/projects/[slug]` (a hard 404 via
  `dynamicParams = false`), and the sitemap.
- Listing pages receive a slim `ProjectCard` (`toCard()`), not the whole project, so case study text stays out of their
  payload.

### One Listing, One Sitemap
- `/studio` is the only project listing. `/projects` redirects to it permanently (`next.config.ts`).
- Case studies live at `/projects/[slug]`. `src/proxy.ts` lowercases mixed-case slugs with a 308.
- `src/app/sitemap.ts` builds the sitemap from `getAllSlugs()`, so it always matches the visible projects. `src/app/robots.ts` points to it.
- Renamed slugs get a permanent redirect in `next.config.ts` (e.g. `pavillion-360` → `pavilion-360`).
- Phase C plan: move case studies to `/work/[slug]`, redirect `/studio` and `/projects/*` there, and keep each old URL a single hop from its new home.

### Facts Rule
- Copy states only what is true and checkable. When a number is disputed or unknown, write the sentence without it.
- Status labels are honest: `Production` only for software real users rely on today.

### Tone & Voice
- **Plain and specific:** say what the software does and for whom, in words a business owner understands.
- **Factual:** describe what was built and how. Numbers appear only with evidence behind them.
- **Narrative Structure:** every project defines `businessProblem`, `architecturalSolution`, `systemFlow` and its
  `features`.

## 2. Images

- Images live in `public/images/<slug>/` as WebP, named `mockup-NN.webp` (device mockups) or `screen-NN.webp` (plain
  screenshots), at most 1920px on the long side.
- Each one is listed in its project's `gallery` with a descriptive `alt`, its `kind`, `width`, `height`, and
  `reviewed: true`. `cover` must be one of the gallery images.
- `reviewed: true` records that a person checked the image. Before adding one, check it for customer names, emails,
  phone numbers, addresses, TINs, orders, payment references, revenue, server addresses, admin screens, and claims the
  client's own site no longer makes (invented stats, ratings, testimonials). File names count too. When in doubt, leave
  it out.
- `scripts/check-images.mjs` runs first in `pnpm build`. It fails when `public/images` holds a file no project lists, a
  listed file is missing, or a folder passes 6 MB. Team portraits in `public/images/team/` are exempt from listing.
- Pages render images with `next/image` and a `sizes` hint, so Vercel serves each visitor a resized WebP.

## 3. SEO & Web Vital Governance
- Every page exports metadata through `pageMetadata()` in `src/lib/site.ts`, which sets the title, description, canonical URL, Open Graph and Twitter tags.
- `<ProjectSlideshow />` marks only its first slide `priority`, so one image competes for the first paint.
