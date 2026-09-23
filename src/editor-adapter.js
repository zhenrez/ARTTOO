import { applyCommand } from './document.js';

const SUPPORTED_EDITOR_OPERATIONS = new Set(['object.transform', 'stroke.add']);
const clone = (value) => structuredClone(value);
function assertAdapter(adapter) { if (!adapter || typeof adapter.render !== 'function') throw new Error('editor adapter must implement render(view)'); }
function assertOperation(operation) { if (!operation || !SUPPORTED_EDITOR_OPERATIONS.has(operation.type)) throw new Error(`unsupported editor operation: ${operation?.type ?? 'missing'}`); }

export function projectEditorView(project, artboardId) {
  const artboard = project.artboards.find((item) => item.artboardId === artboardId);
  if (!artboard) throw new Error('artboard not found');
  return { projectId: project.projectId, revision: project.revision, artboard: clone(artboard), objects: artboard.objectIds.map((objectId) => { const object = project.objects[objectId]; if (!object) throw new Error(`object not found: ${objectId}`); return clone(object); }) };
}

export function applyEditorOperation(project, operation) {
  assertOperation(operation);
  if (operation.expectedRevision !== project.revision) throw new Error(`stale editor operation: expected revision ${operation.expectedRevision}, current ${project.revision}`);
  switch (operation.type) {
    case 'object.transform': return applyCommand(project, { type: 'object.transform', objectId: operation.objectId, transform: clone(operation.transform ?? {}) });
    case 'stroke.add': return applyCommand(project, { type: 'stroke.add', artboardId: operation.artboardId, objectId: operation.objectId, points: clone(operation.points), style: clone(operation.style ?? {}) });
    default: throw new Error(`unsupported editor operation: ${operation.type}`);
  }
}

function reversibleCommands(project, operation) {
  switch (operation.type) {
    case 'stroke.add': {
      const next = applyEditorOperation(project, operation);
      const objectId = operation.objectId ?? next.history.at(-1).detail.objectId;
      const stroke = clone(next.objects[objectId]);
      return { next, undo: { type: 'object.remove', objectId }, redo: { type: 'stroke.add', artboardId: operation.artboardId, objectId, points: stroke.points, style: stroke.style } };
    }
    case 'object.transform': {
      const object = project.objects[operation.objectId];
      if (!object) throw new Error('object not found');
      const previousTransform = clone(object.transform);
      const next = applyEditorOperation(project, operation);
      return { next, undo: { type: 'object.transform', objectId: operation.objectId, transform: previousTransform }, redo: { type: 'object.transform', objectId: operation.objectId, transform: clone(next.objects[operation.objectId].transform) } };
    }
    default: throw new Error(`unsupported reversible editor operation: ${operation.type}`);
  }
}

export function createEditorHost({ project, artboardId, adapter }) {
  assertAdapter(adapter);
  let canonicalProject = project;
  const undoStack = [];
  const redoStack = [];
  const render = () => adapter.render(projectEditorView(canonicalProject, artboardId));
  return {
    getProject() { return canonicalProject; },
    canUndo() { return undoStack.length > 0; },
    canRedo() { return redoStack.length > 0; },
    render,
    dispatch(operation) {
      const reversible = reversibleCommands(canonicalProject, operation);
      canonicalProject = reversible.next;
      undoStack.push({ undo: reversible.undo, redo: reversible.redo });
      redoStack.length = 0;
      render();
      return canonicalProject;
    },
    undo() {
      const entry = undoStack.pop();
      if (!entry) return canonicalProject;
      canonicalProject = applyCommand(canonicalProject, entry.undo);
      redoStack.push(entry);
      render();
      return canonicalProject;
    },
    redo() {
      const entry = redoStack.pop();
      if (!entry) return canonicalProject;
      canonicalProject = applyCommand(canonicalProject, entry.redo);
      undoStack.push(entry);
      render();
      return canonicalProject;
    },
  };
}
