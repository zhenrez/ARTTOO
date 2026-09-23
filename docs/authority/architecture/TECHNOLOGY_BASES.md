# ARTOO — Current technology and reusable product bases

Research cut-off: 22 September 2026. This review updates the 2025 source assumptions and incorporates the user's clarification: **Canva is a minimum UX/UI quality benchmark, not a required supplier, codebase, clone or visual skin.** Other products may be better foundations. All exposed ARTOO features must meet the same interaction-quality contract.

**Evidence level:** primary product documentation, public repository descriptions/licenses and research papers. No candidate was installed, benchmarked, security-audited or integrated with ARTOO in this task. No source-only observation is reported as tested working behavior. Prices, terms, models and platform support must be rechecked at procurement/implementation. “Recommended” below means recommended to evaluate, not already selected.

## 1. What changed materially

| Area | Confirmed contemporary evidence | Implication for ARTOO — proposed, not demonstrated |
|---|---|---|
| Object-aware/agentic creative work | Canva AI 2.0's 2026 announcement describes layered, editable output, contextual editing and connected workflows, initially as a research preview. [A1] | Add optional selection-aware commands and editable output; do not resurrect generator-first UX against the user's explicit correction. |
| Professional craft alongside suite simplicity | Canva's current ProSuite announcement connects Affinity, Cavalry, Flourish and Leonardo; Affinity includes scene decomposition, brush/vector improvements and automation. Some announced tools remain forthcoming. [A2] | Compare real craft workflows, brush quality and cross-tool continuity. A generic drag-and-drop clone is too weak a benchmark. |
| Flattened image → editable components | Qwen-Image-Layered decomposes an RGB image into RGBA layers; its official repository states Apache 2.0. [A3] | Useful for isolating a flower, text or motif from reference art; add recomposition error check, source preservation and artist approval. It does not recover true original layers or vectors automatically. |
| Segmentation and temporal masks | SAM 3 handles concept/visual prompts for images/video. The official repository records SAM 3.1 Object Multiplex release on 27 March 2026. Its reference installation targets a CUDA environment. [A4] | Evaluate region selection and temporal masks; do not assume a desktop research model fits browser/mobile budgets or yields tattoo-specific alpha quality. |
| Single-image body fitting | SAM 3D Body estimates a human mesh using Momentum Human Rig and supports prompts; official research describes pose/shape recovery. [A5] | Strong candidate to initialize a parametric body from a photo. Inferred geometry must remain labeled and calibrated before precise measurement/handoff. |
| Monocular depth and geometry | MoGe-2 provides point/depth/normal estimation with metric-scale goals. [A6] | Compare against simpler geometry for visible-region warping and lighting normals. Metric output is a model estimate, not independent calibration evidence. |
| Multi-view/video geometry | Depth Anything 3 provides geometry across views and a streaming path. Official model cards distinguish checkpoint capabilities and licenses. [A7] | Candidate for guided capture/temporal consistency; evaluate body movement, not just static scenes. Do not assume all DA3 weights permit commercial use. |
| Browser GPU compute | Google's web platform documentation reports WebGPU support across major browsers, with OS/device qualifications. [A8] | Reevaluate web-first inference/rendering. Probe actual device features; keep a WebGL/CPU or reduced-quality route. Browser name alone is not enough. |
| Generated virtual try-on | Google Doppl demonstrates photo-based clothing visualization and generated motion; its announcement explicitly notes fit/detail inaccuracies. [A9] | Adopt rapid scenario exploration and comparison patterns. Generative tattoo previews need a separate illustrative label and cannot establish exact linework, anatomy or scale. |
| Reference libraries from personal media | Google Photos announced wardrobe extraction and mix-and-match try-on from existing photos in 2026. [A10] | Proposed analogous private inspiration library: extract motifs/palettes and organize reference material with consent. Announcement is not proof of a third-party API or tattoo transferability. |
| Offline creative continuity | Canva's 2026 announcements include essential offline editing and reconnection sync. [A11] | Treat unreliable connectivity as a normal workflow state; preserve drafts, assets and conflict handling, not only a marketing “PWA” checkbox. |
| Embeddable full editors | IMG.LY and Polotno document substantial editable design/media toolkits, while open-source editors provide possible starting code. [B1–B4] | Evaluate buying/adapting an editor before rebuilding the entire general-purpose tool layer. Body placement, rights and commerce still require ARTOO integration. |

**Architectural change proposed by this evidence:** maintain three distinguishable preview paths: (1) calibrated/registered projection that preserves exact art; (2) assisted fit from inferred geometry with stated uncertainty; (3) generated concept previews for exploration. They share the project, but cannot silently exchange accuracy labels. This preserves both the value of new generative systems and the fidelity needed for permanent art.

The parametric → photogrammetry progression need not be abandoned. Modern image-to-body and geometry models may make its initialization and correction better. They should earn their role by reducing correction effort and improving fit on fixed fixtures. MetaHuman and neural renderers remain optional advanced representations, not automatic upgrades in measurement accuracy.

## 2. Candidate products and foundations

This is a bounded shortlist of materially different routes, not a claim that these are all products in existence. Evaluate product suitability separately from framework preference.

| Candidate | What could be reused | Evidence and commercial posture | Main ARTOO gap / recommendation |
|---|---|---|---|
| **IMG.LY CreativeEditor SDK** | Embeddable photo/design/video engine, configurable UI, templates, asset integration, print/media export and AI extension surfaces | Vendor documents white-label commercial licensing and MAU-based pricing; generative provider usage billed separately. [B1] | **First commercial SDK to test**, conditional on quote/terms. Must prove full brush/selection fidelity and direct editing of art projected on a body. No turnkey tattoo mapping demonstrated. |
| **Polotno SDK** | Broad white-label design/media editor, JSON document workflow, custom panels and self-hosted render options | Commercial license required for production. Current public terms include a restriction on building competing editors/design platforms; separate source access agreement. [B2] | **Technical shortlist, contract gate first.** ARTOO's broad editor scope could intersect the restriction. Obtain written scope permission before treating it as an eligible base; this is unresolved, not an asserted prohibition ruling. |
| **ikuaitu/vue-fabric-editor** | A fuller editor shell over Fabric, modular plugins, assets/fonts/templates, menus, shortcuts and existing image-editing features | Official repository states MIT and distinguishes open code from separate commercial offerings. [B3] | **First open-source product to audit.** Test actual open edition, localization/accessibility, save fidelity, provider dependencies and Vue integration cost. Commercial demo features cannot be assumed present in the repository. |
| **dromara/yft-design** | Multi-page poster/image workflow, guides/rulers, PDF/PSD/SVG paths and Fabric-based object editing | Official repository states MIT; README also lists TODOs and separate professional/demo offerings. [B4] | **Second open-source product to audit.** Good candidate for layout/import/tooling reuse; verify unsupported import details and unfinished functions rather than taking “perfect restore” wording literally. |
| **Existing ARTOO + current Fabric.js adapter** | Potentially preserve existing React/TypeScript workflows and working custom tools; general canvas object, path and filter primitives | Current Fabric documentation available; ARTOO repository/lockfile not retrieved. [B5] | **Mandatory control candidate** in any evaluation. Highest custom-control opportunity, but may require much more UI/raster/brush work. Do not assume a rewrite wins. |
| **Photopea** | Established image-editing environment, programmable configuration/embedding, rich file/resource workflows | Official API documents iframe integration; distributor white-label and paid self-host packages exist. [B6] | **Specialist editing/round-trip candidate.** Investigate deep coupling and privacy, but embedding a separate editor is not automatically the continuous on-body workflow the user requested. |
| **Penpot** | Open design workspace, vector/layout collaboration, self-hosting and plugin/MCP interfaces | Official repository uses MPL 2.0; official self-host and plugin routes exist. [B7] | **Strong design-system/vector collaboration reference or subsystem.** A whole-product fork could impose substantial stack/runtime burden; raster painting, body mapping and commerce still need proof. |
| **tldraw SDK** | Extensible infinite canvas, spatial interaction and custom tools; candidate consultation board/AI interaction canvas | Production requires a valid license key; commercial and hobby routes differ. [B8] | **Specialist canvas candidate**, not presumed full tattoo editor. Prefer only if freeform collaboration/spatial work solves a demonstrated requirement; do not call it unrestricted MIT software. |
| **Excalidraw** | Open-format collaborative sketch/whiteboard experience suitable for mood boards and brief discussion | Official repository documents MIT and its drawing format/features. [B9] | **Specialist reference-board candidate.** Its hand-drawn diagram focus does not establish production raster/ink tooling or body mapping. |

**Provisional recommendation:** evaluate IMG.LY against the strongest open-source full-editor candidate and the current ARTOO/Fabric baseline using the same tattoo tasks. First perform a narrow source/license/gap audit of both Vue editors; carry the better evidenced one into the runnable comparison. Keep Polotno contingent on written fit of its terms. Do not choose a base from screenshots, stars, README checkboxes, language familiarity or “Canva clone” labeling.

If a complete product passes, adapt its editor/UI rather than rebuild commodity editing. If none passes, retain selected proven components while owning a coherent ARTOO document/command layer. Either route carries **the same UX/UI acceptance threshold for every exposed feature**. An embedded editor that forces an export/re-import loop to edit a tattoo on skin fails the central continuity requirement unless that limitation is actually resolved.

## 3. The base-selection experiment

Before cloning/installing or purchasing anything, establish the current ARTOO baseline, budget ceiling, deployment target, allowable licenses and supported devices. This review supplies concrete candidates; it does not assume access to paid trial keys or permission to contact vendors.

### 3.1 Canonical project fixture

Use one permissioned **stateful project fixture**, not separate demos per feature. The project contains: a flower with fine black outlines and intentional white ink; curved non-Latin text; raster wash; genuine vector geometry; masks; a flattened reference image suitable for decomposition; 100 objects across three boards; two physical-size variants; a seam-spanning sleeve; a low-end-device reference; a private client photo/video with calibrated scale; and a parametric or reconstructed body target where the candidate supports one.

The fixture begins with immutable source assets and a named project/document/revision. Every derived representation—decomposed layers, masks, body targets, placements, scenario previews, stencil sheets and exports—must retain provenance to that source and revision. A candidate may use multiple internal engines, workers or SDKs, but the user must experience **one project and one coherent edit history**.

### 3.2 Mandatory golden journey

Every editor foundation and every proposed technology stack must execute the following sequence on the **same project without export/re-import, manual file shuttling, copy/paste reconstruction or recreation in a second document**:

1. **Draw and edit source artwork.** Create/refine linework, raster wash, vector elements, text, masks and white ink with normal selection, transform, history and layer controls.
2. **Flattened-reference decomposition.** Run the candidate layered-decomposition route on the supplied flattened reference; preserve the immutable original; inspect the inferred RGBA layers; accept/reject individual results; edit an accepted layer with ordinary editor tools; record model/version and derivation lineage.
3. **Live body placement.** Place the active design revision on the calibrated client target. Establish named coordinate frames, physical size where calibrated, region/side, orientation and placement anchors. Source edits must update the projection without re-import.
4. **Pose change / view change.** Move from the initial pose/view to a materially different pose or camera angle. The system must either preserve registered placement within its confidence envelope or visibly mark loss of confidence and guide reacquisition. It may not silently present a newly guessed placement as the prior calibrated one.
5. **Mask correction in context.** Correct skin/art/occlusion masks while viewing the tattoo on the body. The correction must remain linked to the appropriate body target or design mask, be undoable, and be available to subsequent views without destructive flattening.
6. **Wrap adjustment.** Adjust deformation across a curved region, UV seam and/or flexing joint. Inspect linked flat and body views, expose distortion/unresolved regions, and preserve the source artwork separately from placement deformation.
7. **Exact-size stencil.** Generate a production-oriented stencil from the active approved candidate revision with explicit physical dimensions, orientation/mirror state, calibration evidence, ruler/known-length proof, segmentation/seam information and printer-scaling warning. The stencil remains a derived artifact linked to its source revision—not a detached file that becomes the new truth.
8. **Client revision.** Add a revision-specific client annotation or requested change after the first stencil exists; modify the source while still in the body workflow; propagate the change through placement. Prior approval and any derived stencil/export that depends on the changed revision must become visibly stale rather than silently remaining current.
9. **Artist review and approval/export.** Resolve annotations, approve a specific revision, run preflight, and produce the Go-time/artist handoff package from that same project. The export must identify exact source revision, dimensions/calibration state, placement/body-target versions, assets/rights, annotations/approval, unresolved fit issues and artifact hashes where specified by the product contract.

**A generic Canva-like editor, isolated virtual-try-on demo, segmentation benchmark or stencil generator does not pass by completing only its specialty.** A specialist component can still be admitted as a subsystem, but the surrounding ARTOO adapter must make the golden journey continuous.

### 3.3 Continuity invariants — mandatory, not averaged

The journey fails if any of these invariants break:

- **One project identity:** project/document IDs and revision lineage remain stable across editor, body, AI, review and export stages.
- **Immutable source provenance:** generated/decomposed/retouched assets never silently replace the original source asset.
- **Stable object identity:** accepted layers and design objects retain stable IDs through placement, comments, undo/redo, save/reopen and export.
- **No export/re-import bridge:** no normal workflow step requires the user to export a PNG/PSD/SVG/PDF, upload it into another surface, or rebuild placement after an edit.
- **Same command semantics:** ordinary edit commands invoked in body mode operate on the same source document objects as flat-design mode; placement transforms remain separate from source-art transforms.
- **Explicit derivation:** AI/model outputs record source revision, provider/model/version, parameters where material, and calibrated/inferred/illustrative status.
- **Stale-output invalidation:** changing source art, calibration, body target or placement marks dependent previews, stencils, approvals, quotes and exports stale according to their dependency graph.
- **Save/reopen fidelity:** closing/reopening at designated checkpoints preserves semantic layers, masks, placement, calibration, comments, history/revision references and status—not merely a screenshot.
- **Failure isolation:** timeout/cancel/crash of decomposition, segmentation, reconstruction, VTO or export keeps the last committed project state usable.
- **Export independence:** the final artist package can be produced from ARTOO-owned project state even if an optional external provider is unavailable later, except for clearly disclosed provider-owned features that were never accepted into the durable document.

A candidate that violates project continuity is **not eligible as the primary editor foundation**, regardless of visual polish or isolated benchmark scores.

### 3.4 Fault-injection checkpoints

Repeat the golden journey with controlled failures at four points: after decomposition but before acceptance; during body/mask refinement; after client revision but before reapproval; and during final export. At each checkpoint test refresh/restart, network loss, provider timeout/cancel, stale async completion, undo/redo and save/reopen. A stale asynchronous result must never overwrite a newer source revision; it becomes a separately reviewable alternative or is rejected.

At least one run must include offline/reconnect behavior where the candidate claims offline support, and one run must execute on the agreed low-end device/profile. If a paid or remote dependency is unavailable for fault testing, its evidence level remains below runnable proof rather than being inferred from documentation.

### 3.5 Measurement record

Record the existing gate metrics plus end-to-end measures that expose integration cost:

- total golden-journey completion time and active user time;
- **artist correction seconds** for decomposition cleanup, segmentation/matting repair, body-fit correction and seam/wrap correction;
- number of manual asset transfers, format conversions and duplicated/recreated objects (**target: zero normal-workflow transfers**);
- number of mode changes versus project/document changes (**project/document changes target: zero**);
- source-to-projection update latency and body-view interaction latency;
- pose/anchor drift and reacquisition behavior using calibrated units only where calibration supports them;
- source-vs-derived recomposition error and artwork mutation rate;
- exact-size stencil dimensional/round-trip error;
- save/reopen semantic fidelity at each checkpoint;
- provider/job failure recovery rate and stale-result rejection correctness;
- memory, startup/download, sustained device performance, battery/thermal behavior where measurable, per-job compute/API cost and projected 12-month platform cost;
- user-visible uncertainty/correction burden, including how often the system needs manual intervention rather than hiding a low-confidence result.

Academic model scores may be retained as supporting evidence, but **ARTOO selection is driven by project-level correction burden, fidelity and continuity on the canonical fixture**.

### 3.6 Candidate gates

| Gate | Required demonstration | Disqualifying result |
|---|---|---|
| Legal/economic fit | Actual eligible production license, dependencies/assets/models, permitted commercial product scope, projected 12-month costs | Unresolved restrictive term, incompatible model/asset license or cost beyond authorized ceiling |
| Golden-journey continuity | Complete §3.2 in one project with invariants in §3.3 preserved | Export/re-import, second-document reconstruction, detached body workflow, lost lineage or provider-owned dead end |
| Source fidelity | Import/edit/export/reopen with layers, alpha, fonts, effects and explicit unsupported conversions | Silent flattening, lost white ink, corrupt art, mutated lettering or undisclosed unsupported file contents |
| Complete tool experience | Drawing, fill, erase/masks, text, transform, layers, history, precise layout with real settings | Inactive controls or missing essential tools hidden by a polished shell |
| Body connection | Source-edit commands update projected art without manual re-import; body mode can invoke the same tools | Separate editor cannot expose needed commands/render assets at interactive rates |
| Model/AI integration | Decomposition, masks, reconstruction/VTO outputs enter as typed, reversible, provenance-bearing derivatives with confidence/status | Model output silently becomes authoritative geometry/art or overwrites immutable source |
| Extensibility | Custom body/UV stage and contextual inspector with clear versioned adapter boundary | Unmodifiable assumptions make tattoo interaction an awkward second app |
| Reliability | Crash/offline/reconnect/undo/async completion and data-export proof across §3.4 checkpoints | Acknowledged edits vanish, stale result overwrites new work or document depends on inaccessible vendor state |
| Accessibility | Keyboard/numeric core workflow, semantic layer access, touch and enlarged text through the golden journey | Unfixable focus/drag-only barriers in essential controls |
| Performance/cost | Measure prescribed workload on target devices, including rendering/AI costs and warm/cold latency | Only marketing demos work; budget or frame/time thresholds fail |
| Exact-output handoff | Revision-specific stencil/Go-time output preserves physical-size/calibration evidence, rights, annotations and approval state | Detached or ambiguous output cannot be traced to the approved project revision |

Use a 0–4 evidence score per gate: 0 not evaluated; 1 documented; 2 inspected in source; 3 demonstrated in the runnable golden journey; 4 demonstrated plus failure/round-trip regression evidence. **Do not add 0s into a fake quality ranking.** Legal eligibility, source fidelity, golden-journey continuity, body connection and exact-output handoff are mandatory gates, not weaknesses averaged away by strong template libraries or attractive VTO renders. Among candidates that pass all mandatory gates, compare implementation effort, maintenance burden, correction burden and total cost using measured estimates. Keep losing candidates' reusable ideas/components in a salvage list subject to license compatibility.

## 4. Technology experiments that could actually improve ARTOO

| Candidate experiment | Current alternative | Measure | Decision rule |
|---|---|---|---|
| SAM 3/3.1 selection/tracking | Existing remover + manual correction + lighter segmentation | Fine-line/white-ink mask fidelity; skin/clothes boundary; correction time; memory/latency | Adopt only the smallest eligible pipeline that improves real user correction workload without exceeding device/privacy budget |
| SAM 3D Body initial fitting | User-adjusted parametric model | Region alignment, silhouette, proportions, UV retargeting, calibration error and manual corrections | Use as a proposed initial fit, never silently as measured anatomy; retain easy manual correction |
| MoGe-2 or eligible DA3 geometry | Calibrated reference and simpler surface fit | Surface/normal error, temporal stability, unusual bodies/poses, hair/scars/ink and licensed deployment cost | Add where geometry improves artifact-preserving projection; do not accept attractive examples alone |
| Qwen layered decomposition | Background removal + user masks | Recomposition error, unchanged text/small motifs, alpha, layer usefulness, processing time | Accept as new editable variant only after preview; preserve source and label inferred hidden content |
| WebGPU processing | WebGL/CPU/worker baseline | Supported-device throughput, startup/download, memory, battery and recovery | Feature-detect and enable selectively; no browser-wide unsupported assumption |
| Generated try-on concepts | Deterministic source-art projection | Artwork fidelity, identity preservation, user understanding of illustrative status | May support inspiration; cannot replace calibrated projection or source-accurate Go-time exports |
| Agentic editing | Explicit tool controls | Correct target, unintended changes, reversibility and task time | Ship only when it uses the same validated commands and reduces effort without bypassing user intent |
| Commercial SDK base | Audited open source or incumbent | Core-task completion, extension effort, fidelity, recurring cost and export independence | Select only after eligibility and body-editing proof; otherwise reuse lower-level components |

Suggested first technical comparison is deliberately small: 20–30 consented diverse body/reference cases plus synthetic geometry fixtures. It can reveal failures; it cannot establish population-wide accuracy. Expand only where uncertainty or a release claim requires it. Keep protected evaluation data separate from any training set and include fixed repeatable baselines.

## 5. Advances do not remove these unsolved distinctions

- **Segmentation vs matting:** a region mask may not preserve semitransparent fine strokes and white ink. Both matter for tattoo artwork.
- **Pose vs surface:** joints and body silhouette do not establish dense local skin geometry, occlusion or sleeve seam correspondence.
- **Estimated metric depth vs calibrated measurement:** model scale estimates require validation and calibration evidence for exact print/placement promises.
- **Generated realism vs source fidelity:** diffusion can invent/alter lines, lettering, skin details and hidden anatomy. An attractive preview can be unusable as an artist handoff.
- **RGBA layers vs editable vectors:** separated pixels do not create Bézier paths, font text or original layer semantics automatically.
- **Code license vs model/asset license:** an Apache repository wrapper does not override noncommercial checkpoint or dataset terms. DA3's official table illustrates this distinction: its variants have different licenses. [A7]
- **Existing UI vs complete product quality:** supplied source failures show that a visible tool name is not evidence it functions, persists or remains available after refactors.
- **Better components vs solved integration:** no candidate reviewed establishes ARTOO's entire editor + body fit + rights + commerce workflow. This remains unproven, not “impossible” or “not found anywhere.”

## 6. Direct primary sources

These links support the narrow facts above. Recommendations are explicitly our application of that evidence to ARTOO.

- A1 — [Canva AI 2.0](https://www.canva.com/newsroom/news/canva-create-2026-ai/).
- A2 — [Canva ProSuite launch](https://www.canva.com/newsroom/news/canva-prosuite-launch/).
- A3 — [Qwen-Image-Layered official repository](https://github.com/QwenLM/Qwen-Image-Layered) and [paper](https://arxiv.org/abs/2512.15603).
- A4 — [SAM 3 official repository and 3.1 update](https://github.com/facebookresearch/sam3).
- A5 — [SAM 3D Body official repository](https://github.com/facebookresearch/sam-3d-body) and [research paper](https://arxiv.org/abs/2602.15989).
- A6 — [Microsoft MoGe official repository](https://github.com/microsoft/MoGe).
- A7 — [Depth Anything 3 official repository and model cards](https://github.com/ByteDance-Seed/Depth-Anything-3).
- A8 — [WebGPU major-browser support](https://web.dev/blog/webgpu-supported-major-browsers).
- A9 — [Google Doppl announcement and limits](https://blog.google/innovation-and-ai/models-and-research/google-labs/doppl/).
- A10 — [Google Photos wardrobe announcement](https://blog.google/products-and-platforms/products/photos/google-photos-wardrobe-feature/).
- A11 — [Canva Offline and 2026 workflow launches](https://www.canva.com/newsroom/news/canva-create-2026-launches/).
- B1 — [IMG.LY CreativeEditor SDK](https://img.ly/products/creative-sdk/).
- B2 — [Polotno overview](https://polotno.com/docs/overview), [features](https://polotno.com/sdk/product/features), [license](https://polotno.com/legal/license).
- B3 — [vue-fabric-editor official repository](https://github.com/ikuaitu/vue-fabric-editor).
- B4 — [yft-design official repository](https://github.com/dromara/yft-design).
- B5 — [Fabric.js documentation](https://www.fabricjs.com/docs/).
- B6 — [Photopea API](https://www.photopea.com/api/) and [distributor/self-hosted terms](https://www.photopea.com/api/accounts).
- B7 — [Penpot self-host](https://help.penpot.app/technical-guide/getting-started/), [MPL 2.0 license](https://github.com/penpot/penpot/blob/develop/LICENSE), [official MCP/plugin bridge](https://github.com/penpot/penpot-mcp).
- B8 — [tldraw license](https://tldraw.dev/community/license).
- B9 — [Excalidraw official README](https://github.com/excalidraw/excalidraw/blob/master/README.md).

## 7. Resulting recommendation

**Own the tattoo-specific document, placement, provenance, rights and commerce logic. Reuse the strongest proven creative editor foundation that satisfies the licensing and integration gates.** Make direct manipulation and optional intelligent assistance work on the same document. Every feature, including deferred ones when activated, must pass the shared usability/persistence/recovery contract.

The evidence supports broadening and modernizing the candidate pool now. It does not yet establish a winning base, a universal body-mapping model, a deployment cost, or production-grade parity. Those require the bounded comparisons above, not another speculative full-stack rewrite.