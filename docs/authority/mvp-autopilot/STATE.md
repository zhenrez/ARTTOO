# ARTTOO MVP Autopilot State

**Updated:** 2026-09-23T19:02Z
**Canonical repository:** `zhenrez/ARTTOO`
**Main head observed:** `d8b390e903205c19dd425993a6e1bef0a3d51427`
**Last verified main head:** `d8b390e903205c19dd425993a6e1bef0a3d51427` — workflow `35902851186` SUCCESS
**Working branch:** `mvp/checkpoint-1-visible-layers`
**Pull request:** #15

## Lease / handoff
- PR #14 semantic-layer projection is merged on main and exact-main CI is green.
- Driver A completed the bounded visible keyboard-operable Layers/object-list increment and **RELEASED / HANDOFF TO DRIVER B**.
- PR #15 must receive exact-latest-head CI and independent inspection before merge.

## Verified completed gates
- **Checkpoint 0 complete / merged.**
- **Checkpoint 1 partial.** PRs #3–#14 are merged and verified. PR #15 is pending and does not close the gate.

## Verified repository/application state
- Main `d8b390e903205c19dd425993a6e1bef0a3d51427` is VERIFIED GREEN in workflow `35902851186`.
- Visible drawing/history/selection, canonical numeric/direct transforms, visible canonical save/reopen, and canonical semantic-layer projection are merged.
- Canonical project/document state remains authoritative; browser/editor state is controller/projection only.
- No editor SDK/vendor has been selected.

## Work completed this run
- Confirmed PR #14 landed on main and exact-main push CI is green despite stale pre-merge STATE.md.
- Added `src/layers-panel.js`, a projection/controller-only visible Layers surface using the canonical semantic-layer projection.
- Added browser Layers listbox wiring with visible rows and Up/Down keyboard traversal.
- Layer selection reuses the existing canvas selection interaction; no canonical document mutation or second object state is introduced.
- Added focused regression proving visible row selection and keyboard traversal synchronize selection without advancing canonical revision.
- Opened PR #15.

## Productive fallback
Not used; primary repository mutation was available.

## Verification evidence
- Main `d8b390e903205c19dd425993a6e1bef0a3d51427`: workflow `35902851186` SUCCESS.
- PR #15 implementation/test head before this handoff: `4f24c304e9edf2a8cd3dcd2b7772fd6a0ff9be16`.
- This handoff commit advances the PR head; exact-latest-head CI is PENDING and must not inherit earlier green evidence.

## Blockers
- Exact-latest-head PR #15 CI and Driver B independent browser/accessibility inspection.

## Owner decisions required
None.

## Next highest-leverage task
Driver B: require exact-head CI for PR #15 and inspect that the Layers surface remains projection/controller-only, canvas/layer selection synchronization is reliable, keyboard traversal is operable, and no canonical revision occurs on selection. If green and sound, merge with expected-head protection and verify merged-main CI. Then continue the Checkpoint-1 exit-gap audit before opening Checkpoint 2.

## Continuation prompt
Driver B: resume PR #15 `mvp/checkpoint-1-visible-layers`, based on verified main `d8b390e903205c19dd425993a6e1bef0a3d51427`. FIRST require exact-latest-head GitHub Actions. Driver A wired the merged canonical semantic-layer projection into a visible ARIA Layers listbox with row selection and Up/Down keyboard traversal; focused regression proves selection/traversal does not mutate canonical revision. Independently inspect browser synchronization and accessibility semantics, especially the canvas-selection bridge. If exact-head CI is green and semantics are sound, merge with expected-head protection and verify merged-main CI. Then audit remaining Checkpoint-1 requirements; do not begin Checkpoint 2 or select an editor/vendor.