import { defineProject } from '../schema';

export default defineProject({
  slug: "minab-clothing",
  title: "Minab Clothing",
  subtitle: "Premium Ethiopian Fashion E-Commerce",
  summary: "A demo storefront for contemporary Ethiopian fashion. Dark and light themes, smooth animations, and a full mock shopping flow from browsing to checkout.",
  category: "E-Commerce",
  tags: ["E-Commerce", "Fashion", "Retail"],
  year: "2024",
  status: "Demo",
  kind: "internal",
  // The live demo dropped its invented facts and carries a "Demo storefront"
  // label since 2026-10-24 (Minab track), so it can be linked.
  links: { live: "https://minab-clothing.vercel.app" },
  heroGradient: "from-[#8B4513]/20 via-transparent to-[#D2B48C]/10",
  cover: "/images/minab-clothing/mockup-07.webp",
  gallery: [
    { src: "/images/minab-clothing/mockup-02.webp", alt: "Minab Clothing shopping cart with three items in a tilted browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/minab-clothing/mockup-03.webp", alt: "Minab Clothing This Week's Picks product grid on a phone against orange", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/minab-clothing/mockup-06.webp", alt: "Minab Clothing checkout shipping address step in a tilted browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/minab-clothing/mockup-07.webp", alt: "Minab Clothing shop page product grid in a browser window on a soft gradient", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/minab-clothing/mockup-08.webp", alt: "Minab Clothing This Week's Picks product grid in a tilted browser window on red", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/minab-clothing/mockup-10.webp", alt: "Minab Clothing checkout payment method step on a phone, close-up on orange", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/minab-clothing/mockup-11.webp", alt: "Minab Clothing Contact Us page with message form in a tilted browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/minab-clothing/mockup-12.webp", alt: "Minab Clothing leather jacket product page in a floating browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/minab-clothing/mockup-14.webp", alt: "Minab Clothing cart order summary on a tilted phone against orange", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/minab-clothing/mockup-15.webp", alt: "Minab Clothing product colour, size and add-to-cart options on a phone, close-up", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/minab-clothing/mockup-16.webp", alt: "Minab Clothing shopping cart on a tilted phone against orange", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/minab-clothing/screen-01.webp", alt: "Minab Clothing This Week's Picks product grid, mobile screenshot", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/minab-clothing/screen-03.webp", alt: "Minab Clothing product page with jacket photo and thumbnails, mobile screenshot", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/minab-clothing/screen-04.webp", alt: "Minab Clothing product details with colour, size and add to cart, mobile screenshot", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/minab-clothing/screen-05.webp", alt: "Minab Clothing shopping cart with three items, mobile screenshot", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/minab-clothing/screen-06.webp", alt: "Minab Clothing cart order summary with checkout button, mobile screenshot", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/minab-clothing/screen-07.webp", alt: "Minab Clothing checkout shipping address step, mobile screenshot", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/minab-clothing/screen-08.webp", alt: "Minab Clothing checkout payment method step with card form, mobile screenshot", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/minab-clothing/screen-10.webp", alt: "Minab Clothing My Orders list with order statuses, mobile screenshot", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/minab-clothing/screen-11.webp", alt: "Minab Clothing Collections page with featured collection card, mobile screenshot", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/minab-clothing/screen-13.webp", alt: "Minab Clothing order confirmation page, mobile screenshot", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/minab-clothing/screen-15.webp", alt: "Minab Clothing This Week's Picks product grid, desktop screenshot", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/minab-clothing/screen-17.webp", alt: "Minab Clothing shop page product grid with sort menu, desktop screenshot", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/minab-clothing/screen-18.webp", alt: "Minab Clothing leather jacket product page, desktop screenshot", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/minab-clothing/screen-19.webp", alt: "Minab Clothing shopping cart with order summary, desktop screenshot", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/minab-clothing/screen-20.webp", alt: "Minab Clothing checkout shipping address step, desktop screenshot", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/minab-clothing/screen-21.webp", alt: "Minab Clothing checkout review order step, desktop screenshot", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/minab-clothing/screen-22.webp", alt: "Minab Clothing order confirmation page with footer, desktop screenshot", kind: "screen", width: 1920, height: 1080, reviewed: true },
  ],
  description: "Minab Clothing is a demo storefront for contemporary Ethiopian fashion rooted in heritage craftsmanship. Built in 2024 on a mock data layer, it shows the full shopping flow with a dual-theme OKLCH color system, fluid Framer Motion transitions, and a strictly modular component structure.",
  businessProblem: "Fashion brands require more than just an 'add to cart' button; they need a digital environment that reflects the quality of their physical products. Standard templates often feel cheap and fail to provide the immersive, premium feel necessary for luxury or heritage fashion.",
  architecturalSolution: "Built on Next.js App Router, the platform employs a strict three-tier architecture (Public, Customer, Admin) and an 'Extreme Modularization' pattern. It utilizes a custom Radix-inspired UI primitive library, ensuring perfect accessibility while maintaining complete design freedom. State is managed locally with a robust mock data layer for instant interaction feedback.",
  systemFlow: "Discovery (Collections/Home) → Product Detail (SSG) → Cart Management → 3-Step Checkout Flow → Order Confirmation",
  techStack: [
    {
      label: "Frontend",
      items: [
        { name: "Next.js", version: "15.5", purpose: "App Router, SSR/SSG" },
        { name: "TypeScript", version: "5.8", purpose: "Strict mode schemas" },
        { name: "Tailwind CSS", version: "3.4", purpose: "OKLCH design tokens" },
        { name: "Framer Motion", version: "12.3", purpose: "Spring animations" },
      ],
    },
    {
      label: "Forms & State",
      items: [
        { name: "React Hook Form", version: "7.55", purpose: "Checkout and account forms" },
        { name: "Sonner", version: "2.0", purpose: "Toast notification system" },
      ],
    },
  ],
  architecture: {
    pattern: "Extreme Modularization Hybrid SSG",
    diagram: "Next.js Pages → Shared UI Primitives → Feature Components → Centralized Mock Data Layer",
    designPatterns: [
      "Three-Tier Architecture",
      "Schema-First (typefile.d.ts)",
      "Strict Import Direction (ui → shared → feature)",
    ],
  },
  boundedContexts: [
    {
      name: "Shop",
      responsibility: "Product discovery, filtering, and detail pages",
      entities: ["Product", "Collection", "Category"],
    },
    {
      name: "Account",
      responsibility: "Order history, wishlists, and shipping profiles",
      entities: ["Order", "Address", "WishlistItem"],
    },
    {
      name: "Checkout",
      responsibility: "Cart totals, promo codes, and multi-step payment",
      entities: ["Cart", "CheckoutSession"],
    },
  ],
  schema: [
    {
      name: "Product",
      description: "Fashion items with variations",
      keyFields: ["id", "name", "price", "colors", "sizes", "images"],
    },
    {
      name: "Order",
      description: "Customer purchases",
      keyFields: ["id", "status", "total", "items", "shipping_address"],
    },
  ],
  features: [
    { title: "OKLCH Dual Theme System", description: "Perceptually uniform color tokens provide perfect contrast ratios across both deep espresso dark mode and warm cream light mode." },
    { title: "Fluid Spring Animations", description: "Framer Motion powers staggered entrances, layout transitions, and interactive micro-animations for a native app feel." },
    { title: "Multi-Step Checkout", description: "A comprehensive mock checkout flow including shipping profiles, promo code validation, and order review." },
    { title: "Custom UI Primitives", description: "A Radix-inspired component library built for accessibility and the brand's own look." },
  ],
  adrs: [
    { id: "ADR-001", title: "OKLCH Color Space", status: "Accepted", rationale: "Provides predictable, accessible color scaling across light/dark themes impossible with standard RGB/HSL." },
    { id: "ADR-002", title: "Extreme Modularization", status: "Accepted", rationale: "Strict downward-only import rules prevent dependency cycles and enforce clean boundaries." },
  ],
});
