## Why

IoT-SPMS already has requirement documents and mock guidance, but OpenSpec has no capability contract yet. This change turns the existing system design into an implementation-ready demo specification so later work can be applied in small, verifiable slices.

## What Changes

- Define demo-scope capabilities for authentication/profile sync, parking access, IoT spot monitoring, payment/invoice handling, and admin operations.
- Capture mock boundaries for HCMUT_SSO, HCMUT_DATACORE, BKPay, RFID/camera events, and IoT sensors.
- Establish verification scenarios for member parking, guest parking, BKPay payment, IoT failure, monthly invoice generation, and admin monitoring/reporting.
- Exclude real production integrations, real IoT firmware/hardware, AI license plate recognition, and production-grade infrastructure work.

## Capabilities

### New Capabilities
- `auth-profile-sync`: Login through mocked HCMUT_SSO and role/profile lookup through mocked HCMUT_DATACORE.
- `parking-access-flow`: Member and guest gate entry/exit flows using RFID/card and camera/license-plate input.
- `iot-spot-monitoring`: Parking spot status updates, IoT trigger events, delay/error states, and visible parking map state.
- `payment-invoice-flow`: BKPay mock webhook, manual cash payment, fee calculation, monthly invoice generation, due dates, and notifications.
- `admin-operations`: Staff/admin management flows for accounts, pricing policy, reports, logs, and IoT device monitoring.
- `mock-demo-harness`: Development-only mock APIs, seed data, external-system adapters, time travel, and demo verification scripts.

### Modified Capabilities


## Impact

- Affected OpenSpec artifacts: `openspec/changes/setup-iot-spms-demo-spec/proposal.md`, `design.md`, `tasks.md`, and capability specs under `specs/`.
- Affected future APIs: `/api/mock/*` routes for gate events, IoT triggers, BKPay webhook, and monthly invoice job.
- Affected future services: authentication connector, DataCore connector, parking session service, IoT device/spot service, payment service, invoice job, admin/reporting services.
- External systems remain mocked for assignment demo scope: HCMUT_SSO, HCMUT_DATACORE, BKPay, RFID/camera hardware, and IoT gateway/sensors.
