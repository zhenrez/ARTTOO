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
