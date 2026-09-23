import { readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { join, relative } from 'node:path';
import process from 'node:process';

const roots = ['src', 'web', 'test', 'scripts'];
const files = [];

async function collect(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const child = join(path, entry.name);
    if (entry.isDirectory()) {
      await collect(child);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(relative('.', child));
    }
  }
}

for (const root of roots) await collect(root);
files.sort();

if (files.length === 0) {
  console.error('No JavaScript files discovered for syntax verification.');
  process.exit(1);
}

for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log(`Syntax verified: ${files.length} JavaScript files.`);
