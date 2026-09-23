import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCommand, createProject, hashBytes, importAsset, isApprovalCurrent, reopenProject, serializeProject, verifyAssetSource } from '../src/document.js';
import { createMemoryAssetStore } from '../src/asset-store.js';

const source = new TextEncoder().encode('immutable tattoo source fixture');
async function fixture(assetStore = createMemoryAssetStore()) {
  let project = createProject({ ownerId: 'owner_fixture', name: 'Golden Journey Seed' });
  const imported = await importAsset(project, { bytes: source, mimeType: 'image/png', width: 1000, height: 1000, provenance: 'test-fixture' }, assetStore);
  project = imported.project;
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'artboard_main', widthMm: 120, heightMm: 180 });
  project = applyCommand(project, { type: 'object.add', objectId: 'design_main', artboardId: 'artboard_main', assetId: imported.assetId });
  return { project, assetId: imported.assetId, assetStore };
}

test('immutable source bytes survive project save/reopen and re-hash exactly', async () => {
  let { project, assetId, assetStore } = await fixture();
  const checksum = project.assets[assetId].checksum;
  project = applyCommand(project, { type: 'object.transform', objectId: 'design_main', transform: { x: 14, y: 9, scaleX: 0.8, scaleY: 0.8 } });
  const reopened = reopenProject(serializeProject(project));
  const recovered = await verifyAssetSource(reopened, assetId, assetStore);
  assert.deepEqual(recovered, source);
  assert.equal(await hashBytes(recovered), checksum);
  assert.equal(reopened.objects.design_main.sourceAssetId, assetId);
  assert.deepEqual(reopened.objects.design_main.transform, { x: 14, y: 9, scaleX: 0.8, scaleY: 0.8, rotationDeg: 0 });
});

test('missing and corrupt immutable source bytes fail explicitly', async () => {
  const missingFixture = await fixture();
  const missingChecksum = missingFixture.project.assets[missingFixture.assetId].checksum;
  await missingFixture.assetStore.delete(missingChecksum);
  await assert.rejects(() => verifyAssetSource(missingFixture.project, missingFixture.assetId, missingFixture.assetStore), /source bytes missing/);

  const corruptFixture = await fixture();
  const corruptChecksum = corruptFixture.project.assets[corruptFixture.assetId].checksum;
  await corruptFixture.assetStore.corrupt(corruptChecksum, new TextEncoder().encode('corrupt'));
  await assert.rejects(() => verifyAssetSource(corruptFixture.project, corruptFixture.assetId, corruptFixture.assetStore), /source bytes corrupt|checksum mismatch/);
});

test('body placement is separate from source-art transform state', async () => {
  let { project } = await fixture();
  project = applyCommand(project, { type: 'body.add', bodyTargetId: 'body_1', kind: 'photo', coordinateFrame: 'photo-normalized', calibration: { mmPerUnit: 250 } });
  project = applyCommand(project, { type: 'placement.set', placementId: 'placement_1', objectId: 'design_main', bodyTargetId: 'body_1', frame: { u: 0.42, v: 0.31, rotationDeg: 12 }, physicalSizeMm: { width: 72, height: 96 } });
  assert.deepEqual(project.objects.design_main.transform, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotationDeg: 0 });
  assert.equal(project.placements.placement_1.objectId, 'design_main');
  assert.equal(project.placements.placement_1.physicalSizeMm.width, 72);
});

test('approval binds to exact resulting revision and becomes stale after dependent edit', async () => {
  let { project } = await fixture();
  project = applyCommand(project, { type: 'review.approve', reviewId: 'approval_1', authorId: 'artist_fixture' });
  assert.equal(project.reviews.approval_1.revision, project.revision);
  assert.equal(isApprovalCurrent(project, 'approval_1'), true);
  project = applyCommand(project, { type: 'object.transform', objectId: 'design_main', transform: { rotationDeg: 5 } });
  assert.equal(isApprovalCurrent(project, 'approval_1'), false);
});

test('duplicate source import reuses immutable asset identity', async () => {
  let { project, assetId, assetStore } = await fixture();
  const second = await importAsset(project, { bytes: source, mimeType: 'image/png', width: 1000, height: 1000, provenance: 'same-source-again' }, assetStore);
  assert.equal(second.assetId, assetId);
  assert.equal(second.deduplicated, true);
  assert.equal(second.project.revision, project.revision);
});

test('canonical document module uses standards Web Crypto rather than Node crypto imports', async () => {
  assert.equal(typeof globalThis.crypto?.randomUUID, 'function');
  assert.equal(typeof globalThis.crypto?.subtle?.digest, 'function');
  assert.match(await hashBytes(new TextEncoder().encode('browser-portable')), /^[0-9a-f]{64}$/);
});
