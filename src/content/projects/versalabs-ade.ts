import { defineProject } from '../schema';

// VersaLabs ADE has not shipped. Every claim comes from the ADE landing page's CLAIMS.md (its C-ids are in the
// comments). Kidus's decisions (2026-10-31): the only word on price is "free during the beta", never "free" on its
// own and nothing about price after it; no roadmap; and no agent tools named, so the copy says "the agent tools you
// already use".
export default defineProject({
  slug: "versalabs-ade",
  title: "VersaLabs ADE",
  subtitle: "Your Coding Agents, Side by Side, on Your Machine", // C3
  tagline: "Coding agents, side by side",
  summary: "A planned desktop app for developers who run several AI coding agents at once. It tells you the moment an agent finishes or needs you.", // C4
  category: "Developer Tools",
  tags: ["Developer Tools", "AI Coding Agents", "Desktop App"],
  year: "2026",
  status: "Development", // C2
  kind: "product",
  industry: ["Developer Tools"],
  links: {},
  gallery: [],
  scope: ["Agents", "Terminals", "Chat", "Changes"], // C4, C9, C11
  availability: "In development, and nothing has shipped yet. It will be free during the beta.", // C2, C31

  description: "VersaLabs ADE is a planned desktop app for developers who run several AI coding agents at once. Your agents sit side by side, each in a full terminal or a simple chat view, and ADE tells you the moment one finishes or needs an answer. It is in development, and nothing has shipped yet.", // C2, C4
  need: "Developers who run several coding agents at once end up watching a wall of terminals, checking each one to see whether it has finished or is waiting on them.", // C5
  audience: "Developers who run several AI coding agents at once and want one place to watch and steer them, on their own computer. ADE opens the agent tools you have already installed and signed in to, and never handles your sign-in.", // C28, C17
  features: [
    { title: "Every Agent in One Window", stage: "planned", description: "Run the agent tools you already use side by side, in tabs, split panes and a layout you arrange. Your layout comes back the next time you open the app." }, // C6
    { title: "Know the Moment an Agent Needs You", stage: "planned", description: "When an agent finishes, hits an error or stops to ask you something, its pane lights up, a notification appears and the taskbar flashes." }, // C7
    { title: "Nothing Lost When You Close the App", stage: "planned", description: "Agents keep working when you close the window or update the app. After a restart, each agent picks its conversation back up." }, // C8
    { title: "Chat or Terminal, Your Choice", stage: "planned", description: "Talk to an agent in a view that looks like a desktop chat app, then open the same conversation in its terminal, and switch back when you like." }, // C9
    { title: "Agents That Don't Step on Each Other", stage: "planned", description: "Start each agent in its own copy of your project, on its own branch, so several can work at once without colliding." }, // C10
    { title: "Review Every Change", stage: "planned", description: "Browse your project's files and see each agent's changes side by side or inline, compared with where it started." }, // C11
  ],
});
