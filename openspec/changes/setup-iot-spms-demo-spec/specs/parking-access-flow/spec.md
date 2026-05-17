## ADDED Requirements

### Requirement: Member gate-in creates parking session
The system SHALL allow a registered member vehicle to enter through a mock gate-in event using RFID and camera license-plate input.

#### Scenario: Registered member enters parking lot
- **WHEN** `POST /api/mock/gate/in` receives `RFID_SV001` and license plate `59-X1 123.45`
- **THEN** the system creates an active parking session for account `SV001`

### Requirement: Member gate-out closes session and calculates fee
The system SHALL close an active member parking session and calculate fee when a mock gate-out event is received.

#### Scenario: Registered member exits parking lot
- **WHEN** `POST /api/mock/gate/out` receives `RFID_SV001` for an active session
- **THEN** the system closes the session and records a calculated fee

### Requirement: Guest flow supports temporary card and manual checkout
The system SHALL support guest parking through employee-issued temporary RFID cards and manual checkout/payment confirmation.

#### Scenario: Guest receives temporary card
- **WHEN** an employee issues `RFID_GUEST_01` to a guest vehicle
- **THEN** the system starts a guest parking session associated with the temporary card

#### Scenario: Guest exits with manual checkout
- **WHEN** an employee confirms manual checkout and cash payment for the guest session
- **THEN** the system closes the session and marks payment as completed

### Requirement: Gate exceptions require operator handling
The system SHALL expose inconsistent RFID/license-plate or missing session cases as exceptions for staff handling.

#### Scenario: License plate mismatch occurs
- **WHEN** gate-in receives a registered RFID but a camera plate that does not match the registered vehicle
- **THEN** the system does not auto-approve the session and marks the event for operator review

### Requirement: Parking session data persists in JSON file storage
The system SHALL store parking session records in static JSON files.

#### Scenario: Session creation writes to JSON
- **WHEN** a member gate-in creates a parking session
- **THEN** the system writes the session record to `parkingSessions.json` without database transactions
