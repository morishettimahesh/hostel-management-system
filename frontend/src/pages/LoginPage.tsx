import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema, type LoginInput } from "@hostel/shared";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { Lock, Mail, Building2, KeyRound } from "lucide-react";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "warden.sharma@stjudehostel.edu",
      password: "password123",
      rememberMe: true,
    },
  });

  const onSubmit = (_data: LoginInput) => {
    toast({
      title: "Authenticated Successfully",
      description: `Welcome back, Dr. K. Sharma! Redirecting to dashboard...`,
      type: "success",
    });

    // Development visual transition
    setTimeout(() => {
      navigate("/dashboard");
    }, 400);
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Recovery",
      description: "Password reset link sent to registered administrator email.",
      type: "info",
    });
  };

  const fillDemoCredentials = () => {
    setValue("email", "warden.sharma@stjudehostel.edu");
    setValue("password", "password123");
    toast({
      title: "Demo Credentials Populated",
      description: "Ready to test login.",
      type: "info",
    });
  };

  return (
    <Card className="shadow-xl border-border/80 w-full">
      <CardHeader className="space-y-1.5 text-center pb-4">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
          <Building2 className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight">Warden Admin Portal</CardTitle>
        <CardDescription className="text-xs">
          Sign in to manage student residents, fee records, and hostel operations.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">Official Email</label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="warden@hostel.edu"
                className="pl-9"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-[11px] text-destructive">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">Password</label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[11px] text-primary hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-9"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-[11px] text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              {...register("rememberMe")}
            />
            <label
              htmlFor="remember"
              className="text-xs text-muted-foreground select-none cursor-pointer"
            >
              Remember my session on this device
            </label>
          </div>

          {/* Demo Credentials Helper Box */}
          <div className="rounded-lg border border-dashed p-3 bg-muted/40 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-primary" />
                Dev Mode Demo Account
              </span>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-[10px] text-primary hover:underline font-medium"
              >
                Auto-fill
              </button>
            </div>
            <div className="text-[11px] text-muted-foreground font-mono space-y-0.5">
              <p>Email: warden.sharma@stjudehostel.edu</p>
              <p>Password: password123</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-2">
          <Button type="submit" disabled={isSubmitting} className="w-full shadow-sm">
            Sign In to Dashboard
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
