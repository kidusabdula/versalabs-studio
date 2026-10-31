# VersaLabs Studio - UI/UX Guidelines

## 1. A Monochrome Product Studio

The site reads like a corporate software studio that makes its own products. The products lead, client work is the
proof, and the type and the hairline grid carry the look.

- **Products first.** Home, the footer and the navigation put the products ahead of client work and services.
- **Monochrome.** Near-black and white with zinc greys, in a dark theme (the default) and a light one. Colour appears
  only where it means something: a status (in production, beta or demo, in development) or a form error.
- **Structure from lines, not effects.** Depth comes from two surface steps, 1px hairlines and ruled lists. The
  hairline grid (`grid-paper`) sits behind the hero, the plates and the shot panels. No glows, gradient blobs or
  gradient text. The sticky navigation bar is the one translucent surface (85% background with a blur), so the page
  reads through it as it scrolls.
- **Type does the work.** Large, tight Outfit headings; mono labels for numbers, facts and status.

The shared class strings live in `src/components/ui/styles.ts`. Use them instead of writing new ones.

## 2. Design Tokens

Every colour is a CSS variable in `src/app/globals.css`, set on `:root` (dark) and again on
`:root[data-theme="light"]`, and mapped to Tailwind utilities through `@theme inline`. Components use only the semantic
names (`bg-surface`, `text-fg-3`, `border-line`), never a hex value or a zinc class.

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `background` | `#0D0D0F` | `#FFFFFF` | The page, the inside of frames |
| `surface` / `surface-2` | `#161618` / `#1C1C1F` | `#F5F5F6` / `#EBEBED` | Cards and panels; frame bars and elements on a card |
| `muted` | `#27272A` | `#D4D4D8` | The dots in a browser frame's bar |
| `foreground` | `#FFFFFF` | `#0D0D0F` | Headings, the primary button |
| `fg-2` / `fg-3` / `fg-4` | `#D4D4D8` / `#A1A1AA` / `#8E8E98` | `#3F3F46` / `#52525B` / `#5C5C64` | Text steps; every step is AA on every surface |
| `line` / `line-2` | white 8% / 16% | ink 10% / 20% | Hairlines; a hovered card's border |
| `wash` | white 4% | ink 4% | A hovered button or row |
| `ok` / `warn` / `dev` / `err` | emerald / amber / violet / red, light steps | the 700-800 steps | Status and form errors only, each with `-bg` and `-line` |
| `--logo-1/2/3` | greys | inverted greys | The logo mark's facets, so it follows the theme |

Status tones come from `src/content/labels.ts`: `STATUS_TONE` maps a project's status to `ok`, `warn`, `dev` or
`idle`, and `TONE_LEGEND` is the status key in the footer. Kind badges are neutral.

### Theme

Dark by default. The switch in the header (`ThemeToggle`, a pressed/unpressed button) sets `data-theme` on `<html>`
and keeps the choice in `localStorage` (`theme`). An inline script in `<head>` (`src/app/layout.tsx`) applies it before
the first paint, so there is no flash. The `light:` variant styles anything that differs beyond the tokens (the
switch's icon). The privacy page says what is stored.

### Type

- **Fonts:** two variable families, each one preloaded file: Outfit (the brand face) for headings and text, Geist Mono
  for labels, numbers and facts. Both use `display: optional`, so a font never swaps in after the first paint. Don't
  add a third family: every font file is on the mobile critical path.
- **Scale** (`styles.ts`): `DISPLAY` 40/56/72px and `H1` 36/48/60px for a page's heading, `H2` 30/38/46px for a
  section, `H3` 20px, `SUBTITLE` 20-24px, `LEAD` 17-18px at most 62 characters wide, `BODY` 15px, `SMALL` 13px.
  Headings are semibold with negative tracking and `text-balance`, in Title Case.
- **Labels:** `EYEBROW` (mono, 12px, uppercase, wide tracking) above a heading; `MONO` beside a value (an index number,
  a fact's name, a year).

### Layout

- A 1280px column (`CONTAINER`) with a 16px gutter on a phone, 24px on a tablet and 40px on a desktop.
- Section rhythm (`SECTION`): 80px on a phone, 96px on a tablet, 112px on a desktop, a hairline (`RULE`) between
  sections. A page header (`PAGE_HEAD`) has less.
- Lists of facts, features and principles are top-border lists (`border-t border-line-2 pt-6`), which hold any count
  of items. `RULED_GRID` (hairlines between cells) is only for a fixed count that fills its rows.
- Every page works from 360 to 1440px with no horizontal scroll.

## 3. Components

- **Buttons:** one system, 44px tall with an 8px radius. Primary (`BUTTON_PRIMARY`) is the foreground colour (white
  on dark, near-black on light); secondary (`BUTTON_SECONDARY`) is a hairline. `TEXT_LINK` is an underlined link with
  an arrow; `INLINE_LINK` is for running text.
- **Cards** (`CARD`, `CARD_LINK`): a 12px radius on `surface` with a hairline. A linked card brightens its border on
  hover and nothing moves.
- **Badges** (`src/components/ui/Badge.tsx`): `StatusBadge` (a tone dot and the status label), `StageBadge` (a
  feature's stage), `KindBadge` (neutral). Mono, 11px, uppercase.
- **Chips and pills:** `CHIP` for a product's scope words; `PILL` for filters and links to examples.
- **Navigation bar:** sticky, the logo mark and name, Products, Client Work, Services, About, Contact (the current
  page underlined), the theme switch and "Start a Project". On a phone the links open in a full menu that closes on
  Escape, on a link and on navigation.
- **Footer:** the studio and "Start a Project", the products with their status, company pages, ways to reach us, and
  the status key.
- **Skip link:** "Skip to content" is the first thing a keyboard reaches, and goes to `<main id="main">`.

## 4. Product Imagery

`src/components/ui/ProductShot.tsx` is the one way to show a product image.

- **A desktop screenshot** sits in a neutral browser frame (a thin bar with three dots) at a fixed 16:10. A 16:9
  capture is cropped from the top left, where an app keeps its menu.
- **A phone screenshot** sits in a simple phone outline at 9:19.5.
- **A mockup** (an image already composed on a device) shows as it is. Prefer straight screenshots for page leads and
  card covers; mockups belong in the carousel.
- **Shots sit on a surface panel** (`ShotPanel`) with the hairline grid behind them.
- **No screenshots yet:** a `Plate` shows the product's own words on the hairline grid: its scope words in ruled
  cells, or its name set large, with a mono line above and below. It sizes its type to its own width (a container
  query), so one plate works in a card and leading a page. With a `label` it is an image with that description;
  without one it is decorative. Never a made-up interface or stock art.
- **No layout shift:** every frame has a fixed shape before its image loads. Give each image a correct `sizes`. The
  lead shot of a page is fetched first (`priority`); a shot that is in the first view only on a desktop loads at once
  without a preload (`eager`).

Which images lead a page is decided in `src/lib/shots.ts`: the cover, paired with the same page on a phone when a
`screen-<page>-desktop` capture has a `screen-<page>-mobile` twin. A product shown only on phones (its cover is a phone
screen) leads with three phone screens, the cover in the middle; on a phone the cover shows alone. A feature can name
the screenshot that shows it (`image` in the project file), and it gets its own row beside that screenshot. The gallery
shows everything not already on the page.

- **Image files:** WebP in `public/images/<slug>/`, listed in the project file (the build checks both ways).
  `next/image` serves AVIF to browsers that take it and WebP to the rest (`next.config.ts`). A desktop capture is
  1440x900; a cover may use the 2x master (2880x1800). A phone capture is cropped to 9:19.5.
- **Before a shot ships,** look at it: no real person's name, no client, no framework name, no developer tool badge,
  and no figures that read as a real business's results.

## 5. Motion

- **One entrance:** `Reveal` (`src/components/ui/motion.tsx`, a server component) adds `.reveal`, which settles a
  section 24px upward as it scrolls into view. It is a CSS scroll-driven animation: no script, and it moves without
  fading, so no text is ever half-transparent for a contrast check. Never put it on a page's first view.
- **Reduced motion:** the `prefers-reduced-motion` block in `globals.css` turns the entrance off and stops
  transitions. Browsers without scroll-driven animations show everything in place.
- **The lightbox** renders in a portal on `<body>` (a transformed section would otherwise trap its fixed position),
  cross-fades its images, and stays dark in both themes.
- **Recordings** (`LoopVideo`): muted, with a poster, loaded only when in view, playing only while in view, with a
  pause button. With reduced motion on, the poster is all there is.
- **Nothing else moves.** No infinite animations, no parallax, no hover scaling.

## 6. Banned Practices

- Glows, gradient blobs, gradient text, and glass panels (the navigation bar's translucency is the one exception).
- Infinite or looping decorative animation.
- Colours outside the tokens, and colour on anything but a status or a form error.
- Angled mockups as a page's lead image when a straight screenshot exists.
- Fake interface or stock art standing in for a product that has no screenshots yet.
