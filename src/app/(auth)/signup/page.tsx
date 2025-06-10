import UserAuthForm from "@/components/auth/UserAuthForm";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
        <CardDescription>
          Join EduGenius to start your learning journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserAuthForm formType="signup" />
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
