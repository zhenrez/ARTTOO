import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCommand, createProject, importAsset, verifyAssetSource } from '../src/document.js';
import { createMemoryAssetStore } from '../src/asset-store.js';
import { loadDraft, removeDraft, saveDraft } from '../src/local-draft.js';

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key)
  };
}

async function projectFixture(assetStore = createMemoryAssetStore()) {
  let project = createProject({ ownerId: 'owner_local', name: 'Local draft fixture' });
  const imported = await importAsset(project, { bytes: new TextEncoder().encode('source'), mimeType: 'image/png', width: 400, height: 600, provenance: 'fixture' }, assetStore);
  project = imported.project;
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'board', widthMm: 100, heightMm: 150 });
  project = applyCommand(project, { type: 'object.add', objectId: 'design', artboardId: 'board', assetId: imported.assetId });
  project = applyCommand(project, { type: 'body.add', bodyTargetId: 'body', kind: 'photo', coordinateFrame: 'photo-pixels', calibration: { mmPerPixel: 0.25 } });
  project = applyCommand(project, { type: 'placement.set', placementId: 'placement', objectId: 'design', bodyTargetId: 'body', frame: { x: 20, y: 30, rotationDeg: 4 }, physicalSizeMm: { width: 80, height: 120 } });
  return { project, assetId: imported.assetId, assetStore };
}

test('local draft restores semantic project state and immutable source remains retrievable', async () => {
  const storage = memoryStorage();
  const { project, assetId, assetStore } = await projectFixture();
  const receipt = saveDraft(storage, project);
  const restored = loadDraft(storage, project.projectId);
  const recovered = await verifyAssetSource(restored, assetId, assetStore);

  assert.equal(receipt.revision, project.revision);
  assert.deepEqual(restored, project);
  assert.deepEqual(recovered, new TextEncoder().encode('source'));
  assert.equal(restored.objects.design.sourceAssetId, project.objects.design.sourceAssetId);
  assert.deepEqual(restored.placements.placement, project.placements.placement);
  assert.deepEqual(restored.bodyTargets.body.calibration, { mmPerPixel: 0.25 });
});

test('missing and removed drafts fail closed as absent rather than reconstructed state', async () => {
  const storage = memoryStorage();
  const { project } = await projectFixture();
  assert.equal(loadDraft(storage, project.projectId), null);
  saveDraft(storage, project);
  removeDraft(storage, project.projectId);
  assert.equal(loadDraft(storage, project.projectId), null);
});
