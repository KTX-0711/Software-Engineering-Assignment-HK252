# Design: IoT-SPMS MVP architecture

## Context

`docs/main.md` mô tả hệ thống IoT-SPMS đầy đủ: SSO, DATACORE, BKPay, RFID/camera gate, IoT sensor, admin reporting, logs, pricing, monthly invoice. Với constraint MVP 1 ngày, thiết kế phải giảm complexity nhưng vẫn chứng minh đúng nghiệp vụ. Điểm cắt hợp lý: frontend React để demo thao tác, backend Express giữ nghiệp vụ, dữ liệu lưu bằng file JSON, external systems đều mock.

## Architecture

```text
React + Vite Frontend
  -> HTTP REST API
Express Backend
  -> Services / Domain logic
  -> Mock connectors
  -> JSON file repositories
  -> data/*.json
```

## Recommended Stack

### Frontend

- React + Vite + TypeScript.
- Tailwind CSS cho UI nhanh.
- React Router cho route theo role.
- Fetch wrapper đơn giản cho API calls.

Lý do: MVP 1 ngày cần tốc độ dựng UI. React/Vite đủ nhẹ, dễ chia page, không kéo framework server-side phức tạp.

### Backend

- Node.js + Express + TypeScript.
- JSON file storage bằng `fs/promises`.
- Zod hoặc validation thủ công ở route boundary.

Lý do: Express dễ dựng API + mock endpoint nhanh. Static JSON giảm setup lưu trữ quan hệ, migration, Docker, ORM. Trade-off là concurrency và consistency yếu, nhưng acceptable cho demo local 1 ngày.

## Module Boundary

### Frontend modules

```text
src/
  pages/
    LoginPage.tsx
    CustomerDashboard.tsx
    EmployeePanel.tsx
    AdminDashboard.tsx
    DevControlPanel.tsx # FE page, visible to EMPLOYEE/ADMIN, calls /api/mock/*
  components/
    ParkingMap.tsx # FE component, renders state from GET /api/parking/spots
    SessionStatusCard.tsx
    InvoiceTable.tsx
    SensorStatusTable.tsx
    LogTable.tsx
  api/
    client.ts
    authApi.ts
    parkingApi.ts
    iotApi.ts
    paymentApi.ts
    adminApi.ts
  types/
    domain.ts
```

Frontend responsibilities:
- Render role-specific UI.
- Call backend APIs.
- Show state transitions clearly for demo.
- `DevControlPanel.tsx` is a frontend-only page for `EMPLOYEE` and `ADMIN` to trigger mock/demo APIs.
- `ParkingMap.tsx` only renders spot state returned by `GET /api/parking/spots`.
- Never calculate fee or mutate JSON files directly.

### Backend modules

```text
src/
  server.ts
  routes/
    auth.routes.ts
    parking.routes.ts
    iot.routes.ts
    payment.routes.ts
    admin.routes.ts
    mock.routes.ts
  services/
    AuthService.ts
    ParkingSessionService.ts
    IoTService.ts
    PaymentService.ts
    InvoiceService.ts
    AdminService.ts
    LogService.ts
  connectors/
    MockSSOConnector.ts
    MockDataCoreConnector.ts
    MockBKPayService.ts
  repositories/
    JsonRepository.ts
  data/
    seed.ts
  types/
    domain.ts
```

Backend responsibilities:
- Own all business logic.
- Persist state through JSON repository.
- Validate API payloads.
- Protect `/api/mock/*` outside demo/development mode.
- Log important state-changing actions.

## Static JSON Database Design

Minimum files:

- `accounts.json`: account ID, username, password, role, display name.
- `rfidCards.json`: card ID, type, assigned account, status.
- `vehicles.json`: vehicle ID, customer ID, license plate.
- `parkingSpots.json`: spot ID, status.
- `iotDevices.json`: sensor ID, spot ID, status, battery level.
- `parkingSessions.json`: session ID, account/card/vehicle, check-in/out, spot, status, fee.
- `transactions.json`: transaction ID, invoice/session ID, amount, status, method.
- `invoices.json`: invoice ID, customer ID, session IDs, total, status, due date.
- `logs.json`: timestamp, actor, action, payload summary.
- `pricingPolicy.json`: base fee, hourly fee, overnight fee or simple rate table.

Repository rule:
- Backend reads/writes whole JSON file.
- For MVP, no DB locking. Avoid parallel stress test.
- Seed script creates files if absent or reset flag is provided.

## API Boundary

### Auth/Profile

- `POST /api/auth/login`
- `GET /api/auth/me`

Backend uses `MockSSOConnector` then `MockDataCoreConnector`.

### Parking

- `GET /api/parking/sessions`
- `GET /api/parking/spots` - backend source of truth for `ParkingMap.tsx`, backed by JSON storage
- `POST /api/parking/guest-card`
- `POST /api/parking/manual-checkout`

### IoT

- `GET /api/iot/devices`
- `POST /api/iot/devices/:sensorId/status`

### Payment/Invoice

- `GET /api/payments/transactions`
- `GET /api/invoices`
- `POST /api/payments/cash-confirm`

### Admin

- `GET /api/admin/accounts`
- `GET /api/admin/reports/summary`
- `GET /api/admin/logs`
- `GET /api/admin/pricing-policy`
- `PUT /api/admin/pricing-policy`

### Mock demo harness

- `POST /api/mock/gate/in`
- `POST /api/mock/gate/out`
- `POST /api/mock/iot/trigger`
- `POST /api/mock/iot/fault`
- `POST /api/mock/bkpay-webhook`
- `POST /api/mock/jobs/generate-monthly-invoice`

Rule: mock routes call services; services contain logic.

## Core Demo Flows

### Member flow

1. Frontend login as `hung.nguyen2311301`.
2. Dev panel calls `POST /api/mock/gate/in` with `RFID_SV001`, plate `59-X1 123.45`.
3. Backend creates active `ParkingSession`.
4. Dev panel calls `POST /api/mock/iot/trigger` for `SENS_A01`, `detectObject: true`.
5. Parking map shows `A01 = Occupied`.
6. Dev panel calls `POST /api/mock/gate/out` with optional `mockCheckOutTime`.
7. Backend closes session, calculates fee, creates unpaid transaction/invoice item.

### Guest flow

1. Employee panel issues `RFID_GUEST_01`.
2. Gate-in creates guest session.
3. Gate-out marks session ready for manual payment.
4. Employee confirms cash payment.
5. Backend closes session and writes transaction `Paid`.

### BKPay flow

1. Customer has unpaid invoice/transaction.
2. Dev panel triggers BKPay mock.
3. `MockBKPayService` calls `/api/mock/bkpay-webhook` or directly delegates webhook handler.
4. Backend marks transaction/invoice `Paid`.

### IoT failure flow

1. Admin/dev panel sets `SENS_A02 = DATAERROR` or `DATADELAY`.
2. Admin dashboard shows fault state.
3. Recovery trigger syncs buffered event.
4. Dashboard returns device to `ACTIVE` and spot state updates.

### Monthly invoice flow

1. Dev panel calls monthly invoice job.
2. Backend groups unpaid member sessions.
3. Invoice due date = current date + 5 days.
4. Customer dashboard shows unpaid invoice and reminder.

## Security and Scope

- No real payment or university auth.
- Demo passwords are static and must stay local.
- `/api/mock/*` requires `NODE_ENV !== "production"` or `DEMO_MODE=true`.
- No JWT complexity required for MVP; session can be in memory/localStorage token if needed. Trade-off: weak security, high speed.

## Implementation Order

1. Backend domain types + JSON repository + seed.
2. Auth/profile mock.
3. Parking session service + gate mock endpoints.
4. IoT service + parking map API.
5. Payment/invoice service + BKPay mock.
6. Admin/report/log endpoints.
7. Frontend pages/components.
8. Dev control panel.
9. E2E manual demo pass.

## Trade-offs

- JSON file DB -> fastest setup, weak concurrency.
- Express -> fast MVP, less structure than Spring Boot.
- Frontend polling -> easy and reliable, less real-time than WebSocket.
- Mock connectors -> aligned with assignment, not production realistic.
- Single repo OpenSpec -> one source of truth, less drift between FE/BE.

## Done Definition

MVP is done when one local run can show: login, gate in/out, spot update, sensor fault, guest checkout, BKPay paid transition, monthly invoice generation, admin logs/report summary. Anything beyond that is polish.
