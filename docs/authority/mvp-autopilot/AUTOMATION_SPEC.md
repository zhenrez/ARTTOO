# ARTTOO MVP Autopilot — Automation Contract

## Topology

ARTTOO uses two coordinated implementation lanes and one independent governance lane:

- **Driver A:** every hour at `:00`
- **Driver B:** every hour at `:30`
- **Governor:** every 4 hours at `:15`

The two Drivers are one continuous implementation loop, not competing agents. They coordinate through `docs/authority/mvp-autopilot/STATE.md`, explicit implementation leases, repository evidence, branches/PRs, and handoff prompts.

## Mandatory authority bootstrap

Before planning, coding, auditing, or fallback work, every automation must:

1. Read `docs/authority/AUTHORITY.md`.
2. Read `docs/authority/mvp-autopilot/STATE.md`.
3. Inspect current repository/branch/PR/CI evidence when repository access is available.
4. Read the current product/technology authority documents relevant to the open gate.
5. Prefer verified repository/runtime evidence over prose or remembered state.
6. Treat historical sources as evidence only; they may not silently override later confirmed corrections.

## Driver A / Driver B normal execution loop

Every implementation run:

1. Recover the last VERIFIED state and current lease/handoff.
2. Identify the open MVP gate.
3. Identify the single highest-leverage bottleneck to the next gate.
4. Check whether another worker already owns the same mutation scope.
5. Determine the evidence/test that would close the bottleneck.
6. Choose the smallest reversible, authorized, $0/local/free/already-authorized increment that can produce that evidence.
7. Execute the increment when safe and non-conflicting.
8. Verify with real tests/evidence.
9. Update `STATE.md` with exact evidence, lease status, next task, and continuation prompt.

## Official Never-Idle / Productive-Fallback Rule

**A temporary inability to perform the preferred repository mutation is not a reason to stop useful work, cancel a future run, disable an automation, or produce an empty status report.**

If a Driver or Governor cannot safely execute the preferred critical-path action — for example because repository access is unavailable, credentials/tools are temporarily unavailable, CI/provider infrastructure is down, another worker holds a conflicting lease, an owner-only decision is pending, required external data is unavailable, or the next implementation step is not yet sufficiently specified — it must switch into **PRODUCTIVE FALLBACK MODE**.

### Productive fallback objective

Choose the highest-value authorized activity that:

1. directly reduces uncertainty, implementation time, rework risk, or future owner attention for the current MVP gate or the next one or two gates;
2. produces a durable artifact, evidence, test, decision packet, benchmark, prototype, or improved plan;
3. respects the frozen MVP boundary;
4. does not fabricate runtime evidence or represent sandbox work as integrated product behavior;
5. leaves the next implementation run better prepared than the previous one.

### Preferred fallback work, in order of value

Select whichever is most relevant rather than mechanically walking this list:

- refine the immediate implementation plan, dependency graph, acceptance criteria, or task decomposition;
- resolve an architectural ambiguity using the authority docs and produce/update an ADR or decision packet;
- build or improve tests, golden fixtures, evaluation harnesses, benchmark cases, failure-injection cases, or migration fixtures;
- prototype a future component, algorithm, adapter, UI interaction, data structure, or integration in an **isolated sandbox/branch** without claiming it is integrated;
- research current industry practice, tattoo-artist workflows, competitors, open-source projects, SDKs, segmentation/body-reconstruction/VTO advances, accessibility practices, commerce patterns, security practices, or other directly relevant innovations;
- perform source/license/dependency/security/privacy/cost/provider audits that remove future selection risk;
- improve technical documentation, interface contracts, schemas, API boundaries, runbooks, threat models, data-flow diagrams, onboarding docs, or test plans;
- design or improve the next one to three MVP increments so implementation can start immediately when the blocker clears;
- investigate a known failure or bottleneck using available evidence and prepare a reproducible diagnostic plan;
- build mock-independent local proofs for algorithms or components where doing so de-risks the production implementation;
- improve observability, acceptance evidence, instrumentation plans, performance budgets, recovery plans, or rollback plans;
- research and document a better zero-dollar/local/free route that can replace a blocked or costly dependency;
- prepare a concise owner decision packet when human authority is genuinely required, while continuing all other unblocked preparatory work.

### Fallback restrictions

Productive fallback must **not** become permission for scope creep.

Do not:
- build unrelated long-tail features because the main path is blocked;
- replace evidence with speculation;
- silently select a provider or architecture that has not passed the required gates;
- create a second source of truth;
- merge sandbox experiments as production features without normal verification;
- spend money or cross owner-reserved boundaries;
- disable or cancel the next scheduled run merely because the current run is blocked.

### Blocker persistence and next-run behavior

If a blocker remains at the end of a run:

1. Record the blocker precisely in `STATE.md`.
2. Record what productive fallback work was completed and where its artifacts live.
3. Write a continuation prompt that begins by rechecking whether the blocker has cleared.
4. If cleared, resume the primary implementation path immediately.
5. If still blocked, select the next highest-value fallback task and continue preparation.
6. **Keep the recurring schedule enabled.**

A recurring automation may be disabled only when:
- the independently verified MVP completion gate has been satisfied and the Governor directs shutdown, or
- the owner explicitly instructs that the automation be paused/disabled.

A single failed access attempt, unavailable repository, unavailable provider, conflicting lease, missing credential, unresolved question, or temporary tool failure is **never** sufficient reason to cancel future development cycles.

## Governor

Every Governor run:

1. Read `AUTHORITY.md` and `STATE.md`.
2. Compare repository/runtime evidence with claimed progress.
3. Audit Driver A/B lease and handoff health.
4. Classify `NORMAL`, `ELEVATED`, or `CRISIS`.
5. Audit critical-path alignment, scope drift, duplicate truth, adapter leakage, weak tests, avoidable cost, security/privacy/rights/payment/migration risk, unnecessary human attention, and bounded innovation opportunities.
6. If the main path is blocked, audit the **quality of fallback work**: is it genuinely reducing time-to-MVP or merely generating documents?
7. Issue a concrete next-cycle directive and make only narrow safe process/test/state corrections.

The Governor must prefer useful preparation over idle commentary when it cannot perform a repository-side correction itself.

## Owner-reserved boundaries

Agents must not autonomously:

- spend money;
- accept legal/commercial terms;
- authorize real payments or payouts;
- delete user data;
- weaken security/privacy/rights controls;
- redefine MVP scope;
- make unsupported health/accuracy claims;
- perform consequential production deployment outside explicit release authority.

## Frozen MVP boundary

MVP is checkpoints 0–4:

0. Establish/recover and baseline the real application.
1. Complete the shared editing foundation.
2. Prove placement and live editing.
3. Prove client–artist consultation, revision approval, and Go-time handoff.
4. Connect one viable commercial route with sandbox accounting/refund/fulfillment evidence.

Checkpoints 5–6 and long-tail capabilities are post-MVP unless strictly required to unblock checkpoints 0–4.

## Mandatory release proof

One stateful project must complete:

**drawing/source editing → flattened-reference decomposition → live body placement → pose/view change → in-context mask correction → wrap/seam adjustment → exact-size stencil → client revision on the same source → artist approval → Go-time export**

No export/re-import bridge, manual file shuttling, copy/paste reconstruction, or second-project rebuild may be required in the normal path.

## Completion gate

MVP requires:

- independent evidence for checkpoints 0–4;
- the full golden journey in one project lineage;
- save/reopen and failure recovery;
- revision-specific approval/export lineage;
- healthy Driver A/B handoff with no unresolved race corruption;
- no known release-blocking regression on the required path.

On independent confirmation:

1. stop feature development;
2. produce the final MVP evidence report;
3. separate post-MVP debt from release blockers;
4. disable Driver A, Driver B, and Governor.
