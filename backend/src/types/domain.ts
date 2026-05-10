export type UserRole = 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN';
export type AccountCategory = 'STUDENT' | 'LECTURER' | 'SCHOOL_STAFF';
export type ParkingPlanType = 'PAYG' | 'MONTH';

export interface Account {
  id: string;
  username: string;
  password?: string; // salt/hash omitted for MVP
  role: UserRole;
  displayName: string;
  email?: string;
  studentId?: string;
  accountCategory?: AccountCategory;
  parkingPlan?: ParkingPlanType;
  planActivatedAt?: string;
  planExpiresAt?: string;
}

export interface RFIDCard {
  id: string; // card ID e.g. RFID_SV001
  type: 'MEMBER' | 'GUEST';
  accountId?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'LOST';
}

export type VehicleStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Vehicle {
  id: string;
  customerId: string;
  ownerName: string;
  phone: string;
  licensePlate: string;
  color: string;
  licensePlateImageName: string;
  licensePlateImageData?: string;
  vehicleRegistrationImageName: string;
  vehicleRegistrationImageData?: string;
  status: VehicleStatus;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type SpotStatus = 'Available' | 'Occupied' | 'Maintenance';

export interface ParkingSpot {
  id: string; // e.g. A01
  status: SpotStatus;
  floor?: string;
}

export type DeviceStatus = 'ACTIVE' | 'DATAERROR' | 'DATADELAY' | 'OFFLINE';

export interface IoTDevice {
  id: string; // e.g. SENS_A01
  spotId: string;
  status: DeviceStatus;
  batteryLevel: number;
}

export type SessionStatus = 'Active' | 'ReadyToPay' | 'Completed' | 'Cancelled';

export interface ParkingSession {
  id: string;
  cardId: string;
  vehicleId?: string;
  licensePlate: string;
  checkInTime: string;
  checkOutTime?: string;
  spotId?: string;
  status: SessionStatus;
  fee: number;
}

export type PaymentStatus = 'Unpaid' | 'Paid' | 'Processing' | 'Failed';
export type NotificationAudience = 'CUSTOMER' | 'ADMIN';
export type NotificationLevel = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
export type NotificationType = 'INVOICE_DUE_SOON' | 'INVOICE_OVERDUE' | 'MONTHLY_EXPIRING' | 'MONTHLY_EXPIRED' | 'VEHICLE_APPROVED' | 'VEHICLE_REJECTED' | 'PAYMENT_SUCCESS' | 'SUBSCRIPTION_CREATED' | 'IOT_FAULT';

export interface Notification {
  id: string;
  audience: NotificationAudience;
  userId?: string;
  type: NotificationType;
  title: string;
  message: string;
  level: NotificationLevel;
  read: boolean;
  createdAt: string;
  link?: string;
  dedupeKey?: string;
}

export interface Transaction {
  id: string;
  sessionId?: string;
  invoiceId?: string;
  invoiceIds?: string[];
  amount: number;
  status: PaymentStatus;
  method: 'BKPay' | 'Cash';
  timestamp: string;
}

export interface Invoice {
  id: string;
  customerId: string;
  sessionIds: string[];
  invoiceType?: 'PAYG' | 'MONTHLY_PLAN';
  totalAmount: number;
  status: PaymentStatus;
  dueDate: string;
  createdAt: string;
}

export interface PricingPolicy {
  id: string;
  guestPerVisitFee: number;
  studentPerVisitFee: number;
  monthlyDiscountRate: number;
  monthlyFee?: number;
  baseFee?: number;
  hourlyRate?: number;
  overnightFee?: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  payload?: any;
}
