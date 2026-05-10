export type UserRole = 'CUSTOMER' | 'EMPLOYEE' | 'ADMIN';
export type AccountCategory = 'STUDENT' | 'LECTURER' | 'SCHOOL_STAFF';
export type ParkingPlanType = 'PAYG' | 'MONTH';
export type NotificationLevel = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
export type NotificationType = 'INVOICE_DUE_SOON' | 'INVOICE_OVERDUE' | 'MONTHLY_EXPIRING' | 'MONTHLY_EXPIRED' | 'VEHICLE_APPROVED' | 'VEHICLE_REJECTED' | 'PAYMENT_SUCCESS' | 'SUBSCRIPTION_CREATED' | 'IOT_FAULT';

export interface Notification {
  id: string;
  audience: 'CUSTOMER' | 'ADMIN';
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

export interface Account {
  id: string;
  username: string;
  password?: string;
  role: UserRole;
  displayName: string;
  studentId?: string;
  accountCategory?: AccountCategory;
  parkingPlan?: ParkingPlanType;
  planActivatedAt?: string;
  planExpiresAt?: string;
}

export interface RFIDCard {
  id: string;
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

export interface ParkingSpot {
  id: string;
  status: 'Available' | 'Occupied' | 'Maintenance';
  floor?: string;
}

export interface IoTDevice {
  id: string;
  spotId: string;
  status: 'ACTIVE' | 'DATAERROR' | 'DATADELAY' | 'OFFLINE';
  batteryLevel: number;
}

export interface ParkingSession {
  id: string;
  cardId: string;
  licensePlate: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'Active' | 'ReadyToPay' | 'Completed' | 'Cancelled';
  fee: number;
}

export interface PricingPolicy {
  id: string;
  guestPerVisitFee: number;
  studentPerVisitFee: number;
  monthlyDiscountRate: number;
  monthlyFee: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  sessionIds?: string[];
  invoiceType?: 'PAYG' | 'MONTHLY_PLAN';
  totalAmount: number;
  status: 'Unpaid' | 'Paid' | 'Processing' | 'Failed';
  dueDate: string;
  createdAt: string;
  reminder?: 'OVERDUE' | 'DUE_SOON' | null;
}

export interface Transaction {
  id: string;
  sessionId?: string;
  invoiceId?: string;
  invoiceIds?: string[];
  amount: number;
  status: 'Unpaid' | 'Paid' | 'Processing' | 'Failed';
  method: 'BKPay' | 'Cash';
  timestamp: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  payload?: any;
}
