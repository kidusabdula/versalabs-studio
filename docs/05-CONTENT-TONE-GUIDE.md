# VersaLabs Studio — Content & Tone Guide (V4)

> **Purpose**: This document defines the content strategy, tone of voice, and text patterns used across the VersaLabs Studio website. All future copy should follow these guidelines to maintain consistency and maximize audience reach.

---

## Core Tone Principles

### 1. Accessible, Not Dumbed Down

**Content Tone Shift**: Lowering reading difficulty across all text while keeping the premium narrative. Jargon like "autonomous", "bounded contexts", "schema-first" will be simplified or contextualized for non-technical visitors. Example: "Engineering Autonomous Enterprise Systems" → "We Build Smart Systems That Power Your Business".

We lowered the reading difficulty across the entire platform without losing our premium, professional positioning. The goal: **any business owner in Addis Ababa should understand what we do within 5 seconds of landing on the site**, while a CTO in San Francisco should still see us as enterprise-grade.

**Before (V3):**
> "Self-hosted autonomous SWE platform orchestrating multi-model LLM agents via OpenClaw gateway, with MCP integrations for GitHub, Vercel, Notion, and Gmail — deployed on Docker."

**After (V4):**
> "Our in-house AI assistant that automates development workflows — managing code, deployments, documentation, and communication across all our projects through intelligent AI agents."

### 2. Action-Oriented, Not Feature-Listing

Every product summary leads with **what it does for the user**, not what technology it uses. Technical details are accessible via the "View Architecture" modal on each project detail page.

**Pattern:**
- ❌ "Built on Next.js App Router with strict three-tier architecture and dual-theme OKLCH color system"
- ✅ "A gallery-worthy digital storefront for contemporary Ethiopian fashion. Beautiful dark and light themes, smooth animations, and a complete shopping experience."

### 3. Locally Rooted, Globally Ready

We explicitly acknowledge our Ethiopian identity as a strength, not a limitation. The phrase **"Based in Addis Ababa, building for the world"** appears in the footer, metadata, and About page.

Key phrases that reinforce this:
- "Software that speaks your language — literally."
- "Telebirr integrations, Amharic support, and design that resonates locally."
- "Stripe payments, multi-currency support, and infrastructure that serves users from Addis Ababa to New York."

---

## Page-by-Page Tone Map

### Home Page
| Section | Tone | Key Message |
|---------|------|-------------|
| Hero | Bold, warm, inviting | "We Build Smart Systems That Power Your Business" |
| ObsidianShowcase | Premium, immersive | Flagship product, visual-first, minimal text |
| CoreCapabilities | Confident, simple | "Built different — by design." with accessible descriptions |
| Why Businesses Choose Us | Trust-building | "Your idea deserves more than a template." |
| Featured Products | Visual, action-oriented | Each product described by what it solves, not how it's built |
| From Addis to the World | Local pride + global reach | Bilingual support, local payment integration, global infrastructure |
| CTA | Direct, friendly | "Ready to Get Started? Let's build something great together." |

### Studio Page
- **Hero**: "Our Best Work." — confident, not boastful
- **Product Cards**: Each shows category badge, year, status, and product type (SaaS/Custom/Internal)
- **Search/Filter**: Functional, no marketing copy needed

### Services Page
- **Hero**: "Business Software, Delivered." — direct, professional
- **Service Cards**: Each service described in one sentence of plain language
- **Process Steps**: 4-step flow (Discover → Design → Build → Launch) — transparent, no jargon
- **Trust Signals**: Plain statements with no numbers we can't back up (Real, Scoped, Custom, Ongoing)

### About Page
- **Hero**: "The Team Behind VersaLabs." — personal, approachable
- **Team Bios**: 2-3 sentences each, focused on what they do, not credentials
- **Philosophy**: "Small team. Big impact." — lean, focused, quality-driven
- **Timeline**: Simple milestone list showing growth trajectory

### Contact Page
- **Hero**: "Let's Talk." — warm, inviting, no barriers
- **Form**: 8 fields with clear labels, nothing ambiguous
- **Sidebar**: Email, location, how replies work, social links (no response-time promise)

### Blog
- **Coming Soon** with pulse indicator — "We're preparing articles about software architecture, AI development, and building products in the Ethiopian tech ecosystem."

---

## Product Type Labels

| `productType` | UI Label (Studio) | UI Label (Detail) | Color |
|---|---|---|---|
| `saas` | "SaaS" | "Deploy Ready" | Emerald |
| `client-project` | "Custom" | "Custom Built" | Violet |
| `internal` | "Internal" | "Internal Tool" | Cyan |

Detail page CTAs adapt based on product type:
- **SaaS**: "Deploy This Platform" / "Schedule a Demo"
- **Client**: "Build Something Like This" / "Get a Custom Version"

---

## Vocabulary Rules

### Words We Use
- "Platform" (not "application" or "app" for enterprise products)
- "Build" and "Ship" (not "develop" or "implement")
- "Smart" (not "intelligent" or "AI-powered" — unless specifically about AI features)
- "Your business" (not "the enterprise" or "the organization")
- "Works" and "works for you" (not "functions" or "operates")

### Words We Avoid
- "Leverage" → use "use" or "powered by"
- "Utilize" → use "use"
- "Scalable" → describe what actually scales ("handles thousands of users")
- "Robust" → describe what makes it reliable ("tested", "monitored 24/7")
- "Solution" → use "platform", "system", or "tool"
- "Synergy" → never
- "Cutting-edge" → use "modern" or "latest"

### Technical Terms (Use Only in Architecture Modal)
These terms should only appear in the "View Architecture" modal on project detail pages, never in hero text, summaries, or card descriptions:
- DDD, Bounded Context, Domain Events
- OKLCH, HSL
- Repository Pattern, Factory Pattern
- MCP, OpenClaw, OpenRouter
- SWR, TanStack Query
- Row Level Security
- CI/CD Pipeline

---

## Writing New Content

When writing new text for the website, follow this checklist:

1. **Read it out loud.** If it sounds like a software documentation page, rewrite it.
2. **The "mom test."** Would your non-technical parent understand what this product does? If not, simplify.
3. **Lead with the benefit.** What does the user get? Then (optionally) explain how.
4. **Keep sentences short.** Max 20 words per sentence is ideal.
5. **Use active voice.** "We build" not "Systems are built by our team."
6. **Include a CTA.** Every section should have a clear next action for the visitor.

---

*Last updated: May 2026 — V4 Platform Overhaul*
