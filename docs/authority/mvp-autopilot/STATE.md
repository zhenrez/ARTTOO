# ARTTOO MVP Autopilot State

**Updated:** 2026-09-23T03:02Z
**Canonical repository:** `zhenrez/ARTTOO`
**Main head observed:** `5c47fa4d5100a19165607e80e8413423dd27c008`
**Working branch:** `mvp/checkpoint-0-document-core`
**Verified PR head before this state-only update:** `bb88d78c154be10e6f32a4e27bc8364c015cdfb9`
**Pull request:** #2 — `MVP checkpoint 0: bootstrap canonical document core`

## Lease / handoff
- Driver A inspected the increment and found no recorded active implementation lease from Driver B or another worker.
- Driver A took a bounded **audit/remediation-design lease** for PR #2 only; no competing implementation edit was started.
- Lease is **released** with this state commit. Driver B may take the next implementation lease to remediate the browser-portability blocker below.

## Verified completed gates
- None yet. Checkpoint 0 remains open.

## Current open gate
- **Checkpoint 0 — establish/recover and baseline the real application.**

## Verified repository/application state
- `main` remains at authority bootstrap `5c47fa4d5100a19165607e80e8413423dd27c008`.
- PR #2 is new bootstrap code; no prior application implementation is claimed as recovered.
- PR #2 head `bb88d78c154be10e6f32a4e27bc8364c015cdfb9` was open and mergeable when inspected.
- GitHub Actions `verify` run `35808758715` completed **success** for exact head `bb88d78c154be10e6f32a4e27bc8364c015cdfb9`.
- That green run proves the existing Node checks, including canonical document tests and local-draft persistence tests, for that exact head.

## Work currently in PR #2
- Zero-runtime-dependency Node scaffold.
- Schema-versioned canonical Project state and command-only mutation.
- Checksum-addressed immutable source assets and stable identities.
- Body placement separated from source-art transforms.
- Exact-revision approval invalidation semantics.
- JSON save/reopen plus Web Storage-compatible local-draft persistence and regression tests.

## Audit finding this run
- `src/document.js` imports `createHash` and `randomUUID` from `node:crypto`.
- `src/local-draft.js` is intended as a browser/Web Storage seam, but it imports canonical serialization from `document.js`; therefore the canonical module cannot currently be loaded directly by a browser without a bundler/polyfill or architectural split.
- This is a **Checkpoint-0 portability blocker**, not a failing Node test. Merging it as the browser-facing canonical core would contradict the bootstrap requirement for a shared web core where viable and would create avoidable adapter/tooling coupling before Checkpoint 1.
- The prior Buffer-to-TextEncoder correction did not remove this remaining Node builtin dependency.

## Verification evidence
- Exact PR head `bb88d78c154be10e6f32a4e27bc8364c015cdfb9`: GitHub Actions `verify` run `35808758715`, conclusion `success`.
- Source audit: `src/document.js` line 1 imports `node:crypto`; `importAsset` uses synchronous `createHash`; ID generation uses imported `randomUUID`.
- No claim is made that browser loading has passed; it has not yet been tested.

## First-order checkpoint answers
1. Last verified executable state: PR #2 head `bb88d78c...` passes current repository-native Node CI.
2. Previous worker change: local-draft Web Storage-compatible persistence plus semantic save/reopen tests; now verified green at exact head.
3. Open gate: Checkpoint 0.
4. Bottleneck: canonical document module is still Node-specific despite the browser/local-draft direction.
5. Active lease/conflict: none after this state commit; audit lease released.
6. Closing evidence: remove/isolate Node-only crypto from the browser-facing canonical module, add a browser-import/runtime smoke test (or equivalent standards-Web-API test), retain all existing Node tests, and obtain green CI on the resulting exact head.
7. Smallest reversible implementation: replace Node-only ID/hash primitives with standards-Web-API-compatible primitives or isolate hashing behind a tiny adapter while keeping canonical state semantics unchanged. Prefer no dependency and no bundler requirement.
8. Cost: $0.
9. Duplicate state/export-reimport/provider lock-in: none required; do not introduce any to solve portability.
10. Owner authority: none for this remediation/test increment. Do not merge consequential baseline changes without established acceptance authority.

## Blockers
- Browser portability of the canonical module is unproven and presently contradicted by the direct `node:crypto` import.
- Checkpoint 0 cannot be accepted onto `main` until this is remediated and verified.

## Owner decisions required
- None currently.

## Next highest-leverage task
Take an implementation lease on PR #2 and remove/isolate the `node:crypto` dependency without changing canonical document semantics. Add a regression/smoke test that would fail if the browser-facing core regresses to Node-only imports. Run/obtain green CI for the exact resulting head. Then re-audit immutable-source identity, save/reopen fidelity, placement separation and revision-bound approval before baseline acceptance.

## Continuation prompt
Driver B: resume PR #2 on `mvp/checkpoint-0-document-core`. Read AUTHORITY.md and this state first, verify that no newer worker owns the same scope, then take a bounded lease for **browser portability of the canonical document core**. Preserve the green semantics at `bb88d78c...`. Remove or isolate the direct `node:crypto` dependency using standards Web APIs or a tiny replaceable primitive adapter; do not add a framework, editor SDK, bundler requirement, duplicate state model, or provider dependency. Add browser-import/runtime portability evidence plus existing regression coverage, push to PR #2, require green CI on that exact head, update this state with evidence, and release/transfer the lease.