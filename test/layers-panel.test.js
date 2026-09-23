import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject, applyCommand } from '../src/document.js';
import { mountLayersPanel } from '../src/layers-panel.js';

class FakeElement {
  constructor() { this.listeners = {}; this.children = []; this.dataset = {}; this.attributes = {}; this.textContent = ''; }
  addEventListener(type, fn) { (this.listeners[type] ??= []).push(fn); }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  replaceChildren(...children) { this.children = children; }
  emit(type, event = {}) {
    if (!('key' in event)) event.key = '';
    if (!event.preventDefault) event.preventDefault = function preventDefault() { this.prevented = true; };
    for (const fn of this.listeners[type] ?? []) fn(event);
  }
}

test('visible semantic layers synchronize selection and keyboard traversal without canonical mutation', () => {
  globalThis.document = { createElement() { return new FakeElement(); } };
  let project = createProject({ ownerId: 'layers-user', name: 'layers fixture' });
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'board', widthMm: 100, heightMm: 100 });
  project = applyCommand(project, { type: 'stroke.add', artboardId: 'board', objectId: 'stroke-a', points: [{ x: 1, y: 1 }, { x: 2, y: 2 }] });
  project = applyCommand(project, { type: 'stroke.add', artboardId: 'board', objectId: 'stroke-b', points: [{ x: 3, y: 3 }, { x: 4, y: 4 }] });
  const revision = project.revision; let selected = null; const list = new FakeElement();
  const panel = mountLayersPanel({ projectSource: () => project, artboardId: 'board', selectedObjectId: () => selected, selectObject: (id) => { selected = id; }, list });
  assert.deepEqual(list.children.map((item) => item.textContent), ['Stroke 1', 'Stroke 2']);
  list.children[1].emit('click'); assert.equal(selected, 'stroke-b'); assert.equal(list.children[1].attributes['aria-selected'], 'true');
  const up = { key: 'ArrowUp', preventDefault() { this.prevented = true; } }; list.emit('keydown', up); assert.equal(up.prevented, true); assert.equal(selected, 'stroke-a'); assert.equal(list.children[0].attributes['aria-selected'], 'true');
  const down = { key: 'ArrowDown', preventDefault() { this.prevented = true; } }; list.emit('keydown', down); assert.equal(down.prevented, true); assert.equal(selected, 'stroke-b');
  assert.equal(project.revision, revision);
  panel.destroy(); delete globalThis.document;
});
