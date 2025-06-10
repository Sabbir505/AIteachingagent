"use client";
// This page can be a more specific parent overview or redirect to /dashboard which is already role-aware.
// For now, let's make it a simple placeholder.
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ParentDashboardPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/parent/progress"); // Or just /dashboard
  }, [router]);

  return (
    <div>
      <p>Redirecting to parent dashboard...</p>
    </div>
  );
}
