"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateLessonPlan, type GenerateLessonPlanInput, type GenerateLessonPlanOutput } from "@/ai/flows/generate-lesson-plan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, AlertTriangle } from "lucide-react";

const lessonPlanSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters long."),
  gradeLevel: z.string().min(1, "Grade level is required."),
});

type LessonPlanFormData = z.infer<typeof lessonPlanSchema>;

export default function LessonGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GenerateLessonPlanOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LessonPlanFormData>({
    resolver: zodResolver(lessonPlanSchema),
  });

  const onSubmit: SubmitHandler<LessonPlanFormData> = async (data) => {
    setIsLoading(true);
    setGeneratedPlan(null);
    setError(null);
    try {
      const result = await generateLessonPlan(data as GenerateLessonPlanInput);
      setGeneratedPlan(result);
      toast({
        title: "Lesson Plan Generated!",
        description: "The AI has successfully created a new lesson plan.",
      });
      reset(); 
    } catch (e: any) {
      console.error("Error generating lesson plan:", e);
      setError(e.message || "Failed to generate lesson plan. Please try again.");
      toast({
        title: "Error Generating Lesson Plan",
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
          <CardTitle className="flex items-center"><Wand2 className="mr-2 h-6 w-6 text-primary" /> AI Lesson Plan Generator</CardTitle>
          <CardDescription>
            Enter a topic and grade level, and let AI assist you in creating a comprehensive lesson plan.
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
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., Photosynthesis, The American Revolution"
                {...register("topic")}
                disabled={isLoading}
              />
              {errors.topic && <p className="text-sm text-destructive mt-1">{errors.topic.message}</p>}
            </div>
            <div>
              <Label htmlFor="gradeLevel">Grade Level</Label>
              <Input
                id="gradeLevel"
                placeholder="e.g., 5th Grade, High School Biology"
                {...register("gradeLevel")}
                disabled={isLoading}
              />
              {errors.gradeLevel && <p className="text-sm text-destructive mt-1">{errors.gradeLevel.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Lesson Plan"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {generatedPlan && (
        <Card className="mt-6 bg-secondary/30">
          <CardHeader>
            <CardTitle>Generated Lesson Plan: {generatedPlan.title}</CardTitle>
            <CardDescription>Review the AI-generated plan below. You can copy, edit, and save it.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Objective:</h3>
              <p className="text-sm text-foreground/80 whitespace-pre-wrap">{generatedPlan.objective}</p>
            </div>
            <div>
              <h3 className="font-semibold">Materials:</h3>
              <p className="text-sm text-foreground/80 whitespace-pre-wrap">{generatedPlan.materials}</p>
            </div>
            <div>
              <h3 className="font-semibold">Procedure:</h3>
              <Textarea value={generatedPlan.procedure} readOnly rows={10} className="text-sm bg-background" />
            </div>
            <div>
              <h3 className="font-semibold">Assessment:</h3>
              <p className="text-sm text-foreground/80 whitespace-pre-wrap">{generatedPlan.assessment}</p>
            </div>
          </CardContent>
           <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(JSON.stringify(generatedPlan, null, 2))}>
                Copy Plan (JSON)
            </Button>
           </CardFooter>
        </Card>
      )}
    </div>
  );
}
