# ARTTOO — Cross-device continuity and authority-refresh gates

**Status:** Governor acceptance artifact. This does not redefine the frozen MVP; it makes existing reliable-work, shared-document, touch/accessibility and continuity requirements testable across the device classes ARTTOO is expected to serve.

## 1. Cross-device product contract

ARTTOO must not evolve into separate desktop, tablet and phone products with divergent project formats or sources of truth. The same canonical versioned Project/Document/Command model remains authoritative everywhere.

Expected workflow emphasis:

- **Tablet / iPad-class — artist-primary creation:** full canvas, stylus/pencil and touch, drawing/editing, layers, transforms, placement, masks, wrap/seam correction, stencil preparation and consultation.
- **Desktop / laptop — artist/pro workflow:** the same project and full editor with mouse, keyboard and pen-tablet affordances and denser workspace where useful.
- **Phone — client-primary workflow:** AI-assisted design generation, cover-up planning, Digital Try-on/TVTO, catalogue/profile discovery, shopping, consultation/revisions, scheduling and approvals. The canvas remains available where the user's entitlement permits it and must use touch-appropriate controls rather than a separate document model.
- **Android phone/tablet and iPhone/iPad:** capability contracts are shared. Platform-specific adapters are allowed; platform-specific product truth is not.

Subscription/entitlement policy must gate **commands, capabilities, quotas or service quality**, not fork the document format. A device or tier that cannot invoke a premium operation must still safely load/preserve unsupported or premium project objects without destructive downgrade.

## 2. Persistent cross-device continuity

Cross-device continuity means more than synchronizing a flattened file. A project transition between devices must preserve, as applicable to the current gate:

- project/document ID and revision lineage;
- immutable source assets and derivation provenance;
- stable object/layer identity and semantic structure;
- physical artboard dimensions and units;
- source-art transforms separately from body-placement transforms;
- masks, placement/body-target state and calibration evidence;
- comments/revision requests/approval lineage when those gates exist;
- derived-artifact dependency/staleness state;
- tool/document parameters that are semantically part of the project.

Pure UI state such as panel geometry may remain device-local. Durable product truth may not.

## 3. Required device-transition fixture

Before Checkpoint 1 is declared complete, establish a runnable device/browser matrix and a real-browser test route. Before MVP completion, the same canonical fixture must prove at least:

1. create/edit on a tablet-class viewport with touch/stylus-equivalent Pointer Events;
2. persist and reopen the same project on desktop-class viewport;
3. mutate canonical state there;
4. reopen the same project on phone-class viewport and inspect/use all entitled relevant operations;
5. return to tablet-class viewport without conversion, reconstruction, export/re-import or new project identity.

Where physical Apple/Android hardware is not available in the zero-dollar test environment, emulation/viewport/browser automation is admissible as **lower evidence** and must be labeled as such. Physical-device verification remains required before claiming device support that depends on actual Pencil/stylus, mobile Safari/WebKit, Android browser, memory, battery/thermal, camera or GPU behavior.

## 4. Failure and compatibility matrix

Cross-device evidence must eventually cover:

| Case | Required behavior |
|---|---|
| Save/reopen on same device | semantic state survives; not screenshot-only |
| Device A saves; Device B opens | same project identity/revision lineage |
| Device B advances revision; stale Device A writes | fail closed, merge/reconcile explicitly, or create reviewable alternative; never silently overwrite newer state |
| Offline interruption/reconnect | committed state remains usable; reconnection does not duplicate commands |
| Browser/app suspension | recover last committed draft without corrupting source |
| Portrait ↔ landscape / resize | canvas/document geometry does not mutate merely because viewport changed |
| Mouse ↔ touch ↔ stylus | equivalent canonical commands; input modality does not create different semantics |
| Low-memory/mobile browser | graceful degradation/recovery; no silent source loss |
| Unsupported/premium feature on current tier/device | preserve object/state; explain unavailability; no destructive downgrade |
| Cross-device approval/export later in MVP | exact revision, dimensions, placement/body-target versions and staleness remain bound correctly |

## 5. Checkpoint-1 exit additions

Checkpoint 1 may not be closed solely from Node/fake-DOM tests. Require:

- at least one **actual browser** smoke/e2e route loading the production HTML/CSS/module graph;
- touch/Pointer Events coverage at tablet- and phone-class viewport sizes;
- responsive/reflow evidence for the workspace shell and Layers/transform controls;
- persistence/reopen evidence through the browser-facing storage seam;
- orientation/viewport resize does not mutate canonical artwork geometry;
- accessibility controls remain keyboard-operable and touch targets are evaluated against the product target;
- a documented device/browser support matrix distinguishing **tested**, **emulated**, **documented-only**, and **not yet tested**.

## 6. Periodic full authority recalibration

Targeted authority bootstrap remains mandatory every automation cycle. In addition, the Governor must force a **full authority refresh** rather than relying indefinitely on `STATE.md`, previous audits or accumulated summaries.

Perform a full refresh:

- at every checkpoint transition (0→1, 1→2, 2→3, 3→4);
- before declaring any checkpoint complete;
- after a material architecture/canonical-state/persistence change;
- before selecting or materially coupling an editor, AI, VTO/body, rendering, storage, commerce or other provider;
- after material changes to cross-device/platform support, entitlements/monetization, privacy/security or the golden journey;
- whenever several consecutive increments optimize one subsystem and risk losing the end-to-end target;
- whenever repository behavior and authority prose appear to conflict.

The refresh must reconcile, in order:

**AUTHORITY.md → current product specification → technology/base-options report → capability catalogue/contracts/traceability → autonomous-company/bootstrap doctrine → current STATE.md → repository/runtime/CI evidence → remaining golden journey.**

Record in `STATE.md`:

1. refresh timestamp and repository head;
2. documents actually reread;
3. confirmed target/gate;
4. superseded/conflicting assumptions found;
5. implementation gaps exposed by the refresh;
6. whether current task order remains the shortest evidence-backed route to MVP.

Accumulated implementation momentum never becomes product authority by repetition.

## 7. Immediate governor directive

The current Checkpoint-1 interaction work remains useful, but the exit-gap audit must explicitly include this artifact before opening Checkpoint 2. In particular, a green fake-DOM/controller test is not sufficient evidence for iPad/iPhone/Android/tablet/browser compatibility. The first real-browser cross-device persistence and interaction fixture should be established while the shared editor is still small enough to correct cheaply.
