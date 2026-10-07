import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCommand, createProject, reopenProject, serializeProject } from '../src/document.js';

function seed() {
  let project = createProject({ ownerId: 'owner_task2c', name: 'Task 2c fixture' });
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'board', widthMm: 120, heightMm: 180 });
  return project;
}

test('shape, path and text are canonical mixed-media objects that survive save/reopen', () => {
  let project = seed();
  project = applyCommand(project, {
    type: 'shape.add', objectId: 'shape_rect', artboardId: 'board', shape: 'rect',
    geometry: { x: 10, y: 12, width: 40, height: 25 },
    paint: { fill: '#ffffff', stroke: '#112233', strokeWidth: 2, opacity: 0.8 }
  });
  project = applyCommand(project, {
    type: 'path.add', objectId: 'path_line', artboardId: 'board',
    points: [{ x: 2, y: 3 }, { x: 20, y: 30 }, { x: 35, y: 12 }], closed: true,
    paint: { fill: 'none', stroke: '#abcdef', strokeWidth: 1.5 }
  });
  project = applyCommand(project, {
    type: 'text.add', objectId: 'text_label', artboardId: 'board', text: 'Tattoo',
    x: 15, y: 24,
    style: { fontFamily: 'sans-serif', fontSize: 18, fontWeight: 700, fontStyle: 'italic',
      fill: '#010203', opacity: 0.9, letterSpacing: 0.5, lineHeight: 1.25, textAnchor: 'middle' }
  });

  const reopened = reopenProject(serializeProject(project));
  assert.deepEqual(reopened.artboards[0].objectIds, ['shape_rect', 'path_line', 'text_label']);
  assert.deepEqual(reopened.objects.shape_rect.geometry, { x: 10, y: 12, width: 40, height: 25 });
  assert.equal(reopened.objects.shape_rect.paint.fill, '#ffffff');
  assert.deepEqual(reopened.objects.path_line.points[1], { x: 20, y: 30 });
  assert.equal(reopened.objects.path_line.closed, true);
  assert.equal(reopened.objects.text_label.text, 'Tattoo');
  assert.equal(reopened.objects.text_label.style.fontWeight, 700);
  assert.equal(reopened.objects.text_label.position.x, 15);
});

test('Task 2c canonical validators reject malformed shape/path/text state', () => {
  const project = seed();
  assert.throws(() => applyCommand(project, {
    type: 'shape.add', artboardId: 'board', shape: 'rect',
    geometry: { x: 0, y: 0, width: 0, height: 10 }
  }), /shape dimensions must be positive/);
  assert.throws(() => applyCommand(project, {
    type: 'path.add', artboardId: 'board', points: [{ x: 0, y: 0 }]
  }), /path requires at least two points/);
  assert.throws(() => applyCommand(project, {
    type: 'text.add', artboardId: 'board', text: ''
  }), /text is required/);
  assert.throws(() => applyCommand(project, {
    type: 'text.add', artboardId: 'board', text: 'x', style: { fill: 'red' }
  }), /text fill must be #RRGGBB/);
});

test('shape/path/text retain ordinary reversible transform semantics without mutating content', () => {
  let project = seed();
  project = applyCommand(project, {
    type: 'text.add', objectId: 'text', artboardId: 'board', text: 'Keep me', x: 1, y: 2
  });
  const before = structuredClone(project.objects.text);
  project = applyCommand(project, {
    type: 'object.transform', objectId: 'text',
    transform: { x: 22, y: 31, scaleX: -1, scaleY: 1.2, rotationDeg: 15 }
  });
  assert.equal(project.objects.text.text, before.text);
  assert.deepEqual(project.objects.text.position, before.position);
  assert.deepEqual(project.objects.text.transform, { x: 22, y: 31, scaleX: -1, scaleY: 1.2, rotationDeg: 15 });
});
