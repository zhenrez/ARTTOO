import { createProject, applyCommand } from '../src/document.js';
import { mountBrowserEditor } from '../src/browser-editor.js';
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

const editor = mountBrowserEditor({
  project,
  artboardId: 'primary',
  svg: document.querySelector('#artboard'),
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

document.querySelector('#save').addEventListener('click', () => {
  try {
    const receipt = saveWorkspace(localStorage, editor.host.getProject());
    saveStatus.textContent = `Saved locally · revision ${receipt.revision}`;
  } catch {
    saveStatus.textContent = 'Save failed · work remains open';
  }
});
