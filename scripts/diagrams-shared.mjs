// Shared by render-diagrams.mjs (run by hand) and check-diagrams.mjs (run by
// every build), so both agree on where diagrams live, how a source is hashed and
// what a safe SVG looks like.

import { createHash } from 'node:crypto';
import path from 'node:path';

export const ROOT = path.join(import.meta.dirname, '..');
export const DIAGRAM_DIR = path.join(ROOT, 'src', 'content', 'diagrams');
export const PROJECT_DIR = path.join(ROOT, 'src', 'content', 'projects');

// Line endings are normalised so a Windows checkout (CRLF) and the Linux build
// (LF) hash the same source to the same value.
export function sourceHash(source) {
  return createHash('sha256').update(source.replace(/\r\n/g, '\n')).digest('hex');
}

export function hashInSvg(svg) {
  return svg.match(/^<svg[^>]*\sdata-source-sha256="([0-9a-f]{64})"/)?.[1] ?? null;
}

// The SVG is inlined into the page, so it must be inert: no scripts, event
// handlers, embedded HTML, external references or stylesheets of its own (the
// site's CSS styles it, see .diagram in src/app/globals.css).
export function problemsIn(svg) {
  const problems = [];
  if (!svg.startsWith('<svg ')) problems.push('does not start with <svg');
  if (!hashInSvg(svg)) problems.push('has no data-source-sha256 on the root <svg>');
  if (!/<title[\s>]/.test(svg)) problems.push('has no <title> (add accTitle to the source)');
  const banned = [
    [/<script/i, '<script>'],
    [/<foreignObject/i, '<foreignObject> (labels must be SVG text)'],
    [/<style/i, '<style>'],
    [/<image/i, '<image>'],
    [/javascript:/i, 'a javascript: URL'],
    [/\son[a-z]+\s*=/i, 'an on* event handler'],
    [/\s(?:xlink:)?href\s*=\s*"(?!#)/i, 'an external href'],
    [/url\((?!#)/i, 'an external url()'],
  ];
  for (const [pattern, name] of banned) if (pattern.test(svg)) problems.push(`contains ${name}`);
  return problems;
}
