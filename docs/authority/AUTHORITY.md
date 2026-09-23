# ARTTOO Authority Manifest

**Repository:** `zhenrez/ARTTOO`

## Authority order
1. **Verified runtime/repository evidence** — current code, migrations, tests, CI, and deployed behavior where explicitly verified.
2. **Current approved authority documents** in this directory.
3. **Capability contracts and traceability records.**
4. **Historical source artifacts** under `source-history/`, interpreted chronologically with supersessions preserved.
5. **Prior agent prose, old plans, or model-generated summaries** — never authoritative by themselves.

`NOT RETRIEVED` does not mean false, removed, or unknown. Retrieve before reconstructing when a source exists.

## Canonical current documents

Navigation aid: [README.md](README.md). The navigation page does not add authority; this manifest remains controlling.

- `ARTOO_Modern_Product_Design_Specification.md` — primary product/UX/architecture contract; strengthened copy containing the mandatory end-to-end foundation bake-off.
- `ARTOO_Current_Technology_and_Base_Options.md` — current technology/base-selection evidence and golden-journey evaluation protocol.
- `ARTOO_Explicit_Capability_Catalogue.md` — complete capability contract catalogue.
- `ARTOO_Capability_Contracts.json` — machine-readable capability contracts.
- `ARTOO_Source_Traceability.csv` — source-to-contract traceability.
- `ARTOO_Modernization_Report.md` — modernization outcome and unresolved items.
- `ARTOO_Three_Pitches_and_Autonomous_Company_Architecture.md` — product, stack, zero-dollar bootstrap, Company Kernel, governance, viability, evidence and autonomy doctrine.
- `mvp-autopilot/AUTOMATION_SPEC.md` — Driver/Governor operating contract.
- `mvp-autopilot/STATE.md` — durable continuation record.

## Frozen MVP boundary
MVP is checkpoints **0–4**:
0. Establish/recover and baseline the real application in `zhenrez/ARTTOO`.
1. Complete the shared editing foundation.
2. Prove placement and live editing.
3. Prove client–artist consultation, revision approval and Go-time handoff.
4. Connect one viable commercial route with sandbox accounting/refund/fulfillment evidence.

Checkpoints 5–6 and long-tail capabilities are post-MVP unless strictly required to unblock checkpoints 0–4.

## Mandatory release proof
One stateful project must complete:

**drawing/source editing → flattened-reference decomposition → live body placement → pose/view change → in-context mask correction → wrap/seam adjustment → exact-size stencil → client revision on the same source → artist approval → Go-time export**

No export/re-import bridge, manual file shuttling, copy/paste reconstruction, or second-project rebuild may be required in the normal path.

## Product invariants
- One canonical versioned document/command model.
- Immutable source assets and explicit derivation lineage.
- Stable object/revision identity.
- Body placement is distinct from source-art transforms.
- Stale async results cannot overwrite newer work.
- Approval/export bind to exact revisions and become stale after dependent change.
- Provider/editor/model systems are replaceable adapters, not canonical product truth.
- Calibrated projection, inferred fit, and generative concept preview are distinct accuracy classes.
- Every exposed feature must meet the same UX/UI quality floor.
- $0/local/free/already-paid routes are preferred until evidence justifies spend.

## Historical source role
`source-history/` preserves original evidence. Historical material may not silently override later direct corrections or current approved specifications.

## Documentation hygiene
- Keep durable current contracts in `docs/authority/`.
- Keep only `AUTOMATION_SPEC.md`, `STATE.md`, and its navigation README in `mvp-autopilot/`.
- Archive superseded plans, PR-specific audits, and historical evidence under `source-history/`; Git history remains the record of prior current versions.
- Do not duplicate a rule into a new standalone authority document when it can be cleanly incorporated into the existing controlling contract.

## Update rule
Any future authority change must identify the superseded statement, record the new decision, preserve traceability, and update this manifest when canonical authority changes.
