import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

test('ARTTOO ships an autonomous quality gate tied to the full product standard', () => {
  const manifestPath = resolve(root, 'validation/arttoo-standard.json');
  assert.equal(existsSync(manifestPath), true, 'validation/arttoo-standard.json must exist');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const ids = new Set(manifest.productBar.map((item) => item.id));
  for (const id of [
    'editor-core',
    'virtual-try-on',
    'tattoo-generation',
    'cover-up-planning',
    'artist-profiles',
    'design-marketplace',
    'scheduling',
    'platform-payments',
    'artist-payouts',
    'autonomous-company-operations',
  ]) assert.equal(ids.has(id), true, `missing product-bar capability: ${id}`);

  assert.equal(manifest.execution.currentTask, 'task-2-editor-core');
  assert.equal(manifest.execution.nextBoundedUnit, 'task-2b-raster-corrections');
  assert.equal(manifest.execution.marketplaceBlockedUntil, 'task-6-pre-marketplace-acceptance');
});

test('package verification includes the autonomous ARTTOO validator', () => {
  const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
  assert.equal(pkg.scripts.validate, 'node scripts/validate-arttoo.mjs');
  assert.match(pkg.scripts.check, /npm run validate/);
});
