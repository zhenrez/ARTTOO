# ARTTOO MVP Autopilot State

**Updated:** 2026-09-23T03:31Z
**Canonical repository:** `zhenrez/ARTTOO`
**Main head observed:** `5c47fa4d5100a19165607e80e8413423dd27c008`
**Working branch:** `mvp/checkpoint-0-document-core`
**Verified implementation head:** `62fd07f0ff076fecc918bccb10e55b8846d01ef5`
**Pull request:** #2 — `MVP checkpoint 0: bootstrap canonical document core`

## Lease / handoff
- Driver B's bounded Checkpoint-0 remediation lease is **RELEASED**.
- Scope completed: immutable source-byte durability seam plus browser portability remediation.
- Driver A is the intended next owner for independent Checkpoint-0 baseline acceptance. It must verify the latest PR head and CI again before merge/acceptance.
- No worker should begin Checkpoint 1 until Driver A independently closes Checkpoint 0.

## Verified completed gates
- None yet. Checkpoint 0 remains open pending independent acceptance.

## Verified repository/application state
- `main` remains at authority bootstrap `5c47fa4d5100a19165607e80e8413423dd27c008`.
- PR #2 is new bootstrap code; no prior application implementation is claimed as recovered.
- Implementation head `62fd07f0ff076fecc918bccb10e55b8846d01ef5` completed GitHub Actions `verify` run `35814545424`, job `node`, conclusion **success**; `npm run check` passed.
- `src/document.js` no longer imports `node:crypto`; ID generation and SHA-256 use standards Web Crypto (`crypto.randomUUID`, `crypto.subtle.digest`).
- `src/asset-store.js` adds a renderer-independent asset-store interface with a $0 in-memory test implementation and browser-local IndexedDB implementation.
- Asset import now requires an asset store, writes immutable source bytes keyed by SHA-256 checksum, and records byte length in canonical metadata.
- `verifyAssetSource()` retrieves bytes after project reopen and fails explicitly for missing, truncated/corrupt, or checksum-mismatched sources.

## Verification evidence
- Exact implementation head: `62fd07f0ff076fecc918bccb10e55b8846d01ef5`.
- GitHub Actions run `35814545424`: completed `success`; `npm run check` completed `success`.
- Regression: known immutable source bytes survive project serialization/reopen, remain retrievable from the independent asset store, and re-hash to the canonical checksum.
- Regression: missing and corrupt source bytes reject explicitly.
- Regression: local draft reopen retains semantic project state and the immutable source remains retrievable.
- Existing placement/source-transform separation, approval invalidation and source deduplication tests were converted to the async asset-store seam and remained green in the same CI run.
- Browser-portability smoke evidence exercises global standards Web Crypto and the canonical module contains no Node-only crypto import.

## Remaining Checkpoint-0 acceptance questions
- Driver A should independently inspect the IndexedDB adapter transaction semantics and the exact current PR head rather than trusting this state claim.
- The final state-only handoff commit occurs after the verified implementation head, so Driver A should require green CI on the latest PR head before baseline acceptance.

## Owner decisions required
None currently.

## Next highest-leverage task
Driver A: independently audit PR #2 at its latest head, verify CI green, inspect source durability/browser portability semantics, and if the Checkpoint-0 evidence gate is satisfied, prepare/perform the repository-policy-appropriate baseline acceptance before starting Checkpoint 1.

## Continuation prompt
Driver A: resume PR #2 from the latest `mvp/checkpoint-0-document-core` head. Re-read AUTHORITY.md and this state, verify no active lease, require green CI for the exact current head, inspect `src/document.js`, `src/asset-store.js`, and both regression suites. Specifically confirm immutable source bytes survive close/reopen through the asset-store seam, missing/corrupt sources fail closed, and the canonical core has no Node-only runtime dependency. If all Checkpoint-0 requirements are independently satisfied, close the baseline gate using the repository's accepted PR/merge workflow and then establish the smallest Checkpoint-1 shared-editor-foundation increment. If any claim fails, take a bounded remediation lease instead of advancing.
