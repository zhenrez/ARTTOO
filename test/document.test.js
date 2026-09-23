import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCommand, createProject, importAsset, isApprovalCurrent, reopenProject, serializeProject } from '../src/document.js';

const source = Buffer.from('immutable tattoo source fixture');

function fixture() {
  let project = createProject({ ownerId: 'owner_fixture', name: 'Golden Journey Seed' });
  const imported = importAsset(project, { bytes: source, mimeType: 'image/png', width: 1000, height: 1000, provenance: 'test-fixture' });
  project = imported.project;
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'artboard_main', widthMm: 120, heightMm: 180 });
  project = applyCommand(project, { type: 'object.add', objectId: 'design_main', artboardId: 'artboard_main', assetId: imported.assetId });
  return { project, assetId: imported.assetId };
}

test('immutable source asset survives editing and save/reopen', () => {
  let { project, assetId } = fixture();
  const checksum = project.assets[assetId].checksum;
  project = applyCommand(project, { type: 'object.transform', objectId: 'design_main', transform: { x: 14, y: 9, scaleX: 0.8, scaleY: 0.8 } });
  const reopened = reopenProject(serializeProject(project));
  assert.equal(reopened.assets[assetId].checksum, checksum);
  assert.equal(reopened.objects.design_main.sourceAssetId, assetId);
  assert.deepEqual(reopened.objects.design_main.transform, { x: 14, y: 9, scaleX: 0.8, scaleY: 0.8, rotationDeg: 0 });
  assert.equal(reopened.revision, project.revision);
});

test('body placement is separate from source-art transform state', () => {
  let { project } = fixture();
  project = applyCommand(project, { type: 'body.add', bodyTargetId: 'body_1', kind: 'photo', coordinateFrame: 'photo-normalized', calibration: { mmPerUnit: 250 } });
  project = applyCommand(project, { type: 'placement.set', placementId: 'placement_1', objectId: 'design_main', bodyTargetId: 'body_1', frame: { u: 0.42, v: 0.31, rotationDeg: 12 }, physicalSizeMm: { width: 72, height: 96 } });
  assert.deepEqual(project.objects.design_main.transform, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotationDeg: 0 });
  assert.equal(project.placements.placement_1.objectId, 'design_main');
  assert.equal(project.placements.placement_1.physicalSizeMm.width, 72);
});

test('approval binds to exact revision and becomes stale after dependent edit', () => {
  let { project } = fixture();
  project = applyCommand(project, { type: 'review.approve', reviewId: 'approval_1', authorId: 'artist_fixture' });
  assert.equal(isApprovalCurrent(project, 'approval_1'), false, 'approval command itself advances the revision');
  const approvedRevision = project.reviews.approval_1.revision;
  assert.equal(approvedRevision, project.revision - 1);
  project = applyCommand(project, { type: 'object.transform', objectId: 'design_main', transform: { rotationDeg: 5 } });
  assert.equal(isApprovalCurrent(project, 'approval_1'), false);
});

test('duplicate source import reuses immutable asset identity', () => {
  let { project, assetId } = fixture();
  const second = importAsset(project, { bytes: source, mimeType: 'image/png', width: 1000, height: 1000, provenance: 'same-source-again' });
  assert.equal(second.assetId, assetId);
  assert.equal(second.deduplicated, true);
  assert.equal(second.project.revision, project.revision);
});
