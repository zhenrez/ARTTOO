import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCommand, createProject } from '../src/document.js';
import { nextSemanticSelection, projectSemanticLayers } from '../src/semantic-layers.js';

function fixture() {
  let project = createProject({ ownerId: 'owner', name: 'Semantic layers fixture' });
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'primary', widthMm: 160, heightMm: 200 });
  project = applyCommand(project, { type: 'stroke.add', artboardId: 'primary', objectId: 'stroke-a', points: [{ x: 1, y: 1 }, { x: 5, y: 5 }], style: { preset: 'round', color: '#18151E', width: 1.5, opacity: 1 } });
  project = applyCommand(project, { type: 'stroke.add', artboardId: 'primary', objectId: 'stroke-b', points: [{ x: 10, y: 10 }, { x: 15, y: 15 }], style: { preset: 'round', color: '#18151E', width: 1.5, opacity: 1 } });
  return project;
}

test('semantic layers derive order and selected state from canonical artboard/object state', () => {
  const project = fixture();
  const revision = project.revision;
  const rows = projectSemanticLayers(project, 'primary', 'stroke-b');
  assert.deepEqual(rows, [
    { objectId: 'stroke-a', type: 'stroke', label: 'Stroke 1', selected: false, visible: true, locked: false },
    { objectId: 'stroke-b', type: 'stroke', label: 'Stroke 2', selected: true, visible: true, locked: false },
  ]);
  assert.equal(project.revision, revision, 'projection must not mutate canonical state');
});

test('keyboard-equivalent semantic selection traverses canonical layer order without mutation', () => {
  const project = fixture();
  const rows = projectSemanticLayers(project, 'primary');
  assert.equal(nextSemanticSelection(rows, null, 1), 'stroke-a');
  assert.equal(nextSemanticSelection(rows, 'stroke-a', 1), 'stroke-b');
  assert.equal(nextSemanticSelection(rows, 'stroke-b', 1), 'stroke-a');
  assert.equal(nextSemanticSelection(rows, 'stroke-a', -1), 'stroke-b');
  assert.equal(project.revision, 3);
});

test('semantic projection fails closed on broken canonical references', () => {
  const project = fixture();
  delete project.objects['stroke-b'];
  assert.throws(() => projectSemanticLayers(project, 'primary'), /missing object/);
  assert.throws(() => projectSemanticLayers(project, 'missing'), /artboard not found/);
});
