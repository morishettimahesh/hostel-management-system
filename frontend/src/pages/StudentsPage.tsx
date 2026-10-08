import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlus,
  Search,
  MoreVertical,
  Eye,
  Receipt,
  Phone,
  Mail,
  GraduationCap,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddStudentDialog } from "@/components/students/AddStudentDialog";
import { MOCK_STUDENTS } from "@/mocks";
import { Student } from "@hostel/shared";

export const StudentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const pageSize = 6;

  // Filter logic
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        searchQuery === "" ||
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.college && s.college.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [students, searchQuery, statusFilter]);

  // Pagination slice
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredStudents.length / pageSize);

  const handleStudentAdded = (data: Partial<Student>) => {
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      admissionNumber: data.admissionNumber || `ADM-2024-${Math.floor(Math.random() * 900)}`,
      firstName: data.firstName || "New",
      lastName: data.lastName || "Student",
      email: data.email || "",
      phone: data.phone || "",
      roomNumber: data.roomNumber || "TBD",
      college: data.college || "General College",
      course: data.course || "Degree",
      status: data.status || "ACTIVE",
      joiningDate: data.joiningDate ?? new Date().toISOString().split("T")[0]!,
      guardianName: data.guardianName || "Guardian",
      guardianPhone: data.guardianPhone || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setStudents((prev) => [newStudent, ...prev]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students Directory"
        description="Comprehensive register of hostel residents, room allocations, and student profiles."
        breadcrumbs={[{ label: "Students" }]}
        primaryAction={
          <Button size="sm" onClick={() => setIsAddModalOpen(true)} className="gap-1.5 shadow-sm">
            <UserPlus className="h-4 w-4" />
            <span>Add Student</span>
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <Card className="shadow-sm border-border/80">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, room, admission no..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 h-9"
              />
            </div>

            {/* Status Filter */}
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
                    { label: "All Residents", value: "ALL" },
                    { label: "Active", value: "ACTIVE" },
                    { label: "Inactive", value: "INACTIVE" },
                    { label: "Left Hostel", value: "LEFT_HOSTEL" },
                  ]}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Data Table */}
      <Card className="shadow-sm border-border/80">
        <CardContent className="p-0">
          {paginatedStudents.length === 0 ? (
            <EmptyState
              title="No students found"
              description="No resident records matched your search query or filter criteria."
              actionLabel="Clear Filters"
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
                    <TableHead>Student Name</TableHead>
                    <TableHead>Admission No</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead className="hidden md:table-cell">College & Course</TableHead>
                    <TableHead className="hidden lg:table-cell">Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStudents.map((st) => (
                    <TableRow key={st.id}>
                      {/* Name */}
                      <TableCell>
                        <div className="font-semibold text-foreground">
                          <Link
                            to={`/students/${st.id}`}
                            className="hover:text-primary transition-colors hover:underline"
                          >
                            {st.firstName} {st.lastName}
                          </Link>
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 md:hidden">
                          <span>{st.admissionNumber}</span>
                          <span>•</span>
                          <span>Room {st.roomNumber}</span>
                        </div>
                      </TableCell>

                      {/* Admission */}
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {st.admissionNumber}
                      </TableCell>

                      {/* Room */}
                      <TableCell>
                        <span className="font-semibold text-xs px-2 py-0.5 rounded bg-muted text-foreground">
                          {st.roomNumber}
                        </span>
                      </TableCell>

                      {/* College & Course */}
                      <TableCell className="hidden md:table-cell">
                        <div className="text-xs font-medium text-foreground flex items-center gap-1">
                          <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{st.college}</span>
                        </div>
                        {st.course && (
                          <div className="text-[11px] text-muted-foreground">{st.course}</div>
                        )}
                      </TableCell>

                      {/* Contact */}
                      <TableCell className="hidden lg:table-cell text-xs">
                        <div className="text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{st.phone}</span>
                        </div>
                        <div className="text-muted-foreground text-[11px] flex items-center gap-1 mt-0.5">
                          <Mail className="h-3 w-3" />
                          <span className="truncate max-w-[140px]">{st.email}</span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <StatusBadge status={st.status} size="sm" />
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem asChild>
                              <Link
                                to={`/students/${st.id}`}
                                className="flex items-center gap-2 cursor-pointer text-xs"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span>View Full Profile</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => navigate(`/payments?studentId=${st.id}`)}
                              className="flex items-center gap-2 cursor-pointer text-xs"
                            >
                              <Receipt className="h-3.5 w-3.5" />
                              <span>Record Payment</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="border-t px-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredStudents.length}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Add Student Modal */}
      <AddStudentDialog
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onStudentAdded={handleStudentAdded}
      />
    </div>
  );
};
