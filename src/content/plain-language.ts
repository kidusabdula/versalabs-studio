// Words the site doesn't use. VersaLabs sells products and services to business
// owners, so the copy says what software does for them, never what it is built
// with or how it is put together (docs/05-CONTENT-TONE-GUIDE.md). Every project
// file is checked against these lists when the site builds
// (src/content/projects/index.ts), and the same lists are used to scan the
// rendered pages before a release.
//
// Add a term here rather than remembering not to write it. Each term matches
// only as a whole word, so "API" doesn't match "rapid".

// Engineering vocabulary, matched in any letter case.
export const BANNED_PHRASES: readonly string[] = [
  'architecture',
  'architectural',
  'architect',
  'architects',
  'architected',
  'multi-tenant',
  'multitenant',
  'single-tenant',
  'microservice',
  'microservices',
  'monorepo',
  'monolith',
  'serverless',
  'event-driven',
  'event sourcing',
  'domain-driven',
  'bounded context',
  'bounded contexts',
  'design pattern',
  'design patterns',
  'factory pattern',
  'repository pattern',
  'schema',
  'schemas',
  'schema-first',
  'data model',
  'webhook',
  'webhooks',
  'websocket',
  'websockets',
  'pub/sub',
  'message queue',
  'cron',
  'row level security',
  'row-level security',
  'tech stack',
  'stack',
  'edge function',
  'edge functions',
  'source code',
  'codebase',
  'model cascade',
  'cascade',
  'inference',
  'quantized',
  'embeddings',
  'isolation forest',
  'autoencoder',
  'random forest',
  'neural network',
  'neural networks',
  'language model',
  'language models',
  'model context protocol',
  'scikit-learn',
];

// Names of frameworks, languages, databases, services and models, and
// engineering acronyms. These are matched with their capitals, so ordinary
// words ("react to an alert", "a rest day") stay usable.
export const BANNED_NAMES: readonly string[] = [
  'API',
  'APIs',
  'REST',
  'GraphQL',
  'RPC',
  'RLS',
  'DDD',
  'CQRS',
  'SSR',
  'PWA',
  'CI/CD',
  'Next.js',
  'NextJS',
  'React',
  'React Native',
  'Vite',
  'Node.js',
  'NodeJS',
  'TypeScript',
  'JavaScript',
  'Python',
  'FastAPI',
  'Django',
  'Flask',
  'Tailwind',
  'Framer Motion',
  'shadcn',
  'Radix',
  'TanStack',
  'Zod',
  'Zustand',
  'Prisma',
  'tRPC',
  'Fastify',
  'Hapi',
  'Socket.io',
  'Sequelize',
  'Frappe',
  'ERPNext',
  'Supabase',
  'Firebase',
  'PostgreSQL',
  'Postgres',
  'MariaDB',
  'MySQL',
  'MongoDB',
  'Redis',
  'BullMQ',
  'SQL',
  'Docker',
  'Kubernetes',
  'Nginx',
  'Traefik',
  'Vercel',
  'Turbopack',
  'OKLCH',
  'Playwright',
  'Vitest',
  'pgTAP',
  'Mermaid',
  'Electron',
  'Tauri',
  'LLM',
  'LLMs',
  'GPT',
  'OpenAI',
  'OpenRouter',
  'Claude',
  'Anthropic',
  'Gemini',
  'MCP',
  'MobileNet',
  'MobileNetV2',
  'ViT',
  'ONNX',
  'TensorFlow',
  'Keras',
  'PyTorch',
  'Scapy',
];

const escape = (term: string) => term.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
const alternation = (terms: readonly string[]) =>
  [...terms].sort((a, b) => b.length - a.length).map(escape).join('|');
// Whole words only: no letter, digit, underscore or hyphen on either side.
const whole = (terms: readonly string[], flags: string) =>
  new RegExp(`(?<![\\p{L}\\p{N}_-])(?:${alternation(terms)})(?![\\p{L}\\p{N}_-])`, flags);

// Job titles on /about that contain a banned word. They name a person's role,
// not how anything is built, so they are skipped before matching.
export const ALLOWED_PHRASES: readonly string[] = ['full stack', 'full-stack'];

const PHRASE_PATTERN = whole(BANNED_PHRASES, 'giu');
const NAME_PATTERN = whole(BANNED_NAMES, 'gu');
const ALLOWED_PATTERN = whole(ALLOWED_PHRASES, 'giu');

// Every banned term in the text, once each, as written.
export function findBannedTerms(text: string): string[] {
  const cleaned = text.replace(ALLOWED_PATTERN, ' ');
  const found = [...cleaned.matchAll(PHRASE_PATTERN), ...cleaned.matchAll(NAME_PATTERN)].map((match) => match[0]);
  return [...new Set(found)];
}
