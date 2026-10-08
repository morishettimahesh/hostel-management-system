import React from "react";
import { Badge } from "@/components/ui/badge";
import { StudentStatus, PaymentStatus } from "@hostel/shared";
import { cn } from "@/lib/utils";

type DomainStatus =
  StudentStatus | PaymentStatus | "OVERDUE" | "SUCCESS" | "WARNING" | "FAILED" | string;

interface StatusBadgeProps {
  status: DomainStatus;
  className?: string;
  size?: "sm" | "default";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  size = "default",
}) => {
  const normalized = status.toUpperCase().replace(/\s+/g, "_");

  let badgeVariant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" =
    "outline";
  let label = status.replace(/_/g, " ");

  switch (normalized) {
    // Student Statuses
    case "ACTIVE":
      badgeVariant = "success";
      label = "Active";
      break;
    case "INACTIVE":
      badgeVariant = "secondary";
      label = "Inactive";
      break;
    case "LEFT_HOSTEL":
    case "LEFT":
      badgeVariant = "outline";
      label = "Left Hostel";
      break;
    case "EXPELLED":
      badgeVariant = "destructive";
      label = "Expelled";
      break;
    case "GRADUATED":
      badgeVariant = "secondary";
      label = "Graduated";
      break;

    // Payment Statuses
    case "PAID":
      badgeVariant = "success";
      label = "Paid";
      break;
    case "PARTIALLY_PAID":
    case "PARTIAL":
      badgeVariant = "warning";
      label = "Partially Paid";
      break;
    case "PENDING":
      badgeVariant = "warning";
      label = "Pending";
      break;
    case "OVERDUE":
      badgeVariant = "destructive";
      label = "Overdue";
      break;
    case "REFUNDED":
      badgeVariant = "secondary";
      label = "Refunded";
      break;

    // Audit / Generic Statuses
    case "SUCCESS":
      badgeVariant = "success";
      label = "Success";
      break;
    case "FAILED":
      badgeVariant = "destructive";
      label = "Failed";
      break;
    case "WARNING":
      badgeVariant = "warning";
      label = "Warning";
      break;

    default:
      badgeVariant = "outline";
      label = status;
  }

  return (
    <Badge
      variant={badgeVariant}
      className={cn(
        "font-medium tracking-wide uppercase text-[10px] sm:text-xs",
        size === "sm" && "px-1.5 py-0 text-[10px]",
        className
      )}
    >
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          badgeVariant === "success" && "bg-emerald-500",
          badgeVariant === "warning" && "bg-amber-500",
          badgeVariant === "destructive" && "bg-rose-500",
          badgeVariant === "secondary" && "bg-slate-400",
          badgeVariant === "outline" && "bg-muted-foreground"
        )}
      />
      {label}
    </Badge>
  );
};
