import React, { useState } from "react";
import { FileSpreadsheet, FileText, Filter } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  MOCK_MONTHLY_COLLECTIONS,
  MOCK_STUDENT_FEE_SUMMARY,
  MOCK_PAYMENTS,
  MOCK_PENDING_FEES,
} from "@/mocks";
import { useToast } from "@/components/ui/toast";

export const ReportsPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const handleExport = (format: "CSV" | "PDF") => {
    toast({
      title: `Report Export Triggered (${format})`,
      description: `Generating ${format} statement for local download. (Development Demo)`,
      type: "success",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial & Operational Reports"
        description="Comprehensive audit summaries, monthly fee collection ledgers, and resident payment reports."
        breadcrumbs={[{ label: "Reports" }]}
        primaryAction={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("CSV")}
              className="gap-1.5 text-xs shadow-sm"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
              <span>Export CSV</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("PDF")}
              className="gap-1.5 text-xs shadow-sm"
            >
              <FileText className="h-4 w-4 text-rose-600" />
              <span>Export PDF</span>
            </Button>
          </div>
        }
      />

      {/* Global Filter Bar */}
      <Card className="shadow-sm border-border/80">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Report Filters</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="w-full sm:w-44">
                <Select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  options={[
                    { label: "All Billing Months", value: "ALL" },
                    { label: "October 2026", value: "October 2026" },
                    { label: "September 2026", value: "September 2026" },
                    { label: "August 2026", value: "August 2026" },
                  ]}
                />
              </div>

              <div className="w-full sm:w-44">
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  options={[
                    { label: "All Statuses", value: "ALL" },
                    { label: "Paid", value: "PAID" },
                    { label: "Partially Paid", value: "PARTIALLY_PAID" },
                    { label: "Pending / Overdue", value: "OVERDUE" },
                  ]}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Layout */}
      <Tabs defaultValue="monthly">
        <TabsList>
          <TabsTrigger value="monthly">Monthly Collection</TabsTrigger>
          <TabsTrigger value="students">Student-wise Fees</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="pending">Pending Fee Report</TabsTrigger>
        </TabsList>

        {/* Tab 1: Monthly Collection Report */}
        <TabsContent value="monthly">
          <Card className="shadow-sm border-border/80">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base font-semibold">Monthly Collection Ledger</CardTitle>
              <CardDescription className="text-xs">
                Aggregate expected dues versus actual collection realized across fiscal months.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Billing Cycle</TableHead>
                    <TableHead>Expected Revenue</TableHead>
                    <TableHead>Total Collected</TableHead>
                    <TableHead>Pending Dues</TableHead>
                    <TableHead>Collection Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_MONTHLY_COLLECTIONS.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold text-foreground">{row.month}</TableCell>
                      <TableCell className="text-xs">
                        ₹{row.expected.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        ₹{row.collected.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                        ₹{row.pending.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-muted text-foreground">
                          {row.collectionRate}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Student-wise Fee Report */}
        <TabsContent value="students">
          <Card className="shadow-sm border-border/80">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base font-semibold">Student-wise Fee Summary</CardTitle>
              <CardDescription className="text-xs">
                Per-resident breakdown of total invoiced academic year fees and current dues.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resident Student</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Total Billed</TableHead>
                    <TableHead>Total Cleared</TableHead>
                    <TableHead>Balance Due</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_STUDENT_FEE_SUMMARY.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold text-foreground">{row.student}</TableCell>
                      <TableCell className="text-xs font-medium">Room {row.room}</TableCell>
                      <TableCell className="text-xs">
                        ₹{row.totalBilled.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        ₹{row.totalPaid.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                        ₹{row.pending.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={row.status} size="sm" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Payment History Report */}
        <TabsContent value="history">
          <Card className="shadow-sm border-border/80">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base font-semibold">Payment History Ledger</CardTitle>
              <CardDescription className="text-xs">
                Detailed transaction audit log with payment method tags and reference numbers.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Billing Month</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Reference / Tx ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PAYMENTS.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-semibold text-foreground">
                        {p.studentName}
                      </TableCell>
                      <TableCell className="text-xs">{p.month}</TableCell>
                      <TableCell className="font-semibold text-foreground">
                        ₹{p.amount.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">
                        {p.paymentMethod}
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">
                        {p.referenceNumber || "—"}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {p.paymentDate}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={p.status} size="sm" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Pending Fee Report */}
        <TabsContent value="pending">
          <Card className="shadow-sm border-border/80">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-base font-semibold">
                Pending Dues & Defaulter List
              </CardTitle>
              <CardDescription className="text-xs">
                Residents with outstanding fee balances and overdue aging analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Outstanding Dues</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PENDING_FEES.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-semibold text-foreground">
                        {row.studentName}
                      </TableCell>
                      <TableCell className="text-xs">Room {row.roomNumber}</TableCell>
                      <TableCell className="text-xs">{row.month}</TableCell>
                      <TableCell className="font-bold text-rose-600 dark:text-rose-400">
                        ₹{row.amountDue.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-xs font-medium text-amber-600">
                        {row.daysOverdue} days
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={row.status} size="sm" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
