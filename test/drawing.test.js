import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject, applyCommand } from '../src/document.js';
import { applyEditorOperation, createEditorHost } from '../src/editor-adapter.js';

function fixture() { let project = createProject({ ownerId: 'owner-draw', name: 'drawing fixture' }); return applyCommand(project, { type: 'artboard.add', artboardId: 'board-draw', widthMm: 100, heightMm: 100 }); }

test('stroke.add creates stable canonical artboard-mm vector data without mutating prior revision', () => {
  const project = fixture();
  const next = applyEditorOperation(project, { type: 'stroke.add', expectedRevision: project.revision, artboardId: 'board-draw', objectId: 'stroke-1', points: [{ x: 1, y: 2, pressure: 0.5 }, { x: 5, y: 8 }], style: { preset: 'round', color: '#112233', width: 3, opacity: 0.8 } });
  assert.equal(project.objects['stroke-1'], undefined); assert.deepEqual(project.artboards[0].objectIds, []); assert.equal(next.revision, project.revision + 1); assert.equal(next.history.at(-1).type, 'stroke.add'); assert.deepEqual(next.artboards[0].objectIds, ['stroke-1']); assert.equal(next.objects['stroke-1'].coordinateSpace, 'artboard-mm'); assert.deepEqual(next.objects['stroke-1'].points, [{ x: 1, y: 2, pressure: 0.5 }, { x: 5, y: 8, pressure: 1 }]); assert.deepEqual(next.objects['stroke-1'].style, { preset: 'round', color: '#112233', width: 3, opacity: 0.8 });
});

test('drawing fails closed on malformed geometry, duplicate identity, and unbounded style input', () => {
  const project = fixture();
  assert.throws(() => applyCommand(project, { type: 'stroke.add', artboardId: 'board-draw', objectId: 'bad', points: [{ x: 1, y: 2 }] }), /at least two points/);
  const base = { type: 'stroke.add', artboardId: 'board-draw', points: [{ x: 0, y: 0 }, { x: 1, y: 1 }] };
  assert.throws(() => applyCommand(project, { ...base, objectId: 'pressure', points: [{ x: 0, y: 0, pressure: -0.1 }, { x: 1, y: 1 }] }), /pressure must be between 0 and 1/);
  assert.throws(() => applyCommand(project, { ...base, objectId: 'opacity', style: { opacity: 1.1 } }), /opacity must be between 0 and 1/);
  assert.throws(() => applyCommand(project, { ...base, objectId: 'preset', style: { preset: 'unknown' } }), /unsupported stroke preset/);
  assert.throws(() => applyCommand(project, { ...base, objectId: 'color', style: { color: 'red' } }), /color must be #RRGGBB/);
  const drawn = applyCommand(project, { ...base, objectId: 'stroke-1' });
  assert.throws(() => applyCommand(drawn, { ...base, objectId: 'stroke-1' }), /object already exists/);
});

test('stale drawing event cannot overwrite a newer canonical revision', () => {
  const project = fixture(); const newer = applyCommand(project, { type: 'stroke.add', artboardId: 'board-draw', objectId: 'stroke-new', points: [{ x: 0, y: 0 }, { x: 1, y: 1 }] });
  assert.throws(() => applyEditorOperation(newer, { type: 'stroke.add', expectedRevision: project.revision, artboardId: 'board-draw', objectId: 'stroke-stale', points: [{ x: 4, y: 4 }, { x: 5, y: 5 }] }), /stale editor operation/); assert.equal(newer.objects['stroke-stale'], undefined);
});

test('host rerenders canonical stroke projection after drawing dispatch', () => {
  const project = fixture(); const renders = []; const host = createEditorHost({ project, artboardId: 'board-draw', adapter: { render(view) { renders.push(view); } } }); host.render(); host.dispatch({ type: 'stroke.add', expectedRevision: project.revision, artboardId: 'board-draw', objectId: 'stroke-1', points: [{ x: 10, y: 10 }, { x: 20, y: 20 }], style: { color: '#ffffff', width: 4 } });
  assert.equal(renders.length, 2); assert.equal(renders[1].projectId, project.projectId); assert.equal(renders[1].objects[0].objectId, 'stroke-1'); assert.equal(renders[1].objects[0].style.color, '#ffffff'); assert.equal(host.getProject().objects['stroke-1'].style.width, 4);
});
