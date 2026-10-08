import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema, type SettingsInput } from "@hostel/shared";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { MOCK_SETTINGS } from "@/mocks";
import { Building2, User, CreditCard, QrCode, Save, Upload, Clock } from "lucide-react";

export const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [qrPreview, setQrPreview] = useState<string | null>(MOCK_SETTINGS.qrCodeUrl || null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      hostelName: MOCK_SETTINGS.hostelName,
      hostelAddress: MOCK_SETTINGS.hostelAddress,
      hostelPhone: MOCK_SETTINGS.hostelPhone,
      hostelEmail: MOCK_SETTINGS.hostelEmail,
      wardenName: MOCK_SETTINGS.wardenName,
      wardenPhone: MOCK_SETTINGS.wardenPhone,
      wardenEmail: MOCK_SETTINGS.wardenEmail,
      officeHours: MOCK_SETTINGS.officeHours,
      upiId: MOCK_SETTINGS.upiId,
      paymentPhone: MOCK_SETTINGS.paymentPhone,
      paymentInstructions: MOCK_SETTINGS.paymentInstructions,
    },
  });

  const onSubmit = (_data: SettingsInput) => {
    toast({
      title: "Settings Saved (Dev Mock)",
      description: "Hostel configurations and payment credentials updated successfully.",
      type: "success",
    });
  };

  const handleQrUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setQrPreview(url);
      toast({
        title: "QR Code Preview Updated",
        description: "Preview refreshed locally (frontend only).",
        type: "info",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hostel & System Settings"
        description="Configure hostel profile details, warden emergency contacts, and student payment credentials."
        breadcrumbs={[{ label: "Settings" }]}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="hostel">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
            <TabsList>
              <TabsTrigger value="hostel" className="gap-1.5">
                <Building2 className="h-4 w-4" />
                <span>Hostel Profile</span>
              </TabsTrigger>
              <TabsTrigger value="warden" className="gap-1.5">
                <User className="h-4 w-4" />
                <span>Warden Contact</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="gap-1.5">
                <CreditCard className="h-4 w-4" />
                <span>Payment & UPI</span>
              </TabsTrigger>
            </TabsList>

            <Button type="submit" size="sm" disabled={isSubmitting} className="gap-1.5 shadow-sm">
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </Button>
          </div>

          {/* Section 1: Hostel Information */}
          <TabsContent value="hostel">
            <Card className="shadow-sm border-border/80">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-base font-semibold">Hostel Information</CardTitle>
                <CardDescription className="text-xs">
                  Official residency name and location displayed on student receipts and notices.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-foreground">Hostel Name *</label>
                    <Input {...register("hostelName")} />
                    {errors.hostelName && (
                      <p className="text-[11px] text-destructive">{errors.hostelName.message}</p>
                    )}
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-foreground">
                      Hostel Address *
                    </label>
                    <Input {...register("hostelAddress")} />
                    {errors.hostelAddress && (
                      <p className="text-[11px] text-destructive">{errors.hostelAddress.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      Office Telephone *
                    </label>
                    <Input {...register("hostelPhone")} />
                    {errors.hostelPhone && (
                      <p className="text-[11px] text-destructive">{errors.hostelPhone.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      Administration Email *
                    </label>
                    <Input type="email" {...register("hostelEmail")} />
                    {errors.hostelEmail && (
                      <p className="text-[11px] text-destructive">{errors.hostelEmail.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Section 2: Warden Information */}
          <TabsContent value="warden">
            <Card className="shadow-sm border-border/80">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-base font-semibold">
                  Warden Administration Details
                </CardTitle>
                <CardDescription className="text-xs">
                  Resident warden credentials and primary guardian helpline contacts.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      Chief Warden Name *
                    </label>
                    <Input {...register("wardenName")} />
                    {errors.wardenName && (
                      <p className="text-[11px] text-destructive">{errors.wardenName.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      Emergency Contact Phone *
                    </label>
                    <Input {...register("wardenPhone")} />
                    {errors.wardenPhone && (
                      <p className="text-[11px] text-destructive">{errors.wardenPhone.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      Warden Official Email *
                    </label>
                    <Input type="email" {...register("wardenEmail")} />
                    {errors.wardenEmail && (
                      <p className="text-[11px] text-destructive">{errors.wardenEmail.message}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">
                      Office / Availability Hours
                    </label>
                    <Input {...register("officeHours")} />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/40 border border-dashed flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>
                    Emergency numbers are included in all automatic fee receipt emails and parent
                    SMS reminders.
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Section 3: Payment & UPI Configuration */}
          <TabsContent value="payment">
            <Card className="shadow-sm border-border/80">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-base font-semibold">
                  Fee Collection & UPI Configuration
                </CardTitle>
                <CardDescription className="text-xs">
                  Configure digital payment handles and generate payment QR codes for hostel
                  students.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left 2 cols: Details */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">
                          Hostel UPI VPA ID *
                        </label>
                        <Input placeholder="hostel.id@bank" {...register("upiId")} />
                        {errors.upiId && (
                          <p className="text-[11px] text-destructive">{errors.upiId.message}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">
                          Payment Phone Number *
                        </label>
                        <Input placeholder="+91 98450 00000" {...register("paymentPhone")} />
                        {errors.paymentPhone && (
                          <p className="text-[11px] text-destructive">
                            {errors.paymentPhone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground">
                        Payment Instructions
                      </label>
                      <textarea
                        rows={3}
                        className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Instructions displayed to students when completing monthly fee transfers..."
                        {...register("paymentInstructions")}
                      />
                    </div>
                  </div>

                  {/* Right 1 col: QR Code Upload & Preview */}
                  <div className="rounded-xl border p-4 bg-muted/20 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <QrCode className="h-4 w-4 text-primary" />
                      <span>Collection QR Code</span>
                    </div>

                    {qrPreview ? (
                      <div className="p-2 bg-white rounded-lg border shadow-sm">
                        <img
                          src={qrPreview}
                          alt="Hostel UPI QR Code"
                          className="h-32 w-32 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-32 w-32 flex items-center justify-center rounded-lg border border-dashed text-muted-foreground text-xs">
                        No QR Code
                      </div>
                    )}

                    <div className="w-full">
                      <label className="cursor-pointer inline-flex items-center justify-center gap-1.5 w-full rounded-md border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                        <Upload className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>Upload New QR</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleQrUploadMock}
                          className="sr-only"
                        />
                      </label>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        PNG or JPG (Frontend preview only)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};
