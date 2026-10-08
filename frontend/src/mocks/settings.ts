import { HostelSettings } from "@hostel/shared";

/**
 * DEVELOPMENT MOCK DATA: Hostel & Warden Configuration
 */
export const MOCK_SETTINGS: HostelSettings = {
  hostelName: "St. Jude Collegiate Residency & Hostel",
  hostelAddress: "Plot 42, Campus Green Road, Knowledge Park II, Tech Zone 4, 560001",
  hostelPhone: "+91 80 2345 6789",
  hostelEmail: "admin@stjudehostel.edu",
  wardenName: "Dr. K. Sharma",
  wardenPhone: "+91 98450 11223",
  wardenEmail: "warden.sharma@stjudehostel.edu",
  officeHours: "Monday - Saturday: 08:00 AM - 08:00 PM (Emergency: 24/7)",
  upiId: "stjude.hostel@icici",
  paymentPhone: "+91 98450 11223",
  paymentInstructions:
    "Kindly mention Student Admission Number in the UPI transfer remark/notes. After making the payment, screenshot or reference number should be shared with the warden office.",
  qrCodeUrl:
    "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=stjude.hostel@icici&pn=StJudeHostel",
};
