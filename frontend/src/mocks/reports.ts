/**
 * DEVELOPMENT MOCK DATA: Reports & Analytics Summaries
 */
export const MOCK_MONTHLY_COLLECTIONS = [
  {
    month: "October 2026",
    expected: 720000,
    collected: 585000,
    pending: 135000,
    collectionRate: "81.2%",
  },
  {
    month: "September 2026",
    expected: 720000,
    collected: 708000,
    pending: 12000,
    collectionRate: "98.3%",
  },
  {
    month: "August 2026",
    expected: 700000,
    collected: 700000,
    pending: 0,
    collectionRate: "100.0%",
  },
  {
    month: "July 2026",
    expected: 690000,
    collected: 684000,
    pending: 6000,
    collectionRate: "99.1%",
  },
  { month: "June 2026", expected: 650000, collected: 650000, pending: 0, collectionRate: "100.0%" },
  {
    month: "May 2026",
    expected: 650000,
    collected: 645000,
    pending: 5000,
    collectionRate: "99.2%",
  },
];

export const MOCK_STUDENT_FEE_SUMMARY = [
  {
    student: "Aarav Sharma",
    room: "101-A",
    totalBilled: 18000,
    totalPaid: 18000,
    pending: 0,
    status: "PAID",
  },
  {
    student: "Rohan Verma",
    room: "101-B",
    totalBilled: 18000,
    totalPaid: 18000,
    pending: 0,
    status: "PAID",
  },
  {
    student: "Priya Patel",
    room: "204-A",
    totalBilled: 18000,
    totalPaid: 15000,
    pending: 3000,
    status: "PARTIALLY_PAID",
  },
  {
    student: "Ananya Deshmukh",
    room: "204-B",
    totalBilled: 18000,
    totalPaid: 18000,
    pending: 0,
    status: "PAID",
  },
  {
    student: "Karan Mehta",
    room: "102-A",
    totalBilled: 18000,
    totalPaid: 12000,
    pending: 6000,
    status: "PENDING",
  },
  {
    student: "Vikram Singh",
    room: "302-A",
    totalBilled: 18000,
    totalPaid: 12000,
    pending: 6000,
    status: "PENDING",
  },
  {
    student: "Sneha Reddy",
    room: "205-A",
    totalBilled: 18000,
    totalPaid: 18000,
    pending: 0,
    status: "PAID",
  },
  {
    student: "Deepak Nair",
    room: "305-B",
    totalBilled: 18000,
    totalPaid: 6000,
    pending: 12000,
    status: "OVERDUE",
  },
];
