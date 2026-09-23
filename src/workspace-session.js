import { loadDraft, saveDraft } from './local-draft.js';

export const ACTIVE_PROJECT_KEY = 'artoo:active-project';

export function reopenWorkspace(storage) {
  assertStorage(storage);
  const projectId = storage.getItem(ACTIVE_PROJECT_KEY);
  if (!projectId) return { status: 'empty', project: null };
  try {
    const project = loadDraft(storage, projectId);
    if (!project) return { status: 'missing', project: null, projectId };
    return { status: 'reopened', project, projectId, revision: project.revision };
  } catch (error) {
    return { status: 'recovery-error', project: null, projectId, error };
  }
}

export function saveWorkspace(storage, project) {
  assertStorage(storage);
  const receipt = saveDraft(storage, project);
  storage.setItem(ACTIVE_PROJECT_KEY, project.projectId);
  return receipt;
}

function assertStorage(storage) {
  if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
    throw new Error('workspace storage must implement getItem/setItem');
  }
}
