import { createProject, applyCommand } from '../src/document.js';
import { createIndexedDbAssetStore } from '../src/asset-store.js';
import { imageAssetUrls, ingestImageAsset } from '../src/image-ingestion.js';
import { mountBrowserEditor } from '../src/browser-editor.js';
import { mountLayersPanel } from '../src/layers-panel.js';
import { reopenWorkspace, saveWorkspace } from '../src/workspace-session.js';

const saveStatus = document.querySelector('#save-status');
const recovery = reopenWorkspace(localStorage);
const assetStore = createIndexedDbAssetStore();
let project;
if (recovery.status === 'reopened') {
  project = recovery.project;
  saveStatus.textContent = `Saved locally · reopened revision ${project.revision}`;
} else {
  project = createProject({ ownerId: 'local-user', name: 'Untitled tattoo' });
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'primary', widthMm: 160, heightMm: 200 });
  saveStatus.textContent = recovery.status === 'empty' ? 'Not saved' : 'Recovery unavailable · new project not saved';
}

const assetHrefs = await imageAssetUrls(project, assetStore);
const svg = document.querySelector('#artboard');
const editor = mountBrowserEditor({
  project,
  artboardId: 'primary',
  svg,
  assetHrefs,
  undoButton: document.querySelector('#undo'),
  redoButton: document.querySelector('#redo'),
  status: document.querySelector('#status'),
  cropControls: {
    fieldset: document.querySelector('#crop'),
    x: document.querySelector('#crop-x'),
    y: document.querySelector('#crop-y'),
    width: document.querySelector('#crop-width'),
    height: document.querySelector('#crop-height'),
    apply: document.querySelector('#apply-crop'),
    clear: document.querySelector('#clear-crop'),
  },
  transformControls: {
    fieldset: document.querySelector('#transform'),
    selection: document.querySelector('#selection'),
    x: document.querySelector('#transform-x'),
    y: document.querySelector('#transform-y'),
    rotation: document.querySelector('#transform-rotation'),
    scaleX: document.querySelector('#transform-scale-x'),
    scaleY: document.querySelector('#transform-scale-y'),
    apply: document.querySelector('#apply-transform'),
    nudgeLeft: document.querySelector('#nudge-left'),
    nudgeRight: document.querySelector('#nudge-right'),
    flipX: document.querySelector('#flip-x'),
    flipY: document.querySelector('#flip-y'),
  },
});

// Task 2c: expose existing canonical shape, path and text commands in the
// working editor. The same project and command history power every mode.
const elementsPanel = document.createElement('section');
elementsPanel.className = 'elements-panel';
elementsPanel.setAttribute('aria-labelledby', 'elements-heading');
elementsPanel.style.cssText = 'display:grid;gap:8px;padding-bottom:18px;margin-bottom:18px;border-bottom:1px solid #34313b';
elementsPanel.innerHTML = `
  <h2 id="elements-heading">Elements</h2>
  <div role="group" aria-label="Shapes">
    <button id="create-rectangle" type="button">Rectangle</button>
  </div>
  <button id="create-vector-path" type="button">Vector path</button>
  <label for="elements-text">Text content</label>
  <input id="elements-text" type="text" maxlength="200" placeholder="Lettering">
  <button id="create-text" type="button">Add text</button>
  <small>Use Layers to select, transform, reorder or hide artwork. Save to retain changes.</small>
`;
const layersSection = document.querySelector('#layers-heading')?.closest('section');
if (layersSection) layersSection.before(elementsPanel);
else document.querySelector('aside')?.prepend(elementsPanel);

const insertCanonicalElement = (command) => {
  try {
    const revision = editor.host.getProject().revision;
    editor.host.dispatch({ ...command, artboardId: 'primary', expectedRevision: revision });
    saveStatus.textContent = `Edited · revision ${editor.host.getProject().revision} · save to keep changes`;
  } catch (error) {
    saveStatus.textContent = `Insertion failed · ${error.message`;
  }
};
elementsPanel.querySelector('#create-rectangle').addEventListener('click', () => insertCanonicalElement({
  type: 'shape.add', shape: 'rect', geometry: { x: 20, y: 20, width: 45, height: 28 },
  paint: { fill: 'none', stroke: '#18151e', strokeWidth: 1.5 },
}));
elementsPanel.querySelector('#create-vector-path').addEventListener('click', () => insertCanonicalElement({
  type: 'path.add',
  points: [{ x: 18, y: 100 }, { x: 45, y: 88 }, { x: 75, y: 113 }, { x: 110, y: 97 }],
  closed: false, paint: { fill: 'none', stroke: '#18151e', strokeWidth: 1.5 },
}));
elementsPanel.querySelector('#create-text').addEventListener('click', () => {
  const input = elementsPanel.querySelector('#elements-text');
  const value = input.value.trim();
  if (!value) {
    saveStatus.textContent = 'Enter text content before adding lettering';
    input.focus();
    return;
  }
  insertCanonicalElement({ type: 'text.add', text: value, x: 20, y: 151, style: { fontSize: 14, fill: '#18151e' } });
});

const selectCanvasObject = (objectId) => {
  const target = Array.from(svg.children).find((child) => child.dataset?.objectId === objectId);
  if (!target) throw new Error(`rendered object not found: ${objectId}`);
  target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 9001, clientX: 0, clientY: 0 }));
  target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 9001, clientX: 0, clientY: 0 }));
};
mountLayersPanel({
  projectSource: () => editor.host.getProject(),
  artboardId: 'primary',
  selectedObjectId: () => editor.getSelectedObjectId(),
  selectObject: selectCanvasObject,
  dispatch: (operation) => editor.host.dispatch({ ...operation, expectedRevision: editor.host.getProject().revision }),
  list: document.querySelector('#layers-list'),
  observe: (render) => { const observer = new MutationObserver(render); observer.observe(svg, { childList: true }); return observer; },
});

document.querySelector('#image-import').addEventListener('change', async (event) => {
  const input = event.currentTarget;
  const file = input.files?.[0];
  if (!file) return;
  saveStatus.textContent = 'Importing image…';
  try {
    if (!file.type.startsWith('image/')) throw new Error('Choose an image file');
    const bitmap = await createImageBitmap(file);
    const width = bitmap.width;
    const height = bitmap.height;
    bitmap.close();
    const bytes = new Uint8Array(await file.arrayBuffer());
    const result = await ingestImageAsset(editor.host.getProject(), {
      bytes, mimeType: file.type, width, height, provenance: 'user-upload'
    }, assetStore, { artboardId: 'primary' });
    const href = URL.createObjectURL(new Blob([bytes], { type: file.type }));
    editor.setAssetHref(result.assetId, href);
    editor.host.replaceProject(result.project);
    saveStatus.textContent = `Imported · revision ${result.project.revision} · save to keep project state`;
  } catch (error) {
    saveStatus.textContent = `Import failed · ${error.message}`;
  } finally {
    input.value = '';
  }
});

document.querySelector('#save').addEventListener('click', () => {
  try {
    const receipt = saveWorkspace(localStorage, editor.host.getProject());
    saveStatus.textContent = `Saved locally · revision ${receipt.revision}`;
  } catch {
    saveStatus.textContent = 'Save failed · work remains open';
  }
});
