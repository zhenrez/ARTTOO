import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject, applyCommand, importAsset } from '../src/document.js';
import { createMemoryAssetStore } from '../src/asset-store.js';
import { mountBrowserEditor } from '../src/browser-editor.js';

class FakeElement {
  constructor() { this.listeners = {}; this.attributes = {}; this.children = []; this.disabled = false; this.dataset = {}; this.value = ''; this.textContent = ''; this.viewBox = { baseVal: { width: 100, height: 100 } }; }
  addEventListener(type, fn) { (this.listeners[type] ??= []).push(fn); }
  setAttribute(name, value) { this.attributes[name] = String(value); if (name === 'viewBox') { const [, , width, height] = String(value).split(' ').map(Number); this.viewBox.baseVal = { width, height }; } }
  replaceChildren(...children) { this.children = children; }
  getBoundingClientRect() { return { left: 0, top: 0, width: 200, height: 200 }; }
  emit(type, event = {}) { for (const fn of this.listeners[type] ?? []) fn({ pointerId: 1, clientX: 0, clientY: 0, pressure: 0, target: this, preventDefault() {}, ...event }); }
}
function fakeDocument() { globalThis.document = { createElementNS() { return new FakeElement(); }, addEventListener() {}, removeEventListener() {} }; }

test('browser editor renders and transforms canonical image objects without flattening them', async () => {
  fakeDocument();
  const store = createMemoryAssetStore();
  let project = createProject({ ownerId: 'artist' });
  const imported = await importAsset(project, { bytes: new Uint8Array([1,2,3]), mimeType: 'image/png', width: 1200, height: 800, provenance: 'test' }, store);
  project = imported.project;
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'board', widthMm: 100, heightMm: 100 });
  project = applyCommand(project, { type: 'object.add', objectId: 'image-1', objectType: 'image', artboardId: 'board', assetId: imported.assetId });
  const svg = new FakeElement();
  const mounted = mountBrowserEditor({ project, artboardId: 'board', svg, undoButton: new FakeElement(), redoButton: new FakeElement(), assetHrefs: new Map([[imported.assetId, 'blob:test-image']]) });
  const image = svg.children.find((child) => child.dataset.objectId === 'image-1');
  assert.ok(image);
  assert.equal(image.attributes.href, 'blob:test-image');
  assert.equal(image.attributes.width, '60');
  assert.equal(image.attributes.height, '40');
  image.emit('pointerdown', { target: image, clientX: 20, clientY: 20 });
  svg.emit('pointerdown', { target: image, clientX: 20, clientY: 20 });
  svg.emit('pointerup', { target: image, clientX: 40, clientY: 40 });
  assert.deepEqual({ x: mounted.host.getProject().objects['image-1'].transform.x, y: mounted.host.getProject().objects['image-1'].transform.y }, { x: 10, y: 10 });
  assert.equal(mounted.host.getProject().objects['image-1'].sourceAssetId, imported.assetId);
  mounted.destroy();
  delete globalThis.document;
});
