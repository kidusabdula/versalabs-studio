import { defineProject } from '../schema';

// Images: Media's clean cart captures from production 3b50c35 (rig 6401826), signed out, with no prices, badges,
// stars or personal data; they replace mockup-06, mockup-08 and screen-05, which failed Media's text check
// ("Fast Delivery", "Free Shipping", "Secure Checkout"). The store no longer shows prices (OSKAZ PR #2, 2026-10-28:
// "Our sales team confirms prices before delivery"), so the copy no longer says customers see them. No live link
// until the store's open endpoints are fixed (studio handoff, "Still Open").
// The ERP behind the store was deleted on 2026-10-29 and the store's link to it is broken, so the story describes what
// we built (a store backed by the company's ERP for its catalogue and orders) in the past tense, and nothing says the
// store is connected to an ERP now (coordinator, 2026-10-31).
export default defineProject({
  slug: "oskaz-ecommerce",
  title: "OSKAZ E-Commerce",
  subtitle: "An Online Store Built on the Company ERP",
  summary: "An online store that let OSKAZ Import's customers order online, not just by phone. Its products and stock came from the company's ERP, and every order went there for the sales team.",
  category: "E-Commerce",
  tags: ["Online Store", "ERP", "Retail", "Cash on Delivery"],
  year: "2025",
  status: "Production",
  kind: "client",
  client: "OSKAZ Import",
  industry: ["E-Commerce"],
  links: {},
  cover: "/images/oskaz-ecommerce/screen-cart-items-desktop.webp",
  gallery: [
    { src: "/images/oskaz-ecommerce/screen-cart-items-desktop.webp", alt: "OSKAZ shopping cart with a wall-mount kiosk, beside an order summary that says the sales team confirms prices before delivery", kind: "screen", width: 2880, height: 1800, reviewed: true },
    { src: "/images/oskaz-ecommerce/screen-cart-items-mobile.webp", alt: "OSKAZ shopping cart on a phone, with cash on delivery and the kiosk in Your Selection with its quantity controls", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/oskaz-ecommerce/screen-cart-summary-mobile.webp", alt: "OSKAZ order summary on a phone: the sales-team note on prices, Proceed to Checkout and the cash on delivery card", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/oskaz-ecommerce/screen-02.webp", alt: "OSKAZ store location on a phone, with a map and an address you can copy", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/oskaz-ecommerce/screen-cart-desktop.webp", alt: "OSKAZ shopping cart for a signed-out visitor, empty, with buttons to explore products or return home", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/oskaz-ecommerce/screen-cart-mobile.webp", alt: "OSKAZ empty shopping cart on a phone, for a signed-out visitor", kind: "screen", width: 780, height: 1688, reviewed: true },
  ],
  description: "OSKAZ Import sells interactive displays, power and automation products in Ethiopia. We built it an online store backed by its ERP: customers saw real stock, ordered in a few clicks and paid on delivery, and the sales team confirmed prices before delivery.",
  need: "OSKAZ kept its products, prices and stock in its ERP, but customers could only order by phone or in person. The company wanted to sell online without its staff keeping a second system up to date.",
  delivered: "An online store that took its products and stock from the company's ERP, so nobody kept the website up to date by hand. Customers filled a cart and paid on delivery, and the sales team confirmed prices before delivery. Each order reached the ERP as a sales order, ready for the sales team, and customers could follow their past orders from their account.",
  features: [
    { title: "Catalogue From the ERP", description: "Products and stock came from the ERP, so nobody updated the website by hand." },
    { title: "Orders Straight to Sales", description: "Every web order reached the ERP as a sales order, ready for the sales team." },
    { title: "No Re-Typing Customer Details", description: "When a customer signed up, their account was created in the ERP automatically." },
    { title: "Pay on Delivery", description: "Customers ordered online and paid when the goods arrived." },
  ],
});
