## ADDED Requirements

### Requirement: Demo seed data is deterministic
The system SHALL seed minimum demo data for accounts, RFID cards, parking spots, IoT devices, and a registered vehicle.

#### Scenario: Demo seed creates parking spots and sensors
- **WHEN** demo seed runs
- **THEN** the system creates parking spots `A01` through `A10` and linked sensors `SENS_A01` through `SENS_A10`

#### Scenario: Demo seed creates RFID cards
- **WHEN** demo seed runs
- **THEN** the system creates assigned card `RFID_SV001` and temporary cards `RFID_GUEST_01`, `RFID_GUEST_02`

#### Scenario: Demo seed creates registered vehicle
- **WHEN** demo seed runs
- **THEN** the system creates vehicle `VEH_01` for customer `SV001` with license plate `59-X1 123.45`

### Requirement: Mock endpoints are development-only
The system SHALL disable or protect `/api/mock/*` routes outside development or demo mode.

#### Scenario: Mock endpoint called outside demo mode
- **WHEN** a `/api/mock/*` endpoint is called outside development or demo mode
- **THEN** the system rejects the request

### Requirement: Mock endpoints delegate to core services
Mock endpoints MUST only emit simulated events or trigger controlled flows and MUST NOT duplicate business logic.

#### Scenario: Mock gate-in endpoint receives event
- **WHEN** `/api/mock/gate/in` receives a valid payload
- **THEN** the endpoint delegates to the parking session service or domain method for check-in logic

### Requirement: Demo verification scripts cover core flows
The system SHALL provide executable or documented demo sequences for core assignment flows.

#### Scenario: Member demo flow is executed
- **WHEN** the member flow sequence runs from login through gate out
- **THEN** session creation, IoT occupancy, checkout, and fee calculation are all verifiable

### Requirement: Backend implements monolith architecture for MVP
The system SHALL implement all mock endpoints, services, and business logic in a single Express backend application.

#### Scenario: Mock endpoints run in same backend process
- **WHEN** `/api/mock/gate/in`, `/api/mock/iot/trigger`, and `/api/mock/bkpay-webhook` are called
- **THEN** all endpoints execute within the same Node.js Express application without microservice boundaries
