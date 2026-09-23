# ARTTOO MVP Autopilot State

**Updated:** 2026-09-23T03:17Z
**Canonical repository:** `zhenrez/ARTTOO`
**Main head observed:** `5c47fa4d5100a19165607e80e8413423dd27c008`
**Working branch:** `mvp/checkpoint-0-document-core`
**PR head audited:** `0a3b221a1073cf6aa76fd432821e896d16c6ef90`
**Pull request:** #2 — `MVP checkpoint 0: bootstrap canonical document core`

## Lease / handoff
- Driver A's prior audit/remediation-design lease is released.
- No active implementation lease is recorded at this audit point.
- Driver B is the intended next owner of a bounded Checkpoint-0 remediation lease.
- Both drivers must re-read this file immediately before writing; a newer head/lease supersedes this handoff.

## Verified completed gates
- None. Checkpoint 0 remains open.

## Verified repository/application state
- `main` remains at authority bootstrap `5c47fa4d5100a19165607e80e8413423dd27c008`.
- PR #2 is new bootstrap code; no prior application implementation is claimed as recovered.
- Exact PR head `0a3b221a1073cf6aa76fd432821e896d16c6ef90` has GitHub Actions `node` check conclusion **success** (run `35812794921`).
- Current code provides schema-versioned canonical project state, command-mediated mutation, stable identities, body placement separated from source transforms, revision-bound approval semantics, JSON save/reopen and a Web-Storage-compatible draft seam.

## Governor findings
### Blocker A — browser portability
`src/document.js` still directly imports `createHash` and `randomUUID` from `node:crypto`. The browser-facing canonical module therefore remains Node-specific. Close with standards-Web-API-compatible primitives or a tiny replaceable platform adapter plus browser import/runtime evidence.

### Blocker B — immutable source durability
`importAsset()` hashes incoming `bytes` but stores only asset metadata/checksum in `project.assets`; the bytes themselves are discarded. `serializeProject()` / local-draft persistence therefore preserve source identity metadata, not the immutable source artwork. A checksum surviving save/reopen is not evidence that the original asset can be recovered. This is a Checkpoint-0 integrity blocker because all later drawing/decomposition/mask/placement/stencil operations require the immutable source to remain retrievable.

## Required closing evidence for Checkpoint 0
1. Persist immutable source bytes through a renderer-independent blob/asset-store seam keyed by checksum/asset identity; browser-local IndexedDB is an acceptable $0 implementation.
2. Regression: import known bytes → save project/draft → simulate close/reopen → retrieve bytes → re-hash → exact checksum/byte equality.
3. Regression: missing/corrupt stored source is detected explicitly rather than silently treated as valid metadata.
4. Remove/isolate direct Node-only crypto and add browser-import/runtime portability evidence.
5. Retain green existing tests for transform round-trip, placement separation, approval invalidation and deduplication.
6. Obtain green CI for the exact resulting head before baseline acceptance.

## Current bottleneck
Checkpoint 0 canonical persistence integrity and browser portability. Do not begin editor SDK selection or Checkpoint 1 until both blockers close.

## Stop / defer
- Do not merge PR #2 yet.
- Defer editor SDK/framework selection, VTO/body reconstruction, segmentation/generation, commerce and long-tail catalogue work.
- Do not introduce a second project state model, export/re-import bridge, paid provider or bundler-only workaround to close these blockers.

## Owner decisions required
None currently.

## Next highest-leverage task
Driver B should take one bounded remediation lease covering only (A) immutable source-byte durability and (B) browser portability. Prefer a tiny asset-store interface with browser-local IndexedDB implementation and standards Web Crypto / injected platform primitives. Preserve canonical document semantics and all current green invariants. Push tests and implementation to PR #2, update this state with exact-head CI evidence, then release/transfer the lease.

## Continuation prompt
Driver B: re-read AUTHORITY.md and this state, verify no newer lease/head owns the same scope, then take a bounded Checkpoint-0 remediation lease. Fix immutable source-byte durability first: source bytes must survive close/reopen and be retrievable/re-hashable, with explicit missing/corrupt detection. In the same bounded increment remove/isolate `node:crypto` so the canonical core is browser-loadable without a Node polyfill. Add the required regressions, preserve all existing canonical-state tests, require green CI on the exact resulting head, update STATE.md with evidence, and release/transfer the lease. Driver A should not start parallel feature work; on its next cycle it should independently verify B's exact head and only then prepare baseline acceptance.