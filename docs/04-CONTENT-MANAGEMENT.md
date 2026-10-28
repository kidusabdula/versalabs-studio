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
- `industry` (at least one) takes values from the fixed list `INDUSTRIES` in the schema, so the `/work` filter only
  ever offers real values. Add a new value to the list first, then use it.
- Every project tells its story in plain business words: `summary`, `description`, `need` (the problem a product
  solves, or what the client needed) and `features`. A product adds `audience` (who it's for) and lists 3 to 6
  benefit-led features. Client work adds `delivered` (what we delivered, in plain terms) and lists up to 4
  highlights. The schema enforces both shapes.
- There are no fields for technology, engineering detail or diagrams. The loader also checks every text field
  against `src/content/plain-language.ts`, so a technology name or a piece of jargon fails the build. The rules are
  in `docs/05-CONTENT-TONE-GUIDE.md`.
- `section` is optional: products default to `/products`, everything else to `/work`. Set it to move a project
  (SafeFrame sets `section: "products"`). The redirects follow automatically.
- `client` is optional: the client's name when it differs from the project title (PrintOnline.et is for Pana
  Promotion). It appears on the card and the client page, and names the client on the home page and in service
  examples.
- `metrics` (outcome numbers) default to empty. Each one needs a `label`, a `value` and the `evidence` behind it
  (where the number comes from). The Outcomes section appears only when there is at least one.
- `links.live` is optional. Leave it out until the live site or demo is something we stand behind. A product with a
  live link gets "Try the Live Demo" as its call to action.
- `visibility: 'hide'` removes a project everywhere at once: listings, its case study (a hard 404 via
  `dynamicParams = false`), the footer, the redirects and the sitemap.
- Listing pages receive a slim `ProjectCard` (`toCard()`), not the whole project, so case study text stays out of their
  payload.

### Sections, URLs and the Sitemap
- `/work` lists client work (section `work`), with an industry filter and a search box. The filters live in the
  URL (`/work?industry=events&q=store`), so a filtered view can be shared.
- `/products` lists the projects whose section is `products`, with their status badges.
- Pages live at `/products/[slug]` (a product landing page: value, who it's for, features, visuals, status, one
  call to action) or `/work/[slug]` (a short client story: their need, what we delivered, visuals, "Start a Similar
  Project"), both rendered by `src/components/case-study/CaseStudy.tsx`. `callToAction()` in
  `src/content/labels.ts` picks the button: "Try the Live Demo" when a product has a live link, "Get Notified" while
  it is in development, otherwise "Request a Demo". The contact links carry `?topic=<slug>&interest=…`, and the
  form starts the message for the visitor. `src/proxy.ts` lowercases mixed-case URLs with a 308.
- `projectPath()` in `src/content/projects/index.ts` is the one place a project's URL is built.
- `next.config.ts` generates the permanent redirects from the content: `/studio` and `/projects` → `/work`,
  `/blog` → `/notes`, `/projects/<slug>` → the project's page, a project's URL under the other section → its own,
  and renamed slugs (e.g. `pavillion-360` → `pavilion-360`) in the `RENAMED` map. Every old URL is one hop from
  its page.
- To take a project off the site for good, delete its file and its `public/images/<slug>/` folder, and add the
  slug to `REMOVED` in `next.config.ts`: its old `/work`, `/products` and `/projects` URLs then go to `/work` in one
  hop. (`visibility: 'hide'` is for a temporary removal: the page 404s and nothing redirects, unless the slug is in
  `PARKED` in `next.config.ts`, which sends its old URLs to a listing in one hop. JARVIS is parked, hidden until
  it is for sale, and goes to `/products`.) Removed so far:
  Tibeb, Potentia, Pana Web, FastPay ET Wallet and ThreatMatrix AI.
- `src/app/sitemap.ts` builds the sitemap from `getAllProjects()` and `projectPath()`, so it always matches the
  visible projects. `/notes` stays out of it (and is noindex) until notes are published. `src/app/robots.ts` points
  to the sitemap.

### Services
- The four services on the home page and `/services` live in `src/content/services.ts`, with their example pages
  by slug. An example that no longer resolves (deleted or hidden) fails the build. Each service's `id` is also the
  contact form's project type, so "Talk to Us About …" preselects it (`/contact?service=erp`).

### Team
- The team on `/about` lives in `src/content/team.ts`. `visibility: 'hide'` takes a person off the page, so a
  change to the team section is one line.

### Facts Rule
- Copy states only what is true and checkable. When a number is disputed or unknown, write the sentence without it.
- Status labels are honest: `Production` only for software real users rely on today.

### Tone & Voice
- Follow `docs/05-CONTENT-TONE-GUIDE.md`: say what the software does for the business and for whom, in words a
  business owner understands, and never how it is built. Numbers appear only with evidence behind them.

## 2. Images

- Images live in `public/images/<slug>/` as WebP, named `mockup-NN.webp` (device mockups) or `screen-NN.webp` (plain
  screenshots), at most 1920px on the long side. Captures from the media rig (`w/media`, shot on the live site) keep
  their page in the name: `screen-<page>-desktop.webp` (1440x900) and `screen-<page>-mobile.webp` (780x1688).
- Each one is listed in its project's `gallery` with a descriptive `alt`, its `kind`, `width`, `height`, and
  `reviewed: true`. `cover` must be one of the gallery images.
- `reviewed: true` records that a person checked the image. Before adding one, check it for customer names, emails,
  phone numbers, addresses, TINs, orders, payment references, revenue, server addresses, admin screens, and claims the
  client's own site no longer makes (invented stats, ratings, testimonials). File names count too. When in doubt, leave
  it out.
- `credit` is required on an image that shows someone else's licensed material, such as SafeFrame's results screen,
  which shows a CC BY 4.0 sample clip. The credit appears under the screenshot and in the full-size viewer. Only a
  `screen` can carry one, and it can't be the `cover` (the carousel and the cards have no caption to show it in).
- `scripts/check-images.mjs` runs first in `pnpm build`. It fails when `public/images` or `public/media` holds a file no
  project lists, a listed file is missing, an image folder passes 6 MB, a media folder passes 3 MB, or a video passes
  1.5 MB. Team portraits in `public/images/team/` are exempt from listing.
- Pages render images with `next/image` and a `sizes` hint, so Vercel serves each visitor a resized WebP.

### Screen Recordings (`loops`)
- A project's `loops` are short, silent screen recordings from the media rig: MP4 (H.264) in `public/media/<slug>/`.
  Use the 960x600 desktop loop (`loop-<name>-960.mp4`) and the 780x1688 phone loop; the 1440x900 desktop loop adds
  weight without adding much at the size the page shows it. The WebM twins are left out: they are larger than the
  MP4 for most loops, and every current browser plays H.264.
- Each loop lists `src`, `poster`, `caption`, `view` (`desktop` or `mobile`), `width`, `height`, `reviewed: true` and,
  when needed, `credit`. The `poster` must be one of the project's gallery screenshots with the same shape, showing
  the page the loop opens on, so a loop adds no poster file.
- The page shows them in its visuals section ("See It Work" on a product, "What It Looks Like" on a client
  story): each desktop loop beside the phone loop of the same row. The poster paints first; the video loads only when it scrolls into view (`preload="none"`), plays muted
  and looping while in view, has a pause button, and never appears with `prefers-reduced-motion: reduce` (the
  poster stays). The caption below each loop says what it shows; the video itself is `aria-hidden`.

## 3. SEO & Web Vital Governance
- Every page exports metadata through `pageMetadata()` in `src/lib/site.ts`, which sets the title, description, canonical URL, Open Graph and Twitter tags.
- `<ProjectSlideshow />` marks only its first slide `priority`, so one image competes for the first paint, and not even
  that when loops sit above it. Loop posters load lazily and videos load only in view.
