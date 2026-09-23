import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject, applyCommand } from '../src/document.js';
import { mountBrowserEditor } from '../src/browser-editor.js';

class FakeElement {
  constructor() { this.listeners = {}; this.attributes = {}; this.children = []; this.disabled = false; this.dataset = {}; this.value = ''; this.textContent = ''; this.viewBox = { baseVal: { width: 100, height: 100 } }; }
  addEventListener(type, fn) { (this.listeners[type] ??= []).push(fn); }
  setAttribute(name, value) { this.attributes[name] = String(value); if (name === 'viewBox') { const [, , width, height] = String(value).split(' ').map(Number); this.viewBox.baseVal = { width, height }; } }
  replaceChildren(...children) { this.children = children; }
  getBoundingClientRect() { return { left: 0, top: 0, width: 200, height: 200 }; }
  emit(type, event = {}) { for (const fn of this.listeners[type] ?? []) fn({ pointerId: 1, pointerType: 'mouse', clientX: 0, clientY: 0, pressure: 0, target: this, preventDefault() {}, ...event }); }
}

function fixture() {
  let project = createProject({ ownerId: 'rotate-user', name: 'rotate fixture' });
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'board', widthMm: 100, heightMm: 100 });
  return applyCommand(project, { type: 'stroke.add', artboardId: 'board', objectId: 'stroke-1', points: [{ x: 10, y: 10 }, { x: 20, y: 20 }] });
}
function fakeDocument() { globalThis.document = { createElementNS() { return new FakeElement(); }, addEventListener() {}, removeEventListener() {} }; }

test('touch rotate previews ephemerally, commits one canonical rotation, cancel recovers, and undo restores', () => {
  fakeDocument(); const svg = new FakeElement(); const mounted = mountBrowserEditor({ project: fixture(), artboardId: 'board', svg, undoButton: new FakeElement(), redoButton: new FakeElement() });
  svg.emit('pointerdown', { pointerId: 2, clientX: 20, clientY: 20, target: svg.children[0] }); svg.emit('pointerup', { pointerId: 2, clientX: 20, clientY: 20 });
  const handle = svg.children.find((child) => child.dataset.rotateObjectId === 'stroke-1'); assert.ok(handle); assert.equal(handle.attributes['aria-label'], 'Rotate selected object');
  const revisionBefore = mounted.host.getProject().revision;
  svg.emit('pointerdown', { pointerId: 9, pointerType: 'touch', clientX: 30, clientY: 4, target: handle }); svg.emit('pointermove', { pointerId: 9, pointerType: 'touch', clientX: 56, clientY: 30 });
  assert.equal(mounted.host.getProject().revision, revisionBefore); assert.match(svg.children[0].attributes.transform, /rotate\(90\)/);
  svg.emit('pointercancel', { pointerId: 9 }); assert.equal(mounted.host.getProject().revision, revisionBefore); assert.match(svg.children[0].attributes.transform, /rotate\(0\)/);
  const handle2 = svg.children.find((child) => child.dataset.rotateObjectId === 'stroke-1'); svg.emit('pointerdown', { pointerId: 10, pointerType: 'touch', clientX: 30, clientY: 4, target: handle2 }); svg.emit('pointermove', { pointerId: 10, pointerType: 'touch', clientX: 56, clientY: 30 }); svg.emit('pointerup', { pointerId: 10, pointerType: 'touch', clientX: 56, clientY: 30 });
  assert.equal(mounted.host.getProject().revision, revisionBefore + 1); assert.equal(mounted.host.getProject().objects['stroke-1'].transform.rotationDeg, 90); assert.match(svg.children[0].attributes.transform, /rotate\(90\)/);
  mounted.host.undo(); assert.equal(mounted.host.getProject().objects['stroke-1'].transform.rotationDeg, 0); assert.match(svg.children[0].attributes.transform, /rotate\(0\)/); mounted.destroy(); delete globalThis.document;
});
