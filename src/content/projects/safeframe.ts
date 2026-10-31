import { defineProject } from '../schema';

// The clip SafeFrame checks in the recordings and the verdict screenshots. Its
// licence (CC BY 4.0) requires this credit wherever they appear.
const TORONTO_SKYLINE = {
  label: "Sample video",
  title: "Toronto Skyline",
  author: "Lucastphotography",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  source: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Toronto_Skyline.webm",
};

export default defineProject({
  slug: "safeframe",
  title: "SafeFrame",
  subtitle: "Private Video Safety Checks, Right on the Device",
  tagline: "Private video safety checks",
  summary: "Checks videos for inappropriate content right on the phone or laptop. Nothing is uploaded, so what a child watches stays private.",
  category: "Online Safety",
  tags: ["Child Safety", "Privacy", "AI", "Mobile"],
  year: "2026",
  status: "MVP",
  kind: "internal",
  section: "products",
  industry: ["Online Safety"],
  links: {
    live: "https://safeframe-livid.vercel.app",
  },
  scope: ["Check", "Flag", "Respond"],
  cover: "/images/safeframe/screen-home-desktop.webp",
  gallery: [
    { src: "/images/safeframe/screen-home-desktop.webp", alt: "SafeFrame home page: video safety that never leaves the device", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/safeframe/screen-detect-desktop.webp", alt: "SafeFrame check screen, ready for a video file or a link", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/safeframe/screen-verdict-desktop.webp", alt: "SafeFrame answer for a sample city clip: a timeline with no flagged moments, and no inappropriate content found", kind: "screen", width: 1440, height: 900, credit: TORONTO_SKYLINE, reviewed: true },
    { src: "/images/safeframe/screen-home-dark-desktop.webp", alt: "SafeFrame home page in the dark theme", kind: "screen", width: 1440, height: 900, reviewed: true },
    { src: "/images/safeframe/screen-home-mobile.webp", alt: "SafeFrame home page on a phone", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/safeframe/screen-detect-mobile.webp", alt: "SafeFrame check screen on a phone, ready for a file or a link", kind: "screen", width: 780, height: 1688, reviewed: true },
    { src: "/images/safeframe/screen-verdict-mobile.webp", alt: "SafeFrame answer for a sample clip on a phone: no flagged moments, and no inappropriate content found", kind: "screen", width: 780, height: 1688, credit: TORONTO_SKYLINE, reviewed: true },
  ],
  loops: [
    {
      src: "/media/safeframe/loop-verdict-desktop-960.mp4",
      poster: "/images/safeframe/screen-detect-desktop.webp",
      caption: "A real check in the browser: a link to a sample clip goes in, SafeFrame checks it on the device, and the answer is plain: no inappropriate content found.",
      view: "desktop",
      width: 960,
      height: 600,
      credit: TORONTO_SKYLINE,
      reviewed: true,
    },
    {
      src: "/media/safeframe/loop-verdict-mobile.mp4",
      poster: "/images/safeframe/screen-verdict-mobile.webp",
      caption: "The same check on a phone: the clip is checked on the device, ending on the plain answer.",
      view: "mobile",
      width: 780,
      height: 1688,
      credit: TORONTO_SKYLINE,
      reviewed: true,
    },
  ],
  description: "SafeFrame checks videos for inappropriate content on your own phone or laptop, so the video never leaves it. Drop in a video or paste a link, and you get a clear answer, a confidence score and the exact moments that were flagged.",
  need: "Parents and kids' browsers need to catch inappropriate content in videos. Sending a child's screen to an outside server is a privacy and legal risk, costs money for every user and fails offline. Many families also use older phones with little memory.",
  audience: "Parents who want to know what their children watch, and teams building apps and browsers for children that need a private video check on the device itself.",
  features: [
    { title: "Nothing Leaves the Device", image: "/images/safeframe/screen-detect-desktop.webp", description: "Videos are checked on the phone or laptop itself, with no uploads and no account." },
    { title: "See Exactly What Was Flagged", image: "/images/safeframe/screen-verdict-desktop.webp", description: "A timeline shows where flagged content starts and ends, not just a yes or no." },
    { title: "A Calm Response for Kids", description: "Choose to blur, pause, hide or skip flagged moments. A parent presses and holds to continue." },
    { title: "Works on Old and New Phones", description: "SafeFrame checks what the device can handle first, so older phones get a lighter check instead of a frozen screen." },
    { title: "Keeps Working Offline", description: "After the first visit, the check still works without an internet connection." },
    { title: "On the Web, on Android and in the Browser", description: "The same check runs on the website, in an Android app and in a browser extension that guards any video on a page." },
  ],
});
