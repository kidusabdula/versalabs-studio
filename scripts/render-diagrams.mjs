#!/usr/bin/env node
// Renders src/content/diagrams/<slug>.mmd to <slug>.svg with Mermaid in a local
// headless Chrome, so the site inlines a finished SVG and never ships Mermaid.
//
//   pnpm diagrams            render every diagram
//   pnpm diagrams safeframe  render one (or several) by slug
//
// Mermaid is downloaded once from jsDelivr at a pinned version and checked
// against a pinned SHA-384 before use. Labels are measured in Outfit, the site's
// body font, so the boxes fit the text the page draws. The output keeps
// Mermaid's structure and class names but drops its stylesheet and inline
// styles: the site's CSS (.diagram in src/app/globals.css) colours it, so one
// SVG works in any theme. Set CHROME_PATH if Chrome or Edge is not found.

import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { DIAGRAM_DIR, problemsIn, sourceHash } from './diagrams-shared.mjs';

const MERMAID_VERSION = '11.4.1';
const MERMAID_URL = `https://cdn.jsdelivr.net/npm/mermaid@${MERMAID_VERSION}/dist/mermaid.min.js`;
const MERMAID_SRI = 'sha384-rbtjAdnIQE/aQJGEgXrVUlMibdfTSa4PQju4HDhN3sR2PmaKFzhEafuePsl9H/9I';
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500&display=block';

const MERMAID_CONFIG = {
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'base',
  fontFamily: 'Outfit',
  htmlLabels: false,
  flowchart: { htmlLabels: false, curve: 'basis', padding: 16, nodeSpacing: 40, rankSpacing: 52, useMaxWidth: true },
  themeVariables: { fontFamily: 'Outfit', fontSize: '16px' },
};

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  const found = candidates.find((candidate) => candidate && fs.existsSync(candidate));
  if (!found) throw new Error('No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser.');
  return found;
}

async function mermaidScript(cacheDir) {
  const file = path.join(cacheDir, `mermaid-${MERMAID_VERSION}.min.js`);
  const integrity = (bytes) => `sha384-${createHash('sha384').update(bytes).digest('base64')}`;
  if (fs.existsSync(file) && integrity(fs.readFileSync(file)) === MERMAID_SRI) return file;
  const response = await fetch(MERMAID_URL);
  if (!response.ok) throw new Error(`Mermaid download failed: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (integrity(bytes) !== MERMAID_SRI) throw new Error('Mermaid download does not match the pinned SHA-384; refusing to run it.');
  fs.writeFileSync(file, bytes);
  return file;
}

// The page renders every diagram, then writes the result into <pre id="result">
// URI-encoded (so the DOM dump needs no unescaping), and Chrome prints the DOM.
function renderPage(sources, scriptFile) {
  const data = JSON.stringify(sources).replace(/</g, '\\u003c');
  return `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="stylesheet" href="${FONT_CSS}">
<style>body { font-family: Outfit; }</style>
</head><body>
<pre id="result"></pre>
<script id="sources" type="application/json">${data}</script>
<script src="${pathToFileURL(scriptFile).href}"></script>
<script>
(async () => {
  const finish = (value) => { document.getElementById('result').textContent = encodeURIComponent(JSON.stringify(value)); };
  try {
    await Promise.all(['400 16px Outfit', '500 16px Outfit'].map((font) => document.fonts.load(font)));
    await document.fonts.ready;
    const outfit = [...document.fonts].some((face) => face.family.replace(/["']/g, '') === 'Outfit' && face.status === 'loaded');
    if (!outfit) throw new Error('Outfit did not load, so label widths would be wrong');
    mermaid.initialize(${JSON.stringify(MERMAID_CONFIG)});
    const out = {};
    for (const { slug, source } of JSON.parse(document.getElementById('sources').textContent)) {
      out[slug] = (await mermaid.render('diagram-' + slug, source)).svg;
    }
    finish({ ok: true, out });
  } catch (error) {
    finish({ ok: false, error: String((error && error.stack) || error) });
  }
})();
</script>
</body></html>`;
}

// Drop Mermaid's stylesheet and every inline style except the root's
// max-width (which keeps the diagram at its natural size on wide screens),
// and record the source hash that check-diagrams.mjs compares against.
function finishSvg(svg, hash) {
  const withoutStyles = svg.replace(/<style>[\s\S]*?<\/style>/g, '');
  const rootEnd = withoutStyles.indexOf('>') + 1;
  const root = withoutStyles.slice(0, rootEnd).replace(/^<svg /, `<svg data-source-sha256="${hash}" `);
  const body = withoutStyles.slice(rootEnd).replace(/\sstyle="[^"]*"/g, '');
  return `${root}${body}\n`;
}

async function main() {
  const wanted = process.argv.slice(2);
  const all = fs.readdirSync(DIAGRAM_DIR).filter((file) => file.endsWith('.mmd')).map((file) => file.slice(0, -4));
  const unknown = wanted.filter((slug) => !all.includes(slug));
  if (unknown.length) throw new Error(`No source for: ${unknown.join(', ')}`);
  const slugs = wanted.length ? wanted : all;
  const sources = slugs.map((slug) => ({ slug, source: fs.readFileSync(path.join(DIAGRAM_DIR, `${slug}.mmd`), 'utf8') }));

  const cacheDir = path.join(os.tmpdir(), 'versalabs-render-diagrams');
  fs.mkdirSync(cacheDir, { recursive: true });
  const workDir = fs.mkdtempSync(path.join(cacheDir, 'run-'));
  try {
    const page = path.join(workDir, 'render.html');
    fs.writeFileSync(page, renderPage(sources, await mermaidScript(cacheDir)));
    const chrome = spawnSync(
      findChrome(),
      [
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-extensions',
        `--user-data-dir=${path.join(workDir, 'profile')}`,
        '--virtual-time-budget=30000',
        '--dump-dom',
        pathToFileURL(page).href,
      ],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 120_000 },
    );
    if (chrome.error) throw chrome.error;
    const encoded = chrome.stdout.match(/<pre id="result">([^<]*)<\/pre>/)?.[1];
    if (!encoded) throw new Error(`The render page produced no result.\n${chrome.stderr.slice(-2000)}`);
    const result = JSON.parse(decodeURIComponent(encoded));
    if (!result.ok) throw new Error(`Mermaid failed: ${result.error}`);

    for (const { slug, source } of sources) {
      const svg = finishSvg(result.out[slug], sourceHash(source));
      const problems = problemsIn(svg);
      if (problems.length) throw new Error(`${slug}.svg ${problems.join('; ')}`);
      fs.writeFileSync(path.join(DIAGRAM_DIR, `${slug}.svg`), svg);
      console.log(`render-diagrams: ${slug}.svg (${(svg.length / 1024).toFixed(1)} KB)`);
    }
  } finally {
    fs.rmSync(workDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });
  }
}

main().catch((error) => {
  console.error(`render-diagrams: ${error.message}`);
  process.exit(1);
});
