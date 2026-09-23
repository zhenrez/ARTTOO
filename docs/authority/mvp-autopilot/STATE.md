# ARTTOO MVP Autopilot State

**Updated:** 2026-09-23T01:03Z
**Canonical repository:** `zhenrez/ARTTOO`
**Main head observed:** `5c47fa4d5100a19165607e80e8413423dd27c008`
**Working branch:** `mvp/checkpoint-0-document-core`
**Working head before this state update:** `d7c18cb439afb5432ab6dc2fd838c5c87cad5479`
**Pull request:** #2 — `MVP checkpoint 0: bootstrap canonical document core`

## Verified completed gates
- None yet. Checkpoint 0 remains open until executable verification is green and the scaffold is accepted on `main`.

## Current open gate
- **Checkpoint 0 — establish/recover and baseline the real application.**

## Verified repository/application state
- `main` authority bootstrap is verified at `5c47fa4d5100a19165607e80e8413423dd27c008`.
- Before this increment, no application scaffold existed in the canonical repository.
- No prior implementation was claimed as recovered; this increment is explicitly **new bootstrap code**.

## Work in PR #2
- Added zero-runtime-dependency Node package scaffold.
- Added schema-versioned canonical Project state and command-only mutation seam.
- Added checksum-addressed immutable source assets with deduplication.
- Added stable artboard/design/body/placement/review identities.
- Kept body placement separate from source-art transforms.
- Added exact-revision approval semantics and stale-after-edit check.
- Added JSON save/reopen round-trip.
- Added four regression tests and GitHub Actions verification.

## Verification evidence
- Static repository evidence: branch head `d7c18cb439afb5432ab6dc2fd838c5c87cad5479` contains package, core, tests and workflow; PR #2 targets `main`.
- Local execution attempt was blocked because the automation container could not resolve `github.com`; this is an environment/network limitation, not a passing test.
- GitHub Actions run was not yet visible immediately after PR creation. **Do not claim tests green until a workflow run reports success.**

## First-order checkpoint answers
1. Last verified state: authority-only `main` at `5c47fa4...`; scaffold exists only on PR #2 branch pending executable verification.
2. Open gate: Checkpoint 0.
3. Bottleneck: obtain executable proof that the new canonical document seam passes its regression suite.
4. Critical path: yes; every later editor/body/approval adapter depends on canonical state and lineage.
5. Closing evidence: green `npm run check` in repository-native CI plus review of PR #2 diff.
6. Smallest reversible implementation: the zero-dependency document core already proposed in PR #2.
7. Cost: $0 using Node standard library and GitHub Actions allowance.
8. Duplicate state/export-reimport/provider lock-in: none introduced; editor/provider serialization is deliberately excluded.
9. Reuse: defer editor SDK choice until this seam is verified; candidate editor must adapt to it rather than own state.
10. Owner authority: none required for branch/PR/test work; do not merge until verified.

## Blockers
- CI result for PR #2 not yet available at this update.

## Owner decisions required
- None.

## Next highest-leverage task
Inspect PR #2 workflow result. If green, review the diff for invariant violations and then advance Checkpoint 0 toward a minimal browser shell/persistence adapter without selecting a heavyweight editor yet. If red, fix the failing test/core behavior first.

## Continuation prompt
Resume from PR #2 on `mvp/checkpoint-0-document-core`. Read `AUTHORITY.md` and this state file, verify current `main` and PR head, then inspect GitHub Actions for the latest PR commit. Do not claim Checkpoint 0 complete without green executable evidence. Fix any CI failure before adding features. If green, audit the document seam against immutable source identity, save/reopen fidelity, placement separation and exact-revision approval, then implement the smallest browser/local-draft adapter needed to exercise the same commands without introducing editor-owned canonical state.
