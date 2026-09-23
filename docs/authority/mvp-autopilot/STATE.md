# ARTTOO MVP Autopilot State

**Updated:** 2026-09-23T20:57Z
**Canonical repository:** `zhenrez/ARTTOO`
**Main head observed:** `1c46dd0c51b8afb52b50a44637af61406425abe4`
**Last verified main head:** `1c46dd0c51b8afb52b50a44637af61406425abe4` — workflow `35913212401` SUCCESS
**Working branch:** `mvp/checkpoint-1-real-browser-smoke`
**Pull request:** pending

## Lease / handoff
- Driver A **ACTIVE LEASE**: bounded Checkpoint-1 actual-browser smoke/e2e evidence only.
- Scope: production HTML/CSS/module graph in a real browser; canonical drawing/selection/Layers and browser-facing save/reopen evidence. Browser automation is evidence-only and may not own product state.
- Branch: `mvp/checkpoint-1-real-browser-smoke`; start `2026-09-23T20:57Z`.
- Expected evidence: actual Chromium run in CI plus existing Node suite; project/revision continuity through browser storage/reopen.
- Governor PR #16 remains open, exact-head green, and owns only its authority artifact. This implementation branch does not modify that path or race Governor ownership.

## Verified completed gates
- **Checkpoint 0 complete / merged.**
- **Checkpoint 1 partial.** PRs #3–#15 are merged; current exact `main` is green.

## Verified repository/application state
- Current main `1c46dd0c51b8afb52b50a44637af61406425abe4` is VERIFIED GREEN in workflow `35913212401`.
- PR #15 visible keyboard-operable Layers is merged and merged-main verified.
- Visible drawing/history/selection, canonical numeric/direct transforms, visible canonical save/reopen, canonical semantic-layer projection, and visible keyboard-operable Layers are in verified main.
- Canonical project/document state remains authoritative; browser UI and Layers are projection/controller state only.
- Current CI is Node/fake-DOM only; no actual-browser route exists yet.
- No editor SDK/vendor has been selected.

## Open gate / bottleneck
- **Open gate:** Checkpoint 1 shared editing foundation.
- **Single bottleneck:** no actual-browser acceptance route proves the accumulated editor/persistence behavior through the production web graph.
- **Closing evidence:** a $0 real-browser fixture that loads production web assets, performs canonical interaction, saves, reloads, and proves same project/revision/object continuity.

## Productive fallback
None at lease acquisition; primary path is available.

## Blockers
None for this bounded increment. Governor PR #16 is non-conflicting but must not be modified or merged by this Driver lane.

## Owner decisions required
None.

## Next highest-leverage task
Implement and verify the smallest dependency-bounded actual-browser smoke/e2e route without creating product state or selecting an editor/provider.

## Continuation prompt
Driver B: Driver A holds the bounded `mvp/checkpoint-1-real-browser-smoke` lease. Do not race the same files/scope. If this lease has been released by the time you run, FIRST verify exact-head CI and inspect that browser automation remains evidence-only, production web assets are loaded, and save/reload preserves canonical project/revision/object state. Recheck Governor PR #16 separately; do not absorb its authority path. Do not begin Checkpoint 2 or select an editor/vendor.
