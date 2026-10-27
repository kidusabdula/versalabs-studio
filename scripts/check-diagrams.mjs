#!/usr/bin/env node
// Build-time check for the architecture diagrams in src/content/diagrams/.
// Every <slug>.mmd needs a matching <slug>.svg rendered from that exact source
// (the SVG records the source's SHA-256), the slug must be a project, and the
// SVG must be inert. Rendering needs a browser, so it happens before commit
// (pnpm diagrams), never during the build; this check is what keeps the
// committed SVGs honest. No dependencies, so it runs anywhere Node does.

import fs from 'node:fs';
import path from 'node:path';
import { DIAGRAM_DIR, PROJECT_DIR, hashInSvg, problemsIn, sourceHash } from './diagrams-shared.mjs';

const files = fs.existsSync(DIAGRAM_DIR) ? fs.readdirSync(DIAGRAM_DIR) : [];
const errors = [];
let checked = 0;

for (const file of files) {
  const ext = path.extname(file);
  const slug = path.basename(file, ext);
  if (ext === '.svg') {
    if (!files.includes(`${slug}.mmd`)) errors.push(`${file}: no ${slug}.mmd source next to it`);
    continue;
  }
  if (ext !== '.mmd') {
    errors.push(`${file}: only .mmd sources and their rendered .svg files belong here`);
    continue;
  }

  checked += 1;
  if (!fs.existsSync(path.join(PROJECT_DIR, `${slug}.ts`))) {
    errors.push(`${file}: no project src/content/projects/${slug}.ts`);
  }
  const svgPath = path.join(DIAGRAM_DIR, `${slug}.svg`);
  if (!fs.existsSync(svgPath)) {
    errors.push(`${file}: not rendered yet (run pnpm diagrams ${slug})`);
    continue;
  }
  const svg = fs.readFileSync(svgPath, 'utf8');
  const source = fs.readFileSync(path.join(DIAGRAM_DIR, file), 'utf8');
  for (const problem of problemsIn(svg)) errors.push(`${slug}.svg ${problem}`);
  const recorded = hashInSvg(svg);
  if (recorded && recorded !== sourceHash(source)) {
    errors.push(`${slug}.svg is older than ${file} (run pnpm diagrams ${slug})`);
  }
}

if (errors.length) {
  console.error(`check-diagrams: ${errors.length} problem(s)\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(`check-diagrams: ${checked} diagram(s) OK`);
