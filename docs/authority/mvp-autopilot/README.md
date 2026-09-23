# MVP Autopilot

Keep this directory intentionally small.

- [AUTOMATION_SPEC.md](AUTOMATION_SPEC.md) — durable Driver/Governor operating contract.
- [STATE.md](STATE.md) — current continuation record: verified state, active lease, blockers, handoff, next task.

One-off PR audits and superseded execution notes are historical evidence and belong under `../source-history/implementation-audits/`, not here.

`STATE.md` may change frequently. It must never silently redefine product scope, architecture, or authority.
