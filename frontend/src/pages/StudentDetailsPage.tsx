import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Receipt,
  Heart,
  Building,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { MOCK_STUDENTS, MOCK_PAYMENTS } from "@/mocks";

export const StudentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Lookup student from mock database or default to first student
  const student = MOCK_STUDENTS.find((s) => s.id === id) || MOCK_STUDENTS[0]!;

  // Student's payments
  const studentPayments = MOCK_PAYMENTS.filter(
    (p) =>
      p.studentId === student.id || p.studentName === `${student.firstName} ${student.lastName}`
  );

  // Fee calculation metrics
  const totalBilled = 18000;
  const totalPaid = studentPayments.reduce((acc, curr) => acc + curr.amount, 0);
  const balanceDue = Math.max(0, totalBilled - totalPaid);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={`${student.firstName} ${student.lastName}`}
        description={`Admission No: ${student.admissionNumber} • Room: ${student.roomNumber}`}
        breadcrumbs={[
          { label: "Students", href: "/students" },
          { label: `${student.firstName} ${student.lastName}` },
        ]}
        primaryAction={
          <div className="flex items-center gap-2">
            <Button size="sm" asChild className="gap-1.5 shadow-sm">
              <Link to={`/payments?studentId=${student.id}`}>
                <Receipt className="h-4 w-4" />
                <span>Record Payment</span>
              </Link>
            </Button>
          </div>
        }
      />

      {/* Top Profile Summary Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xl">
            {student.firstName[0]}
            {student.lastName[0]}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {student.firstName} {student.lastName}
              </h2>
              <StatusBadge status={student.status} size="sm" />
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="font-mono">{student.admissionNumber}</span>
              <span>•</span>
              <span>{student.college}</span>
              <span>•</span>
              <span className="font-semibold text-foreground">
                Room {student.roomNumber} ({student.floor || "1st Floor"})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0">
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
            <Link to="/students">← Back to List</Link>
          </Button>
        </div>
      </div>

      {/* 4 Cards Grid: Personal Info, Parent Info, Fee Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Personal Information */}
        <Card className="shadow-sm border-border/80">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-semibold">Personal Information</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Resident identification & education
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-2 space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Full Name</span>
              <span className="font-medium text-foreground">
                {student.firstName} {student.lastName}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Admission No</span>
              <span className="font-mono font-medium text-foreground">
                {student.admissionNumber}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Contact Phone</span>
              <span className="font-medium text-foreground flex items-center gap-1">
                <Phone className="h-3 w-3 text-muted-foreground" />
                {student.phone}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Email Address</span>
              <span className="font-medium text-foreground flex items-center gap-1">
                <Mail className="h-3 w-3 text-muted-foreground" />
                {student.email}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">College</span>
              <span className="font-medium text-foreground text-right">{student.college}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Course</span>
              <span className="font-medium text-foreground text-right">{student.course}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Blood Group</span>
              <span className="font-medium text-foreground flex items-center gap-1">
                <Heart className="h-3 w-3 text-rose-500" />
                {student.bloodGroup || "O+"}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Joining Date</span>
              <span className="font-medium text-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                {student.joiningDate}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Parent / Guardian Information */}
        <Card className="shadow-sm border-border/80">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-semibold">Guardian Information</CardTitle>
            </div>
            <CardDescription className="text-xs">Emergency contacts and relation</CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-2 space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Guardian Name</span>
              <span className="font-medium text-foreground">{student.guardianName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Relationship</span>
              <span className="font-medium text-foreground">
                {student.guardianRelation || "Father"}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Primary Contact</span>
              <span className="font-medium text-foreground flex items-center gap-1">
                <Phone className="h-3 w-3 text-muted-foreground" />
                {student.guardianPhone}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Guardian Email</span>
              <span className="font-medium text-foreground flex items-center gap-1">
                <Mail className="h-3 w-3 text-muted-foreground" />
                {student.guardianEmail || "parent@example.com"}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 border border-dashed text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Emergency Protocol</p>
              <p>
                In case of medical emergencies or unauthorized hostel absence, the warden office
                immediately contacts {student.guardianName} at {student.guardianPhone}.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Fee Summary */}
        <Card className="shadow-sm border-border/80 md:col-span-2 lg:col-span-1">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-semibold">Fee Ledger Summary</CardTitle>
            </div>
            <CardDescription className="text-xs">Billed fees vs total collected</CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-2 space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Total Invoiced (Academic Year)</span>
              <span className="font-semibold text-foreground">
                ₹{totalBilled.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Total Collected</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                ₹{totalPaid.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Current Balance Due</span>
              <span
                className={`font-bold ${
                  balanceDue > 0
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                ₹{balanceDue.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Account Status</span>
              {balanceDue === 0 ? (
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Dues Cleared</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Pending Payment</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Button size="sm" asChild className="w-full gap-1.5">
                <Link to={`/payments?studentId=${student.id}`}>
                  <Receipt className="h-3.5 w-3.5" />
                  Record New Fee Transaction
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History Table */}
      <Card className="shadow-sm border-border/80">
        <CardHeader className="p-5 pb-3">
          <CardTitle className="text-base font-semibold">Payment History</CardTitle>
          <CardDescription className="text-xs">
            Recorded receipts and fee installments for this student.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {studentPayments.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">
              No payment transactions recorded for this resident yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt / Ref ID</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentPayments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs text-foreground font-semibold">
                      {p.referenceNumber || p.id}
                    </TableCell>
                    <TableCell className="text-xs">{p.month}</TableCell>
                    <TableCell className="font-semibold text-foreground">
                      ₹{p.amount.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground">
                      {p.paymentMethod}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{p.paymentDate}</TableCell>
                    <TableCell>
                      <StatusBadge status={p.status} size="sm" />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                      {p.notes || "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
