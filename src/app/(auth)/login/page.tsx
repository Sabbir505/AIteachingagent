import UserAuthForm from "@/components/auth/UserAuthForm";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Welcome Back!</CardTitle>
        <CardDescription>
          Enter your credentials to access your EduGenius account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserAuthForm formType="login" />
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
