"use client";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Presentation, Cpu } from "lucide-react";

const PresentationGeneratorForm = dynamic(() => import("@/components/teacher/PresentationGeneratorForm"), {
  loading: () => <div className="flex h-64 items-center justify-center"><Cpu className="h-12 w-12 animate-spin text-primary" /></div>,
  ssr: false 
});

export default function CreatePresentationPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold flex items-center font-headline">
          <Presentation className="mr-3 h-8 w-8 text-primary" />
          AI Presentation Outline Generator
        </h1>
        <p className="text-muted-foreground mt-1">
          Generate a structured outline for your presentations using AI.
        </p>
      </header>
      
      <PresentationGeneratorForm />

      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><strong>1. Input Details:</strong> Provide a topic, target grade level (optional), and the number of content slides you need.</p>
            <p><strong>2. Generate:</strong> Click "Generate Presentation Outline". The AI will create a title and content for each slide.</p>
            <p><strong>3. Review & Copy:</strong> The generated outline will appear below. You can review it and copy the content (as JSON or text) to your preferred presentation software (e.g., Google Slides, PowerPoint, Keynote).</p>
            <p><strong>Note:</strong> This tool generates text content and structure, not a downloadable presentation file.</p>
        </CardContent>
      </Card>
    </div>
  );
}
