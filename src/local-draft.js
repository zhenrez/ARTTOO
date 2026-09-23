import { reopenProject, serializeProject } from './document.js';

export const DRAFT_KEY_PREFIX = 'artoo:draft:';

export function draftKey(projectId) {
  if (!projectId) throw new Error('projectId is required');
  return `${DRAFT_KEY_PREFIX}${projectId}`;
}

export function saveDraft(storage, project) {
  assertStorage(storage);
  const serialized = serializeProject(project);
  storage.setItem(draftKey(project.projectId), serialized);
  return { projectId: project.projectId, revision: project.revision, bytes: Buffer.byteLength(serialized, 'utf8') };
}

export function loadDraft(storage, projectId) {
  assertStorage(storage);
  const serialized = storage.getItem(draftKey(projectId));
  if (serialized === null) return null;
  const project = reopenProject(serialized);
  if (project.projectId !== projectId) throw new Error('draft projectId mismatch');
  return project;
}

export function removeDraft(storage, projectId) {
  assertStorage(storage);
  storage.removeItem(draftKey(projectId));
}

function assertStorage(storage) {
  if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function' || typeof storage.removeItem !== 'function') {
    throw new Error('storage must implement getItem/setItem/removeItem');
  }
}
