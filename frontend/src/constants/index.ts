export * from "@hostel/shared";

export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || "Hostel Management & Fee Tracking System",
  version: import.meta.env.VITE_APP_VERSION || "0.1.0",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
} as const;
