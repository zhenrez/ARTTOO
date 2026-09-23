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

export function createEditorHost({ project, artboardId, adapter }) {
  assertAdapter(adapter);
  let canonicalProject = project;
  const render = () => adapter.render(projectEditorView(canonicalProject, artboardId));
  return { getProject() { return canonicalProject; }, render, dispatch(operation) { canonicalProject = applyEditorOperation(canonicalProject, operation); render(); return canonicalProject; } };
}
