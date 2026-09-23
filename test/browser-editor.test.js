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
  emit(type, event = {}) { for (const fn of this.listeners[type] ?? []) fn({ pointerId: 1, clientX: 0, clientY: 0, pressure: 0, target: this, preventDefault() { this.prevented = true; }, ...event }); }
}

function fixture() { let project = createProject({ ownerId: 'browser-user', name: 'browser fixture' }); return applyCommand(project, { type: 'artboard.add', artboardId: 'board', widthMm: 100, heightMm: 100 }); }
function fakeDocument() { const keyListeners = []; globalThis.document = { createElementNS() { return new FakeElement(); }, addEventListener(type, fn) { if (type === 'keydown') keyListeners.push(fn); }, removeEventListener() {} }; return keyListeners; }
function transformControls() { return { fieldset: new FakeElement(), selection: new FakeElement(), x: new FakeElement(), y: new FakeElement(), rotation: new FakeElement(), apply: new FakeElement(), nudgeLeft: new FakeElement(), nudgeRight: new FakeElement() }; }

test('pointer drawing rerenders canonical stroke and controls undo/redo', () => {
  const keyListeners = fakeDocument();
  const svg = new FakeElement(); const undo = new FakeElement(); const redo = new FakeElement(); const status = { textContent: '' };
  const mounted = mountBrowserEditor({ project: fixture(), artboardId: 'board', svg, undoButton: undo, redoButton: redo, status });
  assert.equal(undo.disabled, true); assert.equal(redo.disabled, true); assert.equal(svg.children.length, 0);
  svg.emit('pointerdown', { clientX: 20, clientY: 40, pressure: 0.5 }); svg.emit('pointermove', { clientX: 80, clientY: 100, pressure: 0.7 }); svg.emit('pointerup');
  assert.equal(mounted.host.getProject().artboards[0].objectIds.length, 1); assert.equal(svg.children.length, 1); assert.match(svg.children[0].attributes.d, /^M 10 20 L 40 50$/); assert.equal(undo.disabled, false);
  undo.emit('click'); assert.equal(svg.children.length, 0); assert.equal(redo.disabled, false);
  redo.emit('click'); assert.equal(svg.children.length, 1); assert.match(status.textContent, /^Revision /);
  const keyboardUndo = { ctrlKey: true, metaKey: false, shiftKey: false, key: 'z', preventDefault() { this.prevented = true; } }; keyListeners[0](keyboardUndo); assert.equal(keyboardUndo.prevented, true); assert.equal(svg.children.length, 0);
  const keyboardRedo = { ctrlKey: true, metaKey: false, shiftKey: true, key: 'z', preventDefault() { this.prevented = true; } }; keyListeners[0](keyboardRedo); assert.equal(svg.children.length, 1);
  mounted.destroy(); delete globalThis.document;
});

test('selecting a rendered stroke exposes numeric transform and keyboard movement through canonical commands', () => {
  const keyListeners = fakeDocument(); const svg = new FakeElement(); const controls = transformControls();
  let project = fixture(); project = applyCommand(project, { type: 'stroke.add', artboardId: 'board', objectId: 'stroke-1', points: [{ x: 10, y: 10 }, { x: 20, y: 20 }], style: { preset: 'round', color: '#18151e', width: 1.5, opacity: 1 } });
  const mounted = mountBrowserEditor({ project, artboardId: 'board', svg, undoButton: new FakeElement(), redoButton: new FakeElement(), transformControls: controls });
  assert.equal(controls.fieldset.disabled, true); svg.emit('pointerdown', { target: svg.children[0] }); assert.equal(mounted.getSelectedObjectId(), 'stroke-1'); assert.equal(controls.fieldset.disabled, false); assert.equal(controls.x.value, 0);
  controls.x.value = '12'; controls.y.value = '8'; controls.rotation.value = '30'; controls.apply.emit('click');
  assert.deepEqual(mounted.host.getProject().objects['stroke-1'].transform, { x: 12, y: 8, scaleX: 1, scaleY: 1, rotationDeg: 30 }); assert.match(svg.children[0].attributes.transform, /translate\(12 8\).*rotate\(30\)/);
  const right = { ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, key: 'ArrowRight', preventDefault() { this.prevented = true; } }; keyListeners[0](right); assert.equal(right.prevented, true); assert.equal(mounted.host.getProject().objects['stroke-1'].transform.x, 13);
  mounted.host.undo(); assert.equal(mounted.host.getProject().objects['stroke-1'].transform.x, 12); mounted.destroy(); delete globalThis.document;
});
