import { z } from "zod";

/**
 * Authentication Schemas
 */
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Student Form Schemas
 */
export const studentSchema = z.object({
  admissionNumber: z.string().min(1, "Admission number is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  roomNumber: z.string().min(1, "Room number is required"),
  floor: z.string().optional(),
  college: z.string().min(1, "College/Institution is required"),
  course: z.string().optional(),
  bloodGroup: z.string().optional(),
  guardianName: z.string().min(1, "Guardian name is required"),
  guardianPhone: z.string().min(10, "Guardian phone must be at least 10 digits"),
  guardianRelation: z.string().optional(),
  guardianEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  status: z.enum(["ACTIVE", "INACTIVE", "LEFT_HOSTEL", "EXPELLED", "GRADUATED"]).default("ACTIVE"),
  joiningDate: z.string().optional(),
});

export type StudentInput = z.infer<typeof studentSchema>;

/**
 * Payment Form Schemas
 */
export const paymentSchema = z.object({
  studentId: z.string().min(1, "Please select a student"),
  month: z.string().min(1, "Payment month is required"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  paymentMethod: z.enum(["CASH", "UPI", "BANK_TRANSFER", "CARD", "OTHER"]),
  paymentDate: z.string().min(1, "Payment date is required"),
  referenceNumber: z.string().optional(),
  notes: z.string().optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;

/**
 * Announcement Form Schemas
 */
export const announcementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  content: z.string().min(5, "Content must be at least 5 characters"),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
  target: z
    .enum(["ALL_STUDENTS", "SELECTED_STUDENTS", "INDIVIDUAL_STUDENT"])
    .default("ALL_STUDENTS"),
  scheduledFor: z.string().optional(),
});

export type AnnouncementInput = z.infer<typeof announcementSchema>;

/**
 * Settings Form Schemas
 */
export const settingsSchema = z.object({
  hostelName: z.string().min(2, "Hostel name is required"),
  hostelAddress: z.string().min(5, "Hostel address is required"),
  hostelPhone: z.string().min(10, "Valid phone number is required"),
  hostelEmail: z.string().email("Valid email is required"),
  wardenName: z.string().min(2, "Warden name is required"),
  wardenPhone: z.string().min(10, "Valid contact number is required"),
  wardenEmail: z.string().email("Valid email is required"),
  officeHours: z.string().optional(),
  upiId: z.string().min(3, "UPI ID is required"),
  paymentPhone: z.string().min(10, "Payment phone number is required"),
  paymentInstructions: z.string().optional(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;
