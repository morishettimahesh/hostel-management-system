import React, { useState, useMemo } from "react";
import { Megaphone, Search, Users, User, ShieldAlert, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/EmptyState";
import { SendAnnouncementDialog } from "@/components/announcements/SendAnnouncementDialog";
import { MOCK_ANNOUNCEMENTS } from "@/mocks";
import { Announcement, type AnnouncementInput } from "@hostel/shared";

export const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((a) => {
      const matchesSearch =
        searchQuery === "" ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority = priorityFilter === "ALL" || a.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [announcements, searchQuery, priorityFilter]);

  const handleAnnouncementCreated = (data: AnnouncementInput) => {
    const newAnc: Announcement = {
      id: `anc-${Date.now()}`,
      title: data.title,
      content: data.content,
      priority: data.priority,
      target: data.target,
      targetCount: data.target === "ALL_STUDENTS" ? 108 : 15,
      scheduledFor: data.scheduledFor,
      authorId: "usr-warden-01",
      authorName: "Chief Warden K. Sharma",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAnnouncements((prev) => [newAnc, ...prev]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hostel Announcements & Notices"
        description="Broadcast administrative updates, maintenance advisories, and emergency alerts to residents."
        breadcrumbs={[{ label: "Announcements" }]}
        primaryAction={
          <Button size="sm" onClick={() => setIsSendModalOpen(true)} className="gap-1.5 shadow-sm">
            <Megaphone className="h-4 w-4" />
            <span>Send Announcement</span>
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <Card className="shadow-sm border-border/80">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline">
                Priority:
              </span>
              <div className="w-full sm:w-44">
                <Select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  options={[
                    { label: "All Priorities", value: "ALL" },
                    { label: "Urgent", value: "URGENT" },
                    { label: "High", value: "HIGH" },
                    { label: "Normal", value: "NORMAL" },
                  ]}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <EmptyState
            title="No announcements found"
            description="No notices match your search criteria. Post a new announcement to notify residents."
            actionLabel="Create Announcement"
            onAction={() => setIsSendModalOpen(true)}
          />
        ) : (
          filteredAnnouncements.map((a) => (
            <Card
              key={a.id}
              className="shadow-sm border-border/80 hover:border-border transition-colors"
            >
              <CardContent className="p-5 space-y-3">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {a.priority === "URGENT" && (
                      <Badge variant="destructive" className="flex items-center gap-1 text-[11px]">
                        <ShieldAlert className="h-3 w-3" />
                        Urgent Alert
                      </Badge>
                    )}
                    {a.priority === "HIGH" && (
                      <Badge variant="warning" className="text-[11px]">
                        High Priority
                      </Badge>
                    )}
                    {a.priority === "NORMAL" && (
                      <Badge variant="secondary" className="text-[11px]">
                        Notice
                      </Badge>
                    )}

                    <h3 className="text-base font-bold text-foreground tracking-tight">
                      {a.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {new Date(a.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {a.content}
                </p>

                {/* Footer metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Author:</span>
                    <span>{a.authorName || "Warden Office"}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {a.target === "ALL_STUDENTS" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted font-medium text-foreground text-[11px]">
                        <Users className="h-3 w-3 text-primary" />
                        All Active Residents ({a.targetCount || 108})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted font-medium text-foreground text-[11px]">
                        <User className="h-3 w-3 text-amber-500" />
                        Targeted Group ({a.targetCount || 18})
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Send Announcement Modal */}
      <SendAnnouncementDialog
        open={isSendModalOpen}
        onOpenChange={setIsSendModalOpen}
        onAnnouncementCreated={handleAnnouncementCreated}
      />
    </div>
  );
};
