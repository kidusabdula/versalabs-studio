// Build check for the image rule: every file under public/images/<folder>/ and
// public/media/<folder>/ must be listed by a project in src/content/projects/,
// every listed file must exist, and each folder (and each video) stays under its
// size cap. Runs as the first step of `pnpm build`. Alt text, captions and the
// `reviewed: true` flag are enforced by the Zod schema.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'src', 'content', 'projects');
const MB = 1024 * 1024;
const ROOTS = [
  // Screenshots and mockups, served resized by next/image.
  { name: 'images', folderCap: 6 * MB },
  // Screen-recording loops, served as they are: one video stays small enough to
  // start quickly on a phone, and a project's set stays light.
  { name: 'media', folderCap: 3 * MB, fileCap: 1.5 * MB },
];
// Site-wide images that no project lists (team portraits).
const SHARED_FOLDERS = new Set(['images/team']);

const listed = new Set();
for (const file of fs.readdirSync(contentDir)) {
  if (!file.endsWith('.ts') || file === 'index.ts') continue;
  const source = fs.readFileSync(path.join(contentDir, file), 'utf8');
  for (const match of source.matchAll(/["'](\/(?:images|media)\/[^"']+)["']/g)) listed.add(match[1]);
}

const problems = [];
const onDisk = new Set();
for (const { name, folderCap, fileCap } of ROOTS) {
  const base = path.join(root, 'public', name);
  if (!fs.existsSync(base)) continue;
  for (const folder of fs.readdirSync(base)) {
    const dir = path.join(base, folder);
    if (!fs.statSync(dir).isDirectory()) {
      problems.push(`public/${name}/${folder} is a file; files live in a folder per project`);
      continue;
    }
    let bytes = 0;
    for (const file of fs.readdirSync(dir)) {
      const src = `/${name}/${folder}/${file}`;
      const size = fs.statSync(path.join(dir, file)).size;
      bytes += size;
      onDisk.add(src);
      if (!SHARED_FOLDERS.has(`${name}/${folder}`) && !listed.has(src)) problems.push(`${src} is not listed by any project`);
      if (fileCap && size > fileCap) {
        problems.push(`${src} is ${(size / MB).toFixed(1)} MB, over the ${fileCap / MB} MB cap per file`);
      }
    }
    if (bytes > folderCap) {
      problems.push(`public/${name}/${folder} is ${(bytes / MB).toFixed(1)} MB, over the ${folderCap / MB} MB cap`);
    }
  }
}
for (const src of listed) if (!onDisk.has(src)) problems.push(`${src} is listed but missing from public/`);

if (problems.length) {
  console.error(`Image check failed (${problems.length}):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`Image check passed: ${listed.size} listed files, all present and within the caps.`);
