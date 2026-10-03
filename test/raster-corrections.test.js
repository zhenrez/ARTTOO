import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCommand, createProject, reopenProject, serializeProject } from '../src/document.js';

function imageFixture() {
  let project = createProject({ ownerId: 'artist' });
  project = applyCommand(project, {
    type: 'artboard.add',
    artboardId: 'board',
    widthMm: 160,
    heightMm: 200,
  });
  project.assets.asset = {
    assetId: 'asset',
    checksum: 'fixture',
    byteLength: 1,
    mimeType: 'image/png',
    width: 1000,
    height: 800,
    provenance: 'fixture',
    licenseRef: null,
    immutable: true,
  };
  project = applyCommand(project, {
    type: 'object.add',
    artboardId: 'board',
    objectId: 'image',
    assetId: 'asset',
  });
  return project;
}

test('image crop is normalized, non-destructive canonical state', () => {
  const original = imageFixture();
  const cropped = applyCommand(original, {
    type: 'object.crop',
    objectId: 'image',
    crop: { x: 0.1, y: 0.2, width: 0.7, height: 0.6 },
  });

  assert.deepEqual(cropped.objects.image.crop, {
    x: 0.1,
    y: 0.2,
    width: 0.7,
    height: 0.6,
  });
  assert.equal(original.objects.image.crop, undefined);
  assert.deepEqual(cropped.assets.asset, original.assets.asset);
  assert.equal(cropped.assets.asset.immutable, true);
});

test('crop rejects destructive or out-of-bounds rectangles', () => {
  const project = imageFixture();
  for (const crop of [
    { x: -0.1, y: 0, width: 1, height: 1 },
    { x: 0, y: 0, width: 0, height: 1 },
    { x: 0.5, y: 0, width: 0.6, height: 1 },
    { x: 0, y: 0.8, width: 1, height: 0.3 },
  ]) {
    assert.throws(
      () => applyCommand(project, { type: 'object.crop', objectId: 'image', crop }),
      /crop/,
    );
  }
});

test('crop persists across save/reopen and can be explicitly cleared', () => {
  let project = imageFixture();
  project = applyCommand(project, {
    type: 'object.crop',
    objectId: 'image',
    crop: { x: 0.125, y: 0.125, width: 0.75, height: 0.75 },
  });
  const reopened = reopenProject(serializeProject(project));
  assert.deepEqual(reopened.objects.image.crop, project.objects.image.crop);

  const cleared = applyCommand(reopened, {
    type: 'object.crop',
    objectId: 'image',
    crop: null,
  });
  assert.equal(cleared.objects.image.crop, undefined);
});
