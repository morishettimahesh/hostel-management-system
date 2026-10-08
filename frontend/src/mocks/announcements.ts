import { Announcement } from "@hostel/shared";

/**
 * DEVELOPMENT MOCK DATA: Announcements
 */
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "anc-001",
    title: "Diwali Vacation Hostel Timings & Mess Notice",
    content:
      "All students are advised to inform the warden office about their travel dates prior to October 20th. Mess service will operate on holiday schedule from October 28th to November 3rd.",
    priority: "HIGH",
    target: "ALL_STUDENTS",
    targetCount: 108,
    authorId: "usr-warden-01",
    authorName: "Chief Warden K. Sharma",
    createdAt: "2026-10-06T11:00:00Z",
    updatedAt: "2026-10-06T11:00:00Z",
  },
  {
    id: "anc-002",
    title: "Hot Water Solar Geyser Maintenance (Wing B)",
    content:
      "Routine preventive inspection of the solar water heating infrastructure in Wing B will take place this Saturday between 10:00 AM and 02:00 PM. Water supply will be briefly interrupted.",
    priority: "NORMAL",
    target: "ALL_STUDENTS",
    targetCount: 108,
    authorId: "usr-warden-01",
    authorName: "Chief Warden K. Sharma",
    createdAt: "2026-10-04T09:30:00Z",
    updatedAt: "2026-10-04T09:30:00Z",
  },
  {
    id: "anc-003",
    title: "Urgent: Fee Payment Reminder for October 2026",
    content:
      "Monthly hostel fees for October were due by October 5th. Students with outstanding balances are requested to clear dues immediately to avoid late fee penalties.",
    priority: "URGENT",
    target: "SELECTED_STUDENTS",
    targetCount: 18,
    authorId: "usr-warden-01",
    authorName: "Chief Warden K. Sharma",
    createdAt: "2026-10-06T08:00:00Z",
    updatedAt: "2026-10-06T08:00:00Z",
  },
  {
    id: "anc-004",
    title: "Annual Campus Fire Safety & Evacuation Drill",
    content:
      "Mandatory evacuation drill will be conducted in coordination with the Municipal Fire Service on Tuesday at 04:00 PM. All hostel occupants present must assemble at the main courtyard.",
    priority: "NORMAL",
    target: "ALL_STUDENTS",
    targetCount: 108,
    authorId: "usr-warden-01",
    authorName: "Chief Warden K. Sharma",
    createdAt: "2026-09-28T14:15:00Z",
    updatedAt: "2026-09-28T14:15:00Z",
  },
];
