"use client";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Info, Cpu } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";

const AssignmentSubmitForm = dynamic(() => import("@/components/student/AssignmentSubmitForm"), {
  loading: () => <div className="flex h-64 items-center justify-center"><Cpu className="h-12 w-12 animate-spin text-primary" /></div>,
  ssr: false
});

interface StudentAssignmentPageProps {
  params: {
    assignmentId: string;
  };
}

// Mock assignment details, in a real app, fetch this by assignmentId
const mockAssignmentDetails = {
  id: "2", 
  title: "Essay: The Impact of AI", 
  subject: "English", 
  dueDate: "2024-07-25", 
  type: "text" as "text" | "file" | "mcq",
  instructions: "Write a 500-word essay on the potential positive and negative impacts of Artificial Intelligence on society. Consider aspects like employment, ethics, and daily life. Cite at least two sources.",
  points: 100,
};


export default function StudentAssignmentPage({ params }: StudentAssignmentPageProps) {
  const { assignmentId } = params;
  const assignment = mockAssignmentDetails; // Use mock data, replace with fetch

  if (!assignment || assignment.id !== assignmentId) {
    return (
        <div className="text-center p-8">
            <h1 className="text-2xl font-bold">Assignment Not Found</h1>
            <p className="text-muted-foreground">The assignment you are looking for does not exist or is unavailable.</p>
            <Button asChild className="mt-4">
                <Link href="/dashboard/student/assignments"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Assignments</Link>
            </Button>
        </div>
    )
  }


  return (
    <div className="space-y-6">
      <Button variant="outline" asChild className="mb-4">
        <Link href="/dashboard/student/assignments">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Assignments
        </Link>
      </Button>

      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-headline">{assignment.title}</CardTitle>
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full capitalize">{assignment.type}</span>
            </div>
          <CardDescription>
            Subject: {assignment.subject} | Due Date: {assignment.dueDate} | Points: {assignment.points}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Image 
                src={`https://placehold.co/800x200.png?text=${encodeURIComponent(assignment.subject)}`}
                alt={`${assignment.subject} assignment banner`}
                width={800}
                height={200}
                className="w-full h-auto max-h-[200px] object-cover rounded-md mb-4"
                data-ai-hint={`${assignment.subject.toLowerCase()} study`}
            />
          <div>
            <h3 className="font-semibold text-lg mb-1">Instructions:</h3>
            <p className="text-foreground/80 whitespace-pre-wrap">{assignment.instructions}</p>
          </div>
        </CardContent>
      </Card>

      <AssignmentSubmitForm assignmentId={assignmentId} assignmentTitle={assignment.title} assignmentType={assignment.type} />

      <Card className="mt-6 bg-accent/10 border-accent">
        <CardHeader className="flex flex-row items-center space-x-3">
            <Info className="h-5 w-5 text-accent" />
            <CardTitle className="text-md text-accent font-semibold">Submission Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-accent/80 space-y-1">
            <li>Double-check all instructions before submitting.</li>
            <li>If uploading a file, ensure it's the correct version and format.</li>
            <li>Save your work frequently if typing directly.</li>
            <li>Contact your teacher if you have any questions about the assignment.</li>
        </CardContent>
      </Card>
    </div>
  );
}
