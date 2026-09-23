import { createProject, applyCommand } from '../src/document.js';
import { mountBrowserEditor } from '../src/browser-editor.js';
let project = createProject({ ownerId: 'local-user', name: 'Untitled tattoo' });
project = applyCommand(project, { type: 'artboard.add', artboardId: 'primary', widthMm: 160, heightMm: 200 });
mountBrowserEditor({
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
