import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
}

interface ToastContextType {
  toast: (options: { title: string; description?: string; type?: ToastType }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({
      title,
      description,
      type = "info",
    }: {
      title: string;
      description?: string;
      type?: ToastType;
    }) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all animate-in slide-in-from-bottom-5 bg-card text-card-foreground",
              t.type === "success" && "border-emerald-500/30 dark:border-emerald-500/50",
              t.type === "error" && "border-destructive/40 dark:border-destructive/60",
              t.type === "warning" && "border-amber-500/40 dark:border-amber-500/60",
              t.type === "info" && "border-border"
            )}
          >
            {t.type === "success" && (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            )}
            {t.type === "error" && <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />}
            {t.type === "warning" && (
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            )}
            {t.type === "info" && <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />}

            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold leading-none">{t.title}</p>
              {t.description && <p className="text-xs text-muted-foreground">{t.description}</p>}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-muted-foreground hover:text-foreground rounded p-0.5 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
