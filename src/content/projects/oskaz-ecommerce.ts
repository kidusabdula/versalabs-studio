import { defineProject } from '../schema';

// Images: Media's clean cart captures from production 3b50c35 (rig 6401826), signed out, with no prices, badges,
// stars or personal data; they replace mockup-06, mockup-08 and screen-05, which failed Media's text check
// ("Fast Delivery", "Free Shipping", "Secure Checkout"). The store no longer shows prices (OSKAZ PR #2, 2026-10-28:
// "Our sales team confirms prices before delivery"), so the copy no longer says customers see them. No live link
// until the store's open endpoints are fixed (studio handoff, "Still Open").
export default defineProject({
  slug: "oskaz-ecommerce",
  title: "OSKAZ E-Commerce",
  subtitle: "An Online Store Connected Live to the Company ERP",
  summary: "OSKAZ Import's customers can now order online, not just by phone. Products and stock come live from the company's ERP, and every order lands there for the sales team.",
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
  description: "OSKAZ Import sells interactive displays, power and automation products in Ethiopia. We gave it an online store connected live to its ERP, so customers see real stock, order in a few clicks and pay on delivery, and the sales team confirms prices before delivery.",
  need: "OSKAZ kept its products, prices and stock in its ERP, but customers could only order by phone or in person. The company wanted to sell online without its staff keeping a second system up to date.",
  delivered: "An online store that takes products and stock straight from the company's ERP, so the website never goes out of date. Customers fill a cart and pay on delivery, and the sales team confirms prices before delivery. Each order arrives in the ERP as a sales order, ready for the sales team, and customers can follow their past orders from their account.",
  features: [
    { title: "Stock Always Current", description: "Products and stock come live from the ERP, so nobody updates the website by hand." },
    { title: "Orders Go Straight to Sales", description: "Every web order arrives in the ERP as a sales order, ready for the sales team." },
    { title: "No Re-Typing Customer Details", description: "When a customer signs up, their account is created in the ERP automatically." },
    { title: "Pay on Delivery", description: "Customers order online and pay when the goods arrive." },
  ],
});
