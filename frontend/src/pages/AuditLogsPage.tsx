import React, { useState, useMemo } from "react";
import { ShieldCheck, Search } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { MOCK_AUDIT_LOGS } from "@/mocks";

export const AuditLogsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  const filteredLogs = useMemo(() => {
    return MOCK_AUDIT_LOGS.filter((log) => {
      const matchesSearch =
        searchQuery === "" ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.record.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "ALL" || log.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLogs.slice(start, start + pageSize);
  }, [filteredLogs, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredLogs.length / pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Trail & Security Logs"
        description="Immutable operational activity logs, administrative changes, and security events."
        breadcrumbs={[{ label: "Audit Logs" }]}
      />

      {/* Filter and Search Bar */}
      <Card className="shadow-sm border-border/80">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search action, warden, record..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 h-9"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline">
                Status:
              </span>
              <div className="w-full sm:w-44">
                <Select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  options={[
                    { label: "All Audit Statuses", value: "ALL" },
                    { label: "Success", value: "SUCCESS" },
                    { label: "Warning", value: "WARNING" },
                    { label: "Failed", value: "FAILED" },
                  ]}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card className="shadow-sm border-border/80">
        <CardContent className="p-0">
          {paginatedLogs.length === 0 ? (
            <EmptyState
              title="No audit entries found"
              description="No recorded system events match your search query."
              actionLabel="Clear Filter"
              onAction={() => {
                setSearchQuery("");
                setStatusFilter("ALL");
              }}
            />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User / Role</TableHead>
                    <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                    <TableHead>Record Affected</TableHead>
                    <TableHead className="hidden lg:table-cell">IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                          <span>{log.action}</span>
                        </div>
                      </TableCell>

                      <TableCell className="text-xs">
                        <div className="font-medium text-foreground">{log.userName}</div>
                        <div className="text-[10px] text-muted-foreground">Warden Console</div>
                      </TableCell>

                      <TableCell className="hidden md:table-cell text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </TableCell>

                      <TableCell className="text-xs text-muted-foreground max-w-sm">
                        <span className="font-medium text-foreground">{log.record}</span>
                      </TableCell>

                      <TableCell className="hidden lg:table-cell text-xs font-mono text-muted-foreground">
                        {log.ipAddress || "127.0.0.1"}
                      </TableCell>

                      <TableCell>
                        <StatusBadge status={log.status} size="sm" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="border-t px-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredLogs.length}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
