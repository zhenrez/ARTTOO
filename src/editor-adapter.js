import { applyCommand } from './document.js';

const SUPPORTED_EDITOR_OPERATIONS = new Set(['object.transform', 'object.crop', 'object.visibility', 'object.lock', 'object.reorder', 'stroke.add', 'shape.add', 'path.add', 'text.add']);
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
    case 'object.crop': return applyCommand(project, { type: 'object.crop', objectId: operation.objectId, crop: operation.crop === null ? null : clone(operation.crop ?? {}) });
    case 'object.visibility': return applyCommand(project, { type: 'object.visibility', objectId: operation.objectId, visible: operation.visible });
    case 'object.lock': return applyCommand(project, { type: 'object.lock', objectId: operation.objectId, locked: operation.locked });
    case 'object.reorder': return applyCommand(project, { type: 'object.reorder', artboardId: operation.artboardId, objectId: operation.objectId, toIndex: operation.toIndex });
    case 'stroke.add': return applyCommand(project, { type: 'stroke.add', artboardId: operation.artboardId, objectId: operation.objectId, points: clone(operation.points), style: clone(operation.style ?? {}) });
    case 'shape.add': return applyCommand(project, { type: 'shape.add', artboardId: operation.artboardId, objectId: operation.objectId, shape: operation.shape, geometry: clone(operation.geometry), paint: clone(operation.paint ?? {}) });
    case 'path.add': return applyCommand(project, { type: 'path.add', artboardId: operation.artboardId, objectId: operation.objectId, points: clone(operation.points), closed: operation.closed === true, paint: clone(operation.paint ?? {}) });
    case 'text.add': return applyCommand(project, { type: 'text.add', artboardId: operation.artboardId, objectId: operation.objectId, text: operation.text, x: operation.x, y: operation.y, style: clone(operation.style ?? {}) });
    default: throw new Error(`unsupported editor operation: ${operation.type}`);
  }
}

function reversibleCommands(project, operation) {
  switch (operation.type) {
    case 'stroke.add':
    case 'shape.add':
    case 'path.add':
    case 'text.add': {
      const next = applyEditorOperation(project, operation);
      const objectId = operation.objectId ?? next.history.at(-1).detail.objectId;
      const object = clone(next.objects[objectId]);
      let redo;
      if (operation.type === 'stroke.add') redo = { type: 'stroke.add', artboardId: operation.artboardId, objectId, points: object.points, style: object.style };
      else if (operation.type === 'shape.add') redo = { type: 'shape.add', artboardId: operation.artboardId, objectId, shape: object.shape, geometry: object.geometry, paint: object.paint };
      else if (operation.type === 'path.add') redo = { type: 'path.add', artboardId: operation.artboardId, objectId, points: object.points, closed: object.closed, paint: object.paint };
      else redo = { type: 'text.add', artboardId: operation.artboardId, objectId, text: object.text, x: object.position.x, y: object.position.y, style: object.style };
      return { next, undo: { type: 'object.remove', objectId }, redo };
    }
    case 'object.visibility': {
      const object = project.objects[operation.objectId]; if (!object) throw new Error('object not found');
      const next = applyEditorOperation(project, operation);
      return { next, undo: { type: 'object.visibility', objectId: operation.objectId, visible: object.visible !== false }, redo: { type: 'object.visibility', objectId: operation.objectId, visible: operation.visible } };
    }
    case 'object.lock': {
      const object = project.objects[operation.objectId]; if (!object) throw new Error('object not found');
      const next = applyEditorOperation(project, operation);
      return { next, undo: { type: 'object.lock', objectId: operation.objectId, locked: object.locked === true }, redo: { type: 'object.lock', objectId: operation.objectId, locked: operation.locked } };
    }
    case 'object.reorder': {
      const artboard = project.artboards.find((item) => item.artboardId === operation.artboardId); if (!artboard) throw new Error('artboard not found');
      const fromIndex = artboard.objectIds.indexOf(operation.objectId);
      const next = applyEditorOperation(project, operation);
      return { next, undo: { type: 'object.reorder', artboardId: operation.artboardId, objectId: operation.objectId, toIndex: fromIndex }, redo: { type: 'object.reorder', artboardId: operation.artboardId, objectId: operation.objectId, toIndex: operation.toIndex } };
    }
    case 'object.transform': {
      const object = project.objects[operation.objectId];
      if (!object) throw new Error('object not found');
      const previousTransform = clone(object.transform);
      const next = applyEditorOperation(project, operation);
      return { next, undo: { type: 'object.transform', objectId: operation.objectId, transform: previousTransform }, redo: { type: 'object.transform', objectId: operation.objectId, transform: clone(next.objects[operation.objectId].transform) } };
    }
    case 'object.crop': {
      const object = project.objects[operation.objectId];
      if (!object) throw new Error('object not found');
      const previousCrop = object.crop ? clone(object.crop) : null;
      const next = applyEditorOperation(project, operation);
      const nextCrop = next.objects[operation.objectId].crop ? clone(next.objects[operation.objectId].crop) : null;
      return { next, undo: { type: 'object.crop', objectId: operation.objectId, crop: previousCrop }, redo: { type: 'object.crop', objectId: operation.objectId, crop: nextCrop } };
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
    replaceProject(nextProject) {
      if (!nextProject || nextProject.projectId !== canonicalProject.projectId) throw new Error('replacement project must preserve projectId');
      canonicalProject = nextProject;
      undoStack.length = 0;
      redoStack.length = 0;
      render();
      return canonicalProject;
    },
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
