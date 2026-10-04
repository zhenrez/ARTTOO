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
  const frame = svg.children.find((child) => child.dataset.objectId === 'image-1');
  assert.ok(frame);
  assert.equal(frame.attributes.width, '60');
  assert.equal(frame.attributes.height, '40');
  const image = frame.children.find((child) => child.dataset.objectId === 'image-1');
  assert.ok(image);
  assert.equal(image.attributes.href, 'blob:test-image');
  assert.equal(image.attributes.width, '1200');
  assert.equal(image.attributes.height, '800');
  frame.emit('pointerdown', { target: frame, clientX: 20, clientY: 20 });
  svg.emit('pointerdown', { target: frame, clientX: 20, clientY: 20 });
  svg.emit('pointerup', { target: frame, clientX: 40, clientY: 40 });
  assert.deepEqual({ x: mounted.host.getProject().objects['image-1'].transform.x, y: mounted.host.getProject().objects['image-1'].transform.y }, { x: 10, y: 10 });
  assert.equal(mounted.host.getProject().objects['image-1'].sourceAssetId, imported.assetId);
  mounted.destroy();
  delete globalThis.document;
});


test('browser editor composes crop and erase mask in immutable source coordinates', async () => {
  fakeDocument();
  const store = createMemoryAssetStore();
  let project = createProject({ ownerId: 'artist' });
  const sourceBytes = new Uint8Array([7, 8, 9, 10]);
  const imported = await importAsset(project, { bytes: sourceBytes, mimeType: 'image/png', width: 1000, height: 500, provenance: 'test' }, store);
  project = imported.project;
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'board', widthMm: 100, heightMm: 100 });
  project = applyCommand(project, { type: 'object.add', objectId: 'image-mask', objectType: 'image', artboardId: 'board', assetId: imported.assetId });
  project = applyCommand(project, { type: 'object.crop', objectId: 'image-mask', crop: { x: 0.25, y: 0.2, width: 0.5, height: 0.6 } });
  project = applyCommand(project, { type: 'object.erase', objectId: 'image-mask', stroke: { points: [{ x: 0.3, y: 0.25 }, { x: 0.7, y: 0.75 }], radius: 0.05 } });

  const bytesBefore = await store.get(imported.assetId);
  const svg = new FakeElement();
  const mounted = mountBrowserEditor({ project, artboardId: 'board', svg, undoButton: new FakeElement(), redoButton: new FakeElement(), assetHrefs: new Map([[imported.assetId, 'blob:masked-image']]) });
  const frame = svg.children.find((child) => child.dataset.objectId === 'image-mask');
  assert.ok(frame);
  assert.equal(frame.attributes.viewBox, '250 100 500 300');
  assert.equal(frame.dataset.masked, 'true');

  const mask = frame.children.find((child) => child.attributes.id === 'erase-image-mask');
  const image = frame.children.find((child) => child.attributes.href === 'blob:masked-image');
  assert.ok(mask);
  assert.ok(image);
  assert.equal(mask.attributes.maskUnits, 'userSpaceOnUse');
  assert.equal(mask.attributes.width, '1000');
  assert.equal(mask.attributes.height, '500');
  assert.equal(image.attributes.mask, 'url(#erase-image-mask)');
  const cut = mask.children.find((child) => child.attributes.stroke === 'black');
  assert.ok(cut);
  assert.equal(cut.attributes.d, 'M 300 125 L 700 375');
  assert.equal(cut.attributes['stroke-width'], '50');
  assert.equal(cut.attributes['stroke-linecap'], 'round');
  assert.equal(cut.attributes['stroke-linejoin'], 'round');

  const bytesAfter = await store.get(imported.assetId);
  assert.deepEqual(Array.from(bytesAfter), Array.from(bytesBefore));
  assert.deepEqual(Array.from(bytesAfter), Array.from(sourceBytes));
  mounted.destroy();
  delete globalThis.document;
});
