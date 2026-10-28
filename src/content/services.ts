import { getProjectBySlug, getProjectsInSection, projectPath } from './projects';
import type { PROJECT_TYPES } from '@/lib/contact-schema';

// What VersaLabs builds for clients, shown on the home page and on /services.
// Each service names example pages from src/content/projects by slug, so a
// removed or hidden project can't leave a dead link: the build fails instead
// (see serviceExamples). Plain business language only
// (docs/05-CONTENT-TONE-GUIDE.md).

export interface ExampleLink {
  slug: string;
  href: string;
  name: string;
}

export interface Service {
  // Also the contact form's project type, so "Talk to Us" on /services can
  // preselect it (/contact?service=erp).
  id: Exclude<keyof typeof PROJECT_TYPES, 'custom'>;
  // The service's name in a sentence ("Talk to Us About Online Stores").
  short: string;
  title: string;
  promise: string;
  description: string;
  benefits: string[];
  examples: string[];
}

export const SERVICES: Service[] = [
  {
    id: 'erp',
    short: 'Custom ERP',
    title: 'Custom ERP and Business Systems',
    promise: 'One place to run sales, stock, production and accounts.',
    description:
      'We set up a business system around the way your company already works, so your team stops juggling spreadsheets, paper and chat threads. You can start from Obsidian ERP or have one made for you.',
    benefits: [
      'Customers, quotes, orders and invoices in one place',
      'Stock you can trust across every store and warehouse',
      'Production and purchasing that follow your own process',
      'Reports your managers can read at a glance',
    ],
    examples: ['obsidian-erp', 'oskaz-ecommerce'],
  },
  {
    id: 'ecommerce',
    short: 'Online Stores',
    title: 'Online Stores and Ordering',
    promise: 'Sell online, take orders and get paid, the way your customers like to pay.',
    description:
      'We build online stores and ordering sites that look like your brand, work well on a phone and take local payment methods or cash on delivery. Orders can go straight into the system you already use.',
    benefits: [
      'A store that looks like your brand, not a template',
      'Local payment methods and cash on delivery',
      'Real stock and prices, straight from your business system',
      'Order updates for your customers and your team',
    ],
    examples: ['oskaz-ecommerce', 'printonline-et', 'tamem-kitfo', 'minab-clothing'],
  },
  {
    id: 'website',
    short: 'Websites',
    title: 'Websites',
    promise: 'A website that explains who you are and brings people in.',
    description:
      'We design and build websites for companies, organisations and events, in English and Amharic where you need both. You can update the content yourself, and the site is easy to find on search engines.',
    benefits: [
      'Designed around your brand and your audience',
      'English and Amharic where you need both',
      'Content your team can update without us',
      'Fast on a phone and easy to find on search engines',
    ],
    examples: ['live-addis', 'pana-sport', 'pavilion-360', 'unlock-ethiopia-potential'],
  },
  {
    id: 'ai',
    short: 'AI Tools',
    title: 'AI Tools',
    promise: 'AI that takes a repetitive job off your team’s hands.',
    description:
      'We add AI where it saves real time: checking content, flagging what needs attention, and writing summaries in plain language. If a simpler tool does the job better, we say so.',
    benefits: [
      'Checks and alerts that run without someone watching',
      'Plain-language summaries your team can act on',
      'Privacy first: data stays where it should',
      'Built around one clear job, not a demo',
    ],
    examples: ['safeframe'],
  },
];

export interface Step {
  step: string;
  title: string;
  description: string;
}

export const HOW_WE_WORK: Step[] = [
  { step: '01', title: 'Discover', description: 'We learn how your business works, who will use the software and what success looks like for you.' },
  { step: '02', title: 'Design', description: 'You see the screens before we build them, and we agree on what each one does.' },
  { step: '03', title: 'Build', description: 'We build in short steps and show you working software along the way, so you can steer early.' },
  { step: '04', title: 'Launch', description: 'We launch it, train your team, and stay on to support and improve it, as agreed with you up front.' },
];

// The example pages a service links to, named the way a buyer knows them (the
// client's name when it differs from the project title).
export function serviceExamples(service: Service): ExampleLink[] {
  return service.examples.map((slug) => {
    const project = getProjectBySlug(slug);
    if (!project) {
      throw new Error(`Service "${service.id}" lists "${slug}" as an example, but no visible project has that slug.`);
    }
    return { slug, href: projectPath(project), name: project.client ?? project.title };
  });
}

// The businesses we've built for: client work only, never our own products,
// demos or research, each linking to its story.
export function clientLinks(): ExampleLink[] {
  return getProjectsInSection('work')
    .filter((project) => project.kind === 'client')
    .map((project) => ({ slug: project.slug, href: projectPath(project), name: project.client ?? project.title }));
}
