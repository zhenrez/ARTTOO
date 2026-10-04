# Pre-Marketplace Creation Pipeline Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete ARTTOO's creation-to-production product before marketplace work: a professional Canva-like editor, integrated tattoo/art generation, virtual try-on/body placement, persistent cross-device projects, production/stencil output, and artist/client review/approval.

**Architecture:** Preserve the canonical Project/document model as the source of truth. Rendering, generation, body-analysis/VTO, persistence, and provider integrations remain adapters around canonical assets, objects, placements, reviews, and exports; no provider-private serialization becomes the project format. Deliver vertical slices that remain editable in one project without export/re-import.

**Tech Stack:** Current browser JavaScript/ES modules, SVG editor adapter, Node 20 tests, Playwright, IndexedDB/local drafts, GitHub Actions. External generation/body providers remain behind explicit adapters until selected by evidence.

## Global Constraints

- Stop before marketplace/discovery/commerce expansion.
- Priority order: professional editor, tattoo/art generation, virtual try-on; then persistence/production/review needed to complete the pre-marketplace golden journey.
- Preserve current authority and canonical document architecture; do not reopen settled architecture.
- Same-project acceptance journey: drawing/import/generation -> editable artwork -> body placement -> pose/view change -> mask correction -> wrap adjustment -> exact-size stencil -> client revision -> artist approval/export, without export/re-import.
- Tablet/iPad-class creation and desktop remain primary artist surfaces; client participation is mobile-first; phone retains canvas access.
- Source assets remain immutable; derived edits are reversible/versioned.
- Physical sizing/calibration and uncertainty must be explicit; never imply accuracy that has not been measured.
- No marketplace implementation until this plan's acceptance journey is demonstrated.

---

### Task 1: Image asset ingestion and editable raster objects

**Files:**
- Modify: `src/editor-adapter.js`
- Modify: `src/browser-editor.js`
- Modify: `web/index.html`
- Modify: `web/main.js`
- Test: `test/browser-editor.test.js`
- Test: `test/e2e/workspace.spec.js`

**Interfaces:**
- Consumes: existing `importAsset(project, metadata, assetStore)`, `object.add`, IndexedDB asset store, canonical transforms.
- Produces: browser-visible raster objects backed by immutable canonical assets, selectable through Layers and transformable through the existing editor controls.

- [ ] Add focused tests proving an imported raster object renders from its canonical asset, selects through Layers, transforms, and survives project save/reopen without flattening.
- [ ] Verify the focused test fails because browser raster rendering/import is missing.
- [ ] Add the minimum upload/import and raster-rendering seam; preserve original bytes in IndexedDB and metadata/checksum in Project.
- [ ] Verify focused tests pass.
- [ ] Run `npm run check` and `npm run test:e2e`.
- [ ] Commit only the passing ingestion slice.

### Task 2: Professional editor core

**Files:** extend current `src/document.js`, `src/browser-editor.js`, `src/layers-panel.js`, `web/*`; add focused modules by capability rather than replacing the document model.

**Interfaces:**
- Consumes: canonical objects/assets/transforms/history from Task 1.
- Produces: editable vector/raster/text/shape objects; brush/erase/mask/select; crop; fill/stroke/color; typography; grouping/order/visibility/lock/opacity; guides/rulers/snapping/alignment; multi-artboard; searchable tool surface; keyboard/touch/numeric alternatives.

- [ ] Implement and test object/layer operations and selection semantics.
- [ ] Implement and test raster masks/erase/crop and non-destructive corrections.
- [ ] Implement and test shapes/vector paths/text plus layout/alignment/snap.
- [ ] Implement and test brush presets/stylus pressure behavior and accessible touch/keyboard controls.
- [ ] Prove save/reopen fidelity and undo/redo for every shipped tool family.
- [ ] Run exact-head Node + Playwright verification.

### Task 3: Integrated tattoo/art generation

**Files:** add provider-neutral generation contracts and browser UI; extend canonical asset provenance/version metadata.

**Interfaces:**
- Consumes: editable brief, reference assets, style/palette/placement constraints.
- Produces: preview alternatives and selected generated outputs as new immutable source/derived assets inserted into the current Project.

- [ ] Define provider-neutral generation request/result contracts including provider/model/cost/provenance.
- [ ] Implement prompt/reference generation UI without making generation a mandatory entry point.
- [ ] Insert selected output into the editor as an editable project asset; retain original/reference lineage.
- [ ] Add selective refinement/mask input and layered-decomposition seam; never flatten the whole project to change one object.
- [ ] Test provider failure/cancel/retry, stale-revision results, provenance, save/reopen, and undoable insertion.
- [ ] Verify exact head.

### Task 4: Virtual try-on and body placement

**Files:** add body-target/placement adapters and UI while retaining existing canonical `bodyTargets` and `placements`.

**Interfaces:**
- Consumes: canonical design object, permissioned photo/video/body target, calibration/uncertainty.
- Produces: editable placement with region/side, transform, physical size, masks, deformation/wrap state, and fit/uncertainty evidence.

- [ ] Ship static-photo placement first: body upload, target selection, design overlay, calibration, scale/rotate/mirror, mask/occlusion correction.
- [ ] Add segmentation/body-region adapter with manual correction fallback.
- [ ] Add pose/view/body-model adapter and preserve placement across reviewed retargeting.
- [ ] Add wrap/deformation controls with explicit seam/distortion/uncertainty reporting.
- [ ] Keep Edit Design and Adjust Placement distinct while allowing design edits from body view.
- [ ] Test diverse viewport/touch paths and the same-project transition from editor to VTO and back.
- [ ] Verify exact head.

### Task 5: Persistent cross-device project and collaboration

**Interfaces:**
- Consumes: canonical project revisions/assets/body targets/placements.
- Produces: authenticated cloud persistence, local-first recovery, conflict-safe revisions, artist/client roles, revision-bound comments and approvals.

- [ ] Add cloud persistence behind the existing project serialization boundary while retaining local recovery.
- [ ] Implement account/project permissions and artist/client collaboration.
- [ ] Implement revision/object/body-region comments and explicit revision-bound approval.
- [ ] Test desktop -> tablet -> phone continuation, offline/reconnect conflict, revoked access, missing asset recovery, and stale approval.
- [ ] Verify exact head.

### Task 6: Exact-size production/stencil and pre-marketplace acceptance

**Interfaces:**
- Consumes: approved design revision and calibrated placement.
- Produces: exact-size stencil/export artifacts with physical dimensions, calibration/preflight warnings, source revision, rights/provenance, and checksums.

- [ ] Implement exact physical sizing, stencil/line preparation, transparent output, print calibration, tiling, and preflight.
- [ ] Bind exports to exact project revision and approval state.
- [ ] Run the complete golden journey on one project without export/re-import.
- [ ] Run real-browser desktop/tablet/mobile acceptance and exact-head CI.
- [ ] Record acceptance evidence. Marketplace remains blocked until this gate passes.

## Unresolved externally observable decisions

- Generation provider/model selection remains evidence-gated; the provider-neutral contract is required before selection.
- Body segmentation/reconstruction/VTO provider/model selection remains evidence-gated against measurable placement, masking, wrap, latency, privacy, and zero-budget constraints.
- Cloud persistence/auth provider selection remains evidence-gated; it must not change the canonical Project format.
