import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryAction?: React.ReactNode;
  secondaryActions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  primaryAction,
  secondaryActions,
}) => {
  return (
    <div className="flex flex-col gap-3 pb-4 border-b border-border/80">
      {/* Breadcrumb row */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-1.5 text-xs text-muted-foreground">
          <Link
            to="/dashboard"
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Dashboard Home</span>
          </Link>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
              {item.href ? (
                <Link
                  to={item.href}
                  className="hover:text-foreground transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-semibold truncate max-w-[200px]">
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Title & Action row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-0.5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          {description && <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>}
        </div>

        {(primaryAction || secondaryActions) && (
          <div className="flex flex-wrap items-center gap-2 sm:self-center">
            {secondaryActions}
            {primaryAction}
          </div>
        )}
      </div>
    </div>
  );
};
