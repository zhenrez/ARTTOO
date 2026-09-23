import { applyEditorOperation, createEditorHost, projectEditorView } from './editor-adapter.js';

function assert(condition, message) {
  if (!condition) throw new Error(`editor conformance failed: ${message}`);
}

function assertCandidateAdapter(adapter) {
  if (!adapter || typeof adapter.render !== 'function') {
    throw new Error('editor adapter must implement render(view)');
  }
}

/**
 * Exercise the ARTTOO-owned editor boundary without depending on a provider SDK.
 * A candidate adapter passes only if it renders canonical projections and all
 * mutations return through canonical revision-checked operations.
 */
export function runEditorAdapterConformance({ project, artboardId, objectId, adapter }) {
  // Validate the candidate itself before wrapping it for instrumentation. Without
  // this guard the wrapper's render() function can make a non-adapter appear valid
  // to createEditorHost and fail later with a provider-specific TypeError.
  assertCandidateAdapter(adapter);

  const originalRevision = project.revision;
  const originalX = project.objects[objectId]?.transform?.x;
  assert(originalX !== undefined, 'fixture object is missing');

  const projected = projectEditorView(project, artboardId);
  projected.objects[0].transform.x = 999;
  assert(project.objects[objectId].transform.x === originalX, 'projection leaked a mutable canonical reference');

  const renders = [];
  const instrumentedAdapter = {
    render(view) {
      renders.push(structuredClone(view));
      adapter.render(view);
    },
  };
  const host = createEditorHost({ project, artboardId, adapter: instrumentedAdapter });
  host.render();

  const updated = host.dispatch({
    type: 'object.transform',
    expectedRevision: originalRevision,
    objectId,
    transform: { x: 12, y: 8, rotationDeg: 15, scaleX: 1.25, scaleY: 1.25 },
  });

  assert(updated.revision === originalRevision + 1, 'canonical revision did not advance exactly once');
  assert(updated.objects[objectId].transform.x === 12, 'canonical transform was not applied');
  assert(updated.history.at(-1)?.type === 'object.transform', 'canonical history did not record the transform');
  assert(renders.length === 2, 'host did not render initial and committed projections');
  assert(renders.at(-1).revision === updated.revision, 'post-command render is not the committed revision');

  let staleRejected = false;
  try {
    applyEditorOperation(updated, {
      type: 'object.transform',
      expectedRevision: originalRevision,
      objectId,
      transform: { x: -1 },
    });
  } catch (error) {
    staleRejected = /stale editor operation/.test(String(error?.message));
  }
  assert(staleRejected, 'stale editor operation was not rejected');

  let privateStateRejected = false;
  try {
    applyEditorOperation(updated, {
      type: 'provider.load-json',
      expectedRevision: updated.revision,
      json: { providerOwned: true },
    });
  } catch (error) {
    privateStateRejected = /unsupported editor operation/.test(String(error?.message));
  }
  assert(privateStateRejected, 'provider-private serialized state was accepted');

  return {
    provider: adapter.name ?? 'anonymous-adapter',
    projectId: updated.projectId,
    startRevision: originalRevision,
    endRevision: updated.revision,
    renderCount: renders.length,
    projectionIsolation: true,
    canonicalMutation: true,
    staleEventRejected: true,
    providerPrivateStateRejected: true,
    manualTransfers: 0,
    projectForks: 0,
  };
}
