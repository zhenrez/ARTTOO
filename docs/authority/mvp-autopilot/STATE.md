# ARTTOO MVP Autopilot State

**Updated:** 2026-09-23T02:01Z
**Canonical repository:** `zhenrez/ARTTOO`
**Main head observed:** `5c47fa4d5100a19165607e80e8413423dd27c008`
**Working branch:** `mvp/checkpoint-0-document-core`
**Working implementation head before this state update:** `f31fb498001ef469078966a6686c4baebb507c77`
**Pull request:** #2 — `MVP checkpoint 0: bootstrap canonical document core`

## Verified completed gates
- None yet. Checkpoint 0 remains open until the current PR head has green executable verification and the baseline is accepted on `main`.

## Current open gate
- **Checkpoint 0 — establish/recover and baseline the real application.**

## Verified repository/application state
- `main` remains the authority bootstrap at `5c47fa4d5100a19165607e80e8413423dd27c008`.
- No prior application implementation is claimed as recovered; PR #2 is explicitly new bootstrap code.
- PR #2 was open and mergeable when inspected.
- GitHub Actions workflow `verify` run `35804674631` completed **success** against prior PR head `d79f5978a0bc23e3f429750fb53aff2c1995b402`.
- The branch has since advanced; success on the prior head does not prove the current head.

## Work in PR #2
- Existing: zero-runtime-dependency Node scaffold; schema-versioned canonical Project state; command-only mutation; checksum-addressed immutable assets; stable identities; placement separated from art transforms; exact-revision approval; JSON save/reopen; regression tests and CI.
- This run: added `src/local-draft.js`, a renderer/editor-independent Web Storage-compatible persistence adapter.
- This run: added regression tests proving semantic save/reopen of source identity, body calibration and placement, plus explicit absent/removed-draft behavior.
- Corrected the adapter to use `TextEncoder` rather than Node `Buffer` for browser portability.

## Verification evidence
- Prior head `d79f5978a0bc23e3f429750fb53aff2c1995b402`: GitHub Actions `verify` run `35804674631`, conclusion `success`.
- Current implementation head before state update: `f31fb498001ef469078966a6686c4baebb507c77`.
- No workflow run was yet visible for `f31fb498...` immediately after the push. Therefore current-head tests are **pending**, not green.

## First-order checkpoint answers
1. Last verified executable state: PR #2 head `d79f5978...` passed repository-native CI; current branch has newer unverified persistence commits.
2. Open gate: Checkpoint 0.
3. Bottleneck: green executable evidence for the current branch head, then acceptance of the baseline on `main`.
4. Critical path: yes; semantic persistence is required before editor adapters can safely own UI without owning project truth.
5. Closing evidence: green `npm run check` on the current PR head, followed by invariant review/merge under repository policy.
6. Smallest reversible implementation: Web Storage-compatible adapter over canonical serialization; completed this run.
7. Cost: $0; standard Web APIs/Node test runner/GitHub Actions.
8. Duplicate state/export-reimport/provider lock-in: none introduced; storage contains canonical serialization only.
9. Reuse: native Web Storage seam is sufficient for checkpoint-0 draft proof; editor SDK selection remains deferred.
10. Owner authority: none for branch/test work. Do not autonomously merge consequential changes.

## Blockers
- Current-head CI result is pending.
- Checkpoint 0 cannot be called complete while implementation remains only on the PR branch.

## Owner decisions required
- None currently.

## Next highest-leverage task
Inspect CI for the latest PR #2 head. If red, repair immediately. If green, audit the full PR against canonical invariants and Q26 save/reload semantics. Then prepare the baseline for acceptance/merge; only after baseline acceptance should Checkpoint 1 begin with the smallest browser editing shell that dispatches canonical commands rather than storing renderer state.

## Continuation prompt
Resume PR #2 on `mvp/checkpoint-0-document-core`. Read `AUTHORITY.md` and this state first. Verify current `main`, PR head and GitHub Actions. Treat the successful run on `d79f5978...` as evidence only for that older head. Require green CI for the latest head. If green, audit immutable source identity, semantic save/reopen, body-placement separation and exact-revision approval semantics, then prepare Checkpoint 0 baseline acceptance without introducing an editor SDK or second source of truth. If red, fix the failure before any feature work.
