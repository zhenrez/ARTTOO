import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject, applyCommand } from '../src/document.js';
import { createEditorHost } from '../src/editor-adapter.js';

function fixture() {
  let project = createProject({ ownerId: 'owner-undo', name: 'undo fixture' });
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'board-undo', widthMm: 100, heightMm: 100 });
  return project;
}

function hostFor(project) {
  const renders = [];
  return { host: createEditorHost({ project, artboardId: 'board-undo', adapter: { render(view) { renders.push(view); } } }), renders };
}

test('undo and redo drawing remain canonical revisions with stable stroke identity', () => {
  const project = fixture();
  const { host, renders } = hostFor(project);
  const drawn = host.dispatch({ type: 'stroke.add', expectedRevision: project.revision, artboardId: 'board-undo', objectId: 'stroke-undo', points: [{ x: 1, y: 1 }, { x: 2, y: 2 }] });
  assert.equal(drawn.objects['stroke-undo'].objectId, 'stroke-undo');
  assert.equal(host.canUndo(), true); assert.equal(host.canRedo(), false);
  const undone = host.undo();
  assert.equal(undone.objects['stroke-undo'], undefined); assert.deepEqual(undone.artboards[0].objectIds, []); assert.equal(undone.history.at(-1).type, 'object.remove');
  assert.equal(host.canUndo(), false); assert.equal(host.canRedo(), true);
  const redone = host.redo();
  assert.equal(redone.objects['stroke-undo'].objectId, 'stroke-undo'); assert.equal(redone.history.at(-1).type, 'stroke.add');
  assert.equal(redone.revision, project.revision + 3); assert.equal(renders.at(-1).objects[0].objectId, 'stroke-undo');
});

test('undo and redo transform restore exact canonical transform', () => {
  let project = fixture();
  project = applyCommand(project, { type: 'stroke.add', artboardId: 'board-undo', objectId: 'stroke-transform', points: [{ x: 0, y: 0 }, { x: 3, y: 3 }] });
  const before = structuredClone(project.objects['stroke-transform'].transform);
  const { host } = hostFor(project);
  const moved = host.dispatch({ type: 'object.transform', expectedRevision: project.revision, objectId: 'stroke-transform', transform: { x: 12, y: 8, rotationDeg: 30 } });
  const after = structuredClone(moved.objects['stroke-transform'].transform);
  assert.notDeepEqual(after, before);
  assert.deepEqual(host.undo().objects['stroke-transform'].transform, before);
  assert.deepEqual(host.redo().objects['stroke-transform'].transform, after);
});

test('new edit after undo invalidates redo branch', () => {
  const project = fixture();
  const { host } = hostFor(project);
  host.dispatch({ type: 'stroke.add', expectedRevision: project.revision, artboardId: 'board-undo', objectId: 'stroke-a', points: [{ x: 0, y: 0 }, { x: 1, y: 1 }] });
  const undone = host.undo();
  assert.equal(host.canRedo(), true);
  host.dispatch({ type: 'stroke.add', expectedRevision: undone.revision, artboardId: 'board-undo', objectId: 'stroke-b', points: [{ x: 2, y: 2 }, { x: 3, y: 3 }] });
  assert.equal(host.canRedo(), false); assert.equal(host.getProject().objects['stroke-a'], undefined); assert.ok(host.getProject().objects['stroke-b']);
});

test('object.remove fails closed when placement depends on the object', () => {
  let project = fixture();
  project = applyCommand(project, { type: 'stroke.add', artboardId: 'board-undo', objectId: 'stroke-placed', points: [{ x: 0, y: 0 }, { x: 1, y: 1 }] });
  project = applyCommand(project, { type: 'body.add', bodyTargetId: 'body-1', kind: 'photo', coordinateFrame: 'body' });
  project = applyCommand(project, { type: 'placement.set', placementId: 'placement-1', objectId: 'stroke-placed', bodyTargetId: 'body-1', frame: {} });
  assert.throws(() => applyCommand(project, { type: 'object.remove', objectId: 'stroke-placed' }), /cannot remove placed object/);
});
