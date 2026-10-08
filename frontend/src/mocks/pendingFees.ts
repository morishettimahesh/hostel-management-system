import { PaymentStatus } from "@hostel/shared";

export interface PendingFeeItem {
  id: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  roomNumber: string;
  college: string;
  guardianPhone: string;
  month: string;
  amountDue: number;
  totalMonthlyFee: number;
  dueDate: string;
  daysOverdue: number;
  status: PaymentStatus;
  lastReminderSent?: string;
}

/**
 * DEVELOPMENT MOCK DATA: Students With Pending & Overdue Fees
 */
export const MOCK_PENDING_FEES: PendingFeeItem[] = [
  {
    id: "pf-001",
    studentId: "std-1005",
    studentName: "Karan Mehta",
    admissionNumber: "ADM-2024-005",
    roomNumber: "102-A",
    college: "Commerce & Management College",
    guardianPhone: "+91 98555 66778",
    month: "October 2026",
    amountDue: 6000,
    totalMonthlyFee: 6000,
    dueDate: "2026-10-05",
    daysOverdue: 3,
    status: "OVERDUE",
    lastReminderSent: "2026-10-06",
  },
  {
    id: "pf-002",
    studentId: "std-1003",
    studentName: "Priya Patel",
    admissionNumber: "ADM-2024-003",
    roomNumber: "204-A",
    college: "City Medical Academy",
    guardianPhone: "+91 98333 44556",
    month: "October 2026",
    amountDue: 3000,
    totalMonthlyFee: 6000,
    dueDate: "2026-10-05",
    daysOverdue: 3,
    status: "PARTIALLY_PAID",
    lastReminderSent: "2026-10-06",
  },
  {
    id: "pf-003",
    studentId: "std-1006",
    studentName: "Vikram Singh",
    admissionNumber: "ADM-2024-006",
    roomNumber: "302-A",
    college: "Tech University",
    guardianPhone: "+91 98666 77889",
    month: "October 2026",
    amountDue: 6000,
    totalMonthlyFee: 6000,
    dueDate: "2026-10-05",
    daysOverdue: 3,
    status: "PENDING",
  },
  {
    id: "pf-004",
    studentId: "std-1008",
    studentName: "Deepak Nair",
    admissionNumber: "ADM-2024-008",
    roomNumber: "305-B",
    college: "State College of Fine Arts",
    guardianPhone: "+91 98888 99001",
    month: "September 2026",
    amountDue: 6000,
    totalMonthlyFee: 6000,
    dueDate: "2026-09-05",
    daysOverdue: 33,
    status: "OVERDUE",
    lastReminderSent: "2026-09-25",
  },
  {
    id: "pf-005",
    studentId: "std-1008",
    studentName: "Deepak Nair",
    admissionNumber: "ADM-2024-008",
    roomNumber: "305-B",
    college: "State College of Fine Arts",
    guardianPhone: "+91 98888 99001",
    month: "October 2026",
    amountDue: 6000,
    totalMonthlyFee: 6000,
    dueDate: "2026-10-05",
    daysOverdue: 3,
    status: "OVERDUE",
  },
];
