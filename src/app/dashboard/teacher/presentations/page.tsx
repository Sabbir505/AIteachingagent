"use client";
// This page can be a more specific presentation overview or redirect to the create page.
// For now, let's make it redirect to the create page.
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TeacherPresentationsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/teacher/presentations/create");
  }, [router]);

  return (
    <div>
      <p>Redirecting to presentation generator...</p>
    </div>
  );
}
