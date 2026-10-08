import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CreditCard, Search, Receipt, FileText, Building, CheckCircle2 } from "lucide-react";
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
import { RecordPaymentDialog } from "@/components/payments/RecordPaymentDialog";
import { MOCK_PAYMENTS, MOCK_STUDENTS } from "@/mocks";
import { PaymentTransaction, type PaymentInput } from "@hostel/shared";
import { useToast } from "@/components/ui/toast";

export const PaymentsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlStudentId = searchParams.get("studentId");
  const { toast } = useToast();

  const [payments, setPayments] = useState<PaymentTransaction[]>(MOCK_PAYMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // If redirected with ?studentId=, open modal automatically
  useEffect(() => {
    if (urlStudentId) {
      setIsRecordModalOpen(true);
    }
  }, [urlStudentId]);

  const pageSize = 6;

  // Filter payments
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.referenceNumber &&
          p.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.month.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMethod = methodFilter === "ALL" || p.paymentMethod === methodFilter;
      const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;

      return matchesSearch && matchesMethod && matchesStatus;
    });
  }, [payments, searchQuery, methodFilter, statusFilter]);

  // Paginate
  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPayments.slice(start, start + pageSize);
  }, [filteredPayments, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredPayments.length / pageSize);

  const totalCollected = useMemo(() => {
    return payments.reduce((acc, curr) => acc + curr.amount, 0);
  }, [payments]);

  const handlePaymentRecorded = (data: PaymentInput) => {
    const student = MOCK_STUDENTS.find((s) => s.id === data.studentId);
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      studentId: data.studentId,
      studentName: student ? `${student.firstName} ${student.lastName}` : "Resident",
      admissionNumber: student?.admissionNumber || "ADM-2024-xxx",
      roomNumber: student?.roomNumber || "TBD",
      month: data.month,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      referenceNumber: data.referenceNumber || `REF-${Math.floor(Math.random() * 90000)}`,
      paymentDate: data.paymentDate,
      notes: data.notes,
      status: "PAID",
      recordedByUserId: "usr-warden-01",
      recordedByName: "Warden K. Sharma",
      createdAt: new Date().toISOString(),
    };
    setPayments((prev) => [newTx, ...prev]);
  };

  const handlePrintReceipt = (tx: PaymentTransaction) => {
    toast({
      title: "Receipt Prepared (Dev Mock)",
      description: `Generated printable receipt for ${tx.referenceNumber || tx.id} (${tx.studentName}).`,
      type: "info",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fee Payments & Transactions"
        description="Record fee receipts, verify payment references, and track residential collection ledgers."
        breadcrumbs={[{ label: "Payments" }]}
        primaryAction={
          <Button
            size="sm"
            onClick={() => setIsRecordModalOpen(true)}
            className="gap-1.5 shadow-sm bg-emerald-600 hover:bg-emerald-700"
          >
            <Receipt className="h-4 w-4" />
            <span>Record Payment</span>
          </Button>
        }
      />

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-sm border-border/80">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Recorded</p>
              <p className="text-2xl font-bold text-foreground mt-0.5">
                ₹{totalCollected.toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                {payments.length} verified transactions
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/80">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Online (UPI / Bank)</p>
              <p className="text-2xl font-bold text-foreground mt-0.5">
                ₹
                {payments
                  .filter((p) => p.paymentMethod === "UPI" || p.paymentMethod === "BANK_TRANSFER")
                  .reduce((a, b) => a + b.amount, 0)
                  .toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Instant digital settlements
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <CreditCard className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/80">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Cash Collections</p>
              <p className="text-2xl font-bold text-foreground mt-0.5">
                ₹
                {payments
                  .filter((p) => p.paymentMethod === "CASH")
                  .reduce((a, b) => a + b.amount, 0)
                  .toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Office counter receipts</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Building className="h-6 w-6" />
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
                placeholder="Search student, room, ref no..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 h-9"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="w-full sm:w-36">
                <Select
                  value={methodFilter}
                  onChange={(e) => {
                    setMethodFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  options={[
                    { label: "All Methods", value: "ALL" },
                    { label: "UPI", value: "UPI" },
                    { label: "Bank Transfer", value: "BANK_TRANSFER" },
                    { label: "Cash", value: "CASH" },
                    { label: "Card", value: "CARD" },
                  ]}
                />
              </div>

              <div className="w-full sm:w-36">
                <Select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  options={[
                    { label: "All Statuses", value: "ALL" },
                    { label: "Paid", value: "PAID" },
                    { label: "Partially Paid", value: "PARTIALLY_PAID" },
                  ]}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card className="shadow-sm border-border/80">
        <CardContent className="p-0">
          {paginatedPayments.length === 0 ? (
            <EmptyState
              title="No payment records found"
              description="No transactions match your search filter criteria."
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchQuery("");
                setMethodFilter("ALL");
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
                    <TableHead>Amount</TableHead>
                    <TableHead className="hidden sm:table-cell">Method</TableHead>
                    <TableHead className="hidden md:table-cell">Reference No.</TableHead>
                    <TableHead className="hidden lg:table-cell">Payment Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPayments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="font-semibold text-foreground">{p.studentName}</div>
                        <div className="text-[11px] text-muted-foreground">Room {p.roomNumber}</div>
                      </TableCell>
                      <TableCell className="text-xs whitespace-nowrap">{p.month}</TableCell>
                      <TableCell className="font-semibold text-foreground whitespace-nowrap">
                        ₹{p.amount.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-xs font-mono text-muted-foreground">
                        {p.paymentMethod}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-xs font-mono text-muted-foreground">
                        {p.referenceNumber || "—"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-xs text-muted-foreground whitespace-nowrap">
                        {p.paymentDate}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={p.status} size="sm" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePrintReceipt(p)}
                          className="h-7 px-2 text-xs gap-1"
                        >
                          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="hidden sm:inline">Receipt</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="border-t px-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredPayments.length}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Record Payment Dialog */}
      <RecordPaymentDialog
        open={isRecordModalOpen}
        onOpenChange={setIsRecordModalOpen}
        defaultStudentId={urlStudentId || undefined}
        onPaymentRecorded={handlePaymentRecorded}
      />
    </div>
  );
};
