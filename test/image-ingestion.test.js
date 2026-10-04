import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject, applyCommand, verifyAssetSource } from '../src/document.js';
import { createMemoryAssetStore } from '../src/asset-store.js';
import { ingestImageAsset } from '../src/image-ingestion.js';

test('image ingestion preserves immutable bytes and inserts an editable canonical image object', async () => {
  const store = createMemoryAssetStore();
  let project = createProject({ ownerId: 'artist', name: 'import fixture' });
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'primary', widthMm: 160, heightMm: 200 });
  const bytes = new Uint8Array([137, 80, 78, 71, 1, 2, 3, 4]);

  const result = await ingestImageAsset(project, {
    bytes, mimeType: 'image/png', width: 1200, height: 800, provenance: 'user-upload'
  }, store, { artboardId: 'primary', objectId: 'imported-design' });

  assert.equal(result.project.objects['imported-design'].type, 'image');
  assert.equal(result.project.objects['imported-design'].sourceAssetId, result.assetId);
  assert.deepEqual(result.project.objects['imported-design'].transform, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotationDeg: 0 });
  assert.deepEqual(await verifyAssetSource(result.project, result.assetId, store), bytes);
  assert.equal(result.project.assets[result.assetId].provenance, 'user-upload');
});

test('image ingestion rejects non-image MIME types without mutating the project', async () => {
  const store = createMemoryAssetStore();
  let project = createProject({ ownerId: 'artist' });
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'primary', widthMm: 160, heightMm: 200 });
  const revision = project.revision;
  await assert.rejects(() => ingestImageAsset(project, {
    bytes: new Uint8Array([1]), mimeType: 'text/plain', width: 1, height: 1, provenance: 'user-upload'
  }, store, { artboardId: 'primary' }), /image MIME type/);
  assert.equal(project.revision, revision);
});
