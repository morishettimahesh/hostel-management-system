import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, type PaymentInput, PaymentMethod } from "@hostel/shared";
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
import { Receipt } from "lucide-react";
import { MOCK_STUDENTS } from "@/mocks";

interface RecordPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultStudentId?: string;
  onPaymentRecorded?: (payment: PaymentInput) => void;
}

export const RecordPaymentDialog: React.FC<RecordPaymentDialogProps> = ({
  open,
  onOpenChange,
  defaultStudentId,
  onPaymentRecorded,
}) => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PaymentInput>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      studentId: defaultStudentId || MOCK_STUDENTS[0]?.id || "",
      month: "October 2026",
      amount: 6000,
      paymentMethod: "UPI" as PaymentMethod,
      paymentDate: new Date().toISOString().split("T")[0],
      referenceNumber: `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      notes: "Monthly hostel rent & mess fee",
    },
  });

  const onSubmit = (data: PaymentInput) => {
    const student = MOCK_STUDENTS.find((s) => s.id === data.studentId);
    const studentName = student ? `${student.firstName} ${student.lastName}` : "Resident";

    toast({
      title: "Payment Recorded (Dev Mock)",
      description: `Successfully logged ₹${data.amount.toLocaleString("en-IN")} for ${studentName} (${data.month}).`,
      type: "success",
    });

    if (onPaymentRecorded) onPaymentRecorded(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle>Record Payment Transaction</DialogTitle>
              <DialogDescription className="text-xs">
                Log fee collection, receipts, and electronic payment records.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 pt-2">
          {/* Student Select */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Select Resident Student *
            </label>
            <Select
              {...register("studentId")}
              options={MOCK_STUDENTS.map((s) => ({
                label: `${s.firstName} ${s.lastName} (Room ${s.roomNumber} • ${s.admissionNumber})`,
                value: s.id,
              }))}
            />
            {errors.studentId && (
              <p className="text-[11px] text-destructive">{errors.studentId.message}</p>
            )}
          </div>

          {/* Month & Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Billing Month *</label>
              <Select
                {...register("month")}
                options={[
                  { label: "October 2026", value: "October 2026" },
                  { label: "September 2026", value: "September 2026" },
                  { label: "August 2026", value: "August 2026" },
                  { label: "November 2026 (Advance)", value: "November 2026" },
                ]}
              />
              {errors.month && (
                <p className="text-[11px] text-destructive">{errors.month.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Amount (₹) *</label>
              <Input type="number" step="100" placeholder="6000" {...register("amount")} />
              {errors.amount && (
                <p className="text-[11px] text-destructive">{errors.amount.message}</p>
              )}
            </div>
          </div>

          {/* Payment Method & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Payment Method *</label>
              <Select
                {...register("paymentMethod")}
                options={[
                  { label: "UPI (GPay / PhonePe / Paytm)", value: "UPI" },
                  { label: "Cash (Office counter)", value: "CASH" },
                  { label: "Bank Transfer (NEFT/IMPS)", value: "BANK_TRANSFER" },
                  { label: "Debit/Credit Card", value: "CARD" },
                  { label: "Other", value: "OTHER" },
                ]}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Payment Date *</label>
              <Input type="date" {...register("paymentDate")} />
              {errors.paymentDate && (
                <p className="text-[11px] text-destructive">{errors.paymentDate.message}</p>
              )}
            </div>
          </div>

          {/* Transaction ID */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Transaction ID / Reference Number
            </label>
            <Input
              placeholder="e.g. UPI-123456789 or Receipt No."
              {...register("referenceNumber")}
            />
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">Warden Notes</label>
            <Input placeholder="Optional remark or memo" {...register("notes")} />
          </div>

          <DialogFooter className="pt-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Record Transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
