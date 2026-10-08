import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  rows?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading records...",
  rows = 4,
}) => {
  return (
    <div className="w-full space-y-3 p-4 animate-pulse">
      <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span>{message}</span>
      </div>
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-10 w-full bg-muted/60 rounded-md" />
        ))}
      </div>
    </div>
  );
};
