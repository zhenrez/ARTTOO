# ARTOO — Explicit capability catalogue

Companion to the Modern Product Design Specification · 22 September 2026

189 capability contracts; 459 original compact-PRD bullet occurrences mapped individually in `ARTOO_Source_Traceability.csv`, plus 28 direct-history/questionnaire supplements. Repeated source bullets are not counted as distinct features. Grouped names retain each named capability; they share a contract where the workflow is the same.

**Status:** this is a proposed design contract, not implemented/verified software. F = foundation; C = connected commercial/collaborative workflow; X = expansion; R = research/provider/professional evidence gate. Multiple labels identify a usable base plus deeper work. Phase is a recommendation, not deletion. New specifications are proposed even when the source capability is confirmed.

Every editing contract inherits discover/configure/target/preview/undo/save/recover/verify from the main specification. Every commercial action inherits permission, quote/terms snapshot, idempotency, accounting and exception handling. Every use of personal body media inherits private-by-default access and explicit processing/sharing choice.

## Body visualization

### CAP-001 — Static Image Visualization

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Upload a body image, choose the target region, add a transparent design and manipulate it on a locked photo; show fit, mask and calibration controls beside the result.

**Limits, dependencies and failure behavior.** Preserve the original photo; label manual/assisted fit and uncalibrated size.

**Acceptance evidence.** Save and reopen two placements with identical orientation, scale, masks and source revision.

**Source occurrences:** S1:11, S2:9

### CAP-002 — Skin Contour Mapping / Angle Warping

**Recommended sequence:** F/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Propose a region surface/warp, preview control mesh and allow anchor correction; update projection as the user changes design orientation, including wrap-around layouts.

**Limits, dependencies and failure behavior.** A planar transform is not sufficient for arbitrary curved skin; flag unsupported/unseen surfaces and self-intersections.

**Acceptance evidence.** A sleeve fixture stays continuous across supported views and seams; anchor edits change geometry rather than only overlay position.

**Source occurrences:** S1:12, S1:14, S2:10, S2:12, S3:2618

### CAP-003 — Realistic Relighting / Lighting Condition Simulation / Dynamic Lighting Studio / Time-of-Day Simulation

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Choose original lighting or named light rigs; adjust direction, strength, warmth and contrast with original/preview comparison and saved settings.

**Limits, dependencies and failure behavior.** Camera exposure and material assumptions remain visible; avoid modifying the source artwork palette silently.

**Acceptance evidence.** Switching light presets alters shading consistently while preserving design shape, selected ink values and repeatable scenario parameters.

**Source occurrences:** S1:13, S1:27, S1:28, S1:260, S2:11, S2:25, S2:26, S2:223

### CAP-004 — Live AR Visualization / AR Anchoring

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Select camera/body region, acquire tracking, attach placement, show confidence, lock/unlock, pause for editing and capture; retain full shared tool access.

**Limits, dependencies and failure behavior.** Denial, unsupported camera, occlusion and track loss produce recoverable states; remote processing requires consent.

**Acceptance evidence.** Camera denial recovers to photo/avatar; controlled motion and occlusion meet the supported-device tracking gate without floating artwork.

**Source occurrences:** S1:15, S1:70, S2:13, S2:64

### CAP-005 — Recorded Video AR

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Record or import video, trim a range, track the chosen region, inspect frame failures, correct keyframes, compare versions and export a timestamped clip.

**Limits, dependencies and failure behavior.** Detect scene cuts and variable frame rate; unsupported frames remain marked, not interpolated as reliable observations.

**Acceptance evidence.** A clip with occlusion/cut retains edits and timestamps; exporting and reopening never applies a later-frame correction to the wrong frame.

**Source occurrences:** S1:16, S2:14

### CAP-006 — Ink Representation / Skin Tone Adaptation

**Recommended sequence:** F/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Display tattoo colors over a diverse skin reference set using explicit blend/material parameters; keep selected ink palette separate from display adaptation.

**Limits, dependencies and failure behavior.** Do not infer ethnicity or claim calibrated real-ink response from a screen preview.

**Acceptance evidence.** Review color/contrast preservation across consented skin-tone and lighting fixtures; record per-group failure rates and uncertainty.

**Source occurrences:** S1:17, S1:24, S2:15, S2:22

### CAP-007 — Image Size Standardization

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Read decoded pixel dimensions, orientation, profile and alpha; create optimized preview assets while retaining original resolution and aspect ratio.

**Limits, dependencies and failure behavior.** Normalization changes working representation, not silently the requested physical tattoo size.

**Acceptance evidence.** Portrait EXIF images, huge transparent PNGs and mixed-DPI imports retain correct orientation, proportions and source originals.

**Source occurrences:** S1:18, S2:16

### CAP-008 — Background Removal Solution

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Inspect transparency on upload; run chosen remover when needed; show checkerboard and body preview with add/subtract mask refinement and restore original.

**Limits, dependencies and failure behavior.** Preserve intentional white ink and partial alpha; never treat a PNG extension or success toast as proof of removal.

**Acceptance evidence.** White-background JPEG, white-ink PNG and feathered strokes export with correct alpha and survive re-import.

**Source occurrences:** S1:19, S2:17, S3:1008

### CAP-009 — Segmentation and Color Variation

**Recommended sequence:** F/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Select a component by click, box, brush or optional description; refine/invert/feather its mask, recolor or move it into an independent layer.

**Limits, dependencies and failure behavior.** Model output is an editable proposal; show no-result/ambiguous selection and preserve all unselected art.

**Acceptance evidence.** Select one petal in a multicolor design, recolor only that petal, undo, save and reopen with the mask intact.

**Source occurrences:** S1:20, S2:18

### CAP-010 — Capture/Save Functionality

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Save the editable document and independently capture current-view image/video with resolution, background and privacy options; show local/cloud status.

**Limits, dependencies and failure behavior.** Screenshot/export and editable Save are distinct; quota/offline failures never erase the active document.

**Acceptance evidence.** Capture excludes handles/tool overlays; reopen retains editable objects and placements after interrupted synchronization.

**Source occurrences:** S1:21, S2:19

### CAP-011 — Avatar-based Visualization

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Open the same project on a generic or personal avatar, orbit/pan/zoom, choose body side and pose, place and edit artwork directly on its surface.

**Limits, dependencies and failure behavior.** Keep camera navigation distinct from placement transforms; unavailable model/texture assets have retry/fallback.

**Acceptance evidence.** Orbiting changes the view only; modifying design updates the avatar while source layers remain editable.

**Source occurrences:** S1:22, S2:20

### CAP-012 — Multi-angle Visualization

**Recommended sequence:** F/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Compare registered photos or synchronized avatar cameras showing one placement; annotate occluded/unmatched regions and save camera presets.

**Limits, dependencies and failure behavior.** Independent unregistered photos cannot be represented as a verified common coordinate system.

**Acceptance evidence.** A selected motif retains region/side across views; an unmatched photo is visibly excluded from confident fit comparisons.

**Source occurrences:** S1:23, S2:21

### CAP-013 — Texture Simulation / Seasonal Appearance Changes

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Create reversible skin-display scenarios for texture, hair/scars/stretch marks and tanning/paleness; show original beside the scenario.

**Limits, dependencies and failure behavior.** Scenarios illustrate appearance, not predict biological change; do not alter saved personal identity attributes automatically.

**Acceptance evidence.** Reset restores the original image/skin material; scenario exports include changed parameters and illustrative label.

**Source occurrences:** S1:25, S1:26, S2:23, S2:24

### CAP-014 — Size Comparison Tools / Size Calibration

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Enter physical dimensions or calibrate against a known reference, compare sizes/common objects and print a scale ruler; keep mm/inch conversion visible.

**Limits, dependencies and failure behavior.** Reference perspective and uncertainty must be recorded; no known scale means no precise physical claim.

**Acceptance evidence.** Round-trip unit conversion and exact-size export preserve dimensions; missing calibration produces a visible unresolved field.

**Source occurrences:** S1:29, S1:120, S2:27, S2:108

### CAP-015 — Pain Meter Visualization

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Toggle an educational region heat map, inspect sources/variation and record personal notes or practitioner advice separately.

**Limits, dependencies and failure behavior.** No personal pain score inferred as fact; release only with reviewed content and limits.

**Acceptance evidence.** Legend explains variability; disabling the map removes it from exports and never changes placement or booking eligibility.

**Source occurrences:** S1:30, S2:28

### CAP-016 — Edge Handling

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Show skin and ink masks separately; adjust feathering, spill suppression and occlusion boundaries using a zoomed edge preview.

**Limits, dependencies and failure behavior.** Avoid deleting fine linework or clipping foreground white ink to remove a background.

**Acceptance evidence.** Hair/skin edge and fine-line fixtures retain intended foreground while suppressing outside-region ink; undo restores mask.

**Source occurrences:** S1:31, S2:29

### CAP-017 — Body Movement Simulation / Motion Visualization

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Select a pose/movement sequence, scrub or play, inspect stretch/compression and compare neutral pose with movement.

**Limits, dependencies and failure behavior.** Rig simulation is illustrative unless fitted to validated personal motion; flag severe distortion.

**Acceptance evidence.** Joint-flex sequence retains placement identity and shows distortion/seam warnings; source art remains unchanged.

**Source occurrences:** S1:32, S1:257, S2:30, S2:220

### CAP-018 — Parametric Avatars / Body Type Diversity

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Provide editable height/proportion/limb/circumference controls, region presets, neutral view and texture choices; allow custom rather than only stereotyped bodies.

**Limits, dependencies and failure behavior.** Label the result as generalized; do not infer exact geometry from weight alone.

**Acceptance evidence.** Extreme supported proportions retain valid mesh and placement; changing shape prompts whether physical size or relative coverage should be preserved.

**Source occurrences:** S1:44, S1:48, S2:40, S2:44, S4:9026

### CAP-019 — Photogrammetric Models

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Guided region capture checks overlap, blur, lighting and coverage; reconstruct asynchronously, review defects and explicitly accept a retargeted version.

**Limits, dependencies and failure behavior.** Scans can fail; preserve previous target. Separate measured surfaces from inferred holes and require consent for processing.

**Acceptance evidence.** A known measured object/body-region fixture passes scale/seam tests; poor capture is rejected with actionable recapture guidance.

**Source occurrences:** S1:45, S2:41

### CAP-020 — MetaHuman Integration

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Import or generate an eligible compatible target through an isolated adapter; map anatomy/UVs and preserve project placements on reviewed retargeting.

**Limits, dependencies and failure behavior.** Licensing, runtime size and accurate personal fit are separate gates; photorealism alone is insufficient.

**Acceptance evidence.** Representative project opens on both base avatar and candidate model with measured placement differences and documented unsupported regions.

**Source occurrences:** S1:46, S2:42

### CAP-021 — Universal Body Map

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Maintain versioned region/side UV maps linked to 3D targets, editable source textures, seam markers and placement anchors.

**Limits, dependencies and failure behavior.** Retarget new topology explicitly; one UV convention is not universal compatibility.

**Acceptance evidence.** Known landmarks map 2D→3D→2D within tolerance; seam-crossing artwork remains continuous on supported models.

**Source occurrences:** S1:47, S2:43, S4:8247

### CAP-022 — Aging Simulation

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Offer named illustrative aging scenarios with editable assumptions, preserved original, side-by-side views and saved artist notes.

**Limits, dependencies and failure behavior.** No personal year-by-year forecast until longitudinal evidence exists; never infer a guaranteed outcome from age slider position.

**Acceptance evidence.** Every shared scenario retains assumptions and label; artist can reject it without changing the source tattoo plan.

**Source occurrences:** S1:52, S2:47

### CAP-023 — Cover-up Visualization / Cover-up Potential Analysis

**Recommended sequence:** F/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Lock the existing-tattoo reference, layer proposals with coverage/contrast comparison and allow artist annotations, alternatives and original/retouched views.

**Limits, dependencies and failure behavior.** Cover-up feasibility is a professional judgment; preview does not guarantee concealment or require removal.

**Acceptance evidence.** Original evidence remains recoverable; exported plan distinguishes proposed new ink from existing tattoo and retouched-only scenarios.

**Source occurrences:** S1:53, S1:239, S2:48, S2:196

### CAP-024 — Ink Type Rendering / White Ink Simulator

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Select labeled conventional, white, UV-reactive or specialty-ink display modes, palette/intensity and light conditions; compare on chosen skin references.

**Limits, dependencies and failure behavior.** Material behavior and safety are unverified unless supported by a validated library; UV mode is not ordinary-light appearance.

**Acceptance evidence.** Ink/light mode combinations are retained in exports and cannot be mistaken for a measured physical prediction.

**Source occurrences:** S1:54, S1:259, S2:49, S2:222

### CAP-025 — Healing Process Preview / Recovery Calculator

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Show reviewed educational healing stages and a planning range with stated inputs, sources and practitioner notes; keep booking separate.

**Limits, dependencies and failure behavior.** No diagnosis, treatment recommendation or individualized healing assurance from images.

**Acceptance evidence.** Incomplete/unsupported inputs yield no precise estimate; final display names assumptions and route to professional review.

**Source occurrences:** S1:55, S1:58, S2:50, S2:53

### CAP-026 — Realistic Blending Modes

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Provide Normal, Multiply, Screen, Overlay and tested advanced modes with opacity preview, explanation and reversible per-layer state.

**Limits, dependencies and failure behavior.** Artistic blend names do not imply physical ink accuracy; preserve source colors.

**Acceptance evidence.** Saved/reopened and exported reference patches match the chosen blend implementation; white/colored inks do not disappear unexpectedly.

**Source occurrences:** S1:56, S2:51

### CAP-027 — Color Customization Studio

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Separate fill, stroke and ink palette; provide picker, hex/RGB/alpha, eyedropper, gradients, saved/recent palettes and side-by-side skin preview.

**Limits, dependencies and failure behavior.** Out-of-gamut or uncalibrated print/display differences remain visible; no automatic recoloring without preview.

**Acceptance evidence.** Typing a color, using a swatch and sampling converge on identical stored values and undo behavior.

**Source occurrences:** S1:57, S2:52

### CAP-028 — Design Evolution Timeline

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Name revisions, preview differences, branch alternatives, compare body scenarios and restore a copy; annotate why decisions changed.

**Limits, dependencies and failure behavior.** Restoring does not rewrite prior approvals, payments or other users' work.

**Acceptance evidence.** Restored document matches its selected revision and dependent approvals clearly refer to the older version.

**Source occurrences:** S1:59, S2:54

## Input and identity

### CAP-029 — Drag-and-Drop Placement / Mouse Controls / Real-time Adjustment

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Drag from asset tray or move selection; show resize/rotate/pivot handles plus numeric controls and immediate projection updates. Wheel zooms viewport; modifier behavior is displayed.

**Limits, dependencies and failure behavior.** Distinguish viewport zoom from artwork scale; preserve aspect ratio by default and prevent accidental off-canvas loss.

**Acceptance evidence.** Pointer and numeric placement produce the same result; one gesture creates one undo step.

**Source occurrences:** S1:63, S1:66, S1:71, S2:57, S2:60, S2:65

### CAP-030 — Multi-touch Gestures

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Pinch zoom/scale, two-finger rotate, pan and tap-to-place with a clear active target; provide touch-size handles and cancel.

**Limits, dependencies and failure behavior.** Do not capture page scroll outside stage or silently transform art during two-finger navigation.

**Acceptance evidence.** Gesture changes can be reproduced by accessible controls; interrupted touches leave valid geometry.

**Source occurrences:** S1:64, S2:58

### CAP-031 — Keyboard Shortcuts

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Provide searchable/remappable action shortcuts, arrow nudges, shift increments, undo/redo, selection and command search.

**Limits, dependencies and failure behavior.** Text-entry fields keep normal typing shortcuts; shortcuts must not trap focus.

**Acceptance evidence.** Keyboard-only user selects, transforms, orders layers, saves and exports without pointer dependence.

**Source occurrences:** S1:65, S2:59

### CAP-032 — Motion Controls

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Offer device-orientation camera orbit or sensor-supported perspective only after permission; include recenter, sensitivity and off switch.

**Limits, dependencies and failure behavior.** Sensor motion is not proof of body tracking and may be unavailable.

**Acceptance evidence.** Permission denial preserves ordinary touch controls; orientation drift can be reset without moving artwork.

**Source occurrences:** S1:67, S2:61

### CAP-033 — Voice Commands / Voice-to-Adjustment

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Activate push-to-talk, show transcript and recognized action/target; adjust numeric or named properties with undo and optional confirmations.

**Limits, dependencies and failure behavior.** Never leave mic on implicitly; ambiguous, destructive or financial instructions require explicit review.

**Acceptance evidence.** Misheard target is corrected before application; canceled command changes nothing and no recording persists without permission.

**Source occurrences:** S1:68, S1:286, S2:62, S2:246

### CAP-034 — Voice-to-Design

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Dictate into the editable design brief, choose style/placement constraints, review recognized text, generate alternatives and insert one as a new asset.

**Limits, dependencies and failure behavior.** Voice input does not bypass rights, cost disclosure or generation consent.

**Acceptance evidence.** Dictation errors can be corrected before charging; selected result retains prompt and source provenance.

**Source occurrences:** S1:69, S2:63

### CAP-035 — Multiple Profiles

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** One account switches among up to one client, one artist and one studio profile; show active context on uploads, messages, orders and settings.

**Limits, dependencies and failure behavior.** Authentication identity differs from organization membership and paid plan; prevent creation of a fourth role profile.

**Acceptance evidence.** Switching role never grants private-project access or changes an order's recorded legal/economic party.

**Source occurrences:** S1:75, S2:68

### CAP-036 — Public/Private Sharing / Granular Permission System

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Set private, named participants, restricted link or public per project/asset; choose view/comment/edit/download and revoke access.

**Limits, dependencies and failure behavior.** Default body media private; permission inheritance and derived export rights explicit.

**Acceptance evidence.** A viewer cannot edit/export without permission, expired links fail, and public portfolio does not reveal private capture metadata.

**Source occurrences:** S1:76, S1:80, S2:69, S2:73, S3:11752

### CAP-037 — Backup & Restore

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Local recoverable drafts, optional synchronized backups, version restore and portable export; show timestamp, scope and storage state.

**Limits, dependencies and failure behavior.** Moving this from Native-only to cross-platform is a recommendation; restoration of encrypted messages requires a separate key plan.

**Acceptance evidence.** Recover a known revision after crash/deletion; partial restore reports missing assets instead of claiming success.

**Source occurrences:** S1:77, S2:70

### CAP-038 — Design Organization

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Folders, collections, tags, search, favorites, recent files, archive and trash with restore; support multi-select move and stable references.

**Limits, dependencies and failure behavior.** Moving an asset does not break projects that reference it or transfer ownership.

**Acceptance evidence.** Rename/move/archive keeps linked placements intact and search permissions correct.

**Source occurrences:** S1:78, S2:71

### CAP-039 — Import from Other Platforms

**Recommended sequence:** F/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Accept documented PNG/JPEG/WebP/SVG/PDF exports from Procreate, Fresco and other tools; preview supported layers/fonts/effects and conversion loss.

**Limits, dependencies and failure behavior.** Native proprietary formats require an explicit tested importer; do not claim fidelity for unsupported project files.

**Acceptance evidence.** A mixed import reports unsupported features, preserves originals and yields editable supported content with correct alpha.

**Source occurrences:** S1:79, S2:72

### CAP-040 — Tattoo Story Feature / Memory Vault

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Attach optional meaning, milestones, photos and private journal entries to a tattoo/project with per-entry audience and export choices.

**Limits, dependencies and failure behavior.** Stories never become public from portfolio sharing or training consent by implication.

**Acceptance evidence.** Export/share includes only selected entries; revoked recipient cannot retrieve later private notes.

**Source occurrences:** S1:81, S1:270, S2:74, S2:232

### CAP-041 — Style Match Quiz

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Offer visual comparisons, skip/unsure/multiple choices and a revisable preference profile; show why recommendations match.

**Limits, dependencies and failure behavior.** Aesthetic preference is not psychological diagnosis or permanent identity.

**Acceptance evidence.** Changing or deleting answers changes recommendations and removes associated personalization state as specified.

**Source occurrences:** S1:82, S2:75

### CAP-042 — Skin Type Analysis

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Let users record skin concerns voluntarily and seek practitioner guidance; any image-assisted analysis needs a defined validated purpose.

**Limits, dependencies and failure behavior.** Do not diagnose conditions or infer treatment eligibility from a photo.

**Acceptance evidence.** Unknown or unreliable analysis abstains; sensitive inputs remain separate from public profile and ads.

**Source occurrences:** S1:83, S2:76

## Marketplace and organization

### CAP-043 — Studio Tiers (ST Levels) / Studio Tiers (ST) / ST1 / ST2

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Configure studio plans for team/branch management, POD/merchandise, marketing, branding, reports and support; show actual entitlements and effective prices.

**Limits, dependencies and failure behavior.** Historical ST1/ST2 names retained; exact benefits/pricing require reconciliation. Plan level cannot override client privacy.

**Acceptance evidence.** Upgrade/downgrade preserves existing contracts and exposes a clear entitlement diff before confirmation.

**Source occurrences:** S1:87, S1:178, S1:179, S1:180, S2:79

### CAP-044 — Artist Tiers (AT Levels) / Artist Tiers (AT) / AT1 / AT2

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Configure selling, scheduling, portfolio analytics, promotion, advanced exports and support by artist plan; show fee breakdown per offer.

**Limits, dependencies and failure behavior.** Historical 75% vs 90% artist shares are unresolved commercial terms, not silently adopted rates.

**Acceptance evidence.** A plan change affects future quotes only; accepted split and payout records remain unchanged.

**Source occurrences:** S1:88, S1:175, S1:176, S1:177, S2:80

### CAP-045 — User Tiers (UT Levels) / User Tiers (UT) / Free Tier / UT1 / UT2

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Display free and paid client benefits, compute credits, avatar/simulation access, discounts and storage/export limits before purchase.

**Limits, dependencies and failure behavior.** S3 also lists Basic/Premium/Elite; preserve that alternative. Recommend recovery drafts for all, explicitly challenging no-save history.

**Acceptance evidence.** Exhausted entitlement explains alternatives and preserves work; a downgrade does not destroy prior files.

**Source occurrences:** S1:89, S1:171, S1:172, S1:173, S1:174, S2:154

### CAP-046 — Non-Compete Clauses

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Preserve requested ST2 affiliation-rule capability as versioned terms displayed before artist acceptance, with duration/scope and exit/dispute record.

**Limits, dependencies and failure behavior.** Do not implement automatic cross-studio work bans without jurisdiction/provider review; this is a business/legal gate.

**Acceptance evidence.** No rule can silently alter already accepted work; affected artist sees applicable policy source and an appeal/contact route.

**Source occurrences:** S1:90, S2:81

### CAP-047 — Cross-Studio Collaboration

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Invite artists from different organizations to a project, assign scoped roles, contribution/license terms and allocation of proceeds.

**Limits, dependencies and failure behavior.** Each studio controls only its scoped membership/offering; cross-organization private data stays isolated.

**Acceptance evidence.** Collaborators can edit agreed art and review allocation without reading another studio's unrelated client records.

**Source occurrences:** S1:91, S2:82

### CAP-048 — Organizational Hierarchy / Policy Customization

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Manage organizations, branches, staff roles, offer templates, commissions, revisions, deposits and cancellation policies with effective dates.

**Limits, dependencies and failure behavior.** Resolve platform obligations, accepted agreement and organization policy explicitly; no retroactive policy change.

**Acceptance evidence.** Checkout and booking reproduce the exact accepted policy version after subsequent studio edits.

**Source occurrences:** S1:92, S1:93, S2:83, S2:84, S4:738

### CAP-049 — Studio Virtual Tours

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Publish consented panoramic/360-degree images with accessible room descriptions, controls, branch address and booking link.

**Limits, dependencies and failure behavior.** Never imply current sanitation/credentials from a tour; remove private people or sensitive areas.

**Acceptance evidence.** Tour loads progressively, works without motion controls and routes to the correct branch's availability.

**Source occurrences:** S1:94, S2:85

### CAP-050 — Design Browsing

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Search/filter by style, artist, placement, dimensions, palette, license, price, availability and mature-content preference; open reusable preview into workspace.

**Limits, dependencies and failure behavior.** Distinguish sponsored results, sold/exclusive designs and algorithmic suggestions.

**Acceptance evidence.** Combining filters yields accurate available licenses; opening preview retains attribution and correct download restrictions.

**Source occurrences:** S1:98, S2:88

### CAP-051 — Artist Profiles / Portfolio Management

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Public portfolio with organized work, healed/fresh labels, styles, location, services, rates, availability and verified-credential scope; manage media and privacy.

**Limits, dependencies and failure behavior.** Verification badges name what was checked; sample work ownership and client consent required.

**Acceptance evidence.** A client finds relevant work and starts brief/booking; hidden or revoked media disappears from public access.

**Source occurrences:** S1:99, S1:129, S2:89, S2:116

### CAP-052 — Custom Commissions / Commission Settings

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Brief→proposal→quote with scope, price/currency, rights, milestones, included revisions and dates; negotiate changes as versioned offers.

**Limits, dependencies and failure behavior.** Accepting new terms requires both relevant parties; revision requests do not automatically change price.

**Acceptance evidence.** Approved offer becomes an immutable agreement; declined/replaced proposals cannot initiate the wrong charge.

**Source occurrences:** S1:100, S1:130, S2:90, S2:117

### CAP-053 — AI Recommendations / Seasonal Design Recommendations

**Recommended sequence:** C/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Recommend designs/artists using explicit preferences and optional interactions; explain signals, reset preferences, mark seasonal/promoted content.

**Limits, dependencies and failure behavior.** No sensitive-body/health data used for targeting by default; cold start has manual filters.

**Acceptance evidence.** Reset removes personalized ranking state; unavailable/blocked designs never reappear through recommendations.

**Source occurrences:** S1:101, S1:103, S2:91, S2:93

### CAP-054 — Wishlist Functionality

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Save designs, artists and collections with notes, availability alerts and optional shared lists.

**Limits, dependencies and failure behavior.** Saving does not reserve an exclusive license or permission to reproduce it.

**Acceptance evidence.** Sold/deleted design stays visibly unavailable in a list without broken links or false purchase availability.

**Source occurrences:** S1:102, S2:92

### CAP-055 — Limited Edition Drops

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Schedule a release, display edition inventory, eligibility/time-zone and purchase limit, reserve briefly at checkout and issue a license record.

**Limits, dependencies and failure behavior.** Define what exclusivity covers; prevent bots/duplicate allocation and disclose reservation expiry.

**Acceptance evidence.** Simultaneous purchases cannot allocate the same exclusive/numbered entitlement twice.

**Source occurrences:** S1:104, S2:94

### CAP-056 — Design Auction System

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Define eligible listing/license, opening/reserve terms, bid increments, end-time and anti-sniping policy; show bid/settlement history.

**Limits, dependencies and failure behavior.** Jurisdiction/provider eligibility and bidder obligations gate launch; failed settlement has a documented fallback.

**Acceptance evidence.** Concurrent/end-boundary bids produce a deterministic winner; refunds and seller payout reconcile to the winning agreement.

**Source occurrences:** S1:105, S2:95

### CAP-057 — Custom Flash Sheet Creator

**Recommended sequence:** F/C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Arrange motifs across physical artboards with labels, margins and prices/licenses, then export print/PDF or publish individual/bundle listings.

**Limits, dependencies and failure behavior.** A sheet can reference differently licensed designs; publishing requires each license to allow it.

**Acceptance evidence.** Reordering sheet items preserves independent asset IDs and sale availability; print scale and attribution are correct.

**Source occurrences:** S1:106, S2:96

### CAP-058 — Design Ownership Rules / Usage Limitations / Commercial vs. Personal Licenses

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Offer readable license choices with rights to edit, apply to skin, print/POD, resell, promote and train separated; attach exact terms to purchase and derivatives.

**Limits, dependencies and failure behavior.** Copyright ownership and usage permission are distinct; commissioning does not silently transfer all rights.

**Acceptance evidence.** Export/POD checks the relevant permitted use and records the accepted license version in the manifest.

**Source occurrences:** S1:110, S1:111, S1:112, S2:99, S2:100, S2:101

### CAP-059 — Artist Copyright Protection / Watermarking Options / Rights Management

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Preview watermarks, attribution, access controls, license receipts, provenance, reporting and a documented takedown/dispute workflow.

**Limits, dependencies and failure behavior.** Watermarking is deterrence, not absolute protection; never strip attribution from an export requiring it.

**Acceptance evidence.** Removing a listing preserves existing valid license receipts; unauthorized original download is denied and audited.

**Source occurrences:** S1:113, S1:114, S1:115, S2:102, S2:103, S2:104

## Orders, studio work and communication

### CAP-060 — Material Options

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Show supplier-verified temporary-tattoo materials, finish, wear guidance, supported colors, skin-use instructions, cost and production constraints.

**Limits, dependencies and failure behavior.** Historical Standard 1–3, Premium 3–7 and Waterproof 5–10 days are unverified supplier claims until validated; preserve them as candidate categories.

**Acceptance evidence.** Out-of-stock/unsupported materials cannot be ordered; checkout snapshots the selected supplier specifications and artwork revision.

**Source occurrences:** S1:119, S2:107

### CAP-061 — Shipping Options

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Quote standard/express/international shipping with destination, tracking, taxes/duties assumptions and dispatch/delivery estimates.

**Limits, dependencies and failure behavior.** Delivery estimate is not a guarantee; partial shipments, lost parcels and unsupported destinations are explicit states.

**Acceptance evidence.** Address/rate changes recalculate before charge; tracking updates the correct fulfillment item and exception workflow.

**Source occurrences:** S1:121, S2:109

### CAP-062 — Differential Pricing / Discount System

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Calculate member pricing, quantity/bundles and promotional codes with eligibility, expiry, stacking rules and full subtotal breakdown.

**Limits, dependencies and failure behavior.** Discounts cannot silently change artist royalty basis; define rounding and refund allocation.

**Acceptance evidence.** Same cart/rules yield deterministic totals; expired/ineligible codes explain failure and partial refunds reverse the correct discount allocation.

**Source occurrences:** S1:122, S1:215, S2:110, S2:175

### CAP-063 — Artist Commissions

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Attach artist/studio/platform royalty schedule to licensed POD or design sale, show amount/basis at checkout and accrue on eligible fulfillment.

**Limits, dependencies and failure behavior.** Distinguish royalty, commission fee and payout; returns and license cancellations follow snapshot rules.

**Acceptance evidence.** One fulfilled order creates one allocation; a reprint or duplicate webhook cannot pay twice.

**Source occurrences:** S1:123, S2:111

### CAP-064 — Gift Cards / Gift Options

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Buy a monetary voucher, usage-credit gift, design entitlement or POD delivery as distinct gift types; choose recipient message, scheduling and redemption.

**Limits, dependencies and failure behavior.** Currency, expiration, transferability, geography and unused-balance rules are explicit; never reveal a recipient's private body data.

**Acceptance evidence.** Duplicate redemption fails safely; refunded original purchase has deterministic effect on remaining entitlement.

**Source occurrences:** S1:124, S1:216, S2:112, S2:176

### CAP-065 — Scheduling System / Consultation Booking

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Configure studio hours, branch/artist availability, service duration, buffers, time zones and exceptions; request or reserve a consultation/session.

**Limits, dependencies and failure behavior.** Travel, overlapping calendars, DST, deposit windows and multi-session work must be handled.

**Acceptance evidence.** Concurrent clients cannot double-book; a DST transition displays correct local time and reminders reference the accepted appointment.

**Source occurrences:** S1:128, S1:136, S2:115, S2:123

### CAP-066 — Export Package

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Export the Go-time package in main §14: brief, art, stencil, coordinates, dimensions, calibration, approvals, rights, revision manifest and selected notes.

**Limits, dependencies and failure behavior.** Health data/messages excluded by default; raster-in-SVG is not true vector output; preserve unresolved-fit notes.

**Acceptance evidence.** Recipient can identify exact revision, print measured ruler and distinguish source artwork, placement preview and unresolved assumptions.

**Source occurrences:** S1:131, S2:118, S5:115

### CAP-067 — Rating System

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Eligible members submit verified-interaction ratings with category, text and optional consented media; support artist reply/report/appeal.

**Limits, dependencies and failure behavior.** Membership-only review policy retained; payment dispute and rating moderation remain distinct.

**Acceptance evidence.** Nonmembers cannot submit if that rule is retained; deleted/flagged content follows visible moderation status without changing commerce records.

**Source occurrences:** S1:132, S2:119

### CAP-068 — Deposit Requirement Options / Deposit Management

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Quote deposit amount/percentage, due date, refundability and balance schedule; collect via supported provider and show paid/pending/failed state.

**Limits, dependencies and failure behavior.** Authorization, capture and transfer are distinct; deposits are not cash held by an unimplemented escrow service.

**Acceptance evidence.** Retried deposit action cannot double-charge; expiry releases booking according to accepted policy and reconciles money.

**Source occurrences:** S1:133, S1:159, S2:120, S2:143

### CAP-069 — Cancellation Policy Management / Refund Policies

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Present no-show/late-cancel/refund rules before acceptance; record request, eligible amount, review and provider execution.

**Limits, dependencies and failure behavior.** Organization terms do not silently override applicable platform/transaction obligations; partial fulfilled items need separate disposition.

**Acceptance evidence.** Refund shown complete only after provider evidence; old orders retain their accepted policy despite later edits.

**Source occurrences:** S1:134, S1:223, S2:121, S2:182

### CAP-070 — Waitlist Functionality

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Let client specify acceptable dates/services and contact choices; offer canceled slot to eligible waitlist entries with hold expiry and opt-out.

**Limits, dependencies and failure behavior.** Do not book or charge without the specified authorization; avoid multiple accepted offers for one slot.

**Acceptance evidence.** Two recipients accepting concurrently result in one valid booking and a clear alternative for the other.

**Source occurrences:** S1:135, S2:122

### CAP-071 — Timelapse Recording

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Record design-operation playback or canvas frames with pause, private-layer exclusion, playback speed and export consent.

**Limits, dependencies and failure behavior.** Body captures, messages and off-canvas content are excluded unless explicitly included.

**Acceptance evidence.** Replay reproduces intended creation sequence without revealing hidden private assets or transient notifications.

**Source occurrences:** S1:137, S2:124

### CAP-072 — Client Brief Templates

**Recommended sequence:** F/C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Structured, editable brief for references, meaning, placement, scale, color, budget, dates, constraints and multiple/unsure answers; reusable studio templates.

**Limits, dependencies and failure behavior.** Required fields are purpose-specific; health information lives in a separately permissioned form.

**Acceptance evidence.** Client can submit an incomplete creative idea with explicit unknowns; artist sees references and missing decisions without invented answers.

**Source occurrences:** S1:138, S2:125

### CAP-073 — Health Screening Forms

**Recommended sequence:** C/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Versioned practice-specific questionnaires, consent/release signing, signer identity, timestamps and restricted staff access; export a signed copy to authorized parties.

**Limits, dependencies and failure behavior.** Forms do not replace professional assessment; data-retention and legally valid signature requirements need jurisdiction-specific review.

**Acceptance evidence.** Changed form requires a new signature; public sharing/ordinary design export cannot include responses accidentally.

**Source occurrences:** S1:139, S2:126

### CAP-074 — Anonymous Portfolio Reviews

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Submit consented portfolio subset, remove identity metadata, collect structured critique and reveal identity only by choice.

**Limits, dependencies and failure behavior.** Anonymity may be imperfect if art is recognizable; reviewer conflict/report mechanisms required.

**Acceptance evidence.** Downloaded review pack omits identifying metadata and hidden client material; reviewer can decline a conflict.

**Source occurrences:** S1:140, S2:127

### CAP-075 — Artist-User Collaborative Sketchbook / Real-time Collaborative Design

**Recommended sequence:** C/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Shared references, drawing, annotations and live cursors in the same project; object-level operations with roles, version history and conflict handling.

**Limits, dependencies and failure behavior.** Observer/commenter/editor roles differ; offline conflicts and simultaneous edits never silently overwrite.

**Acceptance evidence.** Two editors change separate objects, reconnect and converge; read-only guest cannot mutate document via UI or direct request.

**Source occurrences:** S1:141, S1:285, S2:245, S4:726

### CAP-076 — Asynchronous Messaging (MVP) / Messaging Integration

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Persistent project/order-linked threads with unread state, attachments, delivery status and reference to design revision; configurable notifications.

**Limits, dependencies and failure behavior.** Message send failure retains a draft; orders and chat history are distinct records.

**Acceptance evidence.** Opening a revision comment goes to its original revision; retry does not create duplicate messages.

**Source occurrences:** S1:145, S1:224, S2:130, S2:183

### CAP-077 — Real-time Chat (Native)

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Add live delivery, presence and optional typing/read indicators to the same threads, with offline catch-up and notification controls.

**Limits, dependencies and failure behavior.** Recommend capability-based web/mobile support instead of Native-only gate; presence is best-effort, not proof of availability.

**Acceptance evidence.** Disconnect/reconnect delivers each message once in stable order and preserves privacy settings.

**Source occurrences:** S1:146, S2:131

### CAP-078 — Media Attachments

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Attach images/files/preview references with progress, cancellation, malware/type validation, size limits and participant-scoped access.

**Limits, dependencies and failure behavior.** Full-resolution body photos require separate audience awareness; thumbnail must not bypass permissions.

**Acceptance evidence.** Removed participant cannot fetch attachment URL; failed upload leaves recoverable local file and no falsely sent message.

**Source occurrences:** S1:147, S2:132

### CAP-079 — Message Templates

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Personal/studio replies with named variables, preview and editable content for quotes, aftercare, reminders and common answers.

**Limits, dependencies and failure behavior.** Never auto-send AI/template content or financial promises without configured authorization.

**Acceptance evidence.** Missing variables block send or remain clearly marked; recipient/context preview prevents wrong-client messages.

**Source occurrences:** S1:148, S2:133

### CAP-080 — Response Indicators

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Show aggregated typical response range and last-updated context; allow away status and office hours.

**Limits, dependencies and failure behavior.** Do not expose exact personal activity or guarantee a response deadline from an average.

**Acceptance evidence.** Insufficient history shows unavailable rather than invented hours; paused profiles show the correct status.

**Source occurrences:** S1:149, S2:134

### CAP-081 — End-to-end Encryption (Native)

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Define endpoint keys, participant changes, encrypted attachments, local storage, device transfer, recovery and authorized reporting in a reviewed threat model.

**Limits, dependencies and failure behavior.** Server AI/search cannot read E2EE content without a separate consented design; key loss behavior must be explicit.

**Acceptance evidence.** Server-side storage cannot decrypt a test thread; removed members lack new keys; recovery works only under the declared policy.

**Source occurrences:** S1:150, S2:135

### CAP-082 — Aftercare Buddy System

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Opt-in peer matching by broad timing/interests, private group conversation, boundaries, blocking and reviewed educational links.

**Limits, dependencies and failure behavior.** No automatic health-data sharing or peer diagnosis; users can participate without revealing body images/location.

**Acceptance evidence.** Opt-out removes future matching; block stops interaction; health questions route to professional-care resources rather than model diagnosis.

**Source occurrences:** S1:151, S2:136

## Payments and business

### CAP-083 — Multi-directional Payment System

**Recommended sequence:** C/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Define supported client/artist/studio/platform transfers plus requested user-to-user and collaborator payments; present purpose, sender/recipient, fees, status and receipt.

**Limits, dependencies and failure behavior.** General P2P and cross-border rails require explicit provider eligibility; internal credits are not a cash wallet.

**Acceptance evidence.** Each enabled route has tested debit/credit, rejection, reversal and statement reconciliation; unsupported routes stay clearly unavailable.

**Source occurrences:** S1:155, S2:139

### CAP-084 — Commission Splitting / Variable Fee Structure

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Calculate versioned platform, studio and artist allocations per accepted offer with amount basis, currency, tax/processing-fee responsibility and rounding.

**Limits, dependencies and failure behavior.** Changes to membership do not alter accepted allocation; percentages alone are insufficient without defining gross/net basis.

**Acceptance evidence.** Minor-unit allocations balance for ordinary, discounted, partial-refund and FX cases; duplicate events do not duplicate earnings.

**Source occurrences:** S1:156, S1:157, S2:140, S2:141

### CAP-085 — Escrow System

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Preserve secure milestone payment intent; offer provider-supported holding/release with explicit conditions, duration, dispute route and beneficiary.

**Limits, dependencies and failure behavior.** Do not call delayed payout escrow unless actual qualified arrangement exists; no product promise of indefinite custody.

**Acceptance evidence.** Gate includes provider contract and end-to-end held/released/refunded/expired states; absent support shows an honest alternative.

**Source occurrences:** S1:158, S2:142

### CAP-086 — Installment Plans

**Recommended sequence:** C/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Present total price, installment amounts/dates, fees/interest if any, failure handling and consent; separate payment schedule from lending offer.

**Limits, dependencies and failure behavior.** Regional/provider eligibility required; do not create unqualified credit underwriting.

**Acceptance evidence.** Failed installment updates balance and appointment policy without duplicate fees or unintended artist payout.

**Source occurrences:** S1:160, S2:144

### CAP-087 — Multiple Withdrawal Options

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Show eligible standard/instant payout options, fees, estimated arrival and linked account verification; track pending/paid/failed/returned states.

**Limits, dependencies and failure behavior.** Historical 3–5 day schedule is not universally promised; availability/currency depend on provider.

**Acceptance evidence.** Failed/returned payout reconciles balance; selecting instant exposes fee before confirmation.

**Source occurrences:** S1:161, S2:145

### CAP-088 — Tax Documentation

**Recommended sequence:** C/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Statements summarize gross sales, fees, refunds, taxes, allocations and payouts by period; eligible provider-generated tax forms appear with corrections.

**Limits, dependencies and failure behavior.** Tax-form obligations depend on jurisdiction/party; do not imply ARTOO determines every person's filing duty.

**Acceptance evidence.** Statement totals reconcile to ledger and provider events; corrected records produce a versioned statement rather than silent overwrite.

**Source occurrences:** S1:162, S2:146

### CAP-089 — Currency Conversion

**Recommended sequence:** C/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Show presentment/settlement currencies, quoted rate/time, conversion fee and expiry before acceptance.

**Limits, dependencies and failure behavior.** No silent currency mixing; refunds may differ due to FX and must disclose policy.

**Acceptance evidence.** Currency exponents and rounding remain correct; an expired rate triggers review before payment.

**Source occurrences:** S1:163, S2:147

### CAP-090 — Payment Method Diversity

**Recommended sequence:** C/X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Retain card, PayPal, Venmo, Cash App, Google Pay, Revolut, Stripe-supported methods, Apple Pay and crypto in the capability matrix; display only eligible routes.

**Limits, dependencies and failure behavior.** None is assumed universally available or free; crypto is separately gated and not required for normal checkout.

**Acceptance evidence.** Unsupported device/region never yields a dead payment button; accepted methods have tested failure/refund/receipt paths.

**Source occurrences:** S1:164, S2:148

### CAP-091 — Loyalty Programs

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Earn/redeem defined points or discounts for eligible repeat activity; show balance, expiry, rules and reversal effects.

**Limits, dependencies and failure behavior.** Loyalty units differ from cash and generation credits; refunded activity cannot silently retain unearned value.

**Acceptance evidence.** Accrual/reversal/redemption is idempotent and presents the correct discount in a multi-seller cart.

**Source occurrences:** S1:165, S2:149

### CAP-092 — Charity Flash Events

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Create beneficiary-linked event, eligible designs, allocation percentage/basis, schedule and public accounting summary with artist consent.

**Limits, dependencies and failure behavior.** Beneficiary verification and payment eligibility required; distinguish donation from artist revenue and fees.

**Acceptance evidence.** Final report reconciles proceeds and transfers; cancellation/refund updates beneficiary allocation transparently.

**Source occurrences:** S1:166, S2:150

### CAP-093 — Tiered Subscriptions / Member-Only Features

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Central entitlement catalogue powers pricing, tool availability, quota messages and account settings; show upgrade/downgrade effective date and billing terms.

**Limits, dependencies and failure behavior.** Do not hide unsupported features behind payment; permission, plan and hardware availability are separate reasons.

**Acceptance evidence.** Identical entitlement policy governs UI, export, API and background jobs; cancellation preserves documented access until effective expiry.

**Source occurrences:** S1:170, S1:187, S2:153, S2:157

### CAP-094 — Early Adoption Pricing / Free for first 100 users / 50% discount for next 1,000 users / Full pricing thereafter

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Retain historical cohort proposal as an explicit campaign with eligibility counter, benefit duration, included plan, abuse controls and receipt.

**Limits, dependencies and failure behavior.** Current approval and economics unresolved; cannot imply perpetual free access or discount without terms.

**Acceptance evidence.** Concurrent signups allocate the last cohort slot once; users see the benefit duration and post-promotion price before accepting.

**Source occurrences:** S1:181, S1:182, S1:183, S1:184

### CAP-095 — Credit System

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Meter named expensive actions with per-action cost, remaining/renewal/rollover, reservations, completed charges and failure refunds; optional one-time top-ups.

**Limits, dependencies and failure behavior.** Historical 8/day versus 2/day/20/day quotas conflict; ordinary editing and failed jobs should not silently consume credits.

**Acceptance evidence.** Job retry, cancellation and provider failure reconcile reserved/consumed credits exactly once.

**Source occurrences:** S1:185, S2:155

### CAP-096 — One-time Purchases

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Permit eligible design licenses, POD, services or credit packs without a subscription; present rights, total and guest/account recovery route.

**Limits, dependencies and failure behavior.** Product availability depends on studio/artist offer; gift/return rules vary by item type.

**Acceptance evidence.** Non-subscriber can complete an eligible POD purchase and recover receipt/order without gaining unrelated premium access.

**Source occurrences:** S1:186, S2:156

### CAP-097 — Studio Partnerships / Artist Promotion System / Brand Alliances / Promotional Tools / Sponsorship Infrastructure

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Partner dashboard manages agreed campaigns, featured artists, brand placements, asset approvals, dates, attribution and revenue share with performance reports.

**Limits, dependencies and failure behavior.** Label paid placement; do not let sponsorship change quality badges or expose private client activity.

**Acceptance evidence.** Expired campaign stops placement; organic and paid metrics are separated and allocated revenue reconciles.

**Source occurrences:** S1:191, S1:192, S1:193, S1:194, S1:195

## Education, discovery and communities

### CAP-098 — Tattoo History / Heritage Preservation

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Curated, attributed histories with sources, community/practitioner contributions, dates, region context and optional multimedia/oral-history records.

**Limits, dependencies and failure behavior.** Consent and cultural stewardship govern publication; uncertain or contested accounts are labeled.

**Acceptance evidence.** Reader can inspect provenance/corrections; restricted traditional knowledge is not republished through automatic recommendations.

**Source occurrences:** S1:199, S1:298, S2:160, S2:257

### CAP-099 — Interactive World Map / Geographic Heat Map

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Explore styles, events and contributing artists by region; optionally show aggregated popularity with sample period and minimum aggregation threshold.

**Limits, dependencies and failure behavior.** Popularity is not cultural origin; private client coordinates never appear as points.

**Acceptance evidence.** Sparse data yields no heat claim; map has accessible list alternative and every geography links to source/context.

**Source occurrences:** S1:200, S1:267, S2:161, S2:229

### CAP-100 — Style Discovery / Artist-Style Connections

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Browse a style taxonomy with examples, related techniques and artists who self-identify/are reviewed for it; combine location/license filters.

**Limits, dependencies and failure behavior.** Styles overlap; support multi-label/uncertain classifications and cultural context.

**Acceptance evidence.** User can follow a style and find suitable artists without forced single-style assignment.

**Source occurrences:** S1:201, S1:203, S2:162, S2:164

### CAP-101 — AI Style Matcher / Style Identification / Artist Recognition / Tattoo Recognition

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Upload a permissioned reference to retrieve similar styles/designs/artists with scores and explanations, plus manual taxonomy refinement.

**Limits, dependencies and failure behavior.** Similarity does not prove authorship or identify a person; images stay private unless shared.

**Acceptance evidence.** Known/unknown-style test set includes abstention; no result asserts a specific tattoo creator without supporting provenance.

**Source occurrences:** S1:202, S1:236, S1:237, S1:238, S2:163, S2:193, S2:194, S2:195

### CAP-102 — Expert Contributors / Certification Programs

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Contributor profiles, reviewed lessons and assessment tracks with issuer, prerequisites, learning objectives and completion records.

**Limits, dependencies and failure behavior.** A course completion badge is not automatically professional licensure or accreditation.

**Acceptance evidence.** Issued credential states exactly who certifies what and supports correction/revocation.

**Source occurrences:** S1:204, S1:205, S2:165, S2:166

### CAP-103 — Live Webinar Integration

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Publish sessions with timezone, accessibility features, registration, reminders, participation and consented replay/transcript.

**Limits, dependencies and failure behavior.** External attendance/video providers need scoped permission; recording is disclosed.

**Acceptance evidence.** Timezone conversion is correct, keyboard registration works, and replay access follows the purchased/granted entitlement.

**Source occurrences:** S1:206, S2:167

### CAP-104 — Community Knowledge Base

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Searchable articles, edits, sources, contributor attribution, moderation and version history for techniques and practical guidance.

**Limits, dependencies and failure behavior.** Separate professional advice, personal experience and unverified claims; no automatic acceptance of medical claims.

**Acceptance evidence.** A corrected article shows revision/source and reported content can be reviewed without losing prior record.

**Source occurrences:** S1:207, S2:168

### CAP-105 — Ink Events Calendar

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** List conventions, guest spots, flash events and studio sessions with dates, venues, accessibility info and interested/follow actions.

**Limits, dependencies and failure behavior.** Dates are source-linked and refreshable; a listed event is not a booked appointment.

**Acceptance evidence.** Canceled/rescheduled event propagates to subscribers and linked listings without changing paid bookings silently.

**Source occurrences:** S1:208, S2:169

### CAP-106 — Shopping Cart / AR Preview

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Multi-item/multi-seller cart supports optional preview in workspace, quantities/licenses, split fulfillment and full price summary.

**Limits, dependencies and failure behavior.** Cart preview does not grant export rights; exclusive inventory can expire.

**Acceptance evidence.** Mixed digital/POD/service items retain correct taxes, rights and separate fulfillment states; preview edits do not change purchased artwork without confirmation.

**Source occurrences:** S1:212, S1:213, S2:172, S2:173

### CAP-107 — Auto-save Cart

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Restore signed-in cart across sessions/devices with visible unavailable items and expiry policy; retain historical 48-hour rule as configurable proposal.

**Limits, dependencies and failure behavior.** Restored cart reprices and revalidates inventory, shipping, discounts and licenses before checkout.

**Acceptance evidence.** Returning after price/license change requires explicit review and never charges the stale total.

**Source occurrences:** S1:214, S2:174

### CAP-108 — Commission Tracking

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Timeline of quote, deposit, draft, revision, approval, delivery, balance, payout and exceptions; each status identifies actor and timestamp.

**Limits, dependencies and failure behavior.** Status transitions require actual evidence; an assistant-generated message cannot mark payment complete.

**Acceptance evidence.** Client/artist see the same accepted revision and can inspect reason for delay/dispute.

**Source occurrences:** S1:220, S2:179

### CAP-109 — Completion Estimates

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Artist sets a date or range from workload/milestones, updates with reason and notifies affected participants.

**Limits, dependencies and failure behavior.** Forecast is not guaranteed; no invented estimate when availability is unknown.

**Acceptance evidence.** Changed estimate preserves earlier promise/history and distinguishes blocked inputs from artist work time.

**Source occurrences:** S1:221, S2:180

### CAP-110 — Revision System

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Request changes against a specific revision, categorize included/out-of-scope, annotate objects/regions and accept a versioned change order if needed.

**Limits, dependencies and failure behavior.** Unlimited revisions are not inferred; new cost needs acceptance before charging.

**Acceptance evidence.** Requests cannot silently modify approved art or consume allowance twice on retry.

**Source occurrences:** S1:222, S2:181

### CAP-111 — Forums and Discussion Boards

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Topic spaces, search, threads, media permissions, subscriptions, reporting, blocks and moderator actions with appeals.

**Limits, dependencies and failure behavior.** Separate public discussion from private project messages; mature preferences apply.

**Acceptance evidence.** A private attachment cannot be posted by URL leakage; moderation status is clear and accessible.

**Source occurrences:** S1:228, S2:186

### CAP-112 — Design Feedback System

**Recommended sequence:** C/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Invite chosen reviewers/community to comment on a revision with criteria such as composition/readability/placement and a choice of anonymous/public feedback.

**Limits, dependencies and failure behavior.** Comments are suggestions; applying one creates an editable change and preserves authorship/rights.

**Acceptance evidence.** Review resolution records which revision changed; a new revision does not pretend earlier reviewers approved it.

**Source occurrences:** S1:229, S2:187

### CAP-113 — Artist Mentorship Programs / Apprenticeship Marketplace

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Mentor/apprentice profiles, goals, availability, eligibility, applications, agreed program and progress record; optional fees use supported commerce.

**Limits, dependencies and failure behavior.** Qualifications, safeguarding and employment/training terms need review; platform match is not credential endorsement.

**Acceptance evidence.** Applicant controls shared information and can withdraw; acceptance creates explicit terms rather than silent account access.

**Source occurrences:** S1:230, S1:232, S2:188, S2:190

### CAP-114 — Contest/Challenge System

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Publish brief, rules, rights, judging criteria, dates, prize/funding and submission workflow with results/appeals.

**Limits, dependencies and failure behavior.** Entry does not silently assign all copyright or training permission; eligibility/payment law gate where applicable.

**Acceptance evidence.** Late/duplicate entries are handled consistently and judges see only authorized material under declared anonymity rules.

**Source occurrences:** S1:231, S2:189

### CAP-115 — Artist Residency Program

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Schedule featured-artist periods with editorial assets, availability, events, commercial terms and disclosure.

**Limits, dependencies and failure behavior.** Promotion does not imply verified superiority; end-date and cancellation visible.

**Acceptance evidence.** Residency expires automatically and linked booking/artist pages stay valid.

**Source occurrences:** S1:265, S2:227

### CAP-116 — Tattoo Tinder

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Swipe or use accessible buttons to save, skip, dislike or request similar designs; give preference reset and exploration controls.

**Limits, dependencies and failure behavior.** Working title only; avoid making compulsive engagement the success metric or hiding creator/rights information.

**Acceptance evidence.** Disliked designs respect preferences; keyboard/buttons provide equivalent actions and saved art opens correctly in workspace.

**Source occurrences:** S1:266, S2:228

### CAP-117 — Tattoo Tourism Guide

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Combine artist/guest availability, travel destination references, consultation preparation and event information with links to current sources.

**Limits, dependencies and failure behavior.** No invented travel/legal/medical guarantees; booking and travel purchases are distinct.

**Acceptance evidence.** Guide flags stale dates and routes to the actual studio branch and current booking availability.

**Source occurrences:** S1:268, S2:230

### CAP-118 — Design Crowdsourcing

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Publish a brief to eligible artists, define compensation, confidentiality, selection criteria, submission rights and proposal comparison.

**Limits, dependencies and failure behavior.** Unselected proposals remain the creator's property unless explicit agreed terms say otherwise.

**Acceptance evidence.** Client cannot export/use unlicensed losing proposals; selected work becomes a normal commission agreement.

**Source occurrences:** S1:269, S2:231

### CAP-119 — Genealogy of Style

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Explore attributed influence relationships with direction, source, date and disputed/uncertain status; allow corrections and artist participation.

**Limits, dependencies and failure behavior.** Similar appearance is not proof of influence or lineage.

**Acceptance evidence.** Every asserted connection has a source/status; removing an unsupported link does not erase unrelated contributors.

**Source occurrences:** S1:271, S2:233

## Extensibility and expanded experience

### CAP-120 — Plugin Architecture

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Versioned extension registry with declared capabilities, scopes, compatible document schema, UI placement, installation/disable/update and owner review.

**Limits, dependencies and failure behavior.** Extensions cannot read private projects/payment data by default or corrupt documents; isolate execution and preserve export portability.

**Acceptance evidence.** Disabled/crashing plugin leaves project openable; permission denial is enforced outside its UI and unsupported data is retained safely.

**Source occurrences:** S1:243, S2:199

### CAP-121 — API Integration / Calendar Synchronization / CRM Integration

**Recommended sequence:** C/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Scoped connectors for external booking, calendars and studio CRM with field mapping, ownership/source-of-truth, consent, retry and sync history.

**Limits, dependencies and failure behavior.** Handle revoked tokens, rate limits, timezones, conflict and duplicate events; do not import health fields by default.

**Acceptance evidence.** Replayed webhook yields one appointment/client update; conflict presents both values rather than silently overwriting.

**Source occurrences:** S1:244, S1:251, S1:252, S2:200, S2:207, S2:208

### CAP-122 — Custom Script Support

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Let artists save validated actions for transforms, naming, batch export and visualization rules; preview affected objects and run with limits.

**Limits, dependencies and failure behavior.** Sandbox with no default network/secrets/payment access; command transactions enable rollback.

**Acceptance evidence.** A script that exceeds time/memory stops without partial corrupt state; user can undo the full accepted change.

**Source occurrences:** S1:245, S2:201

### CAP-123 — Style Pack System

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Install licensed brushes, templates, palettes, textures and example presets with preview, provenance, compatibility and updates.

**Limits, dependencies and failure behavior.** A style pack grants only listed rights; dependency fonts/assets and versions remain tracked.

**Acceptance evidence.** Uninstall leaves existing work reproducible or reports missing dependencies with embedded/permitted fallback.

**Source occurrences:** S1:246, S2:202

### CAP-124 — Custom UI Themes

**Recommended sequence:** F/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Light/dark/high-contrast plus custom tokens and density; preview before apply, reset and retain per-device preference.

**Limits, dependencies and failure behavior.** Interface theme never changes white artboard, print background or actual artwork color.

**Acceptance evidence.** Theme switch preserves source art and contrast/focus checks; invalid custom contrast produces a useful warning.

**Source occurrences:** S1:247, S2:203

### CAP-125 — Language Localization Framework

**Recommended sequence:** F/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Externalized strings, locale-aware numbers/currency/dates, RTL layouts, font shaping and translation review; choose language independent of location.

**Limits, dependencies and failure behavior.** User text is not automatically translated; names/licenses retain exact approved wording.

**Acceptance evidence.** Arabic/long-text/large-font fixtures fit panels and exports without clipped or reversed art labels.

**Source occurrences:** S1:248, S2:204

### CAP-126 — Analytics Integration

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Private artist/studio dashboards for inquiries, accepted briefs, sales, fulfillment, fees and repeat usage with time range and consented event definitions.

**Limits, dependencies and failure behavior.** Separate organic/paid and previews/successful outcomes; exclude body media, message contents and health data from events.

**Acceptance evidence.** Dashboard totals reconcile to orders/ledger and respect organization/branch access; low sample size is visible.

**Source occurrences:** S1:249, S2:205

### CAP-127 — Social Platform Connectors

**Recommended sequence:** C/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Export permissioned previews to Facebook, Instagram, Pinterest and eligible networks; choose crop/caption/attribution/audience and preview before publish.

**Limits, dependencies and failure behavior.** Platform APIs may limit direct posting; offer downloadable/share-sheet fallback and never auto-publish private body imagery.

**Acceptance evidence.** Revoked connector retains draft; exported image has intended attribution and no hidden private metadata.

**Source occurrences:** S1:250, S2:206

### CAP-128 — Projection Mapping Tool / AR Studio Mirror

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Calibrate camera/display/projector to region, select client-approved placement, provide operator controls, alignment cues and safe session reset.

**Limits, dependencies and failure behavior.** Device integration and accuracy/safety proof required; not automatically equivalent to a stencil or autonomous tattooing guide.

**Acceptance evidence.** Calibration drift is detected and display stops presenting precision until corrected; ending consultation clears private media.

**Source occurrences:** S1:256, S1:276, S2:219, S2:237

### CAP-129 — Scarification Preview

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Optional labeled concept rendering with references and professional consultation notes, using the shared placement/scenario system.

**Limits, dependencies and failure behavior.** No procedural instruction or prediction of scarring outcome; release requires practitioner review and appropriate context.

**Acceptance evidence.** Preview cannot be exported as a validated expected result and never replaces original body imagery.

**Source occurrences:** S1:258, S2:221

### CAP-130 — Environment-Based Preview

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Compare design in user-selected beach, office or formal-event context, retaining body/placement revision and changed lighting/clothing assumptions.

**Limits, dependencies and failure behavior.** Generated environments may change appearance; do not present them as observed photos or geometrically calibrated references.

**Acceptance evidence.** Scenario metadata identifies generated content and the original placement remains available for exact export.

**Source occurrences:** S1:261, S2:224

### CAP-131 — Sonic Design Experience

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Optional music/mood pairing with volume, mute, licensing/source and individual preference; never start audio without choice.

**Limits, dependencies and failure behavior.** Music is atmospheric, not evidence of design suitability; accessible silent workflow remains complete.

**Acceptance evidence.** Muting persists; exports omit audio unless licensed and selected.

**Source occurrences:** S1:275, S2:236

### CAP-132 — Session Endurance Tools

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Voluntary session plans, breaks, timer, comfort notes and practitioner-agreed milestones; pause/resume and accessible reminders.

**Limits, dependencies and failure behavior.** No health or pain-tolerance score, and no pressure to continue a session.

**Acceptance evidence.** Pausing updates planned duration without automatically charging or sharing sensitive notes.

**Source occurrences:** S1:277, S2:238

### CAP-133 — Accessibility Features

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Keyboard and numeric editing, object list, readable labels, high contrast, reduced motion, captions, text size, voice option and visual brief choices.

**Limits, dependencies and failure behavior.** Canvas exceptions are documented narrowly; absence of pointer/voice capability must not block ordinary project completion.

**Acceptance evidence.** Complete the core journey with keyboard and assistive technology; publish observed failures instead of a compliance claim without audit.

**Source occurrences:** S1:278, S2:239

### CAP-134 — Cultural Sensitivity Checker

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Offer opt-in, source-attributed cultural/context notes for motifs, terminology and restricted traditions; allow expert review and correction.

**Limits, dependencies and failure behavior.** Not an automated universal approval/rejection of culture; avoid conflating style similarity with cultural provenance.

**Acceptance evidence.** Uncertain motif returns uncertainty and references; user can inspect and contest a flag without an unexplained content ban.

**Source occurrences:** S1:279, S2:240

### CAP-135 — Tattoo Translator

**Recommended sequence:** C/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Identify text/script, offer translation/transliteration candidates, literal meaning, typography direction and native-speaker review request before freezing.

**Limits, dependencies and failure behavior.** Translation is high-consequence in permanent art; no guaranteed correctness or single forced answer.

**Acceptance evidence.** Approved wording is locked to revision; mirrored/changed glyphs trigger re-review and handoff includes original and translated text.

**Source occurrences:** S1:280, S2:241

### CAP-136 — Mood Board Generator

**Recommended sequence:** F/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Gather user references, palette, style choices and optional generated suggestions into an editable board with labels, source links and license notes.

**Limits, dependencies and failure behavior.** Generated references do not become licensed final art automatically; user can mix, remove or replace every suggestion.

**Acceptance evidence.** Reordering/changing palette is reversible; importing a board into a project preserves citations and private-source restrictions.

**Source occurrences:** S1:281, S2:242

### CAP-137 — Client History Timeline

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Practitioner-scoped timeline of briefs, approvals, sessions, consented photos, orders and follow-ups; filter by branch/project and export subset.

**Limits, dependencies and failure behavior.** Historical health records remain in restricted domain; affiliation change does not expose all clients to a new organization.

**Acceptance evidence.** A staff role sees only permitted clients/fields and a deleted photo is not re-exposed through timeline thumbnails.

**Source occurrences:** S1:287, S2:247

### CAP-138 — Material Calculator

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Estimate supplies from artist-entered coverage, palette, technique, sessions and configurable usage assumptions; output a range with editable quantities.

**Limits, dependencies and failure behavior.** No universal ink-consumption formula; artist validates and no procurement occurs automatically.

**Acceptance evidence.** Changing technique assumptions changes the visible estimate; missing inputs remain unknown and can be manually entered.

**Source occurrences:** S1:288, S2:248

### CAP-139 — Style Evolution Analysis

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Compare consented portfolio periods by self-chosen tags, techniques and compositions; show examples and editable observations.

**Limits, dependencies and failure behavior.** Inference is not a ranking of artistic worth; no unauthorized artist-style training.

**Acceptance evidence.** Removing a portfolio item removes it from future analysis and observations link back to supporting examples.

**Source occurrences:** S1:289, S2:249

### CAP-140 — Earnings Forecaster

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Forecast from booked/quoted work, conversion assumptions, cancellations, fees and payout timing; show scenarios and realized versus forecast totals.

**Limits, dependencies and failure behavior.** A booked amount is not cash received; forecast is not a guarantee or tax advice.

**Acceptance evidence.** Canceling a booking changes future forecast only; historical realized earnings reconcile to ledger.

**Source occurrences:** S1:290, S2:250

### CAP-141 — Assistant AI

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Context-aware help proposes document edits, brief summaries, admin drafts and suggested scheduling/actions; show scope, before/after and undo.

**Limits, dependencies and failure behavior.** It cannot autonomously send messages, publish, sign, charge or change rights without the configured user's authorization.

**Acceptance evidence.** Prompt involving an unselected/private object cannot access it; accepted edit is one undoable transaction and rejected proposal changes nothing.

**Source occurrences:** S1:291, S2:251

### CAP-142 — Collective Funding

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Create funded guest-artist/travel proposal with goal, eligible contributors, deadline, benefit, allocation and failure/refund terms.

**Limits, dependencies and failure behavior.** Payment/fundraising eligibility and fulfillment risk need a supported route; no informal untracked custody.

**Acceptance evidence.** Unmet goal returns or retains money only under accepted terms and all contributions reconcile.

**Source occurrences:** S1:295, S2:254

### CAP-143 — Micro-commissions

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Sell a bounded short consultation, historically suggested as 15 minutes, with deliverable, availability, fee and no-show rules.

**Limits, dependencies and failure behavior.** Duration is an offer attribute, not universal promise; design/IP rights remain explicit.

**Acceptance evidence.** Purchased slot links to deliverable and receipt; extending session requires a new accepted charge.

**Source occurrences:** S1:296, S2:255

### CAP-144 — NFT Integration

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Optional token-linked authenticity/collectibility flow references off-chain license, artist identity, artwork hash and transaction record.

**Limits, dependencies and failure behavior.** NFT ownership does not itself transfer copyright; chain/provider/cost and recovery choices unresolved.

**Acceptance evidence.** Standard non-token license remains usable; token transfer cannot silently change design rights or reveal private source art.

**Source occurrences:** S1:297, S2:256

### CAP-145 — Archive Service

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Long-term opt-in preservation with portable formats, checksums, retention promise, restore checks and successor/closure export route.

**Limits, dependencies and failure behavior.** Do not promise perpetual storage without funded operational terms; encrypted content requires key recovery plan.

**Acceptance evidence.** Restore a sampled archived project and verify assets/checksums; service closure plan yields a usable export.

**Source occurrences:** S1:299, S2:258

### CAP-146 — Design Subscription

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Artist offers periodic flash access with release cadence, available catalog, renewal terms and rights during/after subscription.

**Limits, dependencies and failure behavior.** Viewing access and permanent usage licenses differ; cancellation must explain which acquired rights survive.

**Acceptance evidence.** Canceled member can retrieve surviving licenses but cannot acquire newly released paid content without entitlement.

**Source occurrences:** S1:300, S2:259

### CAP-147 — Carbon Offset Integration

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Optional per-order environmental estimate and offset purchase with source, method, date, uncertainty and provider receipt.

**Limits, dependencies and failure behavior.** Avoid unsupported precise footprint or carbon-neutral claims; no mandatory added charge.

**Acceptance evidence.** User can decline without changing art/order function; receipt separates estimate from actual offset transaction.

**Source occurrences:** S1:301, S2:260

### CAP-148 — Haptic Feedback

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Optional supported-device feedback for tool/selection actions or clearly labeled sensory demo with strength/mute controls.

**Limits, dependencies and failure behavior.** A phone vibration does not simulate real tattoo pain faithfully; do not claim validated pain preview.

**Acceptance evidence.** Reduced-motion/sensory preference disables feedback; unsupported hardware leaves controls functional.

**Source occurrences:** S1:305, S2:263

### CAP-149 — Dermatological Consultation

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Connect users to eligible professionals or reviewed educational guidance, with consented sharing of specified media and appointment workflow.

**Limits, dependencies and failure behavior.** AI-assisted triage or prediction requires separate defined purpose, validation and applicable review; no unvalidated diagnosis from image.

**Acceptance evidence.** User selects each shared item and recipient; unavailable professional service is not replaced by a confident AI diagnosis.

**Source occurrences:** S1:306, S2:264

### CAP-150 — Ink Chemistry Education

**Recommended sequence:** X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Source-attributed pigment/material articles with dates, jurisdiction context, uncertainty and practitioner-reviewed updates.

**Limits, dependencies and failure behavior.** Educational content is not individualized safety clearance or endorsement of an unverified ink product.

**Acceptance evidence.** Product/ingredient claims link to current sources; outdated content is marked for review and corrected visibly.

**Source occurrences:** S1:307, S2:265

### CAP-151 — Interactive Tattoo Tech

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Demonstrate conceptual smart/interactive tattoo behavior through optional overlays, with compatible device/partner requirements and illustrative labels.

**Limits, dependencies and failure behavior.** Physical availability, biocompatibility and interoperability are not inferred from a digital demo.

**Acceptance evidence.** Demo functions without pretending a user owns compatible hardware; exports distinguish speculative elements from ordinary art.

**Source occurrences:** S1:308, S2:266

### CAP-152 — Medical Alert Features

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Template-assisted lettering/layout for user-supplied, clinician-reviewed alert information; privacy controls, exact wording approval and print review.

**Limits, dependencies and failure behavior.** No diagnosis or assumption of universal emergency recognition; never generate medical facts about the user.

**Acceptance evidence.** Final export matches approved wording exactly and changes invalidate review; private diagnosis data is not public by default.

**Source occurrences:** S1:309, S2:267

### CAP-153 — Scent-based Experience

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Opt-in compatible diffuser pairing, scent selection, intensity/duration, disconnect and immediate stop; store no health assumptions.

**Limits, dependencies and failure behavior.** Hardware/availability/sensitivity and safety review required; never default on or claim therapeutic benefit.

**Acceptance evidence.** Stop/disconnect halts output reliably; the complete design workflow works with no diffuser.

**Source occurrences:** S1:310, S2:268

### CAP-154 — GDPR Compliance

**Recommended sequence:** F/C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Define data inventory/purpose, access/export/deletion requests, consent records, retention, processor controls and auditability by region.

**Limits, dependencies and failure behavior.** Compliance is an assessed operating obligation, not a UI toggle; lawful record retention and media deletion can differ.

**Acceptance evidence.** Data-subject export/deletion tests cover originals, derived images, cached links and training-consent records with documented exceptions.

**Source occurrences:** S1:314, S2:211

### CAP-155 — Identity Verification

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Verify artist/studio identity through a suitable provider/process; display badge scope, status, expiry and appeal/recheck route.

**Limits, dependencies and failure behavior.** Identity is not proof of artistic skill or medical/professional licensing; do not expose verification documents publicly.

**Acceptance evidence.** Pending/failed/expired checks cannot show verified status; restricted documents remain inaccessible to ordinary studio staff.

**Source occurrences:** S1:315, S2:212

## AI creation and modern editing contracts

### CAP-156 — Style-based Generation / Text-to-Tattoo / Style Transfer / Custom Modifications

**Recommended sequence:** F/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Editable prompt/reference/placement brief, styles, palette and constraints produce preview alternatives; refine a selected region, compare and insert approved output as a new asset/version.

**Limits, dependencies and failure behavior.** Disclose cost/provider and preserve original; do not flatten a whole project to change one object or call raster layers vectors.

**Acceptance evidence.** Targeted change preserves unrelated objects/text; canceled/failed job does not consume duplicate credits and old revision remains restorable.

**Source occurrences:** S1:36, S1:37, S1:38, S1:39, S2:33, S2:34, S2:35, S2:36

### CAP-157 — Artist-specific Training

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Creator-approved dataset, permitted purpose/style scope, compensation, model version and revocation terms; preview outputs in a controlled evaluation.

**Limits, dependencies and failure behavior.** Similarity matching and training are separate consent scopes; no scraping of artists' portfolios by default.

**Acceptance evidence.** A revoked/expired training license blocks new training and distribution as specified; model/data provenance is inspectable.

**Source occurrences:** S1:40, S2:37

### CAP-158 — Draw brushes and tip engines

**Recommended sequence:** F/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Pen/pencil, airbrush, tattoo-tip, watercolor and crayon presets expose size, opacity, flow, hardness, spacing, smoothing, pressure/tilt and live stroke samples.

**Limits, dependencies and failure behavior.** Simulated tattoo tips are design tools, not tattoo-machine operation instructions; disclose approximated brush behavior.

**Acceptance evidence.** Each named brush produces observably distinct strokes and saves/reopens; size controls also cover eraser and line width.

**Source occurrences:** S3:976, S3:18468, S4:718

### CAP-159 — Text and typography tools

**Recommended sequence:** F/X · **Provenance:** Explicit modernization expansion; see main shared-editor contract and current-tech review

**Interaction and output.** Fonts/search, rich text, effects, weight/style/decoration, tracking/kerning/line height, alignment, curved/path text and editable text-to-outline copy.

**Limits, dependencies and failure behavior.** Missing fonts or unsupported scripts are flagged; preserve original text when outlining and licensing metadata when sharing fonts.

**Acceptance evidence.** Non-Latin/RTL/multiline text round-trips and exports; editing a word does not move unrelated design objects.

**Source occurrences:** New explicit elaboration; not attributed as a prior user decision.

### CAP-160 — Select, transforms and precision layout

**Recommended sequence:** F · **Provenance:** Explicit modernization expansion; see main shared-editor contract and current-tech review

**Interaction and output.** Click/marquee/lasso, multi-select, duplicate/copy/paste, nested grouping, pivot, numeric transforms, grids/guides/rulers, alignment/distribution and snapping.

**Limits, dependencies and failure behavior.** Snap can be bypassed; groups retain child relationships; viewport zoom never changes physical dimensions.

**Acceptance evidence.** Group/ungroup/alignment after rotation and undo reproduce reference geometry without losing object IDs.

**Source occurrences:** New explicit elaboration; not attributed as a prior user decision.

### CAP-161 — Lines, curves, symmetry and vector nodes

**Recommended sequence:** F/X · **Provenance:** Explicit modernization expansion; see main shared-editor contract and current-tech review

**Interaction and output.** Freehand, line/polyline/Bézier, pen nodes/handles, join/cap/dashes, path operations, symmetry/mirror and shape primitives under Elements.

**Limits, dependencies and failure behavior.** Distinguish vector nodes from raster edge guesses; simplification/trace is previewed as a new editable object.

**Acceptance evidence.** Closed/open paths and mirrored designs round-trip; original reference remains when auto-tracing fails.

**Source occurrences:** New explicit elaboration; not attributed as a prior user decision.

### CAP-162 — Raster erase, mask and fill

**Recommended sequence:** F · **Provenance:** Explicit modernization expansion; see main shared-editor contract and current-tech review

**Interaction and output.** Object delete, selected-region flood fill, tolerance/contiguity, freehand alpha erasure, restore brush and nondestructive mask editing.

**Limits, dependencies and failure behavior.** Brush erasure must not delete a whole object accidentally; foreground white ink remains selectable separately from background.

**Acceptance evidence.** Erase part of a bitmap, undo, recolor only selected region and export with intended alpha.

**Source occurrences:** New explicit elaboration; not attributed as a prior user decision.

### CAP-163 — Elements, assets and templates

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Search/reuse licensed vectors, transparent images, frames, shapes and templates; replace selected asset, preserve intended transform and inspect source rights.

**Limits, dependencies and failure behavior.** Template availability does not grant all embedded asset rights; malicious SVG/scripts sanitized.

**Acceptance evidence.** Unsupported SVG features are reported and user project cannot execute embedded active content.

**Source occurrences:** S3:6312

### CAP-164 — Layer panel and effect stack

**Recommended sequence:** F · **Provenance:** Explicit modernization expansion; see main shared-editor contract and current-tech review

**Interaction and output.** Named layers, thumbnails, order, groups, masks, visibility/lock, opacity/blend, isolate, duplicate and reversible image corrections.

**Limits, dependencies and failure behavior.** Grid/guides are stage overlays, not content; destructive merge requires saved originals or explicit action.

**Acceptance evidence.** Reorder/lock/visibility agrees between stage and inspector; undo and reload retain effects without duplicating objects.

**Source occurrences:** New explicit elaboration; not attributed as a prior user decision.

### CAP-165 — Multi-artboard and output tools

**Recommended sequence:** F/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Custom/preset sizes, unit conversion, pages/boards, margins/bleed, resize anchors, selective export, batch variants and print preflight.

**Limits, dependencies and failure behavior.** Resizing artboard differs from scaling all content; PDF/PNG/SVG capabilities accurately labeled.

**Acceptance evidence.** Export selected boards in correct order, dimensions and background; no handles or guides included.

**Source occurrences:** S3:16216

### CAP-166 — History, autosave and recovery

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Unified command history, named versions, autosave local/cloud states, offline edits, conflict branch and crash recovery across all studio modes.

**Limits, dependencies and failure behavior.** Source operations, placement operations and financial actions have distinct histories; no blanket undo of sent money.

**Acceptance evidence.** Crash after acknowledged save recovers art; offline conflict exposes alternatives and does not silently overwrite.

**Source occurrences:** S3:6391, S4:769

### CAP-167 — Full editing in Digital Try-on

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Reuse all editor categories in body modes; select Edit design versus Adjust placement; inverse-map edits to source and project immediately with optional flat inset.

**Limits, dependencies and failure behavior.** Ambiguous folds/occluded targets prompt view change; no forced repeated export/re-import loop.

**Acceptance evidence.** Draw, recolor, text edit, SAM mask and erase on a body preview update editable source without moving placement.

**Source occurrences:** S3:92, S3:18761, S3:18831

### CAP-168 — User Test Studio

**Recommended sequence:** F/X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Save comparable fit/scale/light/ink/motion/age/rights/output scenarios, run defined checks, compare A–B and annotate a chosen revision.

**Limits, dependencies and failure behavior.** Developer tests and user simulations are distinct; physiological predictions remain gated.

**Acceptance evidence.** A scenario report identifies changed variables and assumptions and can be reproduced from the saved revision.

**Source occurrences:** S3:1039

### CAP-169 — Video, sound and presentation suite

**Recommended sequence:** X · **Provenance:** Explicit modernization expansion; see main shared-editor contract and current-tech review

**Interaction and output.** Clip timeline with trim/split/reorder, tracks, simple keyframes, captions, narration/licensed audio, timelapse and consultation presentation playback.

**Limits, dependencies and failure behavior.** Recorded evidence and generated frames are distinguishable; paid/licensed audio cannot be included without rights.

**Acceptance evidence.** Rendered clip preserves art orientation, timestamps, captions and permissioned audio; failed render keeps timeline editable.

**Source occurrences:** New explicit elaboration; not attributed as a prior user decision.

### CAP-170 — Whiteboards, briefs and studio brand kits

**Recommended sequence:** F/C/X · **Provenance:** Explicit modernization expansion; see main shared-editor contract and current-tech review

**Interaction and output.** Editable mood board, document/consultation deck, studio palette/fonts/templates and approved asset sets share project references and access rules.

**Limits, dependencies and failure behavior.** Brand constraints apply only to intended public/studio outputs, never change a client's tattoo colors without consent.

**Acceptance evidence.** One approved artwork revision appears consistently in brief, deck and promo layout; updating it shows pending review.

**Source occurrences:** New explicit elaboration; not attributed as a prior user decision.

### CAP-171 — Forms, tables and publishing suite

**Recommended sequence:** C/X · **Provenance:** Explicit modernization expansion; see main shared-editor contract and current-tech review

**Interaction and output.** Structured brief/consent/feedback forms, client/booking/earnings tables, public artist pages, email/social drafts and reusable templates.

**Limits, dependencies and failure behavior.** General-purpose spreadsheet/web-builder parity is an expansion decision; sending/publishing requires explicit authorized action.

**Acceptance evidence.** Form response respects field-level privacy and outputs keep source revision/license; draft generation never auto-publishes.

**Source occurrences:** New explicit elaboration; not attributed as a prior user decision.

### CAP-172 — Layered image decomposition

**Recommended sequence:** X/R · **Provenance:** Explicit modernization expansion; see main shared-editor contract and current-tech review

**Interaction and output.** Offer Convert to editable layers; choose target/count, preview RGBA components, inspect recomposition difference and accept a new version.

**Limits, dependencies and failure behavior.** Inferred layers can hallucinate occluded content; neither exact recovery of original layers nor true vector reconstruction is promised.

**Acceptance evidence.** Fine lines, text and white ink survive recomposition within agreed error; failure leaves original untouched.

**Source occurrences:** New explicit elaboration; not attributed as a prior user decision.

### CAP-173 — Selection-aware assistant commands

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Optional text/voice acts on named selected objects through validated editor commands with before/after diff, cost and one-step undo.

**Limits, dependencies and failure behavior.** A new conversational paradigm must not supersede the confirmed direct-manipulation/editor-first experience.

**Acceptance evidence.** 'Recolor this flower' changes only the selected flower; denied scope or ambiguous target yields clarification, not a guessed global edit.

**Source occurrences:** S3:74

### CAP-174 — Capture, measurement and quality provenance

**Recommended sequence:** F/X · **Provenance:** Explicit modernization expansion; see main shared-editor contract and current-tech review

**Interaction and output.** Label each body model/preview as observed, calibrated, inferred or generated; retain model/version, scale source, uncertainty and quality flags through handoff.

**Limits, dependencies and failure behavior.** A visually convincing generated body is not personal anatomy measurement.

**Acceptance evidence.** An uncalibrated generative preview cannot be exported as a calibrated stencil placement without explicit validated registration.

**Source occurrences:** New explicit elaboration; not attributed as a prior user decision.

## Product, business and research gates

### CAP-175 — Cross-device usability and accessibility

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Consistent tools and project semantics across supported desktop/tablet/mobile, adaptive drawers, readable labels, touch and keyboard alternatives.

**Limits, dependencies and failure behavior.** Device capability differences are surfaced, not hidden behind broken controls.

**Acceptance evidence.** Supported-device core task suite passes; no clipped properties or missing canvas at documented breakpoints.

**Source occurrences:** S1:319, S1:322, S1:323, S1:324

### CAP-176 — Realism and performance budgets

**Recommended sequence:** F/X/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Instrument open-to-edit, input-to-frame, masks/fit, frame rate, drift, battery and thermal behavior using named fixtures and supported devices.

**Limits, dependencies and failure behavior.** Three-second goal applies to scoped loading; older universal FPS/accuracy promises are historical, not proven.

**Acceptance evidence.** Publish percentiles and per-condition failures under main §12; mock logs do not satisfy a real-device gate.

**Source occurrences:** S1:320, S1:321

### CAP-177 — Self-funding business and growth validation

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Track repeat artist use, accepted handoffs, paid conversion, contribution margin, refunds/support costs and acquisition cohorts.

**Limits, dependencies and failure behavior.** Historical viral/download/revenue figures are unverified aspirations, not forecasts; current budget unknown.

**Acceptance evidence.** A dated dashboard distinguishes actuals, targets and modeled scenarios and never counts failed retries as successful value.

**Source occurrences:** S1:330, S1:331, S1:332, S1:333, S1:353, S1:354, S1:355, S1:356

### CAP-178 — Revenue and pricing validation

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Model subscriptions, compute credits, design/POD royalties, one-time sales and professional plans against actual costs, usage and willingness to pay.

**Limits, dependencies and failure behavior.** Historical tier/credit/fee conflicts remain visible; proposal cannot silently lock prices or remove retained benefits.

**Acceptance evidence.** Sensitivity analysis shows cost per successful task, margin and cancellation/refund effects before a pricing decision.

**Source occurrences:** S1:337, S1:338, S1:339, S1:340, S1:341, S1:342

### CAP-179 — Partnership validation

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Document studio/artist/brand opportunity, specific technical surface, compensation, deliverables and measured campaign impact.

**Limits, dependencies and failure behavior.** Partner interest is not a signed agreement; sponsored reach is not organic retention.

**Acceptance evidence.** Each active partnership has accepted scope, asset rights and accountable outcomes tied to consented data.

**Source occurrences:** S1:346, S1:347, S1:348, S1:349

### CAP-180 — Lensa case-study research

**Recommended sequence:** R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Preserve requested 2018–2022 chronology, viral-event, UX, technology, distribution, pricing and transferable-pattern analysis as an explicit research work item.

**Limits, dependencies and failure behavior.** Old 19.3M/$30.7M figures and causal claims are not reverified here; do not force the roadmap to mirror a different product.

**Acceptance evidence.** Primary/reputable dated evidence supports each statistic; distinguish correlation/causation and propose a testable ARTOO experiment for any transfer.

**Source occurrences:** S1:362, S1:363, S1:364, S1:365, S1:366, S1:367, S1:368

### CAP-181 — Adaptive model evaluation and consented learning

**Recommended sequence:** X/R · **Provenance:** Explicit modernization expansion; see main shared-editor contract and current-tech review

**Interaction and output.** Compare baseline and candidate render/mapping methods using labeled fixtures, optional user corrections, data provenance, evaluation versions, monitored rollout and rollback.

**Limits, dependencies and failure behavior.** No automatic training from private captures; synthetic augmentation is labeled and cannot replace diverse real validation.

**Acceptance evidence.** Candidate promotes only after fixed holdout evaluation, per-condition checks, cost/latency limits and tested rollback; consent withdrawal follows declared dataset policy.

**Source occurrences:** New explicit elaboration; not attributed as a prior user decision.

### CAP-182 — About, FAQ, feedback and Easter egg

**Recommended sequence:** C/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Provide accessible product/contact/FAQ, feedback intake and social references; preserve requested secret Easter egg as optional discoverable delight.

**Limits, dependencies and failure behavior.** S6 question labels are clipped, so exact hidden content/links are unresolved; no essential function depends on finding it.

**Acceptance evidence.** Main workflows and help work without the Easter egg; feedback has a receipt/status and no unexpected marketing subscription.

**Source occurrences:** S6:1

### CAP-183 — Authentication and environment separation

**Recommended sequence:** F · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Supported sign-in including requested Google OAuth, session/account recovery and isolated development/test/production data and credentials.

**Limits, dependencies and failure behavior.** Auth provider is not assumed selected; demo users cannot access live body media or payments.

**Acceptance evidence.** Test tokens fail in production, sign-out invalidates protected access, and profile switch never changes underlying account identity.

**Source occurrences:** S3:3

## Additional recovered workflow details

### CAP-184 — Prompt Library

**Recommended sequence:** F/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Curate searchable prompt recipes with style, placement and palette placeholders, examples, author/license notes and editable saved personal variants.

**Limits, dependencies and failure behavior.** Recipes suggest concepts without guaranteeing artist imitation or identical results; versions identify provider/model used.

**Acceptance evidence.** User edits a recipe, generates alternatives and can recover the exact submitted prompt without overwriting the shared recipe.

**Source occurrences:** S4:684

### CAP-185 — Local artist and service map

**Recommended sequence:** C · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Map/list nearby artists, shops and guest spots with optional device location or manual city/radius, styles, accessibility, availability and booking links.

**Limits, dependencies and failure behavior.** Location permission is optional; private client locations are never published and geocoding failures have list/manual fallback.

**Acceptance evidence.** User with location disabled can find an eligible artist in an entered city and reach the correct branch/service page.

**Source occurrences:** S3:3

### CAP-186 — Consultation screen sharing

**Recommended sequence:** X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Opt-in share a chosen workspace view during a call with participant list, visible sharing indicator, stop control and optional co-pointer.

**Limits, dependencies and failure behavior.** Screen sharing is separate from edit permission and recording; health forms, messages and unrelated tabs excluded by default.

**Acceptance evidence.** Stopping ends transmission, a viewer cannot edit, and private panels remain hidden in the selected shared surface.

**Source occurrences:** S4:732

### CAP-187 — Organization workflow configuration

**Recommended sequence:** C/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Define custom project stages, required documents, approval gates, message/contract templates and aftercare checklists; show responsible role and blocking reason.

**Limits, dependencies and failure behavior.** Custom labels cannot bypass canonical payment, license or approval states; policy changes apply prospectively.

**Acceptance evidence.** Missing consent blocks only the defined downstream action and an authorized exception is auditable; status does not fabricate payment evidence.

**Source occurrences:** S4:757

### CAP-188 — Media standardization and asset optimization

**Recommended sequence:** F/X · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** EXIF orientation, color-profile handling, quality/resolution checks, video-frame extraction, comparable camera views, progressive thumbnails and cached renders retain source originals.

**Limits, dependencies and failure behavior.** Compression/upscale cannot silently alter print dimensions or represent generated detail as original; cache keys include revision/render settings.

**Acceptance evidence.** Reopened project resolves original art, correct alpha and frame timestamps; stale thumbnails never replace newly edited content.

**Source occurrences:** S4:706

### CAP-189 — Skin-region acquisition

**Recommended sequence:** F/R · **Provenance:** Source-linked; elaboration proposed

**Interaction and output.** Combine candidate segmentation, landmarks/depth and user correction to isolate visible target skin, with confidence, selected body/side and occlusion boundaries.

**Limits, dependencies and failure behavior.** HSV/YCrCb/Canny may help bounded cases but are not universal skin detection; person masks can contain clothes and background.

**Acceptance evidence.** Diverse-tone, hairy, scarred, tattooed and clothed-edge fixtures report mask/fit errors separately; uncertain input prompts correction.

**Source occurrences:** S4:13