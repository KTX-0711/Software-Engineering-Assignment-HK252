## ADDED Requirements

### Requirement: Mock SSO login authenticates demo accounts
The system SHALL authenticate demo users through a mocked HCMUT_SSO connector without calling the real university SSO service.

#### Scenario: Student login succeeds
- **WHEN** user submits username `hung.nguyen2311301` with password `password123`
- **THEN** the system authenticates the user and returns account ID `SV001`

#### Scenario: Invalid login fails
- **WHEN** user submits credentials not present in the mock account list
- **THEN** the system rejects authentication without creating a session

### Requirement: Mock DataCore resolves roles from account ID
The system SHALL resolve user role/profile data through a mocked HCMUT_DATACORE connector using account ID prefix rules.

#### Scenario: Student account maps to customer role
- **WHEN** account ID `SV001` is resolved through the mock DataCore connector
- **THEN** the system assigns role `CUSTOMER`

#### Scenario: Admin account maps to admin role
- **WHEN** account ID `AD001` is resolved through the mock DataCore connector
- **THEN** the system assigns role `ADMIN`

### Requirement: Authentication remains isolated from production integrations
The system MUST NOT call real HCMUT_SSO or HCMUT_DATACORE services in demo mode.

#### Scenario: Demo mode uses only mock connectors
- **WHEN** the application runs in demo or development mode
- **THEN** authentication and profile lookup use mock connectors only

### Requirement: Account data persists in JSON file storage
The system SHALL store demo account credentials and role mappings in static JSON files.

#### Scenario: Account lookup reads from JSON
- **WHEN** mock SSO connector authenticates a user
- **THEN** the system reads account credentials from `accounts.json` without database queries
