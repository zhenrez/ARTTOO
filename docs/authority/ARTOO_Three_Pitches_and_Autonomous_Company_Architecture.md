# ARTOO — Product, Stack, and Autonomous Company Pitch

**Version:** Consolidated modernization pitch  
**Date:** 22 September 2026  
**Status:** Strategic product and architecture narrative. This document describes the intended system and operating model; it does not claim the full product or autonomous-company stack is already implemented or verified.

---

# 1. Product Pitch

## ARTOO: the complete operating system for tattoos

**ARTOO is the complete operating system for tattoos—from the first idea to the finished piece.**

Imagine the creative power of Canva and a professional illustration suite, fused with a virtual fitting room, an artist marketplace, a collaborative client workspace, and the business tools of a tattoo studio—all working on the **same design, in the same project**.

You can start from a blank canvas, a template, a photograph, existing artwork, or an AI-assisted concept. Draw with professional brushes, edit raster and vector artwork, manipulate paths, typography, masks, layers, effects, colors and layouts, remove backgrounds, isolate elements, or decompose flattened reference art into editable working layers.

Then take that exact artwork into **Digital Try-on** without exporting it. Put it on a photo, live camera feed, recorded video, parametric avatar, body map, or eventually a reconstructed body surface. Move it, resize it in real-world units, wrap it around an arm or torso, cross seams, change poses, correct masks and occlusion, edit the actual design while it is still on the skin, and compare multiple placements side by side.

ARTOO can test the tattoo before commitment: scale, orientation, lettering, resolution, line weight, transparency, white ink, placement, joint distortion, sleeve continuity, lighting, color palettes, cover-up concepts and other clearly labeled appearance or longevity simulations.

The system deliberately distinguishes three visualization classes:

1. **Calibrated / registered projection** — preserves exact artwork and measured placement.
2. **Assisted inferred fit** — uses estimated geometry with visible uncertainty and correction.
3. **Generative concept preview** — optimized for rapid visual exploration, never misrepresented as exact placement.

Clients and artists can build shared reference boards, briefs and mood boards; comment directly on designs or body locations; compare revisions; request changes; collaborate; approve an exact revision; and preserve that decision history.

Artists can maintain portfolios, reusable assets, palettes and templates, while studios get client workflows, consent forms, calendars, bookings, staff permissions, cost and stock information, metrics and reusable workspace standards.

ARTOO also connects **discovery and business**. Users can find designs, artists, studios, locations and educational content; commission work; request quotes; negotiate revision allowances and licenses; book appointments; place deposits; make payments; handle artist/studio/platform splits; order temporary tattoos or other authorized print products; and support licensed designs, limited editions, collaborations, auctions and other marketplace models.

Every asset can carry provenance, ownership, attribution and usage rights through editing, collaboration, printing and sale. Private body imagery, messages and sensitive records are separated from public portfolio content, with controlled sharing and explicit permissions.

And when the design is ready, ARTOO produces a **Go-time package**: the approved source artwork, exact revision, calibrated dimensions, print-ready stencil sheets, placement references, body side and orientation, ink/color information, artist and client notes, licensing information, unresolved fit warnings and production metadata.

Underneath all of it are autosave, offline work, undo/redo, version history, crash recovery, accessibility, keyboard and touch workflows, multi-profile accounts for users, artists and studios, search across every tool, extensions and automations, and a shared document architecture designed so that nothing has to be rebuilt when you move from drawing to try-on to revision to stencil to payment.

### The simple version

**ARTOO lets you design the tattoo, see it on the actual body, perfect it with the artist, prove exactly which version was approved, handle the business, and carry that same work all the way to the tattoo chair.**

Today those jobs are fragmented across drawing apps, Photoshop-like editors, stencil tools, AR demos, messaging, social media, booking software, payment processors and studio systems.

**ARTOO turns them into one continuous tattoo workflow.**

---

# 2. Stack Pitch

## Own the tattoo-specific intelligence. Reuse the strongest infrastructure everywhere else.

**ARTOO is built around one architectural idea: own the tattoo-specific intelligence, and reuse the strongest available infrastructure everywhere else.**

At the center is a **versioned creative document and command system**. That is the source of truth for artwork, layers, masks, body targets, placements, revisions, approvals, rights and exports.

The canvas library, 3D engine, AI models and external SDKs are adapters around that document—not the product’s permanent data model.

## Creative editor

ARTOO is deliberately vendor-agnostic.

The current editor implementation should be benchmarked against mature embeddable editors and strong open-source alternatives. The winner has to provide professional:

- raster editing,
- vector editing,
- typography,
- masking,
- drawing,
- layout,
- history,
- source fidelity,
- accessibility,
- save/reopen fidelity,
- and export.

But there is one non-negotiable condition:

**the same editing commands must work while the artwork is projected onto the body.**

If an editor requires export/re-import to reach Digital Try-on, it fails.

## Real-time body interaction

The body stack should combine lightweight client-side tracking with heavier processing only when it earns the cost.

Possible layers include:

- lightweight pose / landmark tracking,
- browser-side WebGL or WebGPU rendering,
- commercial AR infrastructure where it eliminates bespoke camera/device work,
- higher-quality segmentation when needed,
- and model-assisted body reconstruction for initialization.

The objective is not to maximize the number of AI models.

The objective is to minimize correction effort while preserving exact source artwork and measurable placement quality.

## Body reconstruction

ARTOO should not bet everything on a single neural model.

Candidate systems for pose, body shape, depth and geometry can initialize the body target, but they do not become measurement truth automatically.

Their job is to reduce manual fitting.

ARTOO adds:

- calibration,
- local correction,
- UV/surface mapping,
- seam handling,
- physical scale,
- uncertainty,
- and artist-visible quality state.

## Segmentation and masking

Lightweight interactive tools should handle ordinary cases.

Heavier segmentation models should be invoked when they materially improve:

- skin/clothing boundaries,
- hair,
- scars,
- existing tattoos,
- white ink,
- semitransparent edges,
- occlusion,
- and motion tracking.

The meaningful metric is not merely model benchmark accuracy.

It is:

**How many seconds of artist correction does this remove?**

## Flattened artwork → editable working structure

Layered-generation systems can be used to decompose flattened reference art into editable working components.

But ARTOO must always:

- preserve the immutable source,
- treat decomposition as a derived asset,
- measure recomposition fidelity,
- label inferred or hallucinated regions,
- and never pretend derived raster layers are the original source layers or true vectors.

## Virtual try-on

ARTOO should separate three systems that many products collapse together.

### Exact projection

Preserves the actual artwork and calibrated placement.

### Assisted fitting

Uses inferred geometry and exposes uncertainty.

### Generative try-on

Creates fast, photorealistic concept previews for exploration.

This lets ARTOO exploit new virtual try-on technology without letting a beautiful generated image masquerade as physically accurate tattoo placement.

## Application architecture

The product should stay intentionally simpler than the historical architecture.

Start with:

- one shared web application,
- one canonical document model,
- one primary transactional store,
- private object storage,
- local-first browser persistence,
- a small job/workflow layer,
- replaceable rendering/model adapters,
- and provider adapters for payments, booking, fulfillment, messaging and AI.

No Kubernetes by default.

No service mesh by default.

No database zoo.

No microservice per noun.

No second implementation of the same editor state.

Split services only when measured workload, isolation, security or reliability actually requires it.

## Commerce

ARTOO owns:

- ledger semantics,
- accepted revisions,
- rights,
- allocations,
- transaction state,
- approval lineage,
- and business rules.

Payment providers handle regulated money movement.

Booking, fulfillment, messaging and other integrations remain replaceable adapters rather than becoming the product’s source of truth.

## The mandatory bake-off

Every editor, vision stack, model provider or architecture candidate has to survive the same end-to-end journey:

**draw → decompose reference art → place on a live body → change pose → correct the mask → adjust the wrap → generate an exact-size stencil → revise with the client → obtain artist approval → export the production package**

One project.

One revision history.

No file shuttling.

No rebuilding the tattoo in another app.

### Stack thesis

**ARTOO owns the workflow, the document, the body-placement logic, the provenance and the tattoo-specific intelligence—while aggressively borrowing mature editors, vision models, AR engines, virtual try-on systems, payment rails and infrastructure wherever doing so makes the product faster, cheaper and better.**

It is not a pile of AI models.

**It is a replaceable technology stack wrapped around a non-replaceable tattoo operating system.**

---

# 3. Autonomous Bootstrap / Company Pitch

## Build the product and the company as two coupled systems

ARTOO should be designed to operate like a one-person autonomous company until revenue proves that another human or paid service is necessary.

The objective is not merely:

> AI agents → APIs.

The stronger operating pattern is:

> **Owner → Constitution → Company Control Plane → Viability/Governance → Agent Workforce → Business Engines → External World → Evidence → Learning**

The missing architectural layer is the **company itself**.

ARTOO-the-product and ARTOO-the-company are related, but they are not the same system.

The product owns:

- designs,
- assets,
- body targets,
- placements,
- clients,
- artists,
- bookings,
- licenses,
- orders,
- payments,
- fulfillment,
- collaboration,
- and production handoff.

The company operating system owns:

- mission,
- objectives,
- initiatives,
- work,
- authority,
- budgets,
- agents,
- evidence,
- policies,
- commitments,
- risks,
- incidents,
- experiments,
- viability,
- operating mode,
- and organizational learning.

Swapping an orchestration framework should therefore be no more existential than swapping an editor engine.

It must not erase ARTOO’s institutional memory, governance, authorization model or operating history.

---

# 4. The ARTOO Company Kernel

ARTOO should own a thin, domain-specific **Company Kernel** whose contracts survive Paperclip, OneManCompany, OpenAcme or whatever orchestration layer replaces them later.

External orchestration systems are implementation candidates.

They are not the canonical definition of the company.

## Core primitives

| Primitive | Purpose |
|---|---|
| **Company** | ARTOO itself as an operational object |
| **Mission** | Durable reason the company exists |
| **Objectives / KPIs** | Measurable desired states |
| **Initiatives / Projects** | How objectives become coordinated work |
| **Tasks** | Atomic accountable execution units |
| **Agents / Roles** | Replaceable workers |
| **Capabilities** | What a worker may actually do |
| **Budgets** | Dollars, tokens, compute, rate and resource ceilings |
| **Authority** | AUTOMATIC / REQUIRE_APPROVAL / HUMAN_ONLY / DENIED |
| **Leases** | Which worker currently owns a unit of work |
| **Evidence / Receipts** | What proves an action actually happened |
| **Events** | Durable history of company state changes |
| **Exceptions** | Items requiring judgment |
| **Skills / SOPs** | Reusable operating procedures |
| **Provider adapters** | Codex, Claude, local models, OpenClaw, etc. |
| **Viability state** | Cash, product, system, customer and compliance health |
| **Operating mode** | NORMAL / ELEVATED / CRISIS |
| **Learning record** | What happened, why, result and whether to reuse |

## Additional primitives required for real autonomy

| Primitive | Why it matters |
|---|---|
| **Commitment** | Records what ARTOO has promised externally: delivery, refund, response, booking, payout, license, SLA, etc. |
| **Resource** | Tracks money, compute, storage, API quotas, inventory, attention, provider limits and fulfillment capacity |
| **Dependency / Provider** | Records external dependencies, health, substitution routes, degraded modes and switching cost |
| **Risk / Obligation** | Tracks legal, security, contractual, financial, privacy and operational obligations |
| **Experiment** | Hypothesis → baseline → intervention → metric → budget → stop condition → result |
| **Incident** | First-class abnormal state requiring containment, recovery, reconciliation and postmortem |
| **Policy** | Mutable operational rules derived from the more durable Constitution |

This yields a clean governance chain:

> **Constitution → Policies → Authority → Capabilities → Actions → Evidence**

---

# 5. Constitution and Authority

## Constitution

The Constitution should be compact and difficult to modify.

It contains things such as:

- mission,
- values,
- owner-reserved powers,
- spending doctrine,
- safety boundaries,
- rights doctrine,
- evidence doctrine,
- autonomy doctrine,
- and rules governing constitutional amendment.

## Policies

Policies are the mutable implementation of those principles.

Examples:

- deployment permissions,
- refund thresholds,
- model selection rules,
- support escalation rules,
- experiment budgets,
- retention schedules,
- allowed providers,
- security requirements,
- and operational limits.

## Authority is an envelope, not just a role

The user-facing authority levels can remain:

- **AUTOMATIC**
- **REQUIRE_APPROVAL**
- **HUMAN_ONLY**
- **DENIED**

But internally every authorization should specify:

- who may act,
- on what,
- using which capability,
- against which resource or counterparty,
- up to what spend or exposure,
- for how long,
- with what reversibility,
- under which operating mode,
- and what evidence is required afterward.

An agent does not gain broad authority because its title says “CEO,” “Growth,” or “Engineering.”

It receives a scoped capability grant.

### Example

A growth agent might be allowed to:

- publish already-approved organic content — **AUTOMATIC**
- spend $0 — **AUTOMATIC**
- launch a reversible landing-page experiment — **AUTOMATIC if tests pass**
- email a private client list — **REQUIRE_APPROVAL**
- spend $500 on paid media — **HUMAN_ONLY**
- purchase arbitrary software — **DENIED**

That is an economic constitution rather than “agents doing stuff.”

---

# 6. Company Metabolism

ARTOO should not merely have a task scheduler.

It needs metabolism.

The core recurring loop is:

> **Sense → Diagnose → Prioritize → Authorize → Execute → Verify → Reconcile → Learn → Sleep**

Every cycle checks:

### Money

- cash,
- liabilities,
- payouts,
- refunds,
- provider spend,
- contribution margin,
- recurring commitments,
- and runway constraints.

### Product

- failures,
- workflow completion,
- activation,
- retention,
- abandonment,
- performance,
- and quality regressions.

### Market

- demand,
- competitor movement,
- artist/client signals,
- new opportunities,
- and channel changes.

### Customers

- support load,
- unresolved disputes,
- satisfaction,
- commitments,
- response obligations,
- and churn risk.

### Engineering

- incidents,
- regressions,
- security issues,
- dependencies,
- CI/CD health,
- deployment state,
- and technical debt that crosses policy thresholds.

### Operations

- bookings,
- fulfillment,
- moderation,
- licensing,
- rights,
- compliance,
- taxes,
- reconciliation,
- and provider failures.

### Agents

- failures,
- compute spend,
- quality,
- looping,
- stale work,
- duplicated effort,
- underused agents,
- and capability violations.

### Strategy

- whether current work still advances ARTOO’s actual mission.

---

# 7. Three Operating Clocks

The metabolism should be hybrid.

## 1. Events

Immediate facts cause immediate bounded reactions.

Examples:

- payment failed,
- build broke,
- user replied,
- booking canceled,
- supplier completed an order,
- vulnerability was detected,
- provider went offline.

## 2. Work cycles

Ordinary execution:

> eligible task → lease → execute → produce evidence → verify → close / retry / escalate

## 3. Company heartbeat

Periodic systemic reconciliation:

> Are all these locally rational actions still creating a viable company?

So:

> **Event → local reaction**  
> **Task → bounded execution**  
> **Heartbeat → systemic judgment**

This prevents both constant wasteful polling and incoherent swarms of independently optimizing agents.

---

# 8. Viability Before Optimization

The Viability Governor should not first ask:

> What is the highest-scoring thing we could do?

It should first establish:

> What actions are currently viable?

Constraints may include:

- cash cannot go negative,
- existing commitments cannot silently become impossible,
- security posture cannot cross the minimum threshold,
- compliance obligations cannot knowingly lapse,
- core product health cannot fall below defined limits,
- owner-reserved powers cannot be bypassed,
- and mission coherence cannot be traded away for short-term optimization.

Only inside the viable action set should the system compare expected value.

The order is:

> **Constraints → viable action set → expected-value comparison → authorization → execution**

Not:

> ideas → score → do whatever scores highest.

---

# 9. The Closed Economic Loop

A self-operating business requires an explicit economic control loop:

> **observe market → detect opportunity → estimate expected value → choose experiment → allocate bounded resources → build → verify → distribute → acquire → activate → convert → deliver → collect → reconcile → support → measure retention → learn → reinvest or terminate**

Revenue cannot be merely a dashboard metric.

It must be part of the control system.

The Company Kernel should understand:

> **Opportunity → Experiment → Acquisition → Activation → Value Delivery → Conversion → Collection → Cost → Margin → Retention → Expansion / Referral → Reinvestment**

This allows ARTOO to eventually reason:

> This feature is heavily used but does not improve activation, retention, revenue, support burden, quality or strategic defensibility. Stop funding it.

Or:

> Artist onboarding is responsible for the largest qualified-flow abandonment. A $0 onboarding experiment has higher expected value than another visualization feature.

That is autonomous company operation rather than automated task management.

---

# 10. Evidence, State and Memory

Autonomous operation requires a hard distinction between:

## Memory

Useful retained context.

## Evidence

Replayable support for a claim.

## State

What the company currently considers authoritative.

## Decision

An authorized transition between states.

## Receipt

Proof that an external side effect actually occurred.

Agents may summarize memory.

They cannot summarize an external action into existence.

Examples:

A deployment is not complete because an engineering agent says:

> deployed.

Required evidence might include:

- commit SHA,
- CI run,
- deployment identifier,
- verification tests,
- health check,
- and release result.

A refund is not complete because support says:

> refunded.

Required evidence includes:

- provider transaction,
- receipt/event,
- ledger reconciliation,
- and updated customer balance/state.

The doctrine is:

> **No authorization, no action.**  
> **No named closer, no authoritative closure.**  
> **No replayable evidence, no claim of completion.**

---

# 11. Bootstrap Workforce

The initial workforce should be replaceable and cost-routed.

Potential operating layers include:

## Company control plane

A Paperclip-class system can initially implement:

- company,
- organization,
- goals,
- projects,
- tasks,
- agents,
- budgets,
- heartbeats,
- permissions,
- and execution cycles.

But it remains a candidate implementation beneath the ARTOO Company Kernel.

## Local / low-cost workers

OpenAcme-like workers are especially relevant for:

- persistent agents,
- local task execution,
- SQLite state,
- per-agent files,
- browser sessions,
- crash restart,
- MCP,
- and using already-paid model subscriptions before metered APIs where permitted.

## Agent HR and organizational processes

OneManCompany-like patterns contribute:

- hiring,
- replacement,
- coaching,
- performance reviews,
- structured meetings,
- quality chains,
- event-driven work,
- and separation of organizational shell from interchangeable talent.

## Viability and cybernetics

Cambium / ViableOS-like patterns contribute:

- viability checks,
- organizational operating modes,
- strategic escalation,
- conflict detection,
- provider fallback,
- budget calculation,
- and emergency channels.

## Evidence-earned authority

CorpOS / SafetyMP-like patterns contribute:

- authorization boundaries,
- explicit closure,
- replayable evidence,
- Approve / Reject / Kill,
- and evidence-earned autonomy.

## Company-as-code

CompanyOS-like patterns contribute:

- mission,
- governance,
- departments,
- workflows,
- standards,
- playbooks,
- templates,
- agent specifications,
- orchestration,
- memory classes,
- events,
- explicit state machines,
- leases/fencing,
- task-scoped grants,
- transactional outbox,
- typed evidence,
- and bounded self-improvement.

## Zero-cash autonomous-company patterns

Hermes-like autonomous-company constitutions contribute:

- explicit constitution,
- approved/rejected tool inventory,
- reusable skills,
- prompt versions,
- lessons,
- benchmarks,
- and operational history.

## Revenue operations

OWNEX-like patterns contribute:

- opportunity discovery,
- economic estimation,
- recurring revenue cycles,
- outcome logging,
- local/free model fallbacks,
- and human authority boundaries for irreversible external actions.

---

# 12. Capability Router

The execution layer should route work through the cheapest acceptable capability.

Default preference:

> **local/free → already-paid subscription → free-tier API → metered API → paid specialist/provider**

The router should consider:

- task type,
- quality requirement,
- privacy class,
- latency,
- cost,
- provider health,
- local availability,
- rate limits,
- evaluation score,
- and operating mode.

No model becomes a permanent architectural dependency simply because it currently performs best.

AI spending stays variable rather than structural.

---

# 13. Zero-Dollar Bootstrap Architecture

ARTOO should begin with a ruthless cost doctrine:

> **Do not introduce recurring cost until revenue pays for it or measurements prove paying removes a more expensive constraint.**

Initial principles:

- local-first editing,
- browser-side execution where possible,
- free/open-source infrastructure where appropriate,
- already-paid subscriptions before metered API spend,
- free-tier hosting until measured usage exceeds it,
- on-demand compute rather than idle infrastructure,
- one primary data system rather than a database zoo,
- one repo where practical,
- automated CI/CD,
- automated regression testing,
- evidence-producing workflows,
- and human attention treated as a scarce resource.

No Kubernetes by default.

No service mesh by default.

No observability empire before there is a system worth observing.

No paid growth before an organic loop demonstrates value.

No employee before repetitive work is proven incapable of safe automation.

No AI request without a reason to pay for it.

The zero-dollar objective is not to stay free forever.

It is:

> **Make every dollar of infrastructure, labor and AI spend something ARTOO must earn the right to incur.**

---

# 14. Automated Engineering Loop

GitHub can initially serve as the engineering control plane.

A mature loop looks like:

> user signal / bug / requirement / experiment → structured issue → authorized agent → isolated branch/worktree → implementation → tests → build → visual/benchmark evidence → review → merge → staged deployment → regression verification → production → telemetry → next evidence

Every major capability carries its own fixture.

Every bug becomes a regression test.

Every model replacement reruns the tattoo evaluation suite.

Every editor replacement runs the golden journey.

Every body-fitting change reruns calibrated geometry tests.

Every export change regenerates known stencils.

Every payment change reruns ledger invariants.

Every migration proves that old projects reopen.

The test suite compounds along with the product.

---

# 15. Automated Product Loop

Product telemetry should close the development loop.

Privacy-respecting events can track:

- completion,
- failure,
- latency,
- abandonment,
- correction burden,
- restore success,
- handoff success,
- support burden,
- paid conversion,
- contribution margin,
- repeat artist use,
- and experiment results.

Automated analysis should produce exception-oriented findings such as:

- what broke,
- what became slower,
- where users abandoned,
- what support issue repeated,
- which experiment materially helped,
- which feature appears unused,
- what changed after deployment.

Those findings can create structured work.

But they do not self-authorize consequential actions.

---

# 16. Automated Business Loop

The same architecture can run business operations.

Examples:

- onboarding adapts to client / artist / studio,
- transactional emails are event-driven,
- abandoned work receives recovery guidance,
- approved work triggers downstream booking or fulfillment options,
- support tickets arrive with safe diagnostics,
- billing anomalies route to financial exceptions,
- rights disputes route to human review,
- bookings remind themselves,
- quotes expire themselves,
- approvals remain bound to revisions,
- changed designs invalidate dependent approvals,
- payment events reconcile automatically,
- fulfillment retries idempotently,
- licenses travel with assets,
- temporary-tattoo orders reference exact approved revisions.

The business does not depend on somebody remembering to update a spreadsheet.

---

# 17. Growth Without Immediate Paid Acquisition

Growth should be instrumented before it is funded.

Potential organic loops include:

- artist portfolios becoming discoverable content,
- client ↔ artist invitations,
- studio ↔ artist invitations,
- shareable placement/comparison outputs,
- educational content,
- style and design discovery,
- reusable templates,
- temporary tattoo referrals,
- attribution back to artists,
- marketplace activity,
- and project artifacts that naturally produce distribution.

Only after a channel proves measurable activation, retention and revenue should ARTOO pay to amplify it.

---

# 18. Owner / Board Experience

The owner should not supervise dozens of agent conversations.

The owner should operate from an exception-oriented executive cockpit.

Example:

```text
ARTOO COMPANY — NORMAL

Mission alignment: healthy
Cash: $0 discretionary spend permitted
Product: healthy
Commerce reconciliation: balanced
Security: no active incidents
Customer commitments: 37 open / 0 overdue

64 autonomous operations completed
3 releases verified
14 support cases resolved
3 experiments active
4 agent failures automatically recovered
Compute spend: within policy

2 decisions require owner judgment
```

Every decision packet should contain:

- what happened,
- why it matters,
- evidence,
- available options,
- expected consequences,
- reversibility,
- urgency,
- authority level,
- recommendation where appropriate,
- and what happens if no decision is made.

The system’s success metric is not agent activity.

It is:

> **How little unnecessary owner attention does the company consume while remaining viable, accountable and aligned?**

Silence is a feature.

---

# 19. Target Architecture

```text
                         OWNER
                           │
                    BOARD CONSOLE
                           │
                  ┌────────┴────────┐
                  │  CONSTITUTION   │
                  │ mission · law   │
                  │ reserved powers │
                  └────────┬────────┘
                           │
                       POLICIES
                           │
                 ARTOO COMPANY KERNEL
 ┌─────────────────────────┼──────────────────────────┐
 │                         │                          │
Company State           Authority                 Economics
mission/goals         capabilities              resources
initiatives           grants                    budgets
commitments            approvals                 costs
obligations            leases                    revenue
risks                   hard stops                viability
 │                         │                          │
 └─────────────────────────┼──────────────────────────┘
                           │
                   VIABILITY GOVERNOR
             NORMAL / ELEVATED / CRISIS
                           │
                ┌──────────┴──────────┐
                │                     │
         EVENT REACTOR          COMPANY HEARTBEAT
                │                     │
                └──────────┬──────────┘
                           │
                     WORK SCHEDULER
                           │
                    AGENT WORKFORCE
       Engineering · Product · Growth · Support
        Finance · Operations · Compliance · Research
                           │
                   CAPABILITY ROUTER
       local/free → subscription → API → paid
                           │
                    BUSINESS ENGINES
      ARTOO app · marketplace · CRM · booking
      finance · fulfillment · marketing · support
                           │
                     EXTERNAL WORLD
                           │
          EVENTS · RECEIPTS · OUTCOMES · INCIDENTS
                           │
                EVIDENCE + RECONCILIATION
                           │
                   EXPERIMENT / LEARNING
                           │
                    POLICY / SOP UPDATE
                           │
                    next heartbeat
```

---

# 20. The Core Strategic Doctrine

The stack doctrine is:

> **Own the tattoo-specific intelligence. Reuse commodity capability.**

The company doctrine is:

> **Own identity, state, authority, economics and evidence. Rent execution.**

The autonomy doctrine is:

> **Let evidence—not agent confidence—earn increasing autonomy.**

The cost doctrine is:

> **Local/free/already-paid first. New spend only when viability policy authorizes it.**

The learning doctrine is:

> **Convert repetition into automation. Convert successful automation into SOPs. Convert SOPs into skills. Convert outcomes into evidence.**

The product doctrine is:

> **One project, one document lineage, one workflow—from idea to body to artist to business to Go-time.**

And the final bootstrap thesis is:

**ARTOO should not bootstrap as a miniature version of a 100-person company.**

It should bootstrap as an **autonomous, evidence-driven machine with one human executive above it**.

The machine can build software, test it, deploy it, observe it, document it, triage failures, run onboarding, handle routine support, reconcile transactions, execute bounded experiments, operate fulfillment workflows, surface opportunities and learn from outcomes.

But it does not silently seize authority merely because it can act.

**The app can run itself.  
The company can run itself.  
And they are not the same system.**

That distinction is the architecture.