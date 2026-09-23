import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject, applyCommand } from '../src/document.js';
import { applyEditorOperation, createEditorHost, projectEditorView } from '../src/editor-adapter.js';

function fixture() {
  let project = createProject({ ownerId: 'owner-1', name: 'adapter fixture' });
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'board-1', widthMm: 100, heightMm: 100 });
  project.assets['asset-1'] = {
    assetId: 'asset-1', checksum: 'fixture', byteLength: 1, mimeType: 'image/png',
    width: 1, height: 1, provenance: 'test', licenseRef: null, immutable: true,
  };
  project = applyCommand(project, { type: 'object.add', artboardId: 'board-1', objectId: 'object-1', assetId: 'asset-1' });
  return project;
}

test('editor projection is derived and cannot mutate canonical state by reference', () => {
  const project = fixture();
  const view = projectEditorView(project, 'board-1');
  view.objects[0].transform.x = 999;
  view.artboard.objectIds.length = 0;

  assert.equal(project.objects['object-1'].transform.x, 0);
  assert.deepEqual(project.artboards[0].objectIds, ['object-1']);
});

test('editor operations become canonical commands with revision history', () => {
  const project = fixture();
  const next = applyEditorOperation(project, {
    type: 'object.transform',
    expectedRevision: project.revision,
    objectId: 'object-1',
    transform: { x: 12, rotationDeg: 15 },
  });

  assert.equal(next.revision, project.revision + 1);
  assert.equal(next.objects['object-1'].transform.x, 12);
  assert.equal(next.objects['object-1'].transform.rotationDeg, 15);
  assert.equal(next.history.at(-1).type, 'object.transform');
  assert.equal(project.objects['object-1'].transform.x, 0);
});

test('stale editor events fail closed instead of overwriting newer work', () => {
  const project = fixture();
  const newer = applyCommand(project, {
    type: 'object.transform', objectId: 'object-1', transform: { x: 20 },
  });

  assert.throws(() => applyEditorOperation(newer, {
    type: 'object.transform',
    expectedRevision: project.revision,
    objectId: 'object-1',
    transform: { x: 5 },
  }), /stale editor operation/);
  assert.equal(newer.objects['object-1'].transform.x, 20);
});

test('provider-private serialized state is not an accepted operation', () => {
  const project = fixture();
  assert.throws(() => applyEditorOperation(project, {
    type: 'provider.load-json',
    expectedRevision: project.revision,
    json: { objects: [{ id: 'provider-owned' }] },
  }), /unsupported editor operation/);
});

test('host renders canonical projections after canonical dispatch', () => {
  const project = fixture();
  const renders = [];
  const adapter = { render(view) { renders.push(view); } };
  const host = createEditorHost({ project, artboardId: 'board-1', adapter });

  host.render();
  host.dispatch({
    type: 'object.transform',
    expectedRevision: project.revision,
    objectId: 'object-1',
    transform: { scaleX: 1.5, scaleY: 1.5 },
  });

  assert.equal(renders.length, 2);
  assert.equal(renders[1].revision, project.revision + 1);
  assert.equal(renders[1].objects[0].transform.scaleX, 1.5);
  assert.equal(host.getProject().objects['object-1'].transform.scaleY, 1.5);
});
