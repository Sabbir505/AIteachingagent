"use client";
// This page can be a more specific teacher overview or redirect to /dashboard which is already role-aware.
// For now, let's make it a simple placeholder as /dashboard provides a good overview.
// Or, it can be removed if /dashboard is sufficient.
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TeacherDashboardPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div>
      <p>Redirecting to teacher dashboard...</p>
    </div>
  );
}
