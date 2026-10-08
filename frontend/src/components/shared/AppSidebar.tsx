import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  AlertCircle,
  Megaphone,
  BarChart3,
  Settings,
  ShieldCheck,
  LogOut,
  Building2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import { MOCK_PENDING_FEES } from "@/mocks";

interface AppSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Students", path: "/students", icon: Users },
  { label: "Payments", path: "/payments", icon: CreditCard },
  {
    label: "Pending Fees",
    path: "/pending-fees",
    icon: AlertCircle,
    badge: MOCK_PENDING_FEES.length.toString(),
  },
  { label: "Announcements", path: "/announcements", icon: Megaphone },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
  { label: "Audit Logs", path: "/audit-logs", icon: ShieldCheck },
];

export const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen = false, onClose }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Signed out of warden administration console.",
      type: "info",
    });
    if (onClose) onClose();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-transform duration-200 ease-in-out md:static md:translate-x-0 shadow-sm",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-foreground leading-none">
                St. Jude Residency
              </h1>
              <p className="text-[11px] font-medium text-muted-foreground mt-0.5">
                Hostel Admin Portal
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden text-muted-foreground hover:text-foreground rounded p-1"
              aria-label="Close navigation drawer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors",
                      item.path === "/pending-fees"
                        ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Section: Separated Logout */}
        <div className="border-t p-3 space-y-2">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
