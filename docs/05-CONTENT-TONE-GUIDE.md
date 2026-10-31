# VersaLabs Studio: Content and Tone Guide (V5)

> **Purpose:** how every word on versalabs-studio.com should sound. VersaLabs is a product studio: it sells its
> own products and builds software for other businesses. The site sells those products and services. It is not a
> portfolio, and it is not an engineering showcase.

---

## The One Rule

**Say what the software does for the people who use it. Never say how it is built.**

A visitor is a business owner, an operations lead or a manager. They want to know three things: what this is, whether
it is for them, and what to do next. They don't buy a framework, a database or an architecture, so the site never
names one.

| Instead of | Write |
|---|---|
| "A multi-tenant Next.js app on Supabase with row-level security" | "Each business gets its own private workspace, with its own branding and its own data." |
| "A two-tier model cascade runs on-device inference" | "It checks the video on your own device, so the video never leaves it." |
| "ERPNext-backed inventory with webhook order sync" | "Customers see real stock and prices, and every order lands in your ERP." |
| "Event-driven microservices" | (Leave it out. Say what the customer gets.) |

---

## Voice

- **Plain business language.** Short sentences in the active voice. Aim for 20 words or fewer.
- **Benefit first.** Start with what the reader gets, then (only if it helps) what the software does to get it there.
- **Confident, not loud.** No superlatives that nobody can check ("best", "fastest", "revolutionary").
- **Specific.** "Prints receipts with the Ethiopian date and the amount in words" beats "powerful receipts".
- **Local and global.** Amharic support, local payment methods and Ethiopian dates are selling points. Say them
  plainly.
- **Our voice is "we"; the reader is "you" and "your business".**

---

## Banned Words

`src/content/plain-language.ts` holds the list, and the build fails if any project file uses one. The same list
applies to every other page (home, services, about, metadata), and the pre-release check scans the rendered HTML of
every route for it. The one exception is `/privacy`, which names the web host because a privacy notice has to. The
categories:

- **How it is built:** architecture, multi-tenant, microservices, event-driven, schema, data model, API, webhook,
  stack, tech stack, monorepo, serverless, bounded context, design pattern, DDD, CQRS, RLS, cron, PWA.
- **Frameworks, languages and databases:** Next.js, React, React Native, Node.js, TypeScript, Python, Supabase,
  PostgreSQL, MongoDB, Redis, ERPNext, Docker, Vercel, and the rest of the list.
- **Models and AI plumbing:** LLM, GPT, MobileNet, ONNX, TensorFlow, model cascade, inference, embeddings.

"AI" is fine when it describes what the customer gets ("AI that writes the alert in plain language"). The model
behind it is not.

Also avoid these, even though the build allows them: leverage, utilize, robust, scalable, seamless, cutting-edge,
solution, synergy, world-class, enterprise-grade.

---

## Hard Rules

- **No invented numbers.** No metrics, user counts, client counts, ratings or testimonials unless they are already
  verified in the content (a `metrics` entry with its `evidence`) or in `versa-career-ops/state/facts.md`.
- **No credit wording** ("Built by…", "Credits") apart from licence credits a licence requires, such as SafeFrame's
  CC BY sample video.
- **No real organisation next to an unverified figure, and no personal data.**
- **Honest status.** Every product and project shows its status. Something in development never reads as if it has
  shipped. "Coming Soon" is for products close to launch.
- **Name a client only when the content already does.** A client's own brand in the project title is fine.
- **Title Case** for headings, buttons and labels.

---

## Page Patterns

### Home

Products first, then client work as proof, then services.

1. **Hero:** what we do, in one line, "Explore the Products" and "Start a Project", and an index of the products
   with each one's status.
2. **Our Products:** each product's name, its value in one line, what it covers, and its status.
3. **Client Work:** three featured client stories (`src/content/home.ts`), then the rest as a list.
4. **Services:** the four things we build for clients (custom ERP, online stores, websites, AI tools), each with
   examples from our work.
5. **How We Work:** Discover, Design, Build, Launch.
6. **Contact:** one invitation to talk.

### Product Pages (`/products/<slug>`)

A product page is a landing page, in this order:

1. **Value proposition:** the name, a one-line promise (`subtitle`) and two or three sentences on what it does for
   you (`description`).
2. **Who it's for** (`audience`, then the problem it solves, `need`).
3. **What you can do** (`features`): 3 to 6, each a benefit in the title and one plain sentence under it. While the
   product is unreleased the heading is "What <name> Will Do for You" and each feature carries its stage (in
   development or planned), so nothing reads as shipped.
4. **See it work:** screen recordings, then screenshots.
5. **Status:** the badge, one line on availability, and what it covers, as facts near the top of the page.
6. **One call to action:**
   - "Try the Live Demo" when there is a public demo (`links.live`);
   - "Get Notified" while it is in development (Development or Coming Soon) and has no public demo;
   - "Request a Demo" otherwise.

No pricing.

### Client Work (`/work/<slug>`)

A client page is a short client story:

1. **The client and their industry,** with a link to their live site where we may show it.
2. **Their need** (`need`): the business problem, in plain terms.
3. **What we delivered** (`delivered`, plus up to 4 short highlights in `features`): what changed for their
   business, not how we built it.
4. **Visuals:** recordings and screenshots.
5. **"Start a Similar Project".**

### Services, About and Contact

- **Services:** what each offering gets you, which clients it was built for, and how to start.
- **About:** the company. Who we are, where we are, how we work and the team. It is not a personal portfolio.
- **Contact:** a warm, short invitation. No response-time promises we can't keep.

---

## Field Guide For Project Files

| Field | What it holds | Example |
|---|---|---|
| `subtitle` | The promise, in under 10 words | "Run Your Forex Bureau From One Screen" |
| `summary` | One or two sentences for cards and search results | "Rates, transactions and branches in one place…" |
| `description` | The value proposition, or the story in brief | Two or three sentences |
| `need` | The problem, in plain terms and in the third person, never as an unattributed quote (that reads as a testimonial) | "Many bureaus track rates on paper and in chat threads…" |
| `audience` | Products only: who it's for | "Forex bureaus with one or more branches…" |
| `delivered` | Client work only: what the client got | "An online store where customers…" |
| `features` | Benefit-led title and one sentence | "Know Your Cash Position at a Glance" |
| `tags` | Plain words a buyer would search | "Real Estate", "Rent Collection" |

Image `alt` text and recording captions follow the same rules: describe what is on the screen in plain words.

---

## Before You Publish

1. Read it out loud. If it sounds like documentation, rewrite it.
2. Could a shop owner in Addis Ababa say what this does after reading the first line?
3. Does every claim come from the content or the facts file?
4. Is there exactly one next step?

---

*Last updated: October 2026, V5 (product studio).*
