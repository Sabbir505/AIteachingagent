"use client";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Cpu } from "lucide-react";

const LessonViewer = dynamic(() => import("@/components/student/LessonViewer"), {
  loading: () => <div className="flex h-64 items-center justify-center"><Cpu className="h-12 w-12 animate-spin text-primary" /></div>,
  ssr: false
});

interface StudentLessonPageProps {
  params: {
    lessonId: string;
  };
}

export default function StudentLessonPage({ params }: StudentLessonPageProps) {
  const { lessonId } = params;

  // In a real app, you might fetch lesson metadata here to display title, etc.
  // For now, LessonViewer handles its own mock data.

  return (
    <div className="space-y-6">
      <Button variant="outline" asChild className="mb-4">
        <Link href="/dashboard/student/lessons">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Lessons
        </Link>
      </Button>
      <LessonViewer lessonId={lessonId} />
    </div>
  );
}
