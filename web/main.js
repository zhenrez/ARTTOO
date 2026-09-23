import { createProject, applyCommand } from '../src/document.js';
import { mountBrowserEditor } from '../src/browser-editor.js';
import { mountLayersPanel } from '../src/layers-panel.js';
import { reopenWorkspace, saveWorkspace } from '../src/workspace-session.js';

const saveStatus = document.querySelector('#save-status');
const recovery = reopenWorkspace(localStorage);
let project;
if (recovery.status === 'reopened') {
  project = recovery.project;
  saveStatus.textContent = `Saved locally · reopened revision ${project.revision}`;
} else {
  project = createProject({ ownerId: 'local-user', name: 'Untitled tattoo' });
  project = applyCommand(project, { type: 'artboard.add', artboardId: 'primary', widthMm: 160, heightMm: 200 });
  saveStatus.textContent = recovery.status === 'empty' ? 'Not saved' : 'Recovery unavailable · new project not saved';
}

const svg = document.querySelector('#artboard');
const editor = mountBrowserEditor({
  project,
  artboardId: 'primary',
  svg,
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
  list: document.querySelector('#layers-list'),
  observe: (render) => { const observer = new MutationObserver(render); observer.observe(svg, { childList: true }); return observer; },
});

document.querySelector('#save').addEventListener('click', () => {
  try {
    const receipt = saveWorkspace(localStorage, editor.host.getProject());
    saveStatus.textContent = `Saved locally · revision ${receipt.revision}`;
  } catch {
    saveStatus.textContent = 'Save failed · work remains open';
  }
});
