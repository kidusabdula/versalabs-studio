import { defineProject } from '../schema';

export default defineProject({
  slug: "versalabs-ade",
  title: "VersaLabs ADE",
  subtitle: "Your Coding Agents, Side by Side, on Your Machine",
  summary: "A planned desktop workspace for developers who run several AI coding agents at once. It tells you the moment an agent finishes or needs you.",
  category: "Developer Tools",
  tags: ["Developer Tools", "AI Coding Agents", "Desktop App"],
  year: "2026",
  status: "Development",
  kind: "product",
  industry: ["Developer Tools"],
  links: {},
  heroGradient: "from-zinc-500/20 via-transparent to-neutral-500/10",
  gallery: [],
  description: "VersaLabs ADE is a planned desktop app for developers who run several AI coding agents at once. Your agents will sit side by side, each in a full terminal or a simple chat view, and ADE will tell you the moment one finishes or needs an answer. It is in development, and nothing has shipped yet.",
  need: "Developers who run several coding agents at once end up watching a wall of terminals, checking each one to see whether it has finished or is waiting on them.",
  audience: "Software developers who run several AI coding agents at the same time. It is for people who already use these agents and want one place to watch and steer them, on their own computer.",
  features: [
    { title: "Every Agent in One Window", description: "Planned: arrange the coding agents you already use in tabs, side-by-side panes or a docked layout." },
    { title: "Know the Moment an Agent Needs You", description: "Planned: badges, a dashboard, glowing panes, notifications and a taskbar flash show which agent is done or waiting." },
    { title: "Nothing Lost When You Close the App", description: "Planned: your agents keep working when you close or update the app, and pick up where they left off." },
    { title: "Chat or Terminal, Your Choice", description: "Planned: talk to an agent like a chat app, then switch to its terminal in the same session." },
    { title: "Agents That Don't Step on Each Other", description: "Planned: each agent works in its own copy of your project, with a built-in browser and a view of every change it makes." },
    { title: "Your Tools, Your Accounts", description: "Planned: ADE opens the agent tools you already have installed and never handles your sign-in." },
  ],
});
