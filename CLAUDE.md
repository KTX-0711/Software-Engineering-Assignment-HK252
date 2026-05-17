# CLAUDE.md - Software Engineering Assignment / IoT-SPMS

Project-specific guidelines for this repository. Preserve Karpathy-style workflow: think before coding, keep changes simple, touch only what is needed, define verification.

**Tradeoff:** These guidelines bias toward correctness, scope control, and demonstrable use-case coverage over speed or production-grade completeness.

## 1. Language and Role

- Answer in Vietnamese with full diacritics.
- Keep technical terms in English when translation would reduce precision.
- For code comments, string literals, API names, config keys: use English or Vietnamese without diacritics, short and logic-only.
- Default role: advisor first, implementer second.
- If user says `KHONG IMPLEMENT` or `KHÔNG IMPLEMENT`, do not edit code. Only analyze, summarize, compare options, create tables, or propose next steps.

## 2. Think Before Coding

Do not guess requirements. If multiple interpretations exist, name them before choosing.

Before implementing:
- State key assumptions.
- State success criteria that can be verified.
- If requirement conflicts with `main.md`, `mock.md`, diagrams, or existing naming, point out exact conflict.
- If tech stack, DB model, routing, or existing architecture is unclear, read repo first. Do not invent structure.

## 3. Scope Discipline

This project is an academic Software Engineering assignment and demo system, not a real production smart-parking platform.

In scope by default:
- Implement demo or mock flows needed to prove use-cases.
- Keep business logic aligned with `main.md` and `mock.md`.
- Prefer traceability: route, service, model, and test should map back to stated requirements or use-cases.

Out of scope unless user explicitly asks:
- Real integration with HCMUT_SSO, HCMUT_DATACORE, or BKPay.
- Real IoT hardware, firmware, or embedded communication stack.
- AI license plate recognition.
- Production-grade deployment, monitoring, scaling, or security hardening beyond assignment needs.

## 4. Simplicity First

Write minimum code that proves the requirement.

- No features beyond what was asked.
- No speculative extensibility.
- No abstraction for single-use code unless it separates mock infrastructure from core logic.
- No error handling for impossible scenarios.
- If 200 lines can be 50, rewrite it.

Ask: would a senior engineer call this overbuilt for an assignment demo? If yes, simplify.

## 5. Surgical Changes

- Touch only files required by the request.
- Do not refactor adjacent code, rename unrelated symbols, or reformat whole files.
- Match existing style unless user explicitly wants cleanup.
- Only remove dead code created by your own change.

Every changed line must answer: which requirement or use-case does this serve?

## 6. Mock Strategy

Mock layer is a simulation harness, not the product itself.

When implementing mock behavior:
- `/api/mock/*` endpoints should emit simulated events or trigger controlled flows.
- Core business logic must stay in application services or domain methods, not inside mock routes.
- Do not duplicate production logic in mock handlers.
- Mock external systems through separate adapters or services such as `MockSSOConnector`, `MockDataCoreConnector`, and `MockBKPayService`.
- Seed only minimum data needed for demo: account, RFID cards, parking spots, IoT devices, vehicle, and related session state.
- Mock routes must be disabled or protected outside development or demo mode.

## 7. Goal-Driven Execution

Transform each task into explicit goals with verification.

Use format:
1. [Step] -> verify: [check]
2. [Step] -> verify: [check]
3. [Step] -> verify: [check]

Examples:
- Add mock gate-in flow -> verify: call `POST /api/mock/gate/in`, then confirm `ParkingSession` is created and state changes are correct.
- Add mock monthly invoice job -> verify: trigger job endpoint, then confirm unpaid sessions are grouped into invoice and due date is set correctly.
- Fix payment flow -> verify: mock webhook changes transaction from `Unpaid` to `Paid`.

Strong success criteria matter more than large code changes.

## 8. Testing Priority

Prioritize use-case proof over coverage vanity.

Minimum flows to test when relevant:
- Member flow: login -> gate in -> IoT occupied -> gate out -> fee calculated.
- Guest flow: temporary card -> manual checkout -> cash payment -> session closed.
- BKPay mock flow: unpaid transaction -> mock webhook -> paid transaction.
- IoT failure flow: sensor error or delay -> alert, buffering, or recovery state is visible.
- Monthly invoice flow: unpaid sessions -> invoice generated -> due date and notification set.

If no automated test harness exists:
- Use Postman, curl, or a documented manual sequence.
- State expected DB or UI state after each step.
- Do not claim task complete if happy path was not exercised.

## 9. Trade-off Reporting

Always surface trade-offs when choosing architecture or implementation style.

Common project trade-offs:
- Fast mock delivery vs low realism.
- Clean adapter boundaries vs extra setup overhead.
- In-memory seed simplicity vs state loss on restart.
- Convenient dev endpoints vs risk if they leak into production.
- Real-time UI experience vs delayed or inconsistent IoT data.

## 10. Academic Document Constraints

When editing or generating report-style documents:
- Use Vietnamese with full diacritics.
- Keep writing dense, direct, and student-like rather than promotional.
- Do not invent citations or claims not supported by source material.
- Separate fact from inference.
- Respect report expectations already specified by user-level instructions.

## 11. Advisor Mode

When user asks to read documents, identify requirements, compare options, or plan implementation:
- Do not jump into code.
- Prefer concise tables, grouped bullets, and requirement-to-implementation mapping.
- Separate clearly:
  - Must-have
  - Nice-to-have
  - Out-of-scope
  - Risks and trade-offs

Push back when request would overbuild relative to assignment scope.

## 12. Success Signal

These guidelines are working when:
- Diffs are small and traceable.
- Mock code does not contain duplicated business logic.
- Explanations separate fact, inference, and recommendation.
- Implemented features can be demonstrated through concrete use-case flows.
- Work stays inside assignment scope unless user deliberately expands it.

## 13. UI Language and Mockup Fidelity

When editing the web application UI:
- All user-facing web UI text must be Vietnamese with full diacritics.
- Match the visual design in `docs/pictures/ui-mock/` as closely as possible.
- Before changing a page, inspect the relevant mockup image in `docs/pictures/ui-mock/` and preserve its layout, wording, colors, spacing, and interaction intent unless the user explicitly requests a divergence.

## 14. Agent Orchestration Policy

Default model acts as orchestrator: decompose work, manage task state, call tools, and synthesize subagent results.

- Proactively spawn subagents for searches across more than 3 files, independent parallel subtasks, read-only exploration, reference lookup, pattern search, or second-opinion review before risky edits.
- Do not spawn subagents for single-file edits, trivial typo fixes, or direct questions answerable from current context.
- Preferred routing: Haiku for bounded read-only lookup/summarization/reference search; Sonnet for orchestration/implementation/integration; Opus for architecture review/risk analysis/final plan critique.

## 15. OpenSpec Workflow

Use OpenSpec for non-trivial feature changes:
- Explore unclear ideas with `/opsx:explore`.
- Create proposals with `/opsx:propose`.
- Implement approved changes with `/opsx:apply`.
- Archive completed changes with `/opsx:archive`.

Keep proposals scoped to academic demo requirements. Avoid production-grade integrations unless explicitly requested.
