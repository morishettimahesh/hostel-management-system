import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="p-4 bg-destructive/10 text-destructive rounded-full">
        <AlertTriangle className="h-10 w-10" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">404 - Page Not Found</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        The requested page does not exist or has not been configured in the routing foundation.
      </p>
      <Button asChild>
        <Link to="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  );
};
