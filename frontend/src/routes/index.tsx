import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { StudentsPage } from "@/pages/StudentsPage";
import { StudentDetailsPage } from "@/pages/StudentDetailsPage";
import { PaymentsPage } from "@/pages/PaymentsPage";
import { PendingFeesPage } from "@/pages/PendingFeesPage";
import { AnnouncementsPage } from "@/pages/AnnouncementsPage";
import { ReportsPage } from "@/pages/ReportsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { AuditLogsPage } from "@/pages/AuditLogsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  // Auth Routes
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  // Main Application Protected Routes
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "students/:id",
        element: <StudentDetailsPage />,
      },
      {
        path: "payments",
        element: <PaymentsPage />,
      },
      {
        path: "pending-fees",
        element: <PendingFeesPage />,
      },
      {
        path: "announcements",
        element: <AnnouncementsPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "audit-logs",
        element: <AuditLogsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
