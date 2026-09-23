import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCommand, createProject } from '../src/document.js';
import { ACTIVE_PROJECT_KEY, reopenWorkspace, saveWorkspace } from '../src/workspace-session.js';
import { draftKey } from '../src/local-draft.js';

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

function editedProject() {
  let project = createProject({ ownerId: 'owner', name: 'Persistence fixture' });
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'primary', widthMm: 160, heightMm: 200 });
  project = applyCommand(project, { type: 'stroke.add', artboardId: 'primary', objectId: 'stroke-1', points: [{ x: 10, y: 10, pressure: 1 }, { x: 20, y: 20, pressure: 0.5 }], style: { preset: 'round', color: '#18151E', width: 1.5, opacity: 1 } });
  project = applyCommand(project, { type: 'object.transform', objectId: 'stroke-1', transform: { x: 12, y: 7, rotationDeg: 15, scaleX: 1.25, scaleY: -1 } });
  return project;
}

test('fresh workspace save and reopen preserves exact canonical project and revision', () => {
  const storage = memoryStorage();
  const project = editedProject();
  const receipt = saveWorkspace(storage, project);
  const reopened = reopenWorkspace(storage);
  assert.equal(storage.getItem(ACTIVE_PROJECT_KEY), project.projectId);
  assert.equal(receipt.revision, project.revision);
  assert.equal(reopened.status, 'reopened');
  assert.equal(reopened.revision, project.revision);
  assert.deepEqual(reopened.project, project);
  assert.deepEqual(reopened.project.objects['stroke-1'].transform, project.objects['stroke-1'].transform);
});

test('missing active draft fails closed instead of reconstructing state', () => {
  const storage = memoryStorage();
  storage.setItem(ACTIVE_PROJECT_KEY, 'missing-project');
  assert.deepEqual(reopenWorkspace(storage), { status: 'missing', project: null, projectId: 'missing-project' });
});

test('corrupt active draft is retained and reported as recovery error', () => {
  const storage = memoryStorage();
  storage.setItem(ACTIVE_PROJECT_KEY, 'corrupt-project');
  storage.setItem(draftKey('corrupt-project'), '{not-json');
  const result = reopenWorkspace(storage);
  assert.equal(result.status, 'recovery-error');
  assert.equal(result.project, null);
  assert.equal(result.projectId, 'corrupt-project');
  assert.equal(storage.getItem(draftKey('corrupt-project')), '{not-json');
  assert.ok(result.error instanceof Error);
});
