import { defineProject } from '../schema';

// Live link held: the live site shows unverified industry figures beside its 14
// real partner organisations, and whether this appears as VersaLabs work waits
// on the owner's Gensys check (proposal section 8).
export default defineProject({
  slug: "unlock-ethiopia-potential",
  title: "Unlock Ethiopia Potential",
  subtitle: "Agenda, Speakers and Registration in One Place",
  summary: "The website for a two-day Bitcoin mining summit in Addis Ababa. Visitors explore the agenda, meet the speakers and partners, and register in a few taps.",
  category: "Events",
  tags: ["Events", "Event Website", "Registration", "Bitcoin"],
  year: "2025",
  status: "Production",
  kind: "client",
  industry: ["Events", "Blockchain"],
  links: {},
  cover: "/images/unlock-ethiopia-potential/mockup-01.webp",
  gallery: [
    { src: "/images/unlock-ethiopia-potential/mockup-01.webp", alt: "Unlock Ethiopia Potential event schedule in a browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-02.webp", alt: "Unlock Ethiopia Potential event introduction text on a phone", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-03.webp", alt: "Unlock Ethiopia Potential mobile panel speaker list, phone close-up", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-04.webp", alt: "Unlock Ethiopia Potential event schedule in a steeply angled browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-05.webp", alt: "Unlock Ethiopia Potential Our Team section with speaker portraits, angled browser", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-06.webp", alt: "Unlock Ethiopia Potential home page banner in a tilted browser window", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-07.webp", alt: "Unlock Ethiopia Potential mobile schedule close-up with opening session cards", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/mockup-08.webp", alt: "Unlock Ethiopia Potential home page banner on a tilted phone", kind: "mockup", width: 1920, height: 1280, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-01.webp", alt: "Unlock Ethiopia Potential home page banner with event details, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-02.webp", alt: "Unlock Ethiopia Potential partners logo grid, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-03.webp", alt: "Unlock Ethiopia Potential team portraits and Vital Information section, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-04.webp", alt: "Unlock Ethiopia Potential event schedule with opening sessions, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-05.webp", alt: "Unlock Ethiopia Potential schedule panel discussions with speaker lists, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-06.webp", alt: "Unlock Ethiopia Potential loading screen that takes visitors to the registration form, desktop view", kind: "screen", width: 1920, height: 1080, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-07.webp", alt: "Unlock Ethiopia Potential mobile event introduction over a city photo", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-08.webp", alt: "Unlock Ethiopia Potential mobile event schedule with session cards", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-09.webp", alt: "Unlock Ethiopia Potential mobile panel discussion with speaker list", kind: "screen", width: 865, height: 1920, reviewed: true },
    { src: "/images/unlock-ethiopia-potential/screen-10.webp", alt: "Unlock Ethiopia Potential home page on a phone with a View Agenda button", kind: "screen", width: 865, height: 1920, reviewed: true },
  ],

  description: "Unlock Ethiopia Potential is the website for a two-day Bitcoin mining summit at the Hyatt Regency in Addis Ababa. It introduces the event, its speakers and its 14 partner organisations, and takes visitors straight to registration.",
  need: "The summit organisers needed a polished home for an international event, and they needed it fast. It had to present the speakers and partners clearly and move visitors to register, while the agenda kept changing until the event day.",
  delivered: "A website that introduces the summit, its speakers and its partners, with a day-by-day agenda of every session and speaker. Visitors reach the sign-up form in one tap. The agenda stayed easy to update as sessions changed, right up to the event day.",
  features: [
    { title: "A Clear Day-by-Day Agenda", description: "Every session is laid out by day, with speaker photos, titles and LinkedIn links." },
    { title: "Every Partner on Show", description: "All 14 partner logos sit in a tidy grid, each linked to its website." },
    { title: "Registration in One Tap", description: "A short loading screen takes visitors straight to the sign-up form." },
    { title: "Easy to Read on a Phone", description: "The agenda, speakers and partners read as clearly on a phone as on a desktop." },
  ],
});
