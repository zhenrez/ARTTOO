import { applyCommand, createProject } from '../../src/document.js';

/**
 * Canonical provider-neutral fixture for editor-foundation comparisons.
 * Candidate adapters receive only projections of this ARTTOO-owned state.
 */
export function createEditorFoundationFixture() {
  let project = createProject({ ownerId: 'fixture-owner', name: 'ARTOO editor foundation fixture' });
  project = applyCommand(project, {
    type: 'artboard.add',
    artboardId: 'fixture-board',
    widthMm: 120,
    heightMm: 180,
  });

  project.assets['fixture-asset'] = {
    assetId: 'fixture-asset',
    checksum: 'fixture-source-checksum',
    byteLength: 4,
    mimeType: 'image/png',
    width: 1200,
    height: 1800,
    provenance: 'canonical-test-fixture',
    licenseRef: null,
    immutable: true,
  };

  project = applyCommand(project, {
    type: 'object.add',
    artboardId: 'fixture-board',
    objectId: 'fixture-object',
    assetId: 'fixture-asset',
  });

  return {
    project,
    artboardId: 'fixture-board',
    objectId: 'fixture-object',
  };
}
