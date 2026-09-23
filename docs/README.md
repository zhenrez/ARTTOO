# ARTTOO Documentation

This is the documentation entrypoint. Do not reconstruct requirements from chat history when the repository authority exists.

## Read in this order

1. [Authority manifest](authority/AUTHORITY.md) — source precedence, frozen MVP boundary, non-negotiable invariants.
2. [Product specification](authority/product/PRODUCT_SPEC.md) — canonical product/UX/acceptance contract.
3. [Technology and base-selection architecture](authority/architecture/TECHNOLOGY_BASES.md) — component-selection rules, bake-offs, measurable gates.
4. [Capability catalogue](authority/product/CAPABILITY_CATALOGUE.md) — explicit capability inventory.
5. [Current MVP state](authority/mvp-autopilot/STATE.md) — live execution state, lease, evidence, blockers, continuation.
6. [Autopilot contract](authority/mvp-autopilot/AUTOMATION_SPEC.md) — Driver/Governor operating rules.

## Structure

```text
docs/
├── README.md
└── authority/
    ├── AUTHORITY.md
    ├── product/
    │   ├── PRODUCT_SPEC.md
    │   └── CAPABILITY_CATALOGUE.md
    ├── architecture/
    │   ├── TECHNOLOGY_BASES.md
    │   └── AUTONOMOUS_COMPANY.md
    ├── traceability/
    │   ├── CAPABILITY_CONTRACTS.json
    │   └── SOURCE_TRACEABILITY.csv
    ├── mvp-autopilot/
    │   ├── AUTOMATION_SPEC.md
    │   └── STATE.md
    ├── source-history/
    │   └── historical source evidence
    └── archive/
        └── superseded or one-off reports/audits
```

## What is authoritative vs. reference material

- **Current authority:** `AUTHORITY.md`, `product/`, `architecture/`, `traceability/`, and the live autopilot contract/state.
- **Historical evidence:** `source-history/`. Preserve it; do not let it silently override later decisions.
- **Archive:** completed modernization reports and one-off audits. Useful for provenance, not current operating truth.
