"use client";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FilePlus2, Cpu } from "lucide-react";

const LessonGeneratorForm = dynamic(() => import("@/components/teacher/LessonGeneratorForm"), {
  loading: () => <div className="flex h-64 items-center justify-center"><Cpu className="h-12 w-12 animate-spin text-primary" /></div>,
  ssr: false // Since the form itself is interactive and uses client-side state/hooks
});

export default function CreateLessonPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold flex items-center font-headline">
          <FilePlus2 className="mr-3 h-8 w-8 text-primary" />
          Create New Lesson
        </h1>
        <p className="text-muted-foreground mt-1">
          Manually create a lesson or use our AI assistant to generate one based on your topic.
        </p>
      </header>
      
      {/* AI Lesson Generator Section */}
      <LessonGeneratorForm />

      {/* Manual Lesson Creation Form (Placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Lesson Creation</CardTitle>
          <CardDescription>
            If you prefer, you can build your lesson from scratch here. (This is a placeholder for manual form fields)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Manual lesson creation form will be available here.
            For now, please use the AI Lesson Plan Generator above.
          </p>
          {/* 
            Example fields for manual creation:
            - Title Input
            - Subject Select
            - Grade Level Select
            - Objectives Textarea
            - Materials Textarea
            - Procedure Textarea (Rich Text Editor ideally)
            - Assessment Textarea
            - Upload attachments (PDFs, Docs, Videos)
          */}
        </CardContent>
      </Card>
    </div>
  );
}
