import LessonViewer from "@/components/student/LessonViewer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
