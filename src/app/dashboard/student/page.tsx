"use client";
// This page can be a more specific student overview or redirect to /dashboard which is already role-aware.
// For now, let's make it a simple placeholder.
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StudentDashboardPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div>
      <p>Redirecting to student dashboard...</p>
    </div>
  );
}
