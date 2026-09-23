# ARTTOO MVP Autopilot State

**Updated:** 2026-09-23T03:30Z
**Canonical repository:** `zhenrez/ARTTOO`
**Main head observed:** `5c47fa4d5100a19165607e80e8413423dd27c008`
**Working branch:** `mvp/checkpoint-0-document-core`
**PR head observed before lease:** `46f5a8f075589ca109faf974e855271e29a0bdbf`
**Pull request:** #2 — `MVP checkpoint 0: bootstrap canonical document core`

## Lease / handoff
- **ACTIVE LEASE: Driver B.**
- Scope: Checkpoint-0 remediation only: (A) immutable source-byte durability through a renderer-independent asset-store seam; (B) browser portability of the canonical document core.
- Branch: `mvp/checkpoint-0-document-core` / PR #2.
- Started: 2026-09-23T03:30Z.
- Expected evidence: source bytes survive close/reopen and re-hash exactly; missing/corrupt bytes fail explicitly; canonical core has no Node-only runtime import; all existing invariants remain green; exact resulting head receives green CI.
- Driver A and other workers must not modify this scope until this lease is released or explicitly transferred.

## Verified completed gates
- None. Checkpoint 0 remains open.

## Verified repository/application state
- `main` remains at authority bootstrap `5c47fa4d5100a19165607e80e8413423dd27c008`.
- PR #2 is new bootstrap code; no prior application implementation is claimed as recovered.
- Governor-audited executable head `0a3b221a1073cf6aa76fd432821e896d16c6ef90` had GitHub Actions `node` conclusion **success** (run `35812794921`).
- Subsequent head `46f5a8f075589ca109faf974e855271e29a0bdbf` is a state/governance-only commit identifying the two remaining Checkpoint-0 blockers.

## Current blockers
1. Browser portability: `src/document.js` directly imports `node:crypto`.
2. Immutable source durability: asset bytes are hashed but discarded; project save/reopen preserves metadata/checksum only.

## Required closing evidence
1. Renderer-independent asset-store seam keyed by immutable asset/checksum identity.
2. Import known bytes → save project/draft → simulate close/reopen → retrieve bytes → re-hash → exact checksum/byte equality.
3. Missing/corrupt source detection is explicit.
4. No direct Node-only crypto dependency in browser-facing canonical core, with portability evidence.
5. Existing transform, placement, approval, deduplication and draft tests remain green.
6. Green CI for the exact resulting head.

## Owner decisions required
None currently.

## Next highest-leverage task
Driver B owns the bounded remediation above. Do not begin Checkpoint 1 or editor SDK selection.

## Continuation prompt
Driver B is actively remediating Checkpoint 0 on PR #2. Do not race this scope. After implementation/tests are pushed, obtain exact-head CI evidence, update this file with results, and release/transfer the lease to Driver A for independent baseline acceptance.
