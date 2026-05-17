## 1. Backend Foundation and Static Data

- [ ] 1.1 Create backend project structure for Express + TypeScript.
- [ ] 1.2 Create JSON file repository helper for read/write operations under `data/`.
- [ ] 1.3 Add deterministic seed JSON files for accounts, RFID cards, vehicles, parking spots, IoT devices, sessions, transactions, invoices, logs, and pricing policy.
- [ ] 1.4 Add demo/development guard for `/api/mock/*` routes.
- [ ] 1.5 Define shared domain types for roles, sessions, spots, devices, invoices, transactions, logs, and pricing.

## 2. Backend Auth and Profile Sync

- [ ] 2.1 Implement `MockSSOConnector` with demo accounts `SV001`, `AD001`, and `NV001`.
- [ ] 2.2 Implement `MockDataCoreConnector` with prefix-based role mapping for `SV`/`CB`, `NV`, and `AD`.
- [ ] 2.3 Implement `POST /api/auth/login` and `GET /api/auth/me`.
- [ ] 2.4 Verify valid student/admin/staff login and invalid login rejection through API.

## 3. Backend Parking Access Flow

- [ ] 3.1 Implement `ParkingSessionService` for member gate-in using RFID and camera license plate.
- [ ] 3.2 Implement member gate-out, session closure, fee calculation, and log write.
- [ ] 3.3 Implement guest temporary-card issue flow for `RFID_GUEST_01` and `RFID_GUEST_02`.
- [ ] 3.4 Implement guest manual checkout and cash payment confirmation.
- [ ] 3.5 Implement operator-review state for RFID/license-plate mismatch and missing-session exceptions.
- [ ] 3.6 Expose parking APIs needed by frontend dashboards.

## 4. Backend IoT, Payment, Invoice, Admin

- [ ] 4.1 Implement `IoTService` for spot/device state updates across `A01`-`A10` and `SENS_A01`-`SENS_A10`.
- [ ] 4.2 Implement fault states `DATAERROR` and `DATADELAY` plus simple recovery/buffering demo path.
- [ ] 4.3 Implement `MockBKPayService`, webhook handler, and `Unpaid` -> `Paid` transition.
- [ ] 4.4 Implement monthly invoice generation with due date five days later.
- [ ] 4.5 Implement admin APIs for accounts, pricing policy, reports, logs, and IoT device monitoring.

## 5. Backend Mock Demo Harness

- [ ] 5.1 Implement `POST /api/mock/gate/in` delegating to `ParkingSessionService`.
- [ ] 5.2 Implement `POST /api/mock/gate/out` delegating to checkout and fee services, including `mockCheckOutTime`.
- [ ] 5.3 Implement `POST /api/mock/iot/trigger` delegating to `IoTService`.
- [ ] 5.4 Implement `POST /api/mock/iot/fault` for `DATAERROR` and `DATADELAY`.
- [ ] 5.5 Implement `POST /api/mock/bkpay-webhook` delegating to payment service.
- [ ] 5.6 Implement `POST /api/mock/jobs/generate-monthly-invoice` delegating to invoice service.

## 6. Frontend Foundation

- [ ] 6.1 Create frontend project structure for React + Vite + TypeScript.
- [ ] 6.2 Add Tailwind CSS and basic layout shell.
- [ ] 6.3 Add API client wrappers for auth, parking, IoT, payment, admin, and mock endpoints.
- [ ] 6.4 Add React Router routes for login, customer dashboard, employee panel, admin dashboard, and dev control panel.
- [ ] 6.5 Add simple role-based navigation after login.

## 7. Frontend Demo Screens

- [ ] 7.1 Implement login page with demo account shortcuts or documented credentials.
- [ ] 7.2 Implement customer dashboard showing active session, transactions, invoices, and reminders.
- [ ] 7.3 Implement employee panel for guest card issue, manual checkout, and exception handling.
- [ ] 7.4 Implement admin dashboard showing parking map, sensor table, report summary, logs, and pricing policy.
- [ ] 7.5 Implement dev control panel buttons for gate in/out, IoT trigger/fault, BKPay webhook, and monthly invoice job.
- [ ] 7.6 Refresh frontend state after each command or via simple polling.

## 8. End-to-End MVP Verification

- [ ] 8.1 Verify member flow: login -> gate in -> IoT occupied -> gate out -> fee/transaction visible.
- [ ] 8.2 Verify guest flow: issue temporary card -> gate in/out -> cash payment -> session closed.
- [ ] 8.3 Verify BKPay flow: unpaid invoice/transaction -> mock webhook -> paid state visible.
- [ ] 8.4 Verify IoT failure flow: `DATAERROR`/`DATADELAY` visible on admin dashboard and recovery updates state.
- [ ] 8.5 Verify monthly invoice flow: unpaid sessions -> invoice generated -> due date and reminder visible.
- [ ] 8.6 Verify JSON files reflect final demo state and logs capture key actions.
