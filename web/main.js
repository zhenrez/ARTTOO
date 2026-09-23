import { createProject, applyCommand } from '../src/document.js';
import { mountBrowserEditor } from '../src/browser-editor.js';
let project = createProject({ ownerId: 'local-user', name: 'Untitled tattoo' });
project = applyCommand(project, { type: 'artboard.add', artboardId: 'primary', widthMm: 160, heightMm: 200 });
mountBrowserEditor({ project, artboardId: 'primary', svg: document.querySelector('#artboard'), undoButton: document.querySelector('#undo'), redoButton: document.querySelector('#redo'), status: document.querySelector('#status') });
