# VersaLabs Studio - UI/UX Guidelines

## 1. A Calm, Product-Led Studio

The site reads like a calm corporate software studio. The product imagery does the selling, not
decoration.

- **Products lead.** Real screenshots of our products sit in plain frames, large, near the top of a page.
- **Depth from surfaces, not effects.** Depth comes from the surface steps and 1px hairline borders. No
  glass panels, no glows, no gradient blobs, no blur. At most a very soft shadow under a frame.
- **Colour is information.** The only colour on the site is on status badges. Everything else is the
  background, the surfaces, zinc text and white.
- **Nothing loops.** One subtle fade-up when a section scrolls into view. Product recordings play only
  while in view (see section 5).

The shared class strings live in `src/components/ui/styles.ts`; use them instead of writing new ones.

## 2. Design Tokens

All colours come from the `@theme` block in `src/app/globals.css`. Don't add hex colours in components.

| Token | Value | Use |
|---|---|---|
| `background` | `#0D0D0F` | Page background, the inside of frames |
| `surface` | `#161618` | Cards and panels (the first step up) |
| `surface-elevated` | `#1C1C1F` | Frame bars and elements on a card (the second step) |
| `muted` | `#27272A` | The dots in a browser frame's bar |
| `foreground` | `#FFFFFF` | Headings, primary buttons |
| `border` / `border-hover` | white at 8% / 12% | Hairlines; a linked card's border on hover |
| `zinc-500`, `zinc-600` | AA-safe overrides | Small supporting text |

Status badge colours live in `src/content/labels.ts`: emerald for Production, amber for an early release
(Beta, MVP, Prototype, Demo), violet for Development and Coming Soon. Kind badges are neutral.

### Type

- **Fonts:** Outfit for everything, Geist as its fallback, Geist Mono for small labels.
- **Display headings** (`DISPLAY`): 56-72px on desktop, 38px on a phone, tracking -0.02em, Title Case.
- **Section headings** (`H2`): 44px on desktop, 30px on a phone.
- **Body** (`LEAD`, `BODY`): 17-18px, line-height 1.6, at most 68 characters wide.
- **Eyebrow labels** (`EYEBROW`): Geist Mono, uppercase, zinc, above a heading.

### Layout

- A 1200px content column (`CONTAINER`) with a 20-24px side gutter.
- Section rhythm (`SECTION`): 112px top and bottom on desktop, 64px on a phone, with a hairline rule
  between sections (`SECTION_RULE`).
- Grids use 12 columns on desktop for asymmetric layouts (the product bento, feature rows).

## 3. Components

- **Buttons:** one system. Primary (`BUTTON_PRIMARY`) is white with near-black text. Secondary
  (`BUTTON_SECONDARY`) is a hairline border. Both are pills, 44px tall. A text link (`TEXT_LINK`) for
  "see more" links.
- **Cards** (`CARD`, `CARD_LINK`): a 16px radius on `surface` with a hairline border. A linked card only
  brightens its border and lifts 2px on hover; with reduced motion it doesn't move.
- **Navbar:** sticky, solid background, a hairline under it, "Start a Project" as its call to action.
  It sits in the page flow, so pages start right below it.
- **Footer:** four columns: the studio, products, company pages, ways to reach us.

## 4. Product Imagery

`src/components/ui/ProductShot.tsx` is the one way to show a product image.

- **A desktop screenshot** sits in a neutral browser frame (a thin bar with three zinc dots) at a fixed
  16:10. A 16:9 capture is cropped from the top left, where an app keeps its menu.
- **A phone screenshot** sits in a simple phone outline at 9:19.5.
- **A mockup** (an image already composed on a device) shows as it is. Prefer straight screenshots over
  mockups for page heroes and card covers; mockups belong in the carousel.
- **Shots sit on a surface panel** (`ShotPanel`) with generous padding.
- **No images yet:** `ShotPlaceholder` shows the same frame with the product's name, and on its own page
  its status badge and availability line. No made-up interface, no stock art.
- **No layout shift:** every frame has a fixed shape before its image loads. Give each image a correct
  `sizes`. The lead shot of a page is fetched first (`priority`); a shot that is in the first view only
  on a desktop loads at once without a preload (`eager`).

Which images lead a page is decided in `src/lib/shots.ts`: the cover, paired with the same page on a
phone when a `screen-<page>-desktop` capture has a `screen-<page>-mobile` twin. A product shown only on
phones (its cover is a phone screen) leads with three phone screens, the cover in the middle; on a phone
the cover shows alone, and as the flagship card the three rise from a 16:9 stage. A feature can name the
screenshot that shows it (`image` in the project file), and it gets its own row beside that screenshot.
The gallery shows everything not already on the page.

- **Image files:** WebP in `public/images/<slug>/`, listed in the project file (the build checks both
  ways). `next/image` serves AVIF to browsers that take it and WebP to the rest (`next.config.ts`). A
  desktop capture is 1440x900; a cover may use the 2x master (2880x1800) so the page's lead stays sharp
  on a high-density screen. A phone capture is cropped to 9:19.5, so the outline shows all of it.
- **Before a shot ships,** look at it: no real person's name, no client, no framework name, no
  developer tool badge, and no figures that read as a real business's results.

## 5. Motion

- **One entrance:** `Reveal` in `src/components/ui/motion.tsx` fades a section up 8px over 300ms, once,
  when it scrolls into view. Never wrap a page's first view in it: the heading and the lead shot must
  paint with the server HTML.
- **Reduced motion:** `MotionConfig reducedMotion="user"` drops the movement, and the CSS block in
  `globals.css` stops CSS transitions.
- **Recordings** (`LoopVideo`): muted, with a poster, loaded only when in view, playing only while in
  view, with a pause button. With reduced motion on, the poster is all there is.
- **Nothing else moves.** No infinite animations, no parallax, no hover scaling.

## 6. Banned Practices

- Glass panels, glows, gradient blobs, gradient text and backdrop blur.
- Infinite or looping decorative animation.
- Colours outside the tokens, and colour on anything but a status badge.
- Angled mockups as a page's lead image when a straight screenshot exists.
- Fake interface or stock art standing in for a product that has no screenshots yet.
