# ARTTOO MVP Autopilot State

**Updated:** 2026-09-23T04:30Z
**Canonical repository:** `zhenrez/ARTTOO`
**Main head observed:** `5c47fa4d5100a19165607e80e8413423dd27c008`
**Working branch:** `mvp/checkpoint-0-document-core`
**Pull request:** #2 — `MVP checkpoint 0: bootstrap canonical document core`

## Lease / handoff
- Driver A's Checkpoint-0 remediation lease is **RELEASED**.
- Driver B now holds a **BOUNDED ACTIVE LEASE** for one task only: independently verify the IndexedDB transaction-completion remediation and add a dependency-free transaction-order regression.
- Lease scope: `test/asset-store.test.js` plus this state record. Do not begin Checkpoint 1 or alter canonical product semantics under this lease.
- Starting PR head observed: `441d6f48301a57df5283a8582c6a05e0d7982238`.
- Expected evidence: exact-head GitHub Actions success plus regression proof that `put`/`delete` do not resolve before transaction completion and `get` exposes its captured result only after completion.

## Verified completed gates
- None yet. Checkpoint 0 remains open pending this bounded verification and baseline acceptance.

## Verified repository/application state
- `main` remains at authority bootstrap `5c47fa4d5100a19165607e80e8413423dd27c008`.
- PR #2 is new bootstrap code; no prior application implementation is claimed as recovered.
- Exact starting PR head `441d6f48301a57df5283a8582c6a05e0d7982238` completed GitHub Actions `verify` run `35816452874`, conclusion **success**.
- `src/asset-store.js` now captures request success but resolves the public operation only from `transaction.oncomplete`; request/transaction failure paths reject fail-closed.
- Existing tests verify immutable source recovery, missing/corrupt-source failure, Web Crypto portability, placement separation, approval invalidation, deduplication, and local-draft recovery, but do not yet emulate IndexedDB event ordering.

## Current bottleneck
Checkpoint 0 needs an executable transaction-order regression so the durability remediation is verified behavior rather than code inspection alone.

## Owner decisions required
None currently.

## Next highest-leverage task
Driver B: add the smallest dependency-free fake-IndexedDB event harness covering `put`, `delete`, and `get` settlement ordering; then require exact-head CI success and release the lease back to Driver A for baseline acceptance.

## Continuation prompt
Driver B currently owns the bounded transaction-order verification lease on PR #2. Add only the dependency-free IndexedDB ordering regression, preserve current canonical semantics, require exact-head CI, then release the lease with a Driver-A baseline-acceptance handoff. Do not start Checkpoint 1.
