import { defineProject } from '../schema';

export default defineProject({
  slug: "tamem-kitfo",
  title: "Tamem Kitfo",
  subtitle: "Ordering and Table Bookings in English and Amharic",
  summary: "A restaurant website in English and Amharic. Customers read the menu, order, book a table or ask about catering, and staff keep the menu up to date themselves.",
  category: "Hospitality",
  tags: ["Restaurant", "English and Amharic", "Online Ordering", "Table Booking"],
  year: "2026",
  status: "Beta",
  kind: "client",
  industry: ["Hospitality"],
  client: "Tamem Kitfo",
  links: {},
  heroGradient: "from-zinc-500/20 via-transparent to-neutral-500/10",
  gallery: [],
  description: "Tamem Kitfo is a kitfo restaurant in Bole, Addis Ababa. We built it a website in English and Amharic where customers order, book a table or ask about catering from their phones, even on slow mobile data. The site is in beta ahead of handover to the owners.",
  need: "The restaurant wanted a website it could trust and run itself. Many of its customers browse in Amharic on slow mobile data, where heavy English-only sites let them down.",
  delivered: "A website in English and Amharic where customers order for pickup, delivery or dine-in, book a table, ask about catering, and check their request with a code. Staff change dishes, prices, photos and opening hours from a private dashboard, and can pause online orders at any time. A Telegram bot is ready to send each new request to the staff group for one-tap confirmation; connecting it is part of handover.",
  features: [
    { title: "Every Page in English and Amharic", description: "Customers use the whole site in the language they prefer." },
    { title: "Orders, Bookings and Catering Online", description: "Customers order for pickup, delivery or dine-in, book a table or ask about catering, then check progress with their code and phone number." },
    { title: "Staff Run the Menu Themselves", description: "Dishes, prices, photos, text and opening hours change from a private dashboard, and online orders can be paused from settings." },
    { title: "Made for Slow Connections", description: "Pages are built for weak mobile data, and if a form fails, customers get a ready-made WhatsApp message to send instead." },
  ],
});
