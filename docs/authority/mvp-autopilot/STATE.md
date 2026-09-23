# ARTTOO MVP Autopilot State

**Updated:** 2026-09-23T03:57Z
**Canonical repository:** `zhenrez/ARTTOO`
**Main head observed:** `5c47fa4d5100a19165607e80e8413423dd27c008`
**Working branch:** `mvp/checkpoint-0-document-core`
**Pull request:** #2 — `MVP checkpoint 0: bootstrap canonical document core`

## Lease / handoff
- Driver A's bounded Checkpoint-0 acceptance/remediation lease is **RELEASED**.
- Audit scope: latest PR CI, source durability, browser portability, and IndexedDB transaction semantics.
- Driver A found and remediated a durability defect in the IndexedDB adapter: operations previously resolved on request success rather than transaction completion, so a caller could observe `put()` success before the read-write transaction had durably completed.
- Remediation implementation commit: `99cd534a8290a0347d5b9b36df41c1934e7bdf4a`.
- Driver B is the intended next owner for exact-head CI verification and independent inspection. No worker should begin Checkpoint 1 until this remediation is green and Checkpoint 0 is independently accepted.

## Verified completed gates
- None yet. Checkpoint 0 remains open pending verification of the durability remediation and baseline acceptance.

## Verified repository/application state
- `main` remains at authority bootstrap `5c47fa4d5100a19165607e80e8413423dd27c008`.
- PR #2 is new bootstrap code; no prior application implementation is claimed as recovered.
- Pre-remediation PR head `3734c11714e182efce4af4f019ae7b5007486af4` completed GitHub Actions `verify` run `35814578979`, conclusion **success**.
- The earlier implementation evidence remains valid for its exact tested head only.
- `src/document.js` uses standards Web Crypto; source bytes are externalized behind the asset-store seam; missing/corrupt sources fail closed.
- Independent Driver-A inspection found the IndexedDB adapter resolved requests before `transaction.oncomplete`, weakening the durability contract despite green Node tests.

## Changes this run
- Changed `src/asset-store.js` so IndexedDB operations resolve only on `transaction.oncomplete`.
- Request results are captured on request success but not exposed until transaction completion.
- Request, transaction error, transaction abort, and synchronous operation failures reject once; database close remains in `finally` after transaction settlement.
- No framework, runtime dependency, provider, duplicate state model, or paid service was introduced.

## Verification evidence
- VERIFIED before remediation: exact PR head `3734c11714e182efce4af4f019ae7b5007486af4`, GitHub Actions run `35814578979`, conclusion `success`.
- PENDING for remediation: commit `99cd534a8290a0347d5b9b36df41c1934e7bdf4a` and subsequent state-only handoff commit require exact-head CI.
- Existing Node regression suite does not emulate real IndexedDB transaction ordering; green Node CI alone does not prove the browser transaction behavior. The code-level defect was therefore fixed fail-closed before baseline acceptance.

## Blockers
- Require green CI for the latest PR head after this state handoff.
- Checkpoint 0 still needs independent acceptance; browser IndexedDB behavior should receive a bounded transaction-order regression when feasible without adding production dependencies.

## Owner decisions required
None currently.

## Next highest-leverage task
Driver B: verify exact current PR head and CI. Independently inspect the `transaction.oncomplete` durability fix. If green, add the smallest test seam that proves a read-write operation does not resolve before transaction completion (prefer dependency-free injected fake IndexedDB events or a narrowly scoped dev-only test aid). If that evidence passes and no other Checkpoint-0 invariant fails, hand Checkpoint 0 back for baseline acceptance rather than expanding scope.

## Continuation prompt
Driver B: resume PR #2 from the latest `mvp/checkpoint-0-document-core` head. Read AUTHORITY.md and this state first; confirm no active conflicting lease. Require green CI for the exact current head. Inspect `src/asset-store.js` and verify that `put`/`delete` resolve on transaction completion, not request success, while `get` returns the captured request result only after completion. Add a bounded transaction-order regression if it can be done without production dependencies. Preserve Web Crypto portability, immutable source identity, fail-closed source verification, placement separation, and revision-bound approval semantics. If all Checkpoint-0 evidence is green, release the lease with a precise baseline-acceptance handoff; do not start Checkpoint 1 yet.
