import test from 'node:test';
import assert from 'node:assert/strict';
import { runEditorAdapterConformance } from '../src/editor-conformance.js';
import { createEditorFoundationFixture } from './fixtures/editor-foundation-fixture.js';

test('reference adapter completes provider-neutral conformance on one canonical project', () => {
  const fixture = createEditorFoundationFixture();
  const observed = [];
  const adapter = {
    name: 'reference-adapter',
    render(view) {
      observed.push(structuredClone(view));
    },
  };

  const result = runEditorAdapterConformance({ ...fixture, adapter });

  assert.equal(result.provider, 'reference-adapter');
  assert.equal(result.projectId, fixture.project.projectId);
  assert.equal(result.endRevision, result.startRevision + 1);
  assert.equal(result.projectionIsolation, true);
  assert.equal(result.canonicalMutation, true);
  assert.equal(result.staleEventRejected, true);
  assert.equal(result.providerPrivateStateRejected, true);
  assert.equal(result.manualTransfers, 0);
  assert.equal(result.projectForks, 0);
  assert.equal(observed.length, 2);
  assert.equal(observed[0].projectId, observed[1].projectId);
});

test('non-adapter fails closed', () => {
  const fixture = createEditorFoundationFixture();
  assert.throws(
    () => runEditorAdapterConformance({ ...fixture, adapter: {} }),
    /editor adapter must implement render/,
  );
});
