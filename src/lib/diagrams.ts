import fs from 'node:fs';
import path from 'node:path';

// Architecture diagrams are written in Mermaid (src/content/diagrams/<slug>.mmd)
// and rendered to SVG ahead of time by scripts/render-diagrams.mjs, so the
// Mermaid runtime never ships to the browser. scripts/check-diagrams.mjs fails
// the build when an SVG is missing or older than its source.
//
// Case study pages are generated at build time (dynamicParams = false), so this
// read happens during the build, never on a request.
const DIR = path.join(process.cwd(), 'src', 'content', 'diagrams');

export function getDiagramSvg(slug: string): string | null {
  const file = path.join(DIR, `${slug}.svg`);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
}
