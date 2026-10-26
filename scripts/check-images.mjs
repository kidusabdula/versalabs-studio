// Build check for the image rule: every file under public/images/<folder>/ must be
// listed by a project in src/content/projects/, every listed image must exist,
// and each folder stays under the size cap. Runs before `next build`.
// Alt text and the `reviewed: true` flag are enforced by the Zod schema.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'public', 'images');
const contentDir = path.join(root, 'src', 'content', 'projects');
const FOLDER_CAP_BYTES = 6 * 1024 * 1024;
// Site-wide images that no project lists (team portraits).
const SHARED_FOLDERS = new Set(['team']);

const listed = new Set();
for (const file of fs.readdirSync(contentDir)) {
  if (!file.endsWith('.ts') || file === 'index.ts') continue;
  const source = fs.readFileSync(path.join(contentDir, file), 'utf8');
  for (const match of source.matchAll(/["'](\/images\/[^"']+)["']/g)) listed.add(match[1]);
}

const problems = [];
const onDisk = new Set();
for (const folder of fs.readdirSync(imagesDir)) {
  const dir = path.join(imagesDir, folder);
  if (!fs.statSync(dir).isDirectory()) {
    problems.push(`public/images/${folder} is a file; images live in a folder per project`);
    continue;
  }
  let bytes = 0;
  for (const name of fs.readdirSync(dir)) {
    const src = `/images/${folder}/${name}`;
    bytes += fs.statSync(path.join(dir, name)).size;
    onDisk.add(src);
    if (!SHARED_FOLDERS.has(folder) && !listed.has(src)) problems.push(`${src} is not listed by any project`);
  }
  if (bytes > FOLDER_CAP_BYTES) {
    problems.push(`public/images/${folder} is ${(bytes / 1048576).toFixed(1)} MB, over the ${FOLDER_CAP_BYTES / 1048576} MB cap`);
  }
}
for (const src of listed) if (!onDisk.has(src)) problems.push(`${src} is listed but missing from public/`);

if (problems.length) {
  console.error(`Image check failed (${problems.length}):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`Image check passed: ${listed.size} listed images, all present and within the cap.`);
