import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Sun,
  Moon,
  Monitor,
  Menu,
  User,
  Settings as SettingsIcon,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/components/ui/toast";

interface AppHeaderProps {
  onToggleSidebar?: () => void;
}

const ROUTE_NAME_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  students: "Students",
  payments: "Payments",
  "pending-fees": "Pending Fees",
  announcements: "Announcements",
  reports: "Reports",
  settings: "Hostel Settings",
  "audit-logs": "Audit Trail",
};

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleSidebar }) => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentSegment = pathSegments[0] || "dashboard";
  const currentTitle = ROUTE_NAME_MAP[currentSegment] || "Portal";

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out of the warden session.",
      type: "info",
    });
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
      {/* Left: Mobile Toggle & Page Context */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="md:hidden text-muted-foreground hover:text-foreground"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Hostel Admin
          </span>
          <span className="hidden sm:inline-block text-muted-foreground/40">/</span>
          <span className="text-sm font-semibold text-foreground tracking-tight">
            {currentTitle}
          </span>
          {pathSegments.length > 1 && (
            <>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-xs font-mono text-muted-foreground">{pathSegments[1]}</span>
            </>
          )}
        </div>
      </div>

      {/* Right: Actions & User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={cycleTheme}
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
          title={`Theme: ${theme}`}
        >
          {theme === "light" ? (
            <Sun className="h-4 w-4 text-amber-500" />
          ) : theme === "dark" ? (
            <Moon className="h-4 w-4 text-indigo-400" />
          ) : (
            <Monitor className="h-4 w-4" />
          )}
        </Button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-rose-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2">
            <div className="flex items-center justify-between pb-2 px-2 border-b">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Recent Notifications
              </span>
              <span className="text-[10px] bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold px-1.5 py-0.5 rounded-full">
                2 new
              </span>
            </div>
            <div className="py-2 space-y-1 text-xs">
              <div className="p-2 rounded-md bg-muted/40 hover:bg-muted transition-colors cursor-pointer">
                <p className="font-semibold text-foreground">3 Student dues overdue</p>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  Fee deadline passed for Room 102-A, 204-A, 302-A
                </p>
                <span className="text-[10px] text-muted-foreground mt-1 block">15m ago</span>
              </div>
              <div className="p-2 rounded-md hover:bg-muted transition-colors cursor-pointer">
                <p className="font-semibold text-foreground">New payment verified</p>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  ₹6,000 received via IMPS for Tanvi Kulkarni
                </p>
                <span className="text-[10px] text-muted-foreground mt-1 block">2h ago</span>
              </div>
            </div>
            <div className="pt-1 border-t text-center">
              <Link to="/audit-logs" className="text-xs text-primary hover:underline font-medium">
                View Audit Trail
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-5 w-px bg-border hidden sm:block" />

        {/* Warden Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full p-1 text-left outline-none hover:bg-muted/60 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                  KS
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-foreground leading-tight">
                  Dr. K. Sharma
                </div>
                <div className="text-[10px] text-muted-foreground leading-tight">Chief Warden</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden lg:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm font-medium leading-none">Dr. K. Sharma</p>
                <p className="text-xs text-muted-foreground">warden.sharma@stjudehostel.edu</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Warden Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                <SettingsIcon className="h-4 w-4" />
                <span>Hostel Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive cursor-pointer flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
