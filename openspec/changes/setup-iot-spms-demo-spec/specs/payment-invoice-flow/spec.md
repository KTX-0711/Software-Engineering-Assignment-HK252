## ADDED Requirements

### Requirement: BKPay mock webhook marks transaction paid
The system SHALL simulate BKPay payment completion through a development-only webhook.

#### Scenario: BKPay mock payment succeeds
- **WHEN** `/api/mock/bkpay-webhook` receives a success payload for an unpaid transaction
- **THEN** the system changes transaction status from `Unpaid` to `Paid`

### Requirement: Manual cash payment closes guest payment
The system SHALL support employee-confirmed cash payment for guest or temporary-card parking sessions.

#### Scenario: Guest pays cash
- **WHEN** an employee confirms cash payment for a guest session
- **THEN** the system records payment completion and closes the session

### Requirement: Monthly invoice job groups unpaid sessions
The system SHALL generate monthly invoices from unpaid member parking sessions through a mock job endpoint.

#### Scenario: Monthly invoice job runs manually
- **WHEN** `POST /api/mock/jobs/generate-monthly-invoice` is called
- **THEN** the system groups eligible unpaid sessions into an invoice and sets a due date five days later

### Requirement: Payment reminders are derived from invoice status
The system SHALL expose payment reminders dynamically based on unpaid invoice fields rather than an independent storage file.

#### Scenario: Invoice triggers reminder dynamically
- **WHEN** a monthly invoice in `invoices.json` has status `Unpaid` and a past or upcoming due date
- **THEN** backend `GET /api/invoices` exposes this state, and frontend renders a reminder for the member or operator

### Requirement: Time travel supports fee verification
The system SHALL allow mock checkout time input for testing fee calculation without waiting in real time.

#### Scenario: Mock checkout time changes fee duration
- **WHEN** `POST /api/mock/gate/out` receives `mockCheckOutTime` for an active session
- **THEN** the system calculates parking duration using that mock checkout time

### Requirement: Payment and invoice data persists in JSON file storage
The system SHALL store transaction and invoice records in static JSON files.

#### Scenario: Transaction status update writes to JSON
- **WHEN** a BKPay mock webhook marks a transaction as paid
- **THEN** the system updates `transactions.json` and `invoices.json` without database transactions
