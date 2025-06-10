"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { gradeEssay, type GradeEssayInput, type GradeEssayOutput } from "@/ai/flows/grade-essay";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, AlertTriangle, FileCheck2 } from "lucide-react";

const essayGraderSchema = z.object({
  essay: z.string().min(100, "Essay text must be at least 100 characters long."),
  prompt: z.string().min(10, "Essay prompt must be at least 10 characters long."),
  rubric: z.string().optional(),
});

type EssayGraderFormData = z.infer<typeof essayGraderSchema>;

export default function EssayGraderForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [gradingResult, setGradingResult] = useState<GradeEssayOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EssayGraderFormData>({
    resolver: zodResolver(essayGraderSchema),
  });

  const onSubmit: SubmitHandler<EssayGraderFormData> = async (data) => {
    setIsLoading(true);
    setGradingResult(null);
    setError(null);
    try {
      const result = await gradeEssay(data as GradeEssayInput);
      setGradingResult(result);
      toast({
        title: "Essay Graded!",
        description: "The AI has provided a grade and feedback for the essay.",
      });
      // Optionally reset form: reset(); 
    } catch (e: any) {
      console.error("Error grading essay:", e);
      setError(e.message || "Failed to grade essay. Please try again.");
      toast({
        title: "Error Grading Essay",
        description: e.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Wand2 className="mr-2 h-6 w-6 text-primary" /> AI Essay Grader</CardTitle>
          <CardDescription>
            Paste the student's essay, the original prompt, and an optional rubric for AI-assisted grading.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="prompt">Essay Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="Enter the original essay prompt or question here..."
                {...register("prompt")}
                rows={3}
                disabled={isLoading}
              />
              {errors.prompt && <p className="text-sm text-destructive mt-1">{errors.prompt.message}</p>}
            </div>
            <div>
              <Label htmlFor="essay">Student's Essay Text</Label>
              <Textarea
                id="essay"
                placeholder="Paste the full text of the student's essay here..."
                {...register("essay")}
                rows={15}
                disabled={isLoading}
              />
              {errors.essay && <p className="text-sm text-destructive mt-1">{errors.essay.message}</p>}
            </div>
            <div>
              <Label htmlFor="rubric">Grading Rubric (Optional)</Label>
              <Textarea
                id="rubric"
                placeholder="Paste your grading rubric here, if applicable..."
                {...register("rubric")}
                rows={5}
                disabled={isLoading}
              />
              {errors.rubric && <p className="text-sm text-destructive mt-1">{errors.rubric.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Grading Essay...
                </>
              ) : (
                "Grade with AI Assist"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {gradingResult && (
        <Card className="mt-6 bg-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center"><FileCheck2 className="mr-2 h-6 w-6"/> AI Grading Suggestion</CardTitle>
            <CardDescription>Review the AI-generated grade and feedback. Use this as a guide for your final assessment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Suggested Grade:</h3>
              <p className="text-xl font-bold text-primary">{gradingResult.grade}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Feedback:</h3>
              <div className="p-3 bg-background rounded-md border whitespace-pre-wrap">
                {gradingResult.feedback}
              </div>
            </div>
          </CardContent>
           <CardFooter className="flex justify-end">
             <Button variant="outline" onClick={() => {setGradingResult(null); reset();}}>Clear & Grade Another</Button>
           </CardFooter>
        </Card>
      )}
    </div>
  );
}
