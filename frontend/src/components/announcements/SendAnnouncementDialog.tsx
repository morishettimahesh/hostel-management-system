import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { announcementSchema, type AnnouncementInput } from "@hostel/shared";
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
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useToast } from "@/components/ui/toast";
import { Megaphone, AlertTriangle, CalendarClock } from "lucide-react";

interface SendAnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnnouncementCreated?: (announcement: AnnouncementInput) => void;
  activeStudentCount?: number;
}

export const SendAnnouncementDialog: React.FC<SendAnnouncementDialogProps> = ({
  open,
  onOpenChange,
  onAnnouncementCreated,
  activeStudentCount = 108,
}) => {
  const { toast } = useToast();
  const [showConfirmAll, setShowConfirmAll] = useState(false);
  const [pendingData, setPendingData] = useState<AnnouncementInput | null>(null);
  const [isScheduleMode, setIsScheduleMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AnnouncementInput>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      priority: "NORMAL",
      target: "ALL_STUDENTS",
    },
  });

  const targetRecipient = watch("target");

  const processSubmission = (data: AnnouncementInput) => {
    toast({
      title: isScheduleMode ? "Announcement Scheduled" : "Announcement Broadcast Sent",
      description: isScheduleMode
        ? `Notice will be delivered on ${data.scheduledFor || "selected date"}.`
        : `Sent "${data.title}" to target recipients.`,
      type: "success",
    });

    if (onAnnouncementCreated) onAnnouncementCreated(data);
    reset();
    setShowConfirmAll(false);
    onOpenChange(false);
  };

  const onSubmit = (data: AnnouncementInput) => {
    if (data.target === "ALL_STUDENTS") {
      setPendingData(data);
      setShowConfirmAll(true);
    } else {
      processSubmission(data);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Megaphone className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle>Send Hostel Announcement</DialogTitle>
                <DialogDescription className="text-xs">
                  Broadcast notices, maintenance updates, or emergency hostel alerts.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Announcement Title *</label>
              <Input
                placeholder="e.g. Mess Service Notice / Water Supply Maintenance"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-[11px] text-destructive">{errors.title.message}</p>
              )}
            </div>

            {/* Recipient & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">
                  Recipient Audience *
                </label>
                <Select
                  {...register("target")}
                  options={[
                    { label: "All Active Students", value: "ALL_STUDENTS" },
                    { label: "Selected Students", value: "SELECTED_STUDENTS" },
                    { label: "Individual Student", value: "INDIVIDUAL_STUDENT" },
                  ]}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Priority Level</label>
                <Select
                  {...register("priority")}
                  options={[
                    { label: "Normal Notice", value: "NORMAL" },
                    { label: "High Importance", value: "HIGH" },
                    { label: "Urgent Alert", value: "URGENT" },
                    { label: "Low Priority", value: "LOW" },
                  ]}
                />
              </div>
            </div>

            {/* Content / Message */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">
                Announcement Message *
              </label>
              <textarea
                rows={4}
                placeholder="Write the notice content clearly here..."
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                {...register("content")}
              />
              {errors.content && (
                <p className="text-[11px] text-destructive">{errors.content.message}</p>
              )}
            </div>

            {/* Send Now vs Schedule toggle */}
            <div className="rounded-lg border p-3 bg-muted/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-foreground">Delivery Timing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant={!isScheduleMode ? "default" : "outline"}
                    size="sm"
                    className="h-7 px-2.5 text-xs"
                    onClick={() => setIsScheduleMode(false)}
                  >
                    Send Immediately
                  </Button>
                  <Button
                    type="button"
                    variant={isScheduleMode ? "default" : "outline"}
                    size="sm"
                    className="h-7 px-2.5 text-xs"
                    onClick={() => setIsScheduleMode(true)}
                  >
                    Schedule
                  </Button>
                </div>
              </div>

              {isScheduleMode && (
                <div className="pt-2 border-t mt-2 space-y-1">
                  <label className="text-xs font-medium text-foreground">
                    Schedule Date & Time
                  </label>
                  <Input type="datetime-local" {...register("scheduledFor")} />
                </div>
              )}
            </div>

            {targetRecipient === "ALL_STUDENTS" && (
              <div className="flex items-start gap-2 p-2.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Notice will broadcast to all {activeStudentCount} active residents and registered
                  guardians.
                </span>
              </div>
            )}

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isScheduleMode ? "Schedule Notice" : "Broadcast Announcement"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for All Students */}
      <ConfirmDialog
        open={showConfirmAll}
        onOpenChange={setShowConfirmAll}
        title="Confirm Broad Distribution"
        description={`You are about to send this announcement to ${activeStudentCount} students and their registered parents. Continue?`}
        confirmLabel="Yes, Broadcast Notice"
        cancelLabel="Review Notice"
        onConfirm={() => {
          if (pendingData) {
            processSubmission(pendingData);
          }
        }}
      />
    </>
  );
};
