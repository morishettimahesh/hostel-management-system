import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Building2 } from "lucide-react";

export const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="mb-6 flex items-center gap-3 text-center sm:text-left">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
          <Building2 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">St. Jude Residency</h1>
          <p className="text-xs text-muted-foreground">Hostel Management & Fee Tracking System</p>
        </div>
      </div>
      <div className="w-full max-w-md">
        <Outlet />
      </div>
      <div className="mt-8 text-center text-xs text-muted-foreground">
        <Link to="/dashboard" className="text-primary hover:underline font-medium">
          ← Skip Sign In (Development Dashboard Preview)
        </Link>
      </div>
    </div>
  );
};
