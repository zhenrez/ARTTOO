# ARTTOO MVP Autopilot State

**Updated:** 2026-09-23T21:27Z
**Canonical repository:** `zhenrez/ARTTOO`
**Main head observed:** `1c46dd0c51b8afb52b50a44637af61406425abe4`
**Last verified main head:** `1c46dd0c51b8afb52b50a44637af61406425abe4` — workflow `35913212401` SUCCESS
**Working branch:** `mvp/checkpoint-1-real-browser-smoke`
**Pull request:** #17 open

## Lease / handoff
- Driver A completed the bounded Checkpoint-1 actual-browser smoke/e2e increment and released it to Driver B.
- Driver B accepted the PR #17 verification/repair lease after exact head `00c2e4fa699080352ad10783705df008c0bd3b38` failed workflow `35919606112`.
- Failure diagnosis: `browser-smoke` passed; the `node` job failed only because bare `node --test` auto-discovered `test/e2e/workspace.spec.js`, where `@playwright/test` is intentionally not installed in the dependency-free Node job.
- Driver B repaired test discovery in commit `f0b237db4bfc743cb5046e98cd7746b97f02be0b`: Node verification now explicitly targets `test/*.test.js`, keeping Playwright specs owned by the separate `test:e2e`/browser-smoke job.
- Governor PR #16 remains open and separately owned. PR #17 does not modify its authority artifact.

## Verified completed gates
- **Checkpoint 0 complete / merged.**
- **Checkpoint 1 partial.** PRs #3–#15 are merged and verified on main. PR #17 is proposed/pending exact-latest-head verification.

## Verified repository/application state
- Current main `1c46dd0c51b8afb52b50a44637af61406425abe4` is VERIFIED GREEN in workflow `35913212401`.
- Visible drawing/history/selection, canonical numeric/direct transforms, visible canonical save/reopen, semantic-layer projection, and visible keyboard-operable Layers are verified on main.
- Canonical project/document state remains authoritative; browser automation is evidence-only.
- No editor SDK/vendor has been selected.

## Work completed this run
- Refreshed repository, authority, state, open PRs, and PR #17 exact-head CI.
- Inspected failed workflow `35919606112`: actual Chromium `browser-smoke` succeeded end-to-end; Node job had 39 passing canonical/unit tests plus one erroneous Playwright auto-discovery failure.
- Repaired Node/Playwright suite isolation without changing product behavior: `npm test` and `npm run check` now target top-level Node tests only; `npm run test:e2e` remains the Playwright route.

## Productive fallback
Not used; the handed-off critical-path PR was directly repairable.

## Verification evidence
- Main `1c46dd0c51b8afb52b50a44637af61406425abe4`: workflow `35913212401` SUCCESS.
- PR #17 prior exact head `00c2e4fa699080352ad10783705df008c0bd3b38`: workflow `35919606112` FAILURE overall; `browser-smoke` SUCCESS, `node` FAILURE solely from unintended Playwright spec discovery.
- Repair commit `f0b237db4bfc743cb5046e98cd7746b97f02be0b`; exact latest head after this state update requires fresh CI before merge.

## Blockers
- Exact-latest-head PR #17 Node + browser-smoke success and final Driver B inspection are required before merge.
- Governor PR #16 remains open but non-conflicting; continue to respect its separate ownership.

## Owner decisions required
None.

## Next highest-leverage task
FIRST require exact-latest-head PR #17 CI. If both Node and browser-smoke pass, confirm the browser fixture loads production modules and real localStorage without product-state ownership, then merge with expected-head protection and verify merged-main CI. After merge, continue the Checkpoint-1 exit audit; viewport/touch-device matrix and responsive/orientation evidence remain distinct from this desktop Chromium smoke.

## Continuation prompt
Driver A: PR #17's prior exact head `00c2e4fa699080352ad10783705df008c0bd3b38` ran workflow `35919606112`: browser-smoke PASSED, while Node failed only because bare `node --test` auto-discovered the Playwright spec without Playwright installed in that intentionally dependency-free job. Driver B repaired suite isolation in `f0b237db4bfc743cb5046e98cd7746b97f02be0b`, explicitly limiting Node verification to `test/*.test.js` while leaving Playwright under `test:e2e`. FIRST require CI success on the exact latest PR head after this state commit. If green and semantics remain sound, merge with expected-head protection and verify merged-main CI. Recheck Governor PR #16 separately and do not race its authority path. Do not begin Checkpoint 2 or select an editor/vendor.
