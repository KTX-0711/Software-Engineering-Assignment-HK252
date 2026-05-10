## ADDED Requirements

### Requirement: IoT trigger updates parking spot state
The system SHALL update parking spot status from mock IoT trigger events.

#### Scenario: Sensor detects occupied spot
- **WHEN** `POST /api/mock/iot/trigger` receives sensor ID `SENS_A01` with `detectObject: true`
- **THEN** parking spot `A01` becomes `Occupied`

#### Scenario: Sensor detects empty spot
- **WHEN** `POST /api/mock/iot/trigger` receives sensor ID `SENS_A01` with `detectObject: false`
- **THEN** parking spot `A01` becomes `Available`

### Requirement: Parking map exposes current spot states
The system SHALL make current parking spot states visible to users and staff.

#### Scenario: Spot state changes after trigger
- **WHEN** a mock IoT trigger changes spot `A01` state
- **THEN** backend `GET /api/parking/spots` returns the updated JSON-backed state and frontend `ParkingMap` renders that state

### Requirement: IoT failure states are visible
The system SHALL represent sensor error or delay states for staff monitoring.

#### Scenario: Sensor reports data error
- **WHEN** sensor `SENS_A02` status becomes `DATAERROR`
- **THEN** the admin/staff monitoring view shows the sensor as faulty

#### Scenario: Sensor reports delayed data
- **WHEN** sensor `SENS_A02` status becomes `DATADELAY`
- **THEN** the admin/staff monitoring view shows delayed or stale data state

### Requirement: IoT local buffering can be demonstrated
The system SHALL provide a mock buffering and resync path for IoT failure recovery.

#### Scenario: Buffered sensor data resyncs
- **WHEN** locally stored mock sensor data is synced back to the server
- **THEN** the system applies the buffered state update and clears the recovery condition

### Requirement: IoT state persists in JSON file storage
The system SHALL store parking spot and IoT device state in static JSON files.

#### Scenario: Spot state update writes to JSON
- **WHEN** a mock IoT trigger changes spot `A01` state
- **THEN** the system updates `parkingSpots.json` and `iotDevices.json` without database transactions

### Requirement: Frontend refreshes IoT state via polling or manual refresh
The system SHALL allow frontend to retrieve updated parking spot state through REST API calls rather than requiring WebSocket connections.

#### Scenario: Frontend polls spot state after trigger
- **WHEN** frontend calls `GET /api/parking/spots` after a mock IoT trigger
- **THEN** the system returns the updated spot state from JSON storage
