import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Search, Bell, ArrowUpRight, Receipt, Clock, Send, Phone } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
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
import { MOCK_PENDING_FEES } from "@/mocks";
import { useToast } from "@/components/ui/toast";

export const PendingFeesPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  const filteredItems = useMemo(() => {
    return MOCK_PENDING_FEES.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMonth = monthFilter === "ALL" || item.month === monthFilter;
      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;

      return matchesSearch && matchesMonth && matchesStatus;
    });
  }, [searchQuery, monthFilter, statusFilter]);

  const totalPendingAmount = useMemo(() => {
    return filteredItems.reduce((acc, curr) => acc + curr.amountDue, 0);
  }, [filteredItems]);

  const overdueCount = useMemo(() => {
    return filteredItems.filter((i) => i.status === "OVERDUE").length;
  }, [filteredItems]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredItems.length / pageSize);

  const handleSendBatchReminders = () => {
    toast({
      title: "Fee Reminders Triggered (Dev Mock)",
      description: `SMS/WhatsApp payment reminders dispatched to ${filteredItems.length} student guardians.`,
      type: "success",
    });
  };

  const handleSendSingleReminder = (studentName: string) => {
    toast({
      title: "Reminder Sent (Dev Mock)",
      description: `Notice sent to guardian of ${studentName}.`,
      type: "info",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pending & Overdue Fees"
        description="Monitor outstanding monthly fee balances, track overdue accounts, and follow up with residents."
        breadcrumbs={[{ label: "Pending Fees" }]}
        primaryAction={
          <Button
            size="sm"
            onClick={handleSendBatchReminders}
            className="gap-1.5 shadow-sm bg-amber-600 hover:bg-amber-700"
          >
            <Send className="h-4 w-4" />
            <span>Send Batch Reminders</span>
          </Button>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Pending Dues */}
        <Card className="shadow-sm border-border/80">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Outstanding Dues</p>
              <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                ₹{totalPendingAmount.toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Current active balance</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <AlertCircle className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        {/* Total Accounts with Dues */}
        <Card className="shadow-sm border-border/80">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Accounts With Pending</p>
              <p className="text-2xl font-bold text-foreground mt-0.5">
                {filteredItems.length} Residents
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Requires follow-up by warden
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        {/* Critical Overdue */}
        <Card className="shadow-sm border-border/80">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Critical Overdue</p>
              <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                {overdueCount} Records
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Past grace period (&gt; 5 days)
              </p>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Bell className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="shadow-sm border-border/80">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search student, room, admission no..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 h-9"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="w-full sm:w-40">
                <Select
                  value={monthFilter}
                  onChange={(e) => {
                    setMonthFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  options={[
                    { label: "All Months", value: "ALL" },
                    { label: "October 2026", value: "October 2026" },
                    { label: "September 2026", value: "September 2026" },
                  ]}
                />
              </div>

              <div className="w-full sm:w-40">
                <Select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  options={[
                    { label: "All Statuses", value: "ALL" },
                    { label: "Overdue", value: "OVERDUE" },
                    { label: "Partially Paid", value: "PARTIALLY_PAID" },
                    { label: "Pending", value: "PENDING" },
                  ]}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Fees Table */}
      <Card className="shadow-sm border-border/80">
        <CardContent className="p-0">
          {paginatedItems.length === 0 ? (
            <EmptyState
              title="No pending fee records"
              description="All students have cleared their monthly dues or no records match your criteria."
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchQuery("");
                setMonthFilter("ALL");
                setStatusFilter("ALL");
              }}
            />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Billing Month</TableHead>
                    <TableHead>Amount Pending</TableHead>
                    <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                    <TableHead className="hidden md:table-cell">Overdue By</TableHead>
                    <TableHead className="hidden lg:table-cell">Guardian Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-semibold text-foreground">
                          <Link
                            to={`/students/${item.studentId}`}
                            className="hover:text-primary transition-colors hover:underline"
                          >
                            {item.studentName}
                          </Link>
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1 sm:hidden">
                          <span>Room {item.roomNumber}</span>
                          <span>•</span>
                          <span className="font-mono">{item.admissionNumber}</span>
                        </div>
                      </TableCell>

                      <TableCell className="text-xs whitespace-nowrap">{item.month}</TableCell>

                      <TableCell className="whitespace-nowrap font-bold text-rose-600 dark:text-rose-400">
                        ₹{item.amountDue.toLocaleString("en-IN")}
                      </TableCell>

                      <TableCell className="hidden sm:table-cell text-xs text-muted-foreground whitespace-nowrap">
                        {item.dueDate}
                      </TableCell>

                      <TableCell className="hidden md:table-cell text-xs">
                        <span
                          className={`font-medium ${
                            item.daysOverdue > 10 ? "text-rose-600" : "text-amber-600"
                          }`}
                        >
                          {item.daysOverdue} days
                        </span>
                      </TableCell>

                      <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{item.guardianPhone}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <StatusBadge status={item.status} size="sm" />
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendSingleReminder(item.studentName)}
                            className="h-7 px-2 text-xs hidden sm:flex items-center gap-1"
                            title="Send notice to guardian"
                          >
                            <Send className="h-3 w-3" />
                            <span>Remind</span>
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => navigate(`/payments?studentId=${item.studentId}`)}
                            className="h-7 px-2 text-xs gap-1 bg-emerald-600 hover:bg-emerald-700"
                          >
                            <Receipt className="h-3 w-3" />
                            <span>Collect</span>
                          </Button>
                          <Button variant="ghost" size="sm" asChild className="h-7 px-1.5 text-xs">
                            <Link to={`/students/${item.studentId}`} title="View Student Profile">
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="border-t px-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredItems.length}
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
