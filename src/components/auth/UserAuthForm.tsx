"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle } from "lucide-react";
import { siteConfig, type UserRole } from "@/config/site";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formType: "login" | "signup";
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  name: z.string().optional(),
  role: z.custom<UserRole>().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function UserAuthForm({ className, formType, ...props }: UserAuthFormProps) {
  const { signIn, signUp, googleSignIn, loading, error, clearError } = useAuth();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const selectedRole = watch("role");

  React.useEffect(() => {
    clearError(); // Clear previous errors when component mounts or formType changes
  }, [formType, clearError]);

  async function onSubmit(data: FormData) {
    clearError();
    if (formType === "login") {
      await signIn(data.email, data.password);
    } else {
      await signUp(data.email, data.password, data.name, data.role);
    }
  }

  async function handleGoogleSignIn() {
    clearError();
    await googleSignIn();
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {formType === "signup" && (
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                type="text"
                autoCapitalize="words"
                autoCorrect="off"
                disabled={loading}
                {...register("name")}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
          )}
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={loading}
              {...register("email")}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete={formType === "login" ? "current-password" : "new-password"}
              disabled={loading}
              {...register("password")}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>
          {formType === "signup" && (
            <div className="grid gap-1">
              <Label htmlFor="role">Role</Label>
              <Select
                disabled={loading}
                onValueChange={(value) => setValue("role", value as UserRole)}
                value={selectedRole}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(siteConfig.roles).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
            </div>
          )}
          <Button disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {formType === "login" ? "Sign In" : "Create Account"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={loading} onClick={handleGoogleSignIn}>
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          // Placeholder for Google Icon
          <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
        )}{" "}
        Google
      </Button>
    </div>
  );
}
