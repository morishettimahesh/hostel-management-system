/**
 * User and Authentication Types
 */
export type UserRole = "ADMIN" | "WARDEN" | "STAFF" | "STUDENT";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Student Types
 */
export type StudentStatus = "ACTIVE" | "INACTIVE" | "LEFT_HOSTEL" | "EXPELLED" | "GRADUATED";

export interface Student {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomNumber: string;
  floor?: string;
  college?: string;
  course?: string;
  bloodGroup?: string;
  status: StudentStatus;
  joiningDate: string;
  guardianName: string;
  guardianPhone: string;
  guardianRelation?: string;
  guardianEmail?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Fee & Payment Types
 */
export type PaymentStatus = "PAID" | "PARTIALLY_PAID" | "PENDING" | "OVERDUE" | "REFUNDED";
export type PaymentMethod = "CASH" | "UPI" | "BANK_TRANSFER" | "CARD" | "OTHER";

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName?: string;
  roomNumber?: string;
  month: string; // YYYY-MM
  amount: number;
  paidAmount: number;
  dueAmount: number;
  status: PaymentStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentTransaction {
  id: string;
  feeRecordId?: string;
  studentId: string;
  studentName: string;
  admissionNumber?: string;
  roomNumber: string;
  month: string;
  amount: number;
  paymentMethod: PaymentMethod;
  referenceNumber?: string;
  paymentDate: string;
  notes?: string;
  status: PaymentStatus;
  recordedByUserId: string;
  recordedByName?: string;
  createdAt: string;
}

/**
 * Announcement Types
 */
export type AnnouncementPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";
export type AnnouncementTarget = "ALL_STUDENTS" | "SELECTED_STUDENTS" | "INDIVIDUAL_STUDENT";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  target: AnnouncementTarget;
  targetCount?: number;
  scheduledFor?: string;
  authorId: string;
  authorName?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Audit Log Types
 */
export type AuditLogStatus = "SUCCESS" | "WARNING" | "FAILED";

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  record: string;
  status: AuditLogStatus;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

/**
 * Hostel & Warden Settings
 */
export interface HostelSettings {
  hostelName: string;
  hostelAddress: string;
  hostelPhone: string;
  hostelEmail: string;
  wardenName: string;
  wardenPhone: string;
  wardenEmail: string;
  officeHours: string;
  upiId: string;
  paymentPhone: string;
  paymentInstructions: string;
  qrCodeUrl?: string;
}

/**
 * API Standard Response Types
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    page?: number;
    pageSize?: number;
    totalCount?: number;
    totalPages?: number;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
