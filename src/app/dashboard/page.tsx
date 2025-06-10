
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ClipboardCheck, Users, BarChart3, Cpu } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Optional: redirect to role-specific sub-dashboard immediately
      // if (user.role === "teacher") router.replace("/dashboard/teacher");
      // else if (user.role === "student") router.replace("/dashboard/student");
      // else if (user.role === "parent") router.replace("/dashboard/parent");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Cpu className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  if (!user) {
    // This case should be handled by layout, but as a fallback:
    return <div className="text-center">Please log in to view the dashboard.</div>;
  }

  const getRoleSpecificGreeting = () => {
    switch (user.role) {
      case "teacher":
        return "Manage your classes, create engaging lessons, and track student progress.";
      case "student":
        return "Access your lessons, submit assignments, and view your performance.";
      case "parent":
        return "Monitor your child's learning journey and stay informed about their progress.";
      default:
        return "Welcome to your personal learning space.";
    }
  };

  const quickLinks = {
    teacher: [
      { name: "Create Lesson", href: "/dashboard/teacher/lessons/create", icon: BookOpen },
      { name: "View Assignments", href: "/dashboard/teacher/assignments", icon: ClipboardCheck },
      { name: "My Classes", href: "/dashboard/teacher/classes", icon: Users },
      { name: "Analytics", href: "/dashboard/teacher/analytics", icon: BarChart3 },
    ],
    student: [
      { name: "My Lessons", href: "/dashboard/student/lessons", icon: BookOpen },
      { name: "My Assignments", href: "/dashboard/student/assignments", icon: ClipboardCheck },
      { name: "Performance", href: "/dashboard/student/performance", icon: BarChart3 },
    ],
    parent: [
       { name: "Child's Progress", href: "/dashboard/parent/progress", icon: BarChart3 },
    ],
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Welcome, {user.name || user.email}!</CardTitle>
          <CardDescription className="text-lg">{getRoleSpecificGreeting()}</CardDescription>
        </CardHeader>
        <CardContent>
          <Image 
            src="https://placehold.co/1200x400.png" 
            alt="Dashboard banner" 
            width={1200} 
            height={400} 
            className="rounded-md object-cover"
            data-ai-hint="learning education" 
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {(quickLinks[user.role] || []).map((link) => (
            <Link href={link.href} key={link.href} className="block p-0">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-center text-center justify-center h-full">
                  <link.icon className="h-10 w-10 text-primary mb-3" />
                  <p className="font-semibold text-md">{link.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </CardContent>
      </Card>

      {user.role === 'teacher' && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Teacher's Corner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Harness the power of AI to create engaging educational content and streamline your grading process.</p>
            <div className="flex gap-4">
              <Button asChild variant="outline"><Link href="/dashboard/teacher/lessons/create">Generate Lesson Plan</Link></Button>
              <Button asChild variant="outline"><Link href="/dashboard/teacher/assignments/create">Create Quiz</Link></Button>
              <Button asChild variant="outline"><Link href="/dashboard/teacher/grading">Grade Essay</Link></Button>
            </div>
          </CardContent>
        </Card>
      )}
       {user.role === 'student' && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Student Hub</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Explore your lessons, complete assignments, and track your learning journey.</p>
            <p className="text-sm text-muted-foreground">Remember to check for new assignments and feedback regularly!</p>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
