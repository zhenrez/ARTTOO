import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCommand, createProject } from '../src/document.js';
import { applyEditorOperation } from '../src/editor-adapter.js';

function fixture() {
  let project = createProject({ ownerId: 'artist' });
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'board', widthMm: 100, heightMm: 100 });
  for (const id of ['a','b','c']) project = applyCommand(project, { type: 'stroke.add', artboardId: 'board', objectId: id, points: [{x:1,y:1},{x:2,y:2}] });
  return project;
}

test('canonical layer state supports visibility, locking and deterministic reorder', () => {
  let project = fixture();
  project = applyCommand(project, { type: 'object.visibility', objectId: 'b', visible: false });
  project = applyCommand(project, { type: 'object.lock', objectId: 'b', locked: true });
  project = applyCommand(project, { type: 'object.reorder', artboardId: 'board', objectId: 'c', toIndex: 0 });
  assert.equal(project.objects.b.visible, false);
  assert.equal(project.objects.b.locked, true);
  assert.deepEqual(project.artboards[0].objectIds, ['c','a','b']);
  assert.throws(() => applyCommand(project, { type: 'object.reorder', artboardId: 'board', objectId: 'a', toIndex: 9 }), /toIndex/);
});

test('editor layer operations reject stale revisions and become canonical state', () => {
  let project = fixture();
  project = applyEditorOperation(project, { type: 'object.visibility', expectedRevision: project.revision, objectId: 'a', visible: false });
  assert.equal(project.objects.a.visible, false);
  const stale = project.revision - 1;
  assert.throws(() => applyEditorOperation(project, { type: 'object.lock', expectedRevision: stale, objectId: 'a', locked: true }), /stale editor operation/);
  project = applyEditorOperation(project, { type: 'object.lock', expectedRevision: project.revision, objectId: 'a', locked: true });
  assert.equal(project.objects.a.locked, true);
});
