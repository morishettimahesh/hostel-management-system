import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, type StudentInput } from "@hostel/shared";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { UserPlus } from "lucide-react";

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStudentAdded?: (newStudent: StudentInput) => void;
}

export const AddStudentDialog: React.FC<AddStudentDialogProps> = ({
  open,
  onOpenChange,
  onStudentAdded,
}) => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentInput>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      status: "ACTIVE",
      roomNumber: "",
      admissionNumber: `ADM-2024-${Math.floor(100 + Math.random() * 900)}`,
      joiningDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: StudentInput) => {
    toast({
      title: "Student Registered (Dev Mock)",
      description: `Successfully added ${data.firstName} ${data.lastName} to Room ${data.roomNumber}.`,
      type: "success",
    });
    if (onStudentAdded) onStudentAdded(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle>Register New Resident</DialogTitle>
              <DialogDescription className="text-xs">
                Add a new student profile and room allocation to the hostel register.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Row 1: Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">First Name *</label>
              <Input placeholder="e.g. Rahul" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-[11px] text-destructive">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Last Name *</label>
              <Input placeholder="e.g. Sharma" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-[11px] text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Row 2: Admission & Room */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Admission No. *</label>
              <Input placeholder="ADM-2024-xxx" {...register("admissionNumber")} />
              {errors.admissionNumber && (
                <p className="text-[11px] text-destructive">{errors.admissionNumber.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Allocated Room *</label>
              <Input placeholder="e.g. 104-B" {...register("roomNumber")} />
              {errors.roomNumber && (
                <p className="text-[11px] text-destructive">{errors.roomNumber.message}</p>
              )}
            </div>
          </div>

          {/* Row 3: Contact & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Phone Number *</label>
              <Input placeholder="+91 98765 00000" {...register("phone")} />
              {errors.phone && (
                <p className="text-[11px] text-destructive">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Email Address *</label>
              <Input type="email" placeholder="student@example.com" {...register("email")} />
              {errors.email && (
                <p className="text-[11px] text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Row 4: College & Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                College / Institution *
              </label>
              <Input placeholder="Institute of Technology" {...register("college")} />
              {errors.college && (
                <p className="text-[11px] text-destructive">{errors.college.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Course / Year</label>
              <Input placeholder="B.Tech CS (2nd Yr)" {...register("course")} />
            </div>
          </div>

          {/* Row 5: Guardian Details */}
          <div className="border-t pt-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Parent / Guardian Contact
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Guardian Name *</label>
                <Input placeholder="Parent / Guardian Name" {...register("guardianName")} />
                {errors.guardianName && (
                  <p className="text-[11px] text-destructive">{errors.guardianName.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Guardian Phone *</label>
                <Input placeholder="+91 98111 00000" {...register("guardianPhone")} />
                {errors.guardianPhone && (
                  <p className="text-[11px] text-destructive">{errors.guardianPhone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Row 6: Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Status</label>
              <Select
                {...register("status")}
                options={[
                  { label: "Active Resident", value: "ACTIVE" },
                  { label: "Inactive", value: "INACTIVE" },
                  { label: "Left Hostel", value: "LEFT_HOSTEL" },
                ]}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Joining Date</label>
              <Input type="date" {...register("joiningDate")} />
            </div>
          </div>

          <DialogFooter className="pt-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Register Student
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
