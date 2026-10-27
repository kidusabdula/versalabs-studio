# VersaLabs Studio - Content Management

## 1. Project Content

Every project and product on the site is one typed file in `src/content/projects/<slug>.ts`. It is the single source of
truth: the home page, the `/work` and `/products` listings, the case study pages, the footer, the redirects and the
sitemap all read from `src/content/projects/index.ts`.

### Project Files
- Each file exports `defineProject({ ... })`, typed by `src/content/schema.ts`, so the editor flags mistakes as you write.
- `src/content/projects/index.ts` lists every file in listing order and validates each one with the Zod schema when the
  site builds. A missing field, a bad slug, an `http` link or a duplicate image fails the build with a readable error.
- `kind` is `client`, `product`, `internal` or `research`; `status` is one of `Production`, `Beta`, `MVP`, `Prototype`,
  `Demo`, `Development` or `Coming Soon` (a product in development that is close to launch). Badges for both come from
  `src/content/labels.ts`; `Development` and `Coming Soon` share the violet badge and the in-development calls to
  action.
- `industry` (at least one) and `stack` take values from the fixed lists `INDUSTRIES` and `STACK` in the schema, so
  the `/work` filters only ever offer real values. Add a new value to the list first, then use it.
- `section` is optional: products default to `/products`, everything else to `/work`. Set it to move a project
  (Jarvis sets `section: "products"`). The redirects follow automatically.
- `client` is optional and appears on the case study only when set. Leave it out when the client has not agreed to
  be named.
- `metrics` (outcome numbers) default to empty. Each one needs a `label`, a `value` and the `evidence` behind it
  (where the number comes from). The Outcomes section appears only when there is at least one.
- `links.live` and `links.repo` are optional. Leave `repo` out for private repositories, and leave `live` out until the
  live site is something we stand behind.
- `visibility: 'hide'` removes a project everywhere at once: listings, its case study (a hard 404 via
  `dynamicParams = false`), the footer, the redirects and the sitemap.
- Listing pages receive a slim `ProjectCard` (`toCard()`), not the whole project, so case study text stays out of their
  payload.

### Sections, URLs and the Sitemap
- `/work` lists every project, products included, with filters for type, industry and stack plus a search box. The
  filters live in the URL (`/work?type=client&industry=events`), so a filtered view can be shared.
- `/products` lists the projects whose section is `products`, with their status badges.
- Case studies live at `/work/[slug]` or `/products/[slug]`, both rendered by one template
  (`src/components/case-study/CaseStudy.tsx`). Products get a "Request a Demo" button; client work gets
  "Build Something Like This". `src/proxy.ts` lowercases mixed-case URLs with a 308.
- `projectPath()` in `src/content/projects/index.ts` is the one place a project's URL is built.
- `next.config.ts` generates the permanent redirects from the content: `/studio` and `/projects` → `/work`,
  `/blog` → `/notes`, `/projects/<slug>` → the project's page, a project's URL under the other section → its own,
  and renamed slugs (e.g. `pavillion-360` → `pavilion-360`) in the `RENAMED` map. Every old URL is one hop from
  its page.
- To take a project off the site for good, delete its file and its `public/images/<slug>/` folder, and add the
  slug to `REMOVED` in `next.config.ts`: its old `/work`, `/products` and `/projects` URLs then go to `/work` in one
  hop. (`visibility: 'hide'` is for a temporary removal: the page 404s and nothing redirects.) Removed so far:
  Tibeb, Potentia, Pana Web and FastPay ET Wallet.
- `src/app/sitemap.ts` builds the sitemap from `getAllProjects()` and `projectPath()`, so it always matches the
  visible projects. `/notes` stays out of it (and is noindex) until notes are published. `src/app/robots.ts` points
  to the sitemap.

### Architecture Diagrams
- A case study shows a diagram when `src/content/diagrams/<slug>.mmd` exists. Draw only what the project file
  already says (`architecturalSolution` and `architecture.diagram`), as a `flowchart TD` with `accTitle` and
  `accDescr`. Keep it narrow (at most three boxes side by side), so it stays readable on a phone.
- Run `pnpm diagrams <slug>` and commit the `.mmd` and the rendered `.svg` together. The build fails if the SVG is
  missing or older than its source. The README explains the pipeline.
- The numbered "Flow, Step by Step" list comes from `systemFlow` and is always shown, diagram or not.

### Team
- The team on `/about` lives in `src/content/team.ts`. `visibility: 'hide'` takes a person off the page, so a
  change to the team section is one line.

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
