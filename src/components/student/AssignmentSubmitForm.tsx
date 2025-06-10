"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // For file input
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud, FileText } from "lucide-react";

// This schema is a basic example. It would need to be more complex
// depending on the assignment type (text, file, MCQ etc.)
const assignmentSubmissionSchema = z.object({
  textResponse: z.string().optional(),
  fileAttachment: z.any().optional(), // Placeholder for file validation
});

type AssignmentSubmissionFormData = z.infer<typeof assignmentSubmissionSchema>;

interface AssignmentSubmitFormProps {
  assignmentId: string;
  assignmentTitle: string;
  assignmentType: "text" | "file" | "mcq"; // Example types
}

export default function AssignmentSubmitForm({ assignmentId, assignmentTitle, assignmentType }: AssignmentSubmitFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssignmentSubmissionFormData>({
    resolver: zodResolver(assignmentSubmissionSchema),
  });

  const onSubmit: SubmitHandler<AssignmentSubmissionFormData> = async (data) => {
    setIsLoading(true);
    // Simulate submission
    console.log("Submitting assignment:", assignmentId, data);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you'd send this to a backend / Firebase Functions
    // If it's a text response for AI grading, you might invoke `gradeEssay` or similar flow here or on backend.
    
    toast({
      title: "Assignment Submitted!",
      description: `Your submission for "${assignmentTitle}" has been received.`,
    });
    setIsLoading(false);
    reset(); 
    // Potentially redirect or update UI state
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-6 w-6 text-primary" /> Submit: {assignmentTitle}
        </CardTitle>
        <CardDescription>
          Complete your submission below. Ensure all parts of the assignment are addressed.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {assignmentType === "text" && (
            <div>
              <Label htmlFor="textResponse">Your Response</Label>
              <Textarea
                id="textResponse"
                placeholder="Type your essay or long-form answer here..."
                {...register("textResponse")}
                rows={15}
                disabled={isLoading}
              />
              {errors.textResponse && <p className="text-sm text-destructive mt-1">{errors.textResponse.message}</p>}
            </div>
          )}

          {assignmentType === "file" && (
            <div>
              <Label htmlFor="fileAttachment">Attach File</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="flex text-sm text-muted-foreground">
                    <label
                      htmlFor="fileAttachment"
                      className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring"
                    >
                      <span>Upload a file</span>
                      <Input id="fileAttachment" type="file" className="sr-only" {...register("fileAttachment")} disabled={isLoading} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">PDF, DOCX, PPTX, JPG, PNG up to 10MB (Placeholder)</p>
                </div>
              </div>
              {errors.fileAttachment && <p className="text-sm text-destructive mt-1">{errors.fileAttachment.message as string}</p>}
            </div>
          )}
          
          {assignmentType === "mcq" && (
             <div className="text-muted-foreground p-4 border rounded-md">
                <p>This is a Multiple Choice Quiz.</p>
                <p>You would typically answer questions directly within a quiz interface, not via this submission form.</p>
                <Button variant="link" asChild><Link href={`/dashboard/student/quizzes/${assignmentId}`}>Go to Quiz</Link></Button>
            </div>
          )}

        </CardContent>
        <CardFooter>
          {(assignmentType === "text" || assignmentType === "file") && (
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Assignment"
              )}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
