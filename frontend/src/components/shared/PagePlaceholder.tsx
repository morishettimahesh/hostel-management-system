import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, Hammer, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PagePlaceholderProps {
  title: string;
  description: string;
  routePath: string;
  icon: LucideIcon;
  plannedFeatures: string[];
  backLink?: {
    href: string;
    label: string;
  };
}

export const PagePlaceholder: React.FC<PagePlaceholderProps> = ({
  title,
  description,
  routePath,
  icon: Icon,
  plannedFeatures,
  backLink,
}) => {
  return (
    <div className="space-y-6">
      {backLink && (
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link to={backLink.href}>← {backLink.label}</Link>
          </Button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            {routePath}
          </Badge>
          <Badge variant="warning" className="flex items-center gap-1">
            <Hammer className="h-3 w-3" />
            Phase Foundation
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Planned Capabilities (Upcoming Phase)</CardTitle>
            <CardDescription>
              This screen is configured as part of the routing and environment foundation. The
              visual interface and business workflows will be built in the next development phase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plannedFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-sm p-2.5 rounded-md bg-muted/40"
                >
                  <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Route Info</CardTitle>
            <CardDescription>Architecture metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between py-1.5 border-b text-xs">
              <span className="text-muted-foreground">Path</span>
              <span className="font-mono font-medium">{routePath}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b text-xs">
              <span className="text-muted-foreground">Status</span>
              <span className="text-amber-600 dark:text-amber-400 font-medium">
                Placeholder Ready
              </span>
            </div>
            <div className="flex justify-between py-1.5 text-xs">
              <span className="text-muted-foreground">Backend Target</span>
              <span className="font-mono">SQLite + Prisma</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
