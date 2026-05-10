## Context

IoT-SPMS already defines full requirements in `docs/main.md` and mock strategy in `docs/mock.md`. Current delivery target is an MVP demo built in 1 day, not a production smart-parking platform. The system must be split clearly between frontend and backend while staying small enough to finish: React/Vite UI, Express API, JSON file storage, mocked HCMUT_SSO, HCMUT_DATACORE, BKPay, RFID/camera, and IoT events.

## Goals / Non-Goals

**Goals:**
- Deliver a demoable MVP covering member flow, guest flow, IoT status/failure, BKPay mock, monthly invoice, admin dashboard/log/report summary.
- Keep one OpenSpec root as source of truth, but split each implementation task into Backend, Frontend, and E2E verification.
- Use static JSON files for persistence instead of a real DB.
- Keep `/api/mock/*` as simulation harness only; backend services own business logic.
- Make UI sufficient for demo: login, dashboards, admin map, employee panel, dev control panel.

**Non-Goals:**
- Real HCMUT_SSO, HCMUT_DATACORE, BKPay, IoT hardware, firmware, or AI license plate recognition.
- Production-grade auth/security, scaling, monitoring, DB transactions, CI/CD, Docker/Kubernetes.
- Separate OpenSpec initialization for frontend and backend.

## Recommended Stack

**Frontend:** React + Vite + TypeScript + Tailwind CSS + React Router + simple fetch wrapper.

**Backend:** Node.js + Express + TypeScript + JSON file repositories using `fs/promises`.

**Database:** static JSON files under `data/`: accounts, RFID cards, vehicles, parking spots, IoT devices, sessions, transactions, invoices, logs, pricing policy.

**Trade-off:** This stack sacrifices concurrency, schema rigor, and production realism for speed, inspectability, and low setup cost. Correct trade for 1-day MVP.

## FE/BE Boundary

**Frontend owns:**
- Role-based pages: Login, CustomerDashboard, EmployeePanel, AdminDashboard, DevControlPanel.
- Components: ParkingMap, SensorStatusTable, SessionStatusCard, InvoiceTable, LogTable, ReportSummary.
- API client wrappers only; no direct JSON-file access; no fee calculation.

**Backend owns:**
- Auth/profile mock, parking session lifecycle, RFID/vehicle/card logic, IoT spot/device state, payment/invoice state, admin reports/logs/pricing.
- Static JSON persistence.
- API validation at route boundary.
- Mock connector classes/services.

**E2E owns:**
- Manual or scripted demo sequence proving visible state changes in UI and JSON files.

## Decisions

1. **Single OpenSpec root, not FE/BE OpenSpec split**
   - Decision: Keep one OpenSpec root and split work inside design/tasks/spec scenarios.
   - Rationale: FE and BE must evolve together for demo flows. Two spec roots create drift.
   - Alternative: separate frontend/backend OpenSpec. Rejected unless frontend/backend are separate repos or teams.

2. **Static JSON file storage**
   - Decision: Persist MVP state in JSON files.
   - Rationale: Fast setup, easy inspection during demo, no schema migration or ORM cost.
   - Alternative: SQLite or another relational store. Rejected for 1-day MVP unless relational storage already exists.

3. **Express backend as business-logic boundary**
   - Decision: Backend services calculate fee, create sessions/invoices, update spot/device state, write logs.
   - Rationale: Prevents frontend/demo controls from becoming fake product logic.
   - Alternative: frontend-only mock app. Rejected because it cannot prove backend architecture in `docs/main.md`.

4. **React control panels over polished UX**
   - Decision: Build clear demo screens and dev triggers instead of production UI polish.
   - Rationale: Assignment demo values traceable flows over aesthetics.
   - Alternative: full user-facing product UI. Rejected as overbuilt for 1 day.

5. **Polling over realtime WebSocket**
   - Decision: Frontend refreshes state after commands or polls every few seconds.
   - Rationale: Good enough for demo, simpler than WebSocket.
   - Alternative: WebSocket/SSE. Rejected unless time remains after core flows.

## Risks / Trade-offs

- [JSON file writes can race] -> Mitigation: MVP demo is single-user/local; avoid concurrency stress.
- [Mock endpoints may hide real integration gaps] -> Mitigation: name them explicitly as mock and keep connectors isolated.
- [UI may look less production-like] -> Mitigation: prioritize visible state transitions and clear role pages.
- [No real auth security] -> Mitigation: demo-only static credentials; block `/api/mock/*` outside demo mode.
- [Scope creep from full `docs/main.md`] -> Mitigation: implement only flows needed to demonstrate core use-cases.

## Minimal Demo Flow Map

- Login page -> `POST /api/auth/login` -> backend mock SSO/DataCore -> role dashboard.
- DevControlPanel Gate In -> `POST /api/mock/gate/in` -> ParkingSessionService -> JSON session/log update -> UI state refresh.
- DevControlPanel IoT Trigger -> `POST /api/mock/iot/trigger` -> IoTService -> parking spot JSON update -> ParkingMap refresh.
- Gate Out -> `POST /api/mock/gate/out` -> fee calculation -> transaction/invoice JSON update.
- BKPay Mock -> `POST /api/mock/bkpay-webhook` -> transaction/invoice `Paid`.
- Admin dashboard -> reports/logs/pricing/sensor status APIs.

## Implementation Order

1. Backend JSON repository + seed data.
2. Backend services and mock connectors.
3. Backend APIs and `/api/mock/*` triggers.
4. Frontend routing/pages/components.
5. Dev control panel.
6. End-to-end manual demo pass.
