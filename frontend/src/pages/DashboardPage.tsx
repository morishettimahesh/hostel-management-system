import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  TrendingUp,
  CreditCard,
  AlertCircle,
  Clock,
  UserPlus,
  Receipt,
  Megaphone,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  MOCK_DASHBOARD_METRICS,
  MOCK_PAYMENTS,
  MOCK_PENDING_FEES,
  MOCK_RECENT_REGISTRATIONS,
} from "@/mocks";

export const DashboardPage: React.FC = () => {
  const metrics = MOCK_DASHBOARD_METRICS;
  const recentPayments = MOCK_PAYMENTS.slice(0, 5);
  const pendingFeesList = MOCK_PENDING_FEES.slice(0, 4);
  const recentRegistrations = MOCK_RECENT_REGISTRATIONS.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* 1. Page Header with Quick Action Buttons */}
      <PageHeader
        title="Dashboard"
        description="Overview of hostel residents, monthly fee collection, and administrative operations."
        primaryAction={
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" asChild className="gap-1.5 shadow-sm">
              <Link to="/students">
                <UserPlus className="h-4 w-4" />
                <span>Add Student</span>
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild className="gap-1.5">
              <Link to="/payments">
                <Receipt className="h-4 w-4" />
                <span>Record Payment</span>
              </Link>
            </Button>
            <Button size="sm" variant="secondary" asChild className="gap-1.5">
              <Link to="/announcements">
                <Megaphone className="h-4 w-4" />
                <span>Send Announcement</span>
              </Link>
            </Button>
          </div>
        }
      />

      {/* 2. Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Students */}
        <Card className="shadow-sm border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total Students
            </CardTitle>
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="text-2xl font-bold text-foreground">{metrics.totalStudents}</div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Capacity: 120 beds ({metrics.occupancyRatePercentage}% occupancy)
            </p>
          </CardContent>
        </Card>

        {/* Active Students */}
        <Card className="shadow-sm border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Active Students
            </CardTitle>
            <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <UserCheck className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="text-2xl font-bold text-foreground">{metrics.activeStudents}</div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">
              Currently staying in rooms
            </p>
          </CardContent>
        </Card>

        {/* Expected Fees */}
        <Card className="shadow-sm border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Expected Fees ({metrics.monthName.split(" ")[0]})
            </CardTitle>
            <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="text-2xl font-bold text-foreground">
              ₹{metrics.expectedFees.toLocaleString("en-IN")}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Based on active room rents</p>
          </CardContent>
        </Card>

        {/* Collected This Month */}
        <Card className="shadow-sm border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Collected This Month
            </CardTitle>
            <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CreditCard className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="text-2xl font-bold text-foreground">
              ₹{metrics.collectedThisMonth.toLocaleString("en-IN")}
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">
              81.2% collection rate
            </p>
          </CardContent>
        </Card>

        {/* Pending Fees */}
        <Card className="shadow-sm border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Pending Fees
            </CardTitle>
            <div className="p-1.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <AlertCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
              ₹{metrics.pendingFees.toLocaleString("en-IN")}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Due for current & prior cycles
            </p>
          </CardContent>
        </Card>

        {/* Students With Pending Fees */}
        <Card className="shadow-sm border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Students With Dues
            </CardTitle>
            <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {metrics.studentsWithPendingFees}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">Requires follow-up / notices</p>
          </CardContent>
        </Card>
      </div>

      {/* 3 & 4: Two-column Section: Recent Payments & Students with Pending Fees */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Payments Table (2 cols) */}
        <Card className="lg:col-span-2 shadow-sm border-border/80">
          <CardHeader className="flex flex-row items-center justify-between p-5 pb-3">
            <div>
              <CardTitle className="text-base font-semibold">Recent Payments</CardTitle>
              <CardDescription className="text-xs">
                Latest verified fee transactions recorded by the warden office.
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-xs gap-1">
              <Link to="/payments">
                View All Payments
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Method</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="font-medium text-foreground">{p.studentName}</div>
                      <div className="text-[11px] text-muted-foreground">Room {p.roomNumber}</div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {p.month}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground whitespace-nowrap">
                      ₹{p.amount.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs">
                      <span className="font-mono text-muted-foreground">{p.paymentMethod}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground whitespace-nowrap">
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

        {/* Students With Pending Fees (1 col) */}
        <Card className="shadow-sm border-border/80 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between p-5 pb-3">
            <div>
              <CardTitle className="text-base font-semibold">Pending Dues</CardTitle>
              <CardDescription className="text-xs">Residents with overdue balances</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-xs gap-1">
              <Link to="/pending-fees">
                View All
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <div className="divide-y divide-border">
              {pendingFeesList.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 flex items-center justify-between hover:bg-muted/40 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm text-foreground">{item.studentName}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span>Room {item.roomNumber}</span>
                      <span>•</span>
                      <span className="text-rose-600 dark:text-rose-400 font-semibold">
                        ₹{item.amountDue.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={item.status} size="sm" />
                    <Button variant="outline" size="sm" asChild className="h-7 px-2 text-xs">
                      <Link to={`/students/${item.studentId}`}>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Recent Student Registrations */}
      <Card className="shadow-sm border-border/80">
        <CardHeader className="flex flex-row items-center justify-between p-5 pb-3">
          <div>
            <CardTitle className="text-base font-semibold">Recent Student Registrations</CardTitle>
            <CardDescription className="text-xs">
              Newly onboarded hostel residents and room allocation records.
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-xs gap-1">
            <Link to="/students">
              All Students Directory
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="hidden sm:table-cell">Admission No</TableHead>
                <TableHead className="hidden md:table-cell">College / Institution</TableHead>
                <TableHead>Room</TableHead>
                <TableHead className="hidden sm:table-cell">Date Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentRegistrations.map((st) => (
                <TableRow key={st.id}>
                  <TableCell className="font-medium text-foreground">
                    <Link
                      to={`/students/${st.id}`}
                      className="hover:text-primary transition-colors hover:underline"
                    >
                      {st.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell font-mono text-xs text-muted-foreground">
                    {st.admissionNumber}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                    {st.college}
                  </TableCell>
                  <TableCell className="text-xs font-semibold">
                    <span className="px-2 py-0.5 rounded bg-muted text-foreground">{st.room}</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                    {st.dateJoined}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={st.status} size="sm" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-xs">
                      <Link to={`/students/${st.id}`}>View Profile</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
