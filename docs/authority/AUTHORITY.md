# ARTTOO Authority Manifest

**Repository:** `zhenrez/ARTTOO`

This file defines source precedence and the minimum documents an implementation agent must read before changing the product.

## Authority order

When sources disagree, resolve them in this order:

1. **Verified runtime/repository evidence** — current code, migrations, tests, CI, and deployed behavior where explicitly verified.
2. **Current approved product/architecture documents** listed below.
3. **Capability contracts and traceability records.**
4. **Historical source evidence** under `source-history/`, interpreted chronologically with supersessions preserved.
5. **Archived reports/audits** under `archive/`.
6. **Prior agent prose, old plans, or model-generated summaries** — never authoritative by themselves.

`NOT RETRIEVED` does not mean false, removed, or unknown. Retrieve an existing source before reconstructing it.

## Canonical current documents

### Product
- `product/PRODUCT_SPEC.md` — primary product, UX, architecture-boundary, acceptance, and end-to-end bake-off contract.
- `product/CAPABILITY_CATALOGUE.md` — complete explicit capability catalogue.

### Architecture
- `architecture/TECHNOLOGY_BASES.md` — technology/base-selection evidence, candidate gates, measurable evaluation protocol, and golden-journey requirements.
- `architecture/AUTONOMOUS_COMPANY.md` — product/stack/bootstrap pitches plus Company Kernel, governance, viability, evidence, and autonomy doctrine.

### Traceability
- `traceability/CAPABILITY_CONTRACTS.json` — machine-readable capability contracts.
- `traceability/SOURCE_TRACEABILITY.csv` — source-to-contract traceability.

### Operations
- `mvp-autopilot/AUTOMATION_SPEC.md` — Driver/Governor operating contract.
- `mvp-autopilot/STATE.md` — live continuation record. This is operational state, not a substitute for product authority.

## Frozen MVP boundary

MVP is checkpoints **0–4**:

0. Establish/recover and baseline the real application in `zhenrez/ARTTOO`.
1. Complete the shared editing foundation.
2. Prove placement and live editing.
3. Prove client–artist consultation, revision approval, and Go-time handoff.
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
- Stale asynchronous results cannot overwrite newer work.
- Approval/export bind to exact revisions and become stale after dependent change.
- Provider/editor/model systems are replaceable adapters, not canonical product truth.
- Calibrated projection, inferred fit, and generative concept preview are distinct accuracy classes.
- Every exposed feature must meet the same UX/UI quality floor.
- $0/local/free/already-paid routes are preferred until evidence justifies spend.

## Historical and archived material

- `source-history/` preserves original evidence. It may not silently restore superseded decisions.
- `archive/` contains completed reports and one-off implementation audits. It is retained for provenance, not treated as live product authority.

## Change rule

Any future authority change must:
1. identify the superseded statement;
2. record the replacement decision;
3. preserve traceability to the prior decision;
4. update this manifest when canonical paths or authority ordering change.
