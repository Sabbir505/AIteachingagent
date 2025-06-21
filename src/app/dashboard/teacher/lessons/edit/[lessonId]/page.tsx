"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";
import { useParams } from "next/navigation";

export default function EditLessonPage() {
  const params = useParams();
  const lessonId = Array.isArray(params.lessonId) ? params.lessonId[0] : params.lessonId;

  return (
    <div className="space-y-6">
       <Button variant="outline" asChild>
          <Link href="/dashboard/teacher/lessons">
             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lessons
          </Link>
       </Button>
       
       <Card>
         <CardHeader>
           <CardTitle className="flex items-center">
             <Construction className="mr-2 h-6 w-6 text-primary" />
             Editing Lesson: {lessonId}
           </CardTitle>
           <CardDescription>
             This is a placeholder page for editing a lesson. In a real application, this would contain a form pre-filled with the lesson's data.
           </CardDescription>
         </CardHeader>
         <CardContent>
            <p className="text-center text-muted-foreground py-12">
                Lesson editing form will appear here.
            </p>
         </CardContent>
       </Card>
    </div>
  )
}
